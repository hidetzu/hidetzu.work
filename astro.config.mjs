// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://hidetzu.work',
  trailingSlash: 'ignore',
  build: {
    // Cloudflare Workers Static Assets は /about.html を /about として配信する
    format: 'file',
  },
});
