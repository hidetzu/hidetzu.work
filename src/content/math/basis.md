---
title: "位相の基底と生成される位相"
aliases:
  - "basis for a topology"
description: "基底の定義、基底が生成する位相、有理数を端点とする開区間が実数の通常の位相を生成すること（学習途中）。"
topic: topology
order: 2
status: studying
createdAt: 2026-11-08
updatedAt: 2026-11-17
related:
  - rational-density
tags:
  - basis
  - topological-space
  - munkres
sources:
  - title: "James R. Munkres, Topology, 2nd ed."
    location: "Chapter 2, §13 Basis for a Topology"
textbook:
  chapter: 2
  section: 13
---

## 1. このノートで扱うこと

- 位相の基底の定義と、基底から位相が作られるしくみ
- 実数の通常の位相が、有理数を端点とする開区間だけから生成されること

位相の定義と記号は [位相空間のノート](/math/topological-spaces#def-topology) と同じものを使う。

## 2. 基底の定義

:::definition[基底]{#def-basis}
集合 $X$ の部分集合族 $\mathcal{B} \subseteq \mathcal{P}(X)$ が次の 2 条件を満たすとき、$\mathcal{B}$ を $X$ 上の位相の**基底**といい、$\mathcal{B}$ の元を**基底要素**という。

1. （被覆条件）任意の $x \in X$ に対して、$x \in B$ を満たす $B \in \mathcal{B}$ が存在する。
2. （共通部分についての局所条件）任意の $B_1, B_2 \in \mathcal{B}$ と任意の $x \in B_1 \cap B_2$ に対して、
   $$
   x \in B_3 \subseteq B_1 \cap B_2
   $$
   を満たす $B_3 \in \mathcal{B}$ が存在する。
:::

条件 2 で大事なのは、次の点。

- $B_1 \cap B_2$ 自体が $\mathcal{B}$ に属する必要はない。
- 求められているのは、共通部分の**各点ごとに**、その点を含み共通部分に収まる基底要素を取れること。

基底は位相そのものを列挙するものではなく、位相を作るための材料になる集合族である。

## 3. 基底が生成する位相

:::definition[基底が生成する位相]{#def-generated-topology}
$\mathcal{B}$ を $X$ 上の位相の基底とする。

$$
\mathcal{T}_{\mathcal{B}} = \left\{\, U \subseteq X \ \middle|\ \forall x \in U,\ \exists B \in \mathcal{B} :\ x \in B \subseteq U \,\right\}
$$

を $\mathcal{B}$ が**生成する位相**という。
:::

$U$ に属するどの点にも、その点を含み $U$ に収まる基底要素がある。それが $\mathcal{T}_{\mathcal{B}}$ の元の条件。

:::proposition[基底要素の和集合による表し方]{#prop-union}
$$
\mathcal{T}_{\mathcal{B}} = \left\{\, \bigcup_{\lambda \in \Lambda} B_\lambda \ \middle|\ \{B_\lambda\}_{\lambda \in \Lambda} \subseteq \mathcal{B} \,\right\}
$$

添字集合 $\Lambda$ は任意で、空でもよい（空な和集合は $\varnothing$）。
:::

:::proof[補足]{origin=ai}
$\subseteq$：$U \in \mathcal{T}_{\mathcal{B}}$ とする。各 $x \in U$ に対して $x \in B_x \subseteq U$ を満たす $B_x \in \mathcal{B}$ を 1 つ選ぶと、$U = \bigcup_{x \in U} B_x$。
実際、各 $B_x$ は $U$ に含まれ、$U$ の各点 $x$ は $B_x$ に属する。$U = \varnothing$ のときは空な和集合になる。

$\supseteq$：基底要素は $\mathcal{T}_{\mathcal{B}}$ に属し（[6 節の命題](#prop-basis-open)）、$\mathcal{T}_{\mathcal{B}}$ は任意の和集合について閉じている（[4 節の条件 2](#thm-generated-is-topology)）。よって基底要素の和集合は $\mathcal{T}_{\mathcal{B}}$ に属する。
:::

この命題は 6 節と 7 節で使う。

## 4. 生成される位相が位相であること

:::theorem{#thm-generated-is-topology}
$\mathcal{B}$ が $X$ 上の位相の基底ならば、$\mathcal{T}_{\mathcal{B}}$ は $X$ 上の位相である。
:::

:::proof{origin=self-reviewed}
位相の 3 条件を確かめる。

**条件 1.** $\varnothing$ については、$x \in \varnothing$ となる $x$ がないので、条件は空虚に成り立つ。
$X$ については、被覆条件より、任意の $x \in X$ に対して $x \in B \subseteq X$ を満たす $B \in \mathcal{B}$ がある。よって $\varnothing, X \in \mathcal{T}_{\mathcal{B}}$。

**条件 2.** $\{U_\alpha\}_{\alpha \in A} \subseteq \mathcal{T}_{\mathcal{B}}$ とし、$x \in \bigcup_{\alpha \in A} U_\alpha$ を取る。ある $\alpha \in A$ について $x \in U_\alpha$。
$\mathcal{T}_{\mathcal{B}}$ の定義から、

$$
x \in B \subseteq U_\alpha \subseteq \bigcup_{\alpha \in A} U_\alpha
$$

を満たす $B \in \mathcal{B}$ がある。よって $\bigcup_{\alpha \in A} U_\alpha \in \mathcal{T}_{\mathcal{B}}$。

**条件 3.** $U_1, \dots, U_n \in \mathcal{T}_{\mathcal{B}}$（$n \ge 1$）とし、$x \in \bigcap_{i=1}^{n} U_i$ を取る。
各 $i$ について、$\mathcal{T}_{\mathcal{B}}$ の定義から $x \in B_i \subseteq U_i$ を満たす $B_i \in \mathcal{B}$ がある。
基底の条件 2 を繰り返し使うと

$$
x \in B \subseteq \bigcap_{i=1}^{n} B_i \subseteq \bigcap_{i=1}^{n} U_i
$$

を満たす $B \in \mathcal{B}$ が得られる。よって $\bigcap_{i=1}^{n} U_i \in \mathcal{T}_{\mathcal{B}}$。

（補足）「繰り返し使う」は、$k$ についての帰納法で次のように書ける。
主張は「$x \in B'_k \subseteq B_1 \cap \cdots \cap B_k$ を満たす $B'_k \in \mathcal{B}$ がある」。
$k = 1$ では $B'_1 = B_1$ とすればよい。$k$ で成り立つとき、$x \in B'_k \cap B_{k+1}$ なので、基底の条件 2 を $B'_k$ と $B_{k+1}$ に使うと、
$x \in B'_{k+1} \subseteq B'_k \cap B_{k+1} \subseteq B_1 \cap \cdots \cap B_{k+1}$ を満たす $B'_{k+1} \in \mathcal{B}$ がある。
:::

最初は、$B_1 \cap \cdots \cap B_n$ そのものが基底要素になると考えかけた。
しかし基底の条件 2 が保証するのは共通部分の中に収まるさらに小さな基底要素だけなので、条件 2 を 1 回ずつ繰り返す形に直した。

:::remark[位相どうしの共通部分との違い]
[位相空間のノートの問題 3](/math/topological-spaces#q3) では、**位相どうし**の共通部分 $\bigcap_\alpha \mathcal{T}_\alpha$ が位相になることを示した。
各 $\mathcal{T}_\alpha$ が同じ閉じ方（和集合と有限個の共通部分について閉じていること）を持ち、その性質が共通部分に引き継がれるからだった。

ここで扱っているのは、1 つの基底の中の**基底要素どうし**（$X$ の部分集合どうし）の共通部分で、操作している対象の階層が違う。
:::

## 5. 有限個の共通部分と無限個の共通部分

位相の条件 3 が有限個の共通部分だけを求める理由を考えた。

:::example[開集合の無限個の共通部分]{#ex-infinite-intersection}
実数の通常の位相（7 節）で $B_n = \left( -\dfrac{1}{n}, \dfrac{1}{n} \right)$（$n = 1, 2, \dots$）とすると、各 $B_n$ は開集合だが

$$
\bigcap_{n=1}^{\infty} B_n = \{0\}
$$

で、$\{0\}$ は開集合ではない。どんな $\varepsilon > 0$ についても $(-\varepsilon, \varepsilon) \not\subseteq \{0\}$ だから。
:::

- 基底の条件 2 は、2 つの基底要素の共通部分についての局所条件。
- これを有限回繰り返せば、有限個の共通部分について必要なことが示せる（4 節の条件 3）。
- 無限個の共通部分では「繰り返し」が終わらず、同じことは保証できない。実際、上の例のように無限個の共通部分は開集合でなくなる場合がある。
- 一方、和集合は任意個でも生成される位相に入る（4 節の条件 2）。

（補足）上の $B_n$ は有理数を端点とする開区間なので、7 節の $\mathcal{B}_{\mathbb{Q}}$ の元でもある。
$0 \in \{0\}$ だが、$\{0\}$ に収まる基底要素は 1 つもない。

## 6. 基底と生成される位相の関係

:::proposition[基底要素は開集合]{#prop-basis-open}
$$
\mathcal{B} \subseteq \mathcal{T}_{\mathcal{B}}
$$
:::

:::proof{origin=self-reviewed}
$B \in \mathcal{B}$ と $x \in B$ を任意に取る。基底要素として $B$ 自身を取れば $x \in B \subseteq B$。よって $B \in \mathcal{T}_{\mathcal{B}}$。
:::

:::proposition[位相はそれ自身の基底]{#prop-topology-as-basis}
$\mathcal{T}$ を $X$ 上の位相とする。$\mathcal{B} = \mathcal{T}$ は $X$ 上の位相の基底で、

$$
\mathcal{T}_{\mathcal{B}} = \mathcal{T} .
$$
:::

:::proof{origin=self-reviewed}
**基底であること。** 条件 1 は、$X \in \mathcal{T}$ なので、任意の $x \in X$ について $B = X$ を取ればよい。
条件 2 は、$U, V \in \mathcal{T}$ と $x \in U \cap V$ に対して、$U \cap V \in \mathcal{T}$ なので $B_3 = U \cap V$ を取ればよい。

**$\mathcal{T} \subseteq \mathcal{T}_{\mathcal{B}}$。** 基底要素は生成される位相に属する（上の命題）。

**$\mathcal{T}_{\mathcal{B}} \subseteq \mathcal{T}$。** [3 節の命題](#prop-union)より、$\mathcal{T}_{\mathcal{B}}$ の元は $\mathcal{T}$ の元の和集合で表せる（この命題を使うことを明示したのは補足）。$\mathcal{T}$ は任意の和集合について閉じているので、それは $\mathcal{T}$ に属する。
:::

したがって、どの位相も何かの基底から生成される。ただし、基底は位相全体である必要はなく、7 節のようにずっと小さく取れることがある。

## 7. 有理数を端点とする開区間による通常の位相の生成

今回いちばん時間をかけて考えた証明。

:::definition[実数の通常の位相]{#def-standard-topology}
$$
\mathcal{T} = \left\{\, U \subseteq \mathbb{R} \ \middle|\ \forall x \in U,\ \exists \varepsilon > 0 :\ (x - \varepsilon, x + \varepsilon) \subseteq U \,\right\}
$$

を $\mathbb{R}$ の通常の位相とする。
:::

このノートでは、$\mathcal{T}$ が位相であることは確かめずに使う。有理数を端点とする開区間全体を

$$
\mathcal{B}_{\mathbb{Q}} = \{\, (m, n) \mid m, n \in \mathbb{Q},\ m < n \,\}
$$

とおく。

:::proposition[有理数端点の開区間は基底]{#prop-rational-basis}
$\mathcal{B}_{\mathbb{Q}}$ は $\mathbb{R}$ 上の位相の基底である。
:::

:::proof[補足]{origin=ai}
**条件 1.** $x \in \mathbb{R}$ とする。[有理数の稠密性](/math/rational-density#thm-rational-density)より、$x - 1 < m < x$ と $x < n < x + 1$ を満たす $m, n \in \mathbb{Q}$ がある。$x \in (m, n) \in \mathcal{B}_{\mathbb{Q}}$。

**条件 2.** $(m_1, n_1), (m_2, n_2) \in \mathcal{B}_{\mathbb{Q}}$ と $x \in (m_1, n_1) \cap (m_2, n_2)$ を取る。
$m = \max\{m_1, m_2\}$、$n = \min\{n_1, n_2\}$ とおくと $m, n \in \mathbb{Q}$ で、

$$
(m_1, n_1) \cap (m_2, n_2) = (m, n) .
$$

$x$ がこれに属するので $m < x < n$、特に $m < n$。よって $B_3 = (m, n) \in \mathcal{B}_{\mathbb{Q}}$ とすれば $x \in B_3 \subseteq (m_1, n_1) \cap (m_2, n_2)$。
:::

$\mathcal{B}_{\mathbb{Q}}$ では、点を含む 2 つの基底要素の共通部分がたまたま基底要素そのものになる。2 節で書いたとおり、一般の基底ではそうとは限らない。

:::theorem[有理数端点の開区間は通常の位相を生成する]{#thm-rational-generates}
$$
\mathcal{T}_{\mathcal{B}_{\mathbb{Q}}} = \mathcal{T}
$$
:::

:::proof{origin=self-reviewed}
相互包含を示す。

**第 1 段階：$\mathcal{T}_{\mathcal{B}_{\mathbb{Q}}} \subseteq \mathcal{T}$。**
有理数端点の開区間は通常の位相の開集合なので $\mathcal{B}_{\mathbb{Q}} \subseteq \mathcal{T}$。
（補足）実際、$x \in (m, n)$ に対して $\varepsilon = \min\{x - m,\ n - x\} > 0$ とすれば $(x - \varepsilon, x + \varepsilon) \subseteq (m, n)$。

[3 節の命題](#prop-union)より、$\mathcal{T}_{\mathcal{B}_{\mathbb{Q}}}$ の元は $\mathcal{B}_{\mathbb{Q}}$ の元の和集合で表せる。$\mathcal{T}$ は任意の和集合について閉じているので、それは $\mathcal{T}$ に属する。

**第 2 段階：$\mathcal{T} \subseteq \mathcal{T}_{\mathcal{B}_{\mathbb{Q}}}$。**
任意の $U \in \mathcal{T}$ と $x \in U$ を取る。通常の位相の定義より、$(x - \varepsilon, x + \varepsilon) \subseteq U$ を満たす $\varepsilon > 0$ がある。
[有理数の稠密性](/math/rational-density#thm-rational-density)より、

$$
x - \varepsilon < m < x, \qquad x < n < x + \varepsilon
$$

を満たす $m, n \in \mathbb{Q}$ がある。$m < x < n$ なので $(m, n) \in \mathcal{B}_{\mathbb{Q}}$ で、

$$
x \in (m, n) \subseteq (x - \varepsilon, x + \varepsilon) \subseteq U .
$$

$x \in U$ は任意なので $U \in \mathcal{T}_{\mathcal{B}_{\mathbb{Q}}}$。

以上より $\mathcal{T}_{\mathcal{B}_{\mathbb{Q}}} = \mathcal{T}$。
:::

:::example[具体例から一般の場合へ]{#ex-sqrt2-pi}
最初は具体的な開集合 $U = (\sqrt{2}, \pi)$ で考えた。端点はどちらも無理数だが、任意の $x \in U$ に対して、有理数の稠密性から

$$
\sqrt{2} < m < x < n < \pi
$$

を満たす有理数 $m, n$ が取れる。したがって $x \in (m, n) \subseteq (\sqrt{2}, \pi)$。

端点が無理数でも、各点のまわりに有理数端点の区間を取れば足りる。
この形を一般の $U \in \mathcal{T}$ に広げるとき、$U$ の端点の代わりに、通常の位相の定義が与える区間 $(x - \varepsilon, x + \varepsilon)$ を使ったのが第 2 段階。
:::

基底を $\mathcal{B}_{\mathbb{Q}}$ のように小さくできるのは、有理数の稠密性があるから。
どんなに狭い区間の中にも有理数があるので、端点を有理数に限っても、各点のまわりの区間をいくらでも小さく取れる。

## 8. 可算な基底への接続

$\mathbb{Q}$ は可算で、$\mathbb{Q} \times \mathbb{Q}$ も可算。$(m, n) \mapsto (m, n)$（組から開区間へ）で $\mathcal{B}_{\mathbb{Q}}$ は $\mathbb{Q} \times \mathbb{Q}$ の部分集合と 1 対 1 に対応するので、$\mathcal{B}_{\mathbb{Q}}$ は可算である。

一方、通常の位相は非可算個の開集合を持つ。（補足）たとえば $a \in \mathbb{R}$ ごとに $(a, a + 1)$ はすべて異なる開集合である。

つまり、可算個の基底要素から非可算個の開集合が生成されている。これは後で学ぶ「第二可算性」につながる話題で、ここでは触れるだけにする。

## 9. 学習を通して理解したこと

- 基底の条件 2 が保証するのは、共通部分そのものが基底要素になることではなく、共通部分の各点を含むさらに小さな基底要素を取れること。
- 有限個の共通部分は、条件 2 を有限回繰り返して扱える。無限個の共通部分は開集合でなくなる場合がある。
- 位相空間のノートの「位相どうしの共通部分」と、このノートの「基底要素どうしの共通部分」は、操作している対象の階層が違う。
- 通常の位相と $\mathcal{B}_{\mathbb{Q}}$ が生成する位相の一致は、相互包含で示した。
- 有理数の稠密性が、基底を小さくできる理由として働いている。

## 10. 次に学ぶこと

:::question[与えられた位相に対する基底の判定]{#q-basis-criterion}
与えられた位相に対して、ある集合族がその位相の基底になっているかを判定する条件（Munkres §13）は、まだ扱っていない。
7 節の相互包含による証明は、その判定条件とどう関係するのか。
:::
