// Additional iMoney screens redesigned in the iFutur mobile system —
// Historique des transactions · Vérification d'identité (KYC) · Recharger
// · Dépôt · Paramètres (client + agent) · Menu Transactions

/* ── 1. Historique des transactions ─────────────────────────────────────── */
const HTX = [
  { service: 'Dépôt', op: 'AIRTEL', amount: 2050,  date: "29/04/2026 · 09:01", ref: 'I377976535024', status:'ok',   tone:'orange', icon:'wallet' },
  { service: 'Recharge iMoney', op: 'AMANA',  amount: 2050,  date: "29/04/2026 · 09:01", ref: 'I534685087550', status:'pend', tone:'amana',  icon:'arrow-down-to-line' },
  { service: "Transfert d'argent", op: 'AMANA', amount: 2000,  date: "29/04/2026 · 09:00", ref: 'I651745644184', status:'err',  tone:'amana',  icon:'send' },
  { service: 'Retrait', op: 'AIRTEL', amount: 2050, date: "29/04/2026 · 08:59", ref: 'I367033581881', status:'ok',   tone:'lime',   icon:'wallet' },
  { service: 'Chap-Chap', op: 'AIRTEL', amount: 100, date: "28/04/2026 · 11:18", ref: 'I951080001820', status:'ok',   tone:'blue',   icon:'smartphone' },
  { service: 'Retrait', op: 'AIRTEL', amount: 100,  date: "27/04/2026 · 11:56", ref: 'I344394601837', status:'ok',   tone:'lime',   icon:'wallet' },
  { service: 'Retrait', op: 'AIRTEL', amount: 100,  date: "27/04/2026 · 11:56", ref: 'I856028377154', status:'err',  tone:'lime',   icon:'wallet' },
];
const htxToneMap = {
  orange: { bg:'#FFEDD9', fg:'#B5610B' },
  amana:  { bg:'#E0F0DA', fg:'#2E6B26' },
  lime:   { bg:'#F2F6D6', fg:'#5E6A1A' },
  blue:   { bg:'#E0EDFC', fg:'#1E4F86' },
};
const statusLabel = { ok:'Succès', err:'Échec', pend:'Initié', run:'En cours' };

