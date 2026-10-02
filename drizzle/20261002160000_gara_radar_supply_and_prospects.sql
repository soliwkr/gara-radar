CREATE TABLE IF NOT EXISTS gr_tenders (
  id TEXT PRIMARY KEY NOT NULL,
  discovery_source TEXT,
  discovery_url TEXT,
  source_kind TEXT NOT NULL DEFAULT 'DISCOVERY',
  source_url TEXT,
  cig TEXT,
  title TEXT NOT NULL,
  buyer TEXT NOT NULL,
  territory TEXT,
  province TEXT,
  place_of_execution TEXT,
  amount_cents INTEGER,
  deadline TEXT,
  cpv TEXT,
  category TEXT,
  relevance_note TEXT,
  verification_status TEXT NOT NULL DEFAULT 'PENDING',
  rejection_reason TEXT,
  public_visible INTEGER NOT NULL DEFAULT 0,
  discovered_at TEXT NOT NULL,
  verified_at TEXT,
  updated_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS gr_tenders_status_idx ON gr_tenders(verification_status, public_visible);
CREATE INDEX IF NOT EXISTS gr_tenders_deadline_idx ON gr_tenders(deadline);
CREATE INDEX IF NOT EXISTS gr_tenders_cig_idx ON gr_tenders(cig);

CREATE TABLE IF NOT EXISTS gr_prospects (
  id TEXT PRIMARY KEY NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  company_name TEXT NOT NULL,
  website TEXT,
  town TEXT,
  province TEXT,
  phone TEXT,
  email TEXT,
  segment TEXT NOT NULL,
  evidence_url TEXT,
  evidence_ref TEXT,
  fit_reason TEXT,
  status TEXT NOT NULL DEFAULT 'QUALIFIED',
  outreach_status TEXT NOT NULL DEFAULT 'NOT_CONTACTED',
  response_status TEXT,
  checkout_started INTEGER NOT NULL DEFAULT 0,
  paid INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS gr_prospects_outreach_idx ON gr_prospects(outreach_status,status);

CREATE TABLE IF NOT EXISTS gr_prospect_matches (
  id TEXT PRIMARY KEY NOT NULL,
  prospect_id TEXT NOT NULL,
  tender_id TEXT NOT NULL,
  fit_score INTEGER NOT NULL,
  reason TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'PROPOSED',
  created_at TEXT NOT NULL,
  UNIQUE(prospect_id,tender_id)
);
CREATE INDEX IF NOT EXISTS gr_matches_prospect_idx ON gr_prospect_matches(prospect_id,fit_score DESC);
