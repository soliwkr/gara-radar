# Gara Radar — Canonical Project Spec

> Status: FROZEN UNTIL FIRST UNKNOWN PAYING CUSTOMER
>
> Date frozen: 2026-10-02
>
> This file is the product source of truth. New ideas do not change scope unless they directly remove a blocker to the first paying customer.

## 1. Business

Gara Radar is a recurring information product for small and medium Italian contractors.

It does not sell consulting, tender-writing, legal advice or managed bid services.

Core job:

> Help a contractor discover the public tenders worth opening, faster than checking portals manually.

Initial wedge:

- trade: electrical installations / technical maintenance
- territory: Lazio
- customer: business owner, commercial lead or person informally responsible for finding work
- product model: recurring subscription
- initial launch price: €9.90/month
- first commercial milestone: one unknown customer pays from their own business need

## 2. Product promise

Public promise:

> Meno bandi da leggere. Più gare da valutare.

Operational promise:

> Tell Gara Radar what your company does, where it works and what size jobs matter. The service surfaces potentially relevant opportunities with the facts needed for a first decision and always links back to the official source.

Gara Radar does NOT claim:

- that a company is eligible
- that requirements are satisfied
- that a tender will be won
- legal or administrative certainty
- completeness of every public procurement source

## 3. User journey

### Acquisition

1. User lands on Gara Radar.
2. User sees real, verified opportunities.
3. User understands the filtering proposition.
4. User submits trade + territory + amount range + email.

### Activation

5. Gara Radar creates a profile.
6. User receives 3-5 currently relevant opportunities.
7. Each opportunity explains:
   - title
   - buyer
   - amount
   - deadline
   - territory
   - category / CPV when available
   - why it may be relevant
   - official source

### Conversion

8. After the user has seen useful matches, the product offers the Founding Radar subscription.
9. Checkout is explicit.
10. After payment, recurring alerts continue automatically.

### Retention

11. The user can:
   - open source
   - save
   - dismiss
   - mark irrelevant
12. Those actions improve ranking and future matching.
13. The product must keep producing fresh opportunities or the subscription has no value.

## 4. Founding offer

Name: Founding Radar

Price: €9.90/month

Initial scope:

- one company profile
- one main territory
- one main trade/category profile
- recurring matched opportunity alerts
- official source links
- save / dismiss feedback
- cancel anytime

Founding rule:

- no annual commitment
- no fake scarcity
- no hidden renewal
- no promise of tender eligibility or success
- the user sees real opportunities before being asked to pay

The price may change later, but the first goal is proof that a stranger pays for recurring relevance.

## 5. Product surfaces

### Public site

Routes:

- /
- /gare
- /come-funziona
- /settori
- /prezzi
- /faq
- /beta
- /privacy
- /termini
- /cookie
- /disclaimer

Purpose:

- explain the product
- demonstrate real supply
- collect profiles
- convert to paid

### Customer product

Required before scale:

- profile
- matched feed
- tender detail
- save / dismiss / source-click
- alert preferences
- billing status

Do not build a broad customer dashboard before these are working.

### Internal Control Room

Required views:

- Sources
- Supply health
- Profiles
- Matches
- Signals
- Experiments
- Human actions
- Revenue

The Control Room is operational tooling, not the product sold to customers.

## 6. Cloudflare-first architecture

Canonical direction:

```text
PUBLIC / CUSTOMER UI
        |
        v
Cloudflare Worker / Vite Flare app
        |
        +---- D1 ------------------------------+
        |                                      |
        |  tenders                             |
        |  profiles                            |
        |  matches                             |
        |  alerts                              |
        |  events                              |
        |  subscriptions                       |
        |  signals / learnings                 |
        |                                      |
        +---- Queues / scheduled jobs ----------+
        |                                      |
        +---- KV -------------------------------+
        |  short-lived config / experiment state
        |
        +---- R2 only if documents/assets require it

External:
ANAC / official procurement sources
Search Console
email provider
Stripe
approved research sources
```

Rules:

- Cloudflare first.
- GitHub is code/product-spec source of truth.
- D1 becomes operational product data.
- KV is not the permanent business database.
- Airtable may remain a temporary operational mirror but is not the final brain.
- No VPS orchestration dependency.
- No Windmill.
- No custom agent framework.
- Use mature repository/framework code where possible.

## 7. Canonical data objects

### Tender

Minimum required:

- source id
- source URL
- CIG / procedure / lot identifiers when available
- title
- buyer
- territory
- CPV / category
- amount
- published date
- deadline
- status
- source updated timestamp
- normalized searchable text

### Profile

- company / contact identifier
- email
- trade
- territories
- CPV/category preferences
- min/max amount
- alert cadence
- plan / billing state

### Match

- profile id
- tender id
- deterministic score
- reason codes
- created timestamp
- state: NEW / OPENED / SAVED / DISMISSED / SOURCE_CLICKED

### Event

- profile/user
- tender
- event type
- timestamp
- experiment context
- metadata

### Subscription

- profile/customer
- Stripe customer id
- Stripe subscription id
- plan
- status
- current period end

