// Design System · Components previews

// ─── Buttons ──────────────────────────────────────────────────────────────
const ComponentsButtons = () => (
  <Preview eyebrow="Components" title="Buttons"
    description="Lime primary for the single most important action per surface. Secondary for safe actions, ghost for cancel/back, danger for destructive.">
    <style>{`
      .pv-btn { display:inline-flex; align-items:center; gap:8px; font-family:var(--font-sans); font-size:14px; font-weight:600; line-height:1; padding:10px 16px; border-radius:10px; border:1px solid transparent; cursor:pointer; transition:background 120ms, box-shadow 120ms, transform 120ms; letter-spacing:-0.005em; }
      .pv-btn-primary { background:var(--brand-lime); color:var(--brand-ink); border-color:var(--brand-lime-600); box-shadow: 0 1px 0 rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.25); }
      .pv-btn-primary:hover { background:var(--brand-lime-600); }
      .pv-btn-secondary { background:#fff; color:var(--fg-1); border-color:var(--border-default); box-shadow: var(--shadow-xs); }
      .pv-btn-ghost { background:transparent; color:var(--fg-2); }
      .pv-btn-danger { background:var(--danger); color:#fff; border-color:#A82C24; }
      .pv-btn-sm { padding:7px 12px; font-size:13px; border-radius:8px; }
      .pv-btn-lg { padding:13px 20px; font-size:15px; border-radius:12px; }
      .pv-btn-hover { background:var(--brand-lime-600) !important; }
      .pv-btn-focus { box-shadow: 0 0 0 3px rgba(187,203,68,0.35); }
      .pv-row-label { font-family:var(--font-mono); font-size:11px; color:var(--fg-3); width:84px; }
    `}</style>
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
      <span className="pv-row-label">primary</span>
      <button className="pv-btn pv-btn-primary">Send payout</button>
      <button className="pv-btn pv-btn-primary pv-btn-hover">Hover</button>
      <button className="pv-btn pv-btn-primary pv-btn-focus">Focused</button>
      <button className="pv-btn pv-btn-primary" disabled style={{ opacity: 0.45, cursor: 'not-allowed' }}>Disabled</button>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
      <span className="pv-row-label">variants</span>
      <button className="pv-btn pv-btn-secondary">Export CSV</button>
      <button className="pv-btn pv-btn-ghost">Cancel</button>
      <button className="pv-btn pv-btn-danger">Refund</button>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
      <span className="pv-row-label">sizes</span>
      <button className="pv-btn pv-btn-primary pv-btn-sm">Small</button>
      <button className="pv-btn pv-btn-primary">Default</button>
      <button className="pv-btn pv-btn-primary pv-btn-lg">Large</button>
    </div>
  </Preview>
);

