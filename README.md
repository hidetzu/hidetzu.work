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
- 画像・フォントを増やさない。Web フォントは読み込まない
- コンポーネントを細かく割らない。デザインシステムを作らない
- 情報構成は Header / Hero / Current Questions / Selected Work（+ Other projects）/ Experiments / Writing / About
  （[ADR 0001](docs/adr/0001-split-roles-between-github-profile-and-site.md)）。セクションを増やすときは ADR を足す
- ポートフォリオではなく「現在進行形の研究ノート」として書く。
  「何ができる人か」ではなく「今どんな問いを追っているか」を前に出し、役職は載せない
- 完成していないものは完成していないと書く。実装されていない機能、未確認の数値、スター数や利用者数は書かない

## ファイル構成

```
src/
  data/          コンテンツ（JSON）と型
  components/    LoopDiagram.astro, Motif.astro（インライン SVG）
  layouts/       Base.astro（<head> / metadata / header / footer）
  pages/         index.astro, 404.astro
  styles/        global.css
public/          favicon.svg, ogp.png, robots.txt
docs/            ADR と、プロフィール・公開情報の棚卸し
wrangler.toml    Cloudflare Workers Static Assets の設定
.node-version    ビルドに使う Node のバージョン（CI / Cloudflare 共通）
```
