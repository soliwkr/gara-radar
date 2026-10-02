# Gara Radar

Gara Radar trova le gare pubbliche rilevanti per mestiere e territorio e le rende comprensibili senza linguaggio da ufficio gare.

## MVP

Primo verticale: **impiantisti/elettricisti nel Lazio**.

Obiettivo business: **primo cliente sconosciuto pagante** prima di espandere prodotto e infrastruttura.

## Stack MVP

- Cloudflare Workers
- React + React Router
- Hono
- Tailwind CSS
- Airtable come control room e database operativo MVP
- Stripe solo quando il flusso dati e il valore sono validati

## Starter

Il progetto parte dall'architettura dell'officiale **Cloudflare React Router + Hono Fullstack Template**:
https://github.com/cloudflare/templates/tree/main/react-router-hono-fullstack-template

Scelta intenzionale: non usare un SaaS boilerplate pesante. Auth, D1, team, billing avanzato e dashboard admin vengono aggiunti solo se servono dopo la validazione.

## Regola di prodotto

1. Prima dati reali.
2. Poi matching utile.
3. Poi landing + alert.
4. Poi pagamento.
5. Solo dopo infrastruttura aggiuntiva.

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
