# 公開リポジトリの棚卸し（2026-10-25）

`gh repo list`、`gh release list`、各リポジトリの README・コード・タグを 2026-10-25 に確認した結果。
スター数や利用者数は確認の対象にしていない。

## 分類

- **Released** — GitHub Release で配布物を確認できる
- **Development** — 動く実装はあるが開発途上（タグだけ、pre-release だけ、Release なし）
- **Experimental** — 技術的な問いの検証が中心
- **Legacy / Reference** — 過去のコード、サンプル、設定

## 主要リポジトリ

| リポジトリ | 言語 | 分類 | リリース / 公開の実態 | 何を解決するか | 掲載 |
| --- | --- | --- | --- | --- | --- |
| flagman | Go | Development | タグ・Release なし。`go install` で入る | AI agent が commit / push / merge の前に、続けてよいかを証拠から判定し記録・再生する | Selected |
| decide-first | TypeScript | Released | v0.1.0（Release）、Web 版公開 | Issue を AI に渡す前に人間が決めることを示す | Selected |
| vulnograph | Go | Development | v0.1.0-dev.1（pre-release, 2026-10-24） | CVE から出典つきのレポートと図を作る | Selected |
| tenken | Go | Development | タグ v0.1.0-dev.1。Release は draft のまま未公開 | Web サイトの点検と CI での失敗。検査しなかったことも報告 | Selected |
| konjaku | JavaScript | Development | タグ v0.3.0 まで。Release なし。Web 版公開 | 土地の昔を、国土地理院の資料から根拠つきで答える | Selected |
| zemo | Zig | Released | v0.4.1（Release、Linux / macOS / Windows バイナリ） | git リポジトリをターミナルのメモ帳にする | Selected |
| connect-doctor | Go | Development | タグ・Release なし。Web 版公開 | URL がつながらない層を DNS / TCP / TLS / HTTP で特定 | Other |
| claude-dev-template | JavaScript | Development | タグ・Release なし | 人間の判断と検証を残す Claude Code ワークフロー | Other |
| prism | Go | Released | v0.3.0 | PR を AI レビュー用の構造化された文脈に分解 | Other |
| ccpr | Go | Released | v1.2.1 | CodeCommit の PR を AI レビュー用の入力にする | Other |
| backlog-fzf | Go | Released | v0.2.0 | Backlog の課題・ドキュメントの横断検索 | Other |
| dotfiles | Lua | Reference | — | macOS クライアントと Arch Linux 開発機の設定 | Other |
| tcpip-stack | C | Experimental | タグ v0.1.0。Release なし | ユーザー空間の TCP/IP コア。アプリ向け API なし | Experiments |
| verigen | Go | Experimental | タグ・Release なし | 生成 → 検証ループ。保証を検証器だけに持たせる | Experiments |
| vrestore | Zig | Experimental | タグ・Release なし。README に Experimental と明記 | 動画の固定領域を他フレームの実画素から復元 | Experiments |
| riskcheck | Go | Released | v0.1.0 | diff のリスクを点数化 | 掲載なし（decide-first / flagman が点数を出さない方針に移っている） |
| prism-api | Go | Development | タグ v0.2.0。Release なし | prism の HTTP API | 掲載なし（prism に含める） |
| prism-provider-codecommit | Go | Released | v0.1.0 | prism の CodeCommit プラグイン | 掲載なし |
| kagima | TypeScript | Development | README に「アプリケーションのコードはまだ存在しない」 | 招待した人だけの一時ルーム | 掲載なし（実装前） |

## その他の公開リポジトリ

| リポジトリ | 最終 push | 分類 | メモ |
| --- | --- | --- | --- |
| homebrew-tap | 2026-10 | Reference | 配布用 |
| devto-content | 2026-10 | Reference | dev.to 記事の管理。description が空 |
| pg-release-scraper | 2026-05 | Released (v0.2.0) | |
| ai-news-bot | 2026-03 | Released (v0.1.0) | |
| ai-runtime | 2026-03 | Development | |
| cpustat, csv2json | 2026-03 | Released | 小さな CLI |
| rest-testify | 2024-09 | Legacy | |
| myip, myip.nvim | 2022-08 | Legacy | |
| webcam-viewer | 2017-09 | Legacy | |
| lua_emeded_c, expat_sample, task_fw | 2015 | Legacy / Reference | 学習用のサンプル |

## README と実態の食い違い（要確認）

- **flagman**: README の Install に「Or download an archive from the releases page」とあるが、GitHub Release もタグもまだ無い
- **tenken**: README は `@v0.1.0-dev.1` での `go install` を案内している（タグはあるので動く）。対応する GitHub Release は draft のまま
- **konjaku**: タグ v0.1.0〜v0.3.0 はあるが GitHub Release は無い。Web 版が本体なので問題ではないが、版を示したいなら Release を作るかを決める

## 公開状態を再検討してよいもの（提案のみ。何も変更していない）

- `lua_emeded_c`、`expat_sample`、`task_fw`（2015）、`webcam-viewer`（2017）— 学習用のサンプル。
  Archive すると「保守していない」ことがはっきりする。削除や非公開化までは不要
- `myip`、`myip.nvim`（2022）— 同上。Archive の候補
