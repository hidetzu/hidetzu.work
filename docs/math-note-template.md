---
title: "ノートのタイトル"
description: "一覧に出す一文。何を学ぶノートか。"
topic: topology # 分野。src/data/math.json の fields の id（logic / set-theory / real-numbers / topology / combinatorics）
order: 1 # 分野の中での並び順（小さいほど先）。証明で使うノートより後ろにする（README の「並び順」）。省略すると後ろに作成日順で並ぶ
# usesLater:          # 分野の中で後ろのノートを使う順のままにすると決めたときだけ。相手の slug と理由
#   - note: finite-sets
#     reason: "…"
status: unread # unread / studying / understood / proof-in-progress / verified（自己申告）
createdAt: 2026-01-01
# updatedAt: 2026-01-02
related: [] # 関連するノートの slug。相手のノートにも逆向きのリンクが自動で出る
aliases: [] # 別名・英語名・略称で、本文に出てこないもの（例: ["exclusive or"]）。冒頭に出て、検索でも探せる
tags: []
sources:
  - title: "James R. Munkres, Topology, 2nd ed."
    # location: "§xx, pp. xx–xx"   # 資料を見て確かめた章・節・ページだけを書く
    # note: "4 節はこの資料の範囲外"  # 資料との対応の補足（任意）
# textbook:            # 学習記録。参考文献の章・節（src/data/math.json の references の chapters にあるもの）。確かめたものだけ
#   ref: munkres-topology  # references の id。省略すると先頭の資料
#   chapter: 2
#   section: 12
draft: true # 公開するときに false にする（または行を消す）
---

<!--
使うブロック（必要なものだけ）:

:::definition[名前]{#def-xxx}
定義。自分の言葉での言い換えは、本の定義と分けて書く。
:::

:::theorem[名前]{#thm-xxx}      （proposition / lemma / corollary も同じ書き方）
前提と結論を分けて書く。ラベルには内容を表す名前を書き、参考文献での番号は {#thm-xxx source="Munkres, Theorem 4.1"} のように source に書く。
:::

:::counterexample[名前]{#cex-xxx}   （具体例は example。どちらも証明を付けられる）
主張が成り立たないことを示す例。どの仮定が欠けると成り立たないかを書く。
:::

:::attempt[命題 xxx]
自分で考えている途中の証明。足りない部分は「ここが示せていない」と書く。∎ は付かない。
:::

:::proof{origin=self}
検証済みの完成した証明だけをここに書く。∎ が付く。
origin は self / self-reviewed / textbook / ai。文章を Claude が整えたら text=ai、補足は note="…"。
証明で使った定義・定理は [補題 1](#lem-xxx) のようにリンクにする（依存関係として集計される）。
:::

:::question
分からないこと、次に考えたいこと。
:::

:::reading[§xx]
どこを読み、何を理解したか。本文や証明を書き写さない。
:::

数式: インラインは $f \colon X \to Y$、ディスプレイは $$ ... $$ を前後の行に置く。
相互参照: /math/<ファイル名>#def-xxx
-->

<!--
どこまで学んだか、証明の経緯、未着手の演習は、ここ（本文）には書かない。
src/content/math-log/<ファイル名>.md に書く（frontmatter は note: <ファイル名>）。/math/learning に出る（docs/adr/0009）
-->

## 定義

## 定理・命題

## 自分で考えた証明

## 疑問
