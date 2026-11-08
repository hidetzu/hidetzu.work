---
title: "集合演算とド・モルガンの法則"
description: "和集合・共通部分・差集合・補集合と論理演算の対応、互いに素な集合、対称差、集合に対するド・モルガンの法則。"
topic: set-theory
order: 2
status: studying
createdAt: 2026-11-09
related:
  - families-of-sets
tags:
  - set-theory
  - munkres
sources:
  - title: "James R. Munkres, Topology, 2nd ed."
    location: "Chapter 1"
---

:::remark[このノートの書き方]
Munkres の Chapter 1 を読みながら学んでいる集合演算を、定義と例で整理したもの。
対称差と、ド・モルガンの法則の証明はレビューの段階で補ったもので、**（補足）** と付けた。
:::

## 1. 和集合・共通部分・差集合

集合の演算は、「$x$ が属する」という命題の論理演算（[命題論理の基礎](/math/propositional-logic)）で定義される。

:::definition[和集合・共通部分・差集合]{#def-set-operations}
$$
\begin{aligned}
A \cup B &= \{\, x \mid x \in A \lor x \in B \,\} \\
A \cap B &= \{\, x \mid x \in A \land x \in B \,\} \\
A \setminus B &= \{\, x \mid x \in A \land x \notin B \,\}
\end{aligned}
$$

それぞれ**和集合**、**共通部分**、**差集合**という。
:::

差集合は $A - B$ と書く本もある。

:::example[具体例]{#ex-set-operations}
$A = \{1, 2, 3\}$、$B = \{3, 4, 5\}$ とすると

$$
\begin{aligned}
A \cup B &= \{1, 2, 3, 4, 5\} \\
A \cap B &= \{3\} \\
A \setminus B &= \{1, 2\} \\
B \setminus A &= \{4, 5\}
\end{aligned}
$$

$A \setminus B \ne B \setminus A$ なので、差集合は順番で結果が変わる。
:::

## 2. 互いに素な集合

:::definition[互いに素]{#def-disjoint}
$A \cap B = \varnothing$ のとき、$A$ と $B$ は**互いに素**であるという。
:::

$\{1, 2\}$ と $\{3, 4\}$ は互いに素。上の例の $A = \{1, 2, 3\}$ と $B = \{3, 4, 5\}$ は $3$ を共有するので互いに素ではない。

## 3. 補集合

補集合は、どの集合の中で考えるかを決めて初めて定まる。

:::definition[補集合]{#def-complement}
集合 $X$ を固定し、$A \subseteq X$ とする。$X$ における $A$ の**補集合**を

$$
A^c = X \setminus A = \{\, x \in X \mid x \notin A \,\}
$$

と定める。$X$ を**全体集合**という。
:::

:::example[全体集合で補集合が変わる]{#ex-complement}
$A = \{1, 2, 3\}$ とする。$X = \{1, 2, 3, 4, 5\}$ なら $A^c = \{4, 5\}$。
$X = \{1, 2, 3, 4\}$ なら $A^c = \{4\}$。同じ $A$ でも、全体集合を変えると補集合が変わる。
:::

位相空間論では、空間 $X$ を全体集合として補集合 $X \setminus U$ を考える（[§12 の有限補集合位相](/math/topological-spaces#def-finite-complement)）。

## 4. 対称差（補足）

:::definition[対称差]{#def-symmetric-difference}
$$
A \mathbin{\triangle} B = \{\, x \mid (x \in A) \oplus (x \in B) \,\}
$$

$A, B$ のちょうど一方に属する要素の集合を**対称差**という。
:::

:::example[和集合と対称差]{#ex-or-xor}
$A = \{1, 2, 3\}$、$B = \{3, 4, 5\}$ とすると $A \mathbin{\triangle} B = \{1, 2, 4, 5\}$。

$3$ は $A$ にも $B$ にも属する。$3 \in A$ と $3 \in B$ がともに真で、[真理値表](/math/propositional-logic)の「両方が真」の行にあたる。
そのため $3$ は inclusive or で定義した $A \cup B$ には入るが、exclusive or で定義した $A \mathbin{\triangle} B$ には入らない。
「または」の 2 つの意味の違いが、そのまま和集合と対称差の違いになっている。
:::

## 5. ド・モルガンの法則

:::theorem[ド・モルガンの法則]{#thm-de-morgan-sets}
全体集合 $X$ を固定し、$A, B \subseteq X$ とする。補集合は $X$ で考える。

$$
\begin{aligned}
(A \cup B)^c &= A^c \cap B^c \\
(A \cap B)^c &= A^c \cup B^c
\end{aligned}
$$
:::

:::proof[補足]
1 つ目を所属条件で示す。$x \in X$ について

$$
\begin{aligned}
x \in (A \cup B)^c
&\iff \neg (x \in A \lor x \in B) \\
&\iff x \notin A \land x \notin B \\
&\iff x \in A^c \land x \in B^c \\
&\iff x \in A^c \cap B^c .
\end{aligned}
$$

2 行目で[命題のド・モルガンの法則](/math/propositional-logic#thm-de-morgan)を使った。両辺とも $X$ の部分集合なので、$X$ の要素について所属が一致すれば等しい。
2 つ目も、$\land$ と $\lor$ を入れ替えて同じように示せる。
:::

論理の「かつ」と「または」の入れ替えが、集合の $\cap$ と $\cup$ の入れ替えになっている。

:::example[ド・モルガンの法則の確認]{#ex-de-morgan}
$X = \{1, 2, 3, 4, 5\}$、$A = \{1, 2, 3\}$、$B = \{3, 4, 5\}$ とすると $A^c = \{4, 5\}$、$B^c = \{1, 2\}$。

- $(A \cup B)^c = X^c = \varnothing$、$A^c \cap B^c = \varnothing$
- $(A \cap B)^c = \{3\}^c = \{1, 2, 4, 5\}$、$A^c \cup B^c = \{1, 2, 4, 5\}$
:::

（補足）差集合で書くと $X \setminus (A \cup B) = (X \setminus A) \cap (X \setminus B)$ で、この形なら $A, B \subseteq X$ でなくても成り立つ。
任意個の集合についての形は [集合族](/math/families-of-sets#thm-de-morgan-families) にある。
