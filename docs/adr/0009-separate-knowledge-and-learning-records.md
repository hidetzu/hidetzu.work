# ADR 0009: 知識ノートと学習記録を分け、ノートのページを分野で共通にする

- Status: Accepted（2026-11-17。段階 3 として実装）
- Date: 2026-11-17
- 関連: [ADR 0005](0005-math-notes-structure-and-proof-records.md)、[ADR 0007](0007-add-ml-learning-map.md)、[ADR 0008](0008-math-notes-as-independent-notebook.md)、[設計書](../design/content-platform.md)

## 背景

数学ノートでは、定義・定理・証明と、学習の状態・参考文献の章立て・学習の経過が同じページにある。
PR #32 で学習の経過を各ノート末尾の `## 学習記録` に集めたが、読者が読む本文と、本人の振り返り用の記録が同じ流れにあることは変わらない。
学習記録を分野全体で見渡す場所もない。

また、`math/[slug].astro` と `ml/[slug].astro` はヘッダー・メタ情報・目次がほぼ同じだが、別々に書いている。今後分野を足すたびに同じものを書くことになる。

## 決定

1. ページを「分野トップ」「知識ノート」「学習記録」の 3 種類に分ける（役割は設計書 §3）。
2. 数学の学習記録のページ `/math/learning` を作る。材料は、既存の frontmatter（`status`、`textbook`、`sources`）、`math.json`（`references`、`roadmap`）、証明の出どころの集計、`:::question`、それに各ノートの学習の経過。
3. 各ノートの `## 学習記録` は、別のコレクション `math-log`（`src/content/math-log/<slug>.md`、frontmatter の `note` で知識ノートを指す）へ移す。中身は書き換えずに移す。
4. 証明ごとの出どころ（`origin` / `text` / `note`）と主張の `source` は、証明・主張と切り離すと意味がなくなるので、本文に残す。
5. ノートのページの骨格（ヘッダー、1 行のメタ情報、目次、本文の枠、参考文献、関連、学習記録へのリンク）を `NoteLayout.astro` にまとめ、math と ml の両方から使う。
6. Content Collections は分野ごとのまま維持し、共通の属性（title、description、tags、aliases、related、sources、createdAt、updatedAt、draft）を 1 つのスキーマ部品にまとめる。既存の属性名は変えない。
7. 学習記録の形は分野ごとに持つ。数学の証明の出どころを ML に強制しない。ML の学習記録は今のまま（`/ml` の学習マップとノート冒頭の表）にする。
8. ノートの slug に `search`、`learning`、`notation` を使えないようにする。

## 実装（2026-11-17）

- `src/content/math-log/<slug>.md`（コレクション `mathLog`）に、8 ノートの `## 学習記録` の文章を変えずに移した。移す前後で、ノートの本文の HTML（学習記録の節を除く）と、学習記録の HTML が一致することを確かめた
- `/math/learning` を作り、`/math` の Now・References・Legend・Roadmap を移した。ノートごとの記録は `#note-<slug>`。`/math` の旧アンカー（`#now`、`#references`、`#textbook`、`#legend`、`#roadmap`）は、学習記録への案内の節に残した
- ノートのページは学習記録へリンクする。新しいレイアウト（NoteLayout）のノートでは、本文の後の節を「参考文献」にし、状態の説明と Study log は学習記録に任せた
- 未解決の問い（`:::question`）と途中の証明（`:::attempt`）は本文に残し、学習記録には一覧だけを出す
- 決定 8（slug の予約: `search`、`learning`、`notation`）は段階 1 で実装済み
- 決定 6（共通スキーマ部品 `baseNote`）と、決定 5 のうち ML での `NoteLayout` の利用は、段階 4 で実装した（2026-11-17）

## 採用しなかった案

- **`## 学習記録` を本文に残し、見た目だけ分ける（折りたたみなど）** — 変更は小さいが、分野全体で見渡せない。検索の索引からも外しにくい。
- **学習の経過を frontmatter に構造化して書く（日付・範囲・状態の配列）** — 一覧は作りやすいが、今の学習記録は文章で、表に収まらない経緯（証明の照合の状況など）がある。書き換えると記録の意味が変わるおそれがある。
- **math と ml を 1 つのコレクションに統合する** — 横断の一覧は書きやすくなるが、分野固有の属性で型が複雑になり、既存のコードを広く書き換える（設計書 §5.5）。
- **frontmatter の属性名をそろえる（`topic` → `area` など）** — 全ノートの書き換えになり、得るものが少ない。

## 結果

- 知識ノートは本文が主役になり、学習記録は `/math/learning` で見渡せる。
- コレクションが 1 つ（`math-log`）増え、学習記録の移動のあいだは、本文末尾と別ファイルの両方の形が並存する。
- 分野を足すときは、コレクションの定義（共通部品＋固有の属性）、一覧ページ、`NoteLayout.astro` を使う `[slug].astro` を足せばよい。
