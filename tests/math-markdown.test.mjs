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

test(':::counterexample は「反例」の見出しのブロックにする', () => {
  const html = md(':::counterexample[単射でない写像]{#cex-a}\n本文\n:::\n');
  assert.match(html, /<div class="math-block math-counterexample" id="cex-a">/);
  assert.match(html, /<p class="math-block-title"><strong>反例<\/strong>（単射でない写像）<\/p>/);
});

test('ラベルがなければ種類名だけを見出しにする', () => {
  const html = md(':::attempt\n途中\n:::\n');
  assert.match(html, /<div class="math-block math-attempt" id="attempt-1"><p class="math-block-title"><strong>証明の試み<\/strong><\/p>/);
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

test('主張の source は参考文献の行として見出しの横に出す', () => {
  const html = md(':::lemma[要素を 1 つ取り除く]{#lem-a source="Munkres, Lemma 6.1"}\n本文\n:::\n');
  assert.match(html, /<strong>補題<\/strong>（要素を 1 つ取り除く）<\/p><p class="math-block-origin">参考文献：Munkres, Lemma 6.1<\/p>/);
  assert.throws(() => md(':::proof{source="x"}\n本文\n:::\n'));
});

test('id のない証明には、付け先の主張の id から決まる id と data-for を付ける', () => {
  const html = md(
    [
      ':::theorem[A]{#thm-a}\n主張\n:::',
      ':::proof\n1 つ目\n:::',
      ':::proof\n2 つ目\n:::',
      ':::lemma[B]{#lem-b}\n主張\n:::',
      ':::attempt\n途中\n:::',
      ':::proof{for=thm-a}\n離れた位置\n:::',
      ':::proof{#my-proof}\n書いた id\n:::',
    ].join('\n\n'),
  );
  const ids = [...html.matchAll(/<div class="math-block math-(\w+)" id="([^"]+)"(?: data-for="([^"]+)")?>/g)].map(
    (m) => `${m[1]}:${m[2]}:${m[3] ?? ''}`,
  );
  assert.deepEqual(ids, [
    'theorem:thm-a:',
    'proof:thm-a-proof:thm-a',
    'proof:thm-a-proof-2:thm-a',
    'lemma:lem-b:',
    'attempt:lem-b-attempt:lem-b',
    'proof:thm-a-proof-3:thm-a',
    'proof:my-proof:lem-b',
  ]);
});

test('id のない主張・注意には種類ごとの通し番号の id を付け、ドキュメントごとに数え直す', () => {
  const src = ':::example\nx\n:::\n\n:::example[B]\ny\n:::\n\n:::proof\nz\n:::\n\n:::remark\nw\n:::\n';
  for (const html of [md(src), md(src)]) {
    const ids = [...html.matchAll(/ id="([^"]+)"/g)].map((m) => m[1]);
    assert.deepEqual(ids, ['example-1', 'example-2', 'example-2-proof', 'remark-1']);
  }
});

test('for が存在しない主張を指していたらビルドエラーにする', () => {
  assert.throws(() => md(':::proof{for=thm-x}\nz\n:::\n'), /unknown statement "#thm-x"/);
});
