// 数学の記号・文字リファレンス（/math/notation）のデータ。
// 文字列中の $...$ は KaTeX でインライン数式にし、[文字](/math/...) はリンクにする（src/lib/tex.ts）。
// tex / upper / lower などの TeX はそのまま KaTeX に渡す。TeX の誤りはビルドで落ちる。
// latex は読者がコピーする入力例。標準の LaTeX（amsmath / amssymb など）で書ける形にする。

/** 記号の表の 1 行 */
export interface SymbolEntry {
  /** 表示する記号（TeX） */
  tex: string;
  /** 日本語の名前 */
  name: string;
  /** 英語の名前・読み方 */
  en: string;
  /** 意味 */
  meaning: string;
  /** 使用例（TeX） */
  example?: string;
  /** 使用例の説明 */
  exampleNote?: string;
  /** LaTeX の入力（別の書き方があれば複数） */
  latex: string[];
  /** 文献による違い・このサイトでの書き方などの注 */
  note?: string;
}

export interface SymbolSection {
  id: string;
  title: string;
  lead?: string;
  entries: SymbolEntry[];
}

export interface LatinLetter {
  letter: string;
  /** 英語での文字の読み（カタカナ） */
  reading: string;
  lower: string;
  upper: string;
}

export interface GreekLetter {
  /** 大文字（TeX） */
  upper: string;
  /** 小文字（TeX） */
  lower: string;
  /** 異体字（TeX） */
  variant?: string;
  ja: string;
  en: string;
  uses: string;
  /** LaTeX の入力。大文字・小文字・異体字の順 */
  latex: string[];
}

export interface Typeface {
  id: string;
  name: string;
  en: string;
  /** 文字に適用する TeX コマンド。'' はそのまま（数式イタリック） */
  command: string;
  latex: string;
  uses: string;
  note?: string;
}

export interface HebrewLetter {
  tex: string;
  ja: string;
  en: string;
  uses: string;
  latex: string;
}

export interface Reading {
  tex: string;
  en: string;
  ja: string;
}

export interface GlossaryEntry {
  en: string;
  ja: string;
  usage?: string;
  example?: string;
}

export interface Reference {
  title: string;
  url?: string;
  note: string;
}

// --- 文字 -------------------------------------------------------------------

export const latinLetters: LatinLetter[] = [
  { letter: 'a', reading: 'エイ', lower: '定数、数列の項 $a_n$', upper: '集合 $A$' },
  { letter: 'b', reading: 'ビー', lower: '定数', upper: '集合、開球 $B(x, \\varepsilon)$' },
  { letter: 'c', reading: 'スィー', lower: '定数', upper: '集合、複素数全体 $\\mathbb{C}$' },
  { letter: 'd', reading: 'ディー', lower: '距離 $d(x, y)$、微分 $dx$', upper: '集合、領域' },
  { letter: 'e', reading: 'イー', lower: '自然対数の底、単位元', upper: '集合' },
  { letter: 'f', reading: 'エフ', lower: '写像・関数', upper: '集合（$E$ の次）、閉集合' },
  { letter: 'g', reading: 'ジー', lower: '写像・関数（$f$ の次）', upper: '群' },
  { letter: 'h', reading: 'エイチ', lower: '写像・関数（$g$ の次）、小さな増分', upper: '部分群' },
  { letter: 'i', reading: 'アイ', lower: '虚数単位、添字、包含写像', upper: '区間 $I = [0, 1]$' },
  { letter: 'j', reading: 'ジェイ', lower: '添字（$i$ の次）', upper: '添字集合 $J$' },
  { letter: 'k', reading: 'ケイ', lower: '添字、整数', upper: '体、コンパクト集合' },
  { letter: 'l', reading: 'エル', lower: '添字。$1$ と紛らわしいので $\\ell$ と書くこともある', upper: '直線' },
  { letter: 'm', reading: 'エム', lower: '自然数・整数', upper: '多様体、距離空間' },
  { letter: 'n', reading: 'エン', lower: '自然数・整数、次元', upper: '自然数全体 $\\mathbb{N}$' },
  { letter: 'o', reading: 'オウ', lower: '$0$ と紛らわしいので、変数にはあまり使わない', upper: '原点' },
  { letter: 'p', reading: 'ピー', lower: '点、素数', upper: '点、分割 $\\mathcal{P}$' },
  { letter: 'q', reading: 'キュー', lower: '点（$p$ の次）、有理数', upper: '有理数全体 $\\mathbb{Q}$' },
  { letter: 'r', reading: 'アー', lower: '半径、実数', upper: '関係 $R$、実数全体 $\\mathbb{R}$' },
  { letter: 's', reading: 'エス', lower: '実数のパラメータ', upper: '集合、球面 $S^n$' },
  { letter: 't', reading: 'ティー', lower: '時間・パラメータ', upper: '位相 $\\mathcal{T}$' },
  { letter: 'u', reading: 'ユー', lower: 'ベクトル', upper: '開集合 $U$' },
  { letter: 'v', reading: 'ヴィー', lower: 'ベクトル', upper: '開集合（$U$ の次）、ベクトル空間' },
  { letter: 'w', reading: 'ダブリュー', lower: 'ベクトル、複素数', upper: '開集合（$V$ の次）' },
  { letter: 'x', reading: 'エックス', lower: '変数、点', upper: '空間・全体集合 $X$' },
  { letter: 'y', reading: 'ワイ', lower: '変数、点（$x$ の次）', upper: '空間（$X$ の次）' },
  { letter: 'z', reading: 'ズィー（米）／ゼッド（英）', lower: '変数、複素数', upper: '整数全体 $\\mathbb{Z}$' },
];