const HistoryScreen = ({ onBack }) => {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  return (
    <div className="phone-screen" data-screen-label="Historique">
      <StatusBar />
      <MNav title="Historique des transactions" onBack={onBack} right={
        <button className="btn" style={{ background: 'var(--brand-ink)', borderColor: 'var(--brand-ink)' }}>
          <M_Icon name="qr-code" style={{ width: 18, height: 18, color: 'var(--brand-lime)' }} />
        </button>
      } />
      <div className="filter-row">
        <div className="filter-chip active"><span>Services</span><M_Icon name="chevron-down" /></div>
        <div className="filter-chip"><span>Statut</span><M_Icon name="chevron-down" /></div>
        <div className="filter-chip"><span>Période</span><M_Icon name="chevron-down" /></div>
      </div>
      <div className="content">
        <div className="htx-list">
          {HTX.map((t, i) => {
            const tone = htxToneMap[t.tone] || htxToneMap.lime;
            return (
              <div className="htx-card" key={i}>
                <div className="htx-top">
                  <div className="htx-icon" style={{ background: tone.bg, color: tone.fg }}>
                    <M_Icon name={t.icon} style={{ color: tone.fg }} />
                  </div>
                  <div style={{ flex:1, minWidth: 0 }}>
                    <div className="htx-name">{t.service} <span style={{ color:'var(--fg-3)', fontWeight: 600 }}>· {t.op}</span></div>
                    <div className="htx-amt">{fmtCFA(t.amount)} CFA</div>
                  </div>
                  <span className={`m-status ${t.status}`}>{statusLabel[t.status]}</span>
                </div>
                <div className="htx-bot">
                  <span style={{ display:'inline-flex', alignItems:'center', gap: 4 }}>
                    <M_Icon name="clock" style={{ width: 12, height: 12 }} /> {t.date}
                  </span>
                  <span className="htx-ref"><M_Icon name="ticket" />{t.ref}</span>
                </div>
              </div>
            );
          })}
          <div style={{ textAlign:'center', fontSize: 12, color:'var(--fg-3)', padding: 8 }}>
            Affichage de 7 transactions sur 248
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── 2. Vérification d'identité (KYC) ───────────────────────────────────── */
const KYCScreen = ({ onBack }) => {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  return (
    <div className="phone-screen" data-screen-label="KYC">
      <StatusBar />
      <MNav title="Vérification d'identité" onBack={onBack} right={
        <button className="btn" style={{ background: 'var(--brand-lime-600)', borderColor: 'var(--brand-lime-700)' }}>
          <M_Icon name="shield-check" style={{ width: 18, height: 18, color: '#fff' }} />
        </button>
      } />

      <div className="kyc-banner">
        <div className="seal"><M_Icon name="badge-check" /></div>
        <div className="title">Identité vérifiée</div>
        <div className="sub">Votre KYC a été validé avec succès</div>
        <div className="pill"><M_Icon name="check" style={{ width: 12, height: 12 }} /> Approuvé · 04/2026</div>
      </div>

      <div className="content">
        <div className="m-section-h">Informations personnelles</div>
        <div className="info-card">
          <div className="info-row"><span className="k">Prénom</span><span className="v">Moustapha</span></div>
          <div className="info-row"><span className="k">Nom</span><span className="v">Kodjo Amadou</span></div>
          <div className="info-row"><span className="k">Genre</span><span className="v">Masculin</span></div>
          <div className="info-row"><span className="k">Date de naissance</span><span className="v">01/01/1990</span></div>
          <div className="info-row"><span className="k">Lieu de naissance</span><span className="v">Niamey</span></div>
        </div>

        <div className="m-section-h">Informations complémentaires</div>
        <div className="info-card">
          <div className="info-row"><span className="k">Profession</span><span className="v">Software Engineer</span></div>
          <div className="info-row"><span className="k">Pays de résidence</span><span className="v">Niger</span></div>
          <div className="info-row"><span className="k">Ville de résidence</span><span className="v">Niamey</span></div>
          <div className="info-row"><span className="k">Adresse de domicile</span><span className="v">Quartier Rhodésie</span></div>
        </div>

        <div className="m-section-h">Information de la pièce</div>
        <div className="info-card">
          <div className="info-row"><span className="k">Type</span><span className="v">CNI</span></div>
          <div className="info-row"><span className="k">Numéro de la pièce</span><span className="v" style={{ fontFamily:'var(--font-mono)' }}>NER · 0028574</span></div>
          <div className="info-row"><span className="k">Date de création</span><span className="v">14/03/2021</span></div>
          <div className="info-row"><span className="k">Date d'expiration</span><span className="v">14/03/2031</span></div>
          <div className="info-row"><span className="k">Autorité émettrice</span><span className="v">DGD&nbsp;Niamey</span></div>
        </div>
        <div style={{ height: 24 }}></div>
      </div>
    </div>
  );
};

/* ── 3. Recharger mon compte ────────────────────────────────────────────── */
const RECHARGES = [
  { amount: 1500,  method: 'Recharge via AmanaTa', date: '29/04/2026 · 18:52', ref: '253969495570', status:'err' },
  { amount: 1000,  method: 'Recharge via AmanaTa', date: '29/04/2026 · 18:51', ref: '956360147242', status:'err' },
  { amount: 10000, method: 'Recharge via Falaphone', date: '24/03/2026 · 14:40', ref: '627915843953', status:'run' },
  { amount: 25000, method: 'Recharge via Guichet Amana', date: '17/03/2026 · 09:12', ref: '883401221045', status:'ok' },
];

const RechargeScreen = ({ onBack }) => {
  const [method, setMethod] = React.useState('falaphone');
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  return (
    <div className="phone-screen" data-screen-label="Recharger">
      <StatusBar />
      <MNav title="Recharger mon compte" onBack={onBack} />

      <div className="m-section-h-sm">Modes de recharge</div>
      <div className="method-grid">
        <div className={`method-card ${method === 'falaphone' ? 'active' : ''}`} onClick={() => setMethod('falaphone')}>
          <div className="logo" style={{ background:'#DCEFEE' }}><M_Icon name="user-round" style={{ color:'#2A8B85' }} /></div>
          <div className="lbl">Falaphone</div>
        </div>
        <div className={`method-card ${method === 'amanata' ? 'active' : ''}`} onClick={() => setMethod('amanata')}>
          <div className="logo" style={{ background:'#E0F0DA' }}><M_Icon name="credit-card" style={{ color:'#2E6B26' }} /></div>
          <div className="lbl">AmanaTa</div>
        </div>
        <div className={`method-card ${method === 'guichet' ? 'active' : ''}`} onClick={() => setMethod('guichet')}>
          <div className="logo" style={{ background:'#F2F6D6' }}><M_Icon name="landmark" style={{ color:'#5E6A1A' }} /></div>
          <div className="lbl">Guichet Amana</div>
        </div>
      </div>

      <div className="m-field-label">Numéro de téléphone</div>
      <div className="m-input">
        <div className="country-pill"><span className="flag"></span><span className="code">+227</span></div>
        <input placeholder="90 00 00 00" defaultValue="87 50 50 52" />
      </div>

      <div className="m-field-label">Montant à recharger</div>
      <div className="m-input">
        <div className="icon"><M_Icon name="coins" /></div>
        <input placeholder="Entrez le montant" defaultValue="10.000" />
        <span style={{ fontSize: 12.5, color: 'var(--fg-3)', fontWeight: 700 }}>CFA</span>
      </div>

      <button className="m-cta-primary" style={{ marginTop: 14 }}>Recharger maintenant</button>

      <div className="m-section-h" style={{ display:'flex', alignItems:'center', gap: 8 }}>
        <M_Icon name="history" style={{ width: 16, height: 16, color:'var(--brand-lime-700)' }} />
        Historique de recharge
      </div>
      <div className="content" style={{ padding: 0 }}>
        {RECHARGES.map((r, i) => (
          <div className="rh-card" key={i}>
            <div className="rh-top">
              <div>
                <div className="rh-amt">{fmtCFA(r.amount)} CFA</div>
                <div className="rh-meta">{r.method}</div>
              </div>
              <span className={`m-status ${r.status}`}>{statusLabel[r.status]}</span>
            </div>
            <div className="rh-foot">
              <M_Icon name="calendar" /> {r.date}
              <span className="ref">{r.ref}</span>
            </div>
          </div>
        ))}
        <div style={{ height: 16 }}></div>
      </div>
    </div>
  );
};

/* ── 4. Dépôt agent ─────────────────────────────────────────────────────── */
const DepositScreen = ({ onBack }) => {
  const [amount, setAmount] = React.useState(50000);
  const presets = [100, 200, 500, 1000, 2000, 5000, 10000, 20000, 50000, 100000];
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  return (
    <div className="phone-screen" data-screen-label="Dépôt">
      <StatusBar />
      <MNav title="Dépôt" onBack={onBack} right={
        <button className="btn" style={{ background:'#FFEDD9', borderColor:'#F5C685' }}>
          <M_Icon name="wallet" style={{ width: 18, height: 18, color:'#B5610B' }} />
        </button>
      } />

      <div className="m-field-label">Numéro de téléphone</div>
      <div className="m-input">
        <div className="country-pill"><span className="flag"></span><span className="code">+227</span></div>
        <input placeholder="Saisir le numéro" />
      </div>

      <div className="m-field-label">Montant</div>
      <div className="m-input">
        <div className="icon"><M_Icon name="coins" /></div>
        <input value={fmtCFA(amount)} onChange={(e) => setAmount(parseInt(e.target.value.replace(/\./g,'') || '0', 10))} />
        <span style={{ fontSize: 12.5, color: 'var(--fg-3)', fontWeight: 700 }}>CFA</span>
      </div>

      <div className="preset-label">Ou sélectionner un montant</div>
      <div className="preset-grid">
        {presets.map(v => (
          <div key={v} className={`preset-chip ${amount === v ? 'active' : ''}`} onClick={() => setAmount(v)}>
            {fmtCFA(v)}
          </div>
        ))}
      </div>

      <div style={{ flex: 1 }}></div>

      <div className="info-card" style={{ margin: '12px 16px 0', background: 'var(--brand-lime-50)', borderColor: 'var(--brand-lime-200)' }}>
        <div className="info-row" style={{ padding: '10px 14px' }}>
          <span className="k" style={{ flex: 0 }}><M_Icon name="info" style={{ width: 14, height: 14, color: 'var(--brand-lime-700)' }} /></span>
          <span className="v" style={{ textAlign:'left', fontWeight: 500, color: 'var(--fg-2)', fontSize: 12, lineHeight: 1.45 }}>
            Le client recevra un SMS de confirmation. Frais agent : <strong>0 CFA</strong>.
          </span>
        </div>
      </div>

      <button className="m-cta-primary" style={{ marginTop: 12 }}>Valider le dépôt</button>
    </div>
  );
};

/* ── 5. Paramètres client (consumer) ────────────────────────────────────── */
const SettingsScreen = ({ onBack }) => {
  const [bio, setBio] = React.useState(false);
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  return (
    <div className="phone-screen" data-screen-label="Paramètres">
      <StatusBar />
      <MNav title="Paramètres" onBack={onBack} right={
        <button className="btn red"><M_Icon name="log-out" /></button>
      } />

      <div className="content">
        <div className="set-card">
          <div className="set-card-h"><M_Icon name="circle-user" /><span className="t">Profil</span></div>
          <div className="set-row">
            <div className="ic"><M_Icon name="shield-check" /></div>
            <div className="lbl">
              <div className="l1">Vérification d'identité</div>
              <div className="l2">KYC — Know Your Customer</div>
            </div>
            <span className="pill-badge warn">Approuvé</span>
          </div>
          <div className="set-row">
            <div className="ic"><M_Icon name="pencil" /></div>
            <div className="lbl">
              <div className="l1">Mes informations</div>
              <div className="l2">Nom, email, téléphone</div>
            </div>
            <span className="chev"><M_Icon name="chevron-right" /></span>
          </div>
        </div>

        <div className="set-card">
          <div className="set-card-h"><M_Icon name="shield" /><span className="t">Sécurité</span></div>
          <div className="set-row">
            <div className="ic"><M_Icon name="lock" /></div>
            <div className="lbl">
              <div className="l1">Changer le mot de passe</div>
              <div className="l2">Mettre à jour votre mot de passe</div>
            </div>
            <span className="chev"><M_Icon name="chevron-right" /></span>
          </div>
          <div className="set-row">
            <div className="ic"><M_Icon name="fingerprint" /></div>
            <div className="lbl">
              <div className="l1">Authentification biométrique</div>
              <div className="l2">Empreinte digitale</div>
            </div>
            <span className={`m-switch ${bio ? 'on' : ''}`} onClick={() => setBio(b => !b)}></span>
          </div>
        </div>

        <div className="set-card">
          <div className="set-card-h"><M_Icon name="help-circle" /><span className="t">Support</span></div>
          <div className="set-row">
            <div className="ic"><M_Icon name="message-circle-question" /></div>
            <div className="lbl">
              <div className="l1">Centre d'aide</div>
              <div className="l2">FAQ et guides</div>
            </div>
            <span className="chev"><M_Icon name="chevron-right" /></span>
          </div>
          <div className="set-row">
            <div className="ic"><M_Icon name="headphones" /></div>
            <div className="lbl">
              <div className="l1">Contacter le support</div>
              <div className="l2">Assistance 7j / 7</div>
            </div>
            <span className="chev"><M_Icon name="chevron-right" /></span>
          </div>
        </div>

        <div className="set-card">
          <div className="set-card-h"><M_Icon name="info" /><span className="t">À propos</span></div>
          <div className="set-row">
            <div className="ic"><M_Icon name="file-text" /></div>
            <div className="lbl">
              <div className="l1">Conditions d'utilisation</div>
              <div className="l2">Version 1.3.5 · 04/2026</div>
            </div>
            <span className="chev"><M_Icon name="chevron-right" /></span>
          </div>
        </div>
        <div style={{ height: 16 }}></div>
      </div>
    </div>
  );
};

/* ── 6. Paramètres agent (point de vente) ───────────────────────────────── */
const AgentSettingsScreen = ({ onBack }) => {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  return (
    <div className="phone-screen" data-screen-label="Paramètres agent">
      <StatusBar />
      <MNav title="Paramètres" onBack={onBack} right={
        <button className="btn"><M_Icon name="more-vertical" /></button>
      } />

      <div className="profile-card">
        <div className="profile-row">
          <div className="ic"><M_Icon name="circle-user" /></div>
          <div>
            <div className="k">Nom</div>
            <div className="v">i-Futur Test Kodjo</div>
          </div>
        </div>
        <div className="profile-row">
          <div className="ic"><M_Icon name="phone" /></div>
          <div>
            <div className="k">Téléphone</div>
            <div className="v">+227 87 50 50 52</div>
          </div>
        </div>
        <div className="profile-row">
          <div className="ic"><M_Icon name="store" /></div>
          <div>
            <div className="k">Type de compte</div>
            <div className="v">Point de vente · Niamey</div>
          </div>
        </div>
      </div>

      <div style={{ height: 8 }}></div>

      <div className="menu-btn-lg">
        <div className="ic"><M_Icon name="shield-check" /></div>
        <span className="lbl">Mon KYC (Identification)</span>
        <span className="pill-badge warn" style={{ marginLeft:'auto' }}>Approuvé</span>
      </div>
      <div className="menu-btn-lg">
        <div className="ic"><M_Icon name="qr-code" /></div>
        <span className="lbl">Code de visite agent</span>
        <span className="chev"><M_Icon name="chevron-right" /></span>
      </div>
      <div className="menu-btn-lg">
        <div className="ic"><M_Icon name="lock" /></div>
        <span className="lbl">Paramètres de sécurité</span>
        <span className="chev"><M_Icon name="chevron-right" /></span>
      </div>
      <div className="menu-btn-lg">
        <div className="ic"><M_Icon name="printer" /></div>
        <span className="lbl">Paramétrer l'imprimante</span>
        <span className="chev"><M_Icon name="chevron-right" /></span>
      </div>
      <div className="menu-btn-lg">
        <div className="ic"><M_Icon name="headphones" /></div>
        <span className="lbl">Contacter le service client</span>
        <span className="chev"><M_Icon name="chevron-right" /></span>
      </div>

      <div style={{ flex: 1 }}></div>

      <button className="m-cta-danger"><M_Icon name="log-out" />Déconnexion</button>
      <div style={{ textAlign:'center', fontSize: 11, color: 'var(--fg-3)', paddingBottom: 12 }}>
        Version <strong style={{ color:'var(--fg-2)' }}>1.3.5</strong>
      </div>
    </div>
  );
};

/* ── 7. Menu Transactions (agent) ───────────────────────────────────────── */
const TxMenuScreen = ({ onBack }) => {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  const items = [
    { lbl: 'Historique de gains',         icon: 'trending-up' },
    { lbl: 'Historique du solde',         icon: 'history' },
    { lbl: 'Historique des transactions', icon: 'receipt' },
    { lbl: 'Recharger mon compte',        icon: 'credit-card' },
    { lbl: 'Liste des plaintes',          icon: 'flag' },
  ];
  return (
    <div className="phone-screen" data-screen-label="Menu Transactions">
      <StatusBar />
      <MNav title="Transactions" onBack={onBack} />

      <div className="profile-card" style={{ background: 'var(--brand-ink)', borderColor: 'var(--brand-ink)', color:'#F4F4F1' }}>
        <div style={{ display:'flex', alignItems:'flex-start', gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(187,203,68,0.18)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <M_Icon name="wallet" style={{ width: 20, height: 20, color: 'var(--brand-lime-500)' }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11.5, color: '#9A9A90', fontWeight: 600 }}>Gains du mois · 05/2026</div>
            <div style={{ fontSize: 24, fontWeight: 800, marginTop: 2, letterSpacing: '-0.018em', fontVariantNumeric: 'tabular-nums', color: '#F4F4F1' }}>184.250 <span style={{ fontSize: 14, color: '#9A9A90' }}>CFA</span></div>
            <div style={{ fontSize: 11.5, color: 'var(--brand-lime-500)', fontWeight: 600, marginTop: 4 }}>↑ 12 % vs. avril</div>
          </div>
        </div>
      </div>

      <div style={{ height: 14 }}></div>

      {items.map(({ lbl, icon }, i) => (
        <div className="menu-btn-lg" key={i}>
          <div className="ic"><M_Icon name={icon} /></div>
          <span className="lbl">{lbl}</span>
          <span className="chev"><M_Icon name="chevron-right" /></span>
        </div>
      ))}

      <div style={{ flex: 1 }}></div>
      <div style={{ textAlign:'center', fontSize: 11, color: 'var(--fg-3)', paddingBottom: 14 }}>
        Agent <strong style={{ color:'var(--fg-2)' }}>Niamey · Rhodésie</strong> · synchronisé il y a 2 min
      </div>
    </div>
  );
};

Object.assign(window, { HistoryScreen, KYCScreen, RechargeScreen, DepositScreen, SettingsScreen, AgentSettingsScreen, TxMenuScreen });
