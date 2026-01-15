# 01 - Setup i tooling

## Sta je uradjeno
1. Kreiran je `/frontend` folder sa sopstvenim `package.json`.
2. Postavljena je konfiguracija za Webpack (`/frontend/webpack.config.js`).
3. Dodata je Babel konfiguracija (`/frontend/babel.config.js`) za JSX i moderni JS.
4. Uveden je ESLint (`/frontend/.eslintrc.cjs`) za osnovni kvalitet koda.
5. Napravljen je `public/index.html` i ulazna tacka `src/index.js`.

## Zasto ovako
- **Webpack**: zadatak eksplicitno trazi da konfiguracija bude rucno napisana. Webpack je industrijski standard i pokazuje razumevanje bundling procesa.
- **Babel**: potreban da bi JSX i moderni JS radili u raznim browserima.
- **ESLint**: minimizuje regresije i olaksava code review; pokazuje profesionalni pristup.
- **Env var za API**: `GRAPHQL_URL` je ubacen preko Webpack `DefinePlugin` da bi backend mogao lako da se menja bez diranja koda.

## Kako da pokrenes
1. U `/backend` pokrenuti API:
   - `npm install`
   - `npm run start`
2. U `/frontend` instalirati zavisnosti:
   - `npm install`
3. Pokrenuti frontend:
   - `npm run start`

Frontend po defaultu ide na `http://localhost:8080`. Ako se menja backend URL, moze se koristiti:
`GRAPHQL_URL=http://127.0.0.1:3000/graphql npm run start`
