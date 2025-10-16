import { defineConfig } from "astro/config";

import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://www.cnwy.dev",
  integrations: [icon(), sitemap()],
  output: "static",
});
