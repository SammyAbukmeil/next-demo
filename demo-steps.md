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

<h1 className={styles.title}></h1>
```

- Move the `<h1>` to a `<Header />` in `layout.js` and a `<nav>`

- `npm i sass` and added header styles. Also Update `globals.css` to `global.scss`

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

Continue from https://nextjs.org/learn/dashboard-app/optimizing-fonts-images#why-optimize-images
