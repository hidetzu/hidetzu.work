# ADR 0001: GitHub プロフィールとサイトの役割を分け、問いとプロジェクトをつなぐ

- 日付: 2026-10-25
- 状態: 採用

## 背景

これまでのサイトは「Current Questions / Projects / Writing / About」の 4 部構成で、
GitHub プロフィール README とほぼ同じプロジェクトの並びを、別の言葉で繰り返していた。
問い（Current Questions）とプロジェクトは同じページにあるのに互いにリンクしておらず、
どのプロジェクトがどの問いを確かめているのかを読み手が自分で結びつける必要があった。

また、プロジェクトの状態は `active` / `experimental` の 2 値だけで、
GitHub Release を出しているもの・pre-release のもの・タグだけのもの・Web 版だけ公開しているものの区別がつかなかった。

2026-10-25 時点の公開リポジトリの棚卸しは [docs/inventory-2026-10.md](../inventory-2026-10.md) にある。

## 決定

### 1. 役割を分ける

| | 受け持つこと | 書き方 |
| --- | --- | --- |
| GitHub プロフィール（`hidetzu/hidetzu`） | WHAT / HOW：何を作ったか、どこにあるか | 英語。1 プロジェクト 1〜2 文と状態。表とリストだけ |
| hidetzu.work | WHY / PROOF：なぜ取り組むのか、何を確かめられたか | 日本語。問題・アプローチ・いま確認できることを分けて書く |

### 2. 情報構成

Hero → Current Questions → Selected Work（+ Other projects）→ Experiments → Writing → About。

- Current Questions の各問いから、それを確かめているプロジェクトへページ内リンクを張る（`now.json` の `projects`）
- Selected Work は「問題 / アプローチ / いま確認できること」を分けて書く。機能一覧にしない
- Experiments は完成度ではなく「問い」と「いまの到達点」を書く。tcpip-stack / verigen / vrestore
- Writing の記事に関連プロジェクトを添える（`writing.json` の `project`）
- 一行で済むプロジェクトは Other projects にまとめる

### 3. 状態の表記

`released` / `development` / `experimental` / `reference` の 4 値と、事実だけを書く `release` 欄に分ける。

- `released` は GitHub Release で配布物を出しているものだけ。タグがあっても Release が無い、draft のまま、
  pre-release だけ、のものは `development` にして、`release` 欄にその事実を書く
- Web 版が公開されていることは `release` 欄に書く（状態とは別の軸なので）
- 凡例をページに出す

### 4. Selected Work の選定

flagman / Decide First / vulnograph / tenken / 今昔 / zemo の 6 件。最終更新日時の順ではなく、次で選んだ。

- 3 つの問い（Delegation / Evidence / Product）のそれぞれに、実装が厚いものが少なくとも 1 つあること
- 「根拠を示し、確かめられなかったことを確かめられなかったと言う」という共通の設計が、コードと README で確認できること
- Web サービス・CLI・セキュリティ・単一バイナリの道具と、領域が偏らないこと
- 完成度の違うもの（Release 済み / pre-release / 開発中）を、状態を明示したうえで混ぜてよいこと

GitHub の Pinned repositories もこの 6 件にそろえる（手動。[docs/profile-and-metadata.md](../profile-and-metadata.md)）。

### 5. メッセージ

タグライン（英語）を
「Building better loops between humans, AI, and software.」から
「Building software that shows its evidence — and says what it could not verify.」に変えた。

公開しているプロジェクトの多くが、出典つきで答え（vulnograph、今昔、Decide First、flagman）、
確かめられなかったことを別に報告する（tenken、今昔、vrestore、ConnectDoctor）ことを、実装と README で確認できたため。
AI に限らない言い方にしたのは、ネットワーク・低レイヤー・Web サービスのプロジェクトも同じ設計に乗っているから。

## 採用しなかった案

- **入力の候補「Building software that makes uncertainty visible, evidence traceable, and decisions verifiable.」**
  — 方向は同じだが 3 つの抽象名詞が並び、何をするソフトウェアかが伝わりにくい。
  「decisions verifiable」は flagman の replay 以外では実装で裏付けられない
- **旧タグライン「Building better loops between humans, AI, and software.」を残す** — AI 支援開発のループに寄りすぎ、
  vulnograph / tenken / ConnectDoctor / tcpip-stack を説明できない
- **3 つのテーマごとにセクションを分ける** — konjaku のように複数の問いにまたがるプロジェクトを二重に書くことになる。
  テーマは問いの側に持たせ、プロジェクトは一度だけ書いてリンクでつなぐ
- **ConnectDoctor を Selected Work に入れ、tenken を外す** — tenken は公開から日が浅い（最初のコミットが 2026-10-24）が、
  実装とテストの量があり、「検査しなかったことを報告する」という設計がもっともはっきりしている。
  ConnectDoctor は Other projects と Q3 から参照する
- **状態をタグの有無で機械的に決める** — konjaku はタグ v0.3.0 があるが GitHub Release は無く、Web サービスとして公開されている。
  tcpip-stack もタグ v0.1.0 だけがある。タグだけでは実態と食い違う
- **GitHub API から記事やスター数を取得して表示する** — ビルドが外部に依存し、数値の誇示は目的に合わない

## 影響

- `projects.json` の形が変わった（`id` / `placement` / `release` / `problem` / `approach` / `result` / `question`）。README に例を書いた
- 存在しない id を `now.json` / `writing.json` から参照するとビルドが落ちる
- ダークモードの `--faint` を `#878176` → `#8c867b` にした。カード（`--surface`）の上で 4.4:1 しかなく、
  README にある WCAG AA（4.5:1）を満たしていなかったため（変更前の本番にもあった問題）
