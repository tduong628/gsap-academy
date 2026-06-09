import { useMemo, useState } from 'react';
import './code-block.css';

const esc = (s: string): string =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// One master pattern, scanned left-to-right. Comments and strings come first so
// their contents are claimed before any keyword/number rule can match inside.
// Methods/keys use lookahead so the trailing "(" / ":" stays in the gap.
const TOKEN =
  /(\/\/[^\n]*)|(`[^`]*`|"[^"]*"|'[^']*')|\b(import|from|export|const|let|var|function|return|if|else|for|of|in|new|await|async|true|false|null|undefined|class|extends)\b|([A-Za-z_$][\w$]*)(?=\s*\()|\b(\d+\.?\d*)\b|([A-Za-z_$][\w$]*)(?=\s*:)/g;

/**
 * Single-pass tokeniser: walks the source once, HTML-escaping the text between
 * matches and wrapping each token. Never re-scans injected markup, so attribute
 * text like class="…" can't be re-matched, and raw JSX "<div>" stays escaped.
 */
function highlight(src: string): string {
  let out = '';
  let last = 0;
  TOKEN.lastIndex = 0;
  for (let m = TOKEN.exec(src); m; m = TOKEN.exec(src)) {
    out += esc(src.slice(last, m.index));
    const [whole, comment, str, kw, fn, num, key] = m;
    if (comment != null) out += `<span class="tok-comment">${esc(comment)}</span>`;
    else if (str != null) out += `<span class="tok-string">${esc(str)}</span>`;
    else if (kw != null) out += `<span class="tok-kw">${esc(kw)}</span>`;
    else if (fn != null) out += `<span class="tok-fn">${esc(fn)}</span>`;
    else if (num != null) out += `<span class="tok-num">${esc(num)}</span>`;
    else if (key != null) out += `<span class="tok-key">${esc(key)}</span>`;
    else out += esc(whole);
    last = m.index + whole.length;
  }
  out += esc(src.slice(last));
  return out;
}

export function CodeBlock({
  code,
  label = 'tween.js',
}: {
  code: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);
  const html = useMemo(() => highlight(code.trim()), [code]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code.trim());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard blocked — no-op */
    }
  };

  return (
    <figure className="code">
      <figcaption className="code__bar">
        <span className="code__dots" aria-hidden="true">
          <i /> <i /> <i />
        </span>
        <span className="code__label mono-num">{label}</span>
        <button className="code__copy" onClick={copy} aria-live="polite">
          {copied ? 'Copied ✓' : 'Copy'}
        </button>
      </figcaption>
      <pre className="code__pre">
        {/* Safe: `code` is always a static, curated snippet from lessons.ts
            (never user input), and highlight() HTML-escapes before tokenising. */}
        <code dangerouslySetInnerHTML={{ __html: html }} />
      </pre>
    </figure>
  );
}
