// 検索の索引を作る（`npm run build` の中で astro build のあとに実行する。docs/adr/0010）。
//
// 1. dist/ のページ（data-pagefind-body のあるノートと資料）を、ページ単位の結果（種類は section「節・資料」）として入れる
// 2. 数学ノートの定義・定理・証明・反例・例などのブロック（src/lib/math-markdown.mjs が出す div.math-block）を、
//    1 つずつ別の結果として入れる。結果の URL はノートの中のブロックのアンカー（/math/<slug>#<id>）
//
// 種類（kind）と分野（field）はフィルタにして、/math/search で絞り込めるようにする。
// 以前の pagefind.yml（CLI の設定）の内容は、ここの createIndex の設定に移した。
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import * as pagefind from 'pagefind';

const root = path.resolve(process.argv[2] ?? 'dist');
// 分野の id → 分野名（検索結果に出す）
const mathData = JSON.parse(await readFile(new URL('../src/data/math.json', import.meta.url), 'utf8'));
const fieldTitles = new Map(mathData.fields.map((f) => [f.id, f.title]));

// ブロックの種類 → 検索の種類（/math/search の絞り込み）。ここにない種類（注意・疑問・読書メモ）は other（「すべて」でだけ出る）
const KIND = {
  definition: 'definition',
  theorem: 'theorem',
  proposition: 'theorem',
  lemma: 'theorem',
  corollary: 'theorem',
  proof: 'proof',
  attempt: 'proof',
  counterexample: 'counterexample',
  example: 'example',
};

const escapeAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const decode = (s) =>
  s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');

/** start の位置の開始タグから、対応する終了タグまで（同じ名前のタグの入れ子を数える） */
const balanced = (html, start, tag) => {
  const re = new RegExp(`<(/?)${tag}\\b[^>]*>`, 'gi');
  re.lastIndex = start;
  let depth = 0;
  for (let m; (m = re.exec(html)); ) {
    depth += m[1] ? -1 : 1;
    if (depth === 0) return html.slice(start, re.lastIndex);
  }
  throw new Error(`unclosed <${tag}> at ${start}`);
};

/** 要素の中身（最初の開始タグと最後の終了タグを除く） */
const inner = (element) => element.slice(element.indexOf('>') + 1, element.lastIndexOf('<'));

/** KaTeX を除いた文字列（タイトルの比較・並べ替えに使う） */
const plainText = (html) => {
  let out = html;
  for (let i = out.indexOf('<span class="katex"'); i !== -1; i = out.indexOf('<span class="katex"')) {
    const katex = balanced(out, i, 'span');
    // 数式は TeX のソースで残す（KaTeX の MathML の annotation）
    const tex = katex.match(/<annotation encoding="application\/x-tex">([\s\S]*?)<\/annotation>/)?.[1] ?? '';
    out = out.slice(0, i) + decode(tex) + out.slice(i + katex.length);
  }
  return decode(out.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();
};

/** ノートのページから、ブロックを本文の順に取り出す */
const blocksOf = (html) => {
  const blocks = [];
  const re = /<div class="math-block math-([a-z]+)"([^>]*)>/g;
  for (let m; (m = re.exec(html)); ) {
    const element = balanced(html, m.index, 'div');
    const id = m[2].match(/\sid="([^"]+)"/)?.[1];
    const forId = m[2].match(/\sdata-for="([^"]+)"/)?.[1];
    const titleHtml = element.match(/<p class="math-block-title">([\s\S]*?)<\/p>/)?.[1] ?? '';
    // 見出しは「<strong>定理 4.1</strong>（名前）」。名前のないブロックは種類名だけ
    const label = plainText(titleHtml.match(/<strong>([\s\S]*?)<\/strong>/)?.[1] ?? '');
    const nameHtml = titleHtml.replace(/^<strong>[\s\S]*?<\/strong>/, '').replace(/^（([\s\S]*)）$/, '$1');
    blocks.push({ kind: m[1], id, forId, label, nameHtml, body: inner(element) });
    re.lastIndex = m.index + element.length;
  }
  return blocks;
};

