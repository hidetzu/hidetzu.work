# プロフィールと公開メタデータ：手動で反映するもの

2026-10-25 の作業で、権限や手段の都合で自動では反映していないもの。どれも未反映。
文面はそのまま貼れる形にしてある。

## GitHub プロフィール設定

`gh` のトークンに `user` スコープが無いため、Bio は API から変更していない。
Pinned repositories は API（GraphQL）で変更する手段が無い。どちらも <https://github.com/hidetzu> の
「Edit profile」と「Customize your pins」から手で設定する。

| 項目 | 現在 | 提案 |
| --- | --- | --- |
| Bio | I'm working as a Software Engineer. I ❤ neovim and Go. | Software engineer in Tokyo. Building software that shows its evidence — CLIs, web services and systems experiments in Go, TypeScript, Zig and C. |
| Website | https://hidetzu.work/ | 変更なし |
| Pinned | konjaku, prism, zemo, ccpr, claude-dev-template, tcpip-stack | flagman, decide-first, vulnograph, tenken, konjaku, zemo |

Pinned は README の Selected projects と同じ 6 件にそろえる（[ADR 0001](adr/0001-split-roles-between-github-profile-and-site.md) §4）。

## リポジトリのメタデータ

今回の中心のリポジトリで、description か topics が空のもの。自動実行は承認が下りなかったので、次のコマンドで反映する。

```sh
gh repo edit hidetzu/tcpip-stack \
  --description "A user-space TCP/IP protocol core for Linux in C, interoperated against the Linux kernel over a TAP device. An experiment in AI-assisted systems engineering." \
  --add-topic c,tcp-ip,networking,linux,tap,systems-programming
gh repo edit hidetzu/verigen \
  --description "A generate-then-verify loop in Go: the generator guarantees nothing, and a strict verifier keeps only the outputs it can prove." \
  --add-topic go,verification,generate-and-verify,puzzle-generator,constraint-satisfaction
gh repo edit hidetzu/vrestore --add-topic zig,video,video-restoration,ffmpeg,computer-vision
gh repo edit hidetzu/tenken --add-topic go,cli,ci,website-checker,tls,broken-links,security-headers,sitemap
```

README と実態の食い違い（flagman の releases page の記述など）は [inventory-2026-10.md](inventory-2026-10.md) に挙げた。
各リポジトリ側で直す。

## Zenn（<https://zenn.dev/hidetzu>）

現在の自己紹介は prism / ccpr を中心に書かれていて、2026-08 以降の活動（今昔、Decide First、flagman、vulnograph、tenken、
低レイヤーの記事）が入っていない。Website は https://hidetzu.work/ で問題ない。

提案（自己紹介）:

```text
根拠を示し、確かめられなかったことは確かめられなかったと言うソフトウェアを作っています。

AI に任せることと人間が決めることの境目（flagman / Decide First）、出典つきの検証（vulnograph / tenken）、
Web サービス（今昔）、低レイヤーの実験（tcpip-stack）。Go / TypeScript / Zig / C。
```

## DEV Community（<https://dev.to/hidetzu>）

自己紹介（Bio）と Website が空。

- Website: `https://hidetzu.work`
- Bio:

```text
Software engineer in Tokyo. I build software that shows its evidence and says what it could not verify. Go, TypeScript, Zig, C.
```
