// Design System · Brand previews — logo on light and dark surfaces.

const BrandLogoLight = () => (
  <Preview eyebrow="Brand" title="Logo · on light surfaces"
    description="Use on --bg-page or --bg-surface. Min height 24px. Clear-space equals the height of the 'i' mark on all sides.">
    <div style={{ background: 'var(--neutral-25)', borderRadius: 12, padding: '36px 28px', display: 'flex', gap: 32, alignItems: 'center', border: '1px solid var(--border-subtle)' }}>
      <img src="assets/logo-on-light.png" alt="iFutur" style={{ height: 64, width: 'auto' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div className="if-body-sm" style={{ color: 'var(--fg-2)' }}>Use on <code className="if-mono">--bg-page</code>, <code className="if-mono">--bg-surface</code>.</div>
        <div className="if-body-sm" style={{ color: 'var(--fg-3)' }}>Min height 24px. Clear-space = the height of the "i" mark on all sides.</div>
      </div>
    </div>
  </Preview>
);

const BrandLogoDark = () => (
  <Preview eyebrow="Brand" title="Logo · on dark surfaces">
    <div style={{ background: 'var(--brand-ink)', color: 'var(--fg-on-dark)', borderRadius: 12, padding: '36px 28px', display: 'flex', gap: 32, alignItems: 'center' }}>
      <img src="assets/logo-on-dark.png" alt="iFutur" style={{ height: 64, width: 'auto' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div className="if-body-sm" style={{ color: '#C5C5BC' }}>Use on <code className="if-mono" style={{ color: '#BBCB44' }}>--bg-inverse</code> (#0E1110) or any &gt;700 neutral.</div>
        <div className="if-body-sm" style={{ color: '#9A9A90' }}>The lime is electric on dark — perfect for hero sections.</div>
      </div>
    </div>
  </Preview>
);

Object.assign(window, { BrandLogoLight, BrandLogoDark });