const walk = async (dir) => {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(p)));
    else if (entry.name.endsWith('.html')) out.push(p);
  }
  return out;
};

const { index, errors } = await pagefind.createIndex({
  // 数式（KaTeX）は索引に入れない。見た目用の HTML と MathML（TeX のソース）が重複して抜粋に出るため
  excludeSelectors: ['.katex'],
});
if (!index) throw new Error(`pagefind: ${errors.join(', ')}`);

const pages = await index.addDirectory({ path: root });
if (pages.errors.length > 0) throw new Error(`pagefind: ${pages.errors.join(', ')}`);

let records = 0;
for (const file of await walk(path.join(root, 'math'))) {
  const html = await readFile(file, 'utf8');
  // 数学ノート（NoteLayout に分野のフィルタがあるページ）だけ。記号と文字などの資料はページ単位の結果だけにする
  if (!html.includes('<span hidden data-pagefind-filter="field">')) continue;
  const slug = path.relative(path.join(root, 'math'), file).replace(/\.html$/, '');
  const noteTitle = plainText(html.match(/<h1 data-pagefind-body[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? slug);
  const field = html.match(/<span hidden data-pagefind-filter="field">([^<]+)<\/span>/)?.[1];
  if (!field || !fieldTitles.has(field)) throw new Error(`search: no field filter in ${file}`);
  const fieldTitle = fieldTitles.get(field);

  const blocks = blocksOf(html);
  const seen = new Set();
  for (const b of blocks) {
    if (!b.id) throw new Error(`search: math block without id in ${file}`);
    if (seen.has(b.id)) throw new Error(`search: duplicate id "${b.id}" in ${file}`);
    seen.add(b.id);
  }
  const byId = new Map(blocks.map((b) => [b.id, b]));

  for (const b of blocks) {
    const kind = KIND[b.kind] ?? 'other';
    // 証明は「証明 ｜ 付け先の主張の名前」。名前のない主張なら主張の見出し（「定理 4.1」）
    const statement = b.forId ? byId.get(b.forId) : undefined;
    const isProof = b.kind === 'proof' || b.kind === 'attempt';
    const nameHtml = isProof ? (statement ? statement.nameHtml || statement.label : '') : b.nameHtml;
    const name = plainText(nameHtml);
    const kindLabel = b.label;
    const title = name ? `${kindLabel} ｜ ${name}` : `${kindLabel}（${noteTitle}）`;
    // 証明の見出しは「証明」だけなので、付け先の主張の名前でも見つかるように本文の前に置く
    const lead = isProof && nameHtml ? `<p>${nameHtml}</p>` : '';
    // 本文（data-pagefind-body）の外に、フィルタとメタ情報を置く（内側に置くと、その文字が抜粋に出る）
    const content = `<!doctype html><html lang="ja"><head><title>${escapeAttr(title)}</title></head><body>
<span data-pagefind-filter="area">math</span>
<span data-pagefind-filter="kind">${kind}</span>
<span data-pagefind-filter="field">${field}</span>
<meta data-pagefind-meta="title[content]" content="${escapeAttr(title)}">
<meta data-pagefind-meta="kind_label[content]" content="${escapeAttr(kindLabel)}">
<meta data-pagefind-meta="name_html[content]" content="${escapeAttr(nameHtml)}">
<meta data-pagefind-meta="note[content]" content="${escapeAttr(noteTitle)}">
<meta data-pagefind-meta="note_url[content]" content="/math/${slug}">
<meta data-pagefind-meta="field_title[content]" content="${escapeAttr(fieldTitle)}">
<div data-pagefind-body>
${lead}
${b.body}
</div></body></html>`;
    const res = await index.addHTMLFile({ url: `/math/${slug}#${b.id}`, content });
    if (res.errors.length > 0) throw new Error(`pagefind: ${res.errors.join(', ')} (${slug}#${b.id})`);
    records++;
  }
}

const written = await index.writeFiles({ outputPath: path.join(root, 'pagefind') });
if (written.errors.length > 0) throw new Error(`pagefind: ${written.errors.join(', ')}`);
await pagefind.close();
console.log(`検索の索引: ページ ${pages.page_count} 件、ブロック ${records} 件`);
