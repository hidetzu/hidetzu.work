---
title: "関係"
description: "集合上の関係と同値関係。同値関係全体と分割全体のあいだに全単射があることを、補題と命題を積み上げて示す。順序関係は未学習。"
topic: set-theory
order: 7
status: studying
createdAt: 2026-11-11
updatedAt: 2026-11-14
related:
  - cartesian-product
  - families-of-sets
  - functions
tags:
  - set-theory
  - munkres
sources:
  - title: "James R. Munkres, Topology, 2nd ed."
    location: "Chapter 1, §3 Relations"
---

:::remark[このノートの書き方]
Munkres の §3 Relations（関係）のうち、これまでに学んだ同値関係の内容を整理したもの。
同値関係の内容は、2 節の中心定理を補題・命題で段階的に示す形に並べている。
証明ごとの出どころは下の学習状況にまとめた。レビューの段階で補った説明には **（補足）** と付けた。
順序関係はまだ学んでいないので、見出しだけを置いている。
:::

学習状況：

- 関係・同値関係・同値類・分割の定義：確認済み
- 補題 1、命題 2〜4、命題 7：手書きで証明済み。証明はその流れをそのまま残して書き直したもの
- 命題 5：自分で証明済み。証明の文章は Claude が書いた
- 命題 6：手書きで論理を確認済み。証明の文章は Claude が書いた
- 中心定理の証明：命題 3〜6 をつなぐまとめの文章は Claude が書いた
- 順序関係：未学習

