---
title: "論理の基礎"
description: "命題と真理値、論理演算と真理値表、数学の「または」、含意と空虚な真、含意の否定、対偶と逆、必要条件・十分条件、同値、ド・モルガンの法則、量化記号とその否定。"
topic: logic
order: 1
status: understood
createdAt: 2026-11-08
updatedAt: 2026-11-14
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
Munkres の Chapter 1 の本文で扱うのは、数学の「または」の意味（2 節の「2 つの『または』」）である。
それ以外は、定義や証明を読み書きするための論理の基本を、教科書の範囲外の **（補足）** として整理したものである。
:::

## 1. 命題と真理値

:::definition[命題]{#def-proposition}
真か偽かのどちらか一方に定まる文を**命題**という。
:::

- 「$2$ は偶数である」は真の命題、「$3 < 1$」は偽の命題である。
- 「$x > 0$」は $x$ が決まらないと真偽が定まらないので、このままでは命題ではない。$x$ に値を入れるか、量化記号（8 節）を付けると命題になる。

命題を文字 $P, Q$ で表し（命題変数）、真を $\mathrm{T}$、偽を $\mathrm{F}$ と書く。

## 2. 論理演算

| 演算 | 記号 | 読み方 | 真になるとき |
| --- | --- | --- | --- |
| 否定（NOT） | $\neg P$ | $P$ ではない | $P$ が偽 |
| 論理積（AND） | $P \land Q$ | $P$ かつ $Q$ | $P, Q$ がともに真 |
| 論理和（OR） | $P \lor Q$ | $P$ または $Q$ | $P, Q$ の少なくとも一方が真 |
| 排他的論理和（XOR） | $P \oplus Q$ | $P$ か $Q$ の一方だけ | $P, Q$ のちょうど一方が真 |

| $P$ | $Q$ | $\neg P$ | $P \land Q$ | $P \lor Q$ |
| --- | --- | --- | --- | --- |
| T | T | F | T | T |
| T | F | F | F | T |
| F | T | T | F | T |
| F | F | T | F | F |

含意 $P \Rightarrow Q$ と同値 $P \Leftrightarrow Q$ は、3 節と 6 節で扱う。

### 2 つの「または」

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

## 3. 含意

:::definition[含意]{#def-implication}
$P \Rightarrow Q$（$P$ ならば $Q$）は、$P$ が真で $Q$ が偽のときだけ偽になり、それ以外は真である。
:::

| $P$ | $Q$ | $P \Rightarrow Q$ |
| --- | --- | --- |
| T | T | T |
| T | F | **F** |
| F | T | T |
| F | F | T |

$P$ が偽なら、$Q$ に関係なく $P \Rightarrow Q$ は真になる。これを**空虚な真**という。

:::example[空虚な真]{#ex-vacuous}
空集合はどの集合にも含まれる。
$x \in \varnothing$ はどの $x$ についても偽なので、「$x \in \varnothing$ ならば $x \in B$」は空虚に真になる。
:::

### 含意の否定

$$
\neg (P \Rightarrow Q) \iff P \land \neg Q
$$

「$P$ ならば $Q$」が成り立たないことを示すには、「$P$ なのに $Q$ でない」例を 1 つ挙げればよい。
「$P$ ならば $\neg Q$」を示す必要はない。

## 4. 対偶と逆

| 名前 | 形 | $P \Rightarrow Q$ と同値か |
| --- | --- | --- |
| 対偶 | $\neg Q \Rightarrow \neg P$ | 同値 |
| 逆 | $Q \Rightarrow P$ | 同値とは限らない |

:::theorem[対偶]{#thm-contrapositive}
$$
(P \Rightarrow Q) \iff (\neg Q \Rightarrow \neg P)
$$
:::

真理値表で両辺が一致するので、$P \Rightarrow Q$ の代わりに対偶を示してもよい。
一方、逆は元の命題と真偽が食い違うことがある。$P$ が偽で $Q$ が真のとき、$P \Rightarrow Q$ は真だが $Q \Rightarrow P$ は偽である。

逆 $Q \Rightarrow P$、対偶 $\neg Q \Rightarrow \neg P$、[含意の否定](#含意の否定) $P \land \neg Q$ は、それぞれ別のものである。

## 5. 必要条件と十分条件

:::definition[必要条件・十分条件]{#def-necessary-sufficient}
$P \Rightarrow Q$ が成り立つとき、

- $P$ は $Q$ であるための**十分条件**（$P$ が成り立てば、それだけで $Q$ が言える）
- $Q$ は $P$ であるための**必要条件**（$P$ が成り立つには、少なくとも $Q$ が必要）

という。
:::

矢印の根元が十分条件、矢印の先が必要条件である。
$P \Rightarrow Q$ と $Q \Rightarrow P$ がともに成り立つとき、$P$ は $Q$ であるための**必要十分条件**であるという（6 節）。

:::example[包含関係で読む]{#ex-necessary-sufficient}
$A \subseteq B$ のとき、「$x \in A$ ならば $x \in B$」が成り立つ。

- $x \in A$ は $x \in B$ であるための十分条件
- $x \in B$ は $x \in A$ であるための必要条件

$A = \{1\}$、$B = \{1, 2\}$ なら、$x \in B$ は必要条件だが十分条件ではない（$x = 2$）。
:::

## 6. 同値

$P \Leftrightarrow Q$（$P$ と $Q$ は同値）は、$P, Q$ の真偽が一致するときに真になる。

| $P$ | $Q$ | $P \Leftrightarrow Q$ |
| --- | --- | --- |
| T | T | T |
| T | F | F |
| F | T | F |
| F | F | T |

$$
(P \Leftrightarrow Q) \iff (P \Rightarrow Q) \land (Q \Rightarrow P)
$$

同値を示すには、両方向の含意を示す。このとき $P$ は $Q$ であるための必要十分条件である。

## 7. ド・モルガンの法則

:::theorem[ド・モルガンの法則]{#thm-de-morgan}
$$
\begin{aligned}
\neg (P \land Q) &\iff \neg P \lor \neg Q \\
\neg (P \lor Q) &\iff \neg P \land \neg Q
\end{aligned}
$$
:::

どちらも、真理値表の 4 行で両辺の真偽が一致することから確かめられる。

## 8. 量化記号

$x$ を含む文 $P(x)$ は、$x$ を決めるまで真偽が定まらない。このような文と量化記号を扱うのは、厳密には命題論理ではなく述語論理である。
$P(x)$ に**量化記号**を付けると命題になる。

- **全称記号**：$\forall x\, P(x)$ は「すべての $x$ について $P(x)$」
- **存在記号**：$\exists x\, P(x)$ は「ある $x$ について $P(x)$」（$P(x)$ を満たす $x$ が少なくとも 1 つある）

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

## 9. 確認問題

:::proposition[確認問題]{#q-exercise}
$x \in A \cup B$ かつ $x \notin A$ ならば、$x \in B$ であることを説明せよ。
:::

:::proof[解答]
$P$ を「$x \in A$」、$Q$ を「$x \in B$」とする。仮定は $P \lor Q$ と $\neg P$、つまり $P \lor Q$ が真で $P$ が偽。
2 節の真理値表で $P$ が偽の行は 3 行目と 4 行目で、そのうち $P \lor Q$ が真なのは $Q$ が真の 3 行目だけ。よって $Q$ が真、すなわち $x \in B$。
:::

$x$ が $A$ と $B$ の両方に属する可能性（真理値表の 1 行目）は、$x \notin A$ という仮定で最初から除かれている。
だからこの推論は、「または」が inclusive か exclusive かに関係なく成り立つ。
