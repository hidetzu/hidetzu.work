---
title: "集合族"
description: "集合を要素とする集合と、添字付けられた集合族。要素と部分集合の区別、集合族の和集合・共通部分、集合族に対するド・モルガンの法則。"
topic: set-theory
order: 4
status: studying
createdAt: 2026-11-09
related:
  - topological-spaces
tags:
  - set-theory
  - munkres
sources:
  - title: "James R. Munkres, Topology, 2nd ed."
    location: "Chapter 1"
---

:::remark[このノートの書き方]
Munkres の Chapter 1 で集合族に入ったところ（学習中）。定義と例を整理した。
空な集合族の扱いと、ド・モルガンの法則の証明はレビューの段階で補ったもので、**（補足）** と付けた。
:::

## 1. 集合族

:::definition[集合族]{#def-family}
集合を要素とする集合を**集合族**（集合の族）という。
:::

集合族は $\mathcal{A}, \mathcal{B}$ のような筆記体の文字で書くことが多い。

:::example[集合族の例]{#ex-family}
- $\mathcal{A} = \{\, \{1, 2\},\ \{2, 3\},\ \{3\} \,\}$
- 冪集合 $\mathcal{P}(A)$（[冪集合](/math/power-set)）
- $X$ 上の位相 $\mathcal{T}$（[§12 のノート](/math/topological-spaces#def-topology)）
:::

## 2. 要素と部分集合の区別

集合族では、「集合族の要素」と「集合族の部分集合」を取り違えやすい。

:::example[要素と部分集合]{#ex-element-vs-subset}
$A = \{1, 2\}$、$\mathcal{P}(A) = \{\, \varnothing, \{1\}, \{2\}, \{1, 2\} \,\}$ とする。

| 式 | 正誤 | 理由 |
| --- | --- | --- |
| $1 \in A$ | 正 | $1$ は $A$ の要素 |
| $1 \in \mathcal{P}(A)$ | 誤 | $\mathcal{P}(A)$ の要素は集合で、$1$ はその中にない |
| $\{1\} \in \mathcal{P}(A)$ | 正 | $\{1\} \subseteq A$ |
| $\{1\} \subseteq A$ | 正 | $\{1\}$ の要素 $1$ は $A$ の要素 |
| $\{\{1\}\} \subseteq \mathcal{P}(A)$ | 正 | $\{\{1\}\}$ の要素 $\{1\}$ は $\mathcal{P}(A)$ の要素 |
| $\varnothing \in \mathcal{P}(A)$ | 正 | $\varnothing \subseteq A$ |
| $\varnothing \subseteq \mathcal{P}(A)$ | 正 | 空集合はどの集合にも含まれる |

:::

集合族 $\mathcal{A}$ について、$\mathcal{A}$ の**要素**は 1 つの集合で、$\mathcal{A}$ の**部分集合**はいくつかの集合を集めた集合族になる。
§12 の位相の定義で「$\mathcal{T}$ の部分族 $\{U_\lambda\} \subseteq \mathcal{T}$ の和集合」と書いたのは、後者の意味。

## 3. 添字付けられた集合族

集合 $J$ の各要素 $\alpha$ に集合 $A_\alpha$ を 1 つずつ対応させたものを**添字付けられた集合族**といい、$\{A_\alpha\}_{\alpha \in J}$ と書く。$J$ を**添字集合**という。

:::example[添字付けられた集合族]{#ex-indexed-family}
$J = \{1, 2, 3, \dots\}$、$A_n = \left( -\dfrac{1}{n}, \dfrac{1}{n} \right)$ とすると、$\{A_n\}_{n \in J}$ は実数の開区間の族（[§13 のノートの例](/math/basis#ex-infinite-intersection)）。
:::

1 節の集合族と違い、異なる添字 $\alpha \ne \beta$ に同じ集合 $A_\alpha = A_\beta$ が対応してもよい。

## 4. 集合族の和集合と共通部分

:::definition[集合族の和集合・共通部分]{#def-family-union}
集合族 $\mathcal{A}$ について

$$
\begin{aligned}
\bigcup_{A \in \mathcal{A}} A &= \{\, x \mid \exists A \in \mathcal{A}:\ x \in A \,\} \\
\bigcap_{A \in \mathcal{A}} A &= \{\, x \mid \forall A \in \mathcal{A}:\ x \in A \,\} \quad (\mathcal{A} \ne \varnothing)
\end{aligned}
$$

添字付けられた集合族 $\{A_\alpha\}_{\alpha \in J}$ についても、同じように

$$
\begin{aligned}
\bigcup_{\alpha \in J} A_\alpha &= \{\, x \mid \exists \alpha \in J:\ x \in A_\alpha \,\} \\
\bigcap_{\alpha \in J} A_\alpha &= \{\, x \mid \forall \alpha \in J:\ x \in A_\alpha \,\} \quad (J \ne \varnothing)
\end{aligned}
$$
:::

和集合は「少なくとも 1 つに属する」で $\exists$、共通部分は「すべてに属する」で $\forall$（[量化記号](/math/propositional-logic#thm-de-morgan)）。
2 つの集合の $A \cup B$、$A \cap B$ は、$\mathcal{A} = \{A, B\}$ の場合にあたる。

:::example[集合族の和集合・共通部分]{#ex-family-union}
- $\mathcal{A} = \{\, \{1, 2\}, \{2, 3\}, \{3\} \,\}$ なら、和集合は $\{1, 2, 3\}$、共通部分は $\varnothing$（3 つすべてに属する要素はない）。
- 3 節の $A_n = (-1/n, 1/n)$ なら、和集合は $A_1 = (-1, 1)$、共通部分は $\{0\}$。
:::

### 空な集合族（補足）

- $\mathcal{A} = \varnothing$ のとき、和集合は「$x \in A$ となる $A \in \varnothing$ がある」を満たす $x$ がないので $\varnothing$。
- 共通部分は「すべての $A \in \varnothing$ について $x \in A$」が空虚に真になり、**どんな $x$ も**条件を満たしてしまう。そのため $\mathcal{A} \ne \varnothing$ に限って定義する。
  全体集合 $X$ を固定しているときは、空な族の共通部分を $X$ と約束することもある。
  [§12 の問題 3](/math/topological-spaces#q3) で $A = \varnothing$ のときの共通部分を $\mathcal{P}(X)$ と約束したのはこの考え方。

## 5. 集合族に対するド・モルガンの法則

:::theorem[集合族に対するド・モルガンの法則]{#thm-de-morgan-families}
$X$ を集合、$\{A_\alpha\}_{\alpha \in J}$ を $J \ne \varnothing$ の添字付けられた集合族とすると

$$
\begin{aligned}
X \setminus \bigcup_{\alpha \in J} A_\alpha &= \bigcap_{\alpha \in J} (X \setminus A_\alpha) \\
X \setminus \bigcap_{\alpha \in J} A_\alpha &= \bigcup_{\alpha \in J} (X \setminus A_\alpha)
\end{aligned}
$$
:::

:::proof[補足]
1 つ目を示す。$x \in X$ について

$$
\begin{aligned}
x \notin \bigcup_{\alpha \in J} A_\alpha
&\iff \neg\, \exists \alpha \in J:\ x \in A_\alpha \\
&\iff \forall \alpha \in J:\ x \notin A_\alpha
\end{aligned}
$$

（[量化記号の否定](/math/propositional-logic#thm-de-morgan)）。よって $x \in X \setminus \bigcup_\alpha A_\alpha \iff \forall \alpha:\ x \in X \setminus A_\alpha \iff x \in \bigcap_\alpha (X \setminus A_\alpha)$。
2 つ目は $\neg \forall \iff \exists \neg$ を使って同じように示せる。
:::

2 つの集合の場合（[集合演算とド・モルガンの法則](/math/set-operations#thm-de-morgan-sets)）は $J = \{1, 2\}$ の場合にあたる。
[§12 の有限補集合位相の証明](/math/topological-spaces#prop-finite-complement)で、和集合の補集合を補集合の共通部分に直したのはこの法則。

## 6. 位相の定義へ

$X$ 上の位相 $\mathcal{T}$ は、$X$ の部分集合を要素とする集合族で、$\mathcal{T} \subseteq \mathcal{P}(X)$ を満たす。
位相の 3 条件は、$\mathcal{T}$ の任意の部分族の和集合と、有限個の要素の共通部分についての条件になっている（[§12 のノート](/math/topological-spaces#def-topology)）。
