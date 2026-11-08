---
title: "直積"
description: "順序対と 2 つの集合の直積。順番に意味があること、A × B と B × A が一般には等しくないこと、有限集合の直積の要素の個数。"
topic: set-theory
order: 5
status: studying
createdAt: 2026-11-09
related:
  - sets
  - power-set
tags:
  - set-theory
  - munkres
sources:
  - title: "James R. Munkres, Topology, 2nd ed."
    location: "Chapter 1"
---

:::remark[このノートの書き方]
Munkres の Chapter 1（p.12〜13）で学んだ直積の定義と例を整理したもの。
順序対の等しさの条件の書き方と、要素の個数の説明はレビューの段階で補ったもので、**（補足）** と付けた。
:::

学習状況：

- 直積の定義：確認済み
- 2 節の例：手書きで答え、レビュー済み

## 1. 順序対と直積

集合では要素の順番は関係ない（$\{1, 2\} = \{2, 1\}$、[集合と包含関係](/math/sets)）。
直積の要素は、順番に意味のある組である**順序対** $(a, b)$。

（補足）順序対は、次の性質で特徴づけられる。

$$
(a, b) = (c, d) \iff a = c \land b = d
$$

たとえば $(1, 2) \ne (2, 1)$。1 番目と 2 番目の成分を入れ替えると、別の順序対になる。

:::definition[直積]{#def-cartesian-product}
集合 $A, B$ に対して

$$
A \times B = \{\, (a, b) \mid a \in A,\ b \in B \,\}
$$

を $A$ と $B$ の**直積**という。
:::

1 番目の成分は $A$ から、2 番目の成分は $B$ から取る。

## 2. 例：A × B と B × A

:::example[A × B と B × A]{#ex-product-order}
$A = \{1, 2\}$、$B = \{a, b, c\}$ とする（$a, b, c$ は $1, 2$ と異なる文字）。

$$
\begin{aligned}
A \times B = \{\, &(1, a), (1, b), (1, c), \\
&(2, a), (2, b), (2, c) \,\}
\end{aligned}
$$

$$
\begin{aligned}
B \times A = \{\, &(a, 1), (a, 2), \\
&(b, 1), (b, 2), \\
&(c, 1), (c, 2) \,\}
\end{aligned}
$$

たとえば $(1, a) \in A \times B$ だが、$(1, a) \notin B \times A$。$B \times A$ の要素は 1 番目の成分が $B$ の要素で、$1 \notin B$ だから。
よってこの例では

$$
A \times B \ne B \times A .
$$
:::

これは「一般に $A \times B \ne B \times A$」という意味ではない。たとえば $A = B$ なら、両者は同じ集合になる。
（補足）$A$ か $B$ が空集合のときも、$A \times B = B \times A = \varnothing$ で等しい。

## 3. 要素の個数（補足）

$A, B$ が有限集合なら

$$
|A \times B| = |A| \cdot |B| .
$$

1 番目の成分 $a \in A$ を 1 つ決めるごとに、2 番目の成分の選び方が $|B|$ 通りあるから。
2 節の例では $2 \times 3 = 6$ 個。

[冪集合の要素の個数](/math/power-set#prop-power-set-size) $2^n$ と同じく、「選び方を掛け合わせる」数え方になっている。