このノートの目標は、次の定理（[中心定理](#thm-equivalence-partition)）。

> 集合 $A$ 上の同値関係全体の集合と、$A$ の分割全体の集合とのあいだには、全単射がある。

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

### 同値類と代表元

:::definition[同値類・代表元]{#def-equivalence-class}
$\sim$ を $A$ 上の同値関係とする。$a \in A$ に対して

$$
[a] = \{\, x \in A \mid x \sim a \,\}
$$

を $a$ の**同値類**という。どの同値関係による同値類かを明示するときは、$[a]_R$ のように書く。
同値類 $C$ の元を、$C$ の**代表元**という。
:::

（補足）$b \in [a]$ なら $b \sim a$ なので、[命題 2](#prop-class-equal) より $[b] = [a]$。同値類は、どの代表元から作っても同じになる。

### 分割

:::definition[分割]{#def-partition}
集合 $A$ の部分集合からなる集合族 $\mathcal{P}$ が次の 3 条件を満たすとき、$\mathcal{P}$ を $A$ の**分割**という。

1. 各 $E \in \mathcal{P}$ は空でない。
2. $E, F \in \mathcal{P}$、$E \ne F$ ならば $E \cap F = \varnothing$。
3. $\mathcal{P}$ のすべての元の和集合が $A$ になる。

$$
\bigcup_{E \in \mathcal{P}} E = A
$$

:::

和集合は[集合族の和集合](/math/families-of-sets#def-family-union)。条件 2 は、対偶の形「$E \cap F \ne \varnothing$ ならば $E = F$」で何度も使う。

### 中心定理

$A$ 上の同値関係全体の集合を $\operatorname{Eq}(A)$、$A$ の分割全体の集合を $\operatorname{Part}(A)$ と書く。

:::theorem[同値関係と分割の対応]{#thm-equivalence-partition}
写像

$$
\begin{aligned}
&F \colon \operatorname{Eq}(A) \to \operatorname{Part}(A), \\
&F(R) = \{\, [x]_R \mid x \in A \,\}
\end{aligned}
$$

は全単射である。
:::

証明は、次の 3 つに分けて、以下の補題・命題で段階的に示す。

| 示すこと | 支える補題・命題 |
| --- | --- |
| $F$ が写像として定まる（$F(R)$ が分割になる） | [命題 3](#prop-equivalence-to-partition)（[補題 1](#prop-class-meet) を使う） |
| $F$ は全射 | [命題 4](#prop-partition-to-equivalence)、[命題 5](#prop-partition-classes) |
| $F$ は単射 | [命題 6](#prop-equivalence-unique) |

最後に[中心定理の証明](#proof-equivalence-partition)で、これらをまとめる。

### 同値類の性質

:::lemma[1. 異なる同値類は互いに素]{#prop-class-meet}
$\sim$ を $A$ 上の同値関係、$a, b \in A$ とすると

$$
[a] \cap [b] \ne \varnothing \implies [a] = [b] .
$$

対偶をとると、$[a] \ne [b] \implies [a] \cap [b] = \varnothing$。
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

つまり 2 つの同値類は、**一致するか交わらないかのどちらか**。

:::proposition[2. 同値類の一致と同値関係]{#prop-class-equal}
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

### 同値関係から分割を得る

中心定理の「$F$ が写像として定まる」部分。

:::proposition[3. 同値関係から分割を作る]{#prop-equivalence-to-partition}
$\sim$ を $A$ 上の同値関係とすると、同値類全体の集合

$$
\mathcal{P} = \{\, [a] \mid a \in A \,\}
$$

は $A$ の分割である。
:::

:::proof
分割の 3 条件を確かめる。

**1. 空でない。** 任意の $[a] \in \mathcal{P}$ について、反射律より $a \sim a$ なので $a \in [a]$。

**2. 異なる元は交わらない。** $[a] \ne [b]$ とする。もし $[a] \cap [b] \ne \varnothing$ なら、[補題 1](#prop-class-meet) より $[a] = [b]$ となり矛盾。よって $[a] \cap [b] = \varnothing$。

**3. 和集合が $A$。** 各 $[a]$ は $A$ の部分集合なので、和集合は $A$ に含まれる。
逆に任意の $x \in A$ について、反射律より $x \in [x] \in \mathcal{P}$ なので、$x$ は和集合に属する。

よって $\bigcup_{a \in A} [a] = A$。
:::

### 分割から同値関係を得る

ここから中心定理の「全射」の部分。分割 $\mathcal{P}$ から同値関係を作り（命題 4）、その同値類が $\mathcal{P}$ の元に戻ることを示す（命題 5）。

:::proposition[4. 分割から同値関係を作る]{#prop-partition-to-equivalence}
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

:::proposition[5. 分割から作った同値類は元の分割の元に一致する]{#prop-partition-classes}
$\mathcal{P}$ を $A$ の分割とし、[命題 4](#prop-partition-to-equivalence) の同値関係 $\sim$ を考える。$a \in A$ と、$a \in E$ を満たす $E \in \mathcal{P}$ について

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

### 同値関係の一意性

中心定理の「単射」の部分。

:::proposition[6. 同じ分割を生じる同値関係は一意]{#prop-equivalence-unique}
$C_1, C_2$ を $A$ 上の同値関係とする。$F(C_1) = F(C_2)$ ならば $C_1 = C_2$。
:::

:::proof
$\mathcal{P} = F(C_1) = F(C_2)$ とおく。[命題 3](#prop-equivalence-to-partition) より $\mathcal{P}$ は $A$ の分割である。

任意の $x \in A$ を固定し、$C_1, C_2$ による $x$ の同値類を

$$
E_1 = [x]_{C_1}, \qquad E_2 = [x]_{C_2}
$$

とする。$E_1 \in F(C_1) = \mathcal{P}$、$E_2 \in F(C_2) = \mathcal{P}$ なので、どちらも同じ分割 $\mathcal{P}$ の元。

反射律より $x \mathrel{C_1} x$、$x \mathrel{C_2} x$ なので $x \in E_1 \cap E_2$。よって $E_1 \cap E_2 \ne \varnothing$ で、分割の条件 2 の対偶より $E_1 = E_2$。

したがって、任意の $y \in A$ について

$$
\begin{aligned}
x \mathrel{C_1} y
&\iff y \mathrel{C_1} x \\
&\iff y \in E_1 \\
&\iff y \in E_2 \\
&\iff y \mathrel{C_2} x \\
&\iff x \mathrel{C_2} y .
\end{aligned}
$$

（補足）両端の $\iff$ は対称律、$y \in E_i$ との言い換えは同値類の定義による。

$x$ も任意なので、すべての $x, y \in A$ について $(x, y) \in C_1 \iff (x, y) \in C_2$。$C_1, C_2$ はどちらも $A \times A$ の部分集合なので、$C_1 = C_2$。
:::

### 中心定理の証明

:::proof[中心定理の証明]{#proof-equivalence-partition}
**$F$ が写像として定まる。** $R \in \operatorname{Eq}(A)$ なら、[命題 3](#prop-equivalence-to-partition) より $F(R) = \{\, [x]_R \mid x \in A \,\}$ は $A$ の分割、つまり $F(R) \in \operatorname{Part}(A)$。

**全射。** $\mathcal{P} \in \operatorname{Part}(A)$ を任意にとり、[命題 4](#prop-partition-to-equivalence) の同値関係を $R_{\mathcal{P}} \in \operatorname{Eq}(A)$ とする。$F(R_{\mathcal{P}}) = \mathcal{P}$ を相互包含で示す。

- $F(R_{\mathcal{P}}) \subseteq \mathcal{P}$：$x \in A$ とする。分割の条件 3 より $x \in E$ となる $E \in \mathcal{P}$ があり、[命題 5](#prop-partition-classes) より $[x]_{R_{\mathcal{P}}} = E \in \mathcal{P}$。
- $\mathcal{P} \subseteq F(R_{\mathcal{P}})$：$E \in \mathcal{P}$ とする。分割の条件 1 より $a \in E$ となる $a$ があり、命題 5 より $E = [a]_{R_{\mathcal{P}}} \in F(R_{\mathcal{P}})$。

**単射。** $F(R_1) = F(R_2)$ なら、[命題 6](#prop-equivalence-unique) より $R_1 = R_2$。

以上より $F$ は全単射。
:::

### 具体例

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

:::example[偶数と奇数による分割]{#ex-partition-parity}
$E_1 = \{1, 3, 5, \dots\}$、$E_2 = \{2, 4, 6, \dots\}$ とすると、$\mathcal{P} = \{E_1, E_2\}$ は $\mathbb{N}$ の分割。

1. $1 \in E_1$、$2 \in E_2$ なので、どちらも空でない。
2. 偶数かつ奇数である自然数はないので、$E_1 \cap E_2 = \varnothing$。
3. どの自然数も偶数か奇数なので、$E_1 \cup E_2 = \mathbb{N}$。

これは [mod 2 の例](#ex-mod-2)の同値類全体 $\{[1], [2]\}$ と同じもの。
:::

（補足）中心定理の $F$ で書くと、mod 2 の同値関係 $R$ について $F(R) = \{E_1, E_2\}$。

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

（補足）たとえば mod 3 では $[4] = [1]$ のように、同じ同値類を表す元（代表元）はいくつもある。この理由が[命題 2](#prop-class-equal)。

:::proposition[7. mod 3 の異なる同値類は交わらない]{#prop-mod-3-disjoint}
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

（補足）命題 7 は、[補題 1](#prop-class-meet) の対偶を mod 3 の場合に直接確かめたものになっている。

## 3. 順序関係

:::remark[未学習]
未学習・今後追記予定。
:::
