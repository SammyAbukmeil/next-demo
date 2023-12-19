# Next JS (V14)

## Overview

- Next JS is a React Framework which adds various features to React
  - ...

## Concepts

### Routing

_Note: Previous versions of Next JS (V13 and below) use the `pages/` directory which is still supported._

Routing in Next JS V14 is managed via a creating folders and files within the `app/` directory (i.e. a "file-system based router") - [nextjs.org/docs/routing](https://nextjs.org/docs/app/building-your-application/routing)
  - Folders define routes
  - Files are used to create some UI

![Route Segments](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Froute-segments-to-path-segments.png&w=1920&q=75&dpl=dpl_D8FSJkm5fGY8PYCjNmfLdsHxEyk8)

Notice the term "segment above"

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