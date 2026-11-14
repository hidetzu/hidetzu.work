import { getCollection, type CollectionEntry } from 'astro:content';
import mathData from '../data/math.json';
import type { MathChapter, MathField, MathIndex } from '../data/types';
import { buildGraph } from './math-graph.mjs';
import { PROOF_ORIGINS } from './math-markdown.mjs';

export type MathNote = CollectionEntry<'math'>;
export type MathStatus = MathNote['data']['status'];

// 状態は自己申告。意味は README の「数学ノート」に書いてある
export const mathStatusLabel: Record<MathStatus, string> = {
  unread: '未学習',
  studying: '学習中',
  understood: '理解した',
  'proof-in-progress': '証明を検討中',
  verified: '証明レビュー済み',
};

export const mathStatusNote: Record<MathStatus, string> = {
  unread: 'まだ読んでいない',
  studying: '定義や定理を学んでいる途中',
  understood: '定義や定理の意味を説明できる（すべての定理を自力で証明したという意味ではない）',
  'proof-in-progress': '証明を自分で考えている。未完成の部分を含む',
  verified: '自分で書いた証明について、論理的な確認を終えた',
};

// draft: true のノートは dev でだけ出す
export const getMathNotes = () =>
  getCollection('math', (note) => import.meta.env.DEV || !note.data.draft);

export const lastModified = (note: MathNote) => note.data.updatedAt ?? note.data.createdAt;

// 日付は frontmatter の YYYY-MM-DD を UTC として読むので、UTC のまま書き戻す
export const ymd = (date: Date) => date.toISOString().slice(0, 10);

// 分野。topic の値は content.config.ts のスキーマで fields の id に限っている
export const mathFields: MathField[] = (mathData as MathIndex).fields;

export const fieldOf = (note: MathNote): MathField => {
  const field = mathFields.find((f) => f.id === note.data.topic);
  if (!field) throw new Error(`math: unknown topic "${note.data.topic}" in ${note.id}`);
  return field;
};

// 分野の中の並び: order（なければ後ろ）→ 作成日 → タイトル
export const byOrder = (a: MathNote, b: MathNote) =>
  (a.data.order ?? Number.MAX_SAFE_INTEGER) - (b.data.order ?? Number.MAX_SAFE_INTEGER) ||
  a.data.createdAt.getTime() - b.data.createdAt.getTime() ||
  a.data.title.localeCompare(b.data.title, 'ja');

// 分野の順 → 分野の中の順
export const byFieldThenOrder = (a: MathNote, b: MathNote) =>
  mathFields.indexOf(fieldOf(a)) - mathFields.indexOf(fieldOf(b)) || byOrder(a, b);

// ノートのある分野だけを、分野の順に並べて返す
export const groupByField = (notes: MathNote[]) =>
  mathFields
    .map((field) => ({ field, notes: notes.filter((n) => n.data.topic === field.id).sort(byOrder) }))
    .filter((group) => group.notes.length > 0);

// 関連するノート: 自分の related に書いたものと、related に自分を書いているもの。
// related の slug が存在しなければビルドで落とす（draft のノートは存在するが、本番では出さない）
export const relatedNotes = (note: MathNote, visible: MathNote[], all: MathNote[]) => {
  const ids = new Set(all.map((n) => n.id));
  for (const id of note.data.related) {
    if (!ids.has(id)) throw new Error(`math: unknown related note "${id}" in ${note.id}`);
  }
  return visible
    .filter((n) => n.id !== note.id && (note.data.related.includes(n.id) || n.data.related.includes(note.id)))
    .sort(byFieldThenOrder);
};

// --- 教科書の章立て ------------------------------------------------------------

export const mathChapters: MathChapter[] = (mathData as MathIndex).chapters;

