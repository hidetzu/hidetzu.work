---
title: "集合と包含関係"
description: "集合の表記（外延的記法・内包的記法）、所属関係と包含関係の違い、集合の等号、空集合。"
topic: set-theory
order: 1
status: studying
createdAt: 2026-11-09
related:
  - set-operations
  - power-set
tags:
  - set-theory
  - munkres
sources:
  - title: "James R. Munkres, Topology, 2nd ed."
    location: "Chapter 1"
---

:::remark[このノートの書き方]
Munkres の Chapter 1 を読みながら学んでいる集合の基本を、定義と例で整理したもの。
証明はレビューの段階で補ったもので、自分で書いた証明ではない。**（補足）** と付けた。
:::

## 1. 集合と要素

$x$ が集合 $A$ に属することを $x \in A$、属さないことを $x \notin A$ と書く。$x$ を $A$ の**要素**（元）という。

集合の表し方は 2 通りある。

- **外延的記法**：要素を並べる。$A = \{1, 2, 3\}$
- **内包的記法**：要素が満たす条件を書く。$A = \{\, x \in \mathbb{R} \mid x > 0 \,\}$（正の実数全体）

外延的記法では、並べる順番と重複は関係ない。$\{1, 2, 3\} = \{3, 1, 2\} = \{1, 1, 2, 3\}$。

## 2. 部分集合と包含関係

:::definition[部分集合]{#def-subset}
$A$ のどの要素も $B$ の要素であるとき、$A$ を $B$ の**部分集合**といい、$A \subseteq B$ と書く。

$$
A \subseteq B \iff \forall x\, (x \in A \Rightarrow x \in B)
$$
:::

このノートでは $\subseteq$ を使う。本によっては同じ意味で $\subset$ と書く。

$A \subseteq B$ を示すには、任意の $x$ を取り、$x \in A$ を仮定して $x \in B$ を導く。
定義が「ならば」なので、示し方は [含意と対偶](/math/implication) の形そのもの。

## 3. 所属と包含の違い

$x \in A$ と $B \subseteq A$ は別の関係。

- $x \in A$：**要素**と集合の関係。$x$ が $A$ の中身の 1 つであること
- $B \subseteq A$：**集合**と集合の関係。$B$ の中身がすべて $A$ の中身であること

:::example[所属と包含]{#ex-member-vs-subset}
$A = \{1, 2, 3\}$ とすると

- $1 \in A$ は正しい。$\{1\} \in A$ は誤り（$\{1\}$ は $A$ の要素ではない）
- $\{1\} \subseteq A$ は正しい。$1 \subseteq A$ は意味をなさない（$1$ は集合として扱っていない）

要素そのものが集合のときは、両方が成り立つこともある。$C = \{1, \{1\}\}$ なら

- $\{1\} \in C$（$\{1\}$ は $C$ の要素）
- $\{1\} \subseteq C$（$\{1\}$ の要素 $1$ は $C$ の要素）
:::

集合を要素とする集合は [集合族](/math/families-of-sets) で扱う。

## 4. 集合の等号

:::definition[集合の等号]{#def-set-equality}
$A$ と $B$ がちょうど同じ要素を持つとき $A = B$ と書く。

$$
A = B \iff \forall x\, (x \in A \Leftrightarrow x \in B) \iff (A \subseteq B \land B \subseteq A)
$$
:::

$A = B$ は、$A \subseteq B$ と $B \subseteq A$ の両方を示して証明する（相互包含）。
[§13 のノート](/math/basis#thm-rational-generates)で、通常の位相と有理数端点の開区間が生成する位相の一致を示したのはこの形。

## 5. 空集合

要素を 1 つも持たない集合を**空集合**といい、$\varnothing$ と書く。

:::proposition[空集合はどの集合にも含まれる]{#prop-empty-subset}
任意の集合 $B$ について $\varnothing \subseteq B$。
:::

:::proof[補足]
$\varnothing \subseteq B$ は「任意の $x$ について、$x \in \varnothing$ ならば $x \in B$」。
$x \in \varnothing$ はどの $x$ についても偽なので、この含意は空虚に真（[空虚な真](/math/implication#ex-vacuous)）。
:::

[§13 の証明](/math/basis#thm-generated-is-topology)で $\varnothing$ が生成される位相に属すると言えた「条件が空虚に成り立つ」も同じ理由。

$\varnothing$ と $\{\varnothing\}$ は違う。$\varnothing$ は要素を持たないが、$\{\varnothing\}$ は $\varnothing$ という要素を 1 つ持つ。
この違いは [冪集合](/math/power-set) で効いてくる。
