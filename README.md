# Next JS (V14)

## Overview

- Next JS is a React Framework which adds various features to React
  - File-system routing
  - Server side rendering
  - Font optimisation
  - Image optimisation
  - Automatic code-splitting and prefetching

## Concepts

### Routing

_Note: Previous versions of Next JS (V13 and below) use the `pages/` directory which is still supported._

Routing in Next V14 is managed via a creating folders and files within the `app/` directory (i.e. a "file-system based router") - [nextjs.org/docs/routing](https://nextjs.org/docs/app/building-your-application/routing)
  - Folders define routes
  - Files are used to create some UI

![Route Segments](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Froute-segments-to-path-segments.png&w=1920&q=75&dpl=dpl_D8FSJkm5fGY8PYCjNmfLdsHxEyk8)

Notice the term "segment" above

There are a few "special files" that Next JS provides to build different parts of the UI (using `.js`, `.jsx` or `.tsx`)
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

Next JS allows you to alias directories to make importing easier

```js
// before
import { Button } from '../../../components/button'
 
// after
import { Button } from '@/components/button'
```

`@` is an alias for the root directory

You can add custom aliases [exmaples](https://nextjs.org/docs/app/building-your-application/configuring/absolute-imports-and-module-aliases#absolute-imports)

### React Server Components

- By default, components created inside the `app/` directory are React Server Components
- The components are rendered on the server (and can be cached on the server)

Benifits:
- [nextjs.org/docs/rendering/server-components#benefits-of-server-rendering](https://nextjs.org/docs/app/building-your-application/rendering/server-components#benefits-of-server-rendering)
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

Next JS automatically optimises fonts when you use the `next/font` module:
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

Next JS automatically code splits your application by route segments
- This is different to a traditional React SPA where the browser loads all your application code on initial load
- This means that pages are isolated. If a certain page throws an error, the rest of the app will still work

In production, when a `<Link>` appears in the viewport, Next JS automatically prefetches the code for that route in the background.
- When the user clicks, the code for the destination page will already be loaded
- This makes page transitions near-instant.

## Vercel Postgres

[Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres) is a serverless SQL database which you can integrate into Next JS via:
- [The `@vercel/postgres` SDK](https://vercel.com/docs/storage/vercel-postgres/sdk)
- An ORM like [Prisma](https://www.prisma.io)

[Pricing info](https://vercel.com/docs/storage/vercel-postgres/usage-and-pricing#pricing)

## Fetching Data

In Next JS, there are are a couple of approaches for fetching data:
1. Create an API layer using [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
2. Using React Server Components, we can skip the API layer and query the database without risking exposing DB secrets to the client

There are a few benifits of fetching data in Server Components:
- Server components support promises
- We can use `async/await` without `useEffect` and `useState`
- They execute on the server, so expensive data fetching & logic is kept to the server, and the result is sent to the client
- You can query the database directly without an additional API layer.