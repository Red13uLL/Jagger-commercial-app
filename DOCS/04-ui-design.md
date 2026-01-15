# 04 - UI i vizuelne odluke

## MUI kao osnova
Zadatak eksplicitno trazi Material UI, pa sam koristio MUI komponente gde god je moguce (Card, Grid, AppBar, Button, Rating...).

## Tema i identitet
- Paleta boja je topla (krem pozadina + narandzasti akcent) da deluje "premium" i mirno.
- Definisani su CSS varijable u `global.css` radi doslednosti.
- Ubaceni su Google fontovi (Space Grotesk + Fraunces) da tipografija bude prepoznatljiva i nije default Roboto.

## Header i scroll ponasanje
- Header je `position: sticky` i ima osnovnu sivu liniju.
- Kada korisnik skroluje, dodaje se blaga senka da se naglasi sloj (optional requirement iz zadatka).

## Add to cart u headeru
- Na detaljima proizvoda postoji glavni "Add to cart" pored slike.
- Ako korisnik skroluje i taj deo nije vidljiv, isti taster se prikazuje u headeru.
- Realizovano preko IntersectionObserver hook-a.

## Animacija korpe
- Kada se menja `cartCount`, badge dobija kratku "pulse" animaciju.
- To je subtilan signal da je akcija uspevala.

## Responsivnost
- Grid layout za listu proizvoda.
- Na mobilnim ekranima elementi se slazu vertikalno, a kartice i summary se prilagodjavaju sirini.
