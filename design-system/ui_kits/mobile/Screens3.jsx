// Carte VISA flow — Liste, Détail (état erreur), Création, Recharge carte

/* Reusable Visa-style card preview ---------------------------------------- */
const VisaCard = ({ number = '2432', kind = 'virtuelle', error = false, onRetry }) => (
  <div className={`visa-card ${error ? 'error' : ''}`}>
    <div className="row">
      <div className="brand"><span className="dot"></span>imoney</div>
      <div className="visa">VISA</div>
    </div>
    <div className="num">**** **** **** <strong>{number}</strong></div>
    <div className="foot">
      <span className="pager"><span className="dotnav on"></span><span className="dotnav"></span><span className="dotnav"></span></span>
      <span className="badge">{kind}</span>
    </div>
    {error && (
      <div className="err-overlay">
        <div className="ico"><M_Icon name="alert-circle" /></div>
        <div className="t">Erreur de chargement</div>
        <div className="s">Erreur interne du serveur</div>
        <div className="retry" onClick={onRetry}><M_Icon name="rotate-cw" /></div>
      </div>
    )}
  </div>
);

/* ── 8. Mes cartes VISA — liste ─────────────────────────────────────────── */
const CardsListScreen = ({ onBack, onOpenCard, onCreate }) => {
  const [tab, setTab] = React.useState('virtuel');
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  return (
    <div className="phone-screen" data-screen-label="Mes cartes VISA">
      <StatusBar />
      <MNav title="Mes cartes VISA" onBack={onBack} right={
        <button className="btn" style={{ background: 'var(--brand-lime-600)', borderColor: 'var(--brand-lime-700)' }}>
          <M_Icon name="hand-coins" style={{ width: 18, height: 18, color: '#fff' }} />
        </button>
      } />

      <div className="content">
        <div className="stat-duo" style={{ marginTop: 4 }}>
          <div className="col">
            <div className="ic"><M_Icon name="credit-card" /></div>
            <div className="v">1</div>
            <div className="k">Cartes actives</div>
          </div>
          <div className="div"></div>
          <div className="col">
            <div className="ic"><M_Icon name="wallet" /></div>
            <div className="v">2.000 CFA</div>
            <div className="k">Solde total</div>
          </div>
        </div>

        <button className="m-cta-primary" onClick={onCreate} style={{ marginTop: 14 }}>Créer une nouvelle carte</button>

        <div style={{ display:'flex', justifyContent:'flex-end', padding: '18px 16px 14px' }}>
          <div className="segmented">
            <div className={`seg ${tab === 'virtuel' ? 'active' : ''}`} onClick={() => setTab('virtuel')}>
              <M_Icon name="smartphone" /> Virtuel
            </div>
            <div className={`seg ${tab === 'physique' ? 'active' : ''}`} onClick={() => setTab('physique')}>
              <M_Icon name="credit-card" /> Physique
            </div>
          </div>
        </div>

        <div onClick={onOpenCard} style={{ cursor:'pointer' }}>
          <VisaCard number="2432" kind="virtuelle" />
        </div>
      </div>
    </div>
  );
};

/* ── 9. Détail de carte (avec état d'erreur) ────────────────────────────── */
const CardDetailScreen = ({ onBack, onRecharge }) => {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  return (
    <div className="phone-screen" data-screen-label="Détail carte">
      <StatusBar />
      <MNav title="Détail carte" onBack={onBack} right={
        <button className="btn" style={{ background: '#FFEDD9', borderColor: '#F5C685' }}>
          <M_Icon name="settings-2" style={{ width: 18, height: 18, color: '#B5610B' }} />
        </button>
      } />

      <div className="content">
        <VisaCard number="2432" kind="virtuelle" error />

        <button className="m-cta-primary" onClick={onRecharge} style={{ marginTop: 14 }}>Recharger ma carte</button>

        <div className="m-section-row">
          <div className="t"><span className="ic"><M_Icon name="history" /></span>Historique de la carte</div>
          <span className="act">Voir tout</span>
        </div>

        <div className="err-tile">
          <div className="top"><M_Icon name="alert-octagon" /> Une erreur s'est produite</div>
          <div className="sub">Erreur interne du serveur. Nous n'avons pas pu charger l'historique.</div>
          <button className="retry-btn"><M_Icon name="rotate-cw" /> Réessayer</button>
        </div>
        <div style={{ height: 24 }}></div>
      </div>
    </div>
  );
};

