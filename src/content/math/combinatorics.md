---
title: "二項係数とパスカルの公式"
aliases:
  - "combinatorics"
  - "binomial coefficients"
  - "Pascal's rule"
description: "二項係数の定義と範囲外を 0 とする約束、パスカルの公式とその場合分けの図、冪集合を要素の個数で分けて数える二重計数、二項係数の和が 2^n になることの数学的帰納法による証明。"
topic: combinatorics
order: 1
status: studying
createdAt: 2026-11-15
related:
  - power-set
tags:
  - combinatorics
---

## 1. 二項係数

:::definition[二項係数]{#def-binomial}
$n$ を非負整数、$k$ を整数とする。$0 \le k \le n$ のとき、$n$ 個の異なる要素から $k$ 個を選ぶ組み合わせの数（$n$ 個の要素をもつ集合の、$k$ 個の要素をもつ部分集合の個数）を

$$
\binom{n}{k}
$$

と書き、**二項係数**という。$k < 0$ または $k > n$ のときは

$$
\binom{n}{k} = 0
$$

と約束する。
:::

範囲外を $0$ とする約束は、「$k$ 個の要素をもつ部分集合の個数」という意味とも合っている。$n$ 個の要素をもつ集合には、要素の個数が負のものや $n$ より多いものはないからである。

$0 \le k \le n$ のときは、階乗を使って

$$
\binom{n}{k} = \frac{n!}{k!\,(n-k)!}
$$

と書ける（$0! = 1$）。たとえば $\binom{n}{0} = \binom{n}{n} = 1$、$\binom{4}{2} = \dfrac{4!}{2!\,2!} = 6$ である。

## 2. パスカルの公式

:::theorem[パスカルの公式]{#thm-pascal}
$n$ を非負整数とする。すべての整数 $k$ について

$$
\binom{n+1}{k} = \binom{n}{k} + \binom{n}{k-1}
$$

が成り立つ。
:::

よく見る形は $1 \le k \le n$ の場合である。[1 節の約束](#def-binomial)のもとでは、境界の $k = 0$ と $k = n + 1$ でも成り立つ。

- $k = 0$：$\binom{n+1}{0} = 1$、右辺は $\binom{n}{0} + \binom{n}{-1} = 1 + 0$
- $k = n + 1$：$\binom{n+1}{n+1} = 1$、右辺は $\binom{n}{n+1} + \binom{n}{n} = 0 + 1$

$k < 0$ と $k > n + 1$ では、両辺とも $0$ である。

### 場合分けによる説明

$n + 1$ 個の要素から $k$ 個を選ぶとき、特定の要素 $a$ を 1 つ決めて、$a$ を選ぶかどうかで分ける。

- $a$ を選ばない：残りの $n$ 個から $k$ 個を選ぶので $\binom{n}{k}$ 通り
- $a$ を選ぶ：残りの $n$ 個から、$a$ 以外の $k - 1$ 個を選ぶので $\binom{n}{k-1}$ 通り

どの選び方もちょうど一方の場合に入る（2 つの場合は重ならず、すべての選び方を尽くす）ので、総数は両者の和になる。

<figure class="math-figure" id="fig-pascal">
<svg viewBox="0 0 360 266" role="img" aria-labelledby="pascal-figure-title" xmlns="http://www.w3.org/2000/svg">
<title id="pascal-figure-title">n+1 個から k 個を選ぶ方法を、特定の要素 a を選ぶかどうかで 2 つに分ける図</title>
<g class="math-figure-lines">
<path d="M180 32 V48 M180 66 V82 M90 82 H270 M90 82 V98 M270 82 V98"/>
<path d="M90 188 V208 M270 188 V208 M90 208 H270 M180 208 V228"/>
</g>
<g class="math-figure-text">
<text x="180" y="24">n+1 個から k 個を選ぶ</text>
<text x="180" y="62" class="muted">特定の要素 a に注目</text>
<text x="90" y="118" class="strong">a を選ばない</text>
<text x="90" y="142">残りの n 個から</text>
<text x="90" y="160">k 個を選ぶ</text>
<text x="90" y="182" class="accent">C(n, k)</text>
<text x="270" y="118" class="strong">a を選ぶ</text>
<text x="270" y="142">残りの n 個から</text>
<text x="270" y="160">k−1 個を選ぶ</text>
<text x="270" y="182" class="accent">C(n, k−1)</text>
<text x="180" y="252" class="accent">C(n+1, k) = C(n, k) + C(n, k−1)</text>
</g>
</svg>
<figcaption>C(n, k) は 1 節の二項係数を表す。2 つの場合は重ならず、合わせるとすべての選び方になる。</figcaption>
</figure>

## 3. 冪集合との関係

$A$ を $n$ 個の要素をもつ集合とする。$A$ の部分集合全体の個数は、[冪集合の要素の個数](/math/power-set#prop-power-set-size)から $|\mathcal{P}(A)| = 2^n$ である。

一方、$A$ の部分集合を要素の個数 $k$（$k = 0, 1, \dots, n$）で分けると、$k$ 個の要素をもつ部分集合は $\binom{n}{k}$ 個ある。どの部分集合も、ちょうど 1 つの $k$ に入る。これを $k$ について足すと、部分集合全体の個数になる。

同じ集合 $\mathcal{P}(A)$ を 2 通りに数えたので、2 つの結果は等しい。

$$
\sum_{k=0}^{n} \binom{n}{k} = 2^n
$$

このように、同じ対象を異なる方法で数えて等式を得る方法を**二重計数**という。

:::example[$n = 3$ の場合]{#ex-sum-3}
$A = \{1, 2, 3\}$ の部分集合を要素の個数で分けると、$0, 1, 2, 3$ 個のものがそれぞれ $1, 3, 3, 1$ 個ある。

$$
\binom{3}{0} + \binom{3}{1} + \binom{3}{2} + \binom{3}{3} = 1 + 3 + 3 + 1 = 8 = 2^3
$$
:::

## 4. 数学的帰納法による証明

同じ等式を、[パスカルの公式](#thm-pascal)を使って数学的帰納法でも示す。

:::proposition[二項係数の和]{#prop-binomial-sum}
任意の非負整数 $n$ に対して

$$
\sum_{k=0}^{n} \binom{n}{k} = 2^n
$$

が成り立つ。
:::

:::proof{origin=self}
**基底段階**　$n = 0$ のとき

$$
\sum_{k=0}^{0} \binom{0}{k} = \binom{0}{0} = 1 = 2^0
$$

よって成り立つ。

**帰納法の仮定**　ある非負整数 $n$ に対して

$$
\sum_{k=0}^{n} \binom{n}{k} = 2^n
$$

が成り立つと仮定する。

**帰納段階**　[パスカルの公式](#thm-pascal)より

$$
\begin{aligned}
\sum_{k=0}^{n+1} \binom{n+1}{k}
&= \sum_{k=0}^{n+1} \left( \binom{n}{k} + \binom{n}{k-1} \right) \\
&= \sum_{k=0}^{n+1} \binom{n}{k} + \sum_{k=0}^{n+1} \binom{n}{k-1}
\end{aligned}
$$

ここで、[範囲外の二項係数の約束](#def-binomial)から

$$
\binom{n}{-1} = \binom{n}{n+1} = 0
$$

なので、添字を整理すると

$$
\begin{aligned}
\sum_{k=0}^{n+1} \binom{n+1}{k}
&= \sum_{k=0}^{n} \binom{n}{k} + \sum_{k=0}^{n} \binom{n}{k} \\
&= 2^n + 2^n \\
&= 2^n (1 + 1) \\
&= 2^{n+1}
\end{aligned}
$$

よって、数学的帰納法により命題が成り立つ。
:::

ここで示したのは、二項係数の和についての等式である。二項定理

$$
(x + y)^n = \sum_{k=0}^{n} \binom{n}{k} x^k y^{n-k}
$$

そのものを示したわけではない。この等式は、二項定理で $x = y = 1$ とした場合にあたる。

## 5. 要点

- 二項係数 $\binom{n}{k}$ は、$n$ 個から $k$ 個を選ぶ組み合わせの数を表す。範囲外は $0$ と約束する。
- パスカルの公式は、特定の要素を選ぶか選ばないかで場合分けすると理解できる。範囲外を $0$ とする約束のもとで、境界の項でも成り立つ。
- 冪集合の要素の個数は、要素の個数ごとの部分集合の個数を合計しても求められる（二重計数）。
- $\sum_{k=0}^{n} \binom{n}{k} = 2^n$ は、二重計数と数学的帰納法の両方で示せる。
- 帰納法では、パスカルの公式と、境界の項が $0$ になることを使った添字の整理が要になる。
