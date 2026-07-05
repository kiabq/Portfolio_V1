// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://www.cnwy.dev",
  output: "static",
  markdown: {
    syntaxHighlight: "shiki",
  },
  integrations: [icon(), sitemap(), mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
  server: {
    allowedHosts: ["9829-2605-a601-90c0-e600-d1f-41ee-9218-384.ngrok-free.app"],
  },
  fonts: [
    {
      provider: fontProviders.local(),
      name: "Sentient",
      cssVariable: "--font-sentient",
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/Sentient-Variable.woff2"],
            weight: "100 900",
            style: "normal",
          },
          {
            src: ["./src/assets/fonts/Sentient-VariableItalic.woff2"],
            weight: "100 900",
            style: "italic",
          },
        ],
      },
    },
  ],
});
