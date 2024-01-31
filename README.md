# Next.js (V14)

This demo is based off the following guide:
- https://nextjs.org/learn
- Chapters 1 - 9

I would recommend going through the full tutorial to learn extra concepts e.g:
- Server Actions (running code directly on the server)
- Auth via [NextAuth.js](https://authjs.dev/reference/nextjs)

## Overview

- Next.js is a React Framework which adds various features to React
  - File-system routing
  - Server side rendering
  - Font optimisation
  - Image optimisation
  - Automatic code-splitting and prefetching
  - Etc

## Concepts

### Routing

_Note: Previous versions of Next.js (V13 and below) use the `pages/` directory which is still supported._

Routing in Next V14 is managed via a creating folders and files within the `app/` directory (i.e. a "file-system based router") - [nextjs.org/docs/routing](https://nextjs.org/docs/app/building-your-application/routing)
  - Folders define routes
  - Files are used to create some UI

![Route Segments](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Froute-segments-to-path-segments.png&w=1920&q=75&dpl=dpl_D8FSJkm5fGY8PYCjNmfLdsHxEyk8)

Notice the term "segment" above

There are a few "special files" that Next.js provides to build different parts of the UI (using `.js`, `.jsx` or `.tsx`)
  - `layout.js` creates shared UI for a segment + child segments
  - `page.js` creates unique UI for a specific route + makes the route publicly accessible
  - `loading.js` creates loading UI for a segment and it's children
  - `not-found.js` creates not found UI for a segment and it's children
  - `error.js` creates error UI for a segment and it's children
  - `route.js` creates a server side API endpoint + makes the route publicly accessible
  - Any other files (e.g. components, styles, tests etc) with other file names (e.g. `components/button.js` or `lib/helpers.js`) are not publicly accessible

The component hierarchy is setup like so:

![Component Hierarchy](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Ffile-conventions-component-hierarchy.png&w=1920&q=75&dpl=dpl_D8FSJkm5fGY8PYCjNmfLdsHxEyk8)

If you have a nested route, the component hierarchy is setup like so:

![Nested Component Hierarchy](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fnested-file-conventions-component-hierarchy.png&w=1920&q=75&dpl=dpl_D8FSJkm5fGY8PYCjNmfLdsHxEyk8)

### Path Aliases

Next.js allows you to alias directories to make importing easier

```js
// before
import { Button } from '../../../components/button'
 
// after
import { Button } from '@/components/button'
```

`@` is an alias for the root directory

You can add custom aliases [examples](https://nextjs.org/docs/app/building-your-application/configuring/absolute-imports-and-module-aliases#absolute-imports)

### React Server Components

- By default, components created inside the `app/` directory are React Server Components
- The components are rendered on the server (and can be cached on the server)

Benifits:
- [Nextjs - Benefits of Server Rendering](https://nextjs.org/docs/app/building-your-application/rendering/server-components#benefits-of-server-rendering)
  - **Performance**: Data fetching on the server improves performance (faster requests, UI will render faster)
  - **Security**: API keys / tokens aren't exposed to the client
  - **Caching**: Requests + the UI that's rendered can be cached + reusued for subsequent requests for multiple users
  - **Bundle Size**: The client doesn't need to download, parse and execute any JS for server components, therefore the client side bundle size is smaller, improving performance for users with slow internet / devices
  - **Initial Page Load**: Is instant since the HTML is generated on the server
  - **SEO/Social Card Previews**: Bots can crawl your initial page load
  - **Streaming**: We can load some components later (for slower requests)

If you want to use a hook in your component, you need to turn your component in a Client Component by adding React's `"use client"` direction at the top of the file.

Here's a table showing [when you should choose server vs client components](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#when-to-use-server-and-client-components)

### Optimised Fonts

Usually when fetching font files hosted on a server, [Cumulative Layout Shift](https://web.dev/articles/cls) can occur, which is a metric Google uses to evaluate the UX performance of a website.

![Cumulative Layout Shift](https://nextjs.org/_next/image?url=%2Flearn%2Flight%2Ffont-layout-shift.png&w=3840&q=75&dpl=dpl_HodmRRocPAANM5iMuN2bWfH9kFAK)

This happens because the browser initially renders a fallback/system font, then swaps it out for a custom font once it's loaded.

Next.js automatically optimises fonts when you use the `next/font` module:
- Fonts are downloaded at build time
- They're hosted with your other static assets

### Optimised Images

We can store static assets (e.g. images) in `/public` and reference them in our app.

Using the `<Image>` component from `next/image` provides the following automatic optimisations:
- Prevent layout shift when images are loading
- Resize large images for devices with a smaller viewport
- Lazy load images by deafult (images load as they enter the viewport)
- Serve images in modern formats (e.g. WebP and AVIF) if the browser supports it

When using the `<Image>` component, it's good practice to set the `width` and `height` (measured in pixels) to avoid layout shift, which should have an aspect ratio which is identical to the source image (can test in Preview's resize tool)

```js
<Image
  src="/hero-desktop.png"
  width={1000}
  height={760}
  alt="Screenshot of dashboard on mobile and desktop"
/>
```

### Automatic code-splitting and prefetching

Next.js automatically code splits your application by route segments
- This is different to a traditional React SPA where the browser loads all your application code on initial load
- This means that pages are isolated. If a certain page throws an error, the rest of the app will still work

In production, when a `<Link>` appears in the viewport, Next.js automatically prefetches the code for that route in the background.
- When the user clicks, the code for the destination page will already be loaded
- This makes page transitions near-instant.

## Vercel Postgres

[Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres) is a serverless SQL database which you can integrate into Next.js via:
- [The `@vercel/postgres` SDK](https://vercel.com/docs/storage/vercel-postgres/sdk)
- An ORM like [Prisma](https://www.prisma.io)

[Pricing info](https://vercel.com/docs/storage/vercel-postgres/usage-and-pricing#pricing)
  - Hobby plan = 1 DB w/ 60 hrs compute time per month

## Fetching Data

In Next.js, there are are a couple of approaches for fetching data:
1. Create an API layer using [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
2. Using React Server Components, we can skip the API layer and query the database without risking exposing DB secrets to the client

There are a few benifits of fetching data in Server Components:
- Server components support promises
- We can use `async/await` without `useEffect` and `useState`
- They execute on the server, so expensive data fetching & logic is kept to the server, and the result is sent to the client
- You can query the database directly without an additional API layer.

## Static vs Dynamic Rendering

### Static Rendering

- Data fetching / rendering happens:
  - On the server at build time (during deployment)
  - Or, during revalidation (i.e. purging the data cache & re-fetching programmatically based on time / an event)
- The result can be distributed / cached via a CDN
- When a user visits your app, the cached result is served

Benfits:
- Speed
- Reduced Server Load
- SEO

Use cases:
- UI's with no data / data that's the same for all users (blog, product page etc)

Not good for:
- Personalised data (dashboards etc)
- Regularly updating data 

### Dynamic Rendering

- Data fetching happens on the server for each user at request time (page load)

Use cases:
- Displaying real time / frequently changing data
- Displaying user specific content (user profile)
- Updating data on user interaction
- Accessing request time info (cookies, URL params)

The `@vercel/postgres` SDK doesn't set a caching mechanism

Therefore we're able to set our own static/dynamic behaviour.

We can use the Next.js `unstable_noStore` from `next/cache` inside
- Server components
- or, data fetching functions

to opt out of static rendering

```js
import { unstable_noStore as noStore } from 'next/cache';

function fetchData() {
  noStore();
}
```

This is equivalent to `fetch(..., {cache: 'no-store'})`

Notes: 
- `unstable_noStore` is an experimental API which may change
- A stable API is to use "route segment options" in a page or layout file `export const dynamic = "force-dynamic"`

## Streaming

For slow requests, we can stream them from the server to the client which prevents blocking the whole page from loading

We have two options to impliment streaming:
1. At a page level via `loading.js`
2. For specific components via the `<Suspense>` component [from React](https://react.dev/reference/react/Suspense)

### Streaming at a page level via `loading.js`

- The `loading.js` file is a special Next.js file that's built on top of `<Suspense>`
  - Any components which render via "static rendering" will load immediately.
  - Any UI in `loading.js` will be embedded as part of the static file and sent first
  - `loading.js` will apply to any nested pages

If you don't want loading to apply to all nested pages, you can create [Route Groups](https://nextjs.org/docs/app/building-your-application/routing/route-groups)

![Route Groupes](https://nextjs.org/_next/image?url=%2Flearn%2Flight%2Froute-group.png&w=1920&q=75&dpl=dpl_7zM9mAybQHAKmhr33tTURe2yBaXd)

The directory with `()` isn't added to the URL, and now `loading.js` will only apply to that page, and not all pages nested in `dashboard/` directory

### Streaming specific components via React Suspense

```js
<Suspense fallback={<Loading>}>
  <DynamicComponent>
</Suspense>
```

- We can defer rendering parts of our app until some condition is met (data is loaded)

- The data fetching needs to happen in the `<DynamicComponent>` above, not in a parent and passed as a prop

- In general, it's good practice to move your data fetches down to the components that need it, and then wrap those components in `<Suspense>`

- But there is nothing wrong with streaming the sections or the whole page if that's what your application needs.

## Server Actions

React Server Actions allow you to run async code directly on the server
- No need to create API endpoints to mutate data
- Can be invoked from Client Components or Server Components

https://nextjs.org/learn/dashboard-app/mutating-data#what-are-server-actions