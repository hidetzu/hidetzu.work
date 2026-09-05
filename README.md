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
| `src/data/now.json` | Now セクション（`updated` と関心テーマ） |
| `src/data/projects.json` | Projects の一覧（配列。先頭から表示される） |
| `src/data/writing.json` | Zenn の Book / 記事（手動定義。外部 API は叩かない） |
| `src/data/about.json` | About の本文と末尾のリンク |

型は `src/data/types.ts` にある。項目を増やすときは JSON と型の両方を更新する。

Project を 1 件追加する例:

```json
{
  "name": "新しいプロジェクト",
  "status": "active",
  "summary": "一行の説明。",
  "tags": ["Tag"],
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

## 方針

- 派手なポートフォリオにはしない。「README をきれいに Web 化した」程度の軽さを保つ
- React などのフレームワークは、必要になるまで入れない
- クライアント JS は 0 のまま維持する（CSS は Astro が HTML にインライン化する）
- 画像・フォントを増やさない。Web フォントは読み込まずシステムフォントを使う
- コンポーネントを細かく割らない。デザインシステムを作らない

## ファイル構成

```
src/
  data/          コンテンツ（JSON）と型
  layouts/       Base.astro（<head> / metadata / 共通ラッパ）
  pages/         index.astro, 404.astro
  styles/        global.css
public/          favicon.svg, ogp.png, robots.txt
wrangler.toml    Cloudflare Workers Static Assets の設定
.node-version    ビルドに使う Node のバージョン（CI / Cloudflare 共通）
```
