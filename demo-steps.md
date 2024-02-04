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
  - Explain Path Aliases (see `README.md`)

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

- Explain Automatic code-splitting and prefetching (see `README.md`)

- Add a `<Link>` to the `<Header>` to go back to the homepage

- Add a `<Link>` to the homepage to go to the dashboard

## Database

- Explain Vercel Postgres (see `README.md`)

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

- Explain React Server Components (see `README.md`)

- Explain Fetching Data (see `README.md`)

- Add `app/lib/data.js`

  - The logic in here could be done in components, but moving it into a module allows for separate of concerns
    - Comment out the timeout in `fetchRevenue`
    - Remove `noStore()` calls + import is removed

- Add `app/lib/utils.js` to get `formatCurrency()`

- Update `app/dashboard/page.js` 
  - Change the following

```js
import { fetchCardData, fetchLatestInvoices, fetchRevenue } from "@/app/lib/data";

export default async function Page() {
const revenue = await fetchRevenue();
const latestInvoices = await fetchLatestInvoices();
const {
  numberOfInvoices,
  numberOfCustomers,
  totalPaidInvoices,
  totalPendingInvoices,
} = await fetchCardData();

...

<Card title="Collected" value={totalPaidInvoices} type="collected" />
<Card title="Pending" value={totalPendingInvoices} type="pending" />
<Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
<Card
    title="Total Customers"
    value={numberOfCustomers}
    type="customers"
/>

...

<RevenueChart revenue={revenue}  />
<LatestInvoices latestInvoices={latestInvoices} />
```

- Add
  - `app/ui/dashboard/cards.js`
    - (in prep for suspense) In this component remove the `fetchCardData()` call
  - `app/ui/dashboard/revenue-chart.js`
    - (in prep for suspense) In this component add the `{ revenue }` prop and remove data fetch
  - `app/ui/dashboard/latest-invoces.js`
    - (in prep for suspense) In this component add the `{ latestInvoices }` prop and remove data fetch

## Switch to dynamic rendering

- Explain Static vs Dynamic Rendering (see `README.md`)

In `app/lib/data.js`

- Add `import { unstable_noStore as noStore } from 'next/cache';`
- Add `noStore();` too all data fetching functions
- Comment in the timeout and the console logs below and above (you'll see in the terminal)

The whole page is blocked while the data is being fetched

The app is only as fast as the slowest data fetch, however, we can use streaming for the slower requests

## Streaming whole page

- Explain Streaming (see `README.md`)

- Show whole page loading via `app/dashboard/loading.js`

```js
export default function Loading() {
  return <p>Loading...</p>;
}
```

- Refresh the page, notice that the `<Sidebar>` and `<Header>` load instantly since they're static (i.e. rendered via static rendering)

- Add `app/ui/skeletons.js`

- in `loading.js`
  - Add `import DashboardSkeleton from "@/app/ui/skeletons";`
  - Add `return <DashboardSkeleton />;`

- Temporarily update `app/dashboard/invoices/page.js` to show that the loading is applied to this page (as well as the customers page):

```js
import { fetchRevenue } from "@/app/lib/data";

export default async function Page() {
  const revenue = await fetchRevenue();

  return <p>Invoces Page</p>;
}
```

- This is because `loading.js` is a level higher than `invoices/page.js` and `customers/page.js`

- Create a directory `app/dashboard/(overview)` and move `loading.js` and `page.js` inside it

- Test the invoices page

- Revert the code in `app/dashboard/invoices/page.js`

## Stream individual components

- In `app/dashboard/(overview)/page.js` remove `const revenue = await fetchRevenue();` and the import

- In `app/dashboard/(overview)/page.js` add

```js
import { Suspense } from 'react';
import { RevenueChartSkeleton } from '@/app/ui/skeletons';

...

// Wrap <RevenueChart> and remove the `revenue` prop
<Suspense fallback={<RevenueChartSkeleton />}>
  <RevenueChart />
</Suspense>
```

- In `app/ui/dashboard/revenue-chart.js`

```js
import { fetchRevenue } from "@/app/lib/data";

export default async function RevenueChart() { // Add async, remove prop
  const revenue = await fetchRevenue(); // Add
  ...
}
```

- Do the same steps for `<LatestInvoices>`

  - Import `<LatestInvoicesSkeleton>`
  - Wrap in `<Suspense fallback={<LatestInvoicesSkeleton />}>`
  - Remove passing of prop
  - Move import of `fetchLatestInvoices()` to `app/ui/dashboard/latest-invoices.js`
  - Remove recieving prop

- We don't want each `<Card>` to be wrapped in a suspense, else we'll get a "popping" effect, so let's use a wrapper instead
  - Delete the `<Card>` components and cut the function call
  - Add

```js
<Suspense fallback={<CardsSkeleton />}>
  <CardWrapper />
</Suspense>
```

- In `app/ui/dashboard/cards.js` add the function call you cut, and import it

- Delete `loading.js`
- Move `page.js` to `dashboard/`
- Delete (overview)

## Add a server action

- Update `app/dashboard/invoices/page.js`
  - Add `app/ui/invoices/create-form.js`
  - Add `app/ui/button.js`

- Add `app/lib/actions.js`

We would normally have another component showing the invoices