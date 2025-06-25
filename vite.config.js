import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import postcssTailwind from "@tailwindcss/postcss";

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [postcssTailwind()],
    },
  },
});
