// 数学ノートの「証明の依存関係」を、Markdown の本文から集める。
//
// - 主張（定義・定理・補題・命題・系・例）の直後の :::proof は、その主張の証明とみなす。
//   離れた位置に書いた証明は `:::proof{for=thm-a}` で主張の id を指定する
// - 証明の中に書いたリンク（`[命題 2](#prop-a)`、`[...](/math/<slug>#id)`）を、
//   その証明が「使う」結果とする。証明の外のリンクや frontmatter の related は、依存関係には入れない
//
// ビルド時（src/lib/math-notes.ts）とテスト（tests/math-graph.test.mjs）の両方から使うので、
// astro:content に依存しない .mjs にしている。
import { MATH_BLOCK_KINDS, PROOF_ORIGINS, STATEMENT_KINDS, blockTitle } from './math-markdown.mjs';

const OPEN = /^\s*:::([a-z]+)(?:\[(.*)\])?(?:\{([^}]*)\})?\s*$/;
const CLOSE = /^\s*:::\s*$/;
const ATTR = /#([\w-]+)|\.([\w-]+)|([\w-]+)=(?:"([^"]*)"|([^\s"]+))/g;
const LINK = /\]\(([^)\s]+)\)/g;

/** `{#id key=value key="a b"}` → { id, key, ... } */
export const parseAttributes = (source = '') => {
  const attrs = {};
  for (const m of source.matchAll(ATTR)) {
    if (m[1]) attrs.id = m[1];
    else if (m[3]) attrs[m[3]] = m[4] ?? m[5];
  }
  return attrs;
};

