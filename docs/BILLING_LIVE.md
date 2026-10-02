# Gara Radar — Live Billing State

Status date: 2026-10-02

## Stripe account

- Account: Studio Pura Luce
- Mode: live

## Founding Radar

- Product: `prod_VMqBJoDkuU3wVI`
- Price: `price_1UM6VNEKqHzcPkBDT7EW9mYX`
- Lookup key: `gara_radar_founding_monthly`
- Currency: EUR
- Amount: €9.90
- Interval: monthly
- Payment Link: https://buy.stripe.com/3cI7sL9UA1MNcbj50wgjC00
- Customer Portal: https://billing.stripe.com/p/login/3cI7sL9UA1MNcbj50wgjC00

## Checkout behavior

- Stripe-hosted Payment Link
- no free trial
- explicit customer opt-in
- redirect after completion to:
  https://gara-radar.soliwkr.workers.dev/grazie
- business name collection enabled but optional
- no payment is triggered by the beta signup form

## Webhook

Production endpoint:

`https://gara-radar.soliwkr.workers.dev/api/stripe/webhook`

Events:

- checkout.session.completed
- customer.subscription.created
- customer.subscription.updated
- customer.subscription.deleted
- invoice.paid
- invoice.payment_failed

The signing secret is stored only as a Cloudflare Worker secret named:

`STRIPE_WEBHOOK_SECRET`

Never commit the signing secret.

## Live entitlement bridge

The current public Worker records subscription/payment state in Cloudflare KV so the first payer can be captured before the full Vite Flare migration is complete.

Canonical migration target:

- `gr_subscriptions` in D1
- `gr_billing_events` in D1
- verified webhook route in `src/server/modules/gara-radar-billing/`

The migration branch already contains these D1 schemas and webhook handlers.

## Customer lifecycle

Stripe Customer Portal is configured for:

- customer email/name/address/tax-ID updates
- invoice history
- payment-method updates
- cancellation at period end
- cancellation-reason collection

## Tax note

The recurring Price currently has Stripe `tax_behavior=unspecified`.

Automatic Stripe Tax has NOT been enabled by this implementation.

Before scaling paid sales, tax behavior / VAT handling must be confirmed with the business's accounting setup. Do not silently enable or assume a tax treatment.

## Commercial rule

Do not send cold prospects directly to checkout.

Sequence:

```text
real relevant opportunities
→ prospect confirms relevance
→ Founding Radar offer
→ Payment Link
→ webhook
→ paid entitlement
→ recurring alert
```

The first payer is valid only if they are an unknown real business customer, not the owner/friend/family.
