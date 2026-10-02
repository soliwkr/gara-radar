import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const grBetaLeads = sqliteTable('gr_beta_leads', {
  id: text('id').primaryKey(),
  email: text('email').notNull(),
  trade: text('trade').notNull(),
  territory: text('territory').notNull(),
  amountRange: text('amount_range'),
  status: text('status').notNull().default('NEW'),
  createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull(),
})
