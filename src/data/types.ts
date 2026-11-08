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

export type MathIndex = {
  lead: string[];
  textbook: string;
  // ノートのない分野は /math に出さない。分野を増やすときはここに足す
  fields: MathField[];
  // 学習の目安。note に src/content/math のファイル名（slug）を書くと、そのノートへリンクする
  roadmap: { title: string; note?: string }[];
  goals: string;
};
