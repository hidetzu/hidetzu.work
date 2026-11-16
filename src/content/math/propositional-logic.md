---
title: "論理の基礎"
description: "命題と真理値、論理演算と真理値表、数学の「または」、含意と空虚な真、含意と論理和、含意の否定、対偶と逆、必要条件・十分条件、同値、ド・モルガンの法則、主な論理的同値の一覧、述語論理と量化記号（否定、作用範囲、論理積・論理和との関係）。"
topic: logic
order: 1
status: understood
createdAt: 2026-11-08
updatedAt: 2026-11-17
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
- 「$x > 0$」は $x$ が決まらないと真偽が定まらないので、このままでは命題ではない。$x$ に値を入れるか、量化記号（9 節）を付けると命題になる。

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

### 論理和による書き換え

:::theorem[含意と論理和]{#thm-implication-or}
$$
(P \Rightarrow Q) \iff \neg P \lor Q
$$
:::

| $P$ | $Q$ | $\neg P$ | $P \Rightarrow Q$ | $\neg P \lor Q$ |
| --- | --- | --- | --- | --- |
| T | T | F | T | T |
| T | F | F | **F** | **F** |
| F | T | T | T | T |
| F | F | T | T | T |

4 行すべてで $P \Rightarrow Q$ と $\neg P \lor Q$ の真偽が一致するので、両者は同値である。

### 空虚な真

$P$ が偽なら、$Q$ に関係なく $P \Rightarrow Q$ は真になる。これを**空虚な真**という。

$P \Rightarrow Q$ は「$P$ が成り立つときは、必ず $Q$ も成り立つ」という主張で、$P$ が成り立たないときについては何も主張していない。
この主張に反するのは「$P$ が真で $Q$ が偽」の場合だけなので、$P$ が偽なら主張に反する場合は起こらず、偽にはならない。
$\neg P \lor Q$ の形で見ても、$P$ が偽なら $\neg P$ が真なので、$Q$ に関係なく真である。

:::example[空虚な真]{#ex-vacuous}
空集合はどの集合にも含まれる。
$x \in \varnothing$ はどの $x$ についても偽なので、「$x \in \varnothing$ ならば $x \in B$」は空虚に真になる。
:::

### 含意の否定

:::theorem[含意の否定]{#thm-implication-negation}
$$
\neg (P \Rightarrow Q) \iff P \land \neg Q
$$
:::

:::proof[記号による変形]{origin=ai}
$$
\begin{aligned}
\neg (P \Rightarrow Q) &\iff \neg (\neg P \lor Q) \\
&\iff \neg \neg P \land \neg Q \\
&\iff P \land \neg Q
\end{aligned}
$$

1 行目は[含意と論理和](#thm-implication-or)、2 行目は[ド・モルガンの法則](#thm-de-morgan)、3 行目は二重否定 $\neg \neg P \iff P$ による。
:::

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

:::proof[記号による変形]{origin=ai}
$$
\begin{aligned}
(P \Rightarrow Q) &\iff \neg P \lor Q \\
&\iff Q \lor \neg P \\
&\iff \neg (\neg Q) \lor \neg P \\
&\iff (\neg Q \Rightarrow \neg P)
\end{aligned}
$$

1 行目は[含意と論理和](#thm-implication-or)、2 行目は $\lor$ の交換法則、3 行目は二重否定、4 行目は[含意と論理和](#thm-implication-or)を $\neg Q$ と $\neg P$ に使ったものである。
:::
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

## 8. 主な論理的同値

証明の中で式を変形するときに使う同値の一覧。どれも、真理値表で両辺の真偽がすべての行で一致することから確かめられる。

| 名前 | 同値 |
| --- | --- |
| 二重否定 | $\neg \neg P \iff P$ |
| 交換法則 | $P \land Q \iff Q \land P$、$P \lor Q \iff Q \lor P$ |
| 結合法則 | $(P \land Q) \land R \iff P \land (Q \land R)$、$(P \lor Q) \lor R \iff P \lor (Q \lor R)$ |
| 分配法則 | $P \land (Q \lor R) \iff (P \land Q) \lor (P \land R)$、$P \lor (Q \land R) \iff (P \lor Q) \land (P \lor R)$ |
| [ド・モルガンの法則](#thm-de-morgan) | $\neg (P \land Q) \iff \neg P \lor \neg Q$、$\neg (P \lor Q) \iff \neg P \land \neg Q$ |
| [含意と論理和](#thm-implication-or) | $(P \Rightarrow Q) \iff \neg P \lor Q$ |
| [含意の否定](#thm-implication-negation) | $\neg (P \Rightarrow Q) \iff P \land \neg Q$ |
| [対偶](#thm-contrapositive) | $(P \Rightarrow Q) \iff (\neg Q \Rightarrow \neg P)$ |
| 同値と含意 | $(P \Leftrightarrow Q) \iff (P \Rightarrow Q) \land (Q \Rightarrow P)$ |

逆 $Q \Rightarrow P$ は $P \Rightarrow Q$ と同値ではない（4 節）。

## 9. 述語論理と量化記号

### 命題論理と述語論理

1〜8 節で扱ったのは**命題論理**である。命題論理では、$P, Q$ を真偽の定まった 1 つの単位として扱い、それらを $\neg, \land, \lor, \Rightarrow, \Leftrightarrow$ で組み合わせたときの真偽だけを考える。

これに対し「$x > 0$」のように変数 $x$ を含み、$x$ を決めると真偽が定まる文 $P(x)$ を**述語**という。述語と量化記号を扱うのが**述語論理**である。
$x$ を 1 つ固定すれば $P(x)$ は命題なので、8 節の同値は $P(x), Q(x)$ にもそのまま使える。

### 量化記号

$P(x)$ に**量化記号**を付けると命題になる。以下、$x$ の動く範囲を集合 $X$ とする（$\forall x \in X$ を $\forall x$ と略す）。

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

### 作用範囲

量化記号がかかる範囲を**作用範囲**という。括弧で範囲を区切る。

- $\forall x\, (P(x) \land Q(x))$ では、$\forall x$ が $P(x) \land Q(x)$ 全体にかかる。各 $x$ について、同じ $x$ で $P(x)$ と $Q(x)$ の両方が成り立つ。
- $(\forall x\, P(x)) \land (\forall x\, Q(x))$ では、2 つの $\forall x$ がそれぞれ $P(x)$、$Q(x)$ だけにかかる。

量化記号で束ねられた変数は、作用範囲の中だけで意味をもつ。$(\exists x\, P(x)) \land (\exists x\, Q(x))$ の 2 つの $x$ は別の変数で、$(\exists x\, P(x)) \land (\exists y\, Q(y))$ と書いても意味は変わらない。
このため、それぞれの $\exists$ で選ばれる要素は同じとは限らない。

### 量化記号と論理積・論理和

| 量化記号 | 論理演算 | 関係 |
| --- | --- | --- |
| $\forall$ | $\land$ | 同値：$\forall x\, (P(x) \land Q(x)) \iff \forall x\, P(x) \land \forall x\, Q(x)$ |
| $\forall$ | $\lor$ | 一方向だけ：$\forall x\, P(x) \lor \forall x\, Q(x) \Rightarrow \forall x\, (P(x) \lor Q(x))$ |
| $\exists$ | $\lor$ | 同値：$\exists x\, (P(x) \lor Q(x)) \iff \exists x\, P(x) \lor \exists x\, Q(x)$ |
| $\exists$ | $\land$ | 一方向だけ：$\exists x\, (P(x) \land Q(x)) \Rightarrow \exists x\, P(x) \land \exists x\, Q(x)$ |

:::theorem[全称記号と論理積]{#thm-forall-and}
$$
\forall x\, (P(x) \land Q(x)) \iff \forall x\, P(x) \land \forall x\, Q(x)
$$
:::

:::proof{origin=ai}
（⇒）任意の $x$ をとる。仮定より $P(x) \land Q(x)$ なので $P(x)$ が成り立つ。$x$ は任意なので $\forall x\, P(x)$。同様に $\forall x\, Q(x)$。

（⇐）任意の $x$ をとる。$\forall x\, P(x)$ より $P(x)$、$\forall x\, Q(x)$ より $Q(x)$ なので、$P(x) \land Q(x)$。$x$ は任意なので $\forall x\, (P(x) \land Q(x))$。
:::

:::proposition[全称記号と論理和]{#prop-forall-or}
$$
\forall x\, P(x) \lor \forall x\, Q(x) \Rightarrow \forall x\, (P(x) \lor Q(x))
$$

逆は成り立たない。
:::

:::proof{origin=ai}
$\forall x\, P(x)$ のとき、任意の $x$ で $P(x)$ なので $P(x) \lor Q(x)$。$\forall x\, Q(x)$ のときも同様。よって $\forall x\, (P(x) \lor Q(x))$。
:::

:::example[逆が成り立たない例]{#ex-forall-or}
$X = \{1, 2\}$、$P(x)$ を「$x = 1$」、$Q(x)$ を「$x = 2$」とする。

- $x = 1$ では $P(1)$、$x = 2$ では $Q(2)$ が成り立つので、$\forall x\, (P(x) \lor Q(x))$ は真。
- $P(2)$ は偽なので $\forall x\, P(x)$ は偽、$Q(1)$ は偽なので $\forall x\, Q(x)$ は偽。よって $\forall x\, P(x) \lor \forall x\, Q(x)$ は偽。

各 $x$ が $P$ か $Q$ のどちらかを満たしていても、満たすほうが $x$ ごとに違えば、どちらか一方がすべての $x$ で成り立つとは限らない。
:::

:::theorem[存在記号と論理和]{#thm-exists-or}
$$
\exists x\, (P(x) \lor Q(x)) \iff \exists x\, P(x) \lor \exists x\, Q(x)
$$
:::

:::proof{origin=ai}
（⇒）$P(x_0) \lor Q(x_0)$ を満たす $x_0$ をとる。$P(x_0)$ なら $\exists x\, P(x)$、そうでなければ $Q(x_0)$ なので $\exists x\, Q(x)$。

（⇐）$\exists x\, P(x)$ なら、$P(x_0)$ を満たす $x_0$ について $P(x_0) \lor Q(x_0)$ なので $\exists x\, (P(x) \lor Q(x))$。$\exists x\, Q(x)$ のときも同様。
:::

:::proposition[存在記号と論理積]{#prop-exists-and}
$$
\exists x\, (P(x) \land Q(x)) \Rightarrow \exists x\, P(x) \land \exists x\, Q(x)
$$

逆は成り立たない。
:::

:::proof{origin=ai}
$P(x_0) \land Q(x_0)$ を満たす $x_0$ をとると、$P(x_0)$ より $\exists x\, P(x)$、$Q(x_0)$ より $\exists x\, Q(x)$。
:::

:::example[逆が成り立たない例]{#ex-exists-and}
定義域を $\mathbb{R}$ とし、$P(x)$ を「$x = 1$」、$Q(x)$ を「$x = 2$」とする。

$P(1)$ および $Q(2)$ は真であるため、

$$
(\exists x\, P(x)) \land (\exists x\, Q(x))
$$

は真である。一方、

$$
P(x) \land Q(x) \iff (x = 1) \land (x = 2)
$$

であるが、$1 \ne 2$ なので、これを満たす $x \in \mathbb{R}$ は存在しない。したがって、

$$
\exists x\, (P(x) \land Q(x))
$$

は偽である。よって、逆向きの含意は一般には成立しない。
:::

:::remark[存在記号と論理積が分配できない理由（自分の説明）]
異なる要素 $x_1, x_2$ がそれぞれ $P(x_1)$、$Q(x_2)$ を満たしても、$P$ と $Q$ を同時に満たす共通の要素が存在するとは限らない。
:::

$\forall$ と $\lor$、$\exists$ と $\land$ の 2 つの一方向の関係は、[量化記号の否定](#thm-quantifier-negation)と[ド・モルガンの法則](#thm-de-morgan)で互いに移り合う。
たとえば $\forall$ と $\lor$ の関係を $\neg P, \neg Q$ に使い、対偶をとって否定を内側に入れると、$\exists$ と $\land$ の関係になる。

## 10. 確認問題

:::proposition[確認問題]{#q-exercise}
$x \in A \cup B$ かつ $x \notin A$ ならば、$x \in B$ であることを説明せよ。
:::

:::proof[解答]
$P$ を「$x \in A$」、$Q$ を「$x \in B$」とする。仮定は $P \lor Q$ と $\neg P$、つまり $P \lor Q$ が真で $P$ が偽。
2 節の真理値表で $P$ が偽の行は 3 行目と 4 行目で、そのうち $P \lor Q$ が真なのは $Q$ が真の 3 行目だけ。よって $Q$ が真、すなわち $x \in B$。
:::

$x$ が $A$ と $B$ の両方に属する可能性（真理値表の 1 行目）は、$x \notin A$ という仮定で最初から除かれている。
だからこの推論は、「または」が inclusive か exclusive かに関係なく成り立つ。
