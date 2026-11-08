---
title: "位相空間の定義と位相の強弱"
description: "Munkres『Topology』§12 の学習ノート。位相の定義と代表例、位相の強弱、位相の共通部分と和集合、集合族を含む最も弱い位相の存在。"
topic: topology
status: understood
createdAt: 2026-11-08
tags:
  - topological-space
  - munkres
sources:
  - title: "James R. Munkres, Topology, 2nd ed."
    location: "Chapter 2, §12 Topological Spaces"
---

:::remark[このノートの書き方]
5 節の問題 1〜5 の結論・反例・証明の方針は自分で考えたもの。
証明の文章を整えるときに、自分の証明に書いていなかった細かい確認を補った箇所には **（補足）** と付けた。
問題 5 は、自分で考えた方針をもとに、記号と包含関係の向きをレビューで直した形で載せている。
:::

## 1. 学習の目的

- 位相空間の定義を理解し、与えられた集合族が位相であることを自分で証明できるようになる
- 位相の強弱を理解し、複数の位相から新しい位相を作る方法を考える

## 2. 位相空間の定義

:::definition[位相・位相空間]{#def-topology}
集合 $X$ の部分集合族 $\mathcal{T} \subseteq \mathcal{P}(X)$ が次の 3 条件を満たすとき、$\mathcal{T}$ を $X$ 上の**位相**という。

1. $\varnothing \in \mathcal{T}$ かつ $X \in \mathcal{T}$
2. 任意の部分族 $\{U_\lambda\}_{\lambda \in \Lambda} \subseteq \mathcal{T}$ に対して $\bigcup_{\lambda \in \Lambda} U_\lambda \in \mathcal{T}$
3. 任意の $U_1, \dots, U_n \in \mathcal{T}$（$n \ge 1$）に対して $U_1 \cap \cdots \cap U_n \in \mathcal{T}$

組 $(X, \mathcal{T})$ を**位相空間**、$\mathcal{T}$ の元を**開集合**という。
:::

2 は和集合を取る個数に制限がなく、3 は共通部分を取る個数が有限に限られている。この非対称性が、あとの例で何度も効いてくる。

## 3. 代表的な位相

### 離散位相と密着位相

:::example[離散位相]
$\mathcal{T} = \mathcal{P}(X)$。すべての部分集合が開集合。$\mathcal{P}(X)$ はどんな和集合・共通部分についても閉じているので位相になる。
:::

:::example[密着位相]
$\mathcal{T} = \{\varnothing, X\}$。開集合は空集合と全体集合だけ。
$\varnothing$ と $X$ をどう組み合わせて和集合・共通部分を取っても $\varnothing$ か $X$ になるので位相になる。
:::

### 有限補集合位相

:::definition[有限補集合位相]{#def-finite-complement}

$$
\mathcal{T}_f = \{\varnothing\} \cup \{\, U \subseteq X \mid X \setminus U \text{ は有限} \,\}
$$

:::

:::proposition{#prop-finite-complement}
$\mathcal{T}_f$ は $X$ 上の位相である。
:::

:::proof[補足]
**条件 1.** $\varnothing \in \mathcal{T}_f$ は定義から。$X \setminus X = \varnothing$ は有限なので $X \in \mathcal{T}_f$。

**条件 2.** $\{U_\lambda\}_{\lambda \in \Lambda} \subseteq \mathcal{T}_f$ とする。すべての $U_\lambda$ が空なら（$\Lambda = \varnothing$ の場合も含めて）和集合は $\varnothing \in \mathcal{T}_f$。
そうでなければ $U_\mu \ne \varnothing$ となる $\mu$ があり、$X \setminus U_\mu$ は有限。ド・モルガンの法則より

$$
X \setminus \bigcup_{\lambda \in \Lambda} U_\lambda = \bigcap_{\lambda \in \Lambda} (X \setminus U_\lambda) \subseteq X \setminus U_\mu
$$

で、有限集合の部分集合は有限なので、和集合は $\mathcal{T}_f$ に属する。

**条件 3.** $U_1, \dots, U_n \in \mathcal{T}_f$ とする。どれかが空なら共通部分は $\varnothing \in \mathcal{T}_f$。
そうでなければ各 $X \setminus U_i$ は有限で、ド・モルガンの法則より

$$
X \setminus \bigcap_{i=1}^{n} U_i = \bigcup_{i=1}^{n} (X \setminus U_i)
$$

は有限個の有限集合の和集合なので有限。よって共通部分は $\mathcal{T}_f$ に属する。
:::

和集合の側では、補集合が「有限集合の共通部分」になるので、1 つでも有限な補集合があれば足りる。個数は関係ない。
共通部分の側では、補集合が「有限集合の和集合」になるので、個数が有限であることが必要になる。

:::example[無限個の共通部分は開とは限らない（補足）]
$X = \mathbb{N} = \{0, 1, 2, \dots\}$ とし、$n \ge 1$ に対して $U_n = X \setminus \{n\} \in \mathcal{T}_f$ とおく。

$$
\bigcap_{n \ge 1} U_n = \{0\}
$$

は空でなく、補集合 $\{1, 2, 3, \dots\}$ は無限集合なので、$\mathcal{T}_f$ に属さない。
:::

$X$ が有限集合なら、すべての部分集合の補集合が有限なので $\mathcal{T}_f = \mathcal{P}(X)$（離散位相）になる。

### 可算補集合位相

:::remark[まだ確かめていない]
有限を「可算」に置き換えた

$$
\mathcal{T}_c = \{\varnothing\} \cup \{\, U \subseteq X \mid X \setminus U \text{ は可算} \,\}
$$

も位相になるとされる。ただし、これが位相であることはまだ自分で証明を確かめていない。
:::

## 4. 位相の強弱

:::definition[位相の強弱]{#def-finer}
$\mathcal{T}_1, \mathcal{T}_2$ を集合 $X$ 上の位相とする。$\mathcal{T}_1 \subseteq \mathcal{T}_2$ のとき、
$\mathcal{T}_2$ は $\mathcal{T}_1$ より**強い**、$\mathcal{T}_1$ は $\mathcal{T}_2$ より**弱い**という。
$\mathcal{T}_1 \subseteq \mathcal{T}_2$ と $\mathcal{T}_2 \subseteq \mathcal{T}_1$ のどちらかが成り立つとき、2 つの位相は**比較可能**という。
:::

Munkres では finer / coarser という語を使う。強い位相ほど開集合が多い。

- **離散位相が最も強い。** 任意の位相 $\mathcal{T}$ は $\mathcal{T} \subseteq \mathcal{P}(X)$ を満たす
- **密着位相が最も弱い。** 任意の位相 $\mathcal{T}$ は条件 1 より $\{\varnothing, X\} \subseteq \mathcal{T}$ を満たす
- **2 つの位相は比較可能とは限らない。** 例は問題 1

## 5. 自分で取り組んだ問題と証明

以下、問題 1, 2, 4 では $X = \{a, b, c\}$（$a, b, c$ は相異なる）とする。

位相であることの確認では、次を何度も使う。

:::lemma[有限な集合族の確認（補足）]{#lem-finite-family}
$X$ の部分集合族 $\mathcal{T}$ が有限集合で、$\varnothing, X \in \mathcal{T}$ を満たし、
任意の $U, V \in \mathcal{T}$ に対して $U \cup V \in \mathcal{T}$ かつ $U \cap V \in \mathcal{T}$ ならば、$\mathcal{T}$ は位相である。
:::

:::proof
$\mathcal{T}$ が有限なので、その部分族も有限である。空な部分族の和集合は $\varnothing \in \mathcal{T}$。
空でない有限個の元の和集合と共通部分は、2 つずつの和集合・共通部分を繰り返して得られるので、帰納法により $\mathcal{T}$ に属する。
:::

特に、$\mathcal{T}$ の元が包含関係で一列に並ぶとき（$U \subseteq V$ または $V \subseteq U$ が常に成り立つとき）は、
$U \cup V$ と $U \cap V$ は $U, V$ のどちらかに等しいので、補題の条件が自動的に満たされる。

### 問題 1：2 つの位相の比較

:::example{#q1}
$\mathcal{T}_1 = \{\varnothing, \{a\}, X\}$、$\mathcal{T}_2 = \{\varnothing, \{a, b\}, X\}$ はどちらも $X$ 上の位相で、互いに比較できない。
:::

:::proof
**位相であること。** $\varnothing \subseteq \{a\} \subseteq X$ と $\varnothing \subseteq \{a, b\} \subseteq X$ より、どちらも元が包含関係で一列に並ぶ有限な族で、$\varnothing$ と $X$ を含む。補題より位相である。

**比較できないこと。**
$\{a\} \in \mathcal{T}_1$ だが $\{a\} \notin \mathcal{T}_2$ なので $\mathcal{T}_1 \nsubseteq \mathcal{T}_2$。
$\{a, b\} \in \mathcal{T}_2$ だが $\{a, b\} \notin \mathcal{T}_1$ なので $\mathcal{T}_2 \nsubseteq \mathcal{T}_1$。
:::

### 問題 2：2 つの位相を含む最も弱い位相

:::example{#q2}
$\mathcal{T}_1 = \{\varnothing, \{a\}, X\}$、$\mathcal{T}_2 = \{\varnothing, \{b\}, X\}$ とする。

$$
\mathcal{T}_3 = \{\varnothing, \{a\}, \{b\}, \{a, b\}, X\}
$$

は $\mathcal{T}_1$ と $\mathcal{T}_2$ をともに含む位相のうちで最も弱い。すなわち

1. $\mathcal{T}_3$ は位相で、$\mathcal{T}_1 \cup \mathcal{T}_2 \subseteq \mathcal{T}_3$
2. $\mathcal{T}_1 \cup \mathcal{T}_2 \subseteq \mathcal{S}$ を満たす任意の位相 $\mathcal{S}$ に対して $\mathcal{T}_3 \subseteq \mathcal{S}$
:::

:::proof
**1. 位相であること。** $\mathcal{T}_3$ は有限で $\varnothing, X$ を含む。補題を使うため、2 元の和集合・共通部分を確かめる（補足）。
一方が $\varnothing$ または $X$ の場合と、一方が他方を含む場合（$\{a\} \subseteq \{a, b\}$、$\{b\} \subseteq \{a, b\}$）は、結果が 2 元のどちらかに等しい。
残るのは $\{a\}$ と $\{b\}$ の組だけで、

$$
\{a\} \cup \{b\} = \{a, b\} \in \mathcal{T}_3, \qquad \{a\} \cap \{b\} = \varnothing \in \mathcal{T}_3 .
$$

よって $\mathcal{T}_3$ は位相である。$\mathcal{T}_1 \cup \mathcal{T}_2 = \{\varnothing, \{a\}, \{b\}, X\} \subseteq \mathcal{T}_3$ は見ればわかる。

**2. 最も弱いこと。** $\mathcal{S}$ を $\mathcal{T}_1 \cup \mathcal{T}_2 \subseteq \mathcal{S}$ を満たす任意の位相とする。
このとき $\varnothing, \{a\}, \{b\}, X \in \mathcal{S}$。さらに $\mathcal{S}$ は位相なので条件 2 より $\{a\} \cup \{b\} = \{a, b\} \in \mathcal{S}$。
$\mathcal{T}_3$ の 5 つの元がすべて $\mathcal{S}$ に属するので、$\mathcal{T}_3 \subseteq \mathcal{S}$。
:::

「最も弱い」を示すには、$\mathcal{T}_3$ が条件を満たすことに加えて、条件を満たす**すべての**位相との包含関係を示す必要がある。
2 で $\mathcal{S}$ を具体的に決めずに議論しているのはそのため。

### 問題 3：任意個の位相の共通部分

:::proposition{#q3}
$\{\mathcal{T}_\alpha\}_{\alpha \in A}$ を $X$ 上の位相の族とする。

$$
\mathcal{T} = \bigcap_{\alpha \in A} \mathcal{T}_\alpha
$$

は $X$ 上の位相である。添字集合 $A$ は無限でもよい。$A = \varnothing$ のときは、共通部分を $\mathcal{P}(X)$ と約束する。
:::

:::proof
$A = \varnothing$ のとき、$\mathcal{T} = \mathcal{P}(X)$ は離散位相なので位相。以下 $A \ne \varnothing$ とする。

**条件 1.** 各 $\mathcal{T}_\alpha$ は位相なので $\varnothing, X \in \mathcal{T}_\alpha$。これがすべての $\alpha$ で成り立つので $\varnothing, X \in \mathcal{T}$。

**条件 2.** $\{U_\lambda\}_{\lambda \in \Lambda} \subseteq \mathcal{T}$ とする。任意の $\alpha \in A$ を固定すると、すべての $\lambda$ について $U_\lambda \in \mathcal{T}_\alpha$。
$\mathcal{T}_\alpha$ は位相なので $\bigcup_\lambda U_\lambda \in \mathcal{T}_\alpha$。$\alpha$ は任意なので $\bigcup_\lambda U_\lambda \in \mathcal{T}$。

**条件 3.** $U_1, \dots, U_n \in \mathcal{T}$ とする。任意の $\alpha \in A$ について $U_1, \dots, U_n \in \mathcal{T}_\alpha$ なので
$U_1 \cap \cdots \cap U_n \in \mathcal{T}_\alpha$。$\alpha$ は任意なので $U_1 \cap \cdots \cap U_n \in \mathcal{T}$。
:::

どの条件も、1 つの $\mathcal{T}_\alpha$ の中で確かめてから「$\alpha$ は任意」とまとめている。
条件 3 の「有限」は共通部分を取る**開集合**の個数の制限で、共通部分を取る**位相**の個数とは関係がない。
だから $A$ が無限でも議論は変わらない。

### 問題 4：位相の和集合は位相とは限らない

:::example{#q4}
$\mathcal{T}_1 = \{\varnothing, \{a\}, X\}$、$\mathcal{T}_2 = \{\varnothing, \{b\}, X\}$ はどちらも位相だが、和集合 $\mathcal{T}_1 \cup \mathcal{T}_2$ は位相ではない。
:::

:::proof
$\mathcal{T}_1, \mathcal{T}_2$ は元が包含関係で一列に並ぶ有限な族で、$\varnothing$ と $X$ を含むので、補題より位相。

$$
\mathcal{T}_1 \cup \mathcal{T}_2 = \{\varnothing, \{a\}, \{b\}, X\}
$$

で、$\{a\}, \{b\}$ はこれに属するが、$\{a\} \cup \{b\} = \{a, b\}$ は属さない（$\{a, b\} \ne X$ は $c \notin \{a, b\}$ による）。
よって条件 2 を満たさない。
:::

この反例は自分で考えたもの。問題 2 の $\mathcal{T}_3$ は、この和集合に足りなかった $\{a, b\}$ を加えたものになっている。

### 問題 5：任意の集合族を含む最も弱い位相の存在

:::proposition{#q5}
任意の集合族 $\mathcal{A} \subseteq \mathcal{P}(X)$ に対して、$\mathcal{A}$ を含む位相のうちで最も弱いものが存在する。
:::

:::proof
$\mathcal{A}$ を含む $X$ 上の位相全体を

$$
\mathfrak{T} = \{\, \mathcal{S} \mid \mathcal{S} \text{ は } X \text{ 上の位相であり、} \mathcal{A} \subseteq \mathcal{S} \,\}
$$

とおく。離散位相 $\mathcal{P}(X)$ は $\mathcal{A} \subseteq \mathcal{P}(X)$ を満たすので $\mathcal{P}(X) \in \mathfrak{T}$ であり、$\mathfrak{T} \ne \varnothing$。そこで

$$
\mathcal{T}_* = \bigcap_{\mathcal{S} \in \mathfrak{T}} \mathcal{S}
$$

と定める。

**$\mathcal{T}_*$ は位相。** 問題 3 より、位相の族の共通部分は位相である。

**$\mathcal{A} \subseteq \mathcal{T}_*$。** $A \in \mathcal{A}$ とすると、すべての $\mathcal{S} \in \mathfrak{T}$ について $\mathcal{A} \subseteq \mathcal{S}$ だから $A \in \mathcal{S}$。よって $A \in \mathcal{T}_*$。

**最も弱い。** $\mathcal{S}$ を $\mathcal{A}$ を含む任意の位相とすると $\mathcal{S} \in \mathfrak{T}$。共通部分は各成分に含まれるので $\mathcal{T}_* \subseteq \mathcal{S}$。
:::

:::remark[補足]
- $\mathfrak{T}$ は $\mathcal{P}(\mathcal{P}(X))$ の部分集合なので、集合として問題なく定義できる。
- $\mathfrak{T} \ne \varnothing$ を確かめたのは、問題 3 で $A = \varnothing$ の約束に頼らずに済ませるため。
- 最も弱い位相は 1 つしかない。2 つあれば互いに相手を含むので等しい。
- $\mathcal{A} = \mathcal{T}_1 \cup \mathcal{T}_2$（問題 2）とすると、$\mathcal{T}_*$ は問題 2 の $\mathcal{T}_3$ に一致する。どちらも「$\mathcal{T}_1 \cup \mathcal{T}_2$ を含む最も弱い位相」で、それは 1 つしかないから。
:::

問題 2 では $\mathcal{T}_3$ を具体的に書き出したが、問題 5 では元を 1 つも列挙せずに存在を示している。

## 6. 学習を通して理解したこと

- 位相は「どの部分集合を開集合と呼ぶか」を決める集合族で、3 条件だけで定義される。
- 位相の強弱は、開集合族の包含関係そのもの。開集合が多いほど強い。包含関係なので、比較できない組もある。
- 位相の共通部分は位相になるが、和集合は一般には位相にならない。和集合では、異なる位相から来た開集合同士の和集合が抜け落ちる（問題 4）。
- 「最も弱い」を示すには、候補が条件を満たすことだけでなく、条件を満たす任意の位相に含まれることを示す必要がある。
- 位相を具体的に書き出さなくても、条件を満たす位相全体の共通部分として存在を示せる（問題 5）。

## 7. 次に学ぶこと

:::question[基底や生成される位相との関係]{#q-basis}
次は Munkres §13（Basis for a Topology）に進む。
問題 5 の「集合族 $\mathcal{A}$ を含む最も弱い位相」は、§13 で扱う基底や「生成される位相」とどう関係するのか。
$\mathcal{T}_*$ の元を、$\mathcal{A}$ の元から具体的に作る方法はあるのか。
:::

:::question[可算補集合位相]
$\mathcal{T}_c$ が位相であることを自分で証明する。有限補集合位相の証明のどこを「可算」に置き換えればよいか。
:::
