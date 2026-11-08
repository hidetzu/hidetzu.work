import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// 数学ノート。src/content/math/<slug>.md を置くと /math/<slug> として公開される。
// 書き方は README の「数学ノート」と docs/math-note-template.md
const math = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/math' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // 学習テーマ（topology など）。一覧で小さなラベルとして出す
    topic: z.string(),
    // 理解の状態。自己申告で、本人だけが変える。
    // understood（自分の言葉で説明できる）と verified（証明を検証済み）は別のもの
    status: z.enum(['unread', 'studying', 'understood', 'proof-in-progress', 'verified']),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    // 読んだ箇所。location は本を見て確かめた章・節・ページだけを書く（例: "§12, pp. 75–78"）
    sources: z.array(z.object({ title: z.string(), location: z.string().optional() })).default([]),
    // true の間は `npm run dev` でだけ表示し、ビルドには含めない
    draft: z.boolean().default(false),
  }),
});

export const collections = { math };
