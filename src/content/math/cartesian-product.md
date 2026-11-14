---
title: "直積（Cartesian Products）"
description: "順序対と 2 つの集合の直積、A × B と B × A の違い、m 組・ω 組を関数として定める有限直積と無限直積、同じ集合の直積（実数の m 組全体と実数列全体）。Munkres §5 の演習 1（A × B と B × A の全単射）を含む。"
topic: set-theory
order: 5
status: understood
createdAt: 2026-11-09
updatedAt: 2026-11-14
related:
  - sets
  - families-of-sets
  - functions
tags:
  - set-theory
  - munkres
sources:
  - title: "James R. Munkres, Topology, 2nd ed."
    location: "Chapter 1（p.12〜13）"
  - title: "James R. Munkres, Topology, 2nd ed."
    location: "Chapter 1, §5 Cartesian Products"
textbook:
  chapter: 1
  section: 5
---

以下、$n \in \mathbb{Z}_{+}$ に対して $\{1, \dots, n\} = \{\, k \in \mathbb{Z}_{+} \mid k \le n \,\}$ と書く（[整数と実数のノート](/math/integers-reals#thm-well-ordering)と同じ記法）。

## 1. 順序対と 2 つの集合の直積

集合では要素の順番は関係ない（$\{1, 2\} = \{2, 1\}$、[集合の基本と演算](/math/sets)）。
直積の要素は、順番に意味のある組である**順序対** $(a, b)$ である。順序対は、次の性質で特徴づけられる。

$$
(a, b) = (c, d) \iff a = c \land b = d
$$

たとえば $(1, 2) \ne (2, 1)$ である。1 番目と 2 番目の成分を入れ替えると、別の順序対になる。

:::definition[直積]{#def-cartesian-product}
集合 $A, B$ に対して

$$
A \times B = \{\, (a, b) \mid a \in A,\ b \in B \,\}
$$

を $A$ と $B$ の**直積**という。
:::

1 番目の成分は $A$ から、2 番目の成分は $B$ からとる。

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

たとえば $(1, a) \in A \times B$ だが、$(1, a) \notin B \times A$ である。$B \times A$ の要素は 1 番目の成分が $B$ の要素で、$1 \notin B$ だからである。
よってこの例では

$$
A \times B \ne B \times A .
$$
:::

このように、$A \times B$ と $B \times A$ は一般には等しくない。$A = B$ のときや、$A$ か $B$ が空集合のとき（$A \times B = B \times A = \varnothing$）は等しい。

等しくない場合でも、$A \times B$ と $B \times A$ のあいだには常に全単射が存在する（[6 節の演習 1](#prop-product-swap)）。集合として等しいことと、全単射で対応することは別のことである。

### 要素の個数

$A, B$ が有限集合なら

$$
|A \times B| = |A| \cdot |B| .
$$

1 番目の成分 $a \in A$ を 1 つ決めるごとに、2 番目の成分の選び方が $|B|$ 通りあるからである。[上の例](#ex-product-order)では $2 \times 3 = 6$ 個である。

## 3. 有限直積

有限個・無限個の集合の直積は、「組」を関数として定めて定義する。添字付き集合族とその和集合は[集合族のノート](/math/families-of-sets#def-indexing-function)の定義を使う。

:::definition[$m$ 組]{#def-m-tuple}
$m \in \mathbb{Z}_{+}$ とし、$X$ を集合とする。関数

$$
x \colon \{1, \dots, m\} \to X
$$

を、$X$ の元の **$m$ 組**（$m$-tuple）という。$x(i)$ を $x_i$ と書いて $x$ の**第 $i$ 座標**といい、$x$ を $(x_1, \dots, x_m)$ と表す。
:::

$m$ 組は、座標の番号 $i$ にその座標の値 $x_i$ を対応させる関数である。

:::definition[有限直積]{#def-finite-product}
$\{A_1, \dots, A_m\}$ を添字集合 $\{1, \dots, m\}$ をもつ集合族とし、$X = A_1 \cup \cdots \cup A_m$ とおく。
$X$ の元の $m$ 組 $(x_1, \dots, x_m)$ のうち、各 $i$ について $x_i \in A_i$ を満たすもの全体の集合を、$A_1, \dots, A_m$ の**直積**といい、

$$
\prod_{i = 1}^{m} A_i \quad \text{または} \quad A_1 \times \cdots \times A_m
$$

で表す。
:::

### 順序対による定義との対応

1 節では、$A \times B$ を順序対 $(a, b)$ の集合として定めた。
有限直積の定義で $m = 2$ とすると、$A \times B$ は 2 組、すなわち関数 $x \colon \{1, 2\} \to A \cup B$ で $x(1) \in A$、$x(2) \in B$ を満たすもの全体になる。

2 つの定義による $A \times B$ は、集合として同じものではない。しかし、2 組 $x$ に順序対 $(x(1), x(2))$ を対応させると、両者のあいだに全単射ができる。この対応によって、どちらも $(a, b)$ と書き、同じ $A \times B$ として扱う。

### 3 つの集合の直積

$A \times B \times C$（3 組の集合）、$A \times (B \times C)$、$(A \times B) \times C$ は、集合としては異なる。しかし

$$
\begin{aligned}
(a, b, c) &\longmapsto (a, (b, c)), \\
(a, b, c) &\longmapsto ((a, b), c)
\end{aligned}
$$

によって、$A \times B \times C$ と $A \times (B \times C)$、$A \times B \times C$ と $(A \times B) \times C$ のあいだに全単射の対応がある。
逆向きは $(a, (b, c)) \mapsto (a, b, c)$、$((a, b), c) \mapsto (a, b, c)$ で与えられ、それぞれ上の写像と合成すると恒等写像になる。

## 4. 無限直積

:::definition[$\omega$ 組]{#def-omega-tuple}
$X$ を集合とする。関数

$$
x \colon \mathbb{Z}_{+} \to X
$$

を、$X$ の元の **$\omega$ 組**（$\omega$-tuple）という。$x(i)$ を $x_i$ と書き、$x$ を $(x_1, x_2, \dots)$ や $(x_n)_{n \in \mathbb{Z}_{+}}$ と表す。
:::

$\omega$ 組は、$X$ の元の無限列 $x_1, x_2, x_3, \dots$ のことである。言いかえると、無限列を $\mathbb{Z}_{+}$ から $X$ への関数として定めている。

:::definition[無限直積]{#def-infinite-product}
$\{A_1, A_2, \dots\}$ を添字集合 $\mathbb{Z}_{+}$ をもつ集合族とし、$X = \bigcup_{i \in \mathbb{Z}_{+}} A_i$ とおく。
$X$ の元の $\omega$ 組 $(x_1, x_2, \dots)$ のうち、各 $i \in \mathbb{Z}_{+}$ について $x_i \in A_i$ を満たすもの全体の集合を、$A_1, A_2, \dots$ の**直積**といい、

$$
\prod_{i \in \mathbb{Z}_{+}} A_i \quad \text{または} \quad A_1 \times A_2 \times \cdots
$$

で表す。
:::

## 5. 同じ集合の直積

:::definition[$X^m$ と $X^\omega$]{#def-power-of-set}
すべての $A_i$ が同じ集合 $X$ のとき、

- $\prod_{i=1}^{m} A_i$ を $X^m$ と書く。$X^m$ は $X$ の元の $m$ 組全体の集合である。
- $\prod_{i \in \mathbb{Z}_{+}} A_i$ を $X^\omega$ と書く。$X^\omega$ は $X$ の元の $\omega$ 組全体の集合である。

:::

:::example[$\mathbb{R}^m$ と $\mathbb{R}^\omega$]{#ex-real-products}
- $\mathbb{R}^m$ は、実数の $m$ 組 $(x_1, \dots, x_m)$ 全体の集合である。
- $\mathbb{R}^\omega$ は、実数の $\omega$ 組 $(x_1, x_2, \dots)$ 全体、すなわち実数列全体の集合である。

:::

## 6. 演習 1：直積の交換

:::proposition[$A \times B$ と $B \times A$ の全単射]{#prop-product-swap}
集合 $A, B$ に対して、$A \times B$ と $B \times A$ のあいだには全単射が存在する。
:::

:::proof{origin=self-reviewed text=ai}
写像 $f$ を構成し、それが全単射であることを示す。

**$f$ の定義**：$x \in A \times B$ を任意にとる。[直積の定義](#def-finite-product)より、$x$ は関数 $x \colon \{1, 2\} \to A \cup B$ であり、$x(1) \in A$、$x(2) \in B$ を満たす。
関数 $y \colon \{1, 2\} \to B \cup A$ を

$$
y(1) = x(2), \qquad y(2) = x(1)
$$

で定めると、$y(1) \in B$、$y(2) \in A$ であるから $y \in B \times A$ である。そこで

$$
f \colon A \times B \to B \times A, \qquad f(x) = y
$$

と定める。

**単射性**：$x_1, x_2 \in A \times B$ とし、$x_1 \ne x_2$ とする。関数の等しさの定義より、

$$
\exists i \in \{1, 2\}:\ x_1(i) \ne x_2(i)
$$

である。$y_1 = f(x_1)$、$y_2 = f(x_2)$ とおくと、$f$ の定義より

$$
y_1(3 - i) = x_1(i), \qquad y_2(3 - i) = x_2(i)
$$

である。したがって $y_1(3 - i) \ne y_2(3 - i)$ となり、$y_1 \ne y_2$ である。よって $f$ は単射である。

**全射性**：$y \in B \times A$ を任意にとる。関数 $x \colon \{1, 2\} \to A \cup B$ を

$$
x(1) = y(2), \qquad x(2) = y(1)
$$

で定めると、$y(2) \in A$、$y(1) \in B$ であるから $x \in A \times B$ である。さらに

$$
\begin{aligned}
f(x)(1) &= x(2) = y(1), \\
f(x)(2) &= x(1) = y(2)
\end{aligned}
$$

であるから、$f(x) = y$ である。よって $f$ は全射である。

以上より $f$ は全単射であり、$A \times B$ と $B \times A$ のあいだには全単射が存在する。
:::

この証明の $x_1, x_2$ は $A \times B$ の 2 つの元を表していて、座標 $x(1), x(2)$ のことではない。

:::remark[この証明の要点]
1. 直積の元 $x$ は関数であり、写像 $f$ は、その関数 $x$ を入力として受け取る別の関数である。
2. $x_1 \ne x_2$ ならば、少なくとも 1 つの座標で値が異なる。すべての座標で異なる必要はない。
3. 単射性は、異なる入力に対して異なる出力が得られることを示せばよい。
4. 全射性は、終域の任意の $y$ をとり、$f(x) = y$ を満たす $x$ を構成すればよい。
5. 2 つの直積が全単射で対応することは、集合として等しいことを意味しない。

:::

§5 の演習 2〜5 は未着手である。
