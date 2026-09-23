// Recipients — counterparties you pay (vendors, contractors, partners)
const RECIPIENTS = [
  { id: 'r1', name: 'Northwind Trading',  tone: 'brand',   country: 'United States',     currency: 'USD', type: 'Business', accounts: 2, lastPaid: 'Nov 11', volume: 248120.00, status: 'active' },
  { id: 'r2', name: 'Atlas Corp.',         tone: 'warning', country: 'Canada',            currency: 'CAD', type: 'Business', accounts: 1, lastPaid: 'Nov 09', volume:  82400.00, status: 'active' },
  { id: 'r3', name: 'Helios Studio',       tone: 'info',    country: 'United Kingdom',    currency: 'GBP', type: 'Business', accounts: 1, lastPaid: 'Nov 08', volume:  42800.00, status: 'active' },
  { id: 'r4', name: 'Mei Chen',            tone: 'neutral', country: 'Singapore',         currency: 'SGD', type: 'Individual', accounts: 1, lastPaid: 'Nov 06', volume:  14200.00, status: 'active' },
  { id: 'r5', name: 'Vega Labs',           tone: 'danger',  country: 'United States',     currency: 'USD', type: 'Business', accounts: 1, lastPaid: 'Nov 02', volume:   8400.00, status: 'review' },
  { id: 'r6', name: 'Pellican Coffee',     tone: 'success', country: 'Netherlands',       currency: 'EUR', type: 'Business', accounts: 2, lastPaid: 'Oct 28', volume:  32100.00, status: 'active' },
  { id: 'r7', name: 'Quartz Robotics',     tone: 'brand',   country: 'Germany',           currency: 'EUR', type: 'Business', accounts: 1, lastPaid: 'Oct 24', volume:  61400.00, status: 'active' },
  { id: 'r8', name: 'Sora Tanaka',         tone: 'info',    country: 'Japan',             currency: 'JPY', type: 'Individual', accounts: 1, lastPaid: 'Oct 22', volume:   4200.00, status: 'active' },
];

const statusToBadge = (s) => s === 'active'
  ? <span className="badge badge-success"><span className="dot" style={{ background:'#2F8F4F' }}></span>Active</span>
  : <span className="badge badge-warning"><span className="dot" style={{ background:'#C2841A' }}></span>In review</span>;

const Recipients = () => {
  const [selected, setSelected] = React.useState(RECIPIENTS[0].id);
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  const sel = RECIPIENTS.find(r => r.id === selected) || RECIPIENTS[0];

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Recipients</h1>
          <div className="page-sub">People and businesses you've paid. 8 active · 1 in review.</div>
        </div>
        <div style={{ display:'flex', gap:8, flexShrink:0 }}>
          <Btn variant="secondary" icon="upload"><span style={{ whiteSpace:'nowrap' }}>Import CSV</span></Btn>
          <Btn variant="primary" icon="user-plus"><span style={{ whiteSpace:'nowrap' }}>Add recipient</span></Btn>
        </div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1.6fr 1fr', gap: 20 }}>
        <div className="card-surf">
          <div className="toolbar">
            <div className="topbar-search" style={{ flex:1, maxWidth:280 }}>
              <Icon name="search" />
              <input placeholder="Search recipients…" />
            </div>
            <div className="grow"></div>
            <Btn variant="secondary" icon="filter"><span style={{ whiteSpace:'nowrap' }}>Filter</span></Btn>
          </div>
          <table className="tbl">
            <thead><tr>
              <th>Recipient</th><th>Country</th><th>Currency</th><th>Status</th><th style={{ textAlign:'right' }}>Volume</th>
            </tr></thead>
            <tbody>
              {RECIPIENTS.map(r => (
                <tr key={r.id} onClick={() => setSelected(r.id)} className={selected === r.id ? 'is-selected' : ''} style={{ cursor:'pointer' }}>
                  <td><div className="row-name"><Avatar name={r.name} tone={r.tone} /><div style={{ display:'flex', flexDirection:'column' }}><span>{r.name}</span><span style={{ fontSize:11, color:'var(--fg-3)' }}>{r.type} · {r.accounts} {r.accounts === 1 ? 'account' : 'accounts'}</span></div></div></td>
                  <td style={{ color:'var(--fg-2)', fontSize: 13 }}>{r.country}</td>
                  <td className="ref">{r.currency}</td>
                  <td>{statusToBadge(r.status)}</td>
                  <td className="num"><Money amount={r.volume} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recipient detail panel */}
        <div className="card-surf" style={{ padding: 24, height:'fit-content', position:'sticky', top: 80 }}>
          <div style={{ display:'flex', alignItems:'center', gap: 14, marginBottom: 18 }}>
            <div style={{ width:56, height:56, borderRadius:'50%', background:'#F2F6D6', color:'#5E6A1A', fontWeight:800, fontSize: 19, display:'flex', alignItems:'center', justifyContent:'center', border:'1px solid #E4ECAA' }}>
              {sel.name.split(' ').map(s => s[0]).slice(0,2).join('').toUpperCase()}
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize: 17, fontWeight: 700, color:'var(--fg-1)' }}>{sel.name}</div>
              <div style={{ fontSize: 12, color:'var(--fg-3)', marginTop: 2 }}>{sel.type} · {sel.country}</div>
            </div>
            <button className="icon-btn"><Icon name="more-horizontal" /></button>
          </div>

          <div style={{ display:'flex', gap: 8, marginBottom: 18 }}>
            <Btn variant="primary" icon="arrow-up-right"><span style={{ whiteSpace:'nowrap' }}>Send payout</span></Btn>
            <Btn variant="secondary" icon="pencil"><span style={{ whiteSpace:'nowrap' }}>Edit</span></Btn>
          </div>

          <div style={{ borderTop:'1px solid var(--border-subtle)', paddingTop: 14 }}>
            <div className="detail-row"><span className="k">Currency</span><span className="v">{sel.currency}</span></div>
            <div className="detail-row"><span className="k">Bank accounts</span><span className="v">{sel.accounts}</span></div>
            <div className="detail-row"><span className="k">Last paid</span><span className="v">{sel.lastPaid}, 2026</span></div>
            <div className="detail-row"><span className="k">Lifetime volume</span><span className="v"><Money amount={sel.volume * 4.2} /></span></div>
            <div className="detail-row"><span className="k">KYB status</span><span className="v">{sel.status === 'active' ? 'Verified' : 'Pending review'}</span></div>
          </div>

          <div style={{ marginTop: 18, padding: 14, background:'var(--neutral-25)', border:'1px solid var(--border-subtle)', borderRadius: 10, display:'flex', gap: 10 }}>
            <Icon name="shield-check" style={{ color:'#2F8F4F', flexShrink:0, marginTop:2 }} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color:'var(--fg-1)' }}>Verified counterparty</div>
              <div style={{ fontSize: 12, color:'var(--fg-3)', marginTop: 2, lineHeight: 1.5 }}>Bank ownership and identity confirmed. Payouts &lt; 15.000.000 CFA clear without manual review.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

window.Recipients = Recipients;