/* ── 10. Recharger ma carte ─────────────────────────────────────────────── */
const CardRechargeScreen = ({ onBack }) => {
  const [amount, setAmount] = React.useState(10000);
  const [src, setSrc] = React.useState('imoney');
  const presets = [1000, 2000, 5000, 10000, 20000, 50000];
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  return (
    <div className="phone-screen" data-screen-label="Recharger ma carte">
      <StatusBar />
      <MNav title="Recharger ma carte" onBack={onBack} />

      <VisaCard number="2432" kind="virtuelle" />

      <div className="m-field-label">Source de fonds</div>
      <div style={{ display:'flex', gap: 8, padding: '0 16px' }}>
        <div className={`method-card ${src === 'imoney' ? 'active' : ''}`} style={{ flex:1 }} onClick={() => setSrc('imoney')}>
          <div className="logo" style={{ background:'var(--brand-lime-50)' }}><M_Icon name="wallet" style={{ color:'var(--brand-lime-700)' }} /></div>
          <div className="lbl">Solde iMoney</div>
        </div>
        <div className={`method-card ${src === 'momo' ? 'active' : ''}`} style={{ flex:1 }} onClick={() => setSrc('momo')}>
          <div className="logo" style={{ background:'#E0EDFC' }}><M_Icon name="smartphone" style={{ color:'#1E4F86' }} /></div>
          <div className="lbl">Mobile Money</div>
        </div>
        <div className={`method-card ${src === 'amanata' ? 'active' : ''}`} style={{ flex:1 }} onClick={() => setSrc('amanata')}>
          <div className="logo" style={{ background:'#E0F0DA' }}><M_Icon name="building-2" style={{ color:'#2E6B26' }} /></div>
          <div className="lbl">AmanaTa</div>
        </div>
      </div>

      <div className="m-field-label">Montant à recharger</div>
      <div className="m-input">
        <div className="icon"><M_Icon name="coins" /></div>
        <input value={fmtCFA(amount)} onChange={(e) => setAmount(parseInt(e.target.value.replace(/\./g,'') || '0', 10))} />
        <span style={{ fontSize: 12.5, color: 'var(--fg-3)', fontWeight: 700 }}>CFA</span>
      </div>

      <div className="preset-label">Suggestions</div>
      <div className="preset-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        {presets.map(v => (
          <div key={v} className={`preset-chip ${amount === v ? 'active' : ''}`} onClick={() => setAmount(v)}>
            {fmtCFA(v)}
          </div>
        ))}
      </div>

      <div className="info-card" style={{ margin: '14px 16px 0', background: 'var(--brand-lime-50)', borderColor: 'var(--brand-lime-200)' }}>
        <div className="info-row" style={{ padding: '10px 14px', alignItems:'center' }}>
          <span className="k" style={{ flex: 0 }}><M_Icon name="zap" style={{ width: 14, height: 14, color: 'var(--brand-lime-700)' }} /></span>
          <span className="v" style={{ textAlign:'left', fontWeight: 500, color: 'var(--fg-2)', fontSize: 12, lineHeight: 1.45 }}>
            La recharge est instantanée. Frais&nbsp;: <strong>1 % min. 200 CFA</strong>.
          </span>
        </div>
      </div>

      <div style={{ flex: 1 }}></div>
      <button className="m-cta-primary">Recharger {fmtCFA(amount)} CFA</button>
    </div>
  );
};

