# Gara Radar

Gara Radar trova le gare pubbliche rilevanti per mestiere e territorio e le rende comprensibili senza linguaggio da ufficio gare.

> **Shipping rule:** online prima, infrastruttura dopo.

## MVP

Primo verticale: **impiantisti/elettricisti nel Lazio**.

Obiettivo business: **primo cliente sconosciuto pagante** prima di espandere prodotto e infrastruttura.

## Stack MVP

- Cloudflare Workers
- React + React Router
- Hono
- Tailwind CSS
- Airtable come control room e database operativo MVP
- Stripe quando il flusso dati e il valore sono validati

## Starter decision

Per arrivare online subito teniamo il **Cloudflare React Router + Hono Fullstack Template** già inizializzato.

Abbiamo valutato starter SaaS più completi (auth, billing, DB, dashboard), ma non blocchiamo il lancio per una migrazione di boilerplate. Le parti SaaS verranno aggiunte quando servono, riusando componenti/starter maturi invece di reinventarle.

## Preview

- File statico zero-build: `preview.html`
- Sito statico: `site/`
- Workflow GitHub Pages predisposto: `.github/workflows/pages.yml`
- Deploy Cloudflare: `npm run deploy`

## Regola di prodotto

1. Online oggi.
2. Dati reali.
3. Matching utile.
4. Alert.
5. Primo pagamento.
6. Solo dopo: auth/billing/dashboard più ricchi.

## Sviluppo

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

Deploy Cloudflare:

```bash
npm run deploy
```
