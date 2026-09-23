// Collections — incoming money, invoices, customers paying you
const COLLECTIONS = [
  { id: 'C-9821', customer: 'Lumen Studios',     tone: 'brand',   ref: 'INV-9821', status: 'paid',      method: 'ACH',          amount: 18200.00, due: 'Nov 03' },
  { id: 'C-9820', customer: 'Boreal Logistics',  tone: 'info',    ref: 'INV-9820', status: 'pending',   method: 'Wire',         amount: 64850.00, due: 'Nov 12' },
  { id: 'C-9819', customer: 'Pellican Coffee',   tone: 'warning', ref: 'INV-9819', status: 'scheduled', method: 'ACH',          amount:  3420.50, due: 'Nov 14' },
  { id: 'C-9818', customer: 'Quartz Robotics',   tone: 'success', ref: 'INV-9818', status: 'paid',      method: 'Card',         amount: 12800.00, due: 'Nov 01' },
  { id: 'C-9817', customer: 'Atlas Corp.',       tone: 'neutral', ref: 'INV-9817', status: 'failed',    method: 'ACH',          amount:  4880.00, due: 'Oct 29' },
  { id: 'C-9816', customer: 'Helios Studio',     tone: 'info',    ref: 'INV-9816', status: 'paid',      method: 'Wire',         amount: 24000.00, due: 'Oct 28' },
  { id: 'C-9815', customer: 'Northwind Trading', tone: 'brand',   ref: 'INV-9815', status: 'paid',      method: 'ACH',          amount:  9180.20, due: 'Oct 25' },
  { id: 'C-9814', customer: 'Vega Labs',         tone: 'danger',  ref: 'INV-9814', status: 'pending',   method: 'Card',         amount:  1620.00, due: 'Oct 25' },
];

const Collections = ({ onSelectTx }) => {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Collections</h1>
          <div className="page-sub">Invoices and incoming transfers from your customers.</div>
        </div>
        <div style={{ display:'flex', gap:8, flexShrink:0 }}>
          <Btn variant="secondary" icon="download"><span style={{ whiteSpace:'nowrap' }}>Export</span></Btn>
          <Btn variant="primary" icon="plus"><span style={{ whiteSpace:'nowrap' }}>New invoice</span></Btn>
        </div>
      </div>

      <div className="kpi-grid" style={{ marginBottom: 20 }}>
        <Kpi label="Collected · 30d" value="486.210 CFA" deltaPct="+8.2%" direction="up" />
        <Kpi label="Outstanding" value="92.180 CFA" deltaPct="−12.000 CFA" direction="up" />
        <Kpi label="Overdue" value="6.920 CFA" deltaPct="+3 invoices" direction="down" />
        <Kpi label="Avg. days to pay" value="4.2d" deltaPct="−0.8d" direction="up" />
      </div>

      <div className="card-surf">
        <div className="toolbar" style={{ gap:10 }}>
          <span className="chip active">All <span className="count">128</span></span>
          <span className="chip">Paid <span className="count">94</span></span>
          <span className="chip">Pending <span className="count">22</span></span>
          <span className="chip">Overdue <span className="count">8</span></span>
          <span className="chip">Failed <span className="count">4</span></span>
          <div className="grow"></div>
          <Btn variant="secondary" icon="filter"><span style={{ whiteSpace:'nowrap' }}>Filter</span></Btn>
          <Btn variant="secondary" icon="arrow-up-down"><span style={{ whiteSpace:'nowrap' }}>Sort</span></Btn>
        </div>
        <table className="tbl">
          <thead><tr>
            <th>Customer</th><th>Invoice</th><th>Method</th><th>Status</th><th>Due</th><th style={{ textAlign:'right' }}>Amount</th>
          </tr></thead>
          <tbody>
            {COLLECTIONS.map(c => (
              <tr key={c.id} onClick={() => onSelectTx && onSelectTx({ ...c, name: c.customer })} style={{ cursor:'pointer' }}>
                <td><div className="row-name"><Avatar name={c.customer} tone={c.tone} />{c.customer}</div></td>
                <td className="ref">{c.ref}</td>
                <td><span className="badge badge-neutral">{c.method}</span></td>
                <td><TxStatus status={c.status} /></td>
                <td style={{ color:'var(--fg-3)', fontSize: 13, fontVariantNumeric:'tabular-nums' }}>{c.due}</td>
                <td className="num"><Money amount={c.amount} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

window.Collections = Collections;