export const greekLetters: GreekLetter[] = [
  { upper: '\\mathrm{A}', lower: '\\alpha', ja: 'アルファ', en: 'alpha', uses: '角度、添字 $\\alpha \\in J$', latex: ['A', '\\alpha'] },
  { upper: '\\mathrm{B}', lower: '\\beta', ja: 'ベータ', en: 'beta', uses: '角度、添字（$\\alpha$ の次）', latex: ['B', '\\beta'] },
  { upper: '\\Gamma', lower: '\\gamma', ja: 'ガンマ', en: 'gamma', uses: '$\\gamma$ は曲線・道、$\\Gamma$ はガンマ関数', latex: ['\\Gamma', '\\gamma'] },
  { upper: '\\Delta', lower: '\\delta', ja: 'デルタ', en: 'delta', uses: '$\\delta$ は小さな正の数（ε-δ 論法）、$\\Delta$ は差・増分', latex: ['\\Delta', '\\delta'] },
  {
    upper: '\\mathrm{E}',
    lower: '\\epsilon',
    variant: '\\varepsilon',
    ja: 'イプシロン（エプシロン）',
    en: 'epsilon',
    uses: '任意に小さな正の数。開球 $B(x, \\varepsilon)$',
    latex: ['E', '\\epsilon', '\\varepsilon'],
  },
  { upper: '\\mathrm{Z}', lower: '\\zeta', ja: 'ゼータ', en: 'zeta', uses: 'ゼータ関数', latex: ['Z', '\\zeta'] },
  { upper: '\\mathrm{H}', lower: '\\eta', ja: 'イータ（エータ）', en: 'eta', uses: '小さな正の数（$\\varepsilon, \\delta$ の次）', latex: ['H', '\\eta'] },
  {
    upper: '\\Theta',
    lower: '\\theta',
    variant: '\\vartheta',
    ja: 'シータ（テータ）',
    en: 'theta',
    uses: '角度',
    latex: ['\\Theta', '\\theta', '\\vartheta'],
  },
  { upper: '\\mathrm{I}', lower: '\\iota', ja: 'イオタ', en: 'iota', uses: '包含写像', latex: ['I', '\\iota'] },
  {
    upper: '\\mathrm{K}',
    lower: '\\kappa',
    variant: '\\varkappa',
    ja: 'カッパ',
    en: 'kappa',
    uses: '基数（濃度）、曲率',
    latex: ['K', '\\kappa', '\\varkappa'],
  },
  { upper: '\\Lambda', lower: '\\lambda', ja: 'ラムダ', en: 'lambda', uses: '$\\lambda$ はスカラー・固有値・添字、$\\Lambda$ は添字集合', latex: ['\\Lambda', '\\lambda'] },
  { upper: '\\mathrm{M}', lower: '\\mu', ja: 'ミュー', en: 'mu', uses: '測度', latex: ['M', '\\mu'] },
  { upper: '\\mathrm{N}', lower: '\\nu', ja: 'ニュー', en: 'nu', uses: '添字（$\\mu$ の次）', latex: ['N', '\\nu'] },
  { upper: '\\Xi', lower: '\\xi', ja: 'クシー（グザイ）', en: 'xi', uses: '変数', latex: ['\\Xi', '\\xi'] },
  { upper: '\\mathrm{O}', lower: 'o', ja: 'オミクロン', en: 'omicron', uses: 'ラテン文字の O, o と区別できないので、ほとんど使わない', latex: ['O', 'o'] },
  {
    upper: '\\Pi',
    lower: '\\pi',
    variant: '\\varpi',
    ja: 'パイ',
    en: 'pi',
    uses: '$\\pi$ は円周率・射影・基本群 $\\pi_1$、$\\Pi$ は積',
    latex: ['\\Pi', '\\pi', '\\varpi'],
  },
  {
    upper: '\\mathrm{P}',
    lower: '\\rho',
    variant: '\\varrho',
    ja: 'ロー',
    en: 'rho',
    uses: '距離関数、密度',
    latex: ['P', '\\rho', '\\varrho'],
  },
  {
    upper: '\\Sigma',
    lower: '\\sigma',
    variant: '\\varsigma',
    ja: 'シグマ',
    en: 'sigma',
    uses: '$\\Sigma$ は総和、$\\sigma$ は置換など',
    latex: ['\\Sigma', '\\sigma', '\\varsigma'],
  },
  { upper: '\\mathrm{T}', lower: '\\tau', ja: 'タウ', en: 'tau', uses: '位相を $\\tau$ と書く本もある', latex: ['T', '\\tau'] },
  { upper: '\\Upsilon', lower: '\\upsilon', ja: 'ウプシロン（ユプシロン）', en: 'upsilon', uses: 'ラテン文字の v, u と紛らわしく、あまり使わない', latex: ['\\Upsilon', '\\upsilon'] },
  {
    upper: '\\Phi',
    lower: '\\phi',
    variant: '\\varphi',
    ja: 'ファイ',
    en: 'phi',
    uses: '写像、角度',
    latex: ['\\Phi', '\\phi', '\\varphi'],
  },
  { upper: '\\mathrm{X}', lower: '\\chi', ja: 'カイ', en: 'chi', uses: '特性関数、オイラー標数', latex: ['X', '\\chi'] },
  { upper: '\\Psi', lower: '\\psi', ja: 'プサイ（プシー）', en: 'psi', uses: '写像（$\\varphi$ の次）', latex: ['\\Psi', '\\psi'] },
  { upper: '\\Omega', lower: '\\omega', ja: 'オメガ', en: 'omega', uses: '$\\omega$ は最小の無限順序数、$\\Omega$ は全体集合・領域', latex: ['\\Omega', '\\omega'] },
];