// frontmatter の textbook が math.json の chapters にない章・節を指していたらビルドで落とす
const checkTextbook = (note: MathNote) => {
  const tb = note.data.textbook;
  if (!tb) return;
  const chapter = mathChapters.find((c) => c.number === tb.chapter);
  if (!chapter) throw new Error(`math: unknown chapter ${tb.chapter} in ${note.id}`);
  if (tb.section !== undefined && !chapter.sections.some((s) => s.number === tb.section)) {
    throw new Error(`math: unknown section §${tb.section} (chapter ${tb.chapter}) in ${note.id}`);
  }
};

/** 「Chapter 1, §3 Relations」の形。教科書と対応しないノートは undefined */
export const textbookLabel = (note: MathNote) => {
  const tb = note.data.textbook;
  if (!tb) return undefined;
  const chapter = mathChapters.find((c) => c.number === tb.chapter);
  const section = chapter?.sections.find((s) => s.number === tb.section);
  return section ? `Chapter ${tb.chapter}, §${section.number} ${section.title}` : `Chapter ${tb.chapter}`;
};

// 章 → 節 → ノート。節を記録していないノートは章ごとの unsectioned に、教科書と対応しないノートは others に入る。
// 節は math.json の順、ノートは分野の順 → 分野の中の順
export const groupByChapter = (notes: MathNote[]) => {
  notes.forEach(checkTextbook);
  const sorted = [...notes].sort(byFieldThenOrder);
  const chapters = mathChapters
    .map((chapter) => ({
      chapter,
      sections: chapter.sections
        .map((section) => ({
          section,
          notes: sorted.filter(
            (n) => n.data.textbook?.chapter === chapter.number && n.data.textbook.section === section.number,
          ),
        }))
        .filter((s) => s.notes.length > 0),
      unsectioned: sorted.filter(
        (n) => n.data.textbook?.chapter === chapter.number && n.data.textbook.section === undefined,
      ),
    }))
    .filter((c) => c.sections.length > 0 || c.unsectioned.length > 0);
  return { chapters, others: sorted.filter((n) => !n.data.textbook) };
};

// --- 証明の依存関係と出どころ ------------------------------------------------------

// src/lib/math-graph.mjs の buildGraph が返すもの
export type MathStatement = {
  key: string | null;
  slug: string;
  id: string | null;
  kind: string;
  label: string;
  title: string;
  ref: string | null;
  proofs: { kind: string; origin: string | null; text: string | null; note: string | null }[];
  uses: Set<string>;
  usedBy: Set<string>;
};

export type MathGraph = {
  statements: Map<string, MathStatement>;
  statementsByNote: Map<string, MathStatement[]>;
  proofCounts: Map<string, Record<string, number>>;
  noteUses: Map<string, Set<string>>;
  noteUsedBy: Map<string, Set<string>>;
};

export const proofOriginLabel = PROOF_ORIGINS as Record<string, string>;
export const proofOriginKeys = Object.keys(PROOF_ORIGINS);

// /math の凡例に出す説明。PROOF_ORIGINS（src/lib/math-markdown.mjs）と同じキーを持つ
export const proofOriginNote: Record<string, string> = {
  self: '自分で考えて証明した',
  'self-reviewed': '自分で証明し、レビューで確かめた（直した箇所は注記する）',
  textbook: '本文の証明を読んで理解した。自分の証明ではない',
  ai: 'Claude が補った証明。自分の証明ではない',
};

// 公開するノートだけから組む。ビルド中は一度だけ作って使い回す
let graph: Promise<MathGraph> | undefined;
export const getMathGraph = () =>
  (graph ??= getMathNotes().then(
    (notes) => buildGraph(notes.map((n) => ({ slug: n.id, body: n.body ?? '' }))) as MathGraph,
  ));

/** 主張へのリンク先。同じノートならページ内リンク */
export const statementHref = (key: string, from: string) => {
  const [slug, id] = key.split('#');
  return slug === from ? `#${id}` : `/math/${slug}#${id}`;
};
