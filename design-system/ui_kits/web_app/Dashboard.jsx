// Dashboard screen — KPIs, chart placeholder, recent activity
const fmt = (n) => Math.round(Math.abs(n)).toLocaleString('en-US').replace(/,/g, '.');

const Sparkline = ({ values, color = '#BBCB44', height = 60, fill = true }) => {
  const w = 220, h = height, pad = 4;
  const max = Math.max(...values), min = Math.min(...values);
  const xs = values.map((_, i) => pad + (i * (w - pad * 2)) / (values.length - 1));
  const ys = values.map(v => pad + (h - pad * 2) * (1 - (v - min) / (max - min || 1)));
  const path = values.map((_, i) => `${i === 0 ? 'M' : 'L'} ${xs[i].toFixed(1)} ${ys[i].toFixed(1)}`).join(' ');
  const area = `${path} L ${xs[xs.length - 1].toFixed(1)} ${h - pad} L ${pad} ${h - pad} Z`;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      {fill && <path d={area} fill={color} opacity="0.14" />}
      <path d={path} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const BarChart = () => {
  // Simple weekly volume bar chart
  const data = [
    { day: 'Mon', value: 142 }, { day: 'Tue', value: 188 }, { day: 'Wed', value: 164 },
    { day: 'Thu', value: 211 }, { day: 'Fri', value: 248 }, { day: 'Sat', value: 86 },
    { day: 'Sun', value: 64 }
  ];
  const max = Math.max(...data.map(d => d.value));
  const CHART_H = 150; // px for the bar area; labels sit underneath
  return (
    <div style={{ display:'flex', alignItems:'flex-end', gap:18, padding: '8px 4px 0' }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}>
          <div style={{ height: CHART_H, width:'100%', display:'flex', alignItems:'flex-end', justifyContent:'center' }}>
            <div style={{
              width:'70%',
              height: Math.round((d.value / max) * CHART_H),
              background: i === 4 ? 'var(--brand-lime)' : 'var(--neutral-200)',
              borderRadius: '6px 6px 2px 2px',
              transition: 'background 200ms',
            }} title={`${d.value}k CFA`} />
          </div>
          <div style={{ fontSize: 11, color: 'var(--fg-3)', fontWeight: 500 }}>{d.day}</div>
        </div>
      ))}
    </div>
  );
};

const RECENT_TX = [
  { id: 'INV-2031', name: 'Northwind Trading', tone: 'brand',   ref: 'INV-2031', status: 'paid',      amount: 48210.00, when: '12 min ago' },
  { id: 'INV-2030', name: 'Atlas Corp.',       tone: 'warning', ref: 'INV-2030', status: 'pending',   amount:  1180.55, when: '1 hr ago' },
  { id: 'INV-2029', name: 'Helios Studio',     tone: 'info',    ref: 'INV-2029', status: 'scheduled', amount:  6420.00, when: '3 hr ago' },
  { id: 'INV-2028', name: 'Vega Labs',         tone: 'danger',  ref: 'INV-2028', status: 'failed',    amount:   312.00, when: '5 hr ago' },
  { id: 'INV-2027', name: 'Meridian Co.',      tone: 'brand',   ref: 'INV-2027', status: 'paid',      amount: 12500.00, when: 'Yesterday' },
];

