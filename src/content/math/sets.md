---
title: "集合の基本と演算"
description: "集合と要素、外延的記法・内包的記法、部分集合と集合の等号、空集合、和集合・共通部分・差集合・補集合、互いに素な集合、集合に対するド・モルガンの法則、対称差。"
topic: set-theory
order: 1
status: understood
createdAt: 2026-11-09
updatedAt: 2026-11-14
related:
  - propositional-logic
  - implication
tags:
  - set-theory
  - munkres
sources:
  - title: "James R. Munkres, Topology, 2nd ed."
    location: "Chapter 1"
textbook:
  chapter: 1
---

:::remark[このノートの書き方]
Munkres の Chapter 1 で学んだ集合の基本と集合演算を、定義、例、証明の順に整理したものである。
教科書の範囲外の事項には **（補足）** と付ける。
:::

## 1. 集合と要素

$x$ が集合 $A$ に属することを $x \in A$、属さないことを $x \notin A$ と書く。$x$ を $A$ の**要素**（元）という。

### 集合の表記

集合の表し方は 2 通りある。

- **外延的記法**：要素を並べる。$A = \{1, 2, 3\}$
- **内包的記法**：要素が満たす条件を書く。$A = \{\, x \in \mathbb{R} \mid x > 0 \,\}$（正の実数全体）

外延的記法では、並べる順番と重複は関係ない。$\{1, 2, 3\} = \{3, 1, 2\} = \{1, 1, 2, 3\}$ である。

## 2. 部分集合と包含関係

