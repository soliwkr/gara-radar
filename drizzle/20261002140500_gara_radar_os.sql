CREATE TABLE IF NOT EXISTS gr_sources (
  id TEXT PRIMARY KEY NOT NULL,
  radar TEXT NOT NULL,
  name TEXT NOT NULL,
  status TEXT NOT NULL,
  cadence TEXT NOT NULL,
  access TEXT NOT NULL,
  url TEXT,
  notes TEXT,
  last_collected_at INTEGER,
  last_error TEXT,
  updated_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS gr_signals (
  id TEXT PRIMARY KEY NOT NULL,
  observed_at INTEGER NOT NULL,
  source_id TEXT NOT NULL,
  radar TEXT NOT NULL,
  segment_id TEXT,
  type TEXT NOT NULL,
  subject TEXT NOT NULL,
  market TEXT,
  payload_json TEXT,
  confidence REAL NOT NULL DEFAULT 1,
  evidence_url TEXT,
  status TEXT NOT NULL DEFAULT 'NEW'
);

CREATE INDEX IF NOT EXISTS gr_signals_observed_idx ON gr_signals(observed_at DESC);
CREATE INDEX IF NOT EXISTS gr_signals_segment_idx ON gr_signals(segment_id, radar);

CREATE TABLE IF NOT EXISTS gr_events (
  id TEXT PRIMARY KEY NOT NULL,
  occurred_at INTEGER NOT NULL,
  event_type TEXT NOT NULL,
  profile_id TEXT,
  gara_id TEXT,
  segment_id TEXT,
  experiment_id TEXT,
  variant TEXT,
  value REAL,
  metadata_json TEXT
);

CREATE INDEX IF NOT EXISTS gr_events_experiment_idx ON gr_events(experiment_id, variant, occurred_at);
CREATE INDEX IF NOT EXISTS gr_events_segment_idx ON gr_events(segment_id, occurred_at);

CREATE TABLE IF NOT EXISTS gr_segments (
  id TEXT PRIMARY KEY NOT NULL,
  trade TEXT NOT NULL,
  territory TEXT NOT NULL,
  firmographic TEXT,
  demand_score REAL,
  supply_score REAL,
  pain_score REAL,
  competition_score REAL,
  data_quality REAL,
  acquisition_fit REAL,
  conversion_score REAL,
  retention_score REAL,
  operational_cost REAL,
  human_attention REAL,
  market_fitness REAL,
  evidence_n INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'DISCOVERED',
  updated_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS gr_opportunities (
  id TEXT PRIMARY KEY NOT NULL,
  created_at INTEGER NOT NULL,
  segment_id TEXT NOT NULL,
  trigger TEXT NOT NULL,
  thesis_summary TEXT NOT NULL,
  demand REAL,
  supply REAL,
  pain REAL,
  competition REAL,
  acquisition_fit REAL,
  data_quality REAL,
  automation_fit REAL,
  opportunity_score REAL,
  supporting_signal_ids TEXT,
  status TEXT NOT NULL DEFAULT 'PROPOSED'
);

CREATE TABLE IF NOT EXISTS gr_experiments (
  id TEXT PRIMARY KEY NOT NULL,
  segment_id TEXT,
  hypothesis TEXT NOT NULL,
  lever TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'PROPOSED',
  variant_a TEXT,
  variant_b TEXT,
  primary_metric TEXT NOT NULL,
  minimum_samples INTEGER NOT NULL DEFAULT 100,
  win_threshold REAL NOT NULL DEFAULT 0.15,
  requires_approval INTEGER NOT NULL DEFAULT 0,
  started_at INTEGER,
  ended_at INTEGER
);

CREATE TABLE IF NOT EXISTS gr_fitness (
  id TEXT PRIMARY KEY NOT NULL,
  calculated_at INTEGER NOT NULL,
  segment_id TEXT,
  experiment_id TEXT,
  data_fitness REAL,
  match_fitness REAL,
  acquisition_fitness REAL,
  commercial_fitness REAL,
  operational_fitness REAL,
  composite_fitness REAL,
  evidence_n INTEGER NOT NULL DEFAULT 0,
  recommendation TEXT NOT NULL DEFAULT 'INSUFFICIENT_DATA',
  evidence TEXT
);

CREATE TABLE IF NOT EXISTS gr_learnings (
  id TEXT PRIMARY KEY NOT NULL,
  scope TEXT NOT NULL,
  finding TEXT NOT NULL,
  evidence_n INTEGER NOT NULL DEFAULT 0,
  confidence REAL NOT NULL DEFAULT 0,
  disposition TEXT NOT NULL,
  experiment_id TEXT,
  active INTEGER NOT NULL DEFAULT 1,
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS gr_human_actions (
  id TEXT PRIMARY KEY NOT NULL,
  created_at INTEGER NOT NULL,
  type TEXT NOT NULL,
  system TEXT NOT NULL,
  reason TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'WAITING',
  reference_url TEXT,
  human_minutes REAL
);

INSERT OR IGNORE INTO gr_sources
(id, radar, name, status, cadence, access, url, notes, updated_at)
VALUES
('SRC-SITE-EVENTS','BEHAVIOR','Gara Radar live events','LIVE','continuous','Cloudflare Worker telemetry','https://gara-radar.soliwkr.workers.dev','Existing production signal source; D1 ingestion is being migrated.',unixepoch('now') * 1000),
('SRC-LAZIO-CENTRALE','SUPPLY','Regione Lazio — Centrale Acquisti','MANUAL','manual until collector','Official public tender pages','https://centraleacquisti.regione.lazio.it/','Verified official regional supply source.',unixepoch('now') * 1000),
('SRC-BDNCP-OPEN','SUPPLY','ANAC BDNCP Open Data','DORMANT','monthly source refresh','Public structured datasets','https://www.anticorruzione.it/en/-/portale-dei-dati-aperti-dell-autorita-nazionale-anticorruzione','Collector not wired yet.',unixepoch('now') * 1000),
('SRC-GSC','DEMAND','Google Search Console','REQUIRES_AUTH','daily','Read-only authenticated query data','https://developers.google.com/webmaster-tools/v1/searchanalytics/query','Demand normalizer is implemented; property/auth not connected.',unixepoch('now') * 1000),
('SRC-KEYWORD-MARKET','DEMAND','Keyword market provider','DORMANT','weekly when provider exists','Provider not selected',NULL,'Provider-neutral normalizer exists.',unixepoch('now') * 1000),
('SRC-GTRENDS','DEMAND','Google Trends API','LIMITED_ACCESS','weekly when access exists','Limited provider access','https://developers.google.com/search/apis/trends','Do not treat as production dependency until access exists.',unixepoch('now') * 1000),
('SRC-PAIN-WEB','PAIN','Pain research corpus','MANUAL','weekly','Approved research sources',NULL,'No arbitrary URL crawling.',unixepoch('now') * 1000),
('SRC-INFOGARE','COMPETITION','InfoGare','MANUAL','weekly','Public competitor pages','https://www.infogare.com/','Verified public competitor observation source.',unixepoch('now') * 1000),
('SRC-STRIPE','ECONOMIC','Stripe revenue events','REQUIRES_AUTH','continuous once billing is live','Stripe webhooks/API',NULL,'Not connected yet.',unixepoch('now') * 1000),
('SRC-ANAC-REG','REGULATORY','ANAC platform/data change watch','MANUAL','weekly','Official ANAC pages','https://www.anticorruzione.it/','Flags source/platform changes; does not make legal conclusions.',unixepoch('now') * 1000),
('SRC-FIRMOGRAPHIC','FIRMOGRAPHIC','Firmographic provider','DORMANT','monthly','Provider not selected',NULL,'Reserved for addressable-business estimates.',unixepoch('now') * 1000);

INSERT OR IGNORE INTO gr_segments
(id, trade, territory, evidence_n, status, updated_at)
VALUES ('SEG-ELEC-LAZIO','Impiantisti / elettricisti','Lazio',0,'TESTING',unixepoch('now') * 1000);

INSERT OR IGNORE INTO gr_human_actions
(id, created_at, type, system, reason, status, reference_url)
VALUES
('HA-GSC-AUTH',unixepoch('now') * 1000,'CREDENTIALS_REQUIRED','Google Search Console','Connect a verified Gara Radar property and read-only access before the demand collector can become LIVE.','WAITING','https://developers.google.com/webmaster-tools/v1/searchanalytics/query'),
('HA-KEYWORD-PROVIDER',unixepoch('now') * 1000,'SOURCE_ACCESS','Keyword market provider','Select a quantitative keyword provider before pre-site volume/CPC/competition signals can become LIVE.','WAITING',NULL);
