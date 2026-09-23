// Three core mobile screens — Accueil, Envoyer (saisie montant), Détail
const HOME_TX = [
  { id: 1, name: 'Salaire Octobre',     tone:'success', amount:  450000, when: "Aujourd'hui · 11:31", statusLabel: 'Reçu' },
  { id: 2, name: 'Moustapha K.',         tone:'brand',   amount: -48200,  when: "Aujourd'hui · 09:02", statusLabel: 'Envoyé', method:'Mobile Money' },
  { id: 3, name: 'NIGELEC · Facture',    tone:'warning', amount: -18450,  when: "Hier · 18:14",       statusLabel: 'En attente' },
  { id: 4, name: 'Recharge Airtel',      tone:'info',    amount: -2050,   when: '02/05',              statusLabel: 'Succès' },
  { id: 5, name: 'AmanaTa retrait',      tone:'danger',  amount: -1500,   when: '29/04',              statusLabel: 'Échec' },
];

const HomeScreen = ({ onSelectTx, onSend }) => {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  return (
    <div className="phone-screen" data-screen-label="Accueil">
      <div className="balance-hero">
        <StatusBar onDark />
        <div style={{ padding: '14px 6px 0' }}>
          <div className="greet">Solde disponible · Moustapha K.</div>
          <div className="amt">284.910 <span style={{ fontSize: 22, fontWeight: 600, color: '#9A9A90' }}>CFA</span></div>
          <div className="sub">↑ 12.420 CFA aujourd'hui</div>
        </div>
      </div>
      <div className="quick-actions">
        <div className="qa" onClick={onSend}><M_Icon name="arrow-up-right" /><span>Envoyer</span></div>
        <div className="qa"><M_Icon name="arrow-down-left" /><span>Recharger</span></div>
        <div className="qa"><M_Icon name="qr-code" /><span>Scanner</span></div>
        <div className="qa"><M_Icon name="receipt-text" /><span>Factures</span></div>
      </div>
      <div className="content">
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', padding:'4px 20px 6px' }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--fg-1)' }}>Mes transactions</div>
          <span style={{ fontSize: 12, color: 'var(--brand-lime-700)', fontWeight: 600 }}>Voir tout</span>
        </div>
        <div className="m-list">
          {HOME_TX.map(t => <M_TxRow key={t.id} tx={t} onClick={() => onSelectTx(t)} />)}
        </div>
        <div style={{ height: 12 }}></div>
      </div>
    </div>
  );
};

const SendScreen = ({ onBack, onContinue }) => {
  const [amount, setAmount] = React.useState('48200');
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });

  const pressKey = (k) => {
    if (k === 'back') return setAmount(a => a.slice(0, -1) || '0');
    if (k === '.') return; // no decimals in CFA
    setAmount(a => (a === '0' ? k : a + k));
  };
  const display = fmtCFA(parseInt(amount || '0', 10));

  return (
    <div className="phone-screen" data-screen-label="Envoyer">
      <StatusBar />
      <div style={{ display:'flex', alignItems:'center', padding: '0 16px', height: 44 }}>
        <button onClick={onBack} style={{ background: 'transparent', border: 0, padding: 6, cursor: 'pointer' }}><M_Icon name="x" style={{ width: 20, height: 20, color: 'var(--fg-2)' }} /></button>
        <div style={{ flex: 1, textAlign: 'center', fontWeight: 600, fontSize: 15, color: 'var(--fg-1)' }}>Nouveau transfert</div>
        <div style={{ width: 32 }}></div>
      </div>
      <div className="recipient-pill">
        <div className="tx-avatar" style={{ background:'#FCF3DD', color:'#8E5F0F' }}>AK</div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--fg-1)' }}>Aïssa Kané</div>
          <div style={{ fontSize: 12, color: 'var(--fg-3)' }}>Airtel · +227 90 ••12</div>
        </div>
        <M_Icon name="chevron-right" />
      </div>
      <div className="amount-screen">
        <div className="amount-display">
          {display}<span className="amount-cents" style={{ fontSize: 24, marginLeft: 6, color: 'var(--fg-3)' }}>CFA</span>
        </div>
        <div className="amount-hint">Airtel Money · arrive instantanément · frais 0 CFA</div>
      </div>
      <div className="amount-chips">
        <div className="amount-chip" onClick={() => setAmount('5000')}>5.000 F</div>
        <div className="amount-chip" onClick={() => setAmount('10000')}>10.000 F</div>
        <div className="amount-chip" onClick={() => setAmount('50000')}>50.000 F</div>
      </div>
      <div className="keypad">
        {['1','2','3','4','5','6','7','8','9','000','0','back'].map(k => (
          <button key={k} className={`key ${k === 'back' ? 'action' : ''}`} onClick={() => pressKey(k === '000' ? '000' : k)}>
            {k === 'back' ? <M_Icon name="delete" /> : k}
          </button>
        ))}
      </div>
      <div className="cta-bar">
        <button className="cta" onClick={onContinue}>Confirmer le transfert</button>
      </div>
    </div>
  );
};

