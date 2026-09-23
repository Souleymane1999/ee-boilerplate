// Payout detail screen
const PayoutDetail = ({ tx, onBack }) => {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  if (!tx) return null;

  const timeline = [
    { label: 'Payout created',  sub: 'Nov 11 · 10:02 AM · by Jordan A.',   done: true },
    { label: 'Compliance review', sub: 'Nov 11 · 10:03 AM · auto-approved', done: true },
    { label: 'Submitted to bank', sub: 'Nov 11 · 10:04 AM · Chase',         done: tx.status !== 'draft' },
    { label: 'Settled',            sub: tx.status === 'paid' ? 'Nov 11 · 11:31 AM' : 'Expected Nov 14', done: tx.status === 'paid' },
  ];

  return (
    <div className="page">
      <div style={{ display:'flex', alignItems:'center', gap: 8, marginBottom: 18 }}>
        <button className="btn btn-ghost" onClick={onBack} style={{ padding: '6px 10px' }}>
          <Icon name="arrow-left" /> Payouts
        </button>
        <span style={{ color: 'var(--fg-4)' }}>/</span>
        <span style={{ color:'var(--fg-3)', fontSize: 13, fontFamily:'var(--font-mono)' }}>{tx.ref}</span>
      </div>

      <div className="page-header" style={{ alignItems:'flex-start' }}>
        <div style={{ display:'flex', alignItems:'center', gap: 16 }}>
          <Avatar name={tx.name} tone={tx.tone} />
          <div>
            <div className="amount-big"><Money amount={tx.amount} /></div>
            <div style={{ display:'flex', gap:10, alignItems:'center', marginTop: 8 }}>
              <span style={{ fontSize: 14, color:'var(--fg-2)' }}>to <strong style={{ color:'var(--fg-1)' }}>{tx.name}</strong></span>
              <TxStatus status={tx.status} />
            </div>
          </div>
        </div>
        <div style={{ display:'flex', gap:8 }}>
          {tx.status === 'failed' && <Btn variant="primary" icon="rotate-cw">Retry payout</Btn>}
          {tx.status === 'scheduled' && <Btn variant="secondary" icon="x">Cancel</Btn>}
          <Btn variant="secondary" icon="download">Receipt</Btn>
          <Btn variant="ghost" icon="more-horizontal" />
        </div>
      </div>

      <div className="detail-grid">
        <div className="card-surf" style={{ padding: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color:'var(--fg-1)', marginBottom: 10 }}>Transfer details</div>
          <div className="detail-row"><span className="k">Reference</span><span className="v" style={{ fontFamily: 'var(--font-mono)' }}>{tx.ref}</span></div>
          <div className="detail-row"><span className="k">Method</span><span className="v">{tx.method || 'ACH'}</span></div>
          <div className="detail-row"><span className="k">From</span><span className="v">Operating · Chase ••4218</span></div>
          <div className="detail-row"><span className="k">To</span><span className="v">{tx.name} · Wells Fargo ••9302</span></div>
          <div className="detail-row"><span className="k">Initiated</span><span className="v">Nov 11, 2026 · 10:02 AM</span></div>
          <div className="detail-row"><span className="k">Expected settlement</span><span className="v">{tx.status === 'paid' ? 'Nov 11, 11:31 AM (1h 29m)' : 'Nov 14, 2026'}</span></div>
          <div className="detail-row"><span className="k">Fee</span><span className="v">0 CFA</span></div>
          <div className="detail-row"><span className="k">Total debited</span><span className="v"><Money amount={tx.amount} /></span></div>

          <div style={{ fontSize: 13, fontWeight: 600, color:'var(--fg-1)', margin: '20px 0 10px' }}>Memo</div>
          <div style={{ background: 'var(--neutral-25)', border:'1px solid var(--border-subtle)', borderRadius: 10, padding: 12, fontSize: 13.5, color:'var(--fg-2)', lineHeight: 1.5 }}>
            Q4 services contract — milestone 2 of 4. PO #NW-2026-Q4-114.
          </div>

          {tx.status === 'failed' && (
            <div style={{ marginTop: 16, padding: 14, background: '#FBE7E5', border: '1px solid #EFBEB9', borderRadius: 10, display:'flex', gap: 12 }}>
              <Icon name="alert-circle" style={{ color: '#9F271E', width: 18, height: 18, flexShrink: 0, marginTop: 1 }} />
              <div>
                <div style={{ fontWeight: 600, color: '#9F271E', fontSize: 13, marginBottom: 4 }}>R03 · No account / unable to locate</div>
                <div style={{ fontSize: 13, color: '#9F271E', lineHeight: 1.45 }}>The receiving bank could not find the recipient account. Verify the account number with {tx.name} and retry.</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap: 16 }}>
          <div className="card-surf" style={{ padding: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color:'var(--fg-1)', marginBottom: 14 }}>Timeline</div>
            <div className="timeline">
              {timeline.map((t, i) => (
                <div key={i} className={`tl-item ${t.done ? 'done' : ''}`}>
                  <div className={`tl-dot ${t.done ? 'done' : ''}`}>
                    {t.done && <Icon name="check" />}
                  </div>
                  {i < timeline.length - 1 && <div className="tl-line"></div>}
                  <div className="tl-meta">
                    <div className="tl-title" style={{ color: t.done ? 'var(--fg-1)' : 'var(--fg-3)' }}>{t.label}</div>
                    <div className="tl-sub">{t.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card-surf" style={{ padding: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color:'var(--fg-1)', marginBottom: 10 }}>Recipient</div>
            <div style={{ display:'flex', alignItems:'center', gap: 12, padding: '6px 0' }}>
              <Avatar name={tx.name} tone={tx.tone} />
              <div style={{ display:'flex', flexDirection:'column', gap: 2 }}>
                <span style={{ fontSize: 13.5, fontWeight: 600, color:'var(--fg-1)' }}>{tx.name}</span>
                <span style={{ fontSize: 12, color:'var(--fg-3)' }}>Vendor · 14 transfers · since Mar 2024</span>
              </div>
            </div>
            <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border-subtle)' }}>
              <Btn variant="ghost" icon="external-link">View recipient</Btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

window.PayoutDetail = PayoutDetail;