export const typefaces: Typeface[] = [
  { id: 'italic', name: '通常（数式イタリック）', en: 'math italic', command: '', latex: 'A', uses: '変数・点・集合など、ほとんどの文字' },
  { id: 'roman', name: '立体（ローマン）', en: 'roman, upright', command: '\\mathrm', latex: '\\mathrm{A}', uses: '関数名 $\\sin$、演算子 $\\operatorname{Int}$、単位' },
  { id: 'bold', name: '太字', en: 'boldface', command: '\\mathbf', latex: '\\mathbf{A}', uses: 'ベクトル、行列。数の集合を $\\mathbf{R}$ と書く本もある' },
  {
    id: 'bb',
    name: '黒板太字',
    en: 'blackboard bold',
    command: '\\mathbb',
    latex: '\\mathbb{R}',
    uses: '数の集合 $\\mathbb{N}, \\mathbb{Z}, \\mathbb{Q}, \\mathbb{R}, \\mathbb{C}$',
    note: 'amssymb（amsfonts）パッケージが必要。KaTeX では大文字だけ',
  },
  {
    id: 'cal',
    name: 'カリグラフィー',
    en: 'calligraphic',
    command: '\\mathcal',
    latex: '\\mathcal{A}',
    uses: '集合族 $\\mathcal{A}$、位相 $\\mathcal{T}$、基底 $\\mathcal{B}$、冪集合 $\\mathcal{P}(A)$',
    note: '大文字だけ',
  },
  {
    id: 'scr',
    name: '筆記体（スクリプト）',
    en: 'script',
    command: '\\mathscr',
    latex: '\\mathscr{A}',
    uses: 'カリグラフィーと同じ役割（集合族など）で使う本もある',
    note: 'mathrsfs パッケージが必要。大文字だけ',
  },
  {
    id: 'frak',
    name: 'ドイツ文字（フラクトゥール）',
    en: 'Fraktur',
    command: '\\mathfrak',
    latex: '\\mathfrak{A}',
    uses: 'リー環 $\\mathfrak{g}$、イデアル $\\mathfrak{p}, \\mathfrak{m}$、連続体の濃度 $\\mathfrak{c}$',
    note: 'amssymb（amsfonts）パッケージが必要',
  },
];

export const hebrewLetters: HebrewLetter[] = [
  { tex: '\\aleph', ja: 'アレフ', en: 'aleph', uses: '無限集合の濃度。$\\aleph_0$（aleph-null）は可算無限の濃度', latex: '\\aleph' },
  { tex: '\\beth', ja: 'ベート（ベス）', en: 'beth', uses: '濃度の列 $\\beth_0, \\beth_1, \\dots$', latex: '\\beth' },
  { tex: '\\gimel', ja: 'ギメル', en: 'gimel', uses: 'あまり使わない', latex: '\\gimel' },
  { tex: '\\daleth', ja: 'ダレット', en: 'daleth', uses: 'あまり使わない', latex: '\\daleth' },
];

// --- 記号 -------------------------------------------------------------------

