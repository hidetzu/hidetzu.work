// 数学ノート用の Markdown 拡張（Sätteri のプラグイン）。
//
// - mathBlocks: `:::theorem[名前]` … `:::` を <div class="math-block math-theorem"> にする
// - katexMath:  `$...$` / `$$...$$`（Sätteri の features.math が出す math / inlineMath ノード）を
//               ビルド時に KaTeX で HTML へ変換する。クライアント JS は増やさない
// - cjkLineBreaks: 日本語の文の途中で改行したとき、ブラウザが改行を空白として表示しないようにする
//
// astro.config.mjs から読み込む。Astro の設定ファイルから使うので .mjs のままにしている。
// 依存関係の集計（src/lib/math-graph.mjs）も、ここの定義を使う。
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

/** 主張のブロック。証明はこれらのどれかに付く */
export const STATEMENT_KINDS = ['definition', 'theorem', 'lemma', 'proposition', 'corollary', 'example'];

/** 証明の出どころ（`:::proof{origin=self}`）。ページ全体の status とは別に、証明ごとに記録する */
export const PROOF_ORIGINS = {
  self: '自力で証明',
  'self-reviewed': '自力で証明・レビュー済み',
  textbook: '教科書の証明を読んで理解',
  ai: 'Claude が補った証明',
};

/** 証明の文章を書いた人（`:::proof{text=ai}`）。省略したら記録なし */
export const PROOF_TEXT = {
  ai: '文章は Claude が整理',
};

/** 出どころの一行（`出どころ：自力で証明・文章は Claude が整理（注記）`）。何も書いていなければ undefined */
export const originLine = ({ origin, text, note } = {}) => {
  if (origin !== undefined && !(origin in PROOF_ORIGINS)) {
    throw new Error(`unknown proof origin "${origin}". Use one of: ${Object.keys(PROOF_ORIGINS).join(', ')}`);
  }
  if (text !== undefined && !(text in PROOF_TEXT)) {
    throw new Error(`unknown proof text "${text}". Use one of: ${Object.keys(PROOF_TEXT).join(', ')}`);
  }
  const parts = [origin && PROOF_ORIGINS[origin], text && PROOF_TEXT[text]].filter(Boolean);
  if (parts.length === 0 && !note) return undefined;
  return `出どころ：${parts.join('・') || '記録なし'}${note ? `（${note}）` : ''}`;
};

// ラベルの先頭の番号。「3.1：名前」「1. 名前」「4.1」を、見出しでは「補題 3.1（名前）」にする
const LABEL_NUMBER = /^(\d+(?:\.\d+)*)(?:\s*[.．：:]\s*|$)/;

/** ラベルの文字列 → { number, name }。番号がなければ number は undefined */
export const splitLabel = (label = '') => {
  const m = label.match(LABEL_NUMBER);
  if (!m) return { number: undefined, name: label };
  return { number: m[1], name: label.slice(m[0].length) };
};

/** 見出しの文字列（依存関係の一覧などで使う）。例: 「補題 3.1（2 つの同値類は…）」 */
export const blockTitle = (kind, label) => {
  const { number, name } = splitLabel(label);
  const head = number ? `${MATH_BLOCK_KINDS[kind]} ${number}` : MATH_BLOCK_KINDS[kind];
  return name ? `${head}（${name}）` : head;
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
    let labelChildren = label ? [...label.children] : [];

    // 先頭の番号を種類名の側に移す
    let number;
    const head = labelChildren[0];
    if (head?.type === 'text') {
      const m = head.value.match(LABEL_NUMBER);
      if (m) {
        number = m[1];
        const rest = head.value.slice(m[0].length);
        labelChildren = rest ? [{ ...head, value: rest }, ...labelChildren.slice(1)] : labelChildren.slice(1);
      }
    }

    const title = {
      type: 'paragraph',
      data: { hName: 'p', hProperties: { className: ['math-block-title'] } },
      children: [
        { type: 'strong', children: [{ type: 'text', value: number ? `${kind} ${number}` : kind }] },
        ...(labelChildren.length > 0
          ? [{ type: 'text', value: '（' }, ...labelChildren, { type: 'text', value: '）' }]
          : []),
      ],
    };

    const { id, origin, text, note } = node.attributes ?? {};
    const line = originLine({ origin, text, note });
    if (line && node.name !== 'proof' && node.name !== 'attempt') {
      throw new Error(`origin / text / note can only be used on :::proof or :::attempt (found on :::${node.name})`);
    }

    ctx.setProperty(node, 'data', {
      hName: 'div',
      hProperties: { className: ['math-block', `math-${node.name}`], ...(id ? { id } : {}) },
    });
    const originNode = line && {
      type: 'paragraph',
      data: { hName: 'p', hProperties: { className: ['math-block-origin'] } },
      children: [{ type: 'text', value: line }],
    };
    if (label) {
      if (originNode) ctx.insertAfter(label, originNode);
      ctx.replaceNode(label, title);
    } else {
      // 同じ位置への prependChild は呼んだ順に並ぶ
      ctx.prependChild(node, title);
      if (originNode) ctx.prependChild(node, originNode);
    }
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

// 日本語（漢字・かな・全角の約物）の直後の改行を消す。
// Markdown では段落内の改行が空白として表示され、「である。 対偶」のように文の間に空きが出るため。
// 英字や数式の直後の改行は、単語の区切りなので空白のまま残す
const CJK_BEFORE_NEWLINE = /([\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}　-〿ー＀-￯])\n/gu;

export const cjkLineBreaks = defineMdastPlugin({
  name: 'cjk-line-breaks',
  text(node, ctx) {
    if (!node.value.includes('\n')) return;
    const value = node.value.replace(CJK_BEFORE_NEWLINE, '$1');
    if (value !== node.value) ctx.setProperty(node, 'value', value);
  },
});
