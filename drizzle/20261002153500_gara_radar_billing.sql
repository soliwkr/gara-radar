CREATE TABLE IF NOT EXISTS gr_subscriptions (
  id TEXT PRIMARY KEY NOT NULL,
  email TEXT,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  plan TEXT NOT NULL,
  status TEXT NOT NULL,
  current_period_end INTEGER,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS gr_subscriptions_stripe_subscription_idx
  ON gr_subscriptions(stripe_subscription_id);

CREATE INDEX IF NOT EXISTS gr_subscriptions_email_idx
  ON gr_subscriptions(email);

CREATE TABLE IF NOT EXISTS gr_billing_events (
  id TEXT PRIMARY KEY NOT NULL,
  type TEXT NOT NULL,
  stripe_object_id TEXT,
  received_at INTEGER NOT NULL
);
