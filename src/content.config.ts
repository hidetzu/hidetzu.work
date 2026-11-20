import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import mathData from './data/math.json';
import mlData from './data/ml.json';

// 知識ノートの共通の属性（docs/design/content-platform.md §5.2）。分野ごとのコレクションがこれに分野固有の属性を足す
const baseNote = z.object({
  title: z.string(),
  description: z.string(),
  // 分類の中の並び順（小さいほど先）。省略したものは後ろに作成日順で並ぶ
  order: z.number().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
  tags: z.array(z.string()).default([]),
  // 別名・英語名・略称（例: XOR、exclusive or）。ノートの冒頭に出し、検索で探せるようにする。
  // 本文に出てこない言い方だけを書く
  aliases: z.array(z.string()).default([]),
  // 関連するノートの slug（同じ分野のノートだけ）。相手のノートにも自動で逆向きのリンクが出るので、片方に書けばよい
  related: z.array(z.string()).default([]),
  // true の間は `npm run dev` でだけ表示し、ビルドには含めない
  draft: z.boolean().default(false),
});

// 分野の id。src/data/math.json の fields に書いたものだけを topic に使える
const fieldIds = mathData.fields.map((f) => f.id) as [string, ...string[]];

// 数学ノート。src/content/math/<slug>.md を置くと /math/<slug> として公開される。
// 書き方は README の「数学ノート」と docs/math-note-template.md
const math = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/math' }),
  schema: baseNote.extend({
    // 分野（logic, set-theory, topology など）。/math ではこの分野ごとにまとめて出す
    topic: z.enum(fieldIds),
    // 理解の状態。自己申告で、本人だけが変える。
    // understood（自分の言葉で説明できる）と verified（証明を検証済み）は別のもの
    status: z.enum(['unread', 'studying', 'understood', 'proof-in-progress', 'verified']),
    // 参照した資料。複数書ける。location は資料を見て確かめた章・節・ページだけを書く（例: "§12, pp. 75–78"）。
    // note には、その資料との対応の補足を書く（例: 「4 節は参考文献の範囲外」）
    sources: z
      .array(z.object({ title: z.string(), location: z.string().optional(), note: z.string().optional() }))
      .default([]),
    // 学習記録: 参考文献（src/data/math.json の references）のどの章・節を学んで書いたか。/math/learning の一覧に使う。
    // ref は references の id で、省略すると先頭の参考文献。資料を見て確かめた節だけを書き、分からなければ chapter だけにする。
    // 参考文献の章立てと対応しないノートは省略する
    textbook: z
      .object({ ref: z.string().optional(), chapter: z.number().int(), section: z.number().int().optional() })
      .optional(),
    // 分野の中の並び順（order）の例外。分野の中では証明で使うノートを前に置くが、後ろのノートを使う順のままにすると
    // 判断したとき、その相手（note）と理由（reason）を書く。書かずに後ろのノートを使うと、ビルドで警告が出る（README の「並び順」）
    usesLater: z.array(z.object({ note: z.string(), reason: z.string().min(1) })).default([]),
  }),
});

// 数学ノートの学習記録。src/content/math-log/<slug>.md に、ノートごとの学習の経過・証明の経緯・未着手の演習を書く。
// /math/learning にノートごとにまとめて出す。知識ノートの本文には書かない（docs/adr/0009）
const mathLog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/math-log' }),
  schema: z.object({
    // 記録の対象の数学ノートの slug（ファイル名と同じにする）。ノートがなければビルドで落とす
    note: z.string(),
  }),
});

// 機械学習の学習ノート。src/content/ml/<slug>.md を置くと /ml/<slug> として公開される。
// /math とは独立したセクション（docs/adr/0007）。書き方は README の「機械学習の学習マップ」と docs/ml-note-template.md
const areaIds = mlData.areas.map((a) => a.id) as [string, ...string[]];

const ml = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/ml' }),
  schema: baseNote.extend({
    // 領域（src/data/ml.json の areas の id）。/ml の学習マップでこの領域の下に出す
    area: z.enum(areaIds),
    // 理解の状態。自己申告で、本人だけが変える
    status: z.enum(['unassessed', 'studying', 'concept', 'explainable']).default('unassessed'),
    // 状態の補足（例: 「初回学習完了・再学習予定」）。状態の横に出す
    progress: z.string().optional(),
    // 参考文献・原論文。year と url は一次資料で確かめたものだけを書く
    references: z
      .array(z.object({ title: z.string(), year: z.number().int().optional(), url: z.url().optional() }))
      .default([]),
  }),
});

export const collections = { math, mathLog, ml };
