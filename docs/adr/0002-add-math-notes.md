# ADR 0002: 数学の学習ノート（/math）を追加する

- 日付: 2026-11-08
- 状態: 採用

## 背景

位相幾何学を、James R. Munkres の *Topology*（2nd ed.）を中心に基礎から学び直している。
定義・定理の主張、自分で考えた証明、分からないことを Git で積み上げ、後から参照できる場所がほしい。

これは完成した解説記事を公開するブログではない。公開は手段で、記事数を増やすことは目的にしない。
トップページの情報構成（ADR 0001）とは別の、独立したページとして置く。

## 決定

### 1. 構成

- `/math` に入口（目的、教科書、学習の目安、ノート一覧）、`/math/<slug>` に各ノートを置く
- ノートは Content Collections（`src/content/math/*.md`、glob loader）。ファイル名がそのまま URL の slug になる。
  定義や定理は `:::definition[名前]{#def-xxx}` のように id を付け、`/math/<slug>#def-xxx` で参照する
- 全ページのヘッダーに `Math` を足す。トップページのセクションは増やさない
- 入口の文言と学習の目安は `src/data/math.json`（既存の JSON 分離に合わせる）

### 2. Markdown と数式

Astro 7 の既定の Markdown 処理系は Sätteri（`@astrojs/markdown-satteri`）で、
`markdown.remarkPlugins` / `rehypePlugins` は非推奨になり、使うには `@astrojs/markdown-remark` を別途入れる必要がある。
そのため remark-math / rehype-katex ではなく、Sätteri の組み込み機能と小さなプラグインで実装する。

- `features.math` で `$...$` / `$$...$$` を解析し、mdast の段階で KaTeX の `renderToString` により HTML にする（`src/lib/math-markdown.mjs`）
  - hast の段階で変換すると、Astro のコードハイライト（Shiki）が先に `$$` のブロックを普通のコードブロックとして処理してしまう。
    Astro の除外判定（`excludeLangs`）は `code.data.lang` を見るが、Sätteri の数式ブロックはそれを持たないため。
    回帰テストを `tests/math-markdown.test.mjs` に置いた
  - TeX の誤りはビルドエラーにする（`throwOnError: true`）
- `features.directive` で `:::theorem` などのブロックを使う。種類は
  definition / theorem / proposition / lemma / corollary / proof / attempt / remark / example / question / reading。
  知らない名前はビルドエラーにする（綴り間違いでブロックごと消えるのを防ぐ）
- `:::proof` は完成した証明（∎ が付く）、`:::attempt` は考えている途中の証明（∎ が付かない）。未完成の証明を完成したものとして見せない

### 3. 理解の状態

`unread` / `studying` / `understood` / `proof-in-progress` / `verified` の 5 値を frontmatter の `status` に書く。

- 状態は自己申告で、本人だけが変える。ビルドやテストの成否、AI のレビューで状態を変えない
- `understood`（自分の言葉で説明できる）と `verified`（証明を検証済み）は別のものとして扱う
- ノート単位の状態だけを持つ。ブロック単位の状態や進捗管理の仕組みは作らない

### 4. 依存関係とアセット

- `katex`：ビルド時の数式組版。クライアント JS は 0 のまま
- `@astrojs/markdown-satteri`：`astro.config.mjs` から `satteri()` を import するため。
  Astro 本体が固定している版（7.3.1 では `0.4.0`）と同じ版に固定する。Astro を上げるときは合わせて上げる
- KaTeX の CSS とフォントは `/math/<slug>` だけで読み込む。トップページには影響しない。
  「Web フォントは読み込まない」の例外で、数式の字形に必要なため。ブラウザは使われた字形のフォントだけを取りに行く

### 5. 公開しないノート

frontmatter の `draft: true` のノートは `npm run dev` でだけ表示し、ビルドには含めない。
書きかけのノートも Git に残せるようにするため。

## 採用しなかった案

- **`@astrojs/markdown-remark` + remark-math + rehype-katex** — Astro 7 では非推奨の経路に戻ることになり、依存も増える
- **MDX で `<Theorem>` などのコンポーネントを書く** — 依存が増え、本文が Markdown として読みにくくなる
- **定義・定理ごとにページやデータを分ける、知識グラフを作る** — ノートが少ないうちは過剰。id 付きのアンカーで足りる
- **サイトマップを今回足す** — 既存サイトにサイトマップがなく、ページ数も少ない。必要になったら別に決める
