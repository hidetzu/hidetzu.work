---
title: "含意と対偶"
description: "「ならば」の真理値と空虚な真、含意の否定、対偶と逆、必要条件と十分条件、同値の示し方。"
topic: logic
order: 2
status: understood
createdAt: 2026-11-09
related:
  - sets
tags:
  - logic
---

:::remark[このノートの書き方]
[命題論理の基礎](/math/propositional-logic) で補足として整理していた含意の部分を、参照しやすいように 1 ページに分けたもの。
本文で読んだ内容ではなく、論理学の基本の補足。
:::

## 1. 含意

$P \Rightarrow Q$（$P$ ならば $Q$）が偽になるのは、$P$ が真で $Q$ が偽のときだけ。

| $P$ | $Q$ | $P \Rightarrow Q$ |
| --- | --- | --- |
| T | T | T |
| T | F | **F** |
| F | T | T |
| F | F | T |

$P$ が偽なら、$Q$ に関係なく $P \Rightarrow Q$ は真になる。これを**空虚な真**という。

:::example[空虚な真]{#ex-vacuous}
空集合はどの集合にも含まれる（[集合と包含関係](/math/sets#prop-empty-subset)）。
$x \in \varnothing$ はどの $x$ についても偽なので、「$x \in \varnothing$ ならば $x \in B$」は空虚に真になる。
:::

## 2. 含意の否定

$$
\neg (P \Rightarrow Q) \iff P \land \neg Q
$$

「$P$ ならば $Q$」が成り立たないことを示すには、「$P$ なのに $Q$ でない」例を 1 つ挙げればよい。
「$P$ ならば $\neg Q$」を示す必要はない。

## 3. 対偶と逆

| 名前 | 形 | $P \Rightarrow Q$ と同値か |
| --- | --- | --- |
| 対偶 | $\neg Q \Rightarrow \neg P$ | 同値 |
| 逆 | $Q \Rightarrow P$ | 同値とは限らない |

$$
(P \Rightarrow Q) \iff (\neg Q \Rightarrow \neg P)
$$

真理値表で両辺が一致するので、$P \Rightarrow Q$ の代わりに対偶を示してもよい。
一方、逆は元の命題と真偽が食い違うことがある。$P$ が偽で $Q$ が真のとき、$P \Rightarrow Q$ は真だが $Q \Rightarrow P$ は偽。

## 4. 必要条件と十分条件

:::definition[必要条件・十分条件]{#def-necessary-sufficient}
$P \Rightarrow Q$ が成り立つとき、

- $P$ は $Q$ であるための**十分条件**（$P$ が成り立てば、それだけで $Q$ が言える）
- $Q$ は $P$ であるための**必要条件**（$P$ が成り立つには、少なくとも $Q$ が必要）

という。
:::

矢印の根元が十分条件、矢印の先が必要条件。

:::example[包含関係で読む]{#ex-necessary-sufficient}
$A \subseteq B$ のとき、「$x \in A$ ならば $x \in B$」が成り立つ。

- $x \in A$ は $x \in B$ であるための十分条件
- $x \in B$ は $x \in A$ であるための必要条件

$A = \{1\}$、$B = \{1, 2\}$ なら、$x \in B$ は必要条件だが十分条件ではない（$x = 2$）。
:::

## 5. 同値の示し方

$$
(P \Leftrightarrow Q) \iff (P \Rightarrow Q) \land (Q \Rightarrow P)
$$

同値を示すには、両方向の含意を示す。$P$ は $Q$ であるための必要十分条件になる。

集合の等号 $A = B$ を、$A \subseteq B$ と $B \subseteq A$ の両方を示して証明するのは、この形（[集合と包含関係](/math/sets#def-set-equality)）。