// ─── Inputs ───────────────────────────────────────────────────────────────
const ComponentsInputs = () => (
  <Preview eyebrow="Components" title="Form inputs"
    description="10px radius, hairline borders, inset shadow for Stripe-like depth, lime focus ring at 35% alpha.">
    <style>{`
      .pv-field { display:flex; flex-direction:column; gap:6px; }
      .pv-label { font-size:13px; font-weight:600; color:var(--fg-1); }
      .pv-input { font-family:var(--font-sans); font-size:14px; color:var(--fg-1); padding:10px 12px; border:1px solid var(--border-default); border-radius:10px; background:#fff; box-shadow: inset 0 1px 2px rgba(14,17,16,0.04); transition: border-color 120ms, box-shadow 120ms; }
      .pv-input:focus { outline:none; border-color:var(--brand-lime-600); box-shadow: inset 0 1px 2px rgba(14,17,16,0.04), 0 0 0 3px rgba(187,203,68,0.32); }
      .pv-input.is-error { border-color:#C8362D; box-shadow: 0 0 0 3px rgba(200,54,45,0.18); }
      .pv-help { font-size:12px; color:var(--fg-3); }
      .pv-help.err { color:#C8362D; }
      .pv-input-prefix { display:flex; align-items:center; border:1px solid var(--border-default); border-radius:10px; background:#fff; overflow:hidden; box-shadow: inset 0 1px 2px rgba(14,17,16,0.04); }
      .pv-input-prefix > span { padding:0 10px; color:var(--fg-3); border-right:1px solid var(--border-default); background:var(--neutral-25); height:38px; display:flex; align-items:center; font-variant-numeric: tabular-nums; font-family:var(--font-mono); font-size:13px; }
      .pv-input-prefix > input { border:0; padding:10px 12px; flex:1; font-family:var(--font-sans); font-size:14px; outline:none; background:transparent; font-variant-numeric:tabular-nums; min-width:0; }
    `}</style>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 18 }}>
      <div className="pv-field">
        <label className="pv-label">Business name</label>
        <input className="pv-input" defaultValue="Northwind Trading Co." />
        <div className="pv-help">Shown to recipients on transfers.</div>
      </div>
      <div className="pv-field">
        <label className="pv-label">Email</label>
        <input className="pv-input is-error" defaultValue="ops@northwind" />
        <div className="pv-help err">Enter a valid email address.</div>
      </div>
      <div className="pv-field">
        <label className="pv-label">Amount</label>
        <div className="pv-input-prefix"><span>CFA</span><input defaultValue="48.210" /></div>
      </div>
      <div className="pv-field">
        <label className="pv-label">Reference (optional)</label>
        <input className="pv-input" placeholder="INV-2031" />
      </div>
    </div>
  </Preview>
);

// ─── Badges ───────────────────────────────────────────────────────────────
const ComponentsBadges = () => (
  <Preview eyebrow="Components" title="Badges & status pills"
    description="Six tones (success / warning / danger / info / neutral / brand). Use sparingly: one status per row.">
    <style>{`
      .pv-badge { display:inline-flex; align-items:center; gap:6px; font-size:12px; font-weight:600; padding:3px 10px 3px 8px; border-radius:999px; border:1px solid transparent; line-height:1.4; }
      .pv-badge .dot { width:6px; height:6px; border-radius:50%; }
      .pv-badge-success { background:#E6F4EA; color:#1F6E3A; border-color:#BFE0CB; }
      .pv-badge-warning { background:#FCF3DD; color:#8E5F0F; border-color:#ECD7A0; }
      .pv-badge-danger  { background:#FBE7E5; color:#9F271E; border-color:#EFBEB9; }
      .pv-badge-info    { background:#E5EFF9; color:#1E4F86; border-color:#BCD3EC; }
      .pv-badge-neutral { background:var(--neutral-50); color:var(--fg-2); border-color:var(--border-default); }
      .pv-badge-brand   { background:#F2F6D6; color:#5E6A1A; border-color:#E4ECAA; }
      .pv-chip { display:inline-flex; align-items:center; gap:6px; font-size:12.5px; padding:5px 10px; background:#fff; border:1px solid var(--border-default); border-radius:999px; color:var(--fg-1); cursor:pointer; }
      .pv-chip-active { background:var(--brand-ink); border-color:var(--brand-ink); color:#F4F4F1; }
    `}</style>
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
      <span className="pv-badge pv-badge-success"><span className="dot" style={{ background:'#2F8F4F' }}></span>Paid</span>
      <span className="pv-badge pv-badge-warning"><span className="dot" style={{ background:'#C2841A' }}></span>Pending</span>
      <span className="pv-badge pv-badge-info"><span className="dot" style={{ background:'#2C6DB5' }}></span>Scheduled</span>
      <span className="pv-badge pv-badge-danger"><span className="dot" style={{ background:'#C8362D' }}></span>Failed</span>
      <span className="pv-badge pv-badge-neutral">Draft</span>
      <span className="pv-badge pv-badge-brand">New</span>
    </div>
    <div className="if-eyebrow" style={{ marginTop: 6 }}>Filter chips</div>
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <span className="pv-chip pv-chip-active">All <span style={{ color:'#BBCB44', fontVariantNumeric:'tabular-nums' }}>128</span></span>
      <span className="pv-chip">Paid <span className="if-num-tabular" style={{ color:'var(--fg-3)' }}>94</span></span>
      <span className="pv-chip">Pending <span className="if-num-tabular" style={{ color:'var(--fg-3)' }}>22</span></span>
      <span className="pv-chip">Failed <span className="if-num-tabular" style={{ color:'var(--fg-3)' }}>12</span></span>
    </div>
  </Preview>
);