export const symbolSections: SymbolSection[] = [
  {
    id: 'logic',
    title: '論理・証明',
    lead: '詳しくは[論理の基礎](/math/propositional-logic)。',
    entries: [
      {
        tex: '\\forall',
        name: '全称記号',
        en: 'for all, for every',
        meaning: '「すべての…について」',
        example: '\\forall x \\in \\mathbb{R},\\ x^2 \\ge 0',
        exampleNote: 'すべての実数 $x$ について $x^2 \\ge 0$',
        latex: ['\\forall'],
      },
      {
        tex: '\\exists',
        name: '存在記号',
        en: 'there exists',
        meaning: '「…が少なくとも 1 つ存在する」',
        example: '\\exists x \\in \\mathbb{R},\\ x^2 = 2',
        exampleNote: '$x^2 = 2$ を満たす実数 $x$ がある',
        latex: ['\\exists'],
      },
      {
        tex: '\\nexists',
        name: '存在しない',
        en: 'there does not exist',
        meaning: '$\\neg \\exists$ と同じ',
        example: '\\nexists x \\in \\mathbb{Q},\\ x^2 = 2',
        exampleNote: '$x^2 = 2$ を満たす有理数はない',
        latex: ['\\nexists'],
      },
      {
        tex: '\\exists!',
        name: '一意存在',
        en: 'there exists a unique',
        meaning: '「ちょうど 1 つ存在する」',
        example: '\\exists! x \\in \\mathbb{R},\\ 2x = 1',
        latex: ['\\exists!'],
      },
      {
        tex: '\\Rightarrow',
        name: '含意',
        en: 'implies; if … then …',
        meaning: '$P \\Rightarrow Q$ は「$P$ ならば $Q$」',
        example: 'x > 2 \\implies x^2 > 4',
        latex: ['\\Rightarrow', '\\implies'],
        note: '`\\implies` は前後に広めの空白が入る。論理学の本では $\\to$ を使うこともある',
      },
      {
        tex: '\\Leftrightarrow',
        name: '同値',
        en: 'if and only if (iff)',
        meaning: '$P \\Rightarrow Q$ かつ $Q \\Rightarrow P$',
        example: 'x^2 = 1 \\iff x = \\pm 1',
        latex: ['\\Leftrightarrow', '\\iff'],
      },
      {
        tex: '\\land',
        name: '論理積（かつ）',
        en: 'and',
        meaning: '$P \\land Q$ は $P$ と $Q$ がともに真',
        latex: ['\\land', '\\wedge'],
      },
      {
        tex: '\\lor',
        name: '論理和（または）',
        en: 'or',
        meaning: '$P \\lor Q$ は少なくとも一方が真（両方でもよい）',
        latex: ['\\lor', '\\vee'],
        note: '数学の「または」は両方が真の場合も含む（[2 つの「または」](/math/propositional-logic)）',
      },
      {
        tex: '\\neg',
        name: '否定',
        en: 'not',
        meaning: '$\\neg P$ は「$P$ でない」',
        latex: ['\\neg', '\\lnot'],
        note: '$\\sim P$ や $\\overline{P}$ と書く本もある',
      },
      {
        tex: '=',
        name: '等号',
        en: 'equals, is equal to',
        meaning: '両辺が同じものを表す。集合では、要素がすべて一致する',
        latex: ['='],
      },
      {
        tex: '\\neq',
        name: '等しくない',
        en: 'is not equal to',
        meaning: '$\\neg (a = b)$',
        latex: ['\\neq', '\\ne'],
      },
      {
        tex: '\\coloneqq',
        name: '定義',
        en: 'is defined as',
        meaning: '左辺を右辺で定義する',
        example: 'f(x) \\coloneqq x^2',
        latex: ['\\coloneqq', ':='],
        note: '`\\coloneqq` は mathtools パッケージ。$\\equiv$ や $\\overset{\\text{def}}{=}$ を使う本もある',
      },
      {
        tex: '\\therefore',
        name: 'ゆえに',
        en: 'therefore',
        meaning: '前に述べたことから結論が導かれる',
        latex: ['\\therefore'],
        note: '英語の数学書では記号を使わず、文章（hence, thus）で書くことが多い',
      },
      {
        tex: '\\because',
        name: 'なぜならば',
        en: 'because, since',
        meaning: '理由を示す',
        latex: ['\\because'],
      },
      {
        tex: '\\blacksquare',
        name: '証明終わり',
        en: 'end of proof; Q.E.D.',
        meaning: '証明がここで終わることを示す',
        latex: ['\\blacksquare', '\\square'],
        note: '白抜きの $\\square$ を使う本もある',
      },
    ],
  },
  {
    id: 'sets',
    title: '集合論',
    lead: '詳しくは[集合の基本と演算](/math/sets)、[集合族](/math/families-of-sets)。',
    entries: [
      {
        tex: '\\in',
        name: '属する',
        en: 'is an element of; belongs to; is in',
        meaning: '$x \\in A$ は「$x$ は $A$ の要素」',
        example: '2 \\in \\{1, 2, 3\\}',
        latex: ['\\in'],
      },
      {
        tex: '\\notin',
        name: '属さない',
        en: 'is not an element of',
        meaning: '$\\neg (x \\in A)$',
        example: '4 \\notin \\{1, 2, 3\\}',
        latex: ['\\notin'],
      },
      {
        tex: '\\ni',
        name: '含む（要素として）',
        en: 'contains (as an element)',
        meaning: '$A \\ni x$ は $x \\in A$ と同じ',
        latex: ['\\ni'],
      },
      {
        tex: '\\subseteq',
        name: '部分集合',
        en: 'is a subset of; is contained in',
        meaning: '$A \\subseteq B$ は「$A$ のどの要素も $B$ の要素」。$A = B$ でもよい',
        example: '\\{1\\} \\subseteq \\{1, 2\\}',
        latex: ['\\subseteq'],
        note: 'このサイトのノートでは、等号を許す包含を $\\subseteq$ で書く',
      },
      {
        tex: '\\subset',
        name: '部分集合（または真部分集合）',
        en: 'is a subset of',
        meaning: '文献によって、等号を許す（$\\subseteq$ と同じ）場合と、許さない（$\\subsetneq$ と同じ）場合がある',
        latex: ['\\subset'],
        note: 'Munkres は §1 で、$A \\subset B$ が $A = B$ の場合も含むと定めている（二次資料の引用で確認）。本ごとに定義を確かめる',
      },
      {
        tex: '\\subsetneq',
        name: '真部分集合',
        en: 'is a proper subset of',
        meaning: '$A \\subseteq B$ かつ $A \\neq B$',
        example: '\\{1\\} \\subsetneq \\{1, 2\\}',
        latex: ['\\subsetneq'],
      },
      {
        tex: '\\supseteq',
        name: '上位集合',
        en: 'is a superset of; contains',
        meaning: '$B \\supseteq A$ は $A \\subseteq B$ と同じ',
        latex: ['\\supseteq', '\\supset'],
        note: '$\\supset$ も、$\\subset$ と同じく文献によって等号を許すかが違う',
      },
      {
        tex: '\\cup',
        name: '和集合',
        en: 'union; "A union B"',
        meaning: '$A \\cup B = \\{\\, x \\mid x \\in A \\lor x \\in B \\,\\}$',
        example: '\\{1, 2\\} \\cup \\{2, 3\\} = \\{1, 2, 3\\}',
        latex: ['\\cup'],
      },
      {
        tex: '\\cap',
        name: '共通部分',
        en: 'intersection; "A intersect B"',
        meaning: '$A \\cap B = \\{\\, x \\mid x \\in A \\land x \\in B \\,\\}$',
        example: '\\{1, 2\\} \\cap \\{2, 3\\} = \\{2\\}',
        latex: ['\\cap'],
      },
      {
        tex: '\\bigcup',
        name: '集合族の和集合',
        en: 'union over a family',
        meaning: '少なくとも 1 つの $A_\\alpha$ に属する要素の集合（$\\exists$）',
        example: '\\bigcup_{\\alpha \\in J} A_\\alpha',
        exampleNote: '添字集合 $J$ の各 $\\alpha$ に集合 $A_\\alpha$ が対応する',
        latex: ['\\bigcup_{\\alpha \\in J} A_\\alpha'],
      },
      {
        tex: '\\bigcap',
        name: '集合族の共通部分',
        en: 'intersection over a family',
        meaning: 'すべての $A_\\alpha$ に属する要素の集合（$\\forall$）',
        example: '\\bigcap_{n=1}^{\\infty} A_n',
        latex: ['\\bigcap_{n=1}^{\\infty} A_n'],
        note: '空な集合族の共通部分は、定義しないか、全体集合と約束する（[集合族](/math/families-of-sets)）',
      },
      {
        tex: '\\varnothing',
        name: '空集合',
        en: 'the empty set',
        meaning: '要素を 1 つももたない集合',
        latex: ['\\varnothing', '\\emptyset'],
        note: '`\\emptyset` は丸に斜線の $\\emptyset$、`\\varnothing`（amssymb）は $\\varnothing$ の形。意味は同じで、このサイトでは $\\varnothing$ を使う。ギリシャ文字の $\\phi$ とは別の記号',
      },
      {
        tex: '\\mathcal{P}(A)',
        name: '冪集合',
        en: 'the power set of A',
        meaning: '$A$ の部分集合全体の集合',
        example: '\\mathcal{P}(\\{1, 2\\}) = \\{\\varnothing, \\{1\\}, \\{2\\}, \\{1, 2\\}\\}',
        latex: ['\\mathcal{P}(A)', '\\wp(A)', '2^A'],
        note: '$\\wp$ はワイエルシュトラスの p と呼ばれる記号で、冪集合に使う本もある',
      },
      {
        tex: '\\times',
        name: '直積',
        en: 'Cartesian product; "A cross B"',
        meaning: '$A \\times B = \\{\\, (a, b) \\mid a \\in A,\\ b \\in B \\,\\}$',
        example: '\\{1, 2\\} \\times \\{a\\} = \\{(1, a), (2, a)\\}',
        latex: ['\\times'],
      },
      {
        tex: '\\setminus',
        name: '差集合',
        en: 'set difference; "A minus B"',
        meaning: '$A \\setminus B = \\{\\, x \\mid x \\in A \\land x \\notin B \\,\\}$',
        example: '\\{1, 2, 3\\} \\setminus \\{2\\} = \\{1, 3\\}',
        latex: ['\\setminus', '-'],
        note: '$A - B$ と書く本もある。このサイトのノートでは $\\setminus$ を使う',
      },
      {
        tex: '\\triangle',
        name: '対称差',
        en: 'symmetric difference',
        meaning: 'ちょうど一方に属する要素の集合',
        example: 'A \\mathbin{\\triangle} B = (A \\setminus B) \\cup (B \\setminus A)',
        latex: ['A \\mathbin{\\triangle} B'],
        note: '$A \\ominus B$ や $A \\mathbin{\\Delta} B$ と書く本もある',
      },
      {
        tex: 'A^c',
        name: '補集合',
        en: 'the complement of A',
        meaning: '全体集合 $X$ のうち $A$ に属さない要素の集合 $X \\setminus A$',
        latex: ['A^c', 'X \\setminus A', '\\complement A'],
        note: '全体集合によって変わるので、$X \\setminus A$ と書くほうが誤解がない',
      },
      {
        tex: '\\{\\, x \\mid P(x) \\,\\}',
        name: '集合の内包的記法',
        en: 'the set of all x such that P(x)',
        meaning: '条件 $P(x)$ を満たす $x$ 全体の集合',
        example: '\\{\\, x \\in \\mathbb{R} \\mid x > 0 \\,\\}',
        latex: ['\\{\\, x \\mid P(x) \\,\\}', '\\{\\, x : P(x) \\,\\}'],
        note: '縦線の代わりにコロンを使う本もある',
      },
      {
        tex: '|A|',
        name: '要素の個数（濃度）',
        en: 'the cardinality of A',
        meaning: '$A$ の要素の個数。無限集合では濃度',
        example: '|\\{1, 2, 3\\}| = 3',
        latex: ['|A|', '\\#A', '\\operatorname{card} A'],
      },
      {
        tex: '\\mathbb{N}, \\mathbb{Z}, \\mathbb{Q}, \\mathbb{R}, \\mathbb{C}',
        name: '数の集合',
        en: 'natural numbers, integers, rationals, reals, complex numbers',
        meaning: '自然数・整数・有理数・実数・複素数の全体',
        latex: ['\\mathbb{N}', '\\mathbb{Z}', '\\mathbb{Q}', '\\mathbb{R}', '\\mathbb{C}'],
        note: '$\\mathbb{N}$ が $0$ を含むかは文献によって違う。このサイトのノートでは $\\mathbb{N} = \\{1, 2, 3, \\dots\\}$',
      },
    ],
  },
  {
    id: 'relations',
    title: '関係と写像',
    lead: '詳しくは[写像](/math/functions)と[関係](/math/relations)。',
    entries: [
      {
        tex: '\\sim',
        name: '同値関係（チルダ）',
        en: 'is equivalent to; tilde',
        meaning: '$x \\sim y$ は「$x$ と $y$ が同値」',
        latex: ['\\sim'],
        note: '同値関係の記号には $\\equiv$、$\\approx$ なども使われる',
      },
      {
        tex: '[x]',
        name: '同値類',
        en: 'the equivalence class of x',
        meaning: '$[x] = \\{\\, y \\mid y \\sim x \\,\\}$',
        latex: ['[x]', '[x]_{\\sim}'],
      },
      {
        tex: 'A/{\\sim}',
        name: '商集合',
        en: 'the quotient of A by ~; "A modulo ~"',
        meaning: '同値類全体の集合 $\\{\\, [x] \\mid x \\in A \\,\\}$',
        latex: ['A/{\\sim}'],
      },
      {
        tex: '\\prec',
        name: '先行する（順序）',
        en: 'precedes',
        meaning: '順序関係（狭義）を表すのに使われる記号の 1 つ',
        latex: ['\\prec'],
        note: '順序関係はまだ学んでいない。ここでは記号の名前だけを載せている',
      },
      {
        tex: '\\preceq',
        name: '先行するか等しい（順序）',
        en: 'precedes or equals',
        meaning: '順序関係（広義）を表すのに使われる記号の 1 つ',
        latex: ['\\preceq', '\\preccurlyeq'],
        note: '`\\preceq` は $\\preceq$、`\\preccurlyeq`（amssymb）は $\\preccurlyeq$ の形',
      },
      {
        tex: 'f \\colon A \\to B',
        name: '写像',
        en: 'f is a map from A to B; f maps A to B',
        meaning: '$A$ の各要素に $B$ の要素をただ 1 つ対応させる',
        latex: ['f \\colon A \\to B'],
        note: '`f: A \\to B` と書くとコロンの前後の空白が広くなる。`\\colon` が標準',
      },
      {
        tex: '\\mapsto',
        name: '要素の対応',
        en: 'maps to',
        meaning: '要素がどの要素に移るかを示す',
        example: 'x \\mapsto x^2',
        latex: ['\\mapsto'],
      },
      {
        tex: '\\circ',
        name: '合成',
        en: 'composition; "g composed with f", "g circle f"',
        meaning: '$(g \\circ f)(x) = g(f(x))$',
        latex: ['\\circ'],
      },
      {
        tex: 'f|_{A_0}',
        name: '制限',
        en: 'the restriction of f to A₀',
        meaning: '定義域を $A_0$ に制限した写像',
        latex: ['f|_{A_0}'],
      },
      {
        tex: '\\mathrm{id}_A',
        name: '恒等写像',
        en: 'the identity map on A',
        meaning: '$x \\mapsto x$',
        latex: ['\\mathrm{id}_A', 'i_A', '1_A'],
        note: '[写像のノート](/math/functions)では $i_A$ と書いている',
      },
      {
        tex: 'f(A_0)',
        name: '像',
        en: 'the image of A₀ under f',
        meaning: '$\\{\\, f(a) \\mid a \\in A_0 \\,\\}$',
        latex: ['f(A_0)'],
      },
      {
        tex: 'f^{-1}(B_0)',
        name: '逆像',
        en: 'the preimage (inverse image) of B₀ under f',
        meaning: '$\\{\\, a \\in A \\mid f(a) \\in B_0 \\,\\}$',
        latex: ['f^{-1}(B_0)'],
        note: '逆写像 $f^{-1}$ がなくても定義できる。記号は逆写像と同じなので、文脈で区別する',
      },
      {
        tex: 'f^{-1}',
        name: '逆写像',
        en: 'the inverse of f; "f inverse"',
        meaning: '全単射 $f$ に対して、$b$ に $f(a) = b$ となる $a$ を対応させる写像',
        latex: ['f^{-1}'],
      },
      {
        tex: '\\hookrightarrow',
        name: '単射（の矢印）',
        en: 'injection',
        meaning: '写像が単射であることを矢印の形で示す書き方。包含写像にもよく使う',
        latex: ['\\hookrightarrow'],
        note: '単射・全射を矢印で区別しない本も多い',
      },
      {
        tex: '\\twoheadrightarrow',
        name: '全射（の矢印）',
        en: 'surjection',
        meaning: '写像が全射であることを矢印の形で示す書き方',
        latex: ['\\twoheadrightarrow'],
      },
    ],
  },
  {
    id: 'topology',
    title: '位相空間論',
    lead: '詳しくは[位相空間](/math/topological-spaces)と[位相の基底](/math/basis)。閉包・内部・境界・連続写像・同相はまだ学んでいないので、記号と一般的な意味だけを載せている。',
    entries: [
      {
        tex: '(X, \\mathcal{T})',
        name: '位相空間',
        en: 'a topological space; "X with the topology T"',
        meaning: '集合 $X$ と、$X$ 上の位相 $\\mathcal{T}$ の組',
        latex: ['(X, \\mathcal{T})'],
        note: '位相を $\\tau$ や $\\mathcal{O}$ と書く本もある',
      },
      {
        tex: 'U \\in \\mathcal{T}',
        name: '開集合',
        en: 'U is open; an open set',
        meaning: '位相 $\\mathcal{T}$ に属する集合を開集合という',
        latex: ['U \\in \\mathcal{T}'],
      },
      {
        tex: 'X \\setminus A \\in \\mathcal{T}',
        name: '閉集合',
        en: 'A is closed; a closed set',
        meaning: '補集合が開集合である集合を閉集合という',
        latex: ['X \\setminus A \\in \\mathcal{T}'],
      },
      {
        tex: '\\mathcal{B}',
        name: '基底',
        en: 'a basis (for a topology)',
        meaning: '和集合をとることで位相の開集合を作れる集合族',
        latex: ['\\mathcal{B}'],
      },
      {
        tex: '\\mathcal{T} \\subseteq \\mathcal{T}\'',
        name: '位相の強弱',
        en: 'T′ is finer than T; T is coarser than T′',
        meaning: '$\\mathcal{T}\'$ のほうが開集合が多い（細かい）',
        latex: ['\\mathcal{T} \\subseteq \\mathcal{T}\''],
        note: '強い・弱いの対応が本によって逆になることがある。finer / coarser で覚えると確実',
      },
      {
        tex: '\\overline{A}',
        name: '閉包',
        en: 'the closure of A; "A bar"',
        meaning: '$A$ を含むすべての閉集合の共通部分',
        latex: ['\\overline{A}', '\\operatorname{Cl} A'],
      },
      {
        tex: '\\operatorname{Int} A',
        name: '内部',
        en: 'the interior of A',
        meaning: '$A$ に含まれるすべての開集合の和集合',
        latex: ['\\operatorname{Int} A', 'A^\\circ'],
        note: 'Munkres の §17 の演習では $\\operatorname{Int} A$ と書いている（二次資料で確認）',
      },
      {
        tex: '\\partial A',
        name: '境界',
        en: 'the boundary of A',
        meaning: '$\\overline{A} \\cap \\overline{X \\setminus A}$',
        latex: ['\\partial A', '\\operatorname{Bd} A'],
        note: 'Munkres は $\\operatorname{Bd} A$ と書き、§17 の演習 19 で定義している（二次資料で確認）',
      },
      {
        tex: 'x \\in U \\in \\mathcal{T}',
        name: '近傍',
        en: 'U is a neighborhood of x',
        meaning: '$x$ を含む開集合 $U$ を $x$ の（開）近傍という',
        latex: ['x \\in U \\in \\mathcal{T}'],
        note: '近傍を開集合に限る本と、$x$ を含む開集合を含む集合まで近傍と呼ぶ本がある',
      },
      {
        tex: 'f \\colon X \\to Y',
        name: '連続写像',
        en: 'f is continuous',
        meaning: '$Y$ の任意の開集合 $V$ について、[逆像](/math/functions) $f^{-1}(V)$ が $X$ の開集合',
        latex: ['f \\colon X \\to Y'],
      },
      {
        tex: 'X \\cong Y',
        name: '同相',
        en: 'X is homeomorphic to Y',
        meaning: '連続な全単射で、逆写像も連続なもの（同相写像）がある',
        latex: ['X \\cong Y', 'X \\approx Y'],
        note: '記号は本によって違い、記号を使わずに文章で書く本もある',
      },
    ],
  },
];