/** リンク先 → `<slug>#<id>`。ページ内リンクは今のノートの slug で補う。アンカーのないリンクは null */
export const resolveLink = (href, slug) => {
  if (href.startsWith('#')) return `${slug}${href}`;
  const m = href.match(/^\/math\/([a-z0-9-]+)(#[\w-]+)?$/);
  if (!m) return null;
  return m[2] ? `${m[1]}${m[2]}` : null;
};

/** リンク先のノート（`/math/<slug>` か `/math/<slug>#id`）。数学ノート以外へのリンクは null */
const linkedNote = (href, slug) => {
  if (href.startsWith('#')) return slug;
  return href.match(/^\/math\/([a-z0-9-]+)(?:#[\w-]+)?$/)?.[1] ?? null;
};

/**
 * 1 つのノートの本文から、主張のブロックと証明を取り出す。
 * @returns {{ statements: object[], proofs: object[] }}
 */
export const parseNote = (slug, body) => {
  const statements = [];
  const proofs = [];
  let open = null; // 開いているブロック（入れ子は使っていないので 1 段だけ見る）
  let lastStatement = null;

  for (const line of body.split('\n')) {
    if (open) {
      if (CLOSE.test(line)) {
        if (open.proof) proofs.push(open.proof);
        open = null;
      } else if (open.proof) {
        for (const m of line.matchAll(LINK)) open.proof.hrefs.push(m[1]);
      }
      continue;
    }
    const m = line.match(OPEN);
    if (!m) continue;
    const [, kind, label = '', attrSource] = m;
    if (!(kind in MATH_BLOCK_KINDS)) throw new Error(`math: unknown block ":::${kind}" in ${slug}`);
    const attrs = parseAttributes(attrSource);
    open = { kind };

    if (STATEMENT_KINDS.includes(kind)) {
      lastStatement = {
        key: attrs.id ? `${slug}#${attrs.id}` : null,
        slug,
        id: attrs.id ?? null,
        kind,
        label,
        title: blockTitle(kind, label),
        ref: attrs.ref ?? null,
      };
      statements.push(lastStatement);
    } else if (kind === 'proof' || kind === 'attempt') {
      let statement = lastStatement;
      if (attrs.for) {
        statement = statements.find((s) => s.id === attrs.for);
        if (!statement) throw new Error(`math: proof for unknown statement "#${attrs.for}" in ${slug}`);
      }
      open.proof = {
        slug,
        kind,
        statement,
        origin: attrs.origin ?? null,
        text: attrs.text ?? null,
        note: attrs.note ?? null,
        hrefs: [],
      };
    }
  }
  if (open) throw new Error(`math: unclosed block ":::${open.kind}" in ${slug}`);
  return { statements, proofs };
};

const ORIGIN_KEYS = [...Object.keys(PROOF_ORIGINS), 'none'];

/**
 * すべてのノートから依存関係をまとめる。
 * @param {{ slug: string, body: string }[]} notes
 */
export const buildGraph = (notes) => {
  /** key（`<slug>#<id>`）→ 主張 */
  const statements = new Map();
  /** slug → そのノートの主張（本文の順） */
  const statementsByNote = new Map();
  /** slug → 証明の出どころごとの数 */
  const proofCounts = new Map();
  /** slug → 証明で結果を使っているノート / 使われているノート */
  const noteUses = new Map();
  const noteUsedBy = new Map();

  const parsed = notes.map(({ slug, body }) => ({ slug, ...parseNote(slug, body) }));

  for (const { slug, statements: list } of parsed) {
    statementsByNote.set(slug, []);
    noteUses.set(slug, new Set());
    noteUsedBy.set(slug, new Set());
    proofCounts.set(slug, Object.fromEntries(ORIGIN_KEYS.map((k) => [k, 0])));
    for (const s of list) {
      const entry = { ...s, proofs: [], uses: new Set(), usedBy: new Set() };
      statementsByNote.get(slug).push(entry);
      if (s.key) statements.set(s.key, entry);
    }
  }

  for (const { slug, statements: list, proofs } of parsed) {
    for (const proof of proofs) {
      if (proof.kind === 'proof') proofCounts.get(slug)[proof.origin ?? 'none'] += 1;
      const owner =
        proof.statement &&
        statementsByNote.get(slug)[list.indexOf(proof.statement)];
      if (owner) owner.proofs.push({ kind: proof.kind, origin: proof.origin, text: proof.text, note: proof.note });

      for (const href of proof.hrefs) {
        const other = linkedNote(href, slug);
        if (other && other !== slug && noteUses.has(other)) {
          noteUses.get(slug).add(other);
          noteUsedBy.get(other).add(slug);
        }
        const key = resolveLink(href, slug);
        const target = key && statements.get(key);
        if (!target || !owner || target === owner) continue;
        // 引用した主張（ref）なら、引用元も使ったものとする
        const origin = target.ref && statements.get(target.ref);
        if (target.ref && !origin) throw new Error(`math: unknown ref "${target.ref}" in ${target.key}`);
        for (const t of origin ? [target, origin] : [target]) {
          owner.uses.add(t.key);
          if (owner.key) t.usedBy.add(owner.key);
          if (t.slug !== slug) {
            noteUses.get(slug).add(t.slug);
            noteUsedBy.get(t.slug).add(slug);
          }
        }
      }
    }
  }

  return { statements, statementsByNote, proofCounts, noteUses, noteUsedBy };
};

/**
 * 分野の中の並び順と、証明の依存関係のずれを探す（README の「並び順」）。
 * 分野の中では、証明で使うノートを前に置く。後ろのノートを使っているものを返す。
 * frontmatter の usesLater に「この順のままにする」と判断を書いたものは accepted を付けて返す。
 * usesLater に書いたのに、もう後ろのノートを使っていないもの（判断が古くなったもの）は stale に入れる。
 * @param {{ slug: string, topic: string, usesLater: { note: string, reason: string }[] }[]} notes 表示の順（分野の順 → 分野の中の順）
 * @param {Map<string, Set<string>>} noteUses buildGraph の noteUses
 */
export const orderViolations = (notes, noteUses) => {
  const position = new Map(notes.map((n, i) => [n.slug, i]));
  const violations = [];
  const stale = [];
  for (const n of notes) {
    const later = [...(noteUses.get(n.slug) ?? [])]
      .filter((other) => {
        const o = notes[position.get(other)];
        return o && o.topic === n.topic && position.get(other) > position.get(n.slug);
      })
      .sort((a, b) => position.get(a) - position.get(b));
    for (const other of later) {
      const decision = n.usesLater.find((u) => u.note === other);
      violations.push({ slug: n.slug, uses: other, accepted: decision?.reason ?? null });
    }
    for (const u of n.usesLater) {
      if (!later.includes(u.note)) stale.push({ slug: n.slug, uses: u.note });
    }
  }
  return { violations, stale };
};
