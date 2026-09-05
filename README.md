# hidetzu.work

[hidetzu.work](https://hidetzu.work) の個人サイト。GitHub / Zenn / 公開プロダクト / 現在の関心を 1 ページにまとめた入口。

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
| `src/data/site.json` | サイト名、タグライン、description、Hero のリンク |
| `src/data/now.json` | `updated` と、Current Questions（3 つ程度の問い） |
| `src/data/projects.json` | Projects の一覧（配列。`motif` は `map` / `loop` / `packet`、`experiment` は今試している問い） |
| `src/data/writing.json` | Zenn の記事（手動定義。外部 API は叩かない。今のテーマを代表する 3 本程度に絞る） |
| `src/data/about.json` | About の本文と末尾のリンク |

型は `src/data/types.ts` にある。項目を増やすときは JSON と型の両方を更新する。

Project を 1 件追加する例:

```json
{
  "name": "新しいプロジェクト",
  "status": "active",
  "motif": "loop",
  "summary": "一行の説明。",
  "experiment": "いま試している問い。",
  "links": [{ "label": "GitHub", "url": "https://github.com/hidetzu/xxx" }]
}
```

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

方向性は Technical / Editorial / Lab。派手なポートフォリオ風にもハッカー UI にもしない。
色数と装飾ではなく、書体・余白・罫線で階層を作る。

書体は Web フォントを読み込まず、システムフォント 3 種の役割分担で階層を作っている。

| 変数 | 役割 | 使いどころ |
| --- | --- | --- |
| `--font-mono` | 技術的なメタ情報 | サイト名、セクション番号・ラベル、日付、status、リンク |
| `--font-serif` | 見出しとタイトル | タグライン、プロジェクト名、記事タイトル、Now のリード |
| `--font-sans` | 本文 | 説明文、About |

レイアウトはセクションごとにリズムを変える。均一な縦積みにしない。

| セクション | リズム |
| --- | --- |
| Hero | 巨大な名前（最大 10rem）+ 右にループ図。以降のどこよりも大きく取る |
| Current Questions | 大きな連番（Q1–Q3）を左にぶら下げ、問いを最大級の見出しとして立てる |
| Projects | 3 列。モチーフ / 名前・説明 / CURRENT EXPERIMENT を横に並べる |
| Writing | 縦積みではなく 3 列の索引 |
| About | 短い一文を大きく置く |

セクション見出しは全幅の帯（2px の罫 + 番号 + セクション名）で、中央寄せの細いカラムを作らない。
`.wrap` の上限は 88rem、左右は `clamp(1rem, 4.5vw, 4.5rem)`。

Hero の名前は 60rem 以上で 2 カラムになるため、`clamp` の係数を切り替えて折り返さない幅に収めている。
ここを触るときは 768 / 960 / 1024px で名前が 1 行に収まるか確認する。

図版はすべてインライン SVG で、`currentColor` ではなく CSS 変数を参照するのでダークモードに追従する。

- `src/components/LoopDiagram.astro` — Hero の Human → Decision → AI → Verify ループ
- `src/components/Motif.astro` — プロジェクト固有のモチーフ。`map` / `loop` / `packet` を
  `projects.json` の `motif` で指定する

色は声量の 4 段階で使い分ける。WCAG AA（4.5:1）を満たす値を選んであるので、
パレットを変えるときはコントラストを再確認する。

| 変数 | 声量 | 使いどころ |
| --- | --- | --- |
| `--fg` | 最も強い | 問い、プロジェクト名、記事タイトル、CURRENT EXPERIMENT |
| `--body` | 本文 | 説明文、リード、About |
| `--muted` | 弱い | セクションラベル |
| `--faint` | 最も弱い | 日付、status、マストヘッド、フッター |
| `--accent` | 差し色 | セクション番号、topic ラベル、図のノードと矢印 |

## 実装の方針

- React などのフレームワークは、必要になるまで入れない
- クライアント JS は 0 のまま維持する（CSS は `inlineStylesheets: 'always'` で HTML に埋め込む）
- 画像・フォントを増やさない。Web フォントは読み込まない
- コンポーネントを細かく割らない。デザインシステムを作らない
- 文章量を増やさない。情報構成（Hero / Current Questions / Projects / Writing / About）は変えない
- ポートフォリオではなく「現在進行形の研究ノート」として書く。
  「何ができる人か」ではなく「今どんな問いを追っているか」を前に出し、役職は載せない

## ファイル構成

```
src/
  data/          コンテンツ（JSON）と型
  components/    LoopDiagram.astro, Motif.astro（インライン SVG）
  layouts/       Base.astro（<head> / metadata / masthead / footer）
  pages/         index.astro, 404.astro
  styles/        global.css
public/          favicon.svg, ogp.png, robots.txt
wrangler.toml    Cloudflare Workers Static Assets の設定
.node-version    ビルドに使う Node のバージョン（CI / Cloudflare 共通）
```
