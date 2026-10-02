# Gara Radar OS — V1 frozen architecture

## Mandate

Gara Radar OS is the self-improving operating layer for one business: Gara Radar.

It does **not** discover unrelated businesses. It observes both sides of the procurement market, forms falsifiable hypotheses, runs bounded experiments, measures outcomes, preserves evidence-backed learnings, and reallocates attention toward better segments, matching and acquisition.

The loop is:

```text
OBSERVE
→ DISCOVER
→ THESIS
→ EXPERIMENT
→ MEASURE
→ FITNESS
→ KILL / HOLD / EXPAND / MUTATE
→ MEMORY
→ REPEAT
```

## Radars

1. SUPPLY — ANAC/BDNCP tenders, CPV, territory, amount, deadlines, buyer activity.
2. DEMAND — Search Console queries, search trends, search-intent patterns.
3. PAIN — recurring questions, complaints, reviews, forums, comments and FAQs.
4. COMPETITION — positioning, pricing, product changes and recurring complaints.
5. BEHAVIOR — Gara Radar impressions, opens, saves, source clicks and onboarding.
6. ECONOMIC — checkout, paid, churn, ARPU/LTV when billing is connected.
7. REGULATORY — changes to official public-data/platform behavior; flags changes but does not make legal conclusions.
8. FIRMOGRAPHIC — addressable business population by trade/territory when a source is selected.

## Current truth

LIVE:
- Gara Radar Cloudflare runtime.
- Site behavior telemetry.
- EXP-001 A/B allocation and bounded traffic adjustment.
- Cloudflare KV learning state.
- Airtable Control Room schema.

NOT LIVE YET:
- BDNCP ingestion.
- Search Console OAuth collection.
- Google Trends API (limited alpha access).
- pain/competitor crawler.
- Stripe.
- firmographic provider.

A source must remain DORMANT / MANUAL / REQUIRES_AUTH until it actually works.

## Control Room tables

Existing:
- GARE
- PROFILES
- MATCHES
- EVENTS
- EXPERIMENTS
- DECISIONS
- LEARNINGS
- POLICY

Added for OS V1:
- SOURCES
- SIGNALS
- MARKET SEGMENTS
- OPPORTUNITIES
- FITNESS
- HUMAN ACTIONS

## Signal rule

A Signal is an observation, not an idea or decision.

Every Signal should retain:
- source
- radar
- timestamp
- segment
- type
- subject
- payload
- confidence
- evidence URL when applicable

## Opportunity rule

The machine must not turn one interesting observation into a strategic pivot.

Initial deterministic gate before an Opportunity may be proposed:
- at least 5 supporting Signals
- at least 3 distinct radar families
- at least one SUPPLY signal
- at least one demand-side signal: DEMAND, PAIN or BEHAVIOR

Only then may a structured Opportunity proposal exist.

## Scoring

Opportunity score is deterministic:

```text
0.18 demand
+ 0.18 supply
+ 0.14 pain
+ 0.14 acquisition_fit
+ 0.12 data_quality
+ 0.16 automation_fit
+ 0.08 (1 - competition)
```

Scores are decision support, not truth. Raw dimensions and supporting Signal IDs must remain inspectable.

## Fitness

Keep separate:
- Data Fitness
- Match Fitness
- Acquisition Fitness
- Commercial Fitness
- Operational Fitness

Do not generate an EXPAND/FREEZE judgment when evidence is insufficient. The first implementation requires at least 20 observations for a composite score and at least 100 before deterministic EXPAND/FREEZE thresholds may fire.

## Side-effect architecture

```text
LLM
↓
structured proposal
↓
schema validation
↓
POLICY validation
↓
deterministic code
↓
side effect
↓
measurement
↓
memory
```

The LLM never directly:
- changes POLICY
- invents tender facts
- spends money
- changes price
- contacts users unsolicited
- makes legal/eligibility conclusions
- executes arbitrary URLs or shell

## Autonomy

Target: Level 2.

Autonomous, bounded and reversible:
- ranking weights
- card copy/layout
- alert timing
- experiment traffic allocation
- low-risk segmentation tests

Human gate:
- pricing
- spend
- paid acquisition
- contracts
- credentials
- destructive actions
- legal claims
- policy changes

## Next connectors

Order:
1. BDNCP supply connector
2. Search Console demand connector
3. deterministic segment aggregation + market fitness
4. pain/competitor research connector with allowlists
5. billing/economic connector
6. firmographic source

Do not build a Director that makes broad allocation decisions until those signals exist and the first real segment cycle closes.
