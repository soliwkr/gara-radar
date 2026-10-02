# Gara Radar — First Payer Playbook

> Single objective: one unknown business pays €9.90/month because it wants Gara Radar to keep sending relevant opportunities.

## 1. Definition of done

The first payer counts only if:

- the buyer is not the owner, family or a friend doing a favor
- the buyer has a real business need
- the buyer has seen at least one genuine relevant opportunity before checkout
- Stripe records a real payment
- the paid profile remains active for recurring alerts

## 2. Offer

### Founding Radar

€9.90/month, cancel anytime.

Includes:

- one business profile
- Lazio
- one primary trade/category
- matched opportunities
- official-source links
- recurring email alerts
- save / dismiss feedback

The first 20 paying users may keep the founding price for 12 months if the commercial terms are implemented that way in Stripe.

Do not sell “AI”.
Do not sell “our database”.
Do not sell “all Italian tenders”.

Sell:

> We filter the public opportunities so you spend time only on the ones worth checking.

## 3. The conversion asset

Every prospect should see value before a payment request.

The ideal first-touch asset is a personalized mini radar:

```text
IMPRESA: <name>
TRADE: electrical / technical maintenance
AREA: Lazio / province
OPEN OPPORTUNITIES FOUND: 3

1. <tender>
   amount
   deadline
   why it may fit
   official source

2. ...

3. ...
```

CTA:

> Vuoi che Gara Radar continui a cercarle e filtrale per te? Founding Radar: €9,90/mese, cancellabile.

## 4. Initial ICP

Do not target every electrician.

Prioritize businesses that show at least two of these:

- commercial / industrial electrical work
- maintenance contracts
- public or condominium work
- facility / technical services
- structured company website
- multiple employees or operating teams
- service area across a province or region
- evidence they take work above micro-job size

Avoid initially:

- purely residential one-person emergency electricians
- businesses with no plausible capacity for the tender sizes currently available
- businesses outside the current data coverage

## 5. Prospect batch

First batch: 50 businesses.

Composition:

- 20 Rome / metropolitan area
- 15 Latina / southern Lazio
- 10 Frosinone
- 5 Rieti / Viterbo combined

This allocation is operational, not a market-size claim. Adjust after supply density and responses are measured.

Each prospect record:

- company
- website
- town
- phone
- email/contact channel
- observed trade
- likely job-size fit
- 1-3 real matched tenders
- outreach status
- response
- checkout
- paid

## 6. Outreach message

The message must contain evidence.

Bad:

> Abbiamo creato una piattaforma AI per le gare pubbliche.

Good:

> Ho trovato tre procedure aperte nel Lazio che sembrano coerenti con il tipo di impianti che fate. Ti mando importo, scadenza e fonte. Se sono del tipo che valuti davvero, Gara Radar può continuare a filtrare le nuove gare per €9,90/mese.

No fake personalization. No claim that the prospect is eligible.

## 7. Contact cadence

For each qualified prospect:

Day 0:
- send mini radar by email or business contact channel
- link to the exact Gara Radar page / profile
- one CTA

Day 1:
- short follow-up asking one question:
  “Queste sono gare che prendereste almeno in considerazione?”

Day 3:
- if positive or ambiguous, send one newly found opportunity
- payment CTA

Day 7:
- final concise follow-up
- stop if no response

Do not spam indefinitely.

## 8. Sales conversation

There is only one validation question:

> Se Gara Radar continuasse a mandarti solo opportunità di questo tipo, €9,90 al mese sarebbe una decisione semplice?

If no, discover which variable is wrong:

- tenders not relevant
- sizes wrong
- geography wrong
- too few opportunities
- already solved another way
- price/value mismatch

Record the reason. Do not immediately invent another feature.

## 9. Payment timing

Do not keep the useful beta free indefinitely.

Sequence:

1. deliver sample value free
2. ask whether matches are useful
3. if yes, present Founding Radar
4. checkout immediately available

A beta signup with no payment path is not the commercial funnel.

## 10. Daily operating scoreboard

Track every day:

- new verified tenders
- qualified prospects added
- personalized mini radars sent
- replies
- positive relevance confirmations
- checkout starts
- paid customers

Primary ratios:

```text
reply rate = replies / outreach
relevance rate = "yes, relevant" / replies
checkout rate = checkout starts / positive relevance
paid rate = paid / checkout starts
```

## 11. First 5-day sprint

### Day 1 — Supply + payment

- reach 20 verified open opportunities in the wedge
- connect Stripe
- create Founding Radar €9.90/month
- add checkout CTA
- ensure PAID can be recorded

### Day 2 — Matching

- create 10 real business profiles
- manually QA each set of matches
- fix hard filters before adding AI cleverness

### Day 3 — First outbound

- build first 25 qualified prospects
- send 10 personalized mini radars
- collect replies

### Day 4 — Iterate

- inspect every reply
- correct trade/territory/amount matching
- send 10-15 more personalized mini radars
- make checkout available to every positive respondent

### Day 5 — Close

- follow up positives
- deliver one fresh opportunity if available
- ask for the €9.90 subscription
- target: first unknown payer

If there is no payer after 50 qualified prospects:

Do not redesign the site.

Diagnose in this order:

1. did prospects open/respond?
2. did they say opportunities were relevant?
3. did they want ongoing alerts?
4. did they reach checkout?
5. did checkout fail?

Each failure maps to a different problem.

## 12. Kill / mutate thresholds

After 50 qualified prospects:

### Acquisition problem

If < 5 replies:
- message/list/contact channel is weak
- do not change the product yet

### Relevance problem

If >= 5 replies but < 30% say the opportunities are worth evaluating:
- matching/supply wedge is weak
- mutate segment or match rules

### Monetization problem

If >= 5 users confirm relevance but nobody starts checkout:
- offer/recurring value proposition is weak
- test packaging/price only after confirming ongoing need

### Checkout problem

If checkout starts but no one completes:
- fix payment friction/trust/technical issues

## 13. After first payer

Immediately:

- personally verify their next alert
- measure source click / save / dismiss
- ask after first useful cycle whether they would be disappointed if the service disappeared
- acquire customer #2-5 with the same wedge

Do not expand nationally after customer #1.

Target next proof:

> 5 paying businesses in the same wedge with repeat alert engagement.
