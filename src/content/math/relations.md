---
title: "関係"
description: "集合上の関係。同値関係と同値類、同値類の性質、集合の分割と同値関係の対応。順序関係は未学習。"
topic: set-theory
order: 7
status: studying
createdAt: 2026-11-11
updatedAt: 2026-11-12
related:
  - cartesian-product
  - families-of-sets
  - functions
tags:
  - set-theory
  - munkres
sources:
  - title: "James R. Munkres, Topology, 2nd ed."
    location: "Chapter 1, Relations"
---

:::remark[このノートの書き方]
Munkres の Chapter 1 の Relations（関係）のうち、これまでに学んだ同値関係の内容を整理したもの。
命題 1〜5 の証明は、手書きで取り組んだ証明の流れをそのまま残して書き直したもの。命題 6 は自分で証明したあと、証明の文章を Claude が書いた。レビューの段階で補った説明には **（補足）** と付けた。
順序関係はまだ学んでいないので、見出しだけを置いている。
:::

学習状況：

- 関係・同値関係・同値類・分割の定義：確認済み
- 命題 1〜5：手書きで証明済み
- 命題 6（分割から作った同値類が元の分割の元に一致すること）：自分で証明済み
- 順序関係：未学習

## 1. 関係

:::definition[関係]{#def-relation}
集合 $A$ 上の**関係**とは、[直積](/math/cartesian-product#def-cartesian-product) $A \times A$ の部分集合

$$
R \subseteq A \times A
$$

のこと。$(x, y) \in R$ を $x \mathrel{R} y$ と書き、「$x$ と $y$ は関係 $R$ にある」と読む。
:::

（補足）より一般に、集合 $A, B$ について $R \subseteq A \times B$ を $A$ から $B$ への関係という。
[写像](/math/functions#def-function) $f \colon A \to B$ は、値の存在と一意性を満たす特別な関係になっている。

## 2. 同値関係

### 同値関係の定義

:::definition[同値関係]{#def-equivalence}
集合 $A$ 上の関係 $\sim$ が次の 3 条件を満たすとき、$\sim$ を**同値関係**という。

1. **反射律**：任意の $x \in A$ について $x \sim x$。
2. **対称律**：任意の $x, y \in A$ について $x \sim y \implies y \sim x$。
3. **推移律**：任意の $x, y, z \in A$ について $x \sim y \land y \sim z \implies x \sim z$。
   :::

- 反射律：どの元も自分自身と関係にある。
- 対称律：関係にあるかどうかは、2 つの元の順番によらない。
- 推移律：$x$ と $y$、$y$ と $z$ が関係にあれば、$y$ を経由して $x$ と $z$ も関係にある。

### 同値類

:::definition[同値類]{#def-equivalence-class}
$\sim$ を $A$ 上の同値関係とする。$a \in A$ に対して

$$
[a] = \{\, x \in A \mid x \sim a \,\}
$$

を $a$ の**同値類**という。
:::

以下、自然数は $\mathbb{N} = \{1, 2, 3, \dots\}$ とし、$x \bmod n$ は $x$ を $n$ で割った余りを表す。

:::example[mod 2]{#ex-mod-2}
$\mathbb{N}$ 上で

$$
x \sim y \iff x \bmod 2 = y \bmod 2
$$

とすると、同値類は奇数全体と偶数全体の 2 つに分かれる。

$$
\begin{aligned}
[1] &= \{1, 3, 5, \dots\} \\
[2] &= \{2, 4, 6, \dots\}
\end{aligned}
$$

:::

:::example[mod 3]{#ex-mod-3}
$\mathbb{N}$ 上で

$$
x \sim y \iff x \bmod 3 = y \bmod 3
$$

とすると、同値類は余りが $1, 2, 0$ の 3 つになる。

$$
\begin{aligned}
[1] &= \{1, 4, 7, \dots\} \\
[2] &= \{2, 5, 8, \dots\} \\
[3] &= \{3, 6, 9, \dots\}
\end{aligned}
$$

:::

（補足）たとえば mod 3 では $[4] = [1]$ のように、同じ同値類を表す元はいくつもある。この理由が命題 3。

### 同値類の性質と証明

:::proposition[1. mod 3 の異なる同値類は交わらない]{#prop-mod-3-disjoint}
[mod 3 の例](#ex-mod-3)で、$[1] \cap [2] = \varnothing$。
:::

:::proof
背理法で示す。$[1] \cap [2] \ne \varnothing$ と仮定し、共通の元 $x$ をとると

$$
x \sim 1, \qquad x \sim 2 .
$$

対称律より $1 \sim x$。これと $x \sim 2$ に推移律を使うと $1 \sim 2$。
しかし $1 \bmod 3 = 1$、$2 \bmod 3 = 2$ で、$1 \ne 2$ だから $1 \not\sim 2$。これは矛盾である。

よって $[1] \cap [2] = \varnothing$。
:::

:::proposition[2. 共通部分をもつ同値類は一致する]{#prop-class-meet}
$\sim$ を $A$ 上の同値関係、$a, b \in A$ とすると

$$
[a] \cap [b] \ne \varnothing \implies [a] = [b] .
$$

:::

:::proof
共通の元 $y \in [a] \cap [b]$ をとる。同値類の定義より $y \sim a$、$y \sim b$。

**$[a] \subseteq [b]$。** 任意の $x \in [a]$ をとると $x \sim a$。いま

$$
x \sim a, \qquad y \sim a, \qquad y \sim b .
$$

対称律より $a \sim y$。$x \sim a$ と $a \sim y$ に推移律を使って $x \sim y$。さらに $x \sim y$ と $y \sim b$ に推移律を使って $x \sim b$。
よって $x \in [b]$。

**$[b] \subseteq [a]$。** $a$ と $b$ の役割を入れ替えて、同様に示せる。

以上より $[a] = [b]$。
:::

（補足）対偶をとると、$[a] \ne [b] \implies [a] \cap [b] = \varnothing$。つまり 2 つの同値類は、**一致するか交わらないかのどちらか**。命題 1 は、mod 3 の場合にこれを直接確かめたものになっている。

:::proposition[3. 同値類の一致と同値関係]{#prop-class-equal}
$\sim$ を $A$ 上の同値関係、$a, b \in A$ とすると

$$
a \sim b \iff [a] = [b] .
$$

:::

:::proof
**$(\Rightarrow)$** $a \sim b$ とする。

- $[a] \subseteq [b]$：$x \in [a]$ なら $x \sim a$。$a \sim b$ と推移律より $x \sim b$ なので $x \in [b]$。
- $[b] \subseteq [a]$：対称律より $b \sim a$。$x \in [b]$ なら $x \sim b$ で、推移律より $x \sim a$ なので $x \in [a]$。

よって $[a] = [b]$。

**$(\Leftarrow)$** $[a] = [b]$ とする。反射律より $a \sim a$ なので $a \in [a]$。$[a] = [b]$ より $a \in [b]$、すなわち $a \sim b$。
:::

### 集合の分割

:::definition[分割]{#def-partition}
集合 $A$ の部分集合からなる集合族 $\mathcal{P}$ が次の 3 条件を満たすとき、$\mathcal{P}$ を $A$ の**分割**という。

1. 各 $E \in \mathcal{P}$ は空でない。
2. $E, F \in \mathcal{P}$、$E \ne F$ ならば $E \cap F = \varnothing$。
3. $\mathcal{P}$ のすべての元の和集合が $A$ になる。

$$
\bigcup_{E \in \mathcal{P}} E = A
$$

:::

和集合は[集合族の和集合](/math/families-of-sets#def-family-union)。

:::example[偶数と奇数による分割]{#ex-partition-parity}
$E_1 = \{1, 3, 5, \dots\}$、$E_2 = \{2, 4, 6, \dots\}$ とすると、$\mathcal{P} = \{E_1, E_2\}$ は $\mathbb{N}$ の分割。

1. $1 \in E_1$、$2 \in E_2$ なので、どちらも空でない。
2. 偶数かつ奇数である自然数はないので、$E_1 \cap E_2 = \varnothing$。
3. どの自然数も偶数か奇数なので、$E_1 \cup E_2 = \mathbb{N}$。

これは [mod 2 の例](#ex-mod-2)の同値類全体 $\{[1], [2]\}$ と同じもの。
:::

### 同値関係と分割の対応

:::proposition[4. 同値関係から分割を作る]{#prop-equivalence-to-partition}
$\sim$ を $A$ 上の同値関係とすると、同値類全体の集合

$$
\mathcal{P} = \{\, [a] \mid a \in A \,\}
$$

は $A$ の分割である。
:::

:::proof
分割の 3 条件を確かめる。

**1. 空でない。** 任意の $[a] \in \mathcal{P}$ について、反射律より $a \sim a$ なので $a \in [a]$。

**2. 異なる元は交わらない。** $[a] \ne [b]$ とする。もし $[a] \cap [b] \ne \varnothing$ なら、[命題 2](#prop-class-meet) より $[a] = [b]$ となり矛盾。よって $[a] \cap [b] = \varnothing$。

**3. 和集合が $A$。** 各 $[a]$ は $A$ の部分集合なので、和集合は $A$ に含まれる。
逆に任意の $x \in A$ について、反射律より $x \in [x] \in \mathcal{P}$ なので、$x$ は和集合に属する。

よって $\bigcup_{a \in A} [a] = A$。
:::

:::proposition[5. 分割から同値関係を作る]{#prop-partition-to-equivalence}
$\mathcal{P}$ を $A$ の分割とし、$x, y \in A$ について

$$
x \sim y \iff \exists E \in \mathcal{P}:\ x, y \in E
$$

と定めると、$\sim$ は $A$ 上の同値関係である。
:::

:::proof
**反射律。** $x \in A$ とする。分割の条件 3 より $\bigcup_{E \in \mathcal{P}} E = A$ なので、$x \in E$ となる $E \in \mathcal{P}$ がある。$x, x \in E$ だから $x \sim x$。

**対称律。** $x \sim y$ なら、ある $E \in \mathcal{P}$ について $x, y \in E$。これは $y, x \in E$ と同じなので $y \sim x$。

**推移律。** $x \sim y$、$y \sim z$ とすると、ある $E, E' \in \mathcal{P}$ について

$$
x, y \in E, \qquad y, z \in E' .
$$

$y \in E \cap E'$ なので $E \cap E' \ne \varnothing$。分割の条件 2 の対偶より $E = E'$。
よって $x, z \in E$ で、$x \sim z$。
:::

### 分割から作った同値類

:::proposition[6. 分割から作った同値類は元の分割の元に一致する]{#prop-partition-classes}
$\mathcal{P}$ を $A$ の分割とし、[命題 5](#prop-partition-to-equivalence) の同値関係 $\sim$ を考える。$a \in A$ と、$a \in E$ を満たす $E \in \mathcal{P}$ について

$$
[a] = E .
$$

:::

:::proof
相互包含で示す。

**$[a] \subseteq E$。** 任意の $x \in [a]$ をとると $x \sim a$。$\sim$ の定義より、ある $F \in \mathcal{P}$ について $x, a \in F$。
すると $a \in E \cap F$ なので $E \cap F \ne \varnothing$。分割の条件 2 の対偶より $E = F$。
よって $x \in F = E$。

**$E \subseteq [a]$。** 任意の $x \in E$ をとると、$x, a \in E$ かつ $E \in \mathcal{P}$ なので、$\sim$ の定義より $x \sim a$。
よって $x \in [a]$。

以上より $[a] = E$。
:::

## 3. 順序関係

:::remark[未学習]
未学習・今後追記予定。
:::