// ─── Stat / KPI ───────────────────────────────────────────────────────────
const ComponentsStat = () => (
  <Preview eyebrow="Components" title="Stat / KPI card"
    description="Used on dashboards. Tabular numerals, tight negative tracking, delta in success or danger tone.">
    <div style={{ background: 'var(--neutral-25)', padding: 18, borderRadius: 12, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
      {[
        { label: 'Volume · 30d',       value: '1.240.000 CFA', delta: '↑ 12.4%',  tone: 'up' },
        { label: 'Successful payouts', value: '3.182',         delta: '↑ 4.1%',   tone: 'up' },
        { label: 'Failure rate',       value: '0.42%',         delta: '↑ 0.08pp', tone: 'down' },
      ].map(k => (
        <div key={k.label} style={{ background: '#fff', border: '1px solid var(--border-subtle)', borderRadius: 14, padding: 16, display: 'flex', flexDirection: 'column', gap: 6, boxShadow: 'var(--shadow-xs)' }}>
          <div className="if-caption" style={{ color: 'var(--fg-3)' }}>{k.label}</div>
          <div className="if-num-tabular" style={{ fontSize: 26, fontWeight: 700, color: 'var(--fg-1)', letterSpacing: '-0.018em' }}>{k.value}</div>
          <div style={{ fontSize: 12, color: k.tone === 'up' ? '#1F6E3A' : '#9F271E', display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontWeight: 700 }}>{k.delta}</span>
            <span style={{ color: 'var(--fg-3)', fontWeight: 400 }}>vs prev.</span>
          </div>
        </div>
      ))}
    </div>
  </Preview>
);

// ─── Table · simple ──────────────────────────────────────────────────────
const ComponentsTableSimple = () => {
  const rows = [
    { initials: 'NT', name: 'Northwind Trading', initialsBg: '#F2F6D6', initialsFg: '#5E6A1A', ref: 'INV-2031', status: 'Paid',    dot: '#2F8F4F', bg: '#E6F4EA', border: '#BFE0CB', fg: '#1F6E3A', amount: '48.210 CFA' },
    { initials: 'AC', name: 'Atlas Corp.',       initialsBg: '#FCF3DD', initialsFg: '#8E5F0F', ref: 'INV-2030', status: 'Pending', dot: '#C2841A', bg: '#FCF3DD', border: '#ECD7A0', fg: '#8E5F0F', amount: '1.180 CFA', shaded: true },
    { initials: 'VG', name: 'Vega Labs',         initialsBg: '#FBE7E5', initialsFg: '#9F271E', ref: 'INV-2028', status: 'Failed',  dot: '#C8362D', bg: '#FBE7E5', border: '#EFBEB9', fg: '#9F271E', amount: '312 CFA' },
  ];
  return (
    <Preview eyebrow="Components · Tables" title="Table — simple"
      description="The basic transactions row. Used in dashboards, summaries, and dense ledgers.">
      <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 0.9fr 0.9fr 60px', padding: '10px 20px', background: 'var(--neutral-25)', color: 'var(--fg-3)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
          <div>Counterparty</div><div>Reference</div><div>Status</div><div style={{ textAlign: 'right' }}>Amount</div><div></div>
        </div>
        {rows.map((r, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 0.9fr 0.9fr 60px', padding: '14px 20px', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', fontSize: 14, color: 'var(--fg-1)', background: r.shaded ? 'var(--neutral-25)' : 'transparent' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: r.initialsBg, color: r.initialsFg, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>{r.initials}</div>
              <span>{r.name}</span>
            </div>
            <div className="if-mono" style={{ color: 'var(--fg-3)', fontSize: 12.5 }}>{r.ref}</div>
            <div>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600, padding: '2px 10px', borderRadius: 999, background: r.bg, color: r.fg, border: `1px solid ${r.border}` }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: r.dot }}></span>{r.status}
              </span>
            </div>
            <div className="if-num-tabular" style={{ textAlign: 'right', fontWeight: 600 }}>{r.amount}</div>
            <div style={{ textAlign: 'right', color: 'var(--fg-4)' }}>⋯</div>
          </div>
        ))}
      </div>
    </Preview>
  );
};

