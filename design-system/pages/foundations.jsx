// Design System · Foundations previews — color, type, spacing
// All components register on window and consume the shared <Preview> wrapper.

const FoundationsColorBrand = () => (
  <Preview eyebrow="Foundations · Color" title="Brand — iFutur Lime"
    description="--brand-lime is the only true brand color. Use 600 for hover, 700 for active, 100/200 for tints and chip backgrounds.">
    <div className="pv-row" style={{ gap: 18, alignItems: 'flex-end', flexWrap: 'wrap' }}>
      {[
        { hex: '#F9FBEC', label: '50' },
        { hex: '#F2F6D6', label: '100' },
        { hex: '#E4ECAA', label: '200' },
        { hex: '#C6D45C', label: '500' },
        { hex: '#BBCB44', label: 'Lime ★', border: '#A3B339', star: true },
        { hex: '#A3B339', label: '600' },
        { hex: '#889732', label: '700' },
      ].map(s => (
        <div key={s.hex} className="pv-col" style={{ alignItems: 'center', gap: 6 }}>
          <div className="pv-swatch" style={{ background: s.hex, borderColor: s.border }}></div>
          <div className={s.star ? 'pv-swatch-name' : 'pv-swatch-label'}>{s.label}</div>
          <div className="pv-swatch-label">{s.hex.replace('#','')}</div>
        </div>
      ))}
    </div>
  </Preview>
);

const FoundationsColorNeutrals = () => (
  <Preview eyebrow="Foundations · Color" title="Neutrals — warm-cool slate"
    description="Neutrals trend slightly warm so they harmonize with the lime brand. Avoid pure cool greys (#888, etc.) — they fight the wordmark.">
    <div className="pv-row" style={{ gap: 6, alignItems: 'flex-end', flexWrap: 'nowrap' }}>
      {['#FFFFFF','#FAFAF8','#F4F4F1','#ECECE7','#DDDDD6','#C5C5BC','#9A9A90','#6F6F66','#525249','#36362F','#22221D','#131310']
        .map((hex, i) => (
          <div key={hex} className="pv-col" style={{ alignItems: 'center', gap: 4 }}>
            <div className="pv-swatch-sm" style={{ background: hex }}></div>
            <div className="pv-swatch-label">{[0,25,50,100,200,300,400,500,600,700,800,900][i]}</div>
          </div>
        ))}
    </div>
  </Preview>
);

const FoundationsColorSemantic = () => {
  const tones = [
    { name: 'Success', fg: '#2F8F4F', bg: '#E6F4EA', border: '#BFE0CB', usage: 'paid · settled' },
    { name: 'Warning', fg: '#C2841A', bg: '#FCF3DD', border: '#ECD7A0', usage: 'pending · review' },
    { name: 'Danger',  fg: '#C8362D', bg: '#FBE7E5', border: '#EFBEB9', usage: 'failed · refunded' },
    { name: 'Info',    fg: '#2C6DB5', bg: '#E5EFF9', border: '#BCD3EC', usage: 'scheduled' },
  ];
  return (
    <Preview eyebrow="Foundations · Color" title="Semantic — used sparingly"
      description="Lime is the brand, never a status. Status uses these four semantic colors. Each has solid / bg / border tokens.">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14 }}>
        {tones.map(t => (
          <div key={t.name} style={{ border: `1px solid ${t.border}`, background: t.bg, borderRadius: 10, padding: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: t.fg, fontWeight: 600, fontSize: 13 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: t.fg }}></span>{t.name}
            </div>
            <div className="pv-token-name">{t.fg} · {t.usage}</div>
          </div>
        ))}
      </div>
    </Preview>
  );
};

const FoundationsColorForeground = () => (
  <Preview eyebrow="Foundations · Color" title="Foreground hierarchy">
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {[
        { token: 'fg-1', label: 'headlines, primary value', hex: '#131310', size: 22, weight: 600 },
        { token: 'fg-2', label: 'body, table cells',         hex: '#36362F', size: 17 },
        { token: 'fg-3', label: 'secondary text, captions',  hex: '#6F6F66', size: 15 },
        { token: 'fg-4', label: 'placeholder, disabled, muted icons', hex: '#9A9A90', size: 15 },
      ].map(r => (
        <div key={r.token} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ color: `var(--${r.token})`, fontSize: r.size, fontWeight: r.weight }}>
            {r.token} — {r.label}
          </span>
          <span className="pv-token-name">{r.hex}</span>
        </div>
      ))}
    </div>
  </Preview>
);

