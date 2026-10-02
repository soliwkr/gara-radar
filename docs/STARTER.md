# Starter decision

Prima di costruire Gara Radar sono stati valutati starter GitHub/Cloudflare.

## Scelto

Cloudflare official **React Router + Hono Fullstack Template**:

https://github.com/cloudflare/templates/tree/main/react-router-hono-fullstack-template

Motivi:

- ufficiale Cloudflare;
- un solo Worker per frontend + API;
- React + React Router;
- Hono per gli endpoint;
- Tailwind già pronto;
- deploy con Wrangler;
- abbastanza leggero da non imporre database/auth/billing prima della validazione.

## Non scelti per l'MVP

Starter SaaS completi con D1, Better Auth, team, admin e billing.

Sono ottimi quando il problema è già validato, ma per Gara Radar introdurrebbero infrastruttura prima dei dati e delle vendite.

## Regola

Prima di sviluppare un nuovo blocco infrastrutturale, cercare sempre se Cloudflare o GitHub offrono già uno starter/template ufficiale o maturo da adattare.
