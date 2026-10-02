# Gara Radar OS — Connector status

This file records executable connector status. A source is never called live merely because an API or dataset exists.

## LIVE

### SRC-SITE-EVENTS — Behavior

Implemented in the production Cloudflare Worker.

Captures:
- impressions
- opens
- saves
- source clicks
- signup / paid events when they exist

## CODE READY, AUTH REQUIRED

### SRC-GSC — Google Search Console

Code:
- `workers/os/connectors/search-console.ts`

The connector converts an already-fetched Search Console query snapshot into DEMAND Signals.

Authentication and HTTP transport are deliberately outside the normalizer. Runtime credentials must never be committed to Git.

Required before this source can become LIVE:
- a verified Gara Radar Search Console property
- read-only access to the official Search Console API
- a credential path stored outside source control
- a scheduled or event-driven collector

Until then the source remains `REQUIRES_AUTH`.

## PROVIDER-NEUTRAL MARKET DEMAND

### SRC-KEYWORD-MARKET — Keyword market snapshots

Code:
- `workers/os/connectors/keyword-market.ts`

This normalizer accepts provider snapshots containing keyword, locale, search volume, CPC, competition and trend data, then emits DEMAND Signals with deterministic intent classification.

No provider is connected yet, so the source remains `DORMANT`. This is intentionally separate from Search Console: Search Console observes demand that already reaches Gara Radar, while this source is for pre-site market discovery.

## APPROVED RESEARCH CORPUS

Code:
- `workers/os/connectors/research-corpus.ts`

This normalizer accepts already-approved PAIN, COMPETITION and REGULATORY observations. It does not crawl by itself. Acquisition must be allowlisted and source-aware.

## SOURCE VERIFIED, INGESTION NOT LIVE

### SRC-BDNCP-OPEN — ANAC BDNCP Open Data

ANAC provides public-contract open data through its official open-data portal, including downloadable structured datasets.

Do not mark this source LIVE until:
1. the exact current resource is pinned;
2. schema mapping has been tested against real data;
3. stable dedupe identifiers are verified;
4. product freshness is acceptable.

## LIMITED ACCESS

### SRC-GTRENDS — Google Trends

The official Trends API is limited-access. Do not create a production dependency until access exists.

## MANUAL / NOT AUTOMATED YET

### SRC-PAIN-WEB
Research from allowlisted forums, comments, reviews and FAQ sources.

### SRC-COMPETITORS
Public positioning, pricing, product changes and recurring complaints.

### SRC-ANAC-REG
Official platform/data-source change watch. It detects change; it does not make legal conclusions.

## AUTH REQUIRED LATER

### SRC-STRIPE
Revenue, checkout, paid and churn signals once billing exists.

## DORMANT

### SRC-FIRMOGRAPHIC
Provider not selected.

## Status semantics

- `LIVE`: data is actually being collected
- `REQUIRES_AUTH`: code/path exists but credentials are missing
- `LIMITED_ACCESS`: provider controls access
- `MANUAL`: research is possible but not automated
- `DORMANT`: intentionally not running
- `BROKEN`: previously working path failed
