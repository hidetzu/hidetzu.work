---
title: "命題論理の基礎"
description: "Munkres『Topology』Chapter 1 に関連して、証明を読み書きするための命題論理の基本。数学の「または」と排他的な「または」、集合演算との対応、含意と対偶、ド・モルガンの法則。"
topic: logic
status: understood
createdAt: 2026-11-08
tags:
  - logic
  - set-theory
  - munkres
sources:
  - title: "James R. Munkres, Topology, 2nd ed."
    location: "Chapter 1"
---

:::remark[このノートの書き方]
本文で読んで学んだのは、日常英語の or と数学の or の違い（3 節）。
ほかの節は、位相空間論の定義や証明を読み書きするときに参照するために、論理学の基本を補足として整理したもの。見出しに **（補足）** と付けた。
:::

## 1. 命題（補足）

:::definition[命題]{#def-proposition}
真か偽かのどちらか一方に定まる文を**命題**という。
:::

- 「$2$ は偶数である」は真の命題、「$3 < 1$」は偽の命題。
- 「$x > 0$」は $x$ が決まらないと真偽が定まらないので、このままでは命題ではない。$x$ に値を入れるか、「すべての $x$ について」「ある $x$ について」を付けると命題になる。

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

真理値表で書くと次のとおり。

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

## 4. 集合演算との対応（補足）

集合の演算は、「$x$ が属する」という命題の論理演算で定義できる。

$$
\begin{aligned}
A \cup B &= \{\, x \mid x \in A \lor x \in B \,\} \\
A \cap B &= \{\, x \mid x \in A \land x \in B \,\} \\
A \setminus B &= \{\, x \mid x \in A \land x \notin B \,\} \\
A \mathbin{\triangle} B &= \{\, x \mid (x \in A) \oplus (x \in B) \,\}
\end{aligned}
$$

$A \mathbin{\triangle} B$ を**対称差**という。

:::example[具体例]{#ex-set-operations}
$A = \{1, 2, 3\}$、$B = \{3, 4, 5\}$ とすると

$$
\begin{aligned}
A \cup B &= \{1, 2, 3, 4, 5\} \\
A \cap B &= \{3\} \\
A \setminus B &= \{1, 2\} \\
A \mathbin{\triangle} B &= \{1, 2, 4, 5\}
\end{aligned}
$$
:::

$3$ は $A$ にも $B$ にも属する。つまり $3 \in A$ と $3 \in B$ がともに真で、真理値表の 1 行目にあたる。
そのため $3$ は inclusive or で定義した $A \cup B$ には入るが、exclusive or で定義した $A \mathbin{\triangle} B$ には入らない。
3 節の違いが、そのまま和集合と対称差の違いになっている。

## 5. 証明で使う論理（補足）

### 含意とその否定

$P \Rightarrow Q$ が偽になるのは、$P$ が真で $Q$ が偽のときだけ。だから $P$ が偽なら、$Q$ に関係なく $P \Rightarrow Q$ は真になる（**空虚な真**）。

$$
\neg (P \Rightarrow Q) \iff P \land \neg Q
$$

「$P$ ならば $Q$」が成り立たないことを示すには、「$P$ なのに $Q$ でない」例を 1 つ挙げればよい。

### 対偶

$$
(P \Rightarrow Q) \iff (\neg Q \Rightarrow \neg P)
$$

$\neg Q \Rightarrow \neg P$ を $P \Rightarrow Q$ の**対偶**という。真理値表で両辺が一致するので、$P \Rightarrow Q$ の代わりに対偶を示してもよい。
一方、**逆** $Q \Rightarrow P$ は $P \Rightarrow Q$ と同値ではない（$P$ が偽で $Q$ が真のとき、$P \Rightarrow Q$ は真だが $Q \Rightarrow P$ は偽）。

### 必要条件と十分条件

$P \Rightarrow Q$ が成り立つとき、$P$ は $Q$ であるための**十分条件**、$Q$ は $P$ であるための**必要条件**という。

### 同値の証明

$$
(P \Leftrightarrow Q) \iff (P \Rightarrow Q) \land (Q \Rightarrow P)
$$

なので、同値を示すには両方向の含意を示す。

### ド・モルガンの法則

$$
\begin{aligned}
\neg (P \land Q) &\iff \neg P \lor \neg Q \\
\neg (P \lor Q) &\iff \neg P \land \neg Q
\end{aligned}
$$

量化子についても、否定は「すべて」と「ある」を入れ替える。

$$
\begin{aligned}
\neg\, \forall x\, P(x) &\iff \exists x\, \neg P(x) \\
\neg\, \exists x\, P(x) &\iff \forall x\, \neg P(x)
\end{aligned}
$$

集合では、たとえば

$$
\begin{aligned}
x \notin \bigcup_{\lambda \in \Lambda} U_\lambda
&\iff \neg\, \exists \lambda\, (x \in U_\lambda) \\
&\iff \forall \lambda\, (x \notin U_\lambda)
\end{aligned}
$$

から $X \setminus \bigcup_{\lambda} U_\lambda = \bigcap_{\lambda} (X \setminus U_\lambda)$ が出る。
[§12 の有限補集合位相の証明](/math/topological-spaces#prop-finite-complement)で使ったのはこの形。

### 集合の包含関係

$$
A \subseteq B \iff \forall x\, (x \in A \Rightarrow x \in B)
$$

集合の証明は、この形を通して論理の証明になる。

- $A \subseteq B$ を示すには、任意の $x$ を取り、$x \in A$ を仮定して $x \in B$ を導く。
- $A = B$ は $A \subseteq B$ かつ $B \subseteq A$ なので、同値の証明と同じく両方向を示す（相互包含）。
  [§13 のノート](/math/basis#thm-rational-generates)で、通常の位相と有理数端点の開区間が生成する位相の一致を示したのはこの形。
- $x \in \varnothing$ は常に偽なので、空虚な真により任意の $B$ について $\varnothing \subseteq B$。
  §13 で $\varnothing$ が生成される位相に属すると言えた「条件が空虚に成り立つ」も同じ理由。

## 6. 確認問題

:::proposition[確認問題]{#q-exercise}
$x \in A \cup B$ かつ $x \notin A$ ならば、$x \in B$ であることを説明せよ。
:::

:::proof[解答]
$P$ を「$x \in A$」、$Q$ を「$x \in B$」とする。仮定は $P \lor Q$ と $\neg P$、つまり $P \lor Q$ が真で $P$ が偽。
3 節の真理値表で $P$ が偽の行は 3 行目と 4 行目で、そのうち $P \lor Q$ が真なのは $Q$ が真の 3 行目だけ。よって $Q$ が真、すなわち $x \in B$。
:::

$x$ が $A$ と $B$ の両方に属する可能性（真理値表の 1 行目）は、$x \notin A$ という仮定で最初から除かれている。
だからこの推論は、「または」が inclusive か exclusive かに関係なく成り立つ。
