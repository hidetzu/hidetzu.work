---
title: "整数と実数"
aliases:
  - "integers"
  - "real numbers"
description: "実数の公理（体・順序体・最小上界性質）、帰納的集合による正の整数の定義、数学的帰納法、整列性、強い数学的帰納法、有限集合の最大元、アルキメデス的順序性。"
topic: real-numbers
order: 1
status: understood
createdAt: 2026-11-14
updatedAt: 2026-11-17
related:
  - relations
  - rational-density
  - functions
tags:
  - real-numbers
  - munkres
sources:
  - title: "James R. Munkres, Topology, 2nd ed."
    location: "Chapter 1, §4 The Integers and the Real Numbers"
textbook:
  chapter: 1
  section: 4
---

このノートでは、実数をいくつかの公理を満たす集合として出発点に置き、そこから正の整数を「帰納的集合」の共通部分として定義する。
この定義から数学的帰納法・整列性・強い数学的帰納法が導かれること、最小上界性質からアルキメデス的順序性が導かれることを、証明を通して確かめる。

## 1. 実数の公理

集合 $\mathbb{R}$ と、$\mathbb{R}$ 上の 2 つの二項演算（加法 $+$ と乗法 $\cdot$）、および $\mathbb{R}$ 上の[順序関係](/math/relations#def-order) $<$ が与えられていて、次の性質を満たすと仮定する。
以下、$x, y, z$ は $\mathbb{R}$ の任意の元を表す。

:::definition[実数の公理]{#def-real-axioms}
**代数的性質**

1. **結合法則**：$(x + y) + z = x + (y + z)$ かつ $(x \cdot y) \cdot z = x \cdot (y \cdot z)$ である。
2. **交換法則**：$x + y = y + x$ かつ $x \cdot y = y \cdot x$ である。
3. **零元と単位元**：任意の $x$ に対して $x + 0 = x$ を満たす元 $0 \in \mathbb{R}$ が一意に存在する。また、$1 \ne 0$ であって、任意の $x$ に対して $x \cdot 1 = x$ を満たす元 $1 \in \mathbb{R}$ が一意に存在する。
4. **逆元**：各 $x$ に対して、$x + y = 0$ を満たす $y \in \mathbb{R}$ が一意に存在する。また、各 $x \ne 0$ に対して、$x \cdot y = 1$ を満たす $y \in \mathbb{R}$ が一意に存在する。
5. **分配法則**：$x \cdot (y + z) = (x \cdot y) + (x \cdot z)$ である。

**代数と順序の両立性**

6. $x < y$ ならば $x + z < y + z$ である。また、$x < y$ かつ $0 < z$ ならば $x \cdot z < y \cdot z$ である。

**順序の性質**

7. **最小上界性質**：順序関係 $<$ は[最小上界性質](/math/relations#def-lub-property)をもつ。
8. **稠密性**：$x < y$ ならば、$x < z < y$ を満たす $z \in \mathbb{R}$ が存在する。

:::

(4) の $y$ をそれぞれ $-x$、$x^{-1}$ と書く。また $x - y = x + (-y)$、$x / y = x \cdot y^{-1}$ と定める。

(8) は (1)〜(7) から導かれる性質であり、独立した仮定ではない。

（補足）たとえば $z = (x + y)/2$ が条件を満たす。ただし、これを確かめるには $0 < 1$ や $0 < 2$ のような不等式の法則が必要になる。不等式の法則は演習 2 の内容で、まだ取り組んでいないので、このノートでは (8) を証明していない。

## 2. 二項演算・体・順序体

:::definition[二項演算]{#def-binary-operation}
集合 $A$ に対し、[写像](/math/functions#def-function) $f \colon A \times A \to A$ を $A$ 上の**二項演算**という。$f(x, y)$ を $x \mathbin{f} y$ と書くことが多い。
:::

加法 $+$ と乗法 $\cdot$ は、$\mathbb{R}$ 上の二項演算である。

:::definition[体・順序体・線形連続体]{#def-field}
1. 2 つの二項演算をもつ集合で、性質 (1)〜(5) を満たすものを**体**という。
2. 体に順序関係 $<$ が与えられていて、性質 (6) を満たすものを**順序体**という。
3. 順序集合で、性質 (7) と (8) を満たすものを**線形連続体**という。

:::

実数の公理との対応は次のとおりである。

| 性質 | 意味すること |
| --- | --- |
| (1)〜(5) | $\mathbb{R}$ は体である |
| (1)〜(6) | $\mathbb{R}$ は順序体である |
| (7)、(8) | 順序集合として、$\mathbb{R}$ は線形連続体である |

すなわち、$\mathbb{R}$ は最小上界性質をもつ順序体である。

## 3. 帰納的集合と正の整数

:::definition[帰納的集合]{#def-inductive}
$A \subseteq \mathbb{R}$ が次の 2 条件を満たすとき、$A$ を**帰納的集合**という。

1. $1 \in A$ である。
2. $x \in A$ ならば $x + 1 \in A$ である。

:::

:::definition[正の整数・整数・有理数]{#def-integers}
帰納的集合全体の集まりを $\mathcal{A}$ とし、

$$
\mathbb{Z}_{+} = \bigcap_{A \in \mathcal{A}} A
$$

と定める。$\mathbb{Z}_{+}$ の元を**正の整数**という。

さらに、$0$、正の整数、正の整数の加法逆元をあわせた集合

$$
\mathbb{Z} = \mathbb{Z}_{+} \cup \{0\} \cup \{\, -n \mid n \in \mathbb{Z}_{+} \,\}
$$

の元を**整数**という。整数の商として表される実数全体

$$
\mathbb{Q} = \{\, m / n \mid m, n \in \mathbb{Z},\ n \ne 0 \,\}
$$

の元を**有理数**という。
:::

ここで $\mathcal{A}$ は空でない。$\mathbb{R}$ 自身が帰納的集合だからである。共通部分は[集合族の共通部分](/math/families-of-sets#def-family-union)の意味である。

## 4. 数学的帰納法

### 帰納的集合の共通部分

:::proposition[帰納的集合の共通部分は帰納的]{#prop-intersection-inductive source="Munkres, §4 演習 3(a)"}
$\mathcal{B}$ を帰納的集合からなる空でない集まりとする。このとき、共通部分 $\bigcap_{A \in \mathcal{B}} A$ は帰納的集合である。
:::

:::proof{origin=self text=ai}
$I = \bigcap_{A \in \mathcal{B}} A$ とおき、帰納的集合の 2 条件を確かめる。

**条件 1**：各 $A \in \mathcal{B}$ は帰納的集合であるから、$1 \in A$ である。$1$ はすべての $A \in \mathcal{B}$ に属するので、$1 \in I$ である。

**条件 2**：$x \in I$ とする。共通部分の定義より、すべての $A \in \mathcal{B}$ に対して $x \in A$ である。
各 $A$ は帰納的集合であるから、すべての $A \in \mathcal{B}$ に対して $x + 1 \in A$ となる。よって $x + 1 \in I$ である。

以上より、$I$ は帰納的集合である。
:::

### 正の整数の基本性質

:::theorem[数学的帰納法の原理]{#thm-induction source="Munkres, §4 演習 3(b)"}
1. $\mathbb{Z}_{+}$ は帰納的集合である。
2. $A \subseteq \mathbb{Z}_{+}$ が帰納的集合ならば、$A = \mathbb{Z}_{+}$ である。

:::

:::proof{origin=self text=ai}
**(1)** $\mathbb{Z}_{+}$ は帰納的集合全体の集まり $\mathcal{A}$ の共通部分であり、$\mathcal{A}$ は空でない。よって[帰納的集合の共通部分](#prop-intersection-inductive) より、$\mathbb{Z}_{+}$ は帰納的集合である。

**(2)** $A \subseteq \mathbb{Z}_{+}$ を帰納的集合とする。$A \in \mathcal{A}$ であり、$\mathbb{Z}_{+}$ は $\mathcal{A}$ のすべての元の共通部分であるから、$\mathbb{Z}_{+} \subseteq A$ である。
仮定より $A \subseteq \mathbb{Z}_{+}$ であるから、$A = \mathbb{Z}_{+}$ である。
:::

(2) が数学的帰納法の根拠になる。ある性質をもつ正の整数全体を $A$ とし、$1 \in A$（基底）と「$n \in A$ ならば $n + 1 \in A$」（帰納法のステップ）を示せば、$A$ は帰納的集合となり、$A = \mathbb{Z}_{+}$ が従う。

## 5. 整列性

以下、$n \in \mathbb{Z}_{+}$ に対して

$$
\{1, \dots, n\} = \{\, k \in \mathbb{Z}_{+} \mid k \le n \,\}
$$

と書く。

:::theorem[整列性]{#thm-well-ordering source="Munkres, Theorem 4.1"}
$\mathbb{Z}_{+}$ の空でない部分集合は、すべて最小元をもつ。
:::

:::proof{origin=textbook text=ai}
まず、有限集合の場合を数学的帰納法で示し、次に一般の場合に広げる。

**ステップ 1**：任意の $n \in \mathbb{Z}_{+}$ に対して、$\{1, \dots, n\}$ の空でない部分集合はすべて最小元をもつことを示す。
この主張が成り立つ $n \in \mathbb{Z}_{+}$ 全体を $A$ とする。

- **基底**：$\{1, \dots, 1\} = \{1\}$ の空でない部分集合は $\{1\}$ だけであり、その最小元は $1$ である。よって $1 \in A$ である。
- **帰納法のステップ**：$n \in A$ と仮定し、$C$ を $\{1, \dots, n + 1\}$ の空でない部分集合とする。
  $C$ が $\{1, \dots, n\}$ の元を含まなければ、$C = \{n + 1\}$ であり、最小元は $n + 1$ である。
  $C$ が $\{1, \dots, n\}$ の元を含むならば、$C \cap \{1, \dots, n\}$ は $\{1, \dots, n\}$ の空でない部分集合であるから、帰納法の仮定より最小元 $a$ をもつ。$a \le n < n + 1$ であるから、$a$ は $C$ の最小元である。
  いずれの場合も $C$ は最小元をもつので、$n + 1 \in A$ である。

$A$ は帰納的集合であり $A \subseteq \mathbb{Z}_{+}$ であるから、[数学的帰納法の原理](#thm-induction)より $A = \mathbb{Z}_{+}$ である。

**ステップ 2**：$D$ を $\mathbb{Z}_{+}$ の空でない部分集合とし、$n \in D$ を 1 つとる。
$D \cap \{1, \dots, n\}$ は $n$ を含むから空でない。ステップ 1 より、これは最小元 $a$ をもつ。
$a$ が $D$ の最小元であることを示す。$d \in D$ とする。$d \le n$ ならば $d \in D \cap \{1, \dots, n\}$ であるから $a \le d$ である。$d > n$ ならば $a \le n < d$ である。
よって $a$ は $D$ の最小元である。
:::

（補足）この証明では、「$1$ は最小の正の整数である」「$\{1, \dots, n + 1\} = \{1, \dots, n\} \cup \{n + 1\}$」（$n$ と $n + 1$ のあいだに正の整数はない）という事実を使っている。これらは整数の性質についての演習の範囲であり、このノートでは証明していない。

## 6. 強い数学的帰納法

$n \in \mathbb{Z}_{+}$ に対して、$n$ より小さい正の整数全体を

$$
S_n = \{\, k \in \mathbb{Z}_{+} \mid k < n \,\}
$$

とおく。たとえば $S_1 = \varnothing$ である。

:::theorem[強い数学的帰納法]{#thm-strong-induction source="Munkres, Theorem 4.2"}
$A \subseteq \mathbb{Z}_{+}$ が、任意の $n \in \mathbb{Z}_{+}$ に対して

$$
S_n \subseteq A \implies n \in A
$$

を満たすならば、$A = \mathbb{Z}_{+}$ である。
:::

:::proof{origin=textbook text=ai}
背理法で示す。$A \ne \mathbb{Z}_{+}$ と仮定すると、$\mathbb{Z}_{+} \setminus A$ は $\mathbb{Z}_{+}$ の空でない部分集合である。
[整列性](#thm-well-ordering)より、$\mathbb{Z}_{+} \setminus A$ は最小元 $n$ をもつ。

$k \in S_n$ とすると $k < n$ である。$n$ は $\mathbb{Z}_{+} \setminus A$ の最小元であるから、$k \notin \mathbb{Z}_{+} \setminus A$、すなわち $k \in A$ である。よって $S_n \subseteq A$ である。

すると、仮定より $n \in A$ となる。これは、$n$ が $\mathbb{Z}_{+} \setminus A$ の元であることに矛盾する。よって $A = \mathbb{Z}_{+}$ である。
:::

通常の数学的帰納法では「$n$ について成り立てば $n + 1$ について成り立つ」を示すが、強い数学的帰納法では「$n$ より小さいすべての正の整数について成り立てば $n$ について成り立つ」を示せばよい。

## 7. 最大元と数学的帰納法

### 有限集合の最大元

:::proposition[有限集合の部分集合は最大元をもつ]{#prop-finite-max source="Munkres, §4 演習 4(a)"}
任意の $n \in \mathbb{Z}_{+}$ に対して、$\{1, \dots, n\}$ の空でない部分集合はすべて最大元をもつ。
:::

:::proof{origin=self text=ai}
この主張が成り立つ $n \in \mathbb{Z}_{+}$ 全体を $A$ とし、数学的帰納法で示す。

**基底**：$\{1\}$ の空でない部分集合は $\{1\}$ だけであり、その最大元は $1$ である。よって $1 \in A$ である。

**帰納法のステップ**：$n \in A$ と仮定し、$C$ を $\{1, \dots, n + 1\}$ の空でない部分集合とする。

- $n + 1 \in C$ の場合：$C$ の元はすべて $n + 1$ 以下であるから、$n + 1$ が $C$ の最大元である。
- $n + 1 \notin C$ の場合：$C \subseteq \{1, \dots, n\}$ であり、$C$ は空でない。帰納法の仮定より、$C$ は最大元をもつ。

いずれの場合も $C$ は最大元をもつので、$n + 1 \in A$ である。

よって $A$ は帰納的集合であり、[数学的帰納法の原理](#thm-induction)より $A = \mathbb{Z}_{+}$ である。
:::

（補足）$n + 1 \notin C$ の場合に $C \subseteq \{1, \dots, n\}$ となることには、[整列性の証明の補足](#thm-well-ordering)と同じく「$n$ と $n + 1$ のあいだに正の整数はない」という事実を使っている。

### $\mathbb{Z}_{+}$ 全体では成り立たない

:::proposition[正の整数全体は最大元をもたない]{#prop-no-max source="Munkres, §4 演習 4(b)"}
$\mathbb{Z}_{+}$ は最大元をもたない。とくに、[有限集合の最大元](#prop-finite-max)の結論は、空でない部分集合 $\mathbb{Z}_{+}$ 自身については成り立たない。
:::

:::proof{origin=self text=ai}
$\mathbb{Z}_{+}$ が最大元 $n$ をもつと仮定する。$\mathbb{Z}_{+}$ は[帰納的集合である](#thm-induction)から、$n + 1 \in \mathbb{Z}_{+}$ である。
一方 $n + 1 > n$ であるから、$n$ が最大元であることに矛盾する。

よって $\mathbb{Z}_{+}$ は最大元をもたない。
:::

## 8. アルキメデス的順序性

:::theorem[アルキメデス的順序性]{#thm-archimedean}
$\mathbb{Z}_{+}$ は、$\mathbb{R}$ において上に有界でない。
:::

:::proof{origin=textbook text=ai}
背理法で示す。$\mathbb{Z}_{+}$ が上に有界であると仮定する。$\mathbb{Z}_{+}$ は空でないから、[最小上界性質 (7)](#def-real-axioms) より $b = \sup \mathbb{Z}_{+}$ が存在する。

$b - 1 < b$ であり、$b$ は上界のうち最小のものであるから、$b - 1$ は $\mathbb{Z}_{+}$ の上界ではない。
よって、$n > b - 1$ を満たす $n \in \mathbb{Z}_{+}$ が存在する。

両辺に $1$ を加えると $n + 1 > b$ となる。ところが $\mathbb{Z}_{+}$ は[帰納的集合である](#thm-induction)から $n + 1 \in \mathbb{Z}_{+}$ であり、これは $b$ が $\mathbb{Z}_{+}$ の上界であることに矛盾する。

よって $\mathbb{Z}_{+}$ は上に有界でない。
:::

言いかえると、任意の実数 $r$ に対して $n > r$ を満たす $n \in \mathbb{Z}_{+}$ が存在する。[有理数の稠密性](/math/rational-density#thm-archimedean)のノートでは、この性質を証明せずに使っている。

最小上界性質は、ほかにも多くの場面で使われる。たとえば、最小上界性質から最大下界性質が導かれる（[関係のノート](/math/relations#thm-lub-glb)）。また、正の実数の平方根の存在も最小上界性質を用いて示される（このノートでは扱っていない）。
