// 数学ノート用 Markdown プラグインの最小限の確認。`npm test` で実行する。
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { markdownToHtml } from 'satteri';
import { cjkLineBreaks, katexMath, mathBlocks } from '../src/lib/math-markdown.mjs';

// astro.config.mjs と同じ組み合わせ
const md = (src) =>
  markdownToHtml(src, {
    features: { math: true, directive: true },
    mdastPlugins: [katexMath, cjkLineBreaks, mathBlocks],
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
    mdastPlugins: [katexMath, cjkLineBreaks, mathBlocks],
  });
  const { code } = await processor.render('$$\nx^2\n$$\n\n```js\nlet a\n```\n');
  assert.match(code, /^<div class="math-display"><span class="katex-display">/);
  assert.equal(code.match(/astro-code/g)?.length, 1);
});

test('ラベル先頭の番号は種類名の側に出す', () => {
  const html = md(':::lemma[3.1：名前]{#l}\n本文\n:::\n');
  assert.match(html, /<p class="math-block-title"><strong>補題 3.1<\/strong>（名前）<\/p>/);
  assert.match(md(':::theorem[4.1]\nx\n:::\n'), /<strong>定理 4.1<\/strong><\/p>/);
});

test('証明の出どころを見出しの直後に出す', () => {
  const html = md(':::proof{origin=self text=ai}\n本文\n:::\n');
  assert.match(
    html,
    /<strong>証明<\/strong><\/p><p class="math-block-origin">出どころ：自力で証明・文章は Claude が整理<\/p><p>本文<\/p>/,
  );
  const labelled = md(':::proof[補足]{origin=ai note="注記"}\n本文\n:::\n');
  assert.match(labelled, /（補足）<\/p><p class="math-block-origin">出どころ：Claude が補った証明（注記）<\/p>/);
  assert.throws(() => md(':::proof{origin=me}\nx\n:::\n'), /unknown proof origin/);
  assert.throws(() => md(':::theorem{origin=self}\nx\n:::\n'), /only be used on/);
});

test('日本語の直後の改行は空白にしない', () => {
  assert.match(md('である。\n対偶をとる。\nfoo\nbar\n'), /<p>である。対偶をとる。foo\nbar<\/p>/);
});
