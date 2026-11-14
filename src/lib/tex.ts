import katex from 'katex';

// Markdown を通さないページ（/math/notation）で数式を描画する。
// オプションは src/lib/math-markdown.mjs と同じ。TeX の誤りはビルドで落とす
export const tex = (source: string, displayMode = false) =>
  katex.renderToString(source, {
    displayMode,
    throwOnError: true,
    strict: 'ignore',
    output: 'htmlAndMathml',
  });

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// 短い説明文を HTML にする。$...$ は数式、`...` はコード、[文字](/math/...) はサイト内リンク。
// それ以外の文字はエスケープする
export const richText = (source: string) =>
  source
    .split(/(\$[^$]+\$|`[^`]+`|\[[^\]]+\]\(\/math[^)]*\))/)
    .map((part) => {
      if (part.length > 2 && part.startsWith('$') && part.endsWith('$')) return tex(part.slice(1, -1));
      if (part.length > 2 && part.startsWith('`') && part.endsWith('`')) return `<code>${escapeHtml(part.slice(1, -1))}</code>`;
      const link = part.match(/^\[([^\]]+)\]\((\/math[^)]*)\)$/);
      if (link) return `<a href="${escapeHtml(link[2])}">${escapeHtml(link[1])}</a>`;
      return escapeHtml(part);
    })
    .join('');