// ─── Table · advanced (Payouts) ──────────────────────────────────────────
// Reuses Avatar / Btn / Badge / TxStatus / Money / Icon from web_app/components.jsx
const PV_PAYOUTS = [
  { id: 'p1', name: 'Northwind Trading', tone:'brand',   ref:'INV-2031', status:'paid',      amount: 48210.00, date:'Nov 11', method:'ACH',  from:'Chase ••4218', to:'Wells Fargo ••9302', initiated:'Nov 11 · 10:02 AM', settled:'Nov 11 · 11:31 AM', memo:'Q4 services — milestone 2 of 4.' },
  { id: 'p2', name: 'Atlas Corp.',       tone:'warning', ref:'INV-2030', status:'pending',   amount:  1180.55, date:'Nov 11', method:'Wire', from:'Chase ••4218', to:'BofA ••1140',         initiated:'Nov 11 · 08:14 AM', settled:'Expected Nov 12',     memo:'November retainer.' },
  { id: 'p3', name: 'Helios Studio',     tone:'info',    ref:'INV-2029', status:'scheduled', amount:  6420.00, date:'Nov 14', method:'ACH',  from:'Chase ••4218', to:'Mercury ••2204',       initiated:'Scheduled Nov 14',  settled:'Expected Nov 14',     memo:'Design sprint — November.' },
  { id: 'p4', name: 'Vega Labs',         tone:'danger',  ref:'INV-2028', status:'failed',    amount:   312.00, date:'Nov 10', method:'ACH',  from:'Chase ••4218', to:'Wells Fargo ••5512',  initiated:'Nov 10 · 09:31 AM', settled:'Returned R03',        memo:'API usage — Oct.' },
  { id: 'p5', name: 'Meridian Co.',      tone:'brand',   ref:'INV-2027', status:'paid',      amount: 12500.00, date:'Nov 10', method:'Wire', from:'Chase ••4218', to:'Citi ••7711',         initiated:'Nov 10 · 09:02 AM', settled:'Nov 10 · 09:48 AM',   memo:'Equipment lease — Q4.' },
  { id: 'p6', name: 'Stratus Inc.',      tone:'info',    ref:'INV-2026', status:'scheduled', amount:  4290.00, date:'Nov 13', method:'ACH',  from:'Chase ••4218', to:'Chase ••8804',         initiated:'Scheduled Nov 13',  settled:'Expected Nov 13',     memo:'Cloud services — Oct.' },
];
const PV_TIMELINE = { paid: [1,1,1,1], pending: [1,1,1,0], scheduled: [1,1,0,0], failed: [1,1,1,0], draft: [1,0,0,0] };
const pvFmt = (n) => Math.round(Math.abs(n)).toLocaleString('en-US').replace(/,/g, '.');

