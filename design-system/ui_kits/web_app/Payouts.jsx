// Payouts screen — accordion rows with inline quick-summary; full detail opens own page
const ALL_PAYOUTS = [
  { id: 'p1',  name: 'Northwind Trading', tone:'brand',   ref:'INV-2031', status:'paid',      amount: 48210.00, date:'Nov 11', method:'ACH',  from:'Chase ••4218', to:'Wells Fargo ••9302', initiated:'Nov 11 · 10:02 AM', settled:'Nov 11 · 11:31 AM', memo:'Q4 services — milestone 2 of 4. PO #NW-2026-Q4-114.' },
  { id: 'p2',  name: 'Atlas Corp.',       tone:'warning', ref:'INV-2030', status:'pending',   amount:  1180.55, date:'Nov 11', method:'Wire', from:'Chase ••4218', to:'BofA ••1140',         initiated:'Nov 11 · 08:14 AM', settled:'Expected Nov 12',     memo:'November retainer.' },
  { id: 'p3',  name: 'Helios Studio',     tone:'info',    ref:'INV-2029', status:'scheduled', amount:  6420.00, date:'Nov 14', method:'ACH',  from:'Chase ••4218', to:'Mercury ••2204',       initiated:'Scheduled Nov 14',  settled:'Expected Nov 14',     memo:'Design sprint — November.' },
  { id: 'p4',  name: 'Vega Labs',         tone:'danger',  ref:'INV-2028', status:'failed',    amount:   312.00, date:'Nov 10', method:'ACH',  from:'Chase ••4218', to:'Wells Fargo ••5512',  initiated:'Nov 10 · 09:31 AM', settled:'Returned R03',        memo:'API usage — Oct.' },
  { id: 'p5',  name: 'Meridian Co.',      tone:'brand',   ref:'INV-2027', status:'paid',      amount: 12500.00, date:'Nov 10', method:'Wire', from:'Chase ••4218', to:'Citi ••7711',         initiated:'Nov 10 · 09:02 AM', settled:'Nov 10 · 09:48 AM',   memo:'Equipment lease — Q4.' },
  { id: 'p6',  name: 'Stratus Inc.',      tone:'info',    ref:'INV-2026', status:'scheduled', amount:  4290.00, date:'Nov 13', method:'ACH',  from:'Chase ••4218', to:'Chase ••8804',         initiated:'Scheduled Nov 13',  settled:'Expected Nov 13',     memo:'Cloud services — Oct.' },
  { id: 'p7',  name: 'Polaris Holdings',  tone:'brand',   ref:'INV-2025', status:'paid',      amount: 89400.00, date:'Nov 09', method:'Wire', from:'Chase ••4218', to:'JPM ••0021',           initiated:'Nov 09 · 02:11 PM', settled:'Nov 09 · 03:02 PM',   memo:'Acquisition advisory fee.' },
  { id: 'p8',  name: 'Beacon LLC',        tone:'warning', ref:'INV-2024', status:'pending',   amount:  2120.00, date:'Nov 09', method:'ACH',  from:'Chase ••4218', to:'Mercury ••8821',       initiated:'Nov 09 · 11:08 AM', settled:'Expected Nov 12',     memo:'Marketing partner — Oct.' },
  { id: 'p9',  name: 'Cascade Foods',     tone:'brand',   ref:'INV-2023', status:'paid',      amount: 18750.00, date:'Nov 08', method:'ACH',  from:'Chase ••4218', to:'PNC ••3340',           initiated:'Nov 08 · 09:00 AM', settled:'Nov 08 · 10:18 AM',   memo:'Distribution — week 45.' },
  { id: 'p10', name: 'Lattice Studio',    tone:'neutral', ref:'INV-2022', status:'draft',     amount:   850.00, date:'—',      method:'ACH',  from:'Chase ••4218', to:'Mercury ••0099',       initiated:'Not submitted',     settled:'—',                    memo:'Drafted — pending review.' },
];

const TIMELINE_BY_STATUS = {
  paid:      [1,1,1,1],
  pending:   [1,1,1,0],
  scheduled: [1,1,0,0],
  failed:    [1,1,1,0],
  draft:     [1,0,0,0],
};

