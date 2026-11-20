// ビルド結果（dist/）の内部リンクを確かめる。`npm run build` の後に `npm run check:links` で実行する。
//
// - サイト内の href / src（/ で始まるもの、相対パス、#アンカー）が、dist/ のファイルを指しているか
// - #アンカーが付いていれば、リンク先のページにその id があるか
//
// 外部リンク（http(s):, mailto: など）は見ない。依存ライブラリは使わず、正規表現で属性を拾う。
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(process.argv[2] ?? 'dist');

const walk = async (dir) => {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(p)));
    else if (entry.name.endsWith('.html')) out.push(p);
  }
  return out;
};

const exists = async (p) => {
  try {
    return (await stat(p)).isFile();
  } catch {
    return false;
  }
};

const decodeEntities = (s) =>
  s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');

const safeDecode = (s) => {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
};

// URL のパス → dist/ のファイル。/math → math.html、/math/ → math/index.html、/a.css → a.css
const resolveFile = async (urlPath) => {
  const rel = safeDecode(urlPath).replace(/^\/+/, '');
  const candidates = urlPath.endsWith('/')
    ? [path.join(root, rel, 'index.html')]
    : [path.join(root, rel), path.join(root, `${rel}.html`), path.join(root, rel, 'index.html')];
  for (const c of candidates) if (await exists(c)) return c;
  return undefined;
};

// <script> と <style> の中身、HTML コメントは除く（コード中の文字列を拾わない）
const stripNonMarkup = (html) =>
  html
    .replace(/<script\b[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[\s\S]*?<\/style>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '');

const files = await walk(root);
const pages = new Map(); // ファイル → { links, ids }
for (const file of files) {
  const html = stripNonMarkup(await readFile(file, 'utf8'));
  const ids = new Set();
  for (const m of html.matchAll(/\s(?:id|name)="([^"]*)"/g)) ids.add(decodeEntities(m[1]));
  const links = [];
  for (const m of html.matchAll(/\s(href|src)="([^"]*)"/g)) links.push(decodeEntities(m[2]));
  pages.set(file, { links, ids });
}

const errors = [];
let checked = 0;
for (const [file, { links }] of pages) {
  const from = path.relative(root, file);
  for (const link of links) {
    if (link === '' || /^[a-z][a-z0-9+.-]*:/i.test(link) || link.startsWith('//')) continue;
    const [beforeHash, fragment] = link.split('#', 2);
    const urlPath = beforeHash.split('?')[0];
    checked++;

    let target = file;
    if (urlPath !== '') {
      const absolute = urlPath.startsWith('/')
        ? urlPath
        : path.posix.join('/', path.posix.dirname(path.relative(root, file).split(path.sep).join('/')), urlPath);
      target = await resolveFile(absolute);
      if (!target) {
        errors.push(`${from}: ${link} — リンク先のファイルがない`);
        continue;
      }
    }
    if (fragment !== undefined && fragment !== '' && target.endsWith('.html')) {
      const ids = pages.get(target)?.ids;
      if (ids && !ids.has(safeDecode(fragment))) {
        errors.push(`${from}: ${link} — リンク先に id="${safeDecode(fragment)}" がない`);
      }
    }
  }
}

if (errors.length > 0) {
  console.error(`内部リンクの誤り ${errors.length} 件（${checked} 件中）:`);
  for (const e of errors) console.error(`  ${e}`);
  process.exit(1);
}
console.log(`内部リンク ${checked} 件を確認した（${files.length} ページ）。誤りはない。`);
