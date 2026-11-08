// 数学ノート用の Markdown 拡張（Sätteri のプラグイン）。
//
// - mathBlocks: `:::theorem[名前]` … `:::` を <div class="math-block math-theorem"> にする
// - katexMath:  `$...$` / `$$...$$`（Sätteri の features.math が出す math / inlineMath ノード）を
//               ビルド時に KaTeX で HTML へ変換する。クライアント JS は増やさない
//
// astro.config.mjs から読み込む。Astro の設定ファイルから使うので .mjs のままにしている。
import katex from 'katex';
import { defineMdastPlugin } from 'satteri';

/** ディレクティブ名 → 見出しに出す語。ここに無い名前はビルドエラーにする（綴り間違いで本文が消えないように） */
export const MATH_BLOCK_KINDS = {
  definition: '定義',
  theorem: '定理',
  lemma: '補題',
  proposition: '命題',
  corollary: '系',
  // 完成した証明。∎ を付ける
  proof: '証明',
  // 自分で考えている途中の証明。不足があるものはこちらに書き、∎ を付けない
  attempt: '証明の試み',
  remark: '注意',
  example: '例',
  question: '疑問',
  // 本のどこを読み、何を理解したか
  reading: '読書メモ',
};

export const mathBlocks = defineMdastPlugin({
  name: 'math-blocks',
  containerDirective(node, ctx) {
    const kind = MATH_BLOCK_KINDS[node.name];
    if (!kind) {
      throw new Error(
        `unknown math block ":::${node.name}". Use one of: ${Object.keys(MATH_BLOCK_KINDS).join(', ')}`,
      );
    }

    const first = node.children[0];
    const label = first?.data?.directiveLabel ? first : undefined;
    const title = {
      type: 'paragraph',
      data: { hName: 'p', hProperties: { className: ['math-block-title'] } },
      children: [
        { type: 'strong', children: [{ type: 'text', value: kind }] },
        ...(label ? [{ type: 'text', value: '（' }, ...label.children, { type: 'text', value: '）' }] : []),
      ],
    };

    const id = node.attributes?.id;
    ctx.setProperty(node, 'data', {
      hName: 'div',
      hProperties: { className: ['math-block', `math-${node.name}`], ...(id ? { id } : {}) },
    });
    if (label) ctx.replaceNode(label, title);
    else ctx.prependChild(node, title);
  },
});

const render = (tex, displayMode) =>
  katex.renderToString(tex, {
    displayMode,
    // TeX の誤りはビルドで落とす。壊れた数式をそのまま公開しない
    throwOnError: true,
    // 日本語を \text{} の外に書いたときなどの警告で落とさない
    strict: 'ignore',
    output: 'htmlAndMathml',
  });

// mdast の段階で HTML に置き換える。hast の段階だと、Astro のコードハイライト（Shiki）が
// 先に $$...$$ の <pre><code> を通常のコードブロックとして処理してしまうため。
// mathBlocks より前に置く（ラベル中の数式を先に変換しておく）
export const katexMath = defineMdastPlugin({
  name: 'katex-math',
  math(node, ctx) {
    ctx.replaceNode(node, {
      type: 'html',
      value: `<div class="math-display">${render(node.value, true)}</div>`,
    });
  },
  inlineMath(node, ctx) {
    ctx.replaceNode(node, { type: 'html', value: render(node.value, false) });
  },
});
