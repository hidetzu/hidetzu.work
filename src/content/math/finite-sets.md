---
title: "有限集合（Finite Sets）"
description: "有限集合と濃度を全単射で定義し、有限集合が真部分集合と全単射で対応しないこと、濃度の一意性、有限であることの言い換え、部分集合・和集合・直積の有限性を示す。"
topic: set-theory
order: 8
status: understood
createdAt: 2026-11-15
updatedAt: 2026-11-17
related:
  - functions
tags:
  - set-theory
  - munkres
sources:
  - title: "James R. Munkres, Topology, 2nd ed."
    location: "Chapter 1, §6 Finite Sets"
textbook:
  chapter: 1
  section: 6
---

以下、$n \in \mathbb{Z}_{+}$ に対して $\{1, \dots, n\} = \{\, k \in \mathbb{Z}_{+} \mid k \le n \,\}$ と書く（[整数と実数のノート](/math/integers-reals#thm-well-ordering)と同じ記法）。
全単射・制限・合成は[写像のノート](/math/functions#def-injective-surjective)の定義を使う。

このノートでは、「要素の個数が有限である」ことを全単射で定義し、そこから有限集合の基本的な性質を導く。
中心になるのは、有限集合はその真部分集合と全単射で対応しないという性質である。ここから、要素の個数（濃度）が数え方によらず 1 つに定まることや、部分集合・和集合・直積が有限であることが従う。

## 1. 有限集合と濃度

:::definition[有限集合・濃度]{#def-finite}
集合 $A$ が**有限**であるとは、次のどちらかが成り立つことをいう。

- $A = \varnothing$ である
- ある $n \in \mathbb{Z}_{+}$ について、$A$ から $\{1, \dots, n\}$ への全単射が存在する

$A = \varnothing$ のとき $A$ の**濃度**は $0$、$A$ から $\{1, \dots, n\}$ への全単射が存在するとき $A$ の濃度は $n$ であるという。有限でない集合を**無限**であるという。
:::

この定義だけでは、濃度が 1 つに定まるかどうかは分からない。$A$ から $\{1, \dots, n\}$ への全単射と、$A$ から $\{1, \dots, m\}$ への全単射が、$n \ne m$ で両方存在するかもしれないからである。
数え上げの経験からは明らかに思えるが、定義からすぐには出てこないので、証明が必要である（[濃度の一意性](#cor-6-5)）。
2〜4 節は、そのための準備である。

## 2. 要素を 1 つ取り除く

:::lemma[要素を 1 つ取り除いた集合]{#lem-6-1 source="Munkres, Lemma 6.1"}
$n \in \mathbb{Z}_{+}$、$A$ を集合、$a_0 \in A$ とする。次の 2 つは同値である。

- $A$ から $\{1, \dots, n+1\}$ への全単射が存在する。
- $A \setminus \{a_0\}$ から $\{1, \dots, n\}$ への全単射が存在する。

:::

:::proof{origin=self text=ai note="本人の証明の要点から Claude が文章にした。本人の証明と同じか照合中"}
**（⇒）** $f \colon A \to \{1, \dots, n+1\}$ を全単射とする。

**場合 1：$f(a_0) = n + 1$ のとき。** $f$ の[制限](/math/functions#def-restriction-composition) $g = f|_{A \setminus \{a_0\}}$ を考える。
$a \in A \setminus \{a_0\}$ なら $a \ne a_0$ で、$f$ は単射だから $f(a) \ne f(a_0) = n + 1$。よって $g(a) \in \{1, \dots, n\}$ であり、$g \colon A \setminus \{a_0\} \to \{1, \dots, n\}$ と見なせる。

- $g$ は単射 $f$ の制限なので単射である。
- $k \in \{1, \dots, n\}$ をとる。$f$ は全射なので $f(a) = k$ となる $a \in A$ がある。$k \ne n + 1 = f(a_0)$ より $a \ne a_0$、すなわち $a \in A \setminus \{a_0\}$ で $g(a) = k$。よって $g$ は全射である。

したがって $g$ は全単射である。

**場合 2：$f(a_0) = m \ne n + 1$ のとき。** $f$ は全射なので、$f(a_1) = n + 1$ となる $a_1 \in A$ がある。$f(a_0) \ne n + 1$ より $a_1 \ne a_0$ である。
$a_0$ と $a_1$ の像を交換して、$h \colon A \to \{1, \dots, n+1\}$ を

$$
h(a) =
\begin{cases}
n + 1 & (a = a_0) \\
m & (a = a_1) \\
f(a) & (\text{それ以外})
\end{cases}
$$

で定める。$h$ が全単射であることを確かめる。$\{1, \dots, n+1\}$ の上で $m$ と $n + 1$ を入れ替え、ほかの元は動かさない写像を $\tau$ とする。
$\tau \circ \tau$ は恒等写像なので、[左右の逆写像と全単射の補題](/math/functions#lem-2-1) より $\tau$ は全単射である。
$f$ は単射なので、値 $m$、$n + 1$ をとるのはそれぞれ $a_0$、$a_1$ だけであり、$a \ne a_0, a_1$ なら $f(a)$ は $\tau$ で動かない。よって $h = \tau \circ f$ であり、全単射の合成なので（[合成と単射・全射](/math/functions#thm-composition)）、$h$ は全単射である。
さらに $h(a_0) = n + 1$ なので、場合 1 を $h$ に使えば、$A \setminus \{a_0\}$ から $\{1, \dots, n\}$ への全単射が得られる。

**（⇐）** $g \colon A \setminus \{a_0\} \to \{1, \dots, n\}$ を全単射とする。$f \colon A \to \{1, \dots, n+1\}$ を

$$
f(a) =
\begin{cases}
n + 1 & (a = a_0) \\
g(a) & (a \ne a_0)
\end{cases}
$$

で定めて、$g$ を $A$ 全体に拡張する。

- 単射：$a \ne a_0$ の値は $g$ の値で $\{1, \dots, n\}$ に入り、互いに異なる（$g$ が単射）。$f(a_0) = n + 1$ はそれらのどれとも異なる。
- 全射：$k \in \{1, \dots, n\}$ は $g$ の全射性から $f$ の値になり、$n + 1 = f(a_0)$ も値になる。

よって $f$ は全単射である。
:::

## 3. 有限集合の真部分集合

:::theorem[有限集合の真部分集合]{#thm-6-2 source="Munkres, Theorem 6.2"}
$n \in \mathbb{Z}_{+}$ とし、$A$ から $\{1, \dots, n\}$ への全単射が存在するとする。$B \subsetneq A$ とすると、次が成り立つ。

1. $B$ から $\{1, \dots, n\}$ への全単射は存在しない。
2. $B \ne \varnothing$ ならば、ある $m < n$ について、$B$ から $\{1, \dots, m\}$ への全単射が存在する。
:::

:::proof{origin=self text=ai note="本人の証明の要点から Claude が文章にした。本人の証明と同じか照合中"}
$n$ についての[数学的帰納法](/math/integers-reals#thm-induction)で示す。

**基底段階：$n = 1$。** $A$ から $\{1\}$ への全単射があるので、$A$ はちょうど 1 つの元からなる。その真部分集合 $B$ は $\varnothing$ だけである。
$\varnothing$ から $\{1\}$ への写像は全射にならないので、1 は成り立つ。$B = \varnothing$ なので、2 は仮定を満たす $B$ がなく成り立つ。

**帰納段階。** $n$ について定理が成り立つと仮定する。$A$ から $\{1, \dots, n+1\}$ への全単射が存在し、$B \subsetneq A$ とする。

$B = \varnothing$ のときは、$\varnothing$ から $\{1, \dots, n+1\}$ への写像は全射にならないので 1 が成り立ち、2 は仮定を満たさないので成り立つ。

以下 $B \ne \varnothing$ とし、$a_0 \in B$、$a_1 \in A \setminus B$ をとる。

- [要素を 1 つ取り除く補題](#lem-6-1) より、$A \setminus \{a_0\}$ から $\{1, \dots, n\}$ への全単射が存在する。
- $B \setminus \{a_0\} \subsetneq A \setminus \{a_0\}$ である。実際、包含は $B \subseteq A$ から従う。また $a_0 \in B$、$a_1 \notin B$ より $a_1 \ne a_0$ なので、$a_1 \in A \setminus \{a_0\}$ だが $a_1 \notin B \setminus \{a_0\}$ である。

よって、$A \setminus \{a_0\}$ と $B \setminus \{a_0\}$ に帰納法の仮定を使える。

**1 の証明。** $B$ から $\{1, \dots, n+1\}$ への全単射が存在したとする。$a_0 \in B$ なので、[要素を 1 つ取り除く補題](#lem-6-1) より $B \setminus \{a_0\}$ から $\{1, \dots, n\}$ への全単射が存在する。
これは帰納法の仮定の 1 に矛盾する。

**2 の証明。**

- $B \setminus \{a_0\} = \varnothing$ のとき、$B = \{a_0\}$ で、$a_0 \mapsto 1$ は $B$ から $\{1\}$ への全単射である。$1 < n + 1$ である。
- $B \setminus \{a_0\} \ne \varnothing$ のとき、帰納法の仮定の 2 より、ある $m < n$ について $B \setminus \{a_0\}$ から $\{1, \dots, m\}$ への全単射が存在する。
  $a_0 \in B$ なので、[要素を 1 つ取り除く補題](#lem-6-1) より $B$ から $\{1, \dots, m+1\}$ への全単射が存在し、$m + 1 < n + 1$ である。

以上より、$n + 1$ についても定理が成り立つ。
:::

:::remark[この証明の要点]
帰納法の仮定は「濃度 $n$ の集合と、その**真**部分集合」についての主張なので、要素を 1 つ取り除いたあとも真部分集合の関係が保たれている必要がある。
$a_0$ を $B$ から選び、$B$ の外の元 $a_1$ を残しておくことで、$B \setminus \{a_0\} \subsetneq A \setminus \{a_0\}$ が保たれる。
:::

## 4. 真部分集合との全単射

:::corollary[真部分集合とは全単射で対応しない]{#cor-6-3 source="Munkres, Corollary 6.3"}
$A$ を有限集合とすると、$A$ からその真部分集合への全単射は存在しない。
:::

:::proof{origin=self text=ai note="本人の証明の要点から Claude が文章にした。本人の証明と同じか照合中"}
$A = \varnothing$ なら真部分集合が存在しないので、主張は成り立つ。

$A \ne \varnothing$ とし、全単射 $g \colon A \to \{1, \dots, n\}$ をとる。$B \subsetneq A$ とし、全単射 $f \colon A \to B$ が存在したとする。
$f^{-1} \colon B \to A$ は全単射である（$f \circ f^{-1}$ と $f^{-1} \circ f$ が恒等写像なので、[左右の逆写像と全単射の補題](/math/functions#lem-2-1) を $f^{-1}$ に使う）。
全単射の合成は全単射なので（[合成と単射・全射](/math/functions#thm-composition)）、

$$
g \circ f^{-1} \colon B \to \{1, \dots, n\}
$$

は全単射である。これは [有限集合の真部分集合の定理](#thm-6-2) の 1 に矛盾する。
:::

## 5. 有限集合の基本的な性質

:::corollary[正の整数全体は無限集合]{#cor-6-4 source="Munkres, Corollary 6.4"}
$\mathbb{Z}_{+}$ は有限ではない。
:::

:::proof{origin=self text=ai note="本人の手書きの証明の構成から Claude が文章にした。本人の証明と同じか照合中"}
$\mathbb{Z}_{+}$ が有限であると仮定する。$f \colon \mathbb{Z}_{+} \to \mathbb{Z}_{+} \setminus \{1\}$ を $f(n) = n + 1$ で定める。この写像は全単射である。

$1 \in \mathbb{Z}_{+}$ かつ $1 \notin \mathbb{Z}_{+} \setminus \{1\}$ なので、$\mathbb{Z}_{+} \setminus \{1\}$ は $\mathbb{Z}_{+}$ の真部分集合である。
よって $f$ は有限集合 $\mathbb{Z}_{+}$ からその真部分集合への全単射であり、[真部分集合と全単射で対応しないこと](#cor-6-3) に矛盾する。したがって $\mathbb{Z}_{+}$ は無限集合である。
:::

[真部分集合と全単射で対応しないこと](#cor-6-3) と並べると、「真部分集合と全単射で対応できるかどうか」が有限と無限を分けていることが分かる。

:::corollary[濃度の一意性]{#cor-6-5 source="Munkres, Corollary 6.5"}
有限集合の濃度は一意に定まる。
:::

:::proof{origin=self text=ai note="本人の手書きの証明の構成から Claude が文章にした。本人の証明と同じか照合中"}
$A = \varnothing$ のとき、濃度は定義により $0$ である（$n \in \mathbb{Z}_{+}$ なら $\{1, \dots, n\}$ は空でないので、$\varnothing$ からの全射は存在しない）。

$A \ne \varnothing$ とし、$A$ が異なる 2 つの濃度をもつと仮定する。小さい方を $m$、大きい方を $n$ とすると $m < n$ で、全単射

$$
f \colon A \to \{1, \dots, n\}, \qquad g \colon A \to \{1, \dots, m\}
$$

がある。$f$ の逆写像 $f^{-1} \colon \{1, \dots, n\} \to A$ を使って、合成写像

$$
h = g \circ f^{-1} \colon \{1, \dots, n\} \to \{1, \dots, m\}
$$

を作る。$h$ が全単射であることを確かめる。

- 全射：$k \in \{1, \dots, m\}$ をとる。$g$ は全射なので、$g(a) = k$ となる $a \in A$ がある。$j = f(a)$ とおくと $j \in \{1, \dots, n\}$、$f^{-1}(j) = a$ なので、$h(j) = g(a) = k$ である。
- 単射：$h(i) = h(j)$ とする。$g$ は単射なので $f^{-1}(i) = f^{-1}(j)$、$f^{-1}$ は単射なので $i = j$ である。

$m < n$ なので、$\{1, \dots, m\}$ は $\{1, \dots, n\}$ の真部分集合である（$n$ を含まない）。また $\{1, \dots, n\}$ は恒等写像によって有限である。
よって $h$ は有限集合からその真部分集合への全単射であり、[真部分集合と全単射で対応しないこと](#cor-6-3) に矛盾する。したがって有限集合の濃度は一意に定まる。
:::

これにより、有限集合の要素の個数は、どの全単射を選んで数えても変わらない。

:::corollary[有限集合の部分集合]{#cor-6-6 source="Munkres, Corollary 6.6"}
有限集合の部分集合は有限である。真部分集合ならば、その濃度は元の集合の濃度より小さい。
:::

:::proof{origin=self text=ai note="本人の手書きの証明の構成から Claude が文章にした。本人の証明と同じか照合中"}
$A$ を有限集合、$B \subseteq A$ とする。次の 3 つの場合に分ける。

1. $B = \varnothing$ のとき：空集合は有限である。
2. $B = A$ のとき：仮定より有限である。
3. $B \subsetneq A$ かつ $B \ne \varnothing$ のとき：$A$ の濃度を $n$ とすると、[有限集合の真部分集合の定理](#thm-6-2) の 2 により、ある $m < n$ について全単射 $B \to \{1, \dots, m\}$ が存在する。

したがって $B$ は有限である。また、場合 3 の $m < n$ より、真部分集合の濃度は $A$ の濃度より小さい。
:::

:::corollary[有限であることの言い換え]{#cor-6-7 source="Munkres, Corollary 6.7"}
$B$ を空でない集合とすると、次の 3 つは同値である。

1. $B$ は有限である。
2. ある $n \in \mathbb{Z}_{+}$ について、$\{1, \dots, n\}$ から $B$ への全射が存在する。
3. ある $n \in \mathbb{Z}_{+}$ について、$B$ から $\{1, \dots, n\}$ への単射が存在する。
:::

:::proof{origin=self text=ai note="本人の手書きの証明の構成から Claude が文章にした。本人の証明と同じか照合中"}
**(1) ⇒ (2)** $B$ は空でない有限集合なので、全単射 $g \colon B \to \{1, \dots, n\}$ がある。その逆写像

$$
g^{-1} \colon \{1, \dots, n\} \to B
$$

は全射である。

**(2) ⇒ (3)** 全射 $f \colon \{1, \dots, n\} \to B$ が存在するとする。
任意の $b \in B$ に対して、$f$ の全射性より、[逆像](/math/functions#def-image-preimage) $f^{-1}(\{b\})$ は空でない。
$f^{-1}(\{b\})$ は $\mathbb{Z}_{+}$ の空でない部分集合なので、[整列性](/math/integers-reals#thm-well-ordering)により最小元をもつ。そこで $g \colon B \to \{1, \dots, n\}$ を

$$
g(b) = \min f^{-1}(\{b\})
$$

で定める。ここで $f^{-1}(\{b\})$ は 1 点集合 $\{b\}$ の逆像であり、$f$ の逆写像ではない（$f$ は単射とは限らないので、逆写像は一般には存在しない）。

異なる $b_1, b_2 \in B$ に対して、逆像 $f^{-1}(\{b_1\})$ と $f^{-1}(\{b_2\})$ は互いに素であるため、それぞれの最小元も異なる。したがって $g$ は単射である。

**(3) ⇒ (1)** 単射 $f \colon B \to \{1, \dots, n\}$ が存在するとする。
像 $f(B)$ は有限集合 $\{1, \dots, n\}$ の部分集合なので、[有限集合の部分集合が有限であること](#cor-6-6) より有限である。
終域を像に制限した $f \colon B \to f(B)$ は全単射となる。したがって $B$ は有限である。
:::

:::remark[この証明の要点]
全射から単射を作るとき、各 $b$ の逆像から 1 つの元を選ぶ必要がある。逆像は $\mathbb{Z}_{+}$ の空でない部分集合なので、整列性によって最小元という決まった 1 つを選べる。
:::

:::corollary[有限集合の和集合と直積]{#cor-6-8 source="Munkres, Corollary 6.8"}
有限集合の有限個の和集合は有限である。有限集合の有限個の直積は有限である。
:::

:::attempt{origin=self text=ai note="本人の手書きの証明の構成から Claude が文章にした。本人の証明と同じか照合中"}
**2 つの有限集合の和集合。** 有限集合 $A, B$ がともに空でないとする。[有限であることの言い換え](#cor-6-7) の (1) ⇒ (2) より、全射 $f \colon \{1, \dots, m\} \to A$ と $g \colon \{1, \dots, n\} \to B$ がある。写像 $h \colon \{1, \dots, m+n\} \to A \cup B$ を

$$
h(i) =
\begin{cases}
f(i) & (1 \le i \le m) \\
g(i - m) & (m + 1 \le i \le m + n)
\end{cases}
$$

で定める。$h$ は全射なので、[有限であることの言い換え](#cor-6-7) より $A \cup B$ は有限である。

どちらかが空集合の場合は、別に扱う（未記述）。

**有限個の和集合。** 有限集合 $A_1, \dots, A_n$ について、$n$ に関する[数学的帰納法](/math/integers-reals#thm-induction)で示す。
$n = 1$ のときは自明である。$n - 1$ 個の有限集合の和集合が有限であると仮定すると、

$$
\bigcup_{i=1}^{n} A_i = \left( \bigcup_{i=1}^{n-1} A_i \right) \cup A_n
$$

の右辺は 2 つの有限集合の和集合なので、有限である。

**有限個の直積。** 未記述。
:::

## 学習記録

- 各主張の横に、参考文献の Munkres §6 での番号を示した。
- 証明は、本人の手書きの証明（またはその要点）を Claude が文章にしたもので、本人の証明と同じかを照合中である（各証明の出どころに記した）。
- 参考文献の §6 の演習は未着手である。
