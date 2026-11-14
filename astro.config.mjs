// @ts-check
import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import { cjkLineBreaks, katexMath, mathBlocks } from './src/lib/math-markdown.mjs';

export default defineConfig({
  site: 'https://hidetzu.work',
  trailingSlash: 'ignore',
  build: {
    // Cloudflare Workers Static Assets は /about.html を /about として配信する
    format: 'file',
    // CSS は数 KB なので、往復を減らすため常に HTML へ埋め込む
    inlineStylesheets: 'always',
  },
  markdown: {
    // Astro 7 の既定の Markdown 処理系（Sätteri）に、数学ノート用の機能を足す。
    // remark / rehype プラグインは Astro 7 で非推奨のため使わない（docs/adr/0002）
    processor: satteri({
      features: { math: true, directive: true },
      // katexMath を先に（ラベル中の数式を変換してから mathBlocks がブロックを組む）
      mdastPlugins: [katexMath, cjkLineBreaks, mathBlocks],
    }),
  },
});
