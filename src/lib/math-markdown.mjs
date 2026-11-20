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
  // 主張が成り立たないことを示す具体例。例（example）と同じく、証明を付けられる
  counterexample: '反例',
  question: '疑問',
  // 本のどこを読み、何を理解したか
  reading: '読書メモ',
};

/** 主張のブロック。証明はこれらのどれかに付く */
export const STATEMENT_KINDS = ['definition', 'theorem', 'lemma', 'proposition', 'corollary', 'example', 'counterexample'];

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

/** 参考文献での番号の一行（`:::lemma[名前]{source="Munkres, Lemma 6.1"}`）。なければ undefined */
export const sourceLine = (source) => (source ? `参考文献：${source}` : undefined);

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

/**
 * アンカー（id）のないブロックに付ける id を決める。ドキュメントごとに 1 つ作る。
 * 検索の結果から証明・反例などへ直接移動できるように、すべてのブロックに id を付ける。
 * 同じ本文なら再ビルドしても同じ id になる（本文の順と主張の id だけで決まる）。
 *
 * - 証明・証明の試み: 付け先の主張の id のあとに `-proof`（2 つ目からは `-proof-2`）、`-attempt`
 * - それ以外（主張に id がない場合も含む）: 種類名と、その種類の id のないブロックの通し番号（`example-1`）
 */
export const createBlockIds = () => {
  const counters = new Map();
  const perStatement = new Map();
  const next = (key) => {
    const n = (counters.get(key) ?? 0) + 1;
    counters.set(key, n);
    return n;
  };
  return {
    /** 主張・注意などの id。書いてあればそのまま */
    block: (name, id) => id ?? `${name}-${next(name)}`,
    /** 証明の id。statementId は付け先の主張の id（なければ undefined） */
    proof: (name, id, statementId) => {
      if (id) return id;
      if (!statementId) return `${name}-${next(name)}`;
      const key = `${statementId}-${name}`;
      const n = (perStatement.get(key) ?? 0) + 1;
      perStatement.set(key, n);
      return n === 1 ? key : `${key}-${n}`;
    },
  };
};

// ドキュメントごとに呼ばれる（Sätteri のプラグインのファクトリー）。直前の主張と id の通し番号を覚えておくため
export const mathBlocks = () => {
  const ids = createBlockIds();
  // 直前の主張の id（証明の付け先。math-graph.mjs の parseNote と同じ規則）と、これまでの主張の id
  let lastStatement;
  const statementIds = new Set();
  // 主張の id → 証明の見出しに添える名前（ラベルの名前の部分。名前がなければ「定理 4.1」）
  const statementNames = new Map();
  return defineMdastPlugin({
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

      const { id, origin, text, note, source } = node.attributes ?? {};
      const isProof = node.name === 'proof' || node.name === 'attempt';
      if (originLine({ origin, text, note }) && !isProof) {
        throw new Error(`origin / text / note can only be used on :::proof or :::attempt (found on :::${node.name})`);
      }
      if (source && isProof) {
        throw new Error(`source can only be used on statement blocks (found on :::${node.name})`);
      }
      // 証明なら出どころ、主張なら参考文献での番号（`source="Munkres, Lemma 6.1"`）を見出しの横に出す
      const line = isProof ? originLine({ origin, text, note }) : sourceLine(source);

      // id と、証明の付け先（data-for。検索の索引で「証明 ｜ 主張の名前」にするために使う）
      let blockId;
      let forId;
      if (isProof) {
        forId = node.attributes?.for ?? lastStatement;
        if (node.attributes?.for && !statementIds.has(forId)) {
          throw new Error(`proof for unknown statement "#${forId}" (found on :::${node.name})`);
        }
        blockId = ids.proof(node.name, id, forId);
      } else {
        blockId = ids.block(node.name, id);
        if (STATEMENT_KINDS.includes(node.name)) {
          lastStatement = blockId;
          statementIds.add(blockId);
          const name =
            labelChildren.length > 0 ? labelChildren : number ? [{ type: 'text', value: `${kind} ${number}` }] : [];
          statementNames.set(blockId, name);
        }
      }
      // 証明の見出しは「証明　付け先の主張の名前」にする（ラベルを書いた証明はそのラベルのまま）
      const forName = isProof && !label && forId ? statementNames.get(forId) : undefined;
      if (forName && forName.length > 0) {
        title.children.push({
          type: 'mathBlockFor',
          data: { hName: 'span', hProperties: { className: ['math-block-for'] } },
          children: structuredClone(forName),
        });
      }

      ctx.setProperty(node, 'data', {
        hName: 'div',
        hProperties: {
          className: ['math-block', `math-${node.name}`],
          id: blockId,
          ...(isProof && forId ? { dataFor: forId } : {}),
        },
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
};

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
