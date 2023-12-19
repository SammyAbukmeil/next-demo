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
  - Sass is also available https://nextjs.org/docs/app/building-your-application/styling/sass

Continue from https://nextjs.org/learn/dashboard-app/optimizing-fonts-images