:::definition[部分集合]{#def-subset}
$A$ のどの要素も $B$ の要素であるとき、$A$ を $B$ の**部分集合**といい、$A \subseteq B$ と書く。

$$
A \subseteq B \iff \forall x\, (x \in A \Rightarrow x \in B)
$$
:::

このノートでは $\subseteq$ を使う。本によっては同じ意味で $\subset$ と書く。

$A \subseteq B$ を示すには、任意の $x$ をとり、$x \in A$ を仮定して $x \in B$ を導く。定義が「ならば」の形であるから、示し方は[含意](/math/implication)の示し方と同じである。

### 所属関係と包含関係の違い

$x \in A$ と $B \subseteq A$ は別の関係である。

- $x \in A$：**要素**と集合の関係。$x$ が $A$ の要素の 1 つであること
- $B \subseteq A$：**集合**と集合の関係。$B$ の要素がすべて $A$ の要素であること

:::example[所属と包含]{#ex-member-vs-subset}
$A = \{1, 2, 3\}$ とすると

- $1 \in A$ は正しい。$\{1\} \in A$ は誤り（$\{1\}$ は $A$ の要素ではない）
- $\{1\} \subseteq A$ は正しい。$1 \subseteq A$ は意味をなさない（$1$ は集合として扱っていない）

要素そのものが集合のときは、両方が成り立つこともある。$C = \{1, \{1\}\}$ なら

- $\{1\} \in C$（$\{1\}$ は $C$ の要素）
- $\{1\} \subseteq C$（$\{1\}$ の要素 $1$ は $C$ の要素）
:::

## 3. 集合の等号

:::definition[集合の等号]{#def-set-equality}
$A$ と $B$ がちょうど同じ要素をもつとき $A = B$ と書く。

$$
A = B \iff \forall x\, (x \in A \Leftrightarrow x \in B) \iff (A \subseteq B \land B \subseteq A)
$$
:::

$A = B$ は、$A \subseteq B$ と $B \subseteq A$ の両方を示して証明する（相互包含）。

## 4. 空集合

:::definition[空集合]{#def-empty-set}
要素を 1 つももたない集合を**空集合**といい、$\varnothing$ と書く。
:::

:::proposition[空集合はどの集合にも含まれる]{#prop-empty-subset}
任意の集合 $B$ について $\varnothing \subseteq B$ である。
:::

:::proof{origin=self-reviewed text=ai}
$\varnothing \subseteq B$ は、[部分集合の定義](#def-subset)より「任意の $x$ について、$x \in \varnothing$ ならば $x \in B$」である。
$x \in \varnothing$ はどの $x$ についても偽であるから、この含意は空虚に真である（[空虚な真](/math/implication#ex-vacuous)）。
:::

$\varnothing$ と $\{\varnothing\}$ は異なる。$\varnothing$ は要素をもたないが、$\{\varnothing\}$ は $\varnothing$ という要素を 1 つもつ。

## 5. 和集合・共通部分・差集合

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

$A \setminus B \ne B \setminus A$ であるから、差集合は順番で結果が変わる。
:::

## 6. 補集合と互いに素な集合

補集合は、どの集合の中で考えるかを決めて初めて定まる。

:::definition[補集合]{#def-complement}
集合 $X$ を固定し、$A \subseteq X$ とする。$X$ における $A$ の**補集合**を

$$
A^c = X \setminus A = \{\, x \in X \mid x \notin A \,\}
$$

と定める。$X$ を**全体集合**という。
:::

:::example[全体集合で補集合が変わる]{#ex-complement}
$A = \{1, 2, 3\}$ とする。$X = \{1, 2, 3, 4, 5\}$ なら $A^c = \{4, 5\}$ である。
$X = \{1, 2, 3, 4\}$ なら $A^c = \{4\}$ である。同じ $A$ でも、全体集合を変えると補集合が変わる。
:::

:::definition[互いに素]{#def-disjoint}
$A \cap B = \varnothing$ のとき、$A$ と $B$ は**互いに素**であるという。
:::

$\{1, 2\}$ と $\{3, 4\}$ は互いに素である。[上の例](#ex-set-operations)の $A = \{1, 2, 3\}$ と $B = \{3, 4, 5\}$ は $3$ を共有するので、互いに素ではない。

## 7. ド・モルガンの法則

:::theorem[ド・モルガンの法則]{#thm-de-morgan-sets}
全体集合 $X$ を固定し、$A, B \subseteq X$ とする。補集合は $X$ で考える。

$$
\begin{aligned}
(A \cup B)^c &= A^c \cap B^c \\
(A \cap B)^c &= A^c \cup B^c
\end{aligned}
$$
:::

:::proof{origin=self-reviewed text=ai}
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

2 行目で[命題のド・モルガンの法則](/math/propositional-logic#thm-de-morgan)を使った。両辺とも $X$ の部分集合であるから、$X$ の要素について所属が一致すれば[等しい](#def-set-equality)。
2 つ目も、$\land$ と $\lor$ を入れ替えて同じように示せる。
:::

論理の「かつ」と「または」の入れ替えが、集合の $\cap$ と $\cup$ の入れ替えになっている。

:::example[ド・モルガンの法則の確認]{#ex-de-morgan}
$X = \{1, 2, 3, 4, 5\}$、$A = \{1, 2, 3\}$、$B = \{3, 4, 5\}$ とすると $A^c = \{4, 5\}$、$B^c = \{1, 2\}$ である。

- $(A \cup B)^c = X^c = \varnothing$、$A^c \cap B^c = \varnothing$
- $(A \cap B)^c = \{3\}^c = \{1, 2, 4, 5\}$、$A^c \cup B^c = \{1, 2, 4, 5\}$
:::

（補足）差集合で書くと $X \setminus (A \cup B) = (X \setminus A) \cap (X \setminus B)$ であり、この形なら $A, B \subseteq X$ でなくても成り立つ。

## 8. 対称差（補足）

:::definition[対称差]{#def-symmetric-difference}
$$
A \mathbin{\triangle} B = \{\, x \mid (x \in A) \oplus (x \in B) \,\}
$$

$A, B$ のちょうど一方に属する要素の集合を**対称差**という。
:::

:::example[和集合と対称差]{#ex-or-xor}
$A = \{1, 2, 3\}$、$B = \{3, 4, 5\}$ とすると $A \mathbin{\triangle} B = \{1, 2, 4, 5\}$ である。

$3$ は $A$ にも $B$ にも属する。$3 \in A$ と $3 \in B$ がともに真であり、[真理値表](/math/propositional-logic)の「両方が真」の行にあたる。
そのため $3$ は inclusive or で定義した $A \cup B$ には入るが、exclusive or で定義した $A \mathbin{\triangle} B$ には入らない。
「または」の 2 つの意味の違いが、そのまま和集合と対称差の違いになっている。
:::
