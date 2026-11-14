---
title: "集合族"
description: "集合を要素とする集合と、添字付き集合族（添字付け関数）。要素と部分集合の区別、集合族の和集合・共通部分、縮む開区間の例、空な集合族、集合族に対するド・モルガンの法則。"
topic: set-theory
order: 4
status: understood
createdAt: 2026-11-09
updatedAt: 2026-11-14
related:
  - sets
  - power-set
tags:
  - set-theory
  - munkres
sources:
  - title: "James R. Munkres, Topology, 2nd ed."
    location: "Chapter 1"
textbook:
  chapter: 1
---

## 1. 集合族

:::definition[集合族]{#def-family}
集合を要素とする集合を**集合族**（集合の族）という。
:::

集合族は $\mathcal{A}, \mathcal{B}$ のような筆記体の文字で書くことが多い。

:::example[集合族の例]{#ex-family}
- $\mathcal{A} = \{\, \{1, 2\},\ \{2, 3\},\ \{3\} \,\}$
- 集合 $A$ の[冪集合](/math/power-set#def-power-set) $\mathcal{P}(A)$。$A$ の部分集合全体からなる集合族である
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

集合族 $\mathcal{A}$ について、$\mathcal{A}$ の**要素**は 1 つの集合で、$\mathcal{A}$ の**部分集合**はいくつかの集合を集めた集合族（$\mathcal{A}$ の**部分族**）になる。

## 3. 添字付き集合族

:::definition[添字付け関数・添字付き集合族]{#def-indexing-function}
$\mathcal{A}$ を集合族とする。集合 $J$ から $\mathcal{A}$ への全射

$$
f \colon J \to \mathcal{A}
$$

を $\mathcal{A}$ の**添字付け関数**といい、$J$ を**添字集合**という。
集合族 $\mathcal{A}$ と添字付け関数 $f$ の組を**添字付き集合族**という。$\alpha \in J$ に対して $f(\alpha) = A_\alpha$ と書き、添字付き集合族を

$$
\{A_\alpha\}_{\alpha \in J}
$$

で表す。
:::

添字集合 $J$ と集合族 $\mathcal{A}$ は別のものである。$J$ の要素は添字（番号やラベル）で、集合である必要はない。$\mathcal{A}$ の要素は集合 $A_\alpha$ である。

添字付け関数は全射であればよく、単射である必要はない。すなわち、$\alpha \ne \beta$ であっても $A_\alpha = A_\beta$ となることがある。
たとえば $\mathcal{A} = \{A\}$、$J = \{1, 2\}$、$f(1) = f(2) = A$ とすると、$A_1 = A_2 = A$ である。

:::example[添字付けられた集合族]{#ex-indexed-family}
$J = \{1, 2, 3, \dots\}$、$A_n = \left( -\dfrac{1}{n}, \dfrac{1}{n} \right)$ とすると、$\{A_n\}_{n \in J}$ は実数の開区間の族である。
:::

## 4. 集合族の和集合と共通部分

:::definition[集合族の和集合・共通部分]{#def-family-union}
集合族 $\mathcal{A}$ について

$$
\begin{aligned}
\bigcup_{A \in \mathcal{A}} A &= \{\, x \mid \exists A \in \mathcal{A}:\ x \in A \,\} \\
\bigcap_{A \in \mathcal{A}} A &= \{\, x \mid \forall A \in \mathcal{A}:\ x \in A \,\} \quad (\mathcal{A} \ne \varnothing)
\end{aligned}
$$

添字付き集合族 $\{A_\alpha\}_{\alpha \in J}$ についても、同じように

$$
\begin{aligned}
\bigcup_{\alpha \in J} A_\alpha &= \{\, x \mid \exists \alpha \in J:\ x \in A_\alpha \,\} \\
\bigcap_{\alpha \in J} A_\alpha &= \{\, x \mid \forall \alpha \in J:\ x \in A_\alpha \,\} \quad (J \ne \varnothing)
\end{aligned}
$$
:::

添字付け関数は全射であるから、$\mathcal{A}$ のどの要素も、ある $\alpha$ について $A_\alpha$ の形で現れる。そのため、添字付き集合族の和集合・共通部分は、集合族 $\mathcal{A}$ の和集合・共通部分に等しい。

添字集合が $\{1, \dots, n\}$ や $\mathbb{Z}_{+}$ のときは、次のようにも書く。

$$
\begin{aligned}
\bigcup_{i = 1}^{n} A_i &= A_1 \cup \cdots \cup A_n, \\
\bigcup_{i = 1}^{\infty} A_i &= \bigcup_{i \in \mathbb{Z}_{+}} A_i
\end{aligned}
$$

共通部分も同様に $\bigcap_{i=1}^{n} A_i$、$\bigcap_{i=1}^{\infty} A_i$ と書く。

和集合と共通部分の違いは、量化記号の違い（[論理の基礎](/math/propositional-logic#thm-quantifier-negation)）になっている。

- 和集合：**少なくとも 1 つの** $A_\alpha$ に属する。存在記号 $\exists$
- 共通部分：**すべての** $A_\alpha$ に属する。全称記号 $\forall$

2 つの集合の $A \cup B$、$A \cap B$ は、$\mathcal{A} = \{A, B\}$ の場合にあたる。

:::example[集合族の和集合・共通部分]{#ex-family-union}
- $\mathcal{A} = \{\, \{1, 2\}, \{2, 3\}, \{3\} \,\}$ なら、和集合は $\{1, 2, 3\}$、共通部分は $\varnothing$（3 つすべてに属する要素はない）。
- [3 節の例](#ex-indexed-family)の $A_n = (-1/n, 1/n)$ なら、和集合は $A_1 = (-1, 1)$、共通部分は $\{0\}$。
:::

## 5. 無限個の集合の和集合と共通部分

:::example[縮む開区間の和集合と共通部分]{#ex-shrinking-intervals}
$n = 1, 2, 3, \dots$ に対して

$$
A_n = \left\{\, x \in \mathbb{R} \ \middle|\ 0 < x < \frac{1}{n} \,\right\} = \left( 0, \frac{1}{n} \right)
$$

とすると

$$
\bigcup_{n=1}^{\infty} A_n = A_1 = (0, 1), \qquad \bigcap_{n=1}^{\infty} A_n = \varnothing .
$$
:::

:::proof[和集合]{origin=self-reviewed}
相互包含で示す。

**$\bigcup_n A_n \subseteq A_1$。** 任意の $n \ge 1$ について $\frac{1}{n} \le 1$ なので、$A_n \subseteq A_1$。
実際、$x \in A_n$ なら $0 < x < \frac{1}{n} \le 1$ で $x \in A_1$。
よって $x \in \bigcup_n A_n$ なら、ある $n$ について $x \in A_n \subseteq A_1$。

**$A_1 \subseteq \bigcup_n A_n$。** $A_1$ はこの集合族の 1 つなので、和集合に含まれる。

以上より $\bigcup_{n=1}^{\infty} A_n = A_1$。
:::

:::proof[共通部分]{origin=self-reviewed note="レビューでアルキメデスの性質を使う背理法として整理"}
共通部分が空でないと仮定する。すると、ある実数 $x$ が存在して $x \in \bigcap_{n=1}^{\infty} A_n$。共通部分の定義から

$$
\forall n \ge 1,\quad 0 < x < \frac{1}{n} .
$$

特に $x > 0$ なので、[アルキメデスの性質](/math/integers-reals#thm-archimedean)から、ある自然数 $m$ が存在して $\frac{1}{m} < x$。
アルキメデスの性質を $r = \frac{1}{x}$ に使うと $m > \frac{1}{x}$ を満たす自然数 $m$ があり、両辺に $\frac{x}{m} > 0$ を掛けると $\frac{1}{m} < x$。

一方、仮定から $n = m$ のときも $x < \frac{1}{m}$ が成り立つ。これは矛盾である。

したがって $\bigcap_{n=1}^{\infty} A_n = \varnothing$。
:::

:::remark[この証明の要点]
$x$ が共通部分に属するとは $\forall n,\ x \in A_n$ ということなので、それを崩すには

$$
\exists m,\quad x \notin A_m
$$

を示せばよい。これは[量化記号の否定](/math/propositional-logic#thm-quantifier-negation) $\neg (\forall n\ P(n)) \iff \exists n\ \neg P(n)$ そのもので、アルキメデスの性質が、その $m$ を実際に見つける役割を果たしている。
:::

[4 節の例](#ex-family-union)の $(-1/n, 1/n)$ では共通部分が $\{0\}$ だったが、ここでは区間が $0$ を含まないので、共通部分は空になる。
どちらも、有限個なら共通部分は空でない（いちばん小さい区間になる）のに、無限個にすると変わる例になっている。

## 6. 空な集合族

- $\mathcal{A} = \varnothing$ のとき、和集合は「$x \in A$ となる $A \in \varnothing$ がある」を満たす $x$ がないので $\varnothing$。
- 共通部分は「すべての $A \in \varnothing$ について $x \in A$」が空虚に真になり、**どんな $x$ も**条件を満たしてしまう。そのため $\mathcal{A} \ne \varnothing$ に限って定義する。
  全体集合 $X$ を固定しているときは、空な族の共通部分を $X$ と約束することもある。

## 7. 集合族に対するド・モルガンの法則

:::theorem[集合族に対するド・モルガンの法則]{#thm-de-morgan-families}
$X$ を集合、$\{A_\alpha\}_{\alpha \in J}$ を $J \ne \varnothing$ の添字付けられた集合族とすると

$$
\begin{aligned}
X \setminus \bigcup_{\alpha \in J} A_\alpha &= \bigcap_{\alpha \in J} (X \setminus A_\alpha) \\
X \setminus \bigcap_{\alpha \in J} A_\alpha &= \bigcup_{\alpha \in J} (X \setminus A_\alpha)
\end{aligned}
$$
:::

:::proof{origin=self-reviewed}
1 つ目を示す。$x \in X$ について

$$
\begin{aligned}
x \notin \bigcup_{\alpha \in J} A_\alpha
&\iff \neg\, \exists \alpha \in J:\ x \in A_\alpha \\
&\iff \forall \alpha \in J:\ x \notin A_\alpha
\end{aligned}
$$

（[量化記号の否定](/math/propositional-logic#thm-quantifier-negation)）。よって $x \in X \setminus \bigcup_\alpha A_\alpha \iff \forall \alpha:\ x \in X \setminus A_\alpha \iff x \in \bigcap_\alpha (X \setminus A_\alpha)$。
2 つ目は $\neg \forall \iff \exists \neg$ を使って同じように示せる。
:::

2 つの集合の場合（[集合の基本と演算](/math/sets#thm-de-morgan-sets)）は $J = \{1, 2\}$ の場合にあたる。
