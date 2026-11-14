import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import mathData from './data/math.json';

// 分野の id。src/data/math.json の fields に書いたものだけを topic に使える
const fieldIds = mathData.fields.map((f) => f.id) as [string, ...string[]];

// 数学ノート。src/content/math/<slug>.md を置くと /math/<slug> として公開される。
// 書き方は README の「数学ノート」と docs/math-note-template.md
const math = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/math' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // 分野（logic, set-theory, topology など）。/math ではこの分野ごとにまとめて出す
    topic: z.enum(fieldIds),
    // 分野の中での並び順（小さいほど先）。省略したものは後ろに作成日順で並ぶ
    order: z.number().optional(),
    // 理解の状態。自己申告で、本人だけが変える。
    // understood（自分の言葉で説明できる）と verified（証明を検証済み）は別のもの
    status: z.enum(['unread', 'studying', 'understood', 'proof-in-progress', 'verified']),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    // 関連するノートの slug。相手のノートにも自動で逆向きのリンクが出るので、片方に書けばよい
    related: z.array(z.string()).default([]),
    // 読んだ箇所。location は本を見て確かめた章・節・ページだけを書く（例: "§12, pp. 75–78"）
    sources: z.array(z.object({ title: z.string(), location: z.string().optional() })).default([]),
    // 教科書（src/data/math.json の textbook / chapters）のどの章・節に当たるか。/math の章立ての一覧に使う。
    // 本を見て確かめた節だけを書く。節が分からなければ chapter だけにする。教科書と対応しないノートは省略する
    textbook: z.object({ chapter: z.number().int(), section: z.number().int().optional() }).optional(),
    // true の間は `npm run dev` でだけ表示し、ビルドには含めない
    draft: z.boolean().default(false),
  }),
});

export const collections = { math };
