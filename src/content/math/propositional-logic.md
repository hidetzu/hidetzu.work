---
title: "命題論理の基礎"
description: "命題と論理演算、真理値表。数学の「または」と排他的な「または」の違い、ド・モルガンの法則と量化記号の否定。"
topic: logic
order: 1
status: understood
createdAt: 2026-11-08
updatedAt: 2026-11-09
related:
  - implication
  - sets
tags:
  - logic
  - munkres
sources:
  - title: "James R. Munkres, Topology, 2nd ed."
    location: "Chapter 1"
textbook:
  chapter: 1
---

:::remark[このノートの書き方]
本文で読んで学んだのは、日常英語の or と数学の or の違い（3 節）。
ほかの節は、位相空間論の定義や証明を読み書きするときに参照するために、論理学の基本を補足として整理したもの。見出しに **（補足）** と付けた。

含意・対偶・必要条件と十分条件は [含意と対偶](/math/implication)、集合演算との対応は [集合の基本と演算](/math/sets#def-set-operations) に分けた。
:::

## 1. 命題（補足）

:::definition[命題]{#def-proposition}
真か偽かのどちらか一方に定まる文を**命題**という。
:::

- 「$2$ は偶数である」は真の命題、「$3 < 1$」は偽の命題。
- 「$x > 0$」は $x$ が決まらないと真偽が定まらないので、このままでは命題ではない。$x$ に値を入れるか、量化記号（4 節）を付けると命題になる。

命題を文字 $P, Q$ で表し（命題変数）、真を $\mathrm{T}$、偽を $\mathrm{F}$ と書く。

## 2. 論理演算（補足）

| 演算 | 記号 | 読み方 | 真になるとき |
| --- | --- | --- | --- |
| 否定（NOT） | $\neg P$ | $P$ ではない | $P$ が偽 |
| 論理積（AND） | $P \land Q$ | $P$ かつ $Q$ | $P, Q$ がともに真 |
| 論理和（OR） | $P \lor Q$ | $P$ または $Q$ | $P, Q$ の少なくとも一方が真 |
| 排他的論理和（XOR） | $P \oplus Q$ | $P$ か $Q$ の一方だけ | $P, Q$ のちょうど一方が真 |
| 含意 | $P \Rightarrow Q$ | $P$ ならば $Q$ | $P$ が真で $Q$ が偽、ではないとき |
| 同値 | $P \Leftrightarrow Q$ | $P$ と $Q$ は同値 | $P, Q$ の真偽が一致するとき |

真理値表で書くと次のとおり。含意と同値の使い方は [含意と対偶](/math/implication) にまとめた。

| $P$ | $Q$ | $\neg P$ | $P \land Q$ | $P \lor Q$ |
| --- | --- | --- | --- | --- |
| T | T | F | T | T |
| T | F | F | F | T |
| F | T | T | F | T |
| F | F | T | F | F |

| $P$ | $Q$ | $P \oplus Q$ | $P \Rightarrow Q$ | $P \Leftrightarrow Q$ |
| --- | --- | --- | --- | --- |
| T | T | F | T | T |
| T | F | T | F | F |
| F | T | T | T | F |
| F | F | F | T | T |

## 3. 2 つの「または」

日常英語の or は、文脈によって「少なくとも一方」の意味にも「どちらか一方だけ」の意味にもなる。
数学では曖昧さをなくすため、「または」はいつも**少なくとも一方**の意味（inclusive or）で使う。

- **inclusive or**（$P \lor Q$）：$P, Q$ の少なくとも一方が真。両方が真でもよい。
- **exclusive or**（$P \oplus Q$）：$P, Q$ のちょうど一方が真。両方が真なら偽。

| $P$ | $Q$ | $P \lor Q$ | $P \oplus Q$ |
| --- | --- | --- | --- |
| T | T | **T** | **F** |
| T | F | T | T |
| F | T | T | T |
| F | F | F | F |

違いは、両方が真の 1 行（1 行目）だけにある。（補足）排他的な意味で言いたいときは、論理和に「両方ではない」を付け加えて

$$
P \oplus Q \iff (P \lor Q) \land \neg (P \land Q)
$$

と書ける。

集合では、この違いがそのまま和集合と対称差の違いになる（[集合の基本と演算](/math/sets#ex-or-xor)）。

## 4. ド・モルガンの法則と量化記号（補足）

:::theorem[ド・モルガンの法則]{#thm-de-morgan}
$$
\begin{aligned}
\neg (P \land Q) &\iff \neg P \lor \neg Q \\
\neg (P \lor Q) &\iff \neg P \land \neg Q
\end{aligned}
$$
:::

どちらも、真理値表の 4 行で両辺の真偽が一致することから確かめられる。

$x$ を含む文 $P(x)$ には、**量化記号**を付けて命題にする。

- $\forall x\, P(x)$：すべての $x$ について $P(x)$
- $\exists x\, P(x)$：ある $x$ について $P(x)$（$P(x)$ を満たす $x$ が少なくとも 1 つある）

否定は「すべて」と「ある」を入れ替える。

:::theorem[量化記号の否定]{#thm-quantifier-negation}
$$
\begin{aligned}
\neg\, \forall x\, P(x) &\iff \exists x\, \neg P(x) \\
\neg\, \exists x\, P(x) &\iff \forall x\, \neg P(x)
\end{aligned}
$$
:::

「すべての $x$ で成り立つ」を否定するには、成り立たない $x$ を 1 つ挙げればよい。
[集合族の共通部分が空になる例](/math/families-of-sets#ex-shrinking-intervals)では、この形で矛盾を導いている。
集合の補集合についてのド・モルガンの法則（[2 つの集合](/math/sets#thm-de-morgan-sets)、[集合族](/math/families-of-sets#thm-de-morgan-families)）は、この 2 組の法則を所属条件に当てはめたもの。

## 5. 確認問題

:::proposition[確認問題]{#q-exercise}
$x \in A \cup B$ かつ $x \notin A$ ならば、$x \in B$ であることを説明せよ。
:::

:::proof[解答]
$P$ を「$x \in A$」、$Q$ を「$x \in B$」とする。仮定は $P \lor Q$ と $\neg P$、つまり $P \lor Q$ が真で $P$ が偽。
3 節の真理値表で $P$ が偽の行は 3 行目と 4 行目で、そのうち $P \lor Q$ が真なのは $Q$ が真の 3 行目だけ。よって $Q$ が真、すなわち $x \in B$。
:::

$x$ が $A$ と $B$ の両方に属する可能性（真理値表の 1 行目）は、$x \notin A$ という仮定で最初から除かれている。
だからこの推論は、「または」が inclusive か exclusive かに関係なく成り立つ。
