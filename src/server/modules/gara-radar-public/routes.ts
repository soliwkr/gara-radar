import { Hono } from 'hono'
import { z } from 'zod'
import { drizzle } from 'drizzle-orm/d1'
import type { Env } from '@/server/index'
import { grBetaLeads } from './schema'

type Context = { Bindings: Env }

const app = new Hono<Context>()

const betaSchema = z.object({
  email: z.string().email().max(200),
  trade: z.string().min(2).max(160),
  territory: z.string().min(2).max(160),
  amountRange: z.string().max(80).optional().default(''),
})

app.post('/beta', async (c) => {
  const parsed = betaSchema.safeParse(await c.req.json().catch(() => null))
  if (!parsed.success) return c.json({ error: 'Dati non validi' }, 400)

  const now = new Date()
  const id = crypto.randomUUID()
  const db = drizzle(c.env.DB)

  await db.insert(grBetaLeads).values({
    id,
    email: parsed.data.email.toLowerCase(),
    trade: parsed.data.trade,
    territory: parsed.data.territory,
    amountRange: parsed.data.amountRange,
    status: 'NEW',
    createdAt: now,
  })

  return c.json({ ok: true, id }, 201)
})

export default app
