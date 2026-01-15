# 03 - Data flow (GraphQL i Apollo)

## Zasto Apollo Client
Backend vec nudi GraphQL, a Apollo Client:
- Upravlja cache-om automatski.
- Ima jednostavan API za upite/mutacije.
- Lako se integriše sa React komponentama kroz `useQuery` i `useMutation`.

## Gde su upiti i mutacije
- `src/graphql/queries.js` -> GET_PRODUCTS, GET_PRODUCT, GET_CART, GET_CART_COUNT
- `src/graphql/mutations.js` -> ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART

## Kako tece data
1. **Lista proizvoda** koristi `GET_PRODUCTS`.
2. **Detalji proizvoda** koriste `GET_PRODUCT` sa `id`.
3. **Korpa** koristi `GET_CART`.
4. **Badge u headeru** koristi `GET_CART_COUNT`.

## Cache i osvezavanje
Kod mutacija (add/remove/clear) koristim `refetchQueries`:
- Time se osigurava da se korpa i broj u headeru osveze pouzdano.
- Alternativa bi bila rucno azuriranje cache-a kroz `cache.modify`, ali refetch je bezbedniji i jasniji za ovaj scope zadatka.

## Alternativa
Moglo se ici i sa REST + React Query. Ipak, GraphQL je vec dostupan, pa je logican izbor da se koristi i da se prikaze kompetencija.
