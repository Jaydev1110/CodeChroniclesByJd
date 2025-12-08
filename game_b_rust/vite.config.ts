import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";
import path from "path";
import mdx from '@mdx-js/rollup';
import remarkGfm from 'remark-gfm';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    {
      enforce: 'pre',
      ...mdx({
        remarkPlugins: [remarkGfm],
      })
    },
    react(),
    wasm(),
    topLevelAwait()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "../../../../elara-lib/pkg": path.resolve(__dirname, "./src/elara-lib"),
      "../../../elara-lib/pkg": path.resolve(__dirname, "./src/elara-lib"),
      "../../elara-lib/pkg": path.resolve(__dirname, "./src/elara-lib"),
      "../elara-lib/pkg": path.resolve(__dirname, "./src/elara-lib"),
    },
  },
  define: {
    ELARA_BUILD_TARGET: JSON.stringify("web"),
  },
})