// --- 読み方 -----------------------------------------------------------------

export const readings: Reading[] = [
  { tex: "x'", en: 'x prime', ja: 'エックス プライム（日本語では「ダッシュ」とも）' },
  { tex: 'x_n', en: 'x sub n; x n', ja: 'エックス サブ エヌ' },
  { tex: 'x^2', en: 'x squared', ja: 'エックスの 2 乗' },
  { tex: 'x^n', en: 'x to the n; x to the nth (power)', ja: 'エックスの n 乗' },
  { tex: '\\bar{x}', en: 'x bar', ja: 'エックス バー' },
  { tex: '\\hat{x}', en: 'x hat', ja: 'エックス ハット' },
  { tex: '\\tilde{x}', en: 'x tilde', ja: 'エックス チルダ' },
  { tex: 'f(x)', en: 'f of x', ja: 'エフ エックス' },
  { tex: 'g \\circ f', en: 'g composed with f; g circle f', ja: 'g と f の合成' },
  { tex: 'f^{-1}', en: 'f inverse', ja: 'エフ インバース' },
  { tex: 'A \\times B', en: 'A cross B', ja: 'A と B の直積' },
  { tex: '[a, b]', en: 'the closed interval from a to b', ja: '閉区間' },
  { tex: '(a, b)', en: 'the open interval from a to b; the ordered pair (a, b)', ja: '開区間、または順序対（文脈で区別する）' },
];

