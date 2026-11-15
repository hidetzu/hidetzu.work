import { getCollection, type CollectionEntry } from 'astro:content';
import mlData from '../data/ml.json';
import type { MlArea, MlAxis, MlIndex, MlStatus } from '../data/types';

// 機械学習の学習マップ（/ml）。数学ノート（/math）とは独立している（docs/adr/0007）

export const mlIndex = mlData as MlIndex;
export type MlNote = CollectionEntry<'ml'>;

// 状態は自己申告で、本人だけが変える。初期値は未評価
export const mlStatusKeys: MlStatus[] = ['unassessed', 'studying', 'concept', 'explainable'];

export const mlStatusLabel: Record<MlStatus, string> = {
  unassessed: '未評価',
  studying: '学習中',
  concept: '概念理解',
  explainable: '自分の言葉で説明可能',
};

export const mlStatusNote: Record<MlStatus, string> = {
  unassessed: 'まだ理解の程度を評価していない',
  studying: '学んでいる途中',
  concept: '何をする技術で、なぜ必要だったのかが分かる',
  explainable: '背景・仕組み・限界・その後の発展を、自分の言葉で説明できる',
};

export const mlAxisLabel: Record<MlAxis, string> = {
  foundation: '基礎',
  method: '学習方法',
  model: 'モデルの種類',
  application: '応用',
};

// draft: true のノートは dev でだけ出す
export const getMlNotes = () => getCollection('ml', (note) => import.meta.env.DEV || !note.data.draft);

export const areaOf = (note: MlNote): MlArea => {
  const area = mlIndex.areas.find((a) => a.id === note.data.area);
  if (!area) throw new Error(`ml: unknown area "${note.data.area}" in ${note.id}`);
  return area;
};

export const byOrder = (a: MlNote, b: MlNote) =>
  (a.data.order ?? Number.MAX_SAFE_INTEGER) - (b.data.order ?? Number.MAX_SAFE_INTEGER) ||
  a.data.createdAt.getTime() - b.data.createdAt.getTime() ||
  a.data.title.localeCompare(b.data.title, 'ja');

export const ymd = (date: Date) => date.toISOString().slice(0, 10);

// ml.json の整合性をビルドで確かめる。実線の矢印は prerequisites と一致させる
export const validateMlData = (data: MlIndex) => {
  const ids = new Set(data.areas.map((a) => a.id));
  const known = (id: string, where: string) => {
    if (!ids.has(id)) throw new Error(`ml.json: unknown area "${id}" in ${where}`);
  };
  for (const a of data.areas) a.prerequisites.forEach((p) => known(p, `${a.id}.prerequisites`));
  for (const e of data.edges) {
    known(e.from, 'edges');
    known(e.to, 'edges');
  }
  for (const o of data.order) known(o.area, 'order');
  for (const t of data.timeline) known(t.area, `timeline ${t.year}`);
  const solid = new Set(data.edges.filter((e) => !e.dashed).map((e) => `${e.from}>${e.to}`));
  const prereq = new Set(data.areas.flatMap((a) => a.prerequisites.map((p) => `${p}>${a.id}`)));
  for (const k of solid) if (!prereq.has(k)) throw new Error(`ml.json: solid edge ${k} is not a prerequisite`);
  for (const k of prereq) if (!solid.has(k)) throw new Error(`ml.json: prerequisite ${k} has no solid edge`);
};