const Dashboard = ({ onSelectTx, onGoToPayouts }) => {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Good afternoon, Jordan.</h1>
          <div className="page-sub">Here's how Northwind moved money this month.</div>
        </div>
        <div style={{ display:'flex', gap:8, flexShrink:0 }}>
          <Btn variant="secondary" icon="calendar"><span style={{ whiteSpace:'nowrap' }}>Last 30d</span></Btn>
          <Btn variant="primary" icon="arrow-up-right" onClick={onGoToPayouts}><span style={{ whiteSpace:'nowrap' }}>New payout</span></Btn>
        </div>
      </div>

      <div className="kpi-grid" style={{ marginBottom: 20 }}>
        <Kpi label="Volume · 30d" value="1.240.000 CFA" deltaPct="+12.4%" direction="up" />
        <Kpi label="Payouts sent" value="3.182" deltaPct="+4.1%" direction="up" />
        <Kpi label="Failure rate" value="0.42%" deltaPct="+0.08pp" direction="down" />
        <Kpi label="Available balance" value="284.910 CFA" deltaPct="−48.000 CFA" direction="down" />
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1.6fr 1fr', gap: 20, marginBottom: 20 }}>
        <div className="card-surf" style={{ padding: 20 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 4 }}>
            <div>
              <div style={{ fontSize: 12, color:'var(--fg-3)', textTransform:'uppercase', letterSpacing:'0.08em', fontWeight: 600 }}>Payout volume</div>
              <div style={{ fontSize: 22, fontWeight: 700, color:'var(--fg-1)', letterSpacing:'-0.014em', fontVariantNumeric:'tabular-nums', marginTop: 4 }}>1.103.247 CFA <span style={{ fontSize: 13, color:'#1F6E3A', fontWeight: 600, marginLeft: 8 }}>↑ 12.4%</span></div>
            </div>
            <div style={{ display:'flex', gap:6 }}>
              <span className="chip active">Week</span>
              <span className="chip">Month</span>
              <span className="chip">Quarter</span>
            </div>
          </div>
          <BarChart />
        </div>
        <div className="card-surf" style={{ padding: 20, display:'flex', flexDirection:'column', gap: 14 }}>
          <div style={{ fontSize: 12, color:'var(--fg-3)', textTransform:'uppercase', letterSpacing:'0.08em', fontWeight: 600 }}>Balance trend</div>
          <Sparkline values={[280, 305, 290, 320, 310, 340, 332, 360, 345, 350, 330, 320, 285]} height={100} />
          <div style={{ display:'flex', justifyContent:'space-between', fontSize: 12, color:'var(--fg-3)' }}>
            <span>Oct 12</span><span>Nov 11</span>
          </div>
          <div style={{ borderTop:'1px solid var(--border-subtle)', paddingTop: 12, display:'flex', gap: 14, fontSize: 13 }}>
            <div style={{ flex:1 }}>
              <div style={{ color:'var(--fg-3)', fontSize: 11, textTransform:'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>Inflows</div>
              <div style={{ fontWeight: 700, color:'var(--fg-1)', fontVariantNumeric:'tabular-nums', fontSize: 16, marginTop: 2 }}>412.008 CFA</div>
            </div>
            <div style={{ flex:1 }}>
              <div style={{ color:'var(--fg-3)', fontSize: 11, textTransform:'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>Outflows</div>
              <div style={{ fontWeight: 700, color:'var(--fg-1)', fontVariantNumeric:'tabular-nums', fontSize: 16, marginTop: 2 }}>498.420 CFA</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card-surf">
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'18px 20px', borderBottom:'1px solid var(--border-subtle)' }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 600, color:'var(--fg-1)' }}>Recent activity</div>
            <div style={{ fontSize: 12, color:'var(--fg-3)', marginTop: 2 }}>Last 24 hours · 5 transactions</div>
          </div>
          <Btn variant="ghost" onClick={onGoToPayouts}><span style={{ whiteSpace:'nowrap' }}>View all payouts</span><Icon name="arrow-right" /></Btn>
        </div>
        <table className="tbl">
          <thead><tr>
            <th>Counterparty</th><th>Reference</th><th>Status</th><th>When</th><th style={{ textAlign:'right' }}>Amount</th>
          </tr></thead>
          <tbody>
            {RECENT_TX.map(t => (
              <tr key={t.id} onClick={() => onSelectTx(t)} style={{ cursor:'pointer' }}>
                <td><div className="row-name"><Avatar name={t.name} tone={t.tone} />{t.name}</div></td>
                <td className="ref">{t.ref}</td>
                <td><TxStatus status={t.status} /></td>
                <td style={{ color:'var(--fg-3)', fontSize: 13 }}>{t.when}</td>
                <td className="num"><Money amount={t.amount} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

window.Dashboard = Dashboard;
window.RECENT_TX = RECENT_TX;
