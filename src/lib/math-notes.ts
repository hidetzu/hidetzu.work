import { getCollection, type CollectionEntry } from 'astro:content';
import mathData from '../data/math.json';
import type { MathField, MathIndex } from '../data/types';

export type MathNote = CollectionEntry<'math'>;
export type MathStatus = MathNote['data']['status'];

// 状態は自己申告。意味は README の「数学ノート」に書いてある
export const mathStatusLabel: Record<MathStatus, string> = {
  unread: '未学習',
  studying: '学習中',
  understood: '理解した',
  'proof-in-progress': '証明を検討中',
  verified: '証明を検証済み',
};

export const mathStatusNote: Record<MathStatus, string> = {
  unread: 'まだ読んでいない',
  studying: '読みながら理解している途中',
  understood: '内容を自分の言葉で説明できる（証明の検証とは別）',
  'proof-in-progress': '証明を自分で考えている。未完成の部分を含む',
  verified: '証明の各段階を確かめ終えた',
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
