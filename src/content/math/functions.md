---
title: "写像"
aliases:
  - "functions"
  - "maps"
description: "写像の定義（値の存在と一意性）、単射・全射・全単射、左右の逆写像と全単射、像と逆像、像・逆像と集合演算（任意個の集合族を含む）、合成写像と単射・全射、左逆写像・右逆写像。"
topic: set-theory
order: 6
status: understood
createdAt: 2026-11-10
updatedAt: 2026-11-17
related:
  - cartesian-product
  - sets
  - families-of-sets
tags:
  - set-theory
  - munkres
sources:
  - title: "James R. Munkres, Topology, 2nd ed."
    location: "Chapter 1, §2 Functions"
textbook:
  chapter: 1
  section: 2
---

このノートでは、写像の定義から始めて、単射・全射・全単射、像と逆像、合成写像を扱う。
像と逆像が和集合・共通部分・差集合とどう関係するか、合成写像の単射性・全射性がもとの写像とどう関係するかを、証明と反例で確かめる。

以下、$f \colon A \to B$ を写像とする。差集合は [集合の基本と演算のノート](/math/sets#def-set-operations) と同じく $\setminus$ で書く。

## 1. 写像の定義

写像は、[直積](/math/cartesian-product#def-cartesian-product) $A \times B$ の部分集合として定義できる。

:::definition[写像]{#def-function}
$f \subseteq A \times B$ が次の 2 つを満たすとき、$f$ を $A$ から $B$ への**写像**といい、$f \colon A \to B$ と書く。

1. **存在**：任意の $a \in A$ に対して、$(a, b) \in f$ となる $b \in B$ が存在する。
2. **一意性**：$(a, b) \in f$ かつ $(a, b') \in f$ ならば $b = b'$。

この $b$ を $f(a)$ と書き、$a$ における $f$ の**値**という。
:::

存在は「どの $a$ にも値がある」、一意性は「値が 2 つ以上にならない」という条件で、別々に確かめる。

:::example[存在と一意性（補足）]{#ex-existence-uniqueness}
$A = \{1, 2\}$、$B = \{x, y\}$ とする。

- $\{(1, x)\}$ は写像ではない。$2$ を 1 番目の成分とする順序対がなく、存在が成り立たない。
- $\{(1, x), (1, y), (2, x)\}$ は写像ではない。$1$ に $x$ と $y$ の 2 つが対応し、一意性が成り立たない。
- $\{(1, x), (2, x)\}$ は写像。異なる $a$ が同じ値をとるのは構わない。
:::

:::definition[定義域・終域・像集合]{#def-domain-codomain}
$f \colon A \to B$ について、$A$ を**定義域**、$B$ を**終域**という。

$$
f(A) = \{\, f(a) \mid a \in A \,\} \subseteq B
$$

を $f$ の**像集合**という。
:::

終域 $B$ は写像の一部として決めておくもので、像集合 $f(A)$ と一致するとは限らない。2 節で見るように、同じ式でも終域を変えると全射かどうかが変わる。

:::definition[制限・合成]{#def-restriction-composition}
- $A_0 \subseteq A$ のとき、$f|_{A_0} \colon A_0 \to B$、$f|_{A_0}(a) = f(a)$ を $f$ の $A_0$ への**制限**という。
- $g \colon B \to C$ のとき、$g \circ f \colon A \to C$、$(g \circ f)(a) = g(f(a))$ を $f$ と $g$ の**合成**という。
:::

（補足）順序対の集合で書くと、$f|_{A_0} = \{\, (a, f(a)) \mid a \in A_0 \,\}$、$g \circ f = \{\, (a, g(f(a))) \mid a \in A \,\}$。

## 2. 単射・全射・全単射

:::definition[単射・全射・全単射]{#def-injective-surjective}
- $f$ が**単射**であるとは、任意の $a_1, a_2 \in A$ について

  $$
  f(a_1) = f(a_2) \implies a_1 = a_2 .
  $$

- $f$ が**全射**であるとは、$f(A) = B$。すなわち、任意の $b \in B$ に対して $f(a) = b$ となる $a \in A$ が存在する。
- $f$ が**全単射**であるとは、単射かつ全射であること。
:::

単射は「異なる入力が同じ出力にならない」、全射は「終域のどの元にも、対応する入力がある」という性質。

:::example[f(x) = x² の定義域と終域]{#ex-square}
$f(x) = x^2$ を、定義域と終域を変えて考える。

| 定義域 | 終域 | 単射 | 全射 |
| --- | --- | --- | --- |
| $\mathbb{R}$ | $\mathbb{R}$ | × | × |
| $[0, \infty)$ | $\mathbb{R}$ | ○ | × |
| $\mathbb{R}$ | $[0, \infty)$ | × | ○ |
| $[0, \infty)$ | $[0, \infty)$ | ○ | ○ |

- 定義域が $\mathbb{R}$ なら単射でない：$f(-1) = f(1) = 1$ だが $-1 \ne 1$。
- 定義域が $[0, \infty)$ なら単射：$x_1, x_2 \ge 0$、$x_1^2 = x_2^2$ とすると $(x_1 - x_2)(x_1 + x_2) = 0$。$x_1 + x_2 = 0$ なら $x_1 = x_2 = 0$ なので、どちらの場合も $x_1 = x_2$。
- 終域が $\mathbb{R}$ なら全射でない：$x^2 = -1$ となる実数 $x$ はない。
- 終域が $[0, \infty)$ なら全射：$y \ge 0$ に対して $x = \sqrt{y}$ とすれば $x^2 = y$（定義域が $[0, \infty)$ でも $\sqrt{y} \ge 0$ なのでよい）。

:::

$f$ が全単射なら、任意の $b \in B$ に対して $f(a) = b$ となる $a \in A$ が、全射性から**存在**し、単射性から**一意**に定まる。
これは 1 節の写像の 2 条件そのものなので、$b$ にその $a$ を対応させる写像

$$
f^{-1} \colon B \to A
$$

が定まる。これを $f$ の**逆写像**という。表の最後の行では $f^{-1}(y) = \sqrt{y}$。

## 3. 左右の逆写像と全単射

$A$ 上の恒等写像を $i_A \colon A \to A$、$i_A(a) = a$ と書く。

:::lemma[左右の逆写像と全単射]{#lem-2-1 source="Munkres, Lemma 2.1"}
$f \colon A \to B$ とする。写像 $g, h \colon B \to A$ が存在して

$$
g \circ f = i_A, \qquad f \circ h = i_B
$$

を満たすならば、$f$ は全単射で、$g = h = f^{-1}$。
:::

:::proof{text=ai}
**1. 単射であること。** $a_1, a_2 \in A$、$f(a_1) = f(a_2)$ とする。両辺に $g$ を施すと、$g \circ f = i_A$ より

$$
a_1 = g(f(a_1)) = g(f(a_2)) = a_2 .
$$

**2. 全射であること。** $b \in B$ を任意にとり、$a = h(b) \in A$ とおく。$f \circ h = i_B$ より $f(a) = f(h(b)) = b$。

**3. $g = h$。** 任意の $b \in B$ について、$f(h(b)) = b$ と $g \circ f = i_A$ を使うと

$$
g(b) = g(f(h(b))) = (g \circ f)(h(b)) = h(b) .
$$

**4. $g = h = f^{-1}$。** 1, 2 より $f$ は全単射なので、逆写像 $f^{-1}$ が存在する。任意の $b \in B$ について、$f^{-1}(b)$ は $f(a) = b$ を満たすただ 1 つの $a$ で、2 より $f(h(b)) = b$ だから $f^{-1}(b) = h(b)$。よって $h = f^{-1}$、3 と合わせて $g = h = f^{-1}$。
:::

1 は $g$ だけ、2 は $h$ だけを使っている。この 2 つを別々に取り出したのが 9 節の左逆写像・右逆写像。

## 4. 像と逆像

:::definition[像・逆像]{#def-image-preimage}
$A_0 \subseteq A$、$B_0 \subseteq B$ に対して

$$
\begin{aligned}
f(A_0) &= \{\, f(a) \mid a \in A_0 \,\} \\
f^{-1}(B_0) &= \{\, a \in A \mid f(a) \in B_0 \,\}
\end{aligned}
$$

をそれぞれ $A_0$ の**像**、$B_0$ の**逆像**という。
:::

逆像 $f^{-1}(B_0)$ は、$f$ が全単射でなくても、つまり逆写像 $f^{-1}$ が存在しなくても定義できる。記号は同じだが、ここでの $f^{-1}$ は「$B$ の部分集合に $A$ の部分集合を対応させる操作」で、逆写像ではない。

:::example[x² の逆像]{#ex-preimage}
$f \colon \mathbb{R} \to \mathbb{R}$、$f(x) = x^2$ は全単射でないので逆写像はないが、逆像は

$$
f^{-1}(\{4\}) = \{-2, 2\}
$$

と定まる。（補足）$f^{-1}(\{-1\}) = \varnothing$ のように、逆像が空になることもある。
:::

所属条件で書くと、次の 2 つが基本になる。以下の証明はすべて、これを使って元を取って示す。

$$
\begin{aligned}
b \in f(A_0) &\iff \exists a \in A_0:\ f(a) = b \\
a \in f^{-1}(B_0) &\iff f(a) \in B_0 \quad (a \in A)
\end{aligned}
$$

## 5. 像と逆像の基本関係

:::proposition[像と逆像の基本関係]{#prop-image-preimage source="Munkres, §2 演習 1"}
$A_0 \subseteq A$、$B_0 \subseteq B$ とする。

1. $A_0 \subseteq f^{-1}(f(A_0))$。$f$ が単射なら等号が成り立つ。
2. $f(f^{-1}(B_0)) \subseteq B_0$。$f$ が全射なら等号が成り立つ。
:::

:::proof{text=ai}
**1 の包含。** $a \in A_0$ とすると $f(a) \in f(A_0)$。逆像の定義より $a \in f^{-1}(f(A_0))$。

**1 の等号（$f$ が単射）。** $a \in f^{-1}(f(A_0))$ とすると $f(a) \in f(A_0)$ なので、ある $a_0 \in A_0$ が存在して $f(a) = f(a_0)$。単射性より $a = a_0 \in A_0$。

**2 の包含。** $b \in f(f^{-1}(B_0))$ とすると、ある $a \in f^{-1}(B_0)$ が存在して $b = f(a)$。逆像の定義より $f(a) \in B_0$、すなわち $b \in B_0$。

**2 の等号（$f$ が全射）。** $b \in B_0$ とする。全射性より、ある $a \in A$ が存在して $f(a) = b$。$f(a) = b \in B_0$ なので $a \in f^{-1}(B_0)$、よって $b = f(a) \in f(f^{-1}(B_0))$。
:::

:::example[等号が成り立たない例（補足）]{#ex-image-preimage-strict}
$f \colon \mathbb{R} \to \mathbb{R}$、$f(x) = x^2$（単射でも全射でもない）とする。

- $A_0 = [0, 1]$ なら $f(A_0) = [0, 1]$、$f^{-1}([0, 1]) = [-1, 1] \ne A_0$。
- $B_0 = [-1, 1]$ なら $f^{-1}(B_0) = [-1, 1]$、$f([-1, 1]) = [0, 1] \ne B_0$。
:::

## 6. 集合演算と像・逆像

### 逆像の性質

:::proposition[逆像と集合演算]{#prop-preimage-operations source="Munkres, §2 演習 2"}
$B_0, B_1 \subseteq B$ とする。

1. $B_0 \subseteq B_1 \implies f^{-1}(B_0) \subseteq f^{-1}(B_1)$
2. $f^{-1}(B_0 \cup B_1) = f^{-1}(B_0) \cup f^{-1}(B_1)$
3. $f^{-1}(B_0 \cap B_1) = f^{-1}(B_0) \cap f^{-1}(B_1)$
4. $f^{-1}(B_0 \setminus B_1) = f^{-1}(B_0) \setminus f^{-1}(B_1)$
:::

逆像では、すべて等号になる（1 は包含の保存）。

:::proof{text=ai}
**1.** $a \in f^{-1}(B_0)$ とすると $f(a) \in B_0 \subseteq B_1$ なので $a \in f^{-1}(B_1)$。

2〜4 は、$a \in A$ について同値変形で示す。各行は両向きに成り立つ。

**2.**

$$
\begin{aligned}
&a \in f^{-1}(B_0 \cup B_1) \\
\iff{}& f(a) \in B_0 \lor f(a) \in B_1 \\
\iff{}& a \in f^{-1}(B_0) \lor a \in f^{-1}(B_1) \\
\iff{}& a \in f^{-1}(B_0) \cup f^{-1}(B_1)
\end{aligned}
$$

**3.** 2 の $\lor$ を $\land$ に、$\cup$ を $\cap$ に置き換えれば同じ。

**4.**

$$
\begin{aligned}
&a \in f^{-1}(B_0 \setminus B_1) \\
\iff{}& f(a) \in B_0 \land f(a) \notin B_1 \\
\iff{}& a \in f^{-1}(B_0) \land a \notin f^{-1}(B_1) \\
\iff{}& a \in f^{-1}(B_0) \setminus f^{-1}(B_1)
\end{aligned}
$$

2 つ目の $\iff$ では、$a \in A$ について $a \notin f^{-1}(B_1) \iff f(a) \notin B_1$ を使った。
:::

### 像の性質

:::proposition[像と集合演算]{#prop-image-operations source="Munkres, §2 演習 2"}
$A_0, A_1 \subseteq A$ とする。

1. $A_0 \subseteq A_1 \implies f(A_0) \subseteq f(A_1)$
2. $f(A_0 \cup A_1) = f(A_0) \cup f(A_1)$
3. $f(A_0 \cap A_1) \subseteq f(A_0) \cap f(A_1)$。$f$ が単射なら等号が成り立つ。
4. $f(A_0) \setminus f(A_1) \subseteq f(A_0 \setminus A_1)$。$f$ が単射なら等号が成り立つ。
:::

:::proof{text=ai}
**1.** $b \in f(A_0)$ とすると、ある $a \in A_0$ が存在して $f(a) = b$。$a \in A_1$ なので $b \in f(A_1)$。

**2.** $b \in B$ について、「$\exists$」は「$\lor$」の上に分配できるので

$$
\begin{aligned}
&b \in f(A_0 \cup A_1) \\
\iff{}& \exists a:\ (a \in A_0 \lor a \in A_1) \land f(a) = b \\
\iff{}& (\exists a \in A_0:\ f(a) = b) \\
& \lor (\exists a \in A_1:\ f(a) = b) \\
\iff{}& b \in f(A_0) \cup f(A_1) .
\end{aligned}
$$

**3 の包含。** $b \in f(A_0 \cap A_1)$ とすると、ある $a \in A_0 \cap A_1$ が存在して $f(a) = b$。$a \in A_0$ より $b \in f(A_0)$、$a \in A_1$ より $b \in f(A_1)$。

**3 の等号（$f$ が単射）。** $b \in f(A_0) \cap f(A_1)$ とすると、ある $a_0 \in A_0$ と $a_1 \in A_1$ が存在して $f(a_0) = b = f(a_1)$。単射性より $a_0 = a_1$ なので $a_0 \in A_0 \cap A_1$、よって $b \in f(A_0 \cap A_1)$。

**4 の包含。** $b \in f(A_0) \setminus f(A_1)$ とすると、ある $a \in A_0$ が存在して $f(a) = b$。
もし $a \in A_1$ なら $b = f(a) \in f(A_1)$ となり、$b \notin f(A_1)$ に反する。よって $a \in A_0 \setminus A_1$ で、$b \in f(A_0 \setminus A_1)$。

**4 の等号（$f$ が単射）。** $b \in f(A_0 \setminus A_1)$ とすると、ある $a \in A_0 \setminus A_1$ が存在して $f(a) = b$。$a \in A_0$ より $b \in f(A_0)$。
もし $b \in f(A_1)$ なら、ある $a_1 \in A_1$ が存在して $f(a_1) = b = f(a)$。単射性より $a = a_1 \in A_1$ となり、$a \notin A_1$ に反する。よって $b \notin f(A_1)$ で、$b \in f(A_0) \setminus f(A_1)$。
:::

3 の包含の証明は、両辺の元が同じ $a$ から来ることしか使っていない。逆向きでは $a_0$ と $a_1$ が別の元かもしれず、それを同じにするのが単射性。

:::proof[4 の別証明：2・3 を使う]{text=ai}
**包含。** $A_0 = (A_0 \setminus A_1) \cup (A_0 \cap A_1)$ なので、2 と、$A_0 \cap A_1 \subseteq A_1$ に 1 を使うと

$$
\begin{aligned}
f(A_0) &= f(A_0 \setminus A_1) \cup f(A_0 \cap A_1) \\
&\subseteq f(A_0 \setminus A_1) \cup f(A_1) .
\end{aligned}
$$

$b \in f(A_0) \setminus f(A_1)$ なら、$b$ は右辺に属し、$b \notin f(A_1)$ なので $b \in f(A_0 \setminus A_1)$。

**等号（$f$ が単射）。** 3 の等号を $A_0 \setminus A_1$ と $A_1$ に使うと

$$
\begin{aligned}
f(A_0 \setminus A_1) \cap f(A_1) &= f((A_0 \setminus A_1) \cap A_1) \\
&= f(\varnothing) = \varnothing .
\end{aligned}
$$

また $A_0 \setminus A_1 \subseteq A_0$ に 1 を使うと $f(A_0 \setminus A_1) \subseteq f(A_0)$。
よって $f(A_0 \setminus A_1)$ の元は $f(A_0)$ に属し $f(A_1)$ に属さないので、$f(A_0 \setminus A_1) \subseteq f(A_0) \setminus f(A_1)$。
:::

### 反例

:::example[単射でないと等号が成り立たない例]{#ex-image-intersection}
$f \colon \mathbb{R} \to \mathbb{R}$、$f(x) = x^2$、$A_0 = [-1, 0]$、$A_1 = [0, 1]$ とする。$f(A_0) = f(A_1) = [0, 1]$ なので

$$
\begin{aligned}
f(A_0 \cap A_1) &= f(\{0\}) = \{0\} \\
f(A_0) \cap f(A_1) &= [0, 1]
\end{aligned}
$$

となり、3 の等号は成り立たない。

（補足）同じ $A_0, A_1$ で、4 の等号も成り立たない。

$$
\begin{aligned}
f(A_0) \setminus f(A_1) &= \varnothing \\
f(A_0 \setminus A_1) &= f([-1, 0)) = (0, 1]
\end{aligned}
$$
:::

$f(-1) = f(1)$ のように、$A_0$ の元と $A_1$ の元が同じ値をとるのが原因。単射ならこれが起こらない。

## 7. 任意個の集合族への一般化

$\{B_\lambda\}_{\lambda \in \Lambda}$ を $B$ の部分集合の族、$\{A_\lambda\}_{\lambda \in \Lambda}$ を $A$ の部分集合の族とする（[添字付けられた集合族](/math/families-of-sets#ex-indexed-family)）。
共通部分は、[集合族のノートの定義](/math/families-of-sets#def-family-union)どおり $\Lambda \ne \varnothing$ のときに考える。

:::proposition[任意個の和集合・共通部分]{#prop-arbitrary-families source="Munkres, §2 演習 3"}
1. $f^{-1}\left( \bigcup_{\lambda \in \Lambda} B_\lambda \right) = \bigcup_{\lambda \in \Lambda} f^{-1}(B_\lambda)$
2. $f^{-1}\left( \bigcap_{\lambda \in \Lambda} B_\lambda \right) = \bigcap_{\lambda \in \Lambda} f^{-1}(B_\lambda)$
3. $f\left( \bigcup_{\lambda \in \Lambda} A_\lambda \right) = \bigcup_{\lambda \in \Lambda} f(A_\lambda)$
4. $f\left( \bigcap_{\lambda \in \Lambda} A_\lambda \right) \subseteq \bigcap_{\lambda \in \Lambda} f(A_\lambda)$。$f$ が単射なら等号が成り立つ。
:::

和集合は「ある $\lambda$ について」（$\exists$）、共通部分は「すべての $\lambda$ について」（$\forall$）と所属条件を書き直して示す。

:::proof{text=ai}
**1.** $a \in A$ について

$$
\begin{aligned}
&a \in f^{-1}\left( \textstyle\bigcup_\lambda B_\lambda \right) \\
\iff{}& \exists \lambda \in \Lambda:\ f(a) \in B_\lambda \\
\iff{}& \exists \lambda \in \Lambda:\ a \in f^{-1}(B_\lambda) \\
\iff{}& a \in \textstyle\bigcup_\lambda f^{-1}(B_\lambda) .
\end{aligned}
$$

**2.** 1 の $\exists$ を $\forall$ に、$\bigcup$ を $\bigcap$ に置き換えれば同じ。

**3.** $b \in B$ について、2 つの $\exists$ は順番を入れ替えられるので

$$
\begin{aligned}
&b \in f\left( \textstyle\bigcup_\lambda A_\lambda \right) \\
\iff{}& \exists a:\ (\exists \lambda:\ a \in A_\lambda) \land f(a) = b \\
\iff{}& \exists \lambda:\ \exists a \in A_\lambda:\ f(a) = b \\
\iff{}& \exists \lambda:\ b \in f(A_\lambda) \\
\iff{}& b \in \textstyle\bigcup_\lambda f(A_\lambda) .
\end{aligned}
$$

**4 の包含。** $b \in f\left( \bigcap_\lambda A_\lambda \right)$ とすると、ある $a \in \bigcap_\lambda A_\lambda$ が存在して $f(a) = b$。
任意の $\lambda$ について $a \in A_\lambda$ なので $b \in f(A_\lambda)$。よって $b \in \bigcap_\lambda f(A_\lambda)$。

**4 の等号（$f$ が単射）。** $b \in \bigcap_\lambda f(A_\lambda)$ とする。$\Lambda \ne \varnothing$ なので $\lambda_0 \in \Lambda$ を 1 つとり、$b \in f(A_{\lambda_0})$ から $f(a) = b$ となる $a \in A_{\lambda_0}$ をとる。
任意の $\lambda \in \Lambda$ について、$b \in f(A_\lambda)$ より $f(a') = b$ となる $a' \in A_\lambda$ があり、$f(a') = f(a)$ と単射性から $a' = a$。よって $a \in A_\lambda$。
これがすべての $\lambda$ で成り立つので $a \in \bigcap_\lambda A_\lambda$、すなわち $b \in f\left( \bigcap_\lambda A_\lambda \right)$。
:::

4 の等号の証明で $\Lambda \ne \varnothing$ を使うのは、$a$ を最初に 1 つ決めるところ。

（補足）[空な集合族](/math/families-of-sets)の共通部分を全体集合と約束する流儀では、$\Lambda = \varnothing$ のとき 2 は $f^{-1}(B) = A$ で成り立つ。4 の等号は $f(A) = B$ となり、単射だけでは成り立たない（全射性が要る）。

## 8. 合成写像

以下、$f \colon A \to B$、$g \colon B \to C$ とする。

:::proposition[合成写像の逆像]{#prop-composition-preimage source="Munkres, §2 演習 4"}
$C_0 \subseteq C$ に対して

$$
(g \circ f)^{-1}(C_0) = f^{-1}(g^{-1}(C_0)) .
$$
:::

:::proof{text=ai}
$a \in A$ について

$$
\begin{aligned}
&a \in (g \circ f)^{-1}(C_0) \\
\iff{}& g(f(a)) \in C_0 \\
\iff{}& f(a) \in g^{-1}(C_0) \\
\iff{}& a \in f^{-1}(g^{-1}(C_0)) .
\end{aligned}
$$
:::

ここでの $f^{-1}, g^{-1}, (g \circ f)^{-1}$ はすべて 4 節の逆像で、逆写像が存在する必要はない。

:::theorem[合成と単射・全射]{#thm-composition source="Munkres, §2 演習 4"}
1. $f, g$ が単射なら、$g \circ f$ は単射。
2. $g \circ f$ が単射なら、$f$ は単射。
3. $f, g$ が全射なら、$g \circ f$ は全射。
4. $g \circ f$ が全射なら、$g$ は全射。
:::

:::proof{text=ai}
**1.** $g(f(a_1)) = g(f(a_2))$ とする。$g$ の単射性より $f(a_1) = f(a_2)$、$f$ の単射性より $a_1 = a_2$。

**2.** $f(a_1) = f(a_2)$ とすると $g(f(a_1)) = g(f(a_2))$。$g \circ f$ の単射性より $a_1 = a_2$。

**3.** $c \in C$ を任意にとる。$g$ の全射性より $g(b) = c$ となる $b \in B$ があり、$f$ の全射性より $f(a) = b$ となる $a \in A$ がある。このとき $(g \circ f)(a) = g(b) = c$。

**4.** $c \in C$ を任意にとる。$g \circ f$ の全射性より $g(f(a)) = c$ となる $a \in A$ がある。$b = f(a) \in B$ とおけば $g(b) = c$。
:::

2 で単射になるのは最初の $f$、4 で全射になるのは最後の $g$ で、もう一方については何も言えない。

:::example[合成が全単射でも g は単射でなく、f は全射でない]{#ex-composition-counterexample}
$A = \{1, 2\}$、$B = \{a, b, c\}$ とし、$f \colon A \to B$、$g \colon B \to A$ を

$$
\begin{aligned}
f(1) &= a, & f(2) &= b, \\
g(a) &= 1, & g(b) &= 2, & g(c) &= 2
\end{aligned}
$$

で定める（$C = A$）。$g(f(1)) = 1$、$g(f(2)) = 2$ なので $g \circ f = i_A$ で、これは全単射。

- $g(b) = g(c)$ だが $b \ne c$ なので、$g$ は単射でない。合成が単射でも、$g$ が単射とは限らない。
- $c \notin f(A) = \{a, b\}$ なので、$f$ は全射でない。合成が全射でも、$f$ が全射とは限らない。
:::

## 9. 左逆写像と右逆写像

:::definition[左逆写像・右逆写像]{#def-left-right-inverse}
$f \colon A \to B$ とする。

- $g \colon B \to A$ が $g \circ f = i_A$ を満たすとき、$g$ を $f$ の**左逆写像**という。
- $h \colon B \to A$ が $f \circ h = i_B$ を満たすとき、$h$ を $f$ の**右逆写像**という。
:::

:::proposition[左逆写像と単射、右逆写像と全射]{#prop-left-right-inverse source="Munkres, §2 演習 5"}
1. $f$ に左逆写像があれば、$f$ は単射。
2. $f$ に右逆写像があれば、$f$ は全射。
:::

:::proof{text=ai}
**1.** $g$ を左逆写像とする。$f(a_1) = f(a_2)$ なら $a_1 = g(f(a_1)) = g(f(a_2)) = a_2$。

**2.** $h$ を右逆写像とする。任意の $b \in B$ について、$a = h(b) \in A$ とおけば $f(a) = f(h(b)) = b$。
:::

8 節の定理で見ると、$g \circ f = i_A$ は単射なので 2 から $f$ は単射、$f \circ h = i_B$ は全射なので 4 から $f$ は全射、と読むこともできる。
[3 節の補題](#lem-2-1)は、この 2 つを合わせて、さらに $g = h = f^{-1}$ を示したもの。

:::example[左逆写像はあるが右逆写像はない]{#ex-left-inverse-only}
8 節の例の $f \colon \{1, 2\} \to \{a, b, c\}$、$f(1) = a$、$f(2) = b$ をもう一度使う。

- $g(a) = 1$、$g(b) = 2$、$g(c) = 2$ とすると $g \circ f = i_A$ なので、$g$ は $f$ の左逆写像。
- $f$ は全射でない（$c \notin f(A)$）。右逆写像があれば全射になるので、その[対偶](/math/propositional-logic#thm-contrapositive)により、$f$ に右逆写像はない。
:::

左逆写像は一意とは限らない。$g \circ f = i_A$ が決めるのは $f(A) = \{a, b\}$ の上の値 $g(a) = 1$、$g(b) = 2$ だけで、$c$ の行き先は自由に選べる。
たとえば $g'(a) = 1$、$g'(b) = 2$、$g'(c) = 1$ も左逆写像で、$g' \ne g$。

## 10. まとめ

- 写像の定義は、値の**存在**と**一意性**の 2 条件からなる。
- 単射は、異なる入力が同じ出力にならない性質。
- 全射は、終域のすべての元に対応する入力が存在する性質。
- 逆像は、単射性・全射性がなくても（逆写像がなくても）定義できる。
- 逆像は、任意個の和集合と共通部分を保存する（差集合も保存する）。
- 像は任意個の和集合を保存するが、共通部分については一般に包含関係だけが成り立つ。
- 単射性を仮定すると、像と共通部分・差集合についても等号が成り立つ。
- 合成写像が単射なら最初の写像が単射、全射なら最後の写像が全射。
- 左逆写像は単射性に、右逆写像は全射性に対応する。
