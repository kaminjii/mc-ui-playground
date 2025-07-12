import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import postcssTailwind from "@tailwindcss/postcss";
import svgr from "vite-plugin-svgr";
import { svg } from "framer-motion/client";

export default defineConfig({
  plugins: [react(), svgr()],
  css: {
    postcss: {
      plugins: [postcssTailwind()],
    },
  },
});