const FoundationsBrandPalette = () => (
  <Preview eyebrow="Foundations · Color" title="Brand palette at a glance"
    description="Lime > Ink > Bone — the trio that defines every iFutur surface. Semantic colors are accents only.">
    <div style={{ display: 'flex', height: 140, borderRadius: 14, overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
      <div style={{ flex: 2.2, background: '#BBCB44', display: 'flex', alignItems: 'flex-end', padding: 12, color: '#0E1110', fontWeight: 700, fontSize: 13, fontFamily: 'var(--font-mono)' }}>#BBCB44</div>
      <div style={{ flex: 1,   background: '#0E1110', display: 'flex', alignItems: 'flex-end', padding: 12, color: '#BBCB44', fontWeight: 700, fontSize: 13, fontFamily: 'var(--font-mono)' }}>#0E1110</div>
      <div style={{ flex: 1,   background: '#F4F4F1', display: 'flex', alignItems: 'flex-end', padding: 12, color: '#36362F', fontWeight: 700, fontSize: 13, fontFamily: 'var(--font-mono)' }}>#F4F4F1</div>
      <div style={{ flex: 0.6, background: '#6F6F66', display: 'flex', alignItems: 'flex-end', padding: 12, color: '#fff', fontWeight: 700, fontSize: 11, fontFamily: 'var(--font-mono)' }}>#6F6F66</div>
      <div style={{ flex: 0.4, background: '#2F8F4F' }}></div>
      <div style={{ flex: 0.4, background: '#C2841A' }}></div>
      <div style={{ flex: 0.4, background: '#C8362D' }}></div>
    </div>
  </Preview>
);

const FoundationsTypeScale = () => (
  <Preview eyebrow="Foundations · Type" title="Type scale"
    description="Typeface — Open Sans (Google Fonts CDN), weights 400 / 500 / 600 / 700 / 800. JetBrains Mono for tabular numerals and code. No mixing of display + body families.">
    <div className="if-display-lg" style={{ color: 'var(--fg-1)' }}>Move money fast.</div>
    <div className="if-display" style={{ color: 'var(--fg-1)' }}>Move money fast.</div>
    <h1 className="if-h1">Payment captured — 48.210 CFA</h1>
    <h2 className="if-h2">Invoices due this week</h2>
    <h3 className="if-h3">Settlement scheduled for Friday</h3>
    <h4 className="if-h4">Reconciliation rules</h4>
    <p className="if-body-lg" style={{ margin: 0 }}>Body large — for hero subheads and key explanatory text.</p>
    <p style={{ margin: 0 }}>Body — the default reading size for app content and dense screens.</p>
    <p className="if-body-sm" style={{ margin: 0 }}>Body small — table cells, helper text, secondary content.</p>
    <div className="if-eyebrow">Treasury · Updated 12 min ago</div>
  </Preview>
);

const FoundationsTypeWeights = () => (
  <Preview eyebrow="Foundations · Type" title="Display & weights"
    description="Display is Open Sans 800 with tight tracking. Hero headlines only.">
    <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 48, lineHeight: 1.02, letterSpacing: '-0.028em', color: 'var(--fg-1)' }}>
      A new operating system for B2B payments.
    </div>
    <div style={{ display: 'flex', gap: 20, alignItems: 'baseline', flexWrap: 'wrap' }}>
      <span style={{ fontWeight: 400, fontSize: 20, color: 'var(--fg-3)' }}>Regular 400</span>
      <span style={{ fontWeight: 500, fontSize: 20, color: 'var(--fg-3)' }}>Medium 500</span>
      <span style={{ fontWeight: 600, fontSize: 20, color: 'var(--fg-2)' }}>SemiBold 600</span>
      <span style={{ fontWeight: 700, fontSize: 20, color: 'var(--fg-1)' }}>Bold 700</span>
      <span style={{ fontWeight: 800, fontSize: 20, color: 'var(--fg-1)' }}>Black 800</span>
      <span style={{ fontStyle: 'italic', fontWeight: 400, fontSize: 20, color: 'var(--fg-3)' }}>Italic 400</span>
    </div>
  </Preview>
);

const FoundationsTypeNumerals = () => (
  <Preview eyebrow="Foundations · Type" title="Tabular numerals — for tables & ledgers"
    description="Every amount, count, date, and ID in product surfaces uses tabular numerals so columns align. CFA · '.' separator · no decimals.">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>
      <div>
        <div className="pv-token-name" style={{ marginBottom: 6 }}>tabular-nums (default in tables)</div>
        <div style={{ fontVariantNumeric: 'tabular-nums lining-nums', fontSize: 22, fontWeight: 600, color: 'var(--fg-1)', fontFeatureSettings: "'tnum' 1,'lnum' 1" }}>
          <div>     48.210 CFA</div>
          <div>      1.180 CFA</div>
          <div>    312.008 CFA</div>
        </div>
      </div>
      <div>
        <div className="pv-token-name" style={{ marginBottom: 6 }}>proportional (default in prose)</div>
        <div style={{ fontVariantNumeric: 'proportional-nums lining-nums', fontSize: 22, fontWeight: 600, color: 'var(--fg-1)' }}>
          <div>48.210 CFA</div>
          <div>1.180 CFA</div>
          <div>312.008 CFA</div>
        </div>
      </div>
    </div>
  </Preview>
);

