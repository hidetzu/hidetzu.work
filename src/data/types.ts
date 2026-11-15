export type Link = { label: string; url: string };

export type Site = {
  name: string;
  tagline: string;
  // ヒーローでタグラインの下に置く日本語の一文
  lede: string;
  description: string;
  lang: string;
  locale: string;
  links: Link[];
};

export type Now = {
  updated: string;
  lead: string;
  // projects は projects.json の id。ページ内の該当プロジェクトへリンクする
  questions: { name: string; question: string; note: string; projects: string[] }[];
};

export type Motif =
  | 'map'
  | 'loop'
  | 'packet'
  | 'gate'
  | 'layers'
  | 'frames'
  | 'flag'
  | 'graph'
  | 'scan'
  | 'note'
  | 'sieve';

// released: GitHub Release で配布物を出している / development: 動く実装はあるが開発途上 /
// experimental: 技術的な問いの検証が中心 / reference: 設定やサンプルなど、参照用
export type Status = 'released' | 'development' | 'experimental' | 'reference';

// selected: Selected Work に詳しく載せる / experiment: Experiments / more: 一行で載せる
export type Placement = 'selected' | 'experiment' | 'more';

export type Project = {
  id: string;
  name: string;
  placement: Placement;
  status: Status;
  // status の補足（版、未リリース、Web 版公開中など）。確認できた事実だけを書く
  release: string;
  motif?: Motif;
  summary: string;
  // 以下は selected / experiment で使う
  problem?: string;
  approach?: string;
  result?: string;
  question?: string;
  links: Link[];
};

export type Article = {
  topic: string;
  title: string;
  date: string;
  url: string;
  // 関連する projects.json の id
  project?: string;
};

export type WritingSource = {
  name: string;
  lang: string;
  profileUrl: string;
  moreLabel: string;
  articles: Article[];
};

export type Writing = {
  sources: WritingSource[];
};

export type About = {
  body: string[];
  links: Link[];
};

// 数学の分野。ノートの frontmatter の topic に id を書く。並び順は /math での表示順
export type MathField = {
  id: string;
  title: string;
  description: string;
};

// 教科書（Munkres）の章と節。ノートの frontmatter の textbook から参照する。
// 題は本か、本を見て確かめた資料で確認したものだけを書き、まだ学んでいない節は書かなくてよい
export type MathChapter = {
  number: number;
  title: string;
  sections: { number: number; title: string }[];
};

export type MathIndex = {
  lead: string[];
  textbook: string;
  chapters: MathChapter[];
  // ノートのない分野は /math に出さない。分野を増やすときはここに足す
  fields: MathField[];
  // 学習の目安。note に src/content/math のファイル名（slug）を書くと、そのノートへリンクする
  roadmap: { title: string; note?: string }[];
  goals: string;
};

// 機械学習の学習マップ（/ml）。src/data/ml.json の形
export type MlStatus = 'unassessed' | 'studying' | 'concept' | 'explainable';

// 主な分類軸。学習方法・モデルの種類・応用分野は別の軸で、領域はそのどれかを主に扱う
export type MlAxis = 'foundation' | 'method' | 'model' | 'application';

export type MlArea = {
  // URL のアンカーとノートの frontmatter の area に使う
  id: string;
  number: string;
  title: string;
  axis: MlAxis[];
  // この領域が答える問い
  question: string;
  // 自己申告。本人だけが変える
  status: MlStatus;
  // 先に学ぶとよい領域の id（学習マップの矢印）
  prerequisites: string[];
  topics: { title: string; research?: boolean }[];
};

export type MlEdge = { from: string; to: string; label: string; dashed?: boolean };

export type MlEvent = {
  year: string;
  title: string;
  area: string;
  // 一次資料（原論文など）。年はここで確かめたもの
  source: { label: string; url: string };
  summary: string;
  // 主要な転換点だけ。6 つの観点で整理する
  detail?: {
    before: string;
    idea: string;
    enabled: string;
    remaining: string;
    next: string;
  };
};

export type MlIndex = {
  lead: string[];
  areas: MlArea[];
  edges: MlEdge[];
  order: { area: string; reason: string }[];
  timeline: MlEvent[];
};