const RowDetail = ({ tx, onOpenFull }) => {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  const steps = ['Created', 'Reviewed', 'Submitted', tx.status === 'paid' ? 'Settled' : (tx.status === 'failed' ? 'Returned' : 'Settling')];
  const done = TIMELINE_BY_STATUS[tx.status] || [1,0,0,0];
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
          <Btn variant="primary" icon="arrow-right" onClick={() => onOpenFull(tx)}>Full details</Btn>
          <Btn variant="secondary" icon="download">Receipt</Btn>
          {tx.status === 'failed' && <Btn variant="secondary" icon="rotate-cw">Retry</Btn>}
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

const Payouts = ({ onSelectTx }) => {
  const [filter, setFilter] = React.useState('all');
  const [selected, setSelected] = React.useState(new Set());
  const [expanded, setExpanded] = React.useState(new Set());

  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });

  const filtered = filter === 'all' ? ALL_PAYOUTS : ALL_PAYOUTS.filter(p => p.status === filter);

  const counts = {
    all: ALL_PAYOUTS.length,
    paid: ALL_PAYOUTS.filter(p => p.status === 'paid').length,
    pending: ALL_PAYOUTS.filter(p => p.status === 'pending').length,
    scheduled: ALL_PAYOUTS.filter(p => p.status === 'scheduled').length,
    failed: ALL_PAYOUTS.filter(p => p.status === 'failed').length,
  };

  const toggleSelect = (id) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id); else next.add(id);
    setSelected(next);
  };

  const toggleExpand = (id) => {
    const next = new Set(expanded);
    if (next.has(id)) next.delete(id); else next.add(id);
    setExpanded(next);
  };

  const expandAll = () => setExpanded(new Set(filtered.map(f => f.id)));
  const collapseAll = () => setExpanded(new Set());

  const totalSelected = [...selected].reduce((sum, id) => {
    const tx = ALL_PAYOUTS.find(t => t.id === id);
    return sum + (tx ? tx.amount : 0);
  }, 0);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Payouts</h1>
          <div className="page-sub">All outbound transfers from your operating balance.</div>
        </div>
        <div style={{ display:'flex', gap:8 }}>
          <Btn variant="secondary" icon="download">Export CSV</Btn>
          <Btn variant="primary" icon="plus">New payout</Btn>
        </div>
      </div>

      <div className="card-surf">
        <div className="toolbar">
          <div style={{ display:'flex', gap:6 }}>
            <span className={`chip ${filter==='all'?'active':''}`}     onClick={()=>setFilter('all')}>All <span className="count">{counts.all}</span></span>
            <span className={`chip ${filter==='paid'?'active':''}`}    onClick={()=>setFilter('paid')}>Paid <span className="count">{counts.paid}</span></span>
            <span className={`chip ${filter==='pending'?'active':''}`} onClick={()=>setFilter('pending')}>Pending <span className="count">{counts.pending}</span></span>
            <span className={`chip ${filter==='scheduled'?'active':''}`} onClick={()=>setFilter('scheduled')}>Scheduled <span className="count">{counts.scheduled}</span></span>
            <span className={`chip ${filter==='failed'?'active':''}`}  onClick={()=>setFilter('failed')}>Failed <span className="count">{counts.failed}</span></span>
          </div>
          <div className="grow"></div>
          <Btn variant="ghost" icon={expanded.size === filtered.length ? 'chevrons-down-up' : 'chevrons-up-down'} onClick={expanded.size === filtered.length ? collapseAll : expandAll}>
            {expanded.size === filtered.length ? 'Collapse all' : 'Expand all'}
          </Btn>
          <Btn variant="ghost" icon="filter">Filters</Btn>
          <Btn variant="ghost" icon="arrow-up-down">Sort</Btn>
        </div>

        {selected.size > 0 && (
          <div style={{ display:'flex', alignItems:'center', gap: 14, padding: '12px 20px', background:'rgba(187,203,68,0.10)', borderBottom: '1px solid var(--border-subtle)', fontSize: 13 }}>
            <span style={{ color:'var(--fg-1)', fontWeight: 600 }}>{selected.size} selected · <span className="if-num-tabular">{fmt(totalSelected)} CFA</span></span>
            <div style={{ flex: 1 }}></div>
            <Btn variant="secondary" icon="send">Send now</Btn>
            <Btn variant="ghost" icon="x" onClick={() => setSelected(new Set())}>Clear</Btn>
          </div>
        )}

        <div className="dlist">
          <div className="dlist-head">
            <div></div>
            <div><input type="checkbox"
              checked={selected.size === filtered.length && filtered.length > 0}
              onChange={(e) => setSelected(e.target.checked ? new Set(filtered.map(f => f.id)) : new Set())}
            /></div>
            <div>Counterparty</div><div>Reference</div><div>Method</div><div>Status</div><div>Date</div><div>Amount</div>
          </div>
          {filtered.map(t => {
            const isOpen = expanded.has(t.id);
            const isSel = selected.has(t.id);
            return (
              <React.Fragment key={t.id}>
                <div
                  className={`dlist-row ${isSel ? 'is-selected' : ''} ${isOpen ? 'is-expanded' : ''}`}
                  onClick={() => toggleExpand(t.id)}
                >
                  <div>
                    <button
                      className={`chev-btn ${isOpen ? 'open' : ''}`}
                      aria-expanded={isOpen}
                      onClick={(e) => { e.stopPropagation(); toggleExpand(t.id); }}
                    >
                      <Icon name={isOpen ? "minus" : "plus"} />
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
                {isOpen && (
                  <div className="dlist-detail">
                    <RowDetail tx={t} onOpenFull={onSelectTx} />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 20px', fontSize: 12, color:'var(--fg-3)' }}>
          <span>Showing {filtered.length} of {ALL_PAYOUTS.length}{expanded.size > 0 ? ` · ${expanded.size} expanded` : ''}</span>
          <div style={{ display:'flex', gap: 6 }}>
            <button className="icon-btn" disabled style={{ opacity: 0.4 }}><Icon name="chevron-left" /></button>
            <button className="icon-btn"><Icon name="chevron-right" /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

window.Payouts = Payouts;
window.ALL_PAYOUTS = ALL_PAYOUTS;