// --- 数学英語の用語集 -------------------------------------------------------

export const glossary: GlossaryEntry[] = [
  { en: 'if and only if (iff)', ja: '…のとき、かつそのときに限り', usage: '同値 $\\iff$。定義文の if は iff の意味で使われることが多い', example: 'A set is empty if and only if it has no elements.' },
  { en: 'such that (s.t.)', ja: '…となるような', usage: '条件を付ける', example: 'There exists an integer n such that n > 5.' },
  { en: 'for every / for all / for each', ja: 'すべての…について', usage: '$\\forall$', example: 'For every x in A, we have x ∈ B.' },
  { en: 'there exists', ja: '…が存在する', usage: '$\\exists$', example: 'There exists a real number whose square is 2.' },
  { en: 'let', ja: '…とする', usage: '記号を導入する', example: 'Let A be a set.' },
  { en: 'suppose / assume', ja: '…と仮定する', usage: '仮定を置く。背理法の出だしにも使う', example: 'Suppose that x ∉ B.' },
  { en: 'then', ja: 'すると、このとき', example: 'If x ∈ A, then x ∈ B.' },
  { en: 'hence / thus / therefore', ja: 'したがって', usage: '$\\therefore$ の代わりに文章で書く' },
  { en: 'it follows that', ja: '…がしたがう', example: 'It follows that A ⊂ B.' },
  { en: 'conversely', ja: '逆に', usage: '逆向きの含意を示すとき' },
  { en: 'contradiction', ja: '矛盾', usage: 'This is a contradiction. で背理法を締める' },
  { en: 'without loss of generality (WLOG)', ja: '一般性を失わずに', usage: '対称な場合の一方だけを示すとき', example: 'Without loss of generality, assume a ≤ b.' },
  { en: 'respectively', ja: 'それぞれ', example: 'A and B are open and closed, respectively.' },
  { en: 'arbitrary', ja: '任意の', example: 'Let x be an arbitrary element of A.' },
  { en: 'at least / at most', ja: '少なくとも／高々', example: 'A has at most two elements.' },
  { en: 'element', ja: '要素、元', example: '3 is an element of {1, 2, 3}.' },
  { en: 'subset / proper subset', ja: '部分集合／真部分集合', usage: '$\\subseteq$ / $\\subsetneq$。subset の記号は文献で確かめる' },
  { en: 'disjoint', ja: '互いに素', usage: '共通部分が空', example: 'The sets A and B are disjoint.' },
  { en: 'nonempty', ja: '空でない' },
  { en: 'collection / family', ja: '集合族', usage: '集合を要素とする集合' },
  { en: 'indexed family', ja: '添字付けられた集合族', example: '{A_α}, α ∈ J' },
  { en: 'map / mapping / function', ja: '写像、関数' },
  { en: 'injective (one-to-one)', ja: '単射', usage: 'one-to-one は単射の意味。one-to-one correspondence は全単射の意味なので注意' },
  { en: 'surjective (onto)', ja: '全射', example: 'f maps A onto B.' },
  { en: 'bijective (one-to-one correspondence)', ja: '全単射' },
  { en: 'image / preimage (inverse image)', ja: '像／逆像' },
  { en: 'relation', ja: '関係' },
  { en: 'equivalence relation', ja: '同値関係', usage: '反射律・対称律・推移律を満たす関係' },
  { en: 'equivalence class', ja: '同値類', example: 'The equivalence class of x is denoted [x].' },
  { en: 'partition', ja: '分割', usage: '互いに素な空でない部分集合で、和集合が全体になる集合族' },
  { en: 'reflexive / symmetric / transitive', ja: '反射的／対称的／推移的' },
  { en: 'partial order', ja: '半順序', usage: '反射律・反対称律・推移律を満たす関係（未学習）' },
  { en: 'topology', ja: '位相', example: 'Let 𝒯 be a topology on X.' },
  { en: 'topological space', ja: '位相空間' },
  { en: 'open set / closed set', ja: '開集合／閉集合' },
  { en: 'basis (pl. bases)', ja: '基底', usage: '複数形は bases', example: '𝒯 is generated by the basis ℬ.' },
  { en: 'finer / coarser', ja: '（位相が）細かい・強い／粗い・弱い' },
  { en: 'neighborhood', ja: '近傍', usage: '英国式の綴りは neighbourhood' },
  { en: 'closure / interior / boundary', ja: '閉包／内部／境界（未学習）' },
  { en: 'continuous', ja: '連続な（未学習）' },
  { en: 'homeomorphism', ja: '同相写像（未学習）', usage: 'homomorphism（準同型写像）と綴りが似ているので注意' },
];