const FoundationsSpacingScale = () => (
  <Preview eyebrow="Foundations · Spacing" title="Spacing scale · 4px base">
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {[
        { tok: '--space-1',  px: 4,  use: 'hairline gaps' },
        { tok: '--space-2',  px: 8,  use: 'icon→label, chip padding' },
        { tok: '--space-3',  px: 12, use: 'form rows' },
        { tok: '--space-4',  px: 16, use: 'card inner padding' },
        { tok: '--space-6',  px: 24, use: 'section gaps' },
        { tok: '--space-8',  px: 32, use: 'card outer padding' },
        { tok: '--space-12', px: 48, use: 'between sections' },
        { tok: '--space-20', px: 80, use: 'marketing page rhythm' },
      ].map(r => (
        <div key={r.tok} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: r.px, height: 14, background: 'var(--brand-lime)', borderRadius: 1, flexShrink: 0 }}></div>
          <span className="pv-token-name" style={{ width: 80 }}>{r.tok}</span>
          <span className="if-body-sm">{r.px}px · {r.use}</span>
        </div>
      ))}
    </div>
  </Preview>
);

const FoundationsRadii = () => (
  <Preview eyebrow="Foundations · Spacing" title="Corner radii"
    description="Inputs & buttons use md. Cards use lg. Modals use xl. Pills only for chips and toggles.">
    <div style={{ display: 'flex', gap: 14, alignItems: 'flex-end', flexWrap: 'wrap' }}>
      {[
        { r: 3,  label: 'xs · 3' },
        { r: 6,  label: 'sm · 6' },
        { r: 10, label: 'md · 10' },
        { r: 14, label: 'lg · 14' },
        { r: 20, label: 'xl · 20' },
        { r: 28, label: '2xl · 28' },
      ].map(b => (
        <div key={b.r} className="pv-col" style={{ alignItems: 'center', gap: 6 }}>
          <div style={{ width: 64, height: 64, background: 'var(--neutral-100)', borderRadius: b.r, border: '1px solid var(--border-default)' }}></div>
          <div className="pv-swatch-label">{b.label}</div>
        </div>
      ))}
      <div className="pv-col" style={{ alignItems: 'center', gap: 6 }}>
        <div style={{ width: 120, height: 36, background: 'var(--neutral-100)', borderRadius: 999, border: '1px solid var(--border-default)' }}></div>
        <div className="pv-swatch-label">pill</div>
      </div>
    </div>
  </Preview>
);

const FoundationsElevation = () => (
  <Preview eyebrow="Foundations · Spacing" title="Elevation & shadows" dark={false}
    description="Shadows are layered (ambient + key) and warm-tinted to match the ink palette. Never use pure black shadows.">
    <div style={{ background: 'var(--neutral-25)', padding: 20, borderRadius: 12 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14 }}>
        {[
          { l: 'xs', s: '0 1px 1px rgba(14,17,16,0.04)' },
          { l: 'sm', s: '0 1px 2px rgba(14,17,16,0.06), 0 1px 1px rgba(14,17,16,0.04)' },
          { l: 'md', s: '0 4px 12px rgba(14,17,16,0.06), 0 1px 2px rgba(14,17,16,0.04)' },
          { l: 'lg', s: '0 12px 28px rgba(14,17,16,0.10), 0 2px 4px rgba(14,17,16,0.04)' },
          { l: 'xl', s: '0 24px 56px rgba(14,17,16,0.14), 0 4px 8px rgba(14,17,16,0.05)' },
        ].map(b => (
          <div key={b.l} style={{ background: '#fff', borderRadius: 10, height: 80, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 8, boxShadow: b.s, border: b.l === 'xs' ? '1px solid var(--border-subtle)' : 'none' }}>
            <span className="pv-swatch-label">{b.l}</span>
          </div>
        ))}
      </div>
    </div>
  </Preview>
);

Object.assign(window, {
  FoundationsColorBrand, FoundationsColorNeutrals, FoundationsColorSemantic,
  FoundationsColorForeground, FoundationsBrandPalette,
  FoundationsTypeScale, FoundationsTypeWeights, FoundationsTypeNumerals,
  FoundationsSpacingScale, FoundationsRadii, FoundationsElevation,
});
