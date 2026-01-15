# 05 - Alternative i zasto nisu izabrane

## Vite umesto Webpack
- Vite je brz i moderniji, ali zadatak eksplicitno trazi rucnu konfiguraciju Webpack-a.
- Zato je Webpack izabran da se ispuni zahtev i pokaze razumevanje build pipeline-a.

## React Query + REST
- Moglo je da se koristi REST i React Query.
- Backend vec ima GraphQL, pa je Apollo najlogicniji izbor i pokazuje rad sa GraphQL-om.

## Global state (Redux/Zustand)
- Aplikacija je mala i Apollo vec hendluje vecinu state-a kroz cache.
- Dodatni global state bi bio overkill i nepotrebno komplikuje.

## Potpuni modal umesto strane
- Design ima PDF sa modalom, ali requirement eksplicitno trazi "Product Details" page.
- Zato je izabran ruter i zasebna stranica, uz jednostavan back link.
