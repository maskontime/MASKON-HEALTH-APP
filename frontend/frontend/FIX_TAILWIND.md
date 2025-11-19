# Fix Tailwind CSS PostCSS Error

If you're getting the error about Tailwind CSS PostCSS plugin, follow these steps:

## Solution 1: Reinstall Dependencies (Recommended)

1. Delete `node_modules` folder:
   ```bash
   rm -rf node_modules
   # or on Windows:
   rmdir /s node_modules
   ```

2. Delete `package-lock.json`:
   ```bash
   rm package-lock.json
   ```

3. Reinstall dependencies:
   ```bash
   npm install
   ```

4. Start the dev server:
   ```bash
   npm run dev
   ```

## Solution 2: If Tailwind v4 is Installed

If you have Tailwind CSS v4 installed, you need to install the PostCSS plugin:

```bash
npm install @tailwindcss/postcss --save-dev
```

Then update `postcss.config.js` to:

```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
```

## Solution 3: Use CommonJS Format

If ES modules are causing issues, rename `postcss.config.js` to `postcss.config.cjs` and use:

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

## Verify Installation

Check which version of Tailwind is installed:

```bash
npm list tailwindcss
```

It should show `tailwindcss@3.3.6` or similar v3 version.

