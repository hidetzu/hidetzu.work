---
title: "関係"
aliases:
  - "relations"
description: "集合上の関係、同値関係と分割の一対一対応、全射が定める同値関係、順序関係と順序型、辞書式順序、上界・下界と最小上界性質、最小上界性質から最大下界性質が導かれること。"
topic: set-theory
order: 7
status: understood
createdAt: 2026-11-11
updatedAt: 2026-11-17
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
textbook:
  chapter: 1
  section: 3
---

このノートでは、集合の元どうしの「関係」を直積の部分集合として定義し、その代表である同値関係と順序関係を扱う。
同値関係では、同値関係と分割が一対一に対応することを、いくつかの命題に分けて証明する。順序関係では、順序型・辞書式順序と、上界・下界、最小上界性質を扱う。
命題 1〜6 は、このノートの中での通し番号である。

2 節の目標は、次の定理（[中心定理](#thm-equivalence-partition)）である。

> 集合 $A$ 上の同値関係全体の集合と、$A$ の分割全体の集合とのあいだには、全単射が存在する。

## 1. 関係

:::definition[関係]{#def-relation}
集合 $A$ に対し、[直積](/math/cartesian-product#def-cartesian-product) $A \times A$ の部分集合 $C$ を $A$ 上の**関係**という。
$(x, y) \in C$ であることを $x \mathrel{C} y$ と書き、「$x$ と $y$ は関係 $C$ にある」と読む。
:::

つまり、$x \mathrel{C} y$ と $(x, y) \in C$ は同じ主張である。以下では、関係を $R$、$\sim$、$<$ などの記号でも表す。

:::example[人の集合上の関係]{#ex-people}
すべての人からなる集合を $P$ とする。次の $D$、$B$、$S$ は、いずれも $P$ 上の関係である。

- **子孫関係**：$x \mathrel{D} y \iff$ $x$ は $y$ の子孫である。
- **血縁関係**：$x \mathrel{B} y \iff$ $x$ と $y$ には共通の祖先がいる。
- **兄弟姉妹関係**：$x \mathrel{S} y \iff$ $x$ は $y$ の兄弟姉妹である。

:::

（補足）$P$ は数学的に厳密に定まった集合ではない。これらは、関係という概念のイメージをつかむための例である。

### 写像の対応規則との違い

[写像](/math/functions#def-function) $f \colon A \to B$ も $A \times B$ の部分集合であるが、各 $x \in A$ に対して $(x, y) \in f$ を満たす $y \in B$ が**ちょうど 1 つ**存在する、という条件（存在と一意性）が課されている。
関係にはこの条件がない。1 つの $x$ が複数の $y$ と関係にあってもよく、どの $y$ とも関係になくてもよい。
たとえば子孫関係では、1 人の人は一般に複数の人の子孫である。

## 2. 同値関係

### 同値関係の定義

:::definition[同値関係]{#def-equivalence}
集合 $A$ 上の関係 $\sim$ が、任意の $x, y, z \in A$ に対して次の 3 条件を満たすとき、$\sim$ を**同値関係**という。

1. **反射律**：$x \sim x$ が成り立つ。
2. **対称律**：$x \sim y$ ならば $y \sim x$ である。
3. **推移律**：$x \sim y$ かつ $y \sim z$ ならば $x \sim z$ である。

:::

反射律は、どの元も自分自身と関係にあることを意味する。対称律は、関係にあるかどうかが 2 つの元の順番によらないことを意味する。
推移律は、$x$ と $y$、$y$ と $z$ がそれぞれ関係にあれば、$y$ を経由して $x$ と $z$ も関係にあることを意味する。

### 同値類と代表元

:::definition[同値類・代表元]{#def-equivalence-class}
$\sim$ を $A$ 上の同値関係とし、$a \in A$ とする。集合

$$
[a] = \{\, x \in A \mid x \sim a \,\}
$$

を $a$ の**同値類**という。どの同値関係による同値類かを明示したいときは、$[a]_R$ のように書く。
同値類 $E$ に属する元を、$E$ の**代表元**という。
:::

（補足）$b \in [a]$ ならば $b \sim a$ であるから、[命題 1](#prop-class-equal) により $[b] = [a]$ となる。すなわち、同値類はどの代表元から作っても同じである。

### 分割

:::definition[分割]{#def-partition}
集合 $A$ の部分集合からなる族 $\mathcal{P}$ が次の 3 条件を満たすとき、$\mathcal{P}$ を $A$ の**分割**という。

1. 任意の $E \in \mathcal{P}$ は空でない。
2. $E, F \in \mathcal{P}$ かつ $E \ne F$ ならば、$E \cap F = \varnothing$ である。
3. $\mathcal{P}$ のすべての元の和集合は $A$ に等しい。すなわち

$$
\bigcup_{E \in \mathcal{P}} E = A .
$$

:::

ここで和集合は、[集合族の和集合](/math/families-of-sets#def-family-union)の意味である。条件 2 は、対偶「$E \cap F \ne \varnothing$ ならば $E = F$」の形で繰り返し用いる。

### 中心定理

$A$ 上の同値関係全体の集合を $\operatorname{Eq}(A)$、$A$ の分割全体の集合を $\operatorname{Part}(A)$ で表す。

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

この定理を、次の 3 つの主張に分けて証明する。それぞれの主張を支える補題・命題は、次の表のとおりである。

| 示すこと | 支える補題・命題 |
| --- | --- |
| $F$ が写像として定まる（$F(R)$ が分割になる） | [命題 2](#prop-equivalence-to-partition)（[同値類の補題](#prop-class-meet) を使う） |
| $F$ は全射 | [命題 3](#prop-partition-to-equivalence)、[命題 4](#prop-partition-classes) |
| $F$ は単射 | [命題 5](#prop-equivalence-unique) |

最後に、これらを[中心定理の証明](#proof-equivalence-partition)でまとめる。

### 同値類の性質

:::lemma[2 つの同値類は一致するか互いに素]{#prop-class-meet source="Munkres, Lemma 3.1"}
$\sim$ を $A$ 上の同値関係とし、$a, b \in A$ とする。$[a] \cap [b] \ne \varnothing$ ならば、$[a] = [b]$ である。
対偶をとれば、$[a] \ne [b]$ ならば $[a] \cap [b] = \varnothing$ である。
:::

:::proof{origin=self}
$[a] \cap [b]$ の元 $y$ を 1 つとる。同値類の定義より、$y \sim a$ かつ $y \sim b$ である。

まず $[a] \subseteq [b]$ を示す。$x \in [a]$ とすると、$x \sim a$ である。
対称律より $a \sim y$ であるから、$x \sim a$ と $a \sim y$ に推移律を用いて $x \sim y$ を得る。
さらに $x \sim y$ と $y \sim b$ に推移律を用いると、$x \sim b$ となる。よって $x \in [b]$ である。

$[b] \subseteq [a]$ も、$a$ と $b$ の役割を入れ替えれば同様に示される。以上より $[a] = [b]$ である。
:::

すなわち、2 つの同値類は**一致するか、互いに交わらないかのいずれか**である。

:::proposition[1. 同値類の一致と同値関係]{#prop-class-equal}
$\sim$ を $A$ 上の同値関係とし、$a, b \in A$ とする。このとき

$$
a \sim b \iff [a] = [b]
$$

が成り立つ。
:::

:::proof{origin=self}
$(\Rightarrow)$ $a \sim b$ と仮定する。$x \in [a]$ ならば $x \sim a$ であり、$a \sim b$ と推移律より $x \sim b$、すなわち $x \in [b]$ となる。よって $[a] \subseteq [b]$ である。
また、対称律より $b \sim a$ である。$x \in [b]$ ならば $x \sim b$ であり、推移律より $x \sim a$、すなわち $x \in [a]$ となる。よって $[b] \subseteq [a]$ である。
したがって $[a] = [b]$ が成り立つ。

$(\Leftarrow)$ $[a] = [b]$ と仮定する。反射律より $a \sim a$ であるから、$a \in [a] = [b]$ である。すなわち $a \sim b$ である。
:::

### 同値関係から分割を得る

この項では、中心定理のうち「$F$ が写像として定まる」ことを示す。

:::proposition[2. 同値関係から分割を作る]{#prop-equivalence-to-partition}
$\sim$ を $A$ 上の同値関係とする。このとき、同値類全体の集合

$$
\mathcal{P} = \{\, [a] \mid a \in A \,\}
$$

は $A$ の分割である。
:::

:::proof{origin=self}
分割の 3 条件を順に確かめる。

**(1)** 任意の $[a] \in \mathcal{P}$ に対して、反射律より $a \sim a$ であるから $a \in [a]$ となる。よって $[a]$ は空でない。

**(2)** $[a] \ne [b]$ とする。もし $[a] \cap [b] \ne \varnothing$ ならば、[同値類の補題](#prop-class-meet) より $[a] = [b]$ となり矛盾する。よって $[a] \cap [b] = \varnothing$ である。

**(3)** 各 $[a]$ は $A$ の部分集合であるから、$\bigcup_{a \in A} [a] \subseteq A$ である。
逆に、任意の $x \in A$ に対して、反射律より $x \in [x]$ であり、$[x] \in \mathcal{P}$ であるから、$x$ は和集合に属する。
よって $\bigcup_{a \in A} [a] = A$ である。
:::

### 分割から同値関係を得る

この項と次の項では、中心定理のうち「$F$ が全射である」ことに必要な事実を示す。
分割 $\mathcal{P}$ から同値関係を作り（命題 3）、その同値類がもとの分割の元に一致することを確かめる（命題 4）。

:::proposition[3. 分割から同値関係を作る]{#prop-partition-to-equivalence}
$\mathcal{P}$ を $A$ の分割とし、$x, y \in A$ に対して

$$
x \sim y \iff \exists E \in \mathcal{P}:\ x, y \in E
$$

と定める。このとき、$\sim$ は $A$ 上の同値関係である。
:::

:::proof{origin=self}
**反射律**：$x \in A$ とする。分割の条件 3 より $\bigcup_{E \in \mathcal{P}} E = A$ であるから、$x \in E$ を満たす $E \in \mathcal{P}$ が存在する。$x, x \in E$ であるから、$x \sim x$ である。

**対称律**：$x \sim y$ ならば、ある $E \in \mathcal{P}$ に対して $x, y \in E$ である。これは $y, x \in E$ と同じことであるから、$y \sim x$ である。

**推移律**：$x \sim y$ かつ $y \sim z$ とする。このとき、$x, y \in E$ かつ $y, z \in E'$ を満たす $E, E' \in \mathcal{P}$ が存在する。
$y \in E \cap E'$ より $E \cap E' \ne \varnothing$ であるから、分割の条件 2 の対偶により $E = E'$ である。
よって $x, z \in E$ となり、$x \sim z$ を得る。
:::

### 分割から作った同値類

:::proposition[4. 分割から作った同値類は元の分割の元に一致する]{#prop-partition-classes}
$\mathcal{P}$ を $A$ の分割とし、$\sim$ を[命題 3](#prop-partition-to-equivalence) の同値関係とする。$a \in A$ とし、$E \in \mathcal{P}$ を $a \in E$ を満たす元とする。このとき $[a] = E$ である。
:::

:::proof{origin=self text=ai}
両方向の包含を示す。

まず $[a] \subseteq E$ を示す。$x \in [a]$ とすると $x \sim a$ であるから、$\sim$ の定義より、$x, a \in F$ を満たす $F \in \mathcal{P}$ が存在する。
このとき $a \in E \cap F$ であるから $E \cap F \ne \varnothing$ となり、分割の条件 2 の対偶より $E = F$ である。よって $x \in F = E$ である。

次に $E \subseteq [a]$ を示す。$x \in E$ とする。$x, a \in E$ かつ $E \in \mathcal{P}$ であるから、$\sim$ の定義より $x \sim a$ であり、$x \in [a]$ となる。

以上より $[a] = E$ である。
:::

### 同値関係の一意性

この項では、中心定理のうち「$F$ が単射である」ことを示す。

:::proposition[5. 同じ分割を生じる同値関係は一意]{#prop-equivalence-unique}
$C_1, C_2$ を $A$ 上の同値関係とする。$F(C_1) = F(C_2)$ ならば、$C_1 = C_2$ である。
:::

:::proof{origin=self text=ai}
$\mathcal{P} = F(C_1) = F(C_2)$ とおく。[命題 2](#prop-equivalence-to-partition) より、$\mathcal{P}$ は $A$ の分割である。

$x \in A$ を任意に固定し、$C_1, C_2$ による $x$ の同値類を $E_1 = [x]_{C_1}$、$E_2 = [x]_{C_2}$ とおく。
$E_1 \in F(C_1) = \mathcal{P}$、$E_2 \in F(C_2) = \mathcal{P}$ であるから、$E_1$ と $E_2$ はともに分割 $\mathcal{P}$ の元である。
反射律より $x \mathrel{C_1} x$、$x \mathrel{C_2} x$ であるから $x \in E_1 \cap E_2$ となり、$E_1 \cap E_2 \ne \varnothing$ である。
よって、分割の条件 2 の対偶より $E_1 = E_2$ を得る。

したがって、任意の $y \in A$ に対して

$$
\begin{aligned}
x \mathrel{C_1} y
&\iff y \mathrel{C_1} x \\
&\iff y \in E_1 \\
&\iff y \in E_2 \\
&\iff y \mathrel{C_2} x \\
&\iff x \mathrel{C_2} y
\end{aligned}
$$

が成り立つ。

（補足）最初と最後の $\iff$ は対称律により、$y \in E_i$ への言い換えは同値類の定義による。

$x$ も任意であったから、すべての $x, y \in A$ に対して $(x, y) \in C_1 \iff (x, y) \in C_2$ が成り立つ。
$C_1, C_2$ はともに $A \times A$ の部分集合であるから、$C_1 = C_2$ である。
:::

### 中心定理の証明

:::proof[中心定理の証明]{#proof-equivalence-partition for=thm-equivalence-partition origin=ai note="自分で証明した命題 2〜5 をつなぐまとめ"}
**$F$ が写像として定まること**：$R \in \operatorname{Eq}(A)$ ならば、[命題 2](#prop-equivalence-to-partition) より $F(R) = \{\, [x]_R \mid x \in A \,\}$ は $A$ の分割である。すなわち $F(R) \in \operatorname{Part}(A)$ である。

**$F$ が全射であること**：$\mathcal{P} \in \operatorname{Part}(A)$ を任意にとり、[命題 3](#prop-partition-to-equivalence) の同値関係を $R_{\mathcal{P}} \in \operatorname{Eq}(A)$ とする。$F(R_{\mathcal{P}}) = \mathcal{P}$ を、両方向の包含によって示す。

$x \in A$ とすると、分割の条件 3 より $x \in E$ を満たす $E \in \mathcal{P}$ が存在し、[命題 4](#prop-partition-classes) より $[x]_{R_{\mathcal{P}}} = E \in \mathcal{P}$ である。よって $F(R_{\mathcal{P}}) \subseteq \mathcal{P}$ である。
逆に $E \in \mathcal{P}$ とすると、分割の条件 1 より $a \in E$ を満たす $a$ が存在し、命題 4 より $E = [a]_{R_{\mathcal{P}}} \in F(R_{\mathcal{P}})$ である。よって $\mathcal{P} \subseteq F(R_{\mathcal{P}})$ である。

**$F$ が単射であること**：$F(R_1) = F(R_2)$ ならば、[命題 5](#prop-equivalence-unique) より $R_1 = R_2$ である。

以上より、$F$ は全単射である。
:::

### 具体例

以下、$\mathbb{N} = \{1, 2, 3, \dots\}$ とし、$x \bmod n$ で $x$ を $n$ で割った余りを表す。

:::example[mod 2]{#ex-mod-2}
$\mathbb{N}$ 上の関係 $\sim$ を

$$
x \sim y \iff x \bmod 2 = y \bmod 2
$$

で定めると、同値類は奇数全体と偶数全体の 2 つになる。

$$
\begin{aligned}
[1] &= \{1, 3, 5, \dots\} \\
[2] &= \{2, 4, 6, \dots\}
\end{aligned}
$$

:::

:::example[偶数と奇数による分割]{#ex-partition-parity}
$E_1 = \{1, 3, 5, \dots\}$、$E_2 = \{2, 4, 6, \dots\}$ とおくと、$\mathcal{P} = \{E_1, E_2\}$ は $\mathbb{N}$ の分割である。実際、次が成り立つ。

1. $1 \in E_1$、$2 \in E_2$ であるから、$E_1$ と $E_2$ はともに空でない。
2. 偶数でありかつ奇数でもある自然数は存在しないから、$E_1 \cap E_2 = \varnothing$ である。
3. すべての自然数は偶数か奇数であるから、$E_1 \cup E_2 = \mathbb{N}$ である。

この $\mathcal{P}$ は、[mod 2 の例](#ex-mod-2)における同値類全体 $\{[1], [2]\}$ に等しい。
:::

（補足）中心定理の記号で書けば、mod 2 の同値関係 $R$ に対して $F(R) = \{E_1, E_2\}$ である。

:::example[mod 3]{#ex-mod-3}
$\mathbb{N}$ 上の関係 $\sim$ を

$$
x \sim y \iff x \bmod 3 = y \bmod 3
$$

で定めると、同値類は 3 で割った余りが $1, 2, 0$ のものの 3 つになる。

$$
\begin{aligned}
[1] &= \{1, 4, 7, \dots\} \\
[2] &= \{2, 5, 8, \dots\} \\
[3] &= \{3, 6, 9, \dots\}
\end{aligned}
$$

:::

（補足）mod 3 では $[4] = [1]$ のように、1 つの同値類に代表元が複数ある。これが成り立つ理由は[命題 1](#prop-class-equal) である。

:::proposition[6. mod 3 の異なる同値類は交わらない]{#prop-mod-3-disjoint}
[mod 3 の例](#ex-mod-3)において、$[1] \cap [2] = \varnothing$ である。
:::

:::proof{origin=self}
背理法で示す。$[1] \cap [2] \ne \varnothing$ と仮定し、その元 $x$ をとる。このとき $x \sim 1$ かつ $x \sim 2$ である。
対称律より $1 \sim x$ であり、これと $x \sim 2$ に推移律を用いると $1 \sim 2$ を得る。
ところが $1 \bmod 3 = 1$、$2 \bmod 3 = 2$ であり、$1 \ne 2$ であるから $1 \not\sim 2$ である。これは矛盾である。

よって $[1] \cap [2] = \varnothing$ である。
:::

（補足）命題 6 は、[同値類の補題](#prop-class-meet) の対偶を mod 3 の場合に直接確かめたものである。

### 全射から作る同値関係

:::proposition[全射が定める同値関係]{#prop-surjection-equivalence source="Munkres, §3 演習 4"}
$f \colon A \to B$ を全射とし、$A$ 上の関係 $\sim$ を

$$
a \sim b \iff f(a) = f(b)
$$

で定める。また、同値類全体の集合を $A^{*} = \{\, [a] \mid a \in A \,\}$ とおく。このとき、次が成り立つ。

1. $\sim$ は $A$ 上の同値関係である。
2. $g([a]) = f(a)$ によって写像 $g \colon A^{*} \to B$ が矛盾なく定まり（良定義）、$g$ は全単射である。

とくに、$A^{*}$ と $B$ のあいだには全単射が存在する。
:::

:::proof{origin=self text=ai}
**(1)** $a, b, c \in A$ とする。$f(a) = f(a)$ であるから、$a \sim a$ である。
$a \sim b$ ならば $f(a) = f(b)$、すなわち $f(b) = f(a)$ であるから、$b \sim a$ である。
$a \sim b$ かつ $b \sim c$ ならば $f(a) = f(b) = f(c)$ であるから、$a \sim c$ である。
よって $\sim$ は同値関係である。

**(2)** まず、$g$ が良定義であることを示す。$g([a])$ は代表元 $a$ を用いて定義しているので、同じ同値類を別の代表元で表しても値が変わらないことを確かめる必要がある。
$[a] = [a']$ とすると、[命題 1](#prop-class-equal) より $a \sim a'$、すなわち $f(a) = f(a')$ である。よって $g([a])$ は代表元の選び方によらない。

次に、$g$ が全射であることを示す。$y \in B$ を任意にとる。$f$ は全射であるから、$f(a) = y$ を満たす $a \in A$ が存在し、$g([a]) = f(a) = y$ となる。

最後に、$g$ が単射であることを示す。$g([a]) = g([b])$ とすると $f(a) = f(b)$、すなわち $a \sim b$ であるから、命題 1 より $[a] = [b]$ である。

以上より、$g$ は全単射である。
:::

（補足）$f$ が全射でない場合も、同じ $g$ は $A^{*}$ から像集合 $f(A)$ への全単射になる。全射であるという仮定は、$g$ の全射性を示すところでしか使っていない。

## 3. 順序関係

### 定義

:::definition[順序関係]{#def-order}
集合 $A$ 上の関係 $<$ が次の 3 条件を満たすとき、$<$ を**順序関係**という。

1. **比較可能性**：$x \ne y$ を満たす任意の $x, y \in A$ に対して、$x < y$ または $y < x$ が成り立つ。
2. **非反射性**：$x < x$ を満たす $x \in A$ は存在しない。
3. **推移律**：任意の $x, y, z \in A$ に対して、$x < y$ かつ $y < z$ ならば $x < z$ である。

$x < y$ または $x = y$ であることを、$x \le y$ と書く。順序関係 $<$ が与えられた集合 $(A, <)$ を**順序集合**という。
:::

（補足）この意味の順序関係は、任意の 2 元が比較できる狭義の全順序にあたる。単純順序や線形順序とも呼ばれる。

:::definition[狭義半順序関係]{#def-strict-partial-order}
集合 $A$ 上の関係 $\prec$ が**非反射性**と**推移律**を満たすとき、$\prec$ を**狭義半順序関係**という。
:::

順序関係とは、比較可能性も満たす狭義半順序関係のことである。狭義半順序関係では、比較できない 2 元が存在してもよい。

:::definition[開区間・直後の元・直前の元]{#def-interval}
$(A, <)$ を順序集合とし、$a, b \in A$、$a < b$ とする。集合

$$
(a, b) = \{\, x \in A \mid a < x < b \,\}
$$

を**開区間**という。$(a, b) = \varnothing$ であるとき、$a$ を $b$ の**直前の元**、$b$ を $a$ の**直後の元**という。
:::

:::definition[順序型]{#def-order-type}
$(A, <_A)$、$(B, <_B)$ を順序集合とする。全単射 $f \colon A \to B$ が

$$
a_1 <_A a_2 \implies f(a_1) <_B f(a_2)
$$

を満たすとき、$f$ を**順序を保つ全単射**という。このような $f$ が存在するとき、$A$ と $B$ は**同じ順序型**をもつという。
:::

:::definition[辞書式順序]{#def-dictionary-order}
$(A, <_A)$、$(B, <_B)$ を順序集合とする。$A \times B$ 上の関係 $<$ を

$$
\begin{aligned}
&(a_1, b_1) < (a_2, b_2) \\
\iff{}& a_1 <_A a_2 \\
&\text{または} \\
&(a_1 = a_2 \text{ かつ } b_1 <_B b_2)
\end{aligned}
$$

で定める。これを $A \times B$ 上の**辞書式順序**という。
:::

すなわち、まず第 1 成分を比べ、第 1 成分が等しいときに限って第 2 成分を比べる。辞書で単語を並べる規則と同じ考え方である。

### 2 乗で比べる順序

:::proposition[2 乗で比べる順序]{#prop-square-order source="Munkres, §3 例 7"}
$\mathbb{R}$ 上の関係 $\prec$ を

$$
\begin{aligned}
x \prec y \iff{}& x^2 < y^2 \\
&\text{または} \\
&(x^2 = y^2 \text{ かつ } x < y)
\end{aligned}
$$

で定めると、$\prec$ は順序関係である。
:::

:::proof{origin=self text=ai}
順序関係の 3 条件を確かめる。

**比較可能性**：$x \ne y$ とする。$x^2 \ne y^2$ ならば、$x^2 < y^2$ または $y^2 < x^2$ であり、それぞれ $x \prec y$、$y \prec x$ となる。
$x^2 = y^2$ ならば、$x \ne y$ より $x < y$ または $y < x$ であり、それぞれ $x \prec y$、$y \prec x$ となる。

**非反射性**：$x \prec x$ と仮定すると、$x^2 < x^2$ であるか、または $x^2 = x^2$ かつ $x < x$ である。いずれも成り立たないから、$x \prec x$ を満たす $x$ は存在しない。

**推移律**：$x \prec y$ かつ $y \prec z$ とする。$x \prec y$ と $y \prec z$ のそれぞれが定義のどちらの場合によって成り立つかで、次の 4 つの場合に分けられる。

1. $x^2 < y^2$ かつ $y^2 < z^2$ の場合：$x^2 < z^2$ であるから、$x \prec z$ である。
2. $x^2 < y^2$ かつ「$y^2 = z^2$、$y < z$」の場合：$x^2 < y^2 = z^2$ であるから、$x \prec z$ である。
3. 「$x^2 = y^2$、$x < y$」かつ $y^2 < z^2$ の場合：$x^2 = y^2 < z^2$ であるから、$x \prec z$ である。
4. 「$x^2 = y^2$、$x < y$」かつ「$y^2 = z^2$、$y < z$」の場合：$x^2 = z^2$ かつ $x < z$ であるから、$x \prec z$ である。

いずれの場合も $x \prec z$ が成り立つ。

以上より、$\prec$ は順序関係である。
:::

（補足）この順序では、絶対値の小さい数ほど前に来て、絶対値の等しい $-a$ と $a$（$a > 0$）では $-a$ が前に来る。たとえば次のように並ぶ。

$$
0 \prec -\tfrac{1}{2} \prec \tfrac{1}{2} \prec -1 \prec 1 \prec -2 \prec 2
$$

### 順序型と辞書式順序の例

この項は理解を優先して読んだ部分であり、自分で厳密に証明したものではない。説明の文章は Claude が書いた。

:::example[開区間 (−1, 1) と ℝ]{#ex-interval-real}
通常の大小関係について、開区間 $(-1, 1)$ と $\mathbb{R}$ は同じ順序型をもつ。
:::

（補足）たとえば

$$
f \colon (-1, 1) \to \mathbb{R}, \qquad f(x) = \frac{x}{1 - x^2}
$$

は順序を保つ全単射である。$f$ は連続かつ狭義単調増加であり、$x \to \pm 1$ のとき $f(x) \to \pm \infty$ となるから、すべての実数値をとる。

:::example[ℝ × ℝ の辞書式順序]{#ex-dictionary-plane}
$\mathbb{R} \times \mathbb{R}$ に辞書式順序を入れる。平面上の点として見ると、$x$ 座標の小さい縦線上の点ほど前に来て、同じ縦線上では下にある点ほど前に来る。
:::

（補足）たとえば $(1, 100) < (2, -100)$ である。第 1 成分で大小が決まるので、第 2 成分の大きさは関係しない。

:::example[因子の順番で順序型が変わる]{#ex-dictionary-order-type}
$\{1, 2\}$ と $\mathbb{Z}_{+}$ に通常の大小関係を入れ、それぞれの直積に辞書式順序を考える。元は次のように並ぶ。

$$
\begin{aligned}
&\{1, 2\} \times \mathbb{Z}_{+} \colon \\
&(1, 1) < (1, 2) < (1, 3) < \cdots \\
&\quad < (2, 1) < (2, 2) < \cdots \\[4pt]
&\mathbb{Z}_{+} \times \{1, 2\} \colon \\
&(1, 1) < (1, 2) < (2, 1) \\
&\quad < (2, 2) < (3, 1) < \cdots
\end{aligned}
$$

このように、直積の因子の順番を入れ替えると、辞書式順序による順序型が変わることがある。
:::

（補足）2 つの順序型が異なることは、直前の元に注目するとわかる。
$\{1, 2\} \times \mathbb{Z}_{+}$ において、$(2, 1)$ は最小元ではないが、直前の元をもたない。実際、$(2, 1)$ より小さい元は $(1, n)$ の形をしており、そのすぐ後ろには $(1, n + 1)$ があるからである。
一方、$\mathbb{Z}_{+} \times \{1, 2\}$ では、最小元 $(1, 1)$ 以外のすべての元が直前の元をもつ。
順序を保つ全単射は最小元を最小元に、直前の元を直前の元に移すから、この 2 つの順序集合は同じ順序型をもたない。

## 4. 上界・下界と完備性

### 定義

以下、$(A, <)$ を順序集合とし、$A_0 \subseteq A$ とする。

:::definition[最大元・最小元]{#def-largest-element}
$b \in A_0$ が、任意の $x \in A_0$ に対して $x \le b$ を満たすとき、$b$ を $A_0$ の**最大元**という。
同様に、$b \in A_0$ が、任意の $x \in A_0$ に対して $b \le x$ を満たすとき、$b$ を $A_0$ の**最小元**という。
:::

:::definition[上界・下界]{#def-bound}
$b \in A$ が、任意の $x \in A_0$ に対して $x \le b$ を満たすとき、$b$ を $A_0$ の**上界**という。$A_0$ の上界が存在するとき、$A_0$ は**上に有界**であるという。
同様に、任意の $x \in A_0$ に対して $b \le x$ を満たす $b \in A$ を $A_0$ の**下界**といい、下界が存在するとき、$A_0$ は**下に有界**であるという。
:::

最大元は $A_0$ に属していなければならないが、上界は $A$ の元であればよく、$A_0$ に属するとは限らない。

:::definition[最小上界・最大下界]{#def-sup-inf}
$A_0$ の上界全体の集合が最小元をもつとき、その最小元を $A_0$ の**最小上界**（supremum）といい、$\sup A_0$ で表す。
同様に、$A_0$ の下界全体の集合が最大元をもつとき、その最大元を $A_0$ の**最大下界**（infimum）といい、$\inf A_0$ で表す。
:::

:::definition[最小上界性質・最大下界性質]{#def-lub-property}
$A$ の空でない部分集合で上に有界なものが、つねに $A$ の中に最小上界をもつとき、$A$ は**最小上界性質**をもつという。
同様に、$A$ の空でない部分集合で下に有界なものが、つねに $A$ の中に最大下界をもつとき、$A$ は**最大下界性質**をもつという。
:::

### 最小上界性質をもたない例

:::example[0 を除いた区間]{#ex-no-lub}
$\mathbb{R}$ の通常の大小関係を制限して、

$$
\begin{aligned}
A &= (-1, 0) \cup (0, 1), \\
B &= \left\{\, -\frac{1}{2n} \;\middle|\; n \in \mathbb{Z}_{+} \,\right\}
\end{aligned}
$$

とする。$B$ は空でなく、$A$ において上に有界であるが、$A$ の中に最小上界をもたない。したがって、$A$ は最小上界性質をもたない。
:::

:::proof{origin=self text=ai}
$B = \{-\tfrac{1}{2}, -\tfrac{1}{4}, -\tfrac{1}{6}, \dots\}$ は空でなく、$B \subseteq (-1, 0) \subseteq A$ である。

まず、$A$ における $B$ の上界全体が、ちょうど $(0, 1)$ であることを示す。
$y \in (0, 1)$ ならば、$B$ の元はすべて負であるから $y$ より小さい。よって $y$ は $B$ の上界であり、とくに $B$ は上に有界である。
一方、$y \in (-1, 0)$ ならば、$\frac{1}{2n} < -y$ を満たす $n \in \mathbb{Z}_{+}$ が存在する。このとき $y < -\frac{1}{2n}$ かつ $-\frac{1}{2n} \in B$ であるから、$y$ は $B$ の上界ではない。

次に、$(0, 1)$ が最小元をもたないことを示す。$y \in (0, 1)$ ならば $\frac{y}{2} \in (0, 1)$ かつ $\frac{y}{2} < y$ であるから、$y$ は $(0, 1)$ の最小元ではない。

したがって、$B$ の上界全体は最小元をもたず、$B$ は $A$ の中に最小上界をもたない。
:::

（補足）$\mathbb{R}$ の中で考えれば $\sup B = 0$ であるが、$0 \notin A$ である。最小上界が存在するかどうかは、どの集合の中で上界を考えるかによって変わる。

### 最小上界性質から最大下界性質

:::theorem[最小上界性質ならば最大下界性質]{#thm-lub-glb source="Munkres, §3 演習 13"}
順序集合 $A$ が最小上界性質をもつならば、$A$ は最大下界性質ももつ。
:::

:::proof{origin=self text=ai note="解答を一度確認したあと、見ずに最初から証明し直した"}
$B$ を、$A$ の空でない部分集合で下に有界なものとする。$B$ が $A$ の中に最大下界をもつことを示せばよい。

$B$ の下界全体の集合を

$$
L = \{\, l \in A \mid \forall b \in B,\ l \le b \,\}
$$

とおく。

$B$ は下に有界であるから、$L \ne \varnothing$ である。また、$B \ne \varnothing$ であるから $b_0 \in B$ がとれ、任意の $l \in L$ に対して $l \le b_0$ が成り立つ。
よって $b_0$ は $L$ の上界であり、$L$ は上に有界である。

$A$ は最小上界性質をもつから、$L$ の最小上界 $s = \sup L \in A$ が存在する。この $s$ が $B$ の最大下界であることを示す。

まず、$s$ は $B$ の下界である。実際、任意の $b \in B$ は、$b_0$ と同じ理由で $L$ の上界である。$s$ は $L$ の上界のうち最小のものであるから、$s \le b$ が成り立つ。よって $s \in L$ である。

次に、$l$ を $B$ の任意の下界とすると、$l \in L$ である。$s$ は $L$ の上界であるから、$l \le s$ が成り立つ。

以上より、$s$ は $B$ の下界のうち最大のものであり、$s = \inf B$ である。
:::