const DetailScreen = ({ tx, onBack }) => {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  if (!tx) return null;
  const isOutgoing = tx.amount < 0;
  const statusTone = {
    'Reçu': 'success', 'Envoyé': 'success', 'Succès': 'success',
    'En attente': 'warning', 'Planifié': 'info', 'Échec': 'danger'
  }[tx.statusLabel] || 'success';
  return (
    <div className="phone-screen" data-screen-label="Détail">
      <StatusBar />
      <div style={{ display:'flex', alignItems:'center', padding: '0 16px', height: 44 }}>
        <button onClick={onBack} style={{ background: 'transparent', border: 0, padding: 6, cursor: 'pointer' }}><M_Icon name="chevron-left" style={{ width: 22, height: 22, color: 'var(--fg-1)' }} /></button>
        <div style={{ flex: 1, textAlign: 'center', fontWeight: 600, fontSize: 15, color: 'var(--fg-1)' }}>Transaction</div>
        <button style={{ background:'transparent', border: 0, padding: 6, cursor: 'pointer' }}><M_Icon name="more-horizontal" style={{ width: 20, height: 20, color: 'var(--fg-2)' }} /></button>
      </div>
      <div className="content">
        <div style={{ padding: '8px 0' }}>
          <div className="detail-amt">{isOutgoing ? '−' : '+'}{fmtCFA(tx.amount)} <span style={{ fontSize: 22, color: 'var(--fg-3)' }}>CFA</span></div>
          <div className="detail-to">
            <span>{isOutgoing ? 'à' : 'de'}</span>
            <strong style={{ color: 'var(--fg-1)' }}>{tx.name}</strong>
            <span className={`m-badge m-badge-${statusTone === 'danger' ? 'success' : statusTone}`} style={{ marginLeft: 'auto' }}>{tx.statusLabel}</span>
          </div>
        </div>
        <div className="info-card">
          <div className="info-row"><span className="k">Mode</span><span className="v">{tx.method || 'Mobile Money'}</span></div>
          <div className="info-row"><span className="k">Référence</span><span className="v" style={{ fontFamily: 'var(--font-mono)' }}>I377976535024</span></div>
          <div className="info-row"><span className="k">De</span><span className="v">iMoney · +227 87 50 50 52</span></div>
          <div className="info-row"><span className="k">À</span><span className="v">Airtel · +227 90 ••12</span></div>
          <div className="info-row"><span className="k">Initié</span><span className="v">{tx.when}</span></div>
          <div className="info-row"><span className="k">Frais</span><span className="v">0 CFA</span></div>
        </div>

        <div className="m-eyebrow">Suivi</div>
        <div className="m-card">
          {['Transaction créée', 'Validation conformité', 'Transmise au partenaire', 'Réglée'].map((step, i) => {
            const done = i < (tx.statusLabel === 'Succès' || tx.statusLabel === 'Envoyé' || tx.statusLabel === 'Reçu' ? 4 : 3);
            return (
              <div key={i} style={{ display:'flex', gap:12, alignItems:'center', padding:'8px 0', position:'relative' }}>
                <div style={{ width:22, height:22, borderRadius:'50%', background: done ? 'var(--brand-lime)' : '#fff', border: `2px solid ${done ? 'var(--brand-lime-600)' : 'var(--border-default)'}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  {done && <M_Icon name="check" style={{ width:10, height:10, color:'var(--brand-ink)' }} />}
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: done ? 'var(--fg-1)' : 'var(--fg-3)' }}>{step}</div>
              </div>
            );
          })}
        </div>
        <div style={{ height: 24 }}></div>
      </div>
      <div className="cta-bar">
        <button className="cta">Voir le reçu</button>
      </div>
    </div>
  );
};

Object.assign(window, { HomeScreen, SendScreen, DetailScreen, HOME_TX });
