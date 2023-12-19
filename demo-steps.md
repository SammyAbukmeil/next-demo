# Demo Steps

- `npx create-next-app@latest`
  - Without typescript
  
- `npm run dev`

- Explain routing (see `README.md`)

- Update `app/page.js` 

- Update `app/global.css` delete all `:root` and `body` styles

- Update `layout.js` meta data

- Create `app/ui` and move `global.css` into it + update `layout.js` to import `import "@/app/ui/global.css";`

- Create a `app/ui/home.module.css` to show CSS Modules and add styles in `page.js`

```css
.logo {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: blue;
  display: inline;
  margin: 0 1rem;
}
```

```js
import styles from "@/app/ui/home.module.css";

// ...

<div className={styles.logo}></div>
```

- Move the `<h1>` to a `<Header />` in `layout.js` and a `<nav>`

- `npm i sass` and added header styles

- Remove the `app/ui/home.module.css` and the import from `page.js`

Continue from https://nextjs.org/learn/dashboard-app/optimizing-fonts-images