/* ── 11. Créer une nouvelle carte ───────────────────────────────────────── */
const CardCreateScreen = ({ onBack }) => {
  const [kind, setKind] = React.useState('virtuelle');
  const [initial, setInitial] = React.useState(2000);
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  return (
    <div className="phone-screen" data-screen-label="Créer une carte">
      <StatusBar />
      <MNav title="Créer une nouvelle carte" onBack={onBack} />

      <div className="m-section-h-sm">Type de carte</div>
      <div style={{ display:'flex', gap: 10, padding: '0 16px' }}>
        <div className={`method-card ${kind === 'virtuelle' ? 'active' : ''}`} style={{ flex:1, alignItems:'flex-start', padding: '14px 14px 12px' }} onClick={() => setKind('virtuelle')}>
          <div className="logo" style={{ background:'var(--brand-lime-50)' }}><M_Icon name="smartphone" style={{ color:'var(--brand-lime-700)' }} /></div>
          <div className="lbl" style={{ textAlign:'left' }}>Carte virtuelle</div>
          <div style={{ fontSize: 11, color: 'var(--fg-3)', textAlign:'left' }}>Émission instantanée · gratuit</div>
        </div>
        <div className={`method-card ${kind === 'physique' ? 'active' : ''}`} style={{ flex:1, alignItems:'flex-start', padding: '14px 14px 12px' }} onClick={() => setKind('physique')}>
          <div className="logo" style={{ background:'#E0EDFC' }}><M_Icon name="credit-card" style={{ color:'#1E4F86' }} /></div>
          <div className="lbl" style={{ textAlign:'left' }}>Carte physique</div>
          <div style={{ fontSize: 11, color: 'var(--fg-3)', textAlign:'left' }}>Livrée à Niamey · 7.500 CFA</div>
        </div>
      </div>

      <div className="m-field-label">Nom sur la carte</div>
      <div className="m-input">
        <div className="icon"><M_Icon name="user-round" /></div>
        <input defaultValue="MOUSTAPHA K. AMADOU" />
      </div>

      <div className="m-field-label">Recharge initiale</div>
      <div className="m-input">
        <div className="icon"><M_Icon name="coins" /></div>
        <input value={fmtCFA(initial)} onChange={(e) => setInitial(parseInt(e.target.value.replace(/\./g,'') || '0', 10))} />
        <span style={{ fontSize: 12.5, color: 'var(--fg-3)', fontWeight: 700 }}>CFA</span>
      </div>

      <div className="preset-grid" style={{ marginTop: 8, gridTemplateColumns:'repeat(4, 1fr)', gap: 6 }}>
        {[2000, 5000, 10000, 25000].map(v => (
          <div key={v} className={`preset-chip ${initial === v ? 'active' : ''}`} onClick={() => setInitial(v)}>
            {fmtCFA(v)}
          </div>
        ))}
      </div>

      <div className="m-section-h-sm">Récapitulatif</div>
      <div className="info-card">
        <div className="info-row"><span className="k">Type</span><span className="v" style={{ textTransform:'capitalize' }}>{kind}</span></div>
        <div className="info-row"><span className="k">Émission</span><span className="v">{kind === 'virtuelle' ? 'Gratuit' : '7.500 CFA'}</span></div>
        <div className="info-row"><span className="k">Recharge initiale</span><span className="v">{fmtCFA(initial)} CFA</span></div>
        <div className="info-row"><span className="k">Total à débiter</span><span className="v" style={{ color:'var(--brand-lime-700)' }}>{fmtCFA(initial + (kind === 'virtuelle' ? 0 : 7500))} CFA</span></div>
      </div>

      <div style={{ flex: 1 }}></div>
      <button className="m-cta-primary">Créer la carte</button>
    </div>
  );
};

Object.assign(window, { CardsListScreen, CardDetailScreen, CardRechargeScreen, CardCreateScreen, VisaCard });
