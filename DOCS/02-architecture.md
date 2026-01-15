# 02 - Arhitektura i struktura

## Folder struktura (frontend)
- `src/App.js`: definise rute.
- `src/components/`: layout i zajednicke UI komponente.
- `src/pages/`: stranice (ProductsList, ProductDetails, Cart).
- `src/graphql/`: upiti i mutacije.
- `src/hooks/`: mali custom hook-ovi (npr. IntersectionObserver, animacija badge-a).
- `src/styles/`: globalni CSS.
- `src/utils/`: helper funkcije.

## Routing
Koristim `react-router-dom` jer je standard u React aplikacijama.
- `/` -> lista proizvoda
- `/products/:id` -> detalji proizvoda
- `/cart` -> korpa

## Layout i header
Postoji `Layout` komponenta koja drzi:
- Sticky header (uvek vidljiv na vrhu).
- Main content unutar `Container` da layout ostane kontrolisan na velikim ekranima.

Header se kontrolise preko `Outlet` konteksta:
- Svaka stranica moze da promeni naslov.
- Stranice mogu da ubace akcioni taster u header (npr. "Add to cart" na detaljima).

Ovo je jednostavan pattern koji izbegava globalni state library samo za naslov/akcije.