// --- 参考資料 ---------------------------------------------------------------

export const references: Reference[] = [
  {
    title: 'James R. Munkres, Topology, 2nd ed.',
    note: 'このサイトのノートの教科書。Munkres 固有の記法として載せたもの（$\\subset$、$\\operatorname{Int}$、$\\operatorname{Bd}$）は、次の二次資料で確認した',
  },
  {
    title: 'J. Munkres. Topology. (2013) Chapter 1: Set Theory and Logic. 1: Fundamental Concepts',
    url: 'https://qhott.blogspot.com/2023/06/j-munkres-topology-2013-chapter-1-set.html',
    note: '§1 の $\\subset$ の定義（等号を許す）の引用',
  },
  {
    title: 'Robert Gardner, Munkres §17 Closed Sets and Limit Points（講義ノート）',
    url: 'https://faculty.etsu.edu/gardnerr/5357/notes/Munkres-17.pdf',
    note: '§17 の閉包・内部の定義',
  },
  {
    title: 'UC Riverside, Math 205A solutions（Munkres の演習の解答）',
    url: 'https://math.ucr.edu/~res/math205A-2014/math205Asolutions02.pdf',
    note: '§17 の演習 19 の $\\operatorname{Bd}(A)$ の定義と、$\\operatorname{Int}(A)$ の記法',
  },
  {
    title: 'KaTeX — Supported Functions',
    url: 'https://katex.org/docs/supported.html',
    note: 'このページの数式の表示に使っている KaTeX で使えるコマンド',
  },
  {
    title: 'Scott Pakin, The Comprehensive LaTeX Symbol List (CTAN)',
    url: 'https://ctan.org/pkg/comprehensive',
    note: 'LaTeX の記号とパッケージの一覧',
  },
  {
    title: 'The Unicode Standard — Code Charts',
    url: 'https://www.unicode.org/charts/',
    note: 'Greek and Coptic、Letterlike Symbols、Mathematical Operators、Mathematical Alphanumeric Symbols の各ブロック',
  },
];
