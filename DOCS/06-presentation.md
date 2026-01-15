# 06 - Prezentacija (govorna skripta)

Ovaj tekst je zamisljen kao govor koji pratis na tehnickom razgovoru.
Moze da se cita od pocetka do kraja ili kao bullet podsetnik.

## 1) Uvod (30-60 sek)
"Napravio sam frontend za e-commerce aplikaciju sa React + MUI, vezan na GraphQL backend.
Fokus mi je bio na cistom setup-u od nule, jasnoj arhitekturi i UI koji prati dizajn.
Pored obaveznih stvari, pokrio sam i neke opcione zahteve: sticky header, drop shadow na scroll, i animaciju korpe."

## 2) Setup i tooling (zasto Webpack/Babel/ESLint)
"Zadatak trazi da se konfiguracija rucno napravi, zato sam birao Webpack umesto Vite-a.
Babel je potreban za JSX i moderni JS, a ESLint sam ubacio zbog kvaliteta koda i lakseg code review-a.
U Webpacku sam definisao `GRAPHQL_URL` preko `DefinePlugin` da backend adresa bude promenljiva bez diranja koda.
To je korisno ako backend bude hostovan drugde."

## 3) Arhitektura (kako je organizovan kod)
"Routing je u `src/App.js` sa tri rute: lista proizvoda, detalji i korpa.
Imam `Layout` komponentu koja drzi header i main content, i time izbegavam dupliranje layout-a po stranicama.
Stranice su u `src/pages`, API sloj u `src/graphql`, a zajednicke komponente u `src/components`.
To odrzava projekt preglednim i skalabilnim."

## 4) Data flow (GraphQL + Apollo)
"Backend vec nudi GraphQL, pa je Apollo prirodan izbor.
- `useQuery` citam proizvode i korpu.
- `useMutation` za add/remove/clear cart.
Posle mutacije radim `refetchQueries` da osvezim korpu i badge u headeru.
Mogao sam rucno da update-ujem cache, ali za ovaj scope je refetch najbezbedniji i najjasniji."

## 5) UI/UX odluke
"MUI komponente su svuda gde je moguce (Card, Grid, AppBar, Button, Rating...)
Dodao sam custom temu: topla pozadina, narandzasti akcent i dva fonta (Space Grotesk + Fraunces).
Header je sticky i dobija senku pri scroll-u (optional requirement).
Add to cart dugme je uz sliku proizvoda, ali ako se taj deo izgubi iz view-a, dugme se pojavi u headeru.
Korpa badge pulsira kad se doda proizvod, kao vizuelni feedback."

## 6) Responsivnost
"Layout se prilagodjava preko MUI breakpoint-a.
Lista proizvoda se prelama u gridu, a korpa na mobilnom ide vertikalno radi citljivosti."

## 7) Alternative (sta sam mogao drugacije)
"Vite umesto Webpack-a bi dao brzi dev start, ali zadatak trazi manualni setup.
REST + React Query je opcija, ali GraphQL je vec dostupan i Apollo je standardno resenje.
Redux/Zustand nisu potrebni jer je aplikacija mala i Apollo cache vec resava vecinu state-a."

## 8) Zakljucak
"Fokus mi je bio na cistom setup-u, realnom produkcijskom pristupu i UX detaljima.
Resenje je spremno za dalje iteracije: search, filters, checkout, auth itd."