## 8. Matching

V1 matching is deterministic.

Hard filters first:

1. active deadline
2. territory
3. category / CPV / keyword fit
4. amount range where known

Then ranking:

- direct trade/category fit
- geographic fit
- amount fit
- deadline usefulness
- prior user feedback

AI may:

- summarize
- classify text
- explain why a tender may be relevant

AI may not:

- invent missing tender facts
- assert legal eligibility
- override source truth

## 9. Supply strategy

The product dies without reliable supply.

Priority order:

1. official sources with stable identifiers
2. ANAC / BDNCP structured data
3. regional / contracting authority portals where needed
4. manual verification only as a bridge

Launch acceptance target:

- at least 20 currently open, genuinely relevant Lazio opportunities in the initial segment
- every displayed real opportunity has a source URL
- stale/expired opportunities removed or clearly marked

Automation target after first payer:

- daily refresh
- dedupe
- expiry handling
- source health monitoring

## 10. Alerts

V1 channel: email.

Do not add WhatsApp before email proves useful.

A useful alert contains:

- 3-7 best new opportunities
- title
- buyer
- amount
- deadline
- relevance reason
- official-source button

No alert when there is nothing sufficiently relevant.

## 11. Revenue

Commercial sequence:

```text
real opportunity
→ profile
→ first useful matches
→ paid offer
→ Stripe checkout
→ recurring alert
```

Do not put billing before value demonstration.

North-star proof:

> An unknown business pays €9.90 because it wants the radar to continue.

Not counted as validation:

- owner paying himself
- family/friend payment
- free signup
- verbal interest
- social engagement
- traffic alone

## 12. Analytics funnel

Track:

- PAGE_VIEW
- GARE_VIEW
- SOURCE_CLICK
- BETA_START
- SIGNUP
- MATCH_DELIVERED
- MATCH_OPEN
- SAVE
- DISMISS
- CHECKOUT_START
- PAID
- CANCEL

Initial funnel dashboard:

```text
visitors
→ profiles
→ profiles receiving useful matches
→ checkout starts
→ paid
```

## 13. Gara Radar OS

The self-improving system exists to improve one business.

Loop:

```text
OBSERVE
→ DISCOVER
→ THESIS
→ EXPERIMENT
→ MEASURE
→ FITNESS
→ HOLD / EXPAND / MUTATE / FREEZE
→ MEMORY
```

Autonomous and reversible:

- ranking weights
- presentation tests
- alert timing tests
- experiment traffic split

Human gate:

- pricing
- spend
- legal copy
- credentials
- destructive infrastructure changes
- unsolicited outreach at scale
- product scope changes

The OS is not allowed to become a second product.

## 14. Current baseline — 2026-10-02

Public site:

- live on Cloudflare Workers
- full public information architecture live
- verified opportunity examples live
- beta form live
- legal/footer pages live

Observed live metrics at the time of this freeze:

- page views: 13
- official source clicks: 1
- beta signups: 1
- known test signup: owner/test traffic, therefore not commercial validation

Still missing for first payer:

- enough real supply in the feed
- production customer profile/feed path
- email alert delivery
- Stripe checkout/subscription
- real outbound acquisition
- first non-owner user feedback

## 15. Stage gates

### Gate A — Useful radar

Done when:

- >= 20 open relevant tenders
- source links verified
- expiry correct
- 5 manually reviewed sample matches look useful

### Gate B — Useful profile

Done when:

- user submits profile
- system produces 3-5 credible matches
- relevance reason is inspectable
- user can dismiss an irrelevant result

### Gate C — Useful alert

Done when:

- email is delivered
- links are tracked
- no irrelevant bulk dump
- user can reach official source

### Gate D — Payable

Done when:

- Stripe product/price exists
- checkout works
- PAID event recorded
- paid profile is entitled to recurring alerts

### Gate E — First payer

Done only when:

- customer is not the owner/friend/family
- payment is real
- user received useful opportunities before payment
- subscription status is recorded

Only after Gate E may scope expand materially.

## 16. What is explicitly NOT allowed before first payer

- nationwide launch
- ten verticals
- mobile app
- elaborate agent organization
- replacing Cloudflare with another platform
- rebuilding the framework again
- enterprise features
- procurement consulting
- complex CRM
- paid ads before the direct acquisition message converts manually
- months of SEO content before the paid proposition works

## 17. Change control

Until the first unknown payer:

1. This document wins over new ideas.
2. A new feature must answer: “Does this remove a blocker to Gate E?”
3. If not, it goes to AFTER FIRST PAYER.
4. Architecture changes require a concrete failure in the current Cloudflare-first stack.
5. Product scope remains Lazio + technical/electrical wedge until evidence says otherwise.

## 18. Immediate sequence

1. Build reliable first-segment supply.
2. Build profile → match → alert loop.
3. Connect Stripe.
4. Put payment CTA after demonstrated matches.
5. Acquire 50 qualified businesses manually.
6. Send each prospect real value, not a generic pitch.
7. Close the first unknown payer.
8. Only then automate and expand.
