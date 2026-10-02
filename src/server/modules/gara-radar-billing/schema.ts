import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const grSubscriptions = sqliteTable('gr_subscriptions', {
  id: text('id').primaryKey(),
  email: text('email'),
  stripeCustomerId: text('stripe_customer_id'),
  stripeSubscriptionId: text('stripe_subscription_id'),
  plan: text('plan').notNull(),
  status: text('status').notNull(),
  currentPeriodEnd: integer('current_period_end', { mode: 'timestamp_ms' }),
  createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).notNull(),
})

export const grBillingEvents = sqliteTable('gr_billing_events', {
  id: text('id').primaryKey(),
  type: text('type').notNull(),
  stripeObjectId: text('stripe_object_id'),
  receivedAt: integer('received_at', { mode: 'timestamp_ms' }).notNull(),
})
