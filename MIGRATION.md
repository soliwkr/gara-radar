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
