---
title: "有理数の稠密性"
description: "任意の 2 つの実数の間に有理数があることを、アルキメデスの性質から示す。有理数を端点とする開区間と実数の通常の位相との関係。"
topic: real-numbers
order: 2
status: understood
createdAt: 2026-11-08
tags:
  - real-numbers
  - basis
---

:::remark[このノートの書き方]
実数の通常の位相が、有理数を端点とする開区間全体

$$
\mathcal{B} = \{\, (p, q) \mid p, q \in \mathbb{Q},\ p < q \,\}
$$

によって生成されることを証明しようとして、有理数の稠密性が必要になった。2 節の証明は自分で組み立てたもの。
証明に書いていなかった細かい確認を補った箇所には **（補足）** と付けた。
:::

## 1. 使う性質

:::theorem[アルキメデスの性質]{#thm-archimedean ref=integers-reals#thm-archimedean}
任意の実数 $r$ に対して、$n > r$ を満たす自然数 $n$ が存在する。
:::

このノートでは証明せずに使う。証明は[整数と実数のノート](/math/integers-reals#thm-archimedean)にある。

## 2. 有理数の稠密性

:::theorem[有理数の稠密性]{#thm-rational-density}
任意の実数 $a, b$ に対して

$$
a < b \implies \exists\, q \in \mathbb{Q},\quad a < q < b .
$$
:::

:::proof{origin=self}
$a < b$ とする。$b - a > 0$ なので、[アルキメデスの性質](#thm-archimedean)より

$$
n > \frac{1}{b - a}
$$

を満たす自然数 $n$ が存在する。したがって $n(b - a) > 1$、すなわち

$$
na + 1 < nb
$$

となる。ここで $na$ より大きい最小の整数を $m$ とすると

$$
na < m \le na + 1
$$

が成り立つ。よって

$$
na < m \le na + 1 < nb
$$

となる。$n > 0$ なので

$$
a < \frac{m}{n} < b
$$

を得る。$m \in \mathbb{Z}$、$n \in \mathbb{N}$ なので $\dfrac{m}{n} \in \mathbb{Q}$。

したがって、任意の実数 $a < b$ の間に有理数が存在する。
:::

:::remark[整数 m について（補足）]
証明の中の $m$ には、次の 2 つの確認が隠れている。

- **$m$ が存在すること。** 整数の集合 $S = \{\, k \in \mathbb{Z} \mid k > na \,\}$ は、アルキメデスの性質より空でない。
  またアルキメデスの性質を $-na$ に使うと、$k_0 \le na$ を満たす整数 $k_0$ があり、$S$ の元はどれも $k_0$ より大きい。
  下に有界な空でない整数の集合には最小元があるので、$m = \min S$ が取れる。
- **$m \le na + 1$ であること。** $m$ は $S$ の最小元なので $m - 1 \notin S$、すなわち $m - 1 \le na$。

つまり、この証明はアルキメデスの性質を $n$ を取るところと $m$ を取るところの 2 か所で使っている。
:::

## 3. 有理数を端点とする開区間との関係

:::proposition{#prop-rational-interval}
実数 $x$ と開区間 $(a, b)$ について $a < x < b$ ならば、

$$
a < p < x < q < b
$$

を満たす有理数 $p, q$ が存在する。したがって

$$
x \in (p, q) \subseteq (a, b), \qquad (p, q) \in \mathcal{B} .
$$
:::

:::proof
$a < x$ に定理を使って $a < p < x$ を満たす $p \in \mathbb{Q}$ を、$x < b$ に定理を使って $x < q < b$ を満たす $q \in \mathbb{Q}$ を取る（2 つに分けて使うことを明示したのは補足）。
このとき $a < p < x < q < b$ で、$p < q$ だから $(p, q) \in \mathcal{B}$。$(p, q)$ の元 $y$ は $a < p < y < q < b$ を満たすので $(p, q) \subseteq (a, b)$。
:::

どんな開区間 $(a, b)$ のどの点 $x$ のまわりにも、$x$ を含み $(a, b)$ に収まる $\mathcal{B}$ の元が見つかる。
有理数を端点とする開区間全体が実数の通常の位相の基底になることを示すときに、これが重要な性質になる。

## 4. 続き

このノートで示したのは 3 節の命題まで。
3 節の命題を使って $\mathcal{B}$ が生成する位相と通常の位相が一致することを示した証明は、[位相の基底と生成される位相](/math/basis#thm-rational-generates) に書いた。
