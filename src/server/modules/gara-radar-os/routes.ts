import { Hono } from 'hono'
import { desc, eq, sql } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/d1'
import { authMiddleware } from '@/server/middleware/auth'
import type { Env } from '@/server/index'
import * as schema from './db/schema'

type Context = { Bindings: Env }

const app = new Hono<Context>()
app.use('*', authMiddleware)

app.get('/overview', async (c) => {
  const db = drizzle(c.env.DB, { schema })

  const [
    sources,
    signalsCount,
    segments,
    opportunitiesCount,
    experiments,
    humanActions,
    recentSignals,
  ] = await Promise.all([
    db.select().from(schema.grSources).orderBy(schema.grSources.radar, schema.grSources.name),
    db.select({ count: sql<number>`count(*)` }).from(schema.grSignals),
    db.select().from(schema.grSegments).orderBy(desc(schema.grSegments.marketFitness)),
    db.select({ count: sql<number>`count(*)` }).from(schema.grOpportunities),
    db.select().from(schema.grExperiments).orderBy(desc(schema.grExperiments.startedAt)),
    db
      .select()
      .from(schema.grHumanActions)
      .where(eq(schema.grHumanActions.status, 'WAITING'))
      .orderBy(desc(schema.grHumanActions.createdAt)),
    db.select().from(schema.grSignals).orderBy(desc(schema.grSignals.observedAt)).limit(12),
  ])

  const sourceStatus = sources.reduce<Record<string, number>>((acc, source) => {
    acc[source.status] = (acc[source.status] ?? 0) + 1
    return acc
  }, {})

  return c.json({
    generatedAt: new Date().toISOString(),
    sourceStatus,
    counts: {
      sources: sources.length,
      signals: Number(signalsCount[0]?.count ?? 0),
      segments: segments.length,
      opportunities: Number(opportunitiesCount[0]?.count ?? 0),
      experiments: experiments.length,
      humanActions: humanActions.length,
    },
    sources,
    segments: segments.slice(0, 12),
    experiments: experiments.slice(0, 12),
    humanActions: humanActions.slice(0, 12),
    recentSignals,
  })
})

app.get('/sources', async (c) => {
  const db = drizzle(c.env.DB, { schema })
  return c.json({
    sources: await db.select().from(schema.grSources).orderBy(schema.grSources.radar, schema.grSources.name),
  })
})

app.get('/signals', async (c) => {
  const db = drizzle(c.env.DB, { schema })
  return c.json({
    signals: await db.select().from(schema.grSignals).orderBy(desc(schema.grSignals.observedAt)).limit(100),
  })
})

app.get('/segments', async (c) => {
  const db = drizzle(c.env.DB, { schema })
  return c.json({
    segments: await db.select().from(schema.grSegments).orderBy(desc(schema.grSegments.marketFitness)),
  })
})

export default app
