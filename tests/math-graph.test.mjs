// 証明の依存関係の集計（src/lib/math-graph.mjs）の確認。`npm test` で実行する。
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { buildGraph, parseAttributes, parseNote, resolveLink } from '../src/lib/math-graph.mjs';
import { blockTitle, originLine, splitLabel } from '../src/lib/math-markdown.mjs';

test('ラベル先頭の番号を種類名の側に出す', () => {
  assert.deepEqual(splitLabel('3.1：2 つの同値類'), { number: '3.1', name: '2 つの同値類' });
  assert.deepEqual(splitLabel('1. 同値類の一致'), { number: '1', name: '同値類の一致' });
  assert.deepEqual(splitLabel('4.1'), { number: '4.1', name: '' });
  // 「2 乗で比べる」は番号ではない
  assert.deepEqual(splitLabel('2 乗で比べる順序'), { number: undefined, name: '2 乗で比べる順序' });
  assert.equal(blockTitle('theorem', '4.1：整列性'), '定理 4.1（整列性）');
  assert.equal(blockTitle('proposition', ''), '命題');
});

test('証明の出どころの一行', () => {
  assert.equal(originLine({ origin: 'self', text: 'ai' }), '出どころ：自力で証明・文章は Claude が整理');
  assert.equal(originLine({ origin: 'textbook' }), '出どころ：教科書の証明を読んで理解');
  assert.equal(originLine({}), undefined);
  assert.throws(() => originLine({ origin: 'me' }), /unknown proof origin/);
});

test('属性とリンクを読む', () => {
  assert.deepEqual(parseAttributes('#p1 origin=self note="レビューで 修正" for=thm-a'), {
    id: 'p1',
    origin: 'self',
    note: 'レビューで 修正',
    for: 'thm-a',
  });
  assert.equal(resolveLink('#lem-a', 'relations'), 'relations#lem-a');
  assert.equal(resolveLink('/math/functions#def-function', 'relations'), 'functions#def-function');
  assert.equal(resolveLink('/math/functions', 'relations'), null);
  assert.equal(resolveLink('https://example.com/#x', 'relations'), null);
});

const a = `
:::lemma[1：補題]{#lem-a}
主張
:::

:::proof{origin=self}
定義（[定義](#def-x)）を使う。
:::

:::theorem[2：定理]{#thm-b}
主張
:::

間の文。[関連](#lem-a) は証明の外なので数えない。

:::proof{origin=textbook text=ai}
[補題 1](#lem-a) と [別のノート](/math/b#prop-c) を使う。
:::

:::proof[まとめ]{for=lem-a origin=ai}
[定理 2](#thm-b)
:::
`;

const b = `
:::proposition[命題 C]{#prop-c}
主張
:::

:::attempt
途中
:::
`;

test('証明は直前の主張に付き、for で付け先を指定できる', () => {
  const { statements, proofs } = parseNote('a', a);
  assert.deepEqual(statements.map((s) => s.key), ['a#lem-a', 'a#thm-b']);
  assert.equal(proofs[0].statement.id, 'lem-a');
  assert.equal(proofs[1].statement.id, 'thm-b');
  assert.equal(proofs[2].statement.id, 'lem-a');
});

test('証明の中のリンクだけを依存関係にする', () => {
  const g = buildGraph([
    { slug: 'a', body: a },
    { slug: 'b', body: b },
  ]);
  const thm = g.statements.get('a#thm-b');
  assert.deepEqual([...thm.uses], ['a#lem-a', 'b#prop-c']);
  assert.deepEqual([...g.statements.get('b#prop-c').usedBy], ['a#thm-b']);
  // 証明の外のリンク（「間の文」）は usedBy に入らない
  assert.deepEqual([...g.statements.get('a#lem-a').usedBy], ['a#thm-b']);
  // 存在しないアンカー（#def-x）は無視する
  assert.deepEqual([...g.statements.get('a#lem-a').uses], ['a#thm-b']);
  assert.deepEqual([...g.noteUses.get('a')], ['b']);
  assert.deepEqual([...g.noteUsedBy.get('b')], ['a']);
  // 証明の数は :::proof だけを数え、:::attempt は数えない
  assert.deepEqual(g.proofCounts.get('a'), { self: 1, 'self-reviewed': 0, textbook: 1, ai: 1, none: 0 });
  assert.deepEqual(g.proofCounts.get('b'), { self: 0, 'self-reviewed': 0, textbook: 0, ai: 0, none: 0 });
});

test('閉じていないブロックと、存在しない for はエラー', () => {
  assert.throws(() => parseNote('a', ':::proof\nx\n'), /unclosed/);
  assert.throws(() => parseNote('a', ':::proof{for=nope}\nx\n:::\n'), /unknown statement/);
});

test('引用した主張（ref）を使う証明は、引用元の結果も使う', () => {
  const g = buildGraph([
    { slug: 'src', body: ':::theorem[元]{#thm-x}\n主張\n:::\n\n:::proof{origin=textbook}\n証明\n:::\n' },
    {
      slug: 'use',
      body: ':::theorem[引用]{#thm-x ref=src#thm-x}\n主張\n:::\n\n:::theorem[使う]{#thm-y}\n主張\n:::\n\n:::proof\n[引用](#thm-x)\n:::\n',
    },
  ]);
  assert.deepEqual([...g.statements.get('use#thm-y').uses], ['use#thm-x', 'src#thm-x']);
  assert.deepEqual([...g.statements.get('src#thm-x').usedBy], ['use#thm-y']);
  assert.deepEqual([...g.noteUses.get('use')], ['src']);
  assert.throws(
    () => buildGraph([{ slug: 'a', body: ':::theorem{#t ref=nope#x}\nx\n:::\n\n:::theorem{#u}\ny\n:::\n\n:::proof\n[t](#t)\n:::\n' }]),
    /unknown ref/,
  );
});