const PVRowDetail = ({ tx }) => {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  const steps = ['Created', 'Reviewed', 'Submitted', tx.status === 'paid' ? 'Settled' : (tx.status === 'failed' ? 'Returned' : 'Settling')];
  const done = PV_TIMELINE[tx.status] || [1,0,0,0];
  return (
    <div className="detail-pane">
      <div className="group">
        <div className="group-title">Transfer</div>
        <div className="kv"><span className="k">Reference</span><span className="v mono">{tx.ref}</span></div>
        <div className="kv"><span className="k">Method</span><span className="v">{tx.method}</span></div>
        <div className="kv"><span className="k">From</span><span className="v">{tx.from}</span></div>
        <div className="kv"><span className="k">To</span><span className="v">{tx.to}</span></div>
        <div className="kv"><span className="k">Fee</span><span className="v">0 CFA</span></div>
        <div className="kv"><span className="k">Memo</span><span className="v" style={{ fontWeight: 400, color:'var(--fg-2)', textAlign:'right', maxWidth: 180, fontVariantNumeric:'normal' }}>{tx.memo}</span></div>
      </div>
      <div className="group">
        <div className="group-title">Timeline</div>
        <div className="mini-tl">
          {steps.map((s, i) => (
            <div key={i} className={`step ${done[i] ? 'done' : ''}`}>
              <div className="dot">{done[i] ? <Icon name="check" /> : null}</div>
              <span className="label">{s}</span>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 12, color:'var(--fg-3)', marginTop: 6 }}>
          <div>Initiated · <span style={{ color:'var(--fg-1)', fontWeight: 500 }}>{tx.initiated}</span></div>
          <div style={{ marginTop: 2 }}>Settled · <span style={{ color: tx.status === 'failed' ? '#9F271E' : 'var(--fg-1)', fontWeight: 500 }}>{tx.settled}</span></div>
        </div>
      </div>
      <div className="group">
        <div className="group-title">Actions</div>
        <div className="detail-actions">
          <Btn variant="primary" icon="arrow-right">Full details</Btn>
          <Btn variant="secondary" icon="download">Receipt</Btn>
          {tx.status === 'failed'    && <Btn variant="secondary" icon="rotate-cw">Retry</Btn>}
          {tx.status === 'scheduled' && <Btn variant="ghost" icon="x">Cancel</Btn>}
          <Btn variant="ghost" icon="copy">Duplicate</Btn>
        </div>
        {tx.status === 'failed' && (
          <div style={{ marginTop: 10, padding: 10, background:'#FBE7E5', border:'1px solid #EFBEB9', borderRadius: 8, fontSize: 12, color:'#9F271E', lineHeight: 1.4 }}>
            <strong>R03 · No account / unable to locate.</strong> Verify the recipient account number and retry.
          </div>
        )}
      </div>
    </div>
  );
};

const ComponentsTablePayouts = () => {
  const [filter, setFilter] = React.useState('all');
  const [selected, setSelected] = React.useState(new Set());
  const [expanded, setExpanded] = React.useState(new Set(['p1']));

  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });

  const filtered = filter === 'all' ? PV_PAYOUTS : PV_PAYOUTS.filter(p => p.status === filter);
  const counts = {
    all: PV_PAYOUTS.length,
    paid: PV_PAYOUTS.filter(p => p.status === 'paid').length,
    pending: PV_PAYOUTS.filter(p => p.status === 'pending').length,
    scheduled: PV_PAYOUTS.filter(p => p.status === 'scheduled').length,
    failed: PV_PAYOUTS.filter(p => p.status === 'failed').length,
  };
  const toggleSelect = (id) => { const n = new Set(selected); n.has(id) ? n.delete(id) : n.add(id); setSelected(n); };
  const toggleExpand = (id) => { const n = new Set(expanded); n.has(id) ? n.delete(id) : n.add(id); setExpanded(n); };
  const totalSelected = [...selected].reduce((s, id) => s + (PV_PAYOUTS.find(t => t.id === id)?.amount || 0), 0);

  return (
    <Preview eyebrow="Components · Tables" title="Table — advanced (Payouts)"
      description="Expandable rows with inline detail pane (Transfer / Timeline / Actions), bulk-select toolbar, status filter chips, and a footer with pagination.">
      <div className="card-surf" style={{ overflow: 'hidden' }}>
        <div className="toolbar">
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {['all','paid','pending','scheduled','failed'].map(k => (
              <span key={k} className={`chip ${filter === k ? 'active' : ''}`} onClick={() => setFilter(k)}>
                {k[0].toUpperCase() + k.slice(1)} <span className="count">{counts[k]}</span>
              </span>
            ))}
          </div>
          <div className="grow"></div>
          <Btn variant="ghost" icon={expanded.size === filtered.length ? 'chevrons-down-up' : 'chevrons-up-down'}
            onClick={() => expanded.size === filtered.length ? setExpanded(new Set()) : setExpanded(new Set(filtered.map(f => f.id)))}>
            {expanded.size === filtered.length ? 'Collapse all' : 'Expand all'}
          </Btn>
          <Btn variant="ghost" icon="filter">Filters</Btn>
          <Btn variant="ghost" icon="arrow-up-down">Sort</Btn>
        </div>

        {selected.size > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 20px', background: 'rgba(187,203,68,0.10)', borderBottom: '1px solid var(--border-subtle)', fontSize: 13 }}>
            <span style={{ color: 'var(--fg-1)', fontWeight: 600 }}>{selected.size} selected · <span className="if-num-tabular">{pvFmt(totalSelected)} CFA</span></span>
            <div style={{ flex: 1 }}></div>
            <Btn variant="secondary" icon="send">Send now</Btn>
            <Btn variant="ghost" icon="x" onClick={() => setSelected(new Set())}>Clear</Btn>
          </div>
        )}

        <div className="dlist">
          <div className="dlist-head">
            <div></div>
            <div><input type="checkbox" checked={selected.size === filtered.length && filtered.length > 0}
              onChange={(e) => setSelected(e.target.checked ? new Set(filtered.map(f => f.id)) : new Set())} /></div>
            <div>Counterparty</div><div>Reference</div><div>Method</div><div>Status</div><div>Date</div><div>Amount</div>
          </div>
          {filtered.map(t => {
            const isOpen = expanded.has(t.id);
            const isSel = selected.has(t.id);
            return (
              <React.Fragment key={t.id}>
                <div className={`dlist-row ${isSel ? 'is-selected' : ''} ${isOpen ? 'is-expanded' : ''}`} onClick={() => toggleExpand(t.id)}>
                  <div>
                    <button className={`chev-btn ${isOpen ? 'open' : ''}`} aria-expanded={isOpen} onClick={(e) => { e.stopPropagation(); toggleExpand(t.id); }}>
                      <Icon name={isOpen ? 'minus' : 'plus'} />
                    </button>
                  </div>
                  <div onClick={(e) => e.stopPropagation()}>
                    <input type="checkbox" checked={isSel} onChange={() => toggleSelect(t.id)} />
                  </div>
                  <div><div className="row-name"><Avatar name={t.name} tone={t.tone} /><span>{t.name}</span></div></div>
                  <div className="ref">{t.ref}</div>
                  <div className="meth">{t.method}</div>
                  <div><TxStatus status={t.status} /></div>
                  <div className="date">{t.date}</div>
                  <div className="num"><Money amount={t.amount} /></div>
                </div>
                {isOpen && <div className="dlist-detail"><PVRowDetail tx={t} /></div>}
              </React.Fragment>
            );
          })}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', fontSize: 12, color: 'var(--fg-3)', borderTop: '1px solid var(--border-subtle)' }}>
          <span>Showing {filtered.length} of {PV_PAYOUTS.length}{expanded.size > 0 ? ` · ${expanded.size} expanded` : ''}{selected.size > 0 ? ` · ${selected.size} selected` : ''}</span>
          <div style={{ display: 'flex', gap: 6 }}>
            <button className="icon-btn" disabled style={{ opacity: 0.4 }}><Icon name="chevron-left" /></button>
            <button className="icon-btn"><Icon name="chevron-right" /></button>
          </div>
        </div>
      </div>
    </Preview>
  );
};

Object.assign(window, {
  ComponentsButtons, ComponentsInputs, ComponentsBadges,
  ComponentsStat, ComponentsTableSimple, ComponentsTablePayouts,
});
