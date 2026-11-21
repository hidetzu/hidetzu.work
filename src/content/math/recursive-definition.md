---
title: "再帰的定義"
aliases:
  - "recursive definition"
  - "principle of recursive definition"
description: "再帰式で与えた規則が、正の整数全体で定義された写像を一意に定めることを示す。有限切片の上で写像を作り、それらが共通部分で一致することを確かめ、対応規則の和集合で貼り合わせる。"
topic: set-theory
order: 9
status: studying
createdAt: 2026-11-21
related:
  - functions
  - finite-sets
  - integers-reals
  - cartesian-product
tags:
  - set-theory
  - munkres
sources:
  - title: "James R. Munkres, Topology, 2nd ed."
    location: "Chapter 1, §8 The Principle of Recursive Definition"
    note: "1 節の図、2 節の準備、5 節は参考文献の範囲外の補足"
textbook:
  chapter: 1
  section: 8
---

以下、$n \in \mathbb{Z}_{+}$ に対して $\{1, \dots, n\} = \{\, k \in \mathbb{Z}_{+} \mid k \le n \,\}$ と書き、これを**有限切片**と呼ぶ。
また $S_i = \{\, k \in \mathbb{Z}_{+} \mid k < i \,\}$ と書く（[整数と実数のノート](/math/integers-reals#thm-strong-induction)と同じ記法）。$S_1 = \varnothing$ であり、$i > 1$ なら $S_i = \{1, \dots, i-1\}$ である。
写像は[直積の部分集合](/math/functions#def-function)（対応規則）として扱い、制限は[写像のノート](/math/functions#def-restriction-composition)の定義を使う。

「$h(1)$ を決め、$h(i)$ を $h(1), \dots, h(i-1)$ から決める」という再帰式は、規則を書いただけでは、その規則を満たす写像 $h \colon \mathbb{Z}_{+} \to C$ が存在することも、1 つに決まることも保証しない。
このノートでは、再帰式を満たす写像が存在して一意であることを、有限切片の上で写像を作り、それらを貼り合わせることで示す。

## 1. 何をするのか

証明に入る前に、全体の流れを図で示す。図は証明の代わりではなく、証明が何を組み立てているかを見るための補助である。

### 有限切片の上で作る

まず、各 $n$ について、$\{1, \dots, n\}$ の上だけで再帰式を満たす写像 $f_n$ を作る。$f_{n+1}$ は $f_n$ に $n+1$ での値を 1 つ足したものとして作れる（[補題 8.1](#lem-8-1)）。

<figure class="math-figure" id="fig-finite-stages">
<svg viewBox="0 0 360 214" role="img" aria-labelledby="fig-finite-stages-title" xmlns="http://www.w3.org/2000/svg">
<title id="fig-finite-stages-title">f1、f2、f3 を、前の写像に値を 1 つ足して順に作る図</title>
<g class="math-figure-lines">
<rect x="70" y="16" width="64" height="34" rx="6" style="stroke: var(--accent)"/>
<rect x="70" y="88" width="64" height="34" rx="6"/>
<rect x="142" y="88" width="64" height="34" rx="6" style="stroke: var(--accent)"/>
<rect x="70" y="160" width="64" height="34" rx="6"/>
<rect x="142" y="160" width="64" height="34" rx="6"/>
<rect x="214" y="160" width="64" height="34" rx="6" style="stroke: var(--accent)"/>
<path d="M102 56 V82 M97 77 L102 82 L107 77"/>
<path d="M102 128 V154 M97 149 L102 154 L107 149"/>
</g>
<g class="math-figure-text">
<text x="32" y="38" class="strong">f₁</text>
<text x="32" y="110" class="strong">f₂</text>
<text x="32" y="182" class="strong">f₃</text>
<text x="102" y="38" class="accent">1 ↦ c₁</text>
<text x="102" y="110">1 ↦ c₁</text>
<text x="174" y="110" class="accent">2 ↦ c₂</text>
<text x="102" y="182">1 ↦ c₁</text>
<text x="174" y="182">2 ↦ c₂</text>
<text x="246" y="182" class="accent">3 ↦ c₃</text>
<text x="318" y="38" class="muted">{1}</text>
<text x="318" y="110" class="muted">{1, 2}</text>
<text x="318" y="182" class="muted">{1, 2, 3}</text>
<text x="190" y="74" class="muted">前の値はそのまま</text>
</g>
</svg>
<figcaption>枠が強調されたものが、その段階で新しく足した値。前の段階の値は変えない。</figcaption>
</figure>

### 貼り合わせて全体の写像にする

各 $f_n$ の対応規則 $R_n \subseteq \{1, \dots, n\} \times C$ を、すべて $\mathbb{Z}_{+} \times C$ の部分集合と見て、和集合 $U = \bigcup_{n} R_n$ をとる。
異なる $n$ の $f_n$ は共通の定義域で値が一致する（[補題 8.2](#lem-8-2)）ので、$U$ の中で 1 つの $i$ に 2 つの値が対応することはない。こうして、有限の情報を貼り合わせた $U$ が、$h \colon \mathbb{Z}_{+} \to C$ の対応規則になる。

<figure class="math-figure" id="fig-gluing">
<svg viewBox="0 0 360 214" role="img" aria-labelledby="fig-gluing-title" xmlns="http://www.w3.org/2000/svg">
<title id="fig-gluing-title">対応規則 R1、R2、R3 の和集合 U が h の対応規則になる図</title>
<g class="math-figure-lines">
<path d="M60 150 H340"/>
<rect x="56" y="160" width="288" height="36" rx="6" style="stroke: var(--accent)"/>
</g>
<g class="math-figure-text">
<text x="30" y="34" class="strong">R₁</text>
<text x="30" y="74" class="strong">R₂</text>
<text x="30" y="114" class="strong">R₃</text>
<text x="96" y="34">(1, c₁)</text>
<text x="96" y="74">(1, c₁)</text>
<text x="166" y="74">(2, c₂)</text>
<text x="96" y="114">(1, c₁)</text>
<text x="166" y="114">(2, c₂)</text>
<text x="236" y="114">(3, c₃)</text>
<text x="306" y="114" class="muted">⋯</text>
<text x="30" y="183" class="accent">U</text>
<text x="96" y="183" class="accent">(1, c₁)</text>
<text x="166" y="183" class="accent">(2, c₂)</text>
<text x="236" y="183" class="accent">(3, c₃)</text>
<text x="306" y="183" class="accent">⋯</text>
</g>
</svg>
<figcaption>同じ列の順序対はどの Rₙ でも同じ（補題 8.2）。和集合 U では、各 i に値がちょうど 1 つ対応する。</figcaption>
</figure>

### 制限写像を ρ に入れる

一般の再帰式 $h(i) = \rho\bigl(h|_{S_i}\bigr)$ では、$h$ を作ったあとで、$h|_{S_i}$ と $f_i|_{S_i}$ が写像として同じものであることを確かめる。
同じものを $\rho$ に入れれば同じ値が出るので、$f_i$ が満たす再帰式が $h$ にも移る（[定理 8.4](#thm-8-4) の証明の (b)・(c)）。

<figure class="math-figure" id="fig-restriction">
<svg viewBox="0 0 360 226" role="img" aria-labelledby="fig-restriction-title" xmlns="http://www.w3.org/2000/svg">
<title id="fig-restriction-title">h の制限と f の制限が同じ写像なので、rho に入れた値も同じになる図</title>
<g class="math-figure-lines">
<rect x="20" y="16" width="130" height="58" rx="8"/>
<rect x="210" y="16" width="130" height="58" rx="8"/>
<rect x="140" y="118" width="80" height="36" rx="8" style="stroke: var(--accent)"/>
<path d="M85 80 L170 112 M163 106 L170 112 L162 115"/>
<path d="M275 80 L190 112 M198 115 L190 112 L197 106"/>
<path d="M180 160 V184 M175 179 L180 184 L185 179"/>
</g>
<g class="math-figure-text">
<text x="85" y="40" class="strong">h|<tspan dy="4" font-size="11">D</tspan></text>
<text x="85" y="62" class="muted">D → C</text>
<text x="275" y="40" class="strong">f<tspan dy="4" font-size="11">i</tspan><tspan dy="-4">|</tspan><tspan dy="4" font-size="11">D</tspan></text>
<text x="275" y="62" class="muted">D → C</text>
<text x="180" y="50" class="accent">=</text>
<text x="180" y="141" class="accent">ρ</text>
<text x="180" y="206">h(i) = f<tspan dy="4" font-size="10">i</tspan><tspan dy="-4">(i) = ρ(f</tspan><tspan dy="4" font-size="10">i</tspan><tspan dy="-4">|</tspan><tspan dy="4" font-size="10">D</tspan><tspan dy="-4">) = ρ(h|</tspan><tspan dy="4" font-size="10">D</tspan><tspan dy="-4">)</tspan></text>
</g>
</svg>
<figcaption>D = {1, …, i−1}。D の各点で h と f<sub>i</sub> の値が一致するので、2 つの制限は集合 F（4 節）の同じ元であり、ρ に入れた値も同じになる。</figcaption>
</figure>

## 2. 準備

この節で使う、写像・直積・有限集合についての基本的な事実をまとめる。

:::lemma[写像の相等]{#lem-function-equality}
$f, g \colon A \to B$ が、任意の $a \in A$ について $f(a) = g(a)$ を満たすならば、$f = g$（対応規則として等しい）。
:::

:::proof{origin=ai}
$f = \{\, (a, f(a)) \mid a \in A \,\}$ を示す。$(a, b) \in f$ ならば、$f(a)$ の定め方（[写像の定義](/math/functions#def-function)の一意性）より $b = f(a)$ である。逆に $a \in A$ について $(a, f(a)) \in f$ である。$g$ についても同様に $g = \{\, (a, g(a)) \mid a \in A \,\}$ である。
仮定より $f(a) = g(a)$ なので、2 つの集合は等しく、$f = g$ である。
:::

:::lemma[直積の単調性]{#lem-product-monotone}
$A \subseteq A'$、$B \subseteq B'$ ならば $A \times B \subseteq A' \times B'$。
:::

:::proof{origin=ai}
$(a, b) \in A \times B$ とすると、[直積の定義](/math/cartesian-product#def-cartesian-product)より $a \in A \subseteq A'$、$b \in B \subseteq B'$ なので、$(a, b) \in A' \times B'$ である。
:::

特に、写像 $f \colon \{1, \dots, n\} \to C$ の対応規則は $\{1, \dots, n\} \times C \subseteq \mathbb{Z}_{+} \times C$ に含まれるので、$\mathbb{Z}_{+} \times C$ の部分集合と見なせる。

:::lemma[無限集合から有限集合を除いても空にならない]{#lem-infinite-minus-finite}
$C$ を無限集合、$F$ を有限集合とすると、$C \setminus F \ne \varnothing$。
:::

:::proof{origin=ai}
$C \setminus F = \varnothing$ と仮定すると $C \subseteq F$ である。[有限集合の部分集合は有限](/math/finite-sets#cor-6-6)なので $C$ は有限となり、$C$ が無限であることに矛盾する。
:::

:::lemma[有限切片の像は有限]{#lem-finite-image}
$f \colon \{1, \dots, n\} \to C$ ならば、$f(\{1, \dots, n\})$ は有限集合である。
:::

:::proof{origin=ai}
$k \mapsto f(k)$ は $\{1, \dots, n\}$ から $f(\{1, \dots, n\})$ への全射であり、$f(\{1, \dots, n\})$ は $f(1)$ を含むので空でない。
[有限であることの言い換え](/math/finite-sets#cor-6-7)の (2) ⇒ (1) より、$f(\{1, \dots, n\})$ は有限である。
:::

## 3. 特別な場合：最小元を順に選ぶ

この節では、$C$ を $\mathbb{Z}_{+}$ の無限部分集合とし、次の再帰式を考える。

$$
(*)\quad
\begin{cases}
h(1) = C \text{ の最小元}, \\
h(i) = C \setminus h(S_i) \text{ の最小元} \quad (i > 1).
\end{cases}
$$

$h(1), h(2), \dots$ は、$C$ の元を小さい順に選んでいったものになる。
有限切片 $\{1, \dots, n\}$ 上の写像 $f$ について「$f$ が $(*)$ を満たす」とは、$(*)$ の $h$ を $f$ に置き換えた式が、すべての $i \in \{1, \dots, n\}$ について成り立つことをいう。

:::lemma[有限切片の上で $(*)$ を満たす写像の存在]{#lem-8-1 source="Munkres, Lemma 8.1"}
任意の $n \in \mathbb{Z}_{+}$ について、$(*)$ を満たす写像 $f \colon \{1, \dots, n\} \to C$ が存在する。
:::

:::proof{origin=ai}
$(*)$ を満たす写像 $\{1, \dots, n\} \to C$ が存在するような $n \in \mathbb{Z}_{+}$ 全体を $A$ とし、$n$ についての[数学的帰納法](/math/integers-reals#thm-induction)で $A = \mathbb{Z}_{+}$ を示す。

**基底。** $\varnothing$ は有限なので、無限集合 $C$ は空でない。[整列性](/math/integers-reals#thm-well-ordering)より $C$ は最小元 $c_1$ をもつ。$f = \{(1, c_1)\}$ は $\{1\}$ から $C$ への写像で、$f(1) = c_1$ だから $(*)$ を満たす。よって $1 \in A$。

**帰納法のステップ。** $n \in A$ とし、$f \colon \{1, \dots, n\} \to C$ を $(*)$ を満たす写像とする。

1. [有限切片の像は有限](#lem-finite-image)なので、$f(\{1, \dots, n\})$ は有限である。$C$ は無限なので、[無限集合から有限集合を除いても空にならない](#lem-infinite-minus-finite)ことから $C \setminus f(\{1, \dots, n\}) \ne \varnothing$ である。これは $\mathbb{Z}_{+}$ の空でない部分集合なので、整列性より最小元 $c$ をもつ。
2. $g = f \cup \{(n+1, c)\}$ とおく。$f \subseteq \{1, \dots, n\} \times C$ と[直積の単調性](#lem-product-monotone)より $g \subseteq \{1, \dots, n+1\} \times C$ である。$k \le n$ には $f$ の値がちょうど 1 つ、$n+1$ には $c$ がちょうど 1 つ対応するので、$g$ は写像 $\{1, \dots, n+1\} \to C$ であり、$k \le n$ なら $g(k) = f(k)$、$g(n+1) = c$ である。
3. $g$ が $(*)$ を満たすことを確かめる。
   - $g(1) = f(1) = C$ の最小元。
   - $1 < i \le n$ のとき、$S_i \subseteq \{1, \dots, n\}$ の各点で $g$ と $f$ の値は等しいので $g(S_i) = f(S_i)$。よって $g(i) = f(i) = C \setminus f(S_i)$ の最小元 $= C \setminus g(S_i)$ の最小元。
   - $i = n+1$ のとき、$n + 1 > 1$ であり、$S_{n+1} = \{1, \dots, n\}$ なので $g(S_{n+1}) = f(\{1, \dots, n\})$。よって $g(n+1) = c = C \setminus g(S_{n+1})$ の最小元。

したがって $n + 1 \in A$ であり、$A = \mathbb{Z}_{+}$ である。
:::

:::lemma[$(*)$ を満たす有限切片上の写像は共通部分で一致する]{#lem-8-2 source="Munkres, Lemma 8.2"}
$f \colon \{1, \dots, n\} \to C$ と $g \colon \{1, \dots, m\} \to C$ がともに $(*)$ を満たすならば、$n$ と $m$ の小さいほうを $p$ として、すべての $i \in \{1, \dots, p\}$ について $f(i) = g(i)$。
:::

:::proof{origin=ai}
背理法で示す。$f(i) \ne g(i)$ となる $i \in \{1, \dots, p\}$ があると仮定する。そのような $i$ 全体は $\mathbb{Z}_{+}$ の空でない部分集合なので、[整列性](/math/integers-reals#thm-well-ordering)より最小元 $j$（最小の反例）をもつ。

- $j = 1$ はありえない。$f(1)$ も $g(1)$ も $C$ の最小元だからである。
- $j > 1$ とする。$j$ の最小性より、$k < j$ ならば $f(k) = g(k)$ なので、$f(S_j) = g(S_j)$ である。すると
  $$
  f(j) = C \setminus f(S_j) \text{ の最小元} = C \setminus g(S_j) \text{ の最小元} = g(j)
  $$
  となり、$f(j) \ne g(j)$ に矛盾する。

よって、すべての $i \in \{1, \dots, p\}$ について $f(i) = g(i)$ である。
:::

この「整合性」が、次の定理で有限切片上の写像を貼り合わせるときの要になる。$m = n$ とすれば、$\{1, \dots, n\}$ 上で $(*)$ を満たす写像はただ 1 つであることも分かる（[写像の相等](#lem-function-equality)）。

:::theorem[$(*)$ を満たす写像の存在と一意性]{#thm-8-3 source="Munkres, Theorem 8.3"}
$C$ を $\mathbb{Z}_{+}$ の無限部分集合とする。すべての $i \in \mathbb{Z}_{+}$ について $(*)$ を満たす写像 $h \colon \mathbb{Z}_{+} \to C$ がただ 1 つ存在する。
:::

:::proof{origin=ai}
**有限切片上の写像。** 各 $n \in \mathbb{Z}_{+}$ について、[補題 8.1](#lem-8-1) より $(*)$ を満たす $f \colon \{1, \dots, n\} \to C$ が存在し、[補題 8.2](#lem-8-2)（$m = n$ の場合）と[写像の相等](#lem-function-equality)より、それはただ 1 つである。これを $f_n$ とし、その対応規則を $R_n$ と書く（$R_n = f_n$）。

**$R_n$ と $U$ が $\mathbb{Z}_{+} \times C$ の部分集合であること。** $R_n \subseteq \{1, \dots, n\} \times C$ であり、$\{1, \dots, n\} \subseteq \mathbb{Z}_{+}$ なので、[直積の単調性](#lem-product-monotone)より $R_n \subseteq \mathbb{Z}_{+} \times C$ である。そこで
$$
U = \bigcup_{n \in \mathbb{Z}_{+}} R_n = \{\, p \in \mathbb{Z}_{+} \times C \mid \text{ある } n \in \mathbb{Z}_{+} \text{ について } p \in R_n \,\}
$$
とおく。すべての $R_n$ が同じ集合 $\mathbb{Z}_{+} \times C$ の部分集合なので、$U$ はその部分集合として定まる。

**$U$ が写像 $\mathbb{Z}_{+} \to C$ の対応規則であること。** [写像の定義](/math/functions#def-function)の 2 条件を確かめる。

- **存在。** $i \in \mathbb{Z}_{+}$ とする。$i \in \{1, \dots, i\}$ なので $(i, f_i(i)) \in R_i \subseteq U$。よって第 1 成分が $i$ である $U$ の元が存在する。
- **一意性。** $(i, c), (i, c') \in U$ とする。ある $n, m$ について $(i, c) \in R_n$、$(i, c') \in R_m$ である。$R_n \subseteq \{1, \dots, n\} \times C$ より $i \le n$ かつ $c = f_n(i)$、同様に $i \le m$ かつ $c' = f_m(i)$ である。$i$ は $n$ と $m$ の小さいほう以下なので、[補題 8.2](#lem-8-2) より $f_n(i) = f_m(i)$、すなわち $c = c'$。

この写像を $h \colon \mathbb{Z}_{+} \to C$ とする（$h = U$）。

**$i \le n$ ならば $h(i) = f_n(i)$。** $i \le n$ なら $(i, f_n(i)) \in R_n \subseteq U = h$ であり、$h$ の値は一意なので $h(i) = f_n(i)$。

**$h$ が $(*)$ を満たすこと。**

- $h(1) = f_1(1) = C$ の最小元。
- $i > 1$ とする。$k \in S_i$ なら $k < i$ なので $h(k) = f_i(k)$。よって $h(S_i) = f_i(S_i)$ であり、$f_i$ が $(*)$ を満たすことから
  $$
  h(i) = f_i(i) = C \setminus f_i(S_i) \text{ の最小元} = C \setminus h(S_i) \text{ の最小元}.
  $$

**一意性。** $h, h' \colon \mathbb{Z}_{+} \to C$ がともに $(*)$ を満たすとし、$h(i) \ne h'(i)$ となる $i$ があると仮定する。その最小元を $j$ とすると、$j = 1$ なら両辺とも $C$ の最小元で矛盾。$j > 1$ なら $k < j$ で $h(k) = h'(k)$ なので $h(S_j) = h'(S_j)$、よって $h(j) = h'(j)$ となり矛盾。したがってすべての $i$ で $h(i) = h'(i)$ であり、[写像の相等](#lem-function-equality)より $h = h'$。
:::

## 4. 再帰的定義の原理

3 節では、「前の値たちを除いた残りの最小元」という特定の規則を扱った。規則の中身は証明でほとんど使っていない。使ったのは、

- $h(1)$ が決まっていること
- $h(i)$ が、$h$ の $S_i$ 上の値だけから決まること

の 2 点である。これを抽象化すると、「前の値たちから次の値を決める」一般の原理になる。

:::definition[有限切片から C への写像全体]{#def-section-functions}
$C$ を集合とする。ある $n \in \mathbb{Z}_{+}$ について $\{1, \dots, n\}$ から $C$ への写像であるもの全体を $\mathcal{F}$ と書く。
:::

各写像 $\{1, \dots, n\} \to C$ の対応規則は $\mathbb{Z}_{+} \times C$ の部分集合なので、$\mathcal{F}$ は $\mathcal{P}(\mathbb{Z}_{+} \times C)$ の部分集合として定まる。

:::theorem[再帰的定義の原理]{#thm-8-4 source="Munkres, Theorem 8.4"}
$C$ を集合、$a_0 \in C$、$\rho \colon \mathcal{F} \to C$ を写像とする。次を満たす写像 $h \colon \mathbb{Z}_{+} \to C$ がただ 1 つ存在する。

$$
(**)\quad
\begin{cases}
h(1) = a_0, \\
h(i) = \rho\bigl(h|_{S_i}\bigr) \quad (i > 1).
\end{cases}
$$
:::

$i > 1$ なら $S_i = \{1, \dots, i-1\}$ は有限切片なので、$h|_{S_i}$ は $\mathcal{F}$ の元であり、$\rho$ に入れられる（証明の (a)）。
有限切片上の写像 $f \colon \{1, \dots, n\} \to C$ が「$(**)$ を満たす」とは、$f(1) = a_0$ と、$1 < i \le n$ について $f(i) = \rho\bigl(f|_{S_i}\bigr)$ が成り立つことをいう。ここでも $f|_{S_i}$ は $\{1, \dots, i-1\} \to C$ の写像なので $\mathcal{F}$ の元である。

証明は[定理 8.3](#thm-8-3) と同じ形で、次の 5 段階からなる。

1. 各有限切片 $\{1, \dots, n\}$ 上で $(**)$ を満たす写像 $f_n$ を作る（[存在](#lem-8-4-exists)）
2. それらが共通の定義域で一致する（[整合性](#lem-8-4-agree)）
3. 対応規則の和集合から $h$ を作る
4. $h$ が $(**)$ を満たすことを示す
5. 一意性を示す

:::lemma[有限切片の上で $(**)$ を満たす写像の存在]{#lem-8-4-exists}
任意の $n \in \mathbb{Z}_{+}$ について、$(**)$ を満たす写像 $f \colon \{1, \dots, n\} \to C$ が存在する。
:::

:::proof{origin=ai}
$n$ についての[数学的帰納法](/math/integers-reals#thm-induction)で示す。

**基底。** $f = \{(1, a_0)\}$ は $\{1\} \to C$ の写像で、$f(1) = a_0$ だから $(**)$ を満たす。

**帰納法のステップ。** $f \colon \{1, \dots, n\} \to C$ が $(**)$ を満たすとする。$f$ は $\{1, \dots, n\}$ から $C$ への写像なので $f \in \mathcal{F}$ であり、$\rho(f) \in C$ が定まる。
$g = f \cup \{(n+1, \rho(f))\}$ とおくと、[補題 8.1](#lem-8-1) の証明の 2 と同じ理由で、$g$ は写像 $\{1, \dots, n+1\} \to C$ であり、$k \le n$ なら $g(k) = f(k)$、$g(n+1) = \rho(f)$ である。

- $g(1) = f(1) = a_0$。
- $1 < i \le n$ のとき、$g|_{S_i}$ と $f|_{S_i}$ はどちらも $\{1, \dots, i-1\} \to C$ の写像で、各点 $k$ で $g(k) = f(k)$ なので、[写像の相等](#lem-function-equality)より $g|_{S_i} = f|_{S_i}$。$\rho$ は写像なので、等しい元での値は等しい。よって $g(i) = f(i) = \rho\bigl(f|_{S_i}\bigr) = \rho\bigl(g|_{S_i}\bigr)$。
- $i = n+1$ のとき、$S_{n+1} = \{1, \dots, n\}$ で、同じ理由により $g|_{S_{n+1}} = f$。よって $g(n+1) = \rho(f) = \rho\bigl(g|_{S_{n+1}}\bigr)$。

したがって $g$ は $(**)$ を満たす。
:::

:::lemma[$(**)$ を満たす有限切片上の写像は共通部分で一致する]{#lem-8-4-agree}
$f \colon \{1, \dots, n\} \to C$ と $g \colon \{1, \dots, m\} \to C$ がともに $(**)$ を満たすならば、$n$ と $m$ の小さいほうを $p$ として、すべての $i \in \{1, \dots, p\}$ について $f(i) = g(i)$。
:::

:::proof{origin=ai}
$f(i) \ne g(i)$ となる $i \in \{1, \dots, p\}$ があると仮定し、その最小元を $j$ とする（[整列性](/math/integers-reals#thm-well-ordering)）。

- $j = 1$ はありえない。$f(1) = g(1) = a_0$ だからである。
- $j > 1$ とする。$j$ の最小性より、$k < j$ で $f(k) = g(k)$ である。$f|_{S_j}$ と $g|_{S_j}$ はどちらも $\{1, \dots, j-1\} \to C$ の写像で各点の値が等しいので、[写像の相等](#lem-function-equality)より $f|_{S_j} = g|_{S_j}$。よって $f(j) = \rho\bigl(f|_{S_j}\bigr) = \rho\bigl(g|_{S_j}\bigr) = g(j)$ となり矛盾する。

よって、すべての $i \in \{1, \dots, p\}$ について $f(i) = g(i)$ である。
:::

:::proof{origin=ai for=thm-8-4}
**1. 有限切片上の写像。** 各 $n$ について、[存在](#lem-8-4-exists)と[整合性](#lem-8-4-agree)（$m = n$ の場合）、[写像の相等](#lem-function-equality)より、$(**)$ を満たす $f_n \colon \{1, \dots, n\} \to C$ がただ 1 つある。その対応規則を $R_n$ とする。

**2・3. 貼り合わせ。** [定理 8.3](#thm-8-3) の証明と同じく、[直積の単調性](#lem-product-monotone)より $R_n \subseteq \mathbb{Z}_{+} \times C$ であり、$U = \bigcup_{n} R_n \subseteq \mathbb{Z}_{+} \times C$ とおく。

- 存在：$i \in \mathbb{Z}_{+}$ について $(i, f_i(i)) \in R_i \subseteq U$。
- 一意性：$(i, c) \in R_n$、$(i, c') \in R_m$ なら $c = f_n(i)$、$c' = f_m(i)$ で、[整合性](#lem-8-4-agree)より $c = c'$。

よって $U$ は写像 $h \colon \mathbb{Z}_{+} \to C$ の対応規則であり、$i \le n$ なら $(i, f_n(i)) \in U$ と値の一意性から $h(i) = f_n(i)$ である。

**4. $h$ が $(**)$ を満たすこと。**

**(d) 初期条件。** $h(1) = f_1(1) = a_0$。

以下 $i > 1$ とし、$D = S_i = \{1, \dots, i-1\}$ とおく。

**(a) $h|_D \in \mathcal{F}$。** 上で示したとおり $h$ は $\mathbb{Z}_{+}$ から $C$ への写像として確定している。$D \subseteq \mathbb{Z}_{+}$ なので、[制限](/math/functions#def-restriction-composition) $h|_D \colon D \to C$、$h|_D(k) = h(k)$ が写像として定まる。$i - 1 \ge 1$ なので $D$ は有限切片 $\{1, \dots, i-1\}$ であり、$\mathcal{F}$ の定義より $h|_D \in \mathcal{F}$ である。同様に $f_i|_D \in \mathcal{F}$ である。

**(b) $h|_D = f_i|_D$。** 2 つはどちらも定義域 $D$、終域 $C$ の写像である。$k \in D$ とすると $k \le i$ なので、上で示したことから $h(k) = f_i(k)$。よって
$$
h|_D(k) = h(k) = f_i(k) = f_i|_D(k) \quad (k \in D)
$$
であり、[写像の相等](#lem-function-equality)より $h|_D = f_i|_D$。すなわち、2 つは $\mathcal{F}$ の同じ元である。

**(c) $h(i) = \rho(h|_D)$。** $\rho$ は $\mathcal{F}$ 上の写像なので、(b) の等しい 2 つの元での値は等しい：$\rho(f_i|_D) = \rho(h|_D)$。$f_i$ は $(**)$ を満たし $1 < i \le i$ なので $f_i(i) = \rho(f_i|_D)$。$h(i) = f_i(i)$ と合わせて
$$
h(i) = f_i(i) = \rho\bigl(f_i|_D\bigr) = \rho\bigl(h|_D\bigr).
$$

**5. 一意性。** $h, h' \colon \mathbb{Z}_{+} \to C$ がともに $(**)$ を満たすとし、$h(i) \ne h'(i)$ となる $i$ の最小元を $j$ とする。$j = 1$ なら両方 $a_0$ で矛盾。$j > 1$ なら、$k < j$ で $h(k) = h'(k)$ なので、(b) と同じ理由で $h|_{S_j} = h'|_{S_j}$、よって $h(j) = \rho(h|_{S_j}) = \rho(h'|_{S_j}) = h'(j)$ となり矛盾。したがって $h = h'$（[写像の相等](#lem-function-equality)）。
:::

:::remark
[定理 8.3](#thm-8-3) は定理 8.4 の特別な場合である。$C$ を $\mathbb{Z}_{+}$ の無限部分集合、$a_0 = C$ の最小元とし、$f \in \mathcal{F}$（定義域 $\{1, \dots, n\}$）に対して
$$
\rho(f) = C \setminus f(\{1, \dots, n\}) \text{ の最小元}
$$
とおく。[有限切片の像は有限](#lem-finite-image)で、[無限集合から有限集合を除いても空にならない](#lem-infinite-minus-finite)ので、右辺の集合は空でなく、整列性より最小元が 1 つに決まる。よって $\rho \colon \mathcal{F} \to C$ は写像であり、$(**)$ は $(*)$ と同じ式になる。
:::

## 5. 理解のポイント

1. **再帰式は、見た目だけでは写像の存在を保証しない。** 規則を書いただけでは、その規則を満たす写像があるか、1 つに決まるかは分からない。存在と一意性を別に示す必要がある。
2. **有限切片で作ってから貼り合わせる。** 各 $\{1, \dots, n\}$ 上の写像 $f_n$ は帰納法で作れる。全体の写像 $h$ は、対応規則の和集合 $U = \bigcup_n R_n$ として得る（[図](#fig-gluing)）。
3. **貼り合わせができるのは整合性があるから。** $U$ が写像の一意性を満たすのは、$f_n$ と $f_m$ が共通の定義域で一致する（[補題 8.2](#lem-8-2)、[整合性](#lem-8-4-agree)）からである。
4. **一般形では、制限写像が本当に $\rho$ に入れられることを確かめる。** $h|_{S_i}$ が $\mathcal{F}$ の元であること（(a)）、それが $f_i|_{S_i}$ と写像として等しいこと（(b)）を確かめて、はじめて $\rho$ の値が一致すると言える（[図](#fig-restriction)）。
