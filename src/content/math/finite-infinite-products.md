---
title: "有限直積と無限直積"
description: "添字付き集合族（添字付け関数）と、m 組・ω 組を関数として定める有限直積と無限直積。実数の m 組全体と実数列全体。Munkres §5 の演習 1（A × B と B × A の全単射）を含む。"
topic: set-theory
order: 8
status: understood
createdAt: 2026-11-14
related:
  - cartesian-product
  - families-of-sets
  - functions
  - integers-reals
tags:
  - set-theory
  - munkres
sources:
  - title: "James R. Munkres, Topology, 2nd ed."
    location: "Chapter 1, §5 Cartesian Products"
textbook:
  chapter: 1
  section: 5
---

:::remark[このノートの書き方]
Munkres の §5 Cartesian Products（直積）で学んだ内容を、定義、例、証明の順に整理したものである。
教科書の文章を訳したものではなく、学んだ定義を自分のノートとしてまとめ直している。演習 1 の番号は Munkres に従う。
Claude が説明のために加えた例や注意には **（補足）** と付ける。
:::

学習状況：

- 添字付き集合族、有限直積、無限直積、$X^m$・$X^\omega$、$\mathbb{R}^m$・$\mathbb{R}^\omega$ の定義：確認済み
- 演習 1：自分で証明済み。証明の文章は Claude が整えた（論理の流れはそのまま）
- 演習 2〜5：未着手
- 任意の添字集合に対する直積：教科書の後続の節で扱われる。このノートでは扱わない

以下、$n \in \mathbb{Z}_{+}$ に対して $\{1, \dots, n\} = \{\, k \in \mathbb{Z}_{+} \mid k \le n \,\}$ と書く（[整数と実数のノート](/math/integers-reals#thm-well-ordering)と同じ記法）。

## 1. 添字付き集合族

[集合族のノート](/math/families-of-sets#ex-indexed-family)では、添字付けられた集合族を「各添字に集合を対応させたもの」として扱った。ここでは、それを関数で定める。

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

添字付け関数は全射であればよく、単射である必要はない。すなわち、$\alpha \ne \beta$ であっても $A_\alpha = A_\beta$ となることがある。

（補足）たとえば $\mathcal{A} = \{A\}$、$J = \{1, 2\}$、$f(1) = f(2) = A$ とすると、$A_1 = A_2 = A$ である。

:::definition[添字付き集合族の和集合・共通部分]{#def-indexed-union}
添字付き集合族 $\{A_\alpha\}_{\alpha \in J}$ に対して、

$$
\begin{aligned}
\bigcup_{\alpha \in J} A_\alpha &= \{\, x \mid \exists \alpha \in J:\ x \in A_\alpha \,\}, \\
\bigcap_{\alpha \in J} A_\alpha &= \{\, x \mid \forall \alpha \in J:\ x \in A_\alpha \,\}
\end{aligned}
$$

と定める。共通部分は $J \ne \varnothing$ のときに考える。
:::

（補足）添字付け関数は全射であるから、$\mathcal{A}$ のどの元も、ある $\alpha$ について $A_\alpha$ の形で現れる。そのため、これらは集合族 $\mathcal{A}$ の[和集合・共通部分](/math/families-of-sets#def-family-union)に等しい。

添字集合が $\{1, \dots, n\}$ や $\mathbb{Z}_{+}$ のときは、次のようにも書く。

$$
\begin{aligned}
\bigcup_{i = 1}^{n} A_i &= A_1 \cup \cdots \cup A_n, \\
\bigcup_{i = 1}^{\infty} A_i &= \bigcup_{i \in \mathbb{Z}_{+}} A_i
\end{aligned}
$$

共通部分も同様に $\bigcap_{i=1}^{n} A_i$、$\bigcap_{i=1}^{\infty} A_i$ と書く。

## 2. 有限直積

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

[直積のノート](/math/cartesian-product#def-cartesian-product)では、$A \times B$ を順序対 $(a, b)$ の集合として定めた。
上の定義で $m = 2$ とすると、$A \times B$ は 2 組、すなわち関数 $x \colon \{1, 2\} \to A \cup B$ で $x(1) \in A$、$x(2) \in B$ を満たすもの全体になる。

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

（補足）逆向きは $(a, (b, c)) \mapsto (a, b, c)$、$((a, b), c) \mapsto (a, b, c)$ で与えられ、それぞれ上の写像と合成すると恒等写像になる。

## 3. 無限直積

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

### 同じ集合の直積

:::definition[$X^m$ と $X^\omega$]{#def-power-of-set}
すべての $A_i$ が同じ集合 $X$ のとき、

- $\prod_{i=1}^{m} A_i$ を $X^m$ と書く。$X^m$ は $X$ の元の $m$ 組全体の集合である。
- $\prod_{i \in \mathbb{Z}_{+}} A_i$ を $X^\omega$ と書く。$X^\omega$ は $X$ の元の $\omega$ 組全体の集合である。

:::

:::example[$\mathbb{R}^m$ と $\mathbb{R}^\omega$]{#ex-real-products}
- $\mathbb{R}^m$ は、実数の $m$ 組 $(x_1, \dots, x_m)$ 全体の集合である。
- $\mathbb{R}^\omega$ は、実数の $\omega$ 組 $(x_1, x_2, \dots)$ 全体、すなわち実数列全体の集合である。

:::

## 4. 演習 1：直積の交換

:::proposition[$A \times B$ と $B \times A$ の全単射]{#prop-product-swap}
集合 $A, B$ に対して、$A \times B$ と $B \times A$ のあいだには全単射が存在する。
:::

:::proof{origin=self text=ai}
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

（補足）この証明の $x_1, x_2$ は $A \times B$ の 2 つの元を表していて、座標 $x(1), x(2)$ のことではない。

## 5. 学習を通して理解したこと

:::remark[学習メモ]
1. 直積の元 $x$ は関数であり、写像 $f$ は、その関数 $x$ を入力として受け取る別の関数である。
2. $x_1 \ne x_2$ ならば、少なくとも 1 つの座標で値が異なる。すべての座標で異なる必要はない。
3. 単射性は、異なる入力に対して異なる出力が得られることを示せばよい。
4. 全射性は、終域の任意の $y$ をとり、$f(x) = y$ を満たす $x$ を構成すればよい。
5. 2 つの直積が全単射で対応することは、集合として等しいことを意味しない。

:::

## 6. 未学習の事項

- 演習 2〜5 は未着手である。
- 任意の添字集合に対する直積の一般化は、教科書の後続の節で扱われる。
