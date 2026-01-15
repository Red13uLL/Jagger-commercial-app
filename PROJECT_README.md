# JAGGAER Frontend - Project README

Ovo je radni README za moje resenje (odvojeno od task README-a).

## Pokretanje

### 1) Backend
```
cd backend
npm install
npm run start
```

### 2) Frontend
```
cd frontend
npm install
npm run start
```

Frontend je na: http://localhost:8080

## Promena backend URL-a
Ako backend nije na default adresi, moze se koristiti env var:
```
GRAPHQL_URL=http://127.0.0.1:3000/graphql npm run start
```
Ili u zsh terminalu:
```
export GRAPHQL_URL=http://127.0.0.1:3000/graphql
npm run start
```

## Projekat struktura (frontend)
- `src/App.js`: routing
- `src/components/`: layout i zajednicke komponente
- `src/pages/`: pages (lista, detalji, korpa)
- `src/graphql/`: upiti i mutacije
- `src/hooks/`: mali custom hook-ovi
- `src/styles/`: globalni stilovi
- `src/utils/`: helper funkcije

## DOCS
Detaljna objasnjenja i prezentacija su u `/DOCS`:
- `DOCS/01-setup.md`
- `DOCS/02-architecture.md`
- `DOCS/03-data-flow.md`
- `DOCS/04-ui-design.md`
- `DOCS/05-alternatives.md`
- `DOCS/06-presentation.md`
