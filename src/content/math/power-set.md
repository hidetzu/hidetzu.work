---
title: "冪集合"
description: "部分集合全体の集合。有限集合の例、空集合と全体が必ず含まれること、n 個の要素を持つ集合の冪集合が 2^n 個の要素を持つこと。"
topic: set-theory
order: 3
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
textbook:
  chapter: 1
---

:::remark[このノートの書き方]
Munkres の Chapter 1 を読みながら学んでいる冪集合を、定義と例で整理したもの。
要素の個数 $2^n$ の説明と証明、組み合わせとの関係はレビューの段階で補ったもので、**（補足）** と付けた。
:::

## 1. 定義

:::definition[冪集合]{#def-power-set}
集合 $A$ の部分集合全体の集合を $A$ の**冪集合**といい、$\mathcal{P}(A)$ と書く。

$$
\mathcal{P}(A) = \{\, B \mid B \subseteq A \,\}
$$
:::

定義から $B \in \mathcal{P}(A) \iff B \subseteq A$。左は**所属**、右は**包含**で、冪集合はこの 2 つを結び付ける（[所属と包含の違い](/math/sets#ex-member-vs-subset)）。

## 2. 有限集合の例

:::example[冪集合の例]{#ex-power-set}
$$
\begin{aligned}
\mathcal{P}(\{1, 2\}) &= \{\, \varnothing,\ \{1\},\ \{2\},\ \{1, 2\} \,\} \\
\mathcal{P}(\{1, 2, 3\}) &= \{\, \varnothing,\ \{1\},\ \{2\},\ \{3\},\ \{1, 2\},\ \{1, 3\},\ \{2, 3\},\ \{1, 2, 3\} \,\}
\end{aligned}
$$
:::

- 空集合はどの集合にも含まれる（[集合の基本と演算](/math/sets#prop-empty-subset)）ので、$\varnothing \in \mathcal{P}(A)$ がいつも成り立つ。
- $A \subseteq A$ なので、$A \in \mathcal{P}(A)$ もいつも成り立つ。
- $\mathcal{P}(\varnothing) = \{\varnothing\}$。空集合の部分集合は $\varnothing$ だけなので、冪集合は要素を 1 つ持つ。$\mathcal{P}(\varnothing)$ 自体は空集合ではない。

## 3. 要素の個数（補足）

有限集合 $A$ の要素の個数を $|A|$ と書く。

:::proposition[冪集合の要素の個数]{#prop-power-set-size}
$|A| = n$ ならば $|\mathcal{P}(A)| = 2^n$。
:::

直感的には、部分集合を 1 つ作ることは、$A$ の $n$ 個の要素それぞれについて「入れる」か「入れない」かを選ぶことにあたる。
選び方は $2 \times 2 \times \cdots \times 2 = 2^n$ 通りある。

:::proof[補足]{origin=ai}
$n$ についての帰納法で示す。

$n = 0$ のとき $A = \varnothing$ で、$\mathcal{P}(\varnothing) = \{\varnothing\}$ なので $|\mathcal{P}(A)| = 1 = 2^0$。

$n$ 個の要素を持つ集合で成り立つとし、$|A'| = n + 1$ とする。$A'$ の要素 $a$ を 1 つ選び、$A = A' \setminus \{a\}$ とおくと $|A| = n$。
$A'$ の部分集合は、$a$ を含まないものと含むものに分かれる。

- $a$ を含まない部分集合は、ちょうど $A$ の部分集合で、帰納法の仮定より $2^n$ 個。
- $a$ を含む部分集合は、$A$ の部分集合 $B$ に $a$ を加えた $B \cup \{a\}$ の形にちょうど 1 通りに書けるので、これも $2^n$ 個。

合わせて $2^n + 2^n = 2^{n+1}$ 個。
:::

例 2 では $|\{1, 2\}| = 2$ で $2^2 = 4$ 個、$|\{1, 2, 3\}| = 3$ で $2^3 = 8$ 個になっている。

## 4. 組み合わせとの関係（補足）

$n$ 個の要素を持つ集合の部分集合を要素の個数 $k$ で分けると、$k$ 個の要素を持つ部分集合は $\binom{n}{k}$ 個ある。
すべての $k$ について足すと冪集合の要素の個数になるので

$$
\sum_{k=0}^{n} \binom{n}{k} = 2^n .
$$

例 2 の $\mathcal{P}(\{1, 2, 3\})$ では、要素の個数が $0, 1, 2, 3$ の部分集合がそれぞれ $1, 3, 3, 1$ 個で、合計 $8 = 2^3$。
この等式は、二項定理 $(x + y)^n = \sum_{k=0}^{n} \binom{n}{k} x^k y^{n-k}$ に $x = y = 1$ を入れた形でもある。

組み合わせと二項定理はまだノートにしていない。組み合わせ論のノートを書いたら、ここからリンクする。

## 5. 集合族との関係

$\mathcal{P}(A)$ は、集合を要素とする集合（[集合族](/math/families-of-sets)）の代表的な例。
$X$ 上の位相 $\mathcal{T}$ は $\mathcal{T} \subseteq \mathcal{P}(X)$ を満たす集合族で、離散位相は $\mathcal{P}(X)$ そのもの（[§12 のノート](/math/topological-spaces#def-topology)）。
