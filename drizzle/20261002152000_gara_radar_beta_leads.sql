CREATE TABLE IF NOT EXISTS gr_beta_leads (
  id TEXT PRIMARY KEY NOT NULL,
  email TEXT NOT NULL,
  trade TEXT NOT NULL,
  territory TEXT NOT NULL,
  amount_range TEXT,
  status TEXT NOT NULL DEFAULT 'NEW',
  created_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS gr_beta_leads_created_idx ON gr_beta_leads(created_at DESC);
CREATE INDEX IF NOT EXISTS gr_beta_leads_email_idx ON gr_beta_leads(email);
