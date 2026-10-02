import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const grSources = sqliteTable('gr_sources', {
  id: text('id').primaryKey(),
  radar: text('radar').notNull(),
  name: text('name').notNull(),
  status: text('status').notNull(),
  cadence: text('cadence').notNull(),
  access: text('access').notNull(),
  url: text('url'),
  notes: text('notes'),
  lastCollectedAt: integer('last_collected_at', { mode: 'timestamp_ms' }),
  lastError: text('last_error'),
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).notNull(),
})

export const grSignals = sqliteTable('gr_signals', {
  id: text('id').primaryKey(),
  observedAt: integer('observed_at', { mode: 'timestamp_ms' }).notNull(),
  sourceId: text('source_id').notNull(),
  radar: text('radar').notNull(),
  segmentId: text('segment_id'),
  type: text('type').notNull(),
  subject: text('subject').notNull(),
  market: text('market'),
  payloadJson: text('payload_json'),
  confidence: real('confidence').notNull().default(1),
  evidenceUrl: text('evidence_url'),
  status: text('status').notNull().default('NEW'),
})

export const grEvents = sqliteTable('gr_events', {
  id: text('id').primaryKey(),
  occurredAt: integer('occurred_at', { mode: 'timestamp_ms' }).notNull(),
  eventType: text('event_type').notNull(),
  profileId: text('profile_id'),
  garaId: text('gara_id'),
  segmentId: text('segment_id'),
  experimentId: text('experiment_id'),
  variant: text('variant'),
  value: real('value'),
  metadataJson: text('metadata_json'),
})

export const grSegments = sqliteTable('gr_segments', {
  id: text('id').primaryKey(),
  trade: text('trade').notNull(),
  territory: text('territory').notNull(),
  firmographic: text('firmographic'),
  demandScore: real('demand_score'),
  supplyScore: real('supply_score'),
  painScore: real('pain_score'),
  competitionScore: real('competition_score'),
  dataQuality: real('data_quality'),
  acquisitionFit: real('acquisition_fit'),
  conversionScore: real('conversion_score'),
  retentionScore: real('retention_score'),
  operationalCost: real('operational_cost'),
  humanAttention: real('human_attention'),
  marketFitness: real('market_fitness'),
  evidenceN: integer('evidence_n').notNull().default(0),
  status: text('status').notNull().default('DISCOVERED'),
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).notNull(),
})

export const grOpportunities = sqliteTable('gr_opportunities', {
  id: text('id').primaryKey(),
  createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull(),
  segmentId: text('segment_id').notNull(),
  trigger: text('trigger').notNull(),
  thesisSummary: text('thesis_summary').notNull(),
  demand: real('demand'),
  supply: real('supply'),
  pain: real('pain'),
  competition: real('competition'),
  acquisitionFit: real('acquisition_fit'),
  dataQuality: real('data_quality'),
  automationFit: real('automation_fit'),
  opportunityScore: real('opportunity_score'),
  supportingSignalIds: text('supporting_signal_ids'),
  status: text('status').notNull().default('PROPOSED'),
})

export const grExperiments = sqliteTable('gr_experiments', {
  id: text('id').primaryKey(),
  segmentId: text('segment_id'),
  hypothesis: text('hypothesis').notNull(),
  lever: text('lever').notNull(),
  status: text('status').notNull().default('PROPOSED'),
  variantA: text('variant_a'),
  variantB: text('variant_b'),
  primaryMetric: text('primary_metric').notNull(),
  minimumSamples: integer('minimum_samples').notNull().default(100),
  winThreshold: real('win_threshold').notNull().default(0.15),
  requiresApproval: integer('requires_approval', { mode: 'boolean' }).notNull().default(false),
  startedAt: integer('started_at', { mode: 'timestamp_ms' }),
  endedAt: integer('ended_at', { mode: 'timestamp_ms' }),
})

export const grFitness = sqliteTable('gr_fitness', {
  id: text('id').primaryKey(),
  calculatedAt: integer('calculated_at', { mode: 'timestamp_ms' }).notNull(),
  segmentId: text('segment_id'),
  experimentId: text('experiment_id'),
  dataFitness: real('data_fitness'),
  matchFitness: real('match_fitness'),
  acquisitionFitness: real('acquisition_fitness'),
  commercialFitness: real('commercial_fitness'),
  operationalFitness: real('operational_fitness'),
  compositeFitness: real('composite_fitness'),
  evidenceN: integer('evidence_n').notNull().default(0),
  recommendation: text('recommendation').notNull().default('INSUFFICIENT_DATA'),
  evidence: text('evidence'),
})

export const grLearnings = sqliteTable('gr_learnings', {
  id: text('id').primaryKey(),
  scope: text('scope').notNull(),
  finding: text('finding').notNull(),
  evidenceN: integer('evidence_n').notNull().default(0),
  confidence: real('confidence').notNull().default(0),
  disposition: text('disposition').notNull(),
  experimentId: text('experiment_id'),
  active: integer('active', { mode: 'boolean' }).notNull().default(true),
  createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull(),
})

export const grHumanActions = sqliteTable('gr_human_actions', {
  id: text('id').primaryKey(),
  createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull(),
  type: text('type').notNull(),
  system: text('system').notNull(),
  reason: text('reason').notNull(),
  status: text('status').notNull().default('WAITING'),
  referenceUrl: text('reference_url'),
  humanMinutes: real('human_minutes'),
})
