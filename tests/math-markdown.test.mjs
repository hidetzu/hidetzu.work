// 数学ノート用 Markdown プラグインの最小限の確認。`npm test` で実行する。
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { markdownToHtml } from 'satteri';
import { katexMath, mathBlocks } from '../src/lib/math-markdown.mjs';

// astro.config.mjs と同じ組み合わせ
const md = (src) =>
  markdownToHtml(src, {
    features: { math: true, directive: true },
    mdastPlugins: [katexMath, mathBlocks],
  }).html;

test('インライン数式を KaTeX で HTML にする', () => {
  const html = md('埋め込み $S^1 \\hookrightarrow S^2$ と $a<b$');
  assert.match(html, /<span class="katex">/);
  assert.doesNotMatch(html, /math-inline/);
  // < はエスケープされ、TeX のソースは MathML の annotation に残る
  assert.match(html, /<annotation encoding="application\/x-tex">a&lt;b<\/annotation>/);
});

test('ディスプレイ数式は div.math-display で包む', () => {
  const html = md('$$\nS^2 \\setminus C = W_1 \\sqcup W_2\n$$\n');
  assert.match(html, /<div class="math-display"><span class="katex-display">/);
  assert.doesNotMatch(html, /<pre>/);
});

test('コードスパンの中の $ は数式にしない', () => {
  const html = md('`$x$` はコード');
  assert.match(html, /<code>\$x\$<\/code>/);
});

test('TeX の誤りはビルドエラーにする', () => {
  assert.throws(() => md('$\\frac{1}{$'));
});

test(':::theorem をラベルと id つきのブロックにする', () => {
  const html = md(':::theorem[名前 $X$]{#thm-a}\n本文\n:::\n');
  assert.match(html, /<div class="math-block math-theorem" id="thm-a">/);
  assert.match(html, /<p class="math-block-title"><strong>定理<\/strong>（名前 <span class="katex">/);
});

test('ラベルがなければ種類名だけを見出しにする', () => {
  const html = md(':::attempt\n途中\n:::\n');
  assert.match(html, /<div class="math-block math-attempt"><p class="math-block-title"><strong>証明の試み<\/strong><\/p>/);
});

test('知らないブロック名はビルドエラーにする', () => {
  assert.throws(() => md(':::theorm\n綴り間違い\n:::\n'), /unknown math block/);
});

// Astro が使うのと同じ処理系（コードハイライトあり）を通しても、
// $$...$$ がコードブロックとして Shiki に取られないこと
test('Astro の処理系で、ディスプレイ数式がコードハイライトされない', async () => {
  const { createSatteriMarkdownProcessor } = await import('@astrojs/markdown-satteri');
  const processor = await createSatteriMarkdownProcessor({
    syntaxHighlight: 'shiki',
    features: { math: true, directive: true },
    mdastPlugins: [katexMath, mathBlocks],
  });
  const { code } = await processor.render('$$\nx^2\n$$\n\n```js\nlet a\n```\n');
  assert.match(code, /^<div class="math-display"><span class="katex-display">/);
  assert.equal(code.match(/astro-code/g)?.length, 1);
});
