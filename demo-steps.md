# Demo Steps

- `npx create-next-app@latest`
  - Without typescript
- `npm run dev`

## Routing

- Explain routing (see `README.md`)

- Update `app/page.js` to remove the boilerplate and add a `<h1>`

## Styling Options

- Update `app/global.css` delete all `:root` and `body` styles and show tailwind directives

- Update `layout.js` meta data

- Create `app/ui` and move `global.css` into it + update `layout.js` to import `import "@/app/ui/global.css";`

- Create a `app/ui/home.module.css` to show CSS Modules and add styles in `page.js`

```css
.title {
  font-size: 2rem;
  background-color: red;
}
```

```js
import styles from "@/app/ui/home.module.css";

<h1 className={styles.title}></h1>;
```

- Move the `<h1>` to a `<Header />` in `layout.js`

- `npm i sass` and add `app/ui/Header/Header.scss` styles. 

- Update `globals.css` to `global.scss`

- Remove the `app/ui/home.module.css` and the import from `page.js`

## Fonts

- Explain optimised fonts (see `README.md`)

- Add a primary font

  - Remove the inter font from `layout.js` and add `app/ui/fonts.js` then set it on the body of `layout.js`
  - The subsets are here: https://fonts.google.com/specimen/Roboto/glyphs
  - The weights are here: https://fonts.google.com/specimen/Roboto

- Add a secondary font

  - Add playfair display in `app/ui/fonts.js`
  - Use it in `<Header>`

## Images

- Explain optimised images (see `README.md`)

- Add hero images to `public/`

- Add images to `app/page.js`

## Add more routes

- Add a dashboard folder inside `app/dashboard/`

- Add a page inside dashboard `app/dashboard/page.js`

```js
export default function Page() {
  return <p>Dashboard Page</p>;
}
```

- Test it by visiting `/dashboard`

- Add `app/dashboard/customers/page.js` and `app/dashboard/invoices/page.js` with just a `<p>` for now

- Add `app/dashboard/layout.js` and `app/ui/dashboard/sidebar.js`

- Add a `<Link>` to the `<Header>` to go back to the homepage

- Add a `<Link>` to the homepage to go to the dashboard

## Database

- Deploy the project on Vercel

- (If a DB exists, go back to main page > storage > delete)

- Project > Storage > Postgres > Defaults...

- Get .env details from `.env.local` tab

- Make a `.env`, paste, and add to `.gitginore` and `npm i dotenv`

- Add `scrpits/seed.js`

- `npm i @vercel/postgres bcrypt` to get vercel postgres SDK

- Make `app/lib/placeholder-data.js`

- Add `"seed": "node -r dotenv/config ./scripts/seed.js"` script 
  - `-r` loads config from `dotenv` in `node_modules`

- Run `npm run seed`

- Go to data tab on vercel, browse the tables, and run

```sql
SELECT invoices.amount, customers.name
FROM invoices
JOIN customers ON invoices.customer_id = customers.id
WHERE invoices.amount = 666;
```

## Fetching Data

- Add `app/lib/data.js`
  - The logic in here could be done in components, but moving it into a module allows for separate of concerns

- Add `app/lib/utils.js` to get `formatCurrency()`

- Update `app/dashboard/page.js` 

- Add 
  - `app/ui/dashboard/cards.js`
  - `app/ui/dashboard/revenue-chart.js`
  - `app/ui/dashboard/latest-invoces.js`