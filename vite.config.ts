import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

// For GitHub Pages: set base to your repo name, e.g. '/LOu/' so the site is at https://<username>.github.io/LOu/
const repoName = "LOu";
export default defineConfig({
  base: `/${repoName}/`,
  plugins: [react(), tailwindcss()],
});
