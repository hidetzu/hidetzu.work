import { getCollection, type CollectionEntry } from 'astro:content';

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

export const byLastModified = (a: MathNote, b: MathNote) =>
  lastModified(b).getTime() - lastModified(a).getTime();
