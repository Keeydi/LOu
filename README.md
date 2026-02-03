# Valentine Date Invite

A cute, funny, mobile-first Valentine date invite built with React, Vite, TypeScript, TailwindCSS, and Framer Motion.

## Features

- **Invite page**: “Will you be my date?” with a **YES** button (confetti + sound) and a **NO** button that runs away when you try to hover/click it.
- **Restaurants page**: Pick where to eat. Only **KARINDERYA** is the correct choice; the others show funny error modals.
- **Flower page**: Animated blooming flower, date details, **Add to Calendar** (Google + .ics download), **photo gallery**, and a “Send this to her” share button.

## Personalize

Edit `src/config.ts` and set `FOR_NAME` to your girlfriend’s name so the “Made with 💖 for [name]” line is personalized.

Change the default date, time, and place in `src/pages/FlowerPage.tsx` (same values are used for Add to Calendar). **Photos**: The flower page shows images from `public/photos/` as `1.png`, `2.png`, ... `9.png`. Replace or add files there to customize the gallery.

## Run

```bash
npm install
npm run dev
```

Open the URL shown (e.g. http://localhost:5173) on your phone or browser.

## Build

```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages (github.io)

1. **Create a repo** on GitHub (e.g. `LOu`). If you use a different repo name, edit `vite.config.ts` and set `repoName` to that name.

2. **Push your code** to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/LOu.git
   git push -u origin main
   ```

3. **Turn on GitHub Pages**: In the repo go to **Settings > Pages**. Under **Build and deployment**, set **Source** to **GitHub Actions**.

4. **Deploy**: The workflow runs on every push to `main`. After it finishes, your site is live at:
   **`https://YOUR_USERNAME.github.io/LOu/`**
