# hidetzu.work

[hidetzu.work](https://hidetzu.work) の個人サイト。いま追っている問いと、それを確かめるために作っているソフトウェア、そこで確認できたことを 1 ページにまとめる。

GitHub（プロフィール README）は「何を作ったか・どう実装したか」、このサイトは「なぜその問題に取り組むのか・何を確かめられたか」を受け持つ（[ADR 0001](docs/adr/0001-split-roles-between-github-profile-and-site.md)）。

- Astro + TypeScript（静的生成、クライアント JS なし）
- Cloudflare Workers Static Assets で配信
- DB / API / CMS / ログインなし

## セットアップ

```bash
npm ci
```

Node.js 22 以上を想定。

## ローカル起動

```bash
npm run dev        # http://localhost:4321
```

## ビルド / 確認

```bash
npm run check      # astro check（型 + テンプレートの診断）
npm test           # 数学ノート用 Markdown プラグインのテスト（node --test）
npm run build      # dist/ に静的ファイルを出力
npm run preview    # dist/ の内容をローカル配信して確認
```

## 内容の更新

本文は `src/data/*.json` に分離してある。Astro コンポーネントを触らずに更新できる。

| ファイル | 内容 |
| --- | --- |
| `src/data/site.json` | サイト名、タグライン（英語）、`lede`（Hero の日本語の一文）、description、ヘッダーと Hero タイルのリンク |
| `src/data/now.json` | `updated` と、Current Questions（3 つ程度の問い）。`projects` に projects.json の `id` を並べると、問いからそのプロジェクトへリンクする |
| `src/data/projects.json` | プロジェクトの一覧（配列）。`placement` で載せる場所を決める（`selected` = Selected Work、`experiment` = Experiments、`more` = Other projects） |
| `src/data/writing.json` | Writing の `sources`（Zenn と dev.to。手動定義。外部 API は叩かない。各 3 本程度に絞る）。`project` に id を書くと関連プロジェクトを添える |
| `src/data/about.json` | About の本文と末尾のリンク |

型は `src/data/types.ts` にある。項目を増やすときは JSON と型の両方を更新する。

Project を 1 件追加する例（Selected Work）:

```json
{
  "id": "xxx",
  "name": "新しいプロジェクト",
  "placement": "selected",
  "status": "development",
  "release": "未リリース",
  "motif": "loop",
  "summary": "一行の説明。",
  "problem": "解決したい問題。",
  "approach": "実装でどう解くか。",
  "result": "いま確認できること。",
  "links": [{ "label": "GitHub", "url": "https://github.com/hidetzu/xxx" }]
}
```

- `experiment` には `problem` / `approach` の代わりに `question`（確かめたい問い）と `result`（いまの到達点）を書く
- `more` は `summary` と `links` だけでよい
- `status` は `released`（GitHub Release で配布物を出している）/ `development`（動く実装はあるが開発途上）/
  `experimental`（問いの検証が中心）/ `reference`（設定など参照用）。タグの有無だけで決めず、README とコードで確かめる
- `release` には版や公開状態を、確認できた事実だけ書く（例: `v0.1.0-dev.1（pre-release）`、`Web 版公開中`）
- `id` は `#p-<id>` のアンカーになる。now.json / writing.json から存在しない id を参照するとビルドが落ちる
- `motif` は `map` / `loop` / `packet` / `gate` / `layers` / `frames` / `flag` / `graph` / `scan` / `note` / `sieve`

## 数学ノート（/math）

位相幾何学を学び直すための個人的なノート（[ADR 0002](docs/adr/0002-add-math-notes.md)）。
完成した解説ではなく、定義・定理の主張、自分で考えた証明、疑問を記録する。

### ノートを追加する

1. [docs/math-note-template.md](docs/math-note-template.md) を `src/content/math/<slug>.md` にコピーする。
   `<slug>` は英小文字とハイフン（例: `topological-spaces`）。URL は `/math/<slug>` になり、後から変えない
2. frontmatter を埋める。書いている間は `draft: true` のままにする（`npm run dev` でだけ表示される）
3. 公開するときは `draft: false` にして（または行を消して）、`npm run check && npm test && npm run build` を通す

Markdown ファイルを足すだけで一覧（`/math`）と記事ページに出る。ほかのファイルを触る必要はない。
1 つの概念（または密接な概念のまとまり）を 1 ノートにし、長くなったら分ける。

### 分野

`/math` はノートを分野ごとにまとめて表示する（[ADR 0003](docs/adr/0003-organize-math-notes-by-field.md)）。
分野は `src/data/math.json` の `fields` に、表示順に並べる。ノートのない分野は表示しない。

| id | 分野 |
| --- | --- |
| `logic` | 論理学 |
| `set-theory` | 集合論 |
| `combinatorics` | 組み合わせ論 |
| `real-numbers` | 実数 |
| `topology` | 位相空間論 |

URL は分野に関係なく `/math/<slug>` のまま。ノートの分野を変えても URL は変わらない。
学習の目安（`src/data/math.json` の `roadmap`）の項目にノートをつなぐときは `"note": "<slug>"` を書く。

### frontmatter

| 項目 | 必須 | 内容 |
| --- | --- | --- |
| `title` | ○ | タイトル |
| `description` | ○ | 一覧と meta description に出す一文 |
| `topic` | ○ | 分野の id（上の表）。表にない値はビルドエラー |
| `order` | | 分野の中での並び順（小さいほど先）。省略すると後ろに作成日順 |
| `status` | ○ | 理解の状態（下記） |
| `createdAt` | ○ | 作成日 `YYYY-MM-DD` |
| `updatedAt` | | 更新日。一覧の日付に出す（なければ作成日） |
| `tags` | | タグの配列 |
| `related` | | 関連するノートの slug の配列。ノートの末尾に出し、相手のノートにも逆向きに出る。存在しない slug はビルドエラー |
| `sources` | | 読んだ文献。`title` と、本を見て確かめた章・節・ページだけを `location` に書く |
| `draft` | | `true` の間はビルドに含めない |

`status` は自己申告で、本人だけが変える。

| 値 | 表示 | 意味 |
| --- | --- | --- |
| `unread` | 未学習 | まだ読んでいない |
| `studying` | 学習中 | 読みながら理解している途中 |
| `understood` | 理解した | 内容を自分の言葉で説明できる |
| `proof-in-progress` | 証明を検討中 | 証明を自分で考えている。未完成の部分を含む |
| `verified` | 証明を検証済み | 証明の各段階を確かめ終えた |

`understood` と `verified` は別のもの。理解したつもりであることと、証明が厳密に成立していることを混同しない。
ビルドやテストが通ったことは `verified` の理由にならない。

### 数式

- インライン: `$f \colon X \to Y$`
- ディスプレイ: `$$` だけの行で囲む

```md
$$
f^{-1}(V) \in \mathcal{T}_X
$$
```

ビルド時に KaTeX で HTML にする（クライアント JS なし）。TeX の誤りはビルドエラーになる。
本文で `$` そのものを書くときは `\$` とエスケープする。

### 定義・定理・証明・疑問のブロック

```md
:::definition[位相]{#def-topology}
集合 $X$ 上の位相とは …
:::
```

| 書き方 | 見出し | 使いどころ |
| --- | --- | --- |
| `:::definition` | 定義 | 定義。自分の言い換えは本の定義と分けて書く |
| `:::theorem` / `:::proposition` / `:::lemma` / `:::corollary` | 定理 / 命題 / 補題 / 系 | 主張。前提と結論を分けて書く |
| `:::attempt` | 証明の試み | 自分で考えている途中の証明。足りないところを明記する。∎ は付かない |
| `:::proof` | 証明 | 検証を終えた完成した証明だけ。∎ が付く |
| `:::question` | 疑問 | 分からないこと、次に考えたいこと |
| `:::reading` | 読書メモ | 本のどこを読み、何を理解したか |
| `:::remark` / `:::example` | 注意 / 例 | 補足 |

- `[...]` のラベルは省略できる。`{#id}` を付けると `/math/<slug>#id` で参照できる（`def-` / `thm-` / `q-` などの接頭辞を推奨）
- 上の表にない名前はビルドエラーになる
- ブロックは `src/lib/math-markdown.mjs` で HTML にし、見た目は `src/styles/math.css`（数学ノートのページでだけ読み込む）

### 書くときの約束

- 本の証明や本文を書き写さない。定理の主張と、自分の理解・自分で考えた証明を中心に書く
- 章・節・定理番号・ページ番号は、本を見て確かめたものだけを書く
- AI（Claude など）は証明を考える主体ではなく、レビューとヒントの補助に使う。
  自分で書いていない理解や証明を、自分の成果としてノートにしない

## デプロイ

配信は Cloudflare Workers Static Assets。設定は `wrangler.toml`（Worker スクリプトなし、`dist/` をそのまま配信）。

デプロイは **Cloudflare Workers Builds が GitHub リポジトリに直接接続**して行う。
`main` に push すると Cloudflare 側がビルドしてデプロイする。GitHub Actions からは deploy しない
（`.github/workflows/ci.yml` は `npm run check` と `npm run build` が通ることを見るだけ）。

### 初回の接続手順（Cloudflare ダッシュボード）

CLI では設定できないため、ダッシュボードで一度だけ行う。

1. Workers & Pages → 対象の Worker → Settings → Build → **Connect to Git**
   （Worker 未作成なら Create → Import a repository から）
2. Cloudflare の GitHub App に `hidetzu/hidetzu.work` へのアクセスを許可する。
   Private リポジトリなので、App のリポジトリ選択で明示的に追加する必要がある
3. ビルド設定:

   | 項目 | 値 |
   | --- | --- |
   | Production branch | `main` |
   | Root directory | `/` |
   | Build command | `npm run build` |
   | Deploy command | `npx wrangler deploy` |

Node のバージョンは `.node-version` で固定している。

この方式では Cloudflare の API トークンをリポジトリ側に持たせる必要がない。
GitHub Secrets への `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID` の登録は不要。

### 手動デプロイ

接続前の確認や、緊急時の手元からのデプロイ:

```bash
npx wrangler login
npm run deploy     # astro build && wrangler deploy
```

### 独自ドメイン

`hidetzu.work` の割り当ては Cloudflare ダッシュボード（Workers → hidetzu-work → Settings → Domains & Routes）で行う。
リポジトリ側で管理したい場合は `wrangler.toml` のコメントアウトされた `routes` を有効にする。
`www.hidetzu.work` は使わない前提（apex のみ）。

## デザインの方針

1 画面目は名前とリンクだけのヒーローにし、
本文のセクションはスクロールした先に置く。大きく見せるのはヒーローだけで、
その下は Zenn のプロフィールページくらいの静かさを基準にする。

- ヘッダー: 左にサイト名、右に `site.json` の `links` を `/` 区切りで並べる
- ヒーロー: 中央寄せ。ループ図 → `hidetzu.work` → 大文字の極太見出し → タグライン（英語）→ 日本語の一文 →
  ピル型のリンクタイル（先頭の 1 つだけ塗る）の順。ヘッダーと合わせて 1 画面を埋める
- 背景は CSS だけで描く（差し色のにじみと方眼の点）。canvas / WebGL は使わない
- 動きはループ図の上を一周する点だけ。`prefers-reduced-motion` では止める
- 本文はすべてサンセリフ（`--font-sans`）。`--font-mono` はヘッダー、タイル、日付・status・
  セクション番号など小さなメタ情報だけに使う
- 中央 56rem のカラム。行の区切りは 1px の細い罫。Writing の記事はカードのグリッドで並べる
- 本文の文字サイズは控えめ。本文 16px、セクション見出し 22px（大文字）、補足 15px
- Web フォントは読み込まない

色は声量の 4 段階で使い分ける。WCAG AA（4.5:1）を満たす値を選んであるので、
パレットを変えるときはコントラストを再確認する。

| 変数 | 声量 | 使いどころ |
| --- | --- | --- |
| `--fg` | 見出し | 問い、プロジェクト名、記事タイトル、セクション名 |
| `--body` | 本文 | 説明文、リード、About、CURRENT EXPERIMENT |
| `--muted` | 副次リンク | Site / GitHub などのリンク |
| `--faint` | メタ | 日付、status、release、topic ラベル、ヘッダーのナビ、フッター |
| `--accent` | 差し色 | Q 番号、図のノード、hover |

図版はインライン SVG で、`currentColor` ではなく CSS 変数を参照するのでダークモードに追従する。

- `src/components/LoopDiagram.astro` — Human → Decision → AI → Verify のループ。ヒーローの中央に置く。
  ラベルが読める大きさ（13rem 前後）を下回らせない
- `src/components/Motif.astro` — プロジェクト固有のモチーフ。`projects.json` の `motif` で指定する

## 実装の方針

- React などのフレームワークは、必要になるまで入れない
- クライアント JS は 0 のまま維持する。動きは CSS アニメーションだけで付ける（CSS は `inlineStylesheets: 'always'` で HTML に埋め込む）
- 画像・フォントを増やさない。Web フォントは読み込まない（例外は数学ノートの記事ページの KaTeX フォント。ADR 0002）
- コンポーネントを細かく割らない。デザインシステムを作らない
- 情報構成は Header / Hero / Current Questions / Selected Work（+ Other projects）/ Experiments / Writing / About
  （[ADR 0001](docs/adr/0001-split-roles-between-github-profile-and-site.md)）。セクションを増やすときは ADR を足す。
  数学ノートはトップページとは別の `/math` に置く（[ADR 0002](docs/adr/0002-add-math-notes.md)）
- ポートフォリオではなく「現在進行形の研究ノート」として書く。
  「何ができる人か」ではなく「今どんな問いを追っているか」を前に出し、役職は載せない
- 完成していないものは完成していないと書く。実装されていない機能、未確認の数値、スター数や利用者数は書かない

## ファイル構成

```
src/
  data/          コンテンツ（JSON）と型。math.json は /math の入口の文言と学習の目安
  content/math/  数学ノート（Markdown）
  content.config.ts  数学ノートの frontmatter の定義
  lib/           math-markdown.mjs（数式とブロックの Markdown プラグイン）, math-notes.ts
  components/    LoopDiagram.astro, Motif.astro（インライン SVG）
  layouts/       Base.astro（<head> / metadata / header / footer）
  pages/         index.astro, 404.astro, math/index.astro, math/[slug].astro
  styles/        global.css, math.css（数学ノートのページだけ）
tests/           数学ノート用 Markdown プラグインのテスト
public/          favicon.svg, ogp.png, robots.txt
docs/            ADR、プロフィール・公開情報の棚卸し、数学ノートの雛形
wrangler.toml    Cloudflare Workers Static Assets の設定
.node-version    ビルドに使う Node のバージョン（CI / Cloudflare 共通）
```
