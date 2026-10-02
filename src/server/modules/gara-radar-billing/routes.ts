import { Hono } from 'hono'
import { drizzle } from 'drizzle-orm/d1'
import { eq } from 'drizzle-orm'
import type { Env } from '@/server/index'
import { grBillingEvents, grSubscriptions } from './schema'

type BillingEnv = Env & {
  STRIPE_WEBHOOK_SECRET?: string
}

type Context = { Bindings: BillingEnv }

const app = new Hono<Context>()

function timingSafeEqualHex(a: string, b: string) {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

async function hmacHex(secret: string, message: string) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(message))
  return Array.from(new Uint8Array(signature))
    .map((value) => value.toString(16).padStart(2, '0'))
    .join('')
}

async function verifyStripeSignature(raw: string, header: string | undefined, secret: string | undefined) {
  if (!header || !secret) return false

  const parts = header.split(',').map((part) => part.trim())
  const timestamp = parts.find((part) => part.startsWith('t='))?.slice(2)
  const signatures = parts.filter((part) => part.startsWith('v1=')).map((part) => part.slice(3))

  if (!timestamp || signatures.length === 0) return false

  const age = Math.abs(Date.now() / 1000 - Number(timestamp))
  if (!Number.isFinite(age) || age > 300) return false

  const expected = await hmacHex(secret, `${timestamp}.${raw}`)
  return signatures.some((signature) => timingSafeEqualHex(expected, signature))
}

app.post('/webhook', async (c) => {
  const raw = await c.req.text()
  const verified = await verifyStripeSignature(
    raw,
    c.req.header('stripe-signature'),
    c.env.STRIPE_WEBHOOK_SECRET,
  )

  if (!verified) return c.text('invalid signature', 400)

  const event = JSON.parse(raw) as {
    id: string
    type: string
    data?: { object?: Record<string, unknown> }
  }

  const db = drizzle(c.env.DB)
  const now = new Date()

  await db
    .insert(grBillingEvents)
    .values({
      id: event.id,
      type: event.type,
      stripeObjectId: String(event.data?.object?.['id'] ?? ''),
      receivedAt: now,
    })
    .onConflictDoNothing()

  const object = event.data?.object ?? {}

  if (event.type === 'checkout.session.completed' && object['mode'] === 'subscription') {
    const email = String(
      (object['customer_details'] as { email?: string } | undefined)?.email ??
        object['customer_email'] ??
        '',
    ).toLowerCase()
    const customerId = String(object['customer'] ?? '')
    const subscriptionId = String(object['subscription'] ?? '')
    const status = object['payment_status'] === 'paid' ? 'active' : 'pending'

    await db
      .insert(grSubscriptions)
      .values({
        id: subscriptionId || event.id,
        email: email || null,
        stripeCustomerId: customerId || null,
        stripeSubscriptionId: subscriptionId || null,
        plan: 'founding-radar',
        status,
        createdAt: now,
        updatedAt: now,
      })
      .onConflictDoUpdate({
        target: grSubscriptions.id,
        set: {
          email: email || null,
          stripeCustomerId: customerId || null,
          stripeSubscriptionId: subscriptionId || null,
          status,
          updatedAt: now,
        },
      })
  }

  if (
    (event.type === 'customer.subscription.updated' ||
      event.type === 'customer.subscription.deleted') &&
    object['id']
  ) {
    const subscriptionId = String(object['id'])
    const status =
      event.type === 'customer.subscription.deleted'
        ? 'canceled'
        : String(object['status'] ?? 'unknown')

    await db
      .update(grSubscriptions)
      .set({
        status,
        updatedAt: now,
      })
      .where(eq(grSubscriptions.id, subscriptionId))
  }

  return c.text('ok')
})

export default app
