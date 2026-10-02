# Gara Radar — Vite Flare migration

This branch is an isolated migration candidate based on the mature MIT-licensed
`jezweb/vite-flare-starter` Cloudflare-native repository.

## Rules

- Production remains on the existing `main` / Cloudflare Worker until this branch is verified.
- Gara Radar business logic is preserved under `src/server/modules/gara-radar-os/`.
- Existing static MVP is preserved under `legacy/`.
- Starter-owned Cloudflare resource IDs are intentionally removed/replaced with zero placeholders.
- No production D1/R2/DO resource is created or changed by this bootstrap.
- We will provision Gara Radar resources only after CI and the Control Room slice are green.

## Target

Cloudflare Worker + Static Assets + D1 + KV + Workflows, with one authenticated
Control Room for Sources, Signals, Segments, Opportunities, Experiments, Fitness,
Learnings and Human Actions.

## Current provisioning blocker

The migration build and local D1 schema can be validated without touching production.
Cloudflare account provisioning is currently blocked by the account's 10-database D1 limit.
No existing D1 database will be deleted, renamed, or repurposed automatically.

- Compile/type manifest: `wrangler.jsonc` (starter-compatible bindings for type generation only)
- Actual future preview deployment: `wrangler.preview.jsonc` (minimal Worker + D1)
- Preview D1 ID remains a zero placeholder until a safe D1 slot exists.

Production `gara-radar.soliwkr.workers.dev` remains unchanged.
