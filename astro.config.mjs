// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://www.cnwy.dev",
  output: "static",
  integrations: [icon(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
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
