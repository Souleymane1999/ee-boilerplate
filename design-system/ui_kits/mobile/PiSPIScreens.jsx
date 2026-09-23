// PiSPI mobile screens — first pass from the current Flutter app flows.
const PISPI_TX = [
  { id: 1, name: 'Mamadou Diallo', title: 'Transfert envoyé', amount: -48200, when: '7 juin, 11:56', statusLabel: 'Envoyé', tone: 'brand', method: 'Alias PI', ref: 'PI-2406-7721' },
  { id: 2, name: 'Awa Traoré', title: 'Paiement reçu', amount: 12500, when: '7 juin, 10:24', statusLabel: 'Reçu', tone: 'success', method: 'Request to Pay', ref: 'PI-2406-7716' },
  { id: 3, name: 'NIGELEC · Facture', title: 'Facture', amount: -18450, when: '6 juin, 18:14', statusLabel: 'En attente', tone: 'warning', method: 'IBAN', ref: 'PI-2406-7698' },
  { id: 4, name: 'Amina Oumarou', title: 'Demande de paiement', amount: 25000, when: '6 juin, 16:42', statusLabel: 'Reçu', tone: 'warning', method: 'Request to Pay', ref: 'PI-2406-7687' },
  { id: 5, name: 'Ali Issoufou', title: 'Transfert envoyé', amount: -35000, when: '5 juin, 12:05', statusLabel: 'Envoyé', tone: 'brand', method: 'Alias PI', ref: 'PI-2406-7651' },
  { id: 6, name: 'Recharge Airtel', title: 'Recharge', amount: -2050, when: '5 juin, 08:42', statusLabel: 'Succès', tone: 'info', method: 'Autre compte', ref: 'PI-2406-7642' },
  { id: 7, name: 'Hadiza Abdou', title: 'Paiement reçu', amount: 7500, when: '4 juin, 19:18', statusLabel: 'Reçu', tone: 'success', method: 'Alias PI', ref: 'PI-2406-7609' },
];

const PISPI_CONTACTS = [
  { name: 'Mamadou Diallo', alias: '+227 77 540 19 32', tone: 'brand' },
  { name: 'Awa Traoré', alias: 'awa.tr@pi', tone: 'success' },
  { name: 'Koffi Mensah', alias: 'koffi.m@pi', tone: 'info' },
];

const PiSPIAvatar = ({ name, tone = 'brand' }) => {
  const initials = name.split(' ').map(s => s[0]).slice(0, 2).join('').toUpperCase();
  return <div className={`pispi-avatar ${tone}`}>{initials}</div>;
};

const PiSPIDock = ({ current = 'home', onSend }) => (
  <div className="pispi-dock-wrap">
    <div className="pispi-dock">
      <button className={current === 'home' ? 'active' : ''}><M_Icon name="home" /><span>Accueil</span></button>
      <button><M_Icon name="qr-code" /><span>QR Code</span></button>
      <button className="send" onClick={onSend}><M_Icon name="arrow-up-right" /><span>Envoyer</span></button>
    </div>
  </div>
);

const PiSPIRecentRow = ({ tx, onClick }) => (
  <button className="pispi-tx-row" onClick={onClick}>
    <span className="pispi-tx-avatar-wrap">
      <PiSPIAvatar name={tx.name} tone={tx.tone} />
      <span className={`pispi-tx-direction ${tx.amount > 0 ? 'incoming' : 'outgoing'}`}>
        <M_Icon name={tx.amount > 0 ? 'arrow-down-left' : 'arrow-up-right'} />
      </span>
    </span>
    <span className="body">
      <span className="name">{tx.name}</span>
      <span className="meta">{tx.title} · {tx.when}</span>
    </span>
    <span className="amount">
      <span className={tx.amount > 0 ? 'pos' : ''}>{tx.amount > 0 ? '+' : '-'}{fmtCFA(tx.amount)} CFA</span>
      <span className="status">{tx.statusLabel}</span>
    </span>
  </button>
);

const PiSPIMainAppHomeScreen = ({ onOpenPi }) => {
  const [nav, setNav] = React.useState('home');
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); }, [nav]);
  const appRows = window.HOME_TX || [];

  return (
    <div className="phone-screen" data-screen-label="Accueil application PI">
      <div className="balance-hero">
        <StatusBar onDark />
        <div style={{ padding: '14px 6px 0' }}>
          <div className="greet">Solde disponible · Moustapha K.</div>
          <div className="amt">284.910 <span style={{ fontSize: 22, fontWeight: 600, color: '#9A9A90' }}>CFA</span></div>
          <div className="sub">↑ 12.420 CFA aujourd'hui</div>
        </div>
      </div>

      <div className="quick-actions pispi-main-shortcuts">
        <div className="qa"><M_Icon name="arrow-up-right" /><span>Envoyer</span></div>
        <div className="qa"><M_Icon name="arrow-down-left" /><span>Recharger</span></div>
        <div className="qa"><M_Icon name="qr-code" /><span>Scanner</span></div>
        <div className="qa"><M_Icon name="receipt-text" /><span>Factures</span></div>
      </div>

      <div className="content">
        <div className="pispi-main-section-row">
          <div>Services</div>
          <span>Disponible</span>
        </div>

        <div className="pispi-main-service-list">
          <button className="pispi-main-service-row" onClick={onOpenPi}>
            <span className="service-logo" aria-hidden="true">
              <span className="service-logo-pi-mark"><img src="assets/logo-spi-dark.png" alt="" /></span>
            </span>
            <span className="service-copy">
              <strong>PI-SPI</strong>
            </span>
            <span className="service-tag">Ouvrir</span>
            <M_Icon name="chevron-right" />
          </button>
        </div>

        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', padding:'4px 20px 6px' }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--fg-1)' }}>Mes transactions</div>
          <span style={{ fontSize: 12, color: 'var(--brand-lime-700)', fontWeight: 600 }}>Voir tout</span>
        </div>

        <div className="m-list">
          {appRows.map(t => <M_TxRow key={t.id} tx={t} onClick={() => {}} />)}
        </div>
        <div style={{ height: 12 }}></div>
      </div>

      <TabBar current={nav} onNav={setNav} />
    </div>
  );
};

const PiSPIHomeScreen = ({ onSend, onReceive, onSelectTx, onBack, onShowAll }) => {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  return (
    <div className="phone-screen pispi-screen" data-screen-label="PiSPI Accueil">
      <div className="pispi-home-hero">
        <StatusBar />
        <div className="pispi-home-bar">
          <div className="pispi-brand-group">
            {onBack && (
              <button className="pispi-home-back" onClick={onBack} aria-label="Retour">
                <M_Icon name="chevron-left" />
              </button>
            )}
            <button className="pispi-profile-button" aria-label="Profil">
              <PiSPIAvatar name="Moustapha K." tone="brand" />
            </button>
            <div className="pispi-brand-lockup" aria-label="SPI BCEAO">
              <span className="pispi-home-logo-crop"><img src="assets/logo-spi-light.png" alt="SPI BCEAO" /></span>
            </div>
          </div>
          <div className="pispi-home-icons">
            <button><M_Icon name="search" /></button>
            <button><M_Icon name="bar-chart-3" /></button>
            <button><M_Icon name="bell" /></button>
          </div>
        </div>
        <div className="pispi-home-tabs">
          <span className="active">Compte</span>
          <span>Abonnements</span>
          <span>Économie</span>
        </div>
      </div>

      <div className="pispi-content">
        <section className="pispi-balance-card">
          <div>
            <div className="kicker">Solde SPI disponible</div>
            <div className="balance">284.910 <span>CFA</span></div>
            <div className="sub"><M_Icon name="trending-up" /> +12.420 CFA aujourd'hui</div>
          </div>
          <button className="pispi-eye"><M_Icon name="eye-off" /></button>
        </section>

        <div className="pispi-actions">
          <button onClick={onSend}><span><M_Icon name="arrow-up-right" /></span>Envoyer</button>
          <button onClick={onReceive}><span><M_Icon name="arrow-down-left" /></span>Recevoir</button>
          <button><span><M_Icon name="more-horizontal" /></span>Plus</button>
        </div>

        <section className="pispi-section-head">
          <div>
            <h3>Dernières transactions</h3>
            <p>Transactions traitées sur le réseau PI/SPI</p>
          </div>
        </section>

        <div className="pispi-list-card">
          {PISPI_TX.slice(0, 3).map(tx => (
            <PiSPIRecentRow key={tx.id} tx={tx} onClick={() => onSelectTx && onSelectTx(tx)} />
          ))}
          <button className="pispi-show-all" onClick={onShowAll || (() => {})}>Tout afficher</button>
        </div>
      </div>

      <PiSPIDock current="home" onSend={onSend} />
    </div>
  );
};

const PiSPIAccountSwitchScreen = ({ onBack }) => {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  const accounts = [
    { initials: 'PI', title: 'Compte courant PI', subtitle: 'Alias moustapha.k@pi', balance: '284.910 CFA', active: true },
    { initials: 'EP', title: 'Épargne projet', subtitle: 'Solde et historique dédiés', balance: '78.400 CFA' },
    { initials: 'PR', title: 'Compte professionnel', subtitle: 'Transactions professionnelles', balance: '1.204.500 CFA' },
  ];

  return (
    <div className="phone-screen pispi-screen" data-screen-label="PiSPI Choix compte">
      <div className="pispi-home-hero">
        <StatusBar />
        <div className="pispi-home-bar">
          <div className="pispi-brand-group">
            <button className="pispi-home-back" onClick={onBack || (() => {})} aria-label="Retour">
              <M_Icon name="chevron-left" />
            </button>
            <button className="pispi-profile-button" aria-label="Profil">
              <PiSPIAvatar name="Moustapha K." tone="brand" />
            </button>
            <div className="pispi-brand-lockup" aria-label="SPI BCEAO">
              <span className="pispi-home-logo-crop"><img src="assets/logo-spi-light.png" alt="SPI BCEAO" /></span>
            </div>
          </div>
          <div className="pispi-home-icons">
            <button><M_Icon name="search" /></button>
            <button><M_Icon name="bell" /></button>
          </div>
        </div>
        <div className="pispi-home-tabs">
          <span className="active">Compte</span>
          <span>Abonnements</span>
          <span>Économie</span>
        </div>
      </div>

      <div className="pispi-content">
        <section className="pispi-balance-card pispi-account-balance-card">
          <div>
            <div className="kicker">Compte sélectionné</div>
            <div className="balance">284.910 <span>CFA</span></div>
            <div className="sub"><M_Icon name="refresh-cw" /> Données actualisées</div>
          </div>
          <button className="pispi-eye"><M_Icon name="chevron-down" /></button>
        </section>

        <section className="pispi-section-head">
          <div>
            <h3>Choisir un compte</h3>
            <p>Le solde et les transactions suivent le compte sélectionné.</p>
          </div>
        </section>

        <div className="pispi-option-list pispi-account-switch-list">
          {accounts.map(account => (
            <button className={`pispi-option-row ${account.active ? 'active' : ''}`} key={account.title}>
              <span className="icon account-initials">{account.initials}</span>
              <span className="body"><strong>{account.title}</strong><small>{account.subtitle}</small></span>
              <span className="pispi-account-balance">{account.balance}</span>
            </button>
          ))}
        </div>

        <div className="pispi-compliance-note">
          <M_Icon name="shield-check" />
          <span>La sélection du compte s’effectue depuis l’accueil. Les données affichées sont synchronisées avec le compte actif.</span>
        </div>
      </div>

      <PiSPIDock current="home" />
    </div>
  );
};

const PiSPISendOptionsScreen = ({ onBack, mode = 'default' } = {}) => {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  const searchActive = mode === 'search-active';
  const qrFocus = mode === 'qr-focus';
  const ibanDisabled = mode === 'iban-disabled';
  const contactPermission = mode === 'contact-permission';
  const addAlias = mode === 'add-alias' || mode === 'add-alias-success';
  const optionRows = [
    { icon: 'contact', title: 'Par Alias', text: 'Adresse de paiement ou n° de téléphone' },
    { icon: 'files', title: 'Par numéro de compte', text: 'IBAN, RIB, n° de téléphone ou autre' },
  ];
  const searchResults = [
    { name: 'Mamadou Diallo', phone: 'mamadou.d@pi', tone: 'brand', alias: true },
    { name: 'Awa Traoré', phone: '+227 90 24 76 36', tone: 'success' },
  ];
  const recentTransfers = [
    { name: 'Mamadou Diallo', meta: 'Vous avez envoyé 10 000', date: '18 mai', tone: 'brand', direction: 'sent' },
    { name: 'Awa Traoré', meta: 'Vous avez reçu 50 000', date: '21 févr.', tone: 'success', direction: 'received' },
  ];
  const contacts = [
    { name: 'Amina Oumarou', phone: '90 24 76 36', tone: 'warning' },
    { name: 'Ali Issoufou', phone: '+227 96 74 98 31', tone: 'brand' },
    { name: 'Hadiza Abdou', phone: '+227 91 40 18 22', tone: 'info' },
  ];

  const contactRows = (
    <div className="pispi-send-contact-list">
      <div className="pispi-send-letter">A</div>
      {contacts.map(contact => (
        <button className="pispi-send-contact-row" key={contact.name}>
          <span className="pispi-contact-avatar-wrap">
            <PiSPIAvatar name={contact.name} tone={contact.tone} />
            {contact.name !== 'Amina Oumarou' && <span className="pispi-contact-pi-badge"><img src="assets/logo-spi-dark.png" alt="" /></span>}
          </span>
          <span className="body"><strong>{contact.name}</strong><small>{contact.phone}</small></span>
        </button>
      ))}
    </div>
  );

  if (addAlias) {
    return (
      <div className="phone-screen pispi-screen pispi-send-screen" data-screen-label="PiSPI Alias contact">
        <StatusBar />
        <MNav title="Amina Oumarou" onBack={onBack || (() => {})} />
        <div className="pispi-content compact">
          <section className="pispi-new-contact-card">
            <span><M_Icon name="at-sign" /></span>
            <span className="body"><strong>Ajouter un alias PI</strong><small>Le contact sera mis à jour avec le tag @PI.</small></span>
          </section>
          <div className="pispi-form-card pispi-contact-form-card">
            <label>Prénoms et nom</label>
            <div className="pispi-input-line"><M_Icon name="user-round" /><span>Amina Oumarou</span></div>
            <label>Alias</label>
            <div className="pispi-input-line">
              <M_Icon name="at-sign" />
              <span>{mode === 'add-alias-success' ? 'amina.oumarou@pi' : 'Coller ou saisir un alias'}</span>
              <button type="button" className="pispi-paste-mini"><M_Icon name="clipboard" /> Coller</button>
            </div>
          </div>
          {mode === 'add-alias-success' && <div className="pispi-inline-toast success"><M_Icon name="check" /> Alias enregistré dans les contacts du téléphone.</div>}
        </div>
        <div className="pispi-form-actions"><button className="pispi-secondary-cta">Annuler</button><button className="cta">Enregistrer et continuer</button></div>
      </div>
    );
  }

  if (contactPermission) {
    return (
      <div className="phone-screen pispi-screen pispi-send-screen" data-screen-label="PiSPI Permission contacts">
        <StatusBar />
        <MNav title="Contacts" onBack={onBack || (() => {})} />
        <div className="pispi-content compact">
          <section className="pispi-contact-permission">
            <span><M_Icon name="contact-round" /></span>
            <h2>Autoriser l'accès aux contacts</h2>
            <p>PI-SPI peut afficher votre carnet pour sélectionner rapidement un bénéficiaire et gérer ses alias.</p>
            <button type="button">Autoriser les contacts</button>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="phone-screen pispi-screen pispi-send-screen" data-screen-label="PiSPI Envoyer">
      <StatusBar />
      <div className="pispi-send-topbar">
        <button className="btn back" onClick={onBack || (() => {})} aria-label="Retour"><M_Icon name="chevron-left" /></button>
        <div className={`pispi-send-search ${searchActive ? 'is-active' : ''}`}>
          <M_Icon name="search" />
          <span>{searchActive ? 'awa' : 'Rechercher un contact'}</span>
        </div>
        <button className={`btn scan ${qrFocus ? 'is-focused' : ''}`} aria-label="Scanner un QR Code"><M_Icon name="scan-line" /></button>
      </div>

      <div className="pispi-content compact pispi-send-content">
        {searchActive ? (
          <>
            <section className="pispi-section-head tight pispi-send-heading"><div><h3>Résultats</h3></div></section>
            <div className="pispi-send-contact-list">
              {searchResults.map(contact => (
                <button className="pispi-send-contact-row" key={contact.name}>
                  <span className="pispi-contact-avatar-wrap">
                    <PiSPIAvatar name={contact.name} tone={contact.tone} />
                    {contact.alias && <span className="pispi-contact-pi-badge"><img src="assets/logo-spi-dark.png" alt="" /></span>}
                  </span>
                  <span className="body"><strong>{contact.name}</strong><small>{contact.phone}</small></span>
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <section className="pispi-section-head tight pispi-send-heading">
              <div><h3>Envoi</h3></div>
            </section>

            <div className="pispi-option-list pispi-send-options">
              {optionRows.map(item => (
                <button className="pispi-option-row" key={item.title}>
                  <span className="icon"><M_Icon name={item.icon} /></span>
                  <span className="body"><strong>{item.title}</strong><small>{item.text}</small></span>
                  <M_Icon name="chevron-right" />
                </button>
              ))}
              {ibanDisabled && (
                <button className="pispi-option-row disabled">
                  <span className="icon neutral"><M_Icon name="landmark" /></span>
                  <span className="body"><strong>Par IBAN</strong><small>Ancienne version uniquement · non disponible</small></span>
                  <span className="pill-badge">désactivé</span>
                </button>
              )}
            </div>

            <div className="pispi-option-list pispi-send-options single">
              <button className="pispi-option-row">
                <span className="icon"><M_Icon name="user-round-plus" /></span>
                <span className="body"><strong>Nouveau contact</strong><small>Ajouter un contact avec son alias</small></span>
                <M_Icon name="chevron-right" />
              </button>
            </div>

            <section className="pispi-section-head tight pispi-send-heading">
              <div><h3>Transactions récentes</h3></div>
            </section>
            <div className="pispi-send-list-card">
              {recentTransfers.map(item => (
                <button className="pispi-send-recent-row" key={item.name}>
                  <span className="pispi-send-avatar-wrap">
                    <PiSPIAvatar name={item.name} tone={item.tone} />
                    <span className={`pispi-send-direction ${item.direction}`}><M_Icon name={item.direction === 'sent' ? 'arrow-left' : 'arrow-right'} /></span>
                  </span>
                  <span className="body"><strong>{item.name}</strong><small>{item.meta}</small></span>
                  <span className="date">{item.date}</span>
                </button>
              ))}
            </div>

            <section className="pispi-section-head tight pispi-send-heading">
              <div><h3>Contacts</h3></div>
            </section>
            {contactRows}
          </>
        )}
      </div>
    </div>
  );
};

const PiSPIRequestOptionsScreen = ({ onBack, mode = 'default' } = {}) => {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); }, [mode]);
  const searchActive = mode === 'search-active';
  const qrFocus = mode === 'qr-focus';
  const contactPermission = mode === 'contact-permission';
  const optionRows = [
    { icon: 'contact', title: 'Par alias', text: 'Adresse de paiement du destinataire' },
  ];
  const recentRequests = [
    { name: 'Mamadou Diallo', meta: 'Demande envoyée 10.000', date: '18 mai', tone: 'brand', direction: 'sent' },
    { name: 'Awa Traoré', meta: 'Vous avez reçu 50.000', date: '21 févr.', tone: 'success', direction: 'received' },
  ];
  const contacts = [
    { name: 'Amina Oumarou', phone: '90 24 76 36', tone: 'warning' },
    { name: 'Ali Issoufou', phone: '+227 96 74 98 31', tone: 'brand' },
    { name: 'Awa Traoré', phone: 'awa.tr@pi', tone: 'success' },
    { name: 'Abdou Karim', phone: '+227 91 40 18 22', tone: 'info' },
  ];
  const searchResults = [
    { name: 'Awa Traoré', phone: 'awa.tr@pi', tone: 'success', alias: true },
    { name: 'Amina Oumarou', phone: '90 24 76 36', tone: 'warning' },
  ];

  if (contactPermission) {
    return (
      <div className="phone-screen pispi-screen pispi-send-screen pispi-request-screen" data-screen-label="PiSPI Demande paiement contacts">
        <StatusBar />
        <MNav title="Contacts" onBack={onBack || (() => {})} />
        <div className="pispi-content compact">
          <section className="pispi-contact-permission">
            <span><M_Icon name="contact-round" /></span>
            <h2>Autoriser l'accès aux contacts</h2>
            <p>PI-SPI peut afficher votre carnet pour sélectionner rapidement un payeur et gérer ses alias.</p>
            <button type="button">Autoriser les contacts</button>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="phone-screen pispi-screen pispi-send-screen pispi-request-screen" data-screen-label="PiSPI Demande paiement">
      <StatusBar />
      <div className="pispi-send-topbar">
        <button className="btn back" onClick={onBack || (() => {})} aria-label="Retour"><M_Icon name="chevron-left" /></button>
        <div className={`pispi-send-search ${searchActive ? 'is-active' : ''}`}>
          <M_Icon name="search" />
          <span>{searchActive ? 'awa' : 'Rechercher un contact'}</span>
        </div>
        <button className={`btn scan ${qrFocus ? 'is-focused' : ''}`} aria-label="Scanner un QR Code"><M_Icon name="scan-line" /></button>
      </div>

      <div className="pispi-content compact pispi-send-content">
        {searchActive ? (
          <>
            <section className="pispi-section-head tight pispi-send-heading"><div><h3>Résultats</h3></div></section>
            <div className="pispi-send-contact-list">
              {searchResults.map(contact => (
                <button className="pispi-send-contact-row" key={contact.name}>
                  <span className="pispi-contact-avatar-wrap">
                    <PiSPIAvatar name={contact.name} tone={contact.tone} />
                    {contact.alias && <span className="pispi-contact-pi-badge"><img src="assets/logo-spi-dark.png" alt="" /></span>}
                  </span>
                  <span className="body"><strong>{contact.name}</strong><small>{contact.phone}</small></span>
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <section className="pispi-section-head tight pispi-send-heading">
              <div><h3>Demande de paiement</h3></div>
            </section>

            <div className="pispi-option-list pispi-send-options">
              {optionRows.map(item => (
                <button className="pispi-option-row" key={item.title}>
                  <span className="icon"><M_Icon name={item.icon} /></span>
                  <span className="body"><strong>{item.title}</strong><small>{item.text}</small></span>
                  <M_Icon name="chevron-right" />
                </button>
              ))}
            </div>

            <div className="pispi-option-list pispi-send-options single">
              <button className="pispi-option-row">
                <span className="icon"><M_Icon name="user-round-plus" /></span>
                <span className="body"><strong>Nouveau contact</strong><small>Ajouter un contact avec son alias</small></span>
                <M_Icon name="chevron-right" />
              </button>
            </div>

            <section className="pispi-section-head tight pispi-send-heading">
              <div><h3>Transactions récentes</h3></div>
            </section>
            <div className="pispi-send-list-card">
              {recentRequests.map(item => (
                <button className="pispi-send-recent-row" key={item.name}>
                  <span className="pispi-send-avatar-wrap">
                    <PiSPIAvatar name={item.name} tone={item.tone} />
                    <span className={`pispi-send-direction ${item.direction}`}><M_Icon name={item.direction === 'sent' ? 'arrow-left' : 'arrow-right'} /></span>
                  </span>
                  <span className="body"><strong>{item.name}</strong><small>{item.meta}</small></span>
                  <span className="date">{item.date}</span>
                </button>
              ))}
            </div>

            <section className="pispi-section-head tight pispi-send-heading">
              <div><h3>Contacts</h3></div>
            </section>
            <div className="pispi-send-contact-list">
              <div className="pispi-send-letter">A</div>
              {contacts.map(contact => (
                <button className="pispi-send-contact-row" key={contact.name}>
                  <span className="pispi-contact-avatar-wrap">
                    <PiSPIAvatar name={contact.name} tone={contact.tone} />
                    {contact.phone.includes('@') && <span className="pispi-contact-pi-badge"><img src="assets/logo-spi-dark.png" alt="" /></span>}
                  </span>
                  <span className="body"><strong>{contact.name}</strong><small>{contact.phone}</small></span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const PiSPITransactionDetailScreen = ({ tx = PISPI_TX[0], onBack, mode = 'default', channel = 'alias' } = {}) => {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); }, [mode, channel]);
  const outgoing = tx.amount < 0;
  const incomingMode = mode === 'incoming';
  const failedMode = mode === 'failed' || mode === 'failed-return';
  const statusClass = failedMode ? 'm-badge-danger' : tx.statusLabel === 'En attente' ? 'm-badge-warning' : 'm-badge-success';
  const statusLabel = failedMode ? 'Échec' : tx.statusLabel;
  const cancelDisabled = mode === 'cancel-disabled';
  const showCancellationInfo = mode === 'cancellation-info';
  const showRefundInfo = mode === 'refund-info';
  const accountChannel = channel === 'account';
  const ibanChannel = channel === 'iban';
  const partyLabel = incomingMode ? 'Reçu de' : failedMode && mode === 'failed-return' ? 'Retour à' : 'Envoyé à';
  const counterpartyName = incomingMode || mode === 'failed-return' ? tx.name : 'Mamadou Diallo';
  const counterpartyAlias = incomingMode || mode === 'failed-return' ? 'awa.tr@pi' : 'mamadou.d@pi';
  const displayWhen = tx.when === '7 juin, 11:56' ? '7 juin, 15:17' : tx.when;
  return (
    <div className="phone-screen pispi-screen" data-screen-label="PiSPI Détail transaction">
      <StatusBar />
      <MNav title={failedMode ? 'Transaction échouée' : 'Détail transaction'} onBack={onBack || (() => {})} right={
        <button className="btn"><M_Icon name="more-horizontal" /></button>
      } />

      <div className="pispi-content compact">
        <section className="pispi-detail-hero">
          <div>
            <div className="detail-amount">{outgoing ? '-' : '+'}{fmtCFA(tx.amount)} <span>CFA</span></div>
            <div className="detail-party">{failedMode ? (mode === 'failed-return' ? 'Retour à' : 'Envoi à') : outgoing ? 'Payé à' : 'Reçu de'} <strong>{tx.name}</strong></div>
            <div className="detail-date">{displayWhen}</div>
          </div>
          <PiSPIAvatar name={tx.name} tone={tx.tone} />
        </section>

        <div className={`pispi-action-strip ${incomingMode ? 'three' : ''}`}>
          {incomingMode ? (
            <>
              <button><span><M_Icon name="arrow-up-right" /></span>Envoyer</button>
              <button><span><M_Icon name="arrow-down-left" /></span>Recevoir</button>
              <button><span><M_Icon name="rotate-ccw" /></span>Retourner</button>
            </>
          ) : (
            <>
              <button><span><M_Icon name="arrow-up-right" /></span>Envoyer</button>
              <button className={cancelDisabled ? 'disabled' : ''}><span><M_Icon name="x-circle" /></span>Annuler</button>
              <button><span><M_Icon name="split" /></span>Partager</button>
              <button><span><M_Icon name="calendar-plus" /></span>Planifier</button>
            </>
          )}
        </div>

        <div className="pispi-detail-card">
          <div className="pispi-info-row"><span>Statut</span><strong className={`m-badge ${statusClass}`}>{statusLabel}</strong></div>
          <div className="pispi-info-row"><span>Mode</span><strong>{tx.method}</strong></div>
          <div className="pispi-info-row"><span>Référence</span><strong className="mono">{tx.ref}</strong><PiSPICopyMini label="Copier la référence" /></div>
          <div className="pispi-info-row"><span>Identifiant</span><strong className="mono">TX-MD-240607</strong><PiSPICopyMini label="Copier l'identifiant" /></div>
          <div className="pispi-info-row"><span>Frais</span><strong>0 CFA</strong></div>
          <div className="pispi-info-row"><span>Motif</span><strong>{incomingMode ? 'Paiement reçu' : 'Règlement facture'}</strong></div>
          {failedMode && <div className="pispi-info-row"><span>Raison du rejet</span><strong>Compte bénéficiaire indisponible</strong></div>}
          {showCancellationInfo && <div className="pispi-info-row"><span>Demande d'annulation</span><strong>7 juin, 16:02</strong></div>}
          {showRefundInfo && <div className="pispi-info-row"><span>Retour de fonds irrévocable</span><strong>8 juin, 10:45</strong></div>}
        </div>

        <div className="pispi-detail-card pispi-beneficiary-card">
          <div className="pispi-info-row"><span>{partyLabel}</span><strong>{counterpartyName}</strong></div>
          <div className="pispi-info-row"><span>Pays</span><strong>Niger</strong></div>
          <div className="pispi-info-row"><span>Institution financière</span><strong>BIA Niger</strong></div>
          {accountChannel || ibanChannel ? (
            <div className="pispi-info-row"><span>{ibanChannel ? 'IBAN' : 'Numéro de compte'}</span><strong className="mono">{ibanChannel ? 'NE58 BIA 01001 000012345678' : '01001 000012345678'}</strong><PiSPICopyMini label="Copier le numéro de compte" /></div>
          ) : (
            <div className="pispi-info-row alias-copy-row"><span>Alias</span><strong>{counterpartyAlias}</strong><PiSPICopyMini label="Copier l'alias" /></div>
          )}
          <button className="pispi-beneficiary-save" type="button"><M_Icon name="user-plus" /> Enregistrer dans les contacts</button>
        </div>

        <div className="pispi-option-list detached">
          <button className="pispi-option-row">
            <span className="icon"><M_Icon name="file-down" /></span>
            <span className="body"><strong>Reçu du paiement</strong><small>Télécharger ou partager le reçu</small></span>
            <M_Icon name="chevron-right" />
          </button>
          <button className="pispi-option-row">
            <span className="icon"><M_Icon name="tag" /></span>
            <span className="body"><strong>Catégorie</strong><small>Ajouter une catégorie analytique</small></span>
            <span className="pill-badge neutral">Aucune</span>
          </button>
          <button className="pispi-option-row">
            <span className="icon"><M_Icon name="receipt-text" /></span>
            <span className="body"><strong>Ticket de caisse</strong><small>Ajouter une pièce justificative</small></span>
            <M_Icon name="plus" />
          </button>
        </div>

        <div className="pispi-note-card">
          <M_Icon name="bar-chart-3" />
          <div><strong>Analytique</strong><span>Cette transaction est incluse dans les statistiques du compte.</span></div>
          <span className="m-switch on"></span>
        </div>
      </div>
    </div>
  );
};

const PiSPICancellationRequestScreen = ({ mode = 'default' } = {}) => {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); }, [mode]);
  const success = mode === 'success';
  const reasons = [
    ['user-x', 'Mauvais bénéficiaire', 'Le paiement a été envoyé au mauvais destinataire.'],
    ['badge-x', 'Montant incorrect', 'Le montant envoyé ne correspond pas au montant prévu.'],
    ['copy-x', 'Paiement en double', 'La même opération a été exécutée plusieurs fois.'],
    ['package-x', 'Service non fourni', "Le service ou le bien n'a pas été livré."],
    ['message-square', 'Autre raison', 'Ajouter une précision à la demande.'],
  ];
  return (
    <div className={`phone-screen pispi-screen ${success ? 'pispi-cancel-modal-screen' : ''}`} data-screen-label="PiSPI Demande annulation">
      <StatusBar />
      <MNav title="Demande d'annulation" onBack={() => {}} />
      <div className="pispi-content compact">
        <section className="pispi-form-title">
          <h2>Demande d'annulation</h2>
          <p>Quelle est la raison de la demande ?</p>
        </section>
        <div className="pispi-option-list pispi-cancel-reasons">
          {reasons.map(([icon, title, text], index) => (
            <button className={index === 0 ? 'pispi-option-row active' : 'pispi-option-row'} type="button" key={title}>
              <span className="icon"><M_Icon name={icon} /></span>
              <span className="body"><strong>{title}</strong><small>{text}</small></span>
              {index === 0 && <M_Icon name="check" />}
            </button>
          ))}
        </div>
        <div className="pispi-compliance-note"><M_Icon name="info" /><span>La demande est envoyée directement au réseau SPI sans authentification supplémentaire.</span></div>
      </div>
      <div className="cta-bar"><button className="cta">Demander l'annulation</button></div>
      {success && (
        <>
          <div className="pispi-modal-dim"></div>
          <section className="pispi-result-sheet pispi-transfer-result">
            <div className="pispi-result-icon"><M_Icon name="check" /></div>
            <h2>Demande d'annulation envoyée</h2>
            <p>La demande est en attente d'acceptation. Vous serez notifié dès que le bénéficiaire aura répondu.</p>
            <button type="button">Continuer</button>
          </section>
        </>
      )}
    </div>
  );
};

const PiSPIPaymentShareScreen = ({ mode = 'select' } = {}) => {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); }, [mode]);
  const permission = mode === 'permission';
  const form = mode === 'form' || mode === 'sent';
  const addAlias = mode.startsWith('add-alias');
  const phoneAliasError = mode === 'phone-alias-error' || mode === 'add-alias-phone-error';
  const selected = [
    { name: 'Awa Traoré', alias: 'awa.tr@pi', tone: 'success', hasAlias: true },
    { name: 'Mamadou Diallo', alias: 'mamadou.d@pi', tone: 'brand', hasAlias: true },
  ];
  const contacts = [
    ...selected,
    { name: 'Ali Issoufou', alias: '+227 96 74 98 31', tone: 'info', hasAlias: false },
    { name: 'Amina Oumarou', alias: '90 24 76 36', tone: 'warning', hasAlias: false },
  ];

  if (permission) {
    return (
      <div className="phone-screen pispi-screen" data-screen-label="PiSPI Partage contacts permission">
        <StatusBar />
        <MNav title="Partager avec" onBack={() => {}} />
        <div className="pispi-content compact">
          <section className="pispi-contact-permission">
            <span><M_Icon name="contact-round" /></span>
            <h2>Autoriser les contacts</h2>
            <p>PI-SPI peut afficher vos contacts pour sélectionner les personnes avec qui partager ce paiement.</p>
            <button type="button">Autoriser l'accès</button>
          </section>
        </div>
      </div>
    );
  }

  if (addAlias) {
    return (
      <div className="phone-screen pispi-screen" data-screen-label="PiSPI Partage ajout alias">
        <StatusBar />
        <MNav title="Ali Issoufou" onBack={() => {}} />
        <div className="pispi-content compact">
          <section className="pispi-form-title">
            <h2>Ajouter une adresse de paiement</h2>
            <p>Pour partager ce paiement, le contact doit avoir un alias de type adresse de paiement.</p>
          </section>
          <div className="pispi-form-card">
            <label>Nom du contact</label>
            <div className="pispi-input-line is-locked"><M_Icon name="user-round" /><span>Ali Issoufou</span><M_Icon name="lock-keyhole" /></div>
            <label>Alias</label>
            <div className={`pispi-input-line ${phoneAliasError ? 'has-error' : ''}`}><M_Icon name="at-sign" /><span>{phoneAliasError ? '+227 96 74 98 31' : 'ali.issoufou@pi'}</span><button type="button" className="pispi-paste-mini"><M_Icon name="clipboard" /> Coller</button></div>
            {phoneAliasError && <p className="pispi-field-error">L'alias doit être une adresse de paiement, pas un numéro de téléphone.</p>}
          </div>
          {mode === 'add-alias-success' && <div className="pispi-inline-toast success"><M_Icon name="check" /> Alias enregistré avec le tag @PI.</div>}
        </div>
        <div className="cta-bar"><button className="cta">Enregistrer et continuer</button></div>
      </div>
    );
  }

  if (form) {
    return (
      <div className={`phone-screen pispi-screen ${mode === 'sent' ? 'pispi-cancel-modal-screen' : ''}`} data-screen-label="PiSPI Partage paiement">
        <StatusBar />
        <MNav title="Partager le paiement" onBack={() => {}} />
        <div className="pispi-content compact">
          <section className="pispi-form-title">
            <h2>Partager le paiement</h2>
            <p>Répartissez le montant entre les contacts sélectionnés.</p>
          </section>
          <div className="pispi-detail-card">
            <div className="pispi-info-row"><span>Paiement partagé</span><strong>PI-2406-7721</strong></div>
            <div className="pispi-info-row"><span>Montant initial</span><strong>48.200 CFA</strong></div>
            <div className="pispi-info-row"><span>Votre part</span><strong>16.068 CFA</strong></div>
          </div>
          <div className="pispi-form-card">
            {selected.map((contact, index) => (
              <React.Fragment key={contact.name}>
                <label>{contact.name}</label>
                <div className="pispi-input-line"><PiSPIAvatar name={contact.name} tone={contact.tone} /><span>{index === 0 ? '16.066 CFA' : '16.066 CFA'}</span></div>
              </React.Fragment>
            ))}
          </div>
          <div className="pispi-compliance-note"><M_Icon name="bell" /><span>Les demandes envoyées seront visibles dans les notifications.</span></div>
        </div>
        <div className="cta-bar"><button className="cta">Partager le paiement</button></div>
        {mode === 'sent' && (
          <>
            <div className="pispi-modal-dim"></div>
            <section className="pispi-result-sheet pispi-transfer-result">
              <div className="pispi-result-icon"><M_Icon name="check" /></div>
              <h2>Demandes envoyées</h2>
              <p>Les demandes de paiement ont été envoyées aux contacts sélectionnés.</p>
              <button type="button">Continuer</button>
            </section>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="phone-screen pispi-screen" data-screen-label="PiSPI Partager avec">
      <StatusBar />
      <MNav title="Partager avec" onBack={() => {}} />
      <div className="pispi-content compact">
        <div className="pispi-search-field"><M_Icon name="search" /><span>Rechercher un contact</span></div>
        <section className="pispi-selected-contacts">
          <h3>Contacts sélectionnés</h3>
          <div>{selected.map(contact => <span key={contact.name}>{contact.name}</span>)}</div>
        </section>
        <div className="pispi-send-letter">A</div>
        <div className="pispi-contact-list">
          {contacts.map(contact => (
            <button className="pispi-contact-alias-row" type="button" key={contact.name}>
              <span className="pispi-contact-avatar-wrap">
                <PiSPIAvatar name={contact.name} tone={contact.tone} />
                {contact.hasAlias && <span className="pispi-contact-pi-badge">π</span>}
              </span>
              <span className="body"><strong>{contact.name}</strong><small>{contact.alias}</small></span>
              {selected.some(item => item.name === contact.name) ? <M_Icon name="check" /> : <M_Icon name="chevron-right" />}
            </button>
          ))}
        </div>
      </div>
      <div className="cta-bar"><button className="cta">Continuer</button></div>
    </div>
  );
};

const PiSPIReceiptScreen = ({ mode = 'alias' } = {}) => {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); }, [mode]);
  const accountMode = mode === 'account';
  const receivedMode = mode.startsWith('received');
  const feeMode = mode === 'fee' || mode === 'received-fee';
  return (
    <div className="phone-screen pispi-screen" data-screen-label="PiSPI Reçu envoi">
      <StatusBar />
      <MNav title="Reçu de l'envoi" onBack={() => {}} />
      <div className="pispi-content compact">
        <section className="pispi-receipt-brand"><img src="assets/logo-spi-dark.png" alt="SPI BCEAO" /></section>
        <div className="pispi-detail-card">
          <div className="pispi-info-row"><span>Référence</span><strong className="mono">PI-2406-7721-ENDTOEND-00048200</strong><PiSPICopyMini label="Copier la référence" /></div>
          <div className="pispi-info-row"><span>Identifiant</span><strong className="mono">TX-MD-240607-1542</strong><PiSPICopyMini label="Copier l'identifiant" /></div>
          <div className="pispi-info-row"><span>Montant</span><strong>48.200 CFA</strong></div>
          <div className="pispi-info-row"><span>Frais</span><strong>{feeMode ? '1.250 CFA' : 'Gratuit'}</strong></div>
          <div className="pispi-info-row"><span>{receivedMode ? 'Reçu de' : 'Envoyé à'}</span><strong>{receivedMode ? 'Awa Traoré' : 'Mamadou Diallo'}</strong></div>
          {accountMode ? (
            <>
              <div className="pispi-info-row"><span>Numéro de compte</span><strong className="mono">01001 000012345678</strong></div>
              <div className="pispi-info-row"><span>Institution financière</span><strong>BIA Niger</strong></div>
            </>
          ) : (
            <div className="pispi-info-row"><span>Alias</span><strong>{receivedMode ? 'awa.tr@pi' : 'mamadou.d@pi'}</strong></div>
          )}
          <div className="pispi-info-row"><span>Date</span><strong>7 juin, 15:17</strong></div>
        </div>
      </div>
      <div className="cta-bar"><button className="cta"><M_Icon name="share-2" /> Partager</button></div>
    </div>
  );
};

const PiSPIReturnFundsScreen = ({ mode = 'confirm' } = {}) => {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); }, [mode]);
  const insufficient = mode === 'insufficient';
  const overlay = ['loading', 'success', 'failure', 'timeout'].includes(mode);

  if (mode === 'auth') {
    return (
      <div className="phone-screen pispi-screen pispi-claim-pin-screen" data-screen-label="PiSPI Retour fonds PIN">
        <StatusBar />
        <button type="button" className="pispi-claim-pin-back" aria-label="Retour"><M_Icon name="arrow-left" /></button>
        <section className="pispi-claim-pin-body">
          <div className="pispi-claim-pin-avatar">MK</div>
          <h2>Bonjour, Moustapha K.</h2>
          <p>Saisissez votre code PIN pour retourner les fonds.</p>
          <div className="pispi-claim-pin-grid" aria-label="Clavier code PIN">
            {[1,2,3,4,5,6,7,8,9].map(number => <button type="button" key={number}>{number}</button>)}
            <button type="button"><M_Icon name="fingerprint" /></button>
            <button type="button">0</button>
            <button type="button"><M_Icon name="delete" /></button>
          </div>
          <button type="button" className="pispi-claim-pin-forgot">Code PIN oublié?</button>
        </section>
      </div>
    );
  }

  return (
    <div className={`phone-screen pispi-screen pispi-return-screen ${overlay ? 'pispi-transfer-modal-screen' : ''}`} data-screen-label="PiSPI Retour de fonds">
      <div className="pispi-modal-underlay"><PiSPITransactionDetailScreen tx={PISPI_TX[1]} mode="incoming" /></div>
      <div className="pispi-modal-dim"></div>
      <section className="pispi-confirm-dialog pispi-return-dialog">
        <h2>Êtes-vous sûr de vouloir retourner les fonds ?</h2>
        <p>Vous allez retourner le paiement reçu de Awa Traoré.</p>
        <div className="pispi-return-summary">
          <span>Client payeur</span><strong>Awa Traoré</strong>
          <span>Montant</span><strong>12.500 CFA</strong>
        </div>
        {insufficient && <p className="pispi-return-warning"><M_Icon name="triangle-alert" /> Solde insuffisant pour retourner ce montant.</p>}
        <div>
          <button type="button" className={insufficient ? 'disabled' : ''}>OUI</button>
          <button type="button" className="secondary">NON</button>
        </div>
      </section>
      {overlay && (
        <section className={`pispi-result-sheet pispi-transfer-result ${mode === 'failure' || mode === 'timeout' ? 'is-danger' : ''}`}>
          {mode === 'loading' ? (
            <>
              <div className="pispi-transfer-spinner"></div>
              <h2>Retour en cours</h2>
              <p>Le retour de fonds est envoyé au réseau SPI.</p>
            </>
          ) : mode === 'success' ? (
            <>
              <div className="pispi-result-icon"><M_Icon name="check" /></div>
              <h2>Fonds retournés</h2>
              <p>Le retour de fonds est irrévocable. Awa Traoré sera notifiée.</p>
              <button type="button">Continuer</button>
            </>
          ) : mode === 'failure' ? (
            <>
              <div className="pispi-result-icon"><M_Icon name="x" /></div>
              <h2>Retour rejeté</h2>
              <p>Le retour de fonds n'a pas pu être exécuté. Vérifiez le motif puis réessayez.</p>
              <button type="button">Fermer</button>
            </>
          ) : (
            <>
              <div className="pispi-result-icon"><M_Icon name="clock-alert" /></div>
              <h2>Statut en attente</h2>
              <p>Le réseau SPI n'a pas confirmé le retour après 30 secondes.</p>
              <button type="button">Voir le statut</button>
            </>
          )}
        </section>
      )}
    </div>
  );
};

const PiSPICancellationDetailScreen = ({ mode = 'pending' } = {}) => {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); }, [mode]);
  const overlay = ['reject-success', 'loading', 'success', 'failure', 'timeout'].includes(mode);

  if (mode === 'auth') {
    return (
      <div className="phone-screen pispi-screen pispi-claim-pin-screen" data-screen-label="PiSPI Annulation PIN">
        <StatusBar />
        <button type="button" className="pispi-claim-pin-back" aria-label="Retour"><M_Icon name="arrow-left" /></button>
        <section className="pispi-claim-pin-body">
          <div className="pispi-claim-pin-avatar">MK</div>
          <h2>Bonjour, Moustapha K.</h2>
          <p>Saisissez votre code PIN pour accepter l'annulation.</p>
          <div className="pispi-claim-pin-grid" aria-label="Clavier code PIN">
            {[1,2,3,4,5,6,7,8,9].map(number => <button type="button" key={number}>{number}</button>)}
            <button type="button"><M_Icon name="fingerprint" /></button>
            <button type="button">0</button>
            <button type="button"><M_Icon name="delete" /></button>
          </div>
          <button type="button" className="pispi-claim-pin-forgot">Code PIN oublié?</button>
        </section>
      </div>
    );
  }

  const content = (
    <div className="phone-screen pispi-screen" data-screen-label="PiSPI Détail annulation">
      <StatusBar />
      <MNav title="Demande d'annulation" onBack={() => {}} />
      <div className="pispi-content compact">
        <section className="pispi-claim-hero">
          <span><M_Icon name="rotate-ccw" /></span>
          <div>
            <h2>Demande d'annulation</h2>
            <p>48.200 CFA · Référence PI-2406-7698</p>
          </div>
        </section>
        <div className="pispi-detail-card">
          <div className="pispi-info-row"><span>Référence</span><strong className="mono">PI-2406-7698</strong><PiSPICopyMini label="Copier la référence" /></div>
          <div className="pispi-info-row"><span>Reçu de</span><strong>Mamadou Diallo</strong></div>
          <div className="pispi-info-row"><span>Reçu à</span><strong>7 juin, 15:42</strong></div>
          <div className="pispi-info-row"><span>Pays</span><strong>Niger</strong></div>
          <div className="pispi-info-row"><span>Date de la demande</span><strong>7 juin, 16:02</strong></div>
          <div className="pispi-info-row"><span>Raison</span><strong>Mauvais bénéficiaire</strong></div>
          <div className="pispi-info-row"><span>Statut</span><strong className="m-badge m-badge-warning">En attente</strong></div>
        </div>
        <div className="pispi-claim-warning">
          <M_Icon name="triangle-alert" />
          <span>En acceptant, vous autorisez le retour des fonds au client payeur. Cette opération devient irrévocable après confirmation SPI.</span>
        </div>
        <div className="pispi-claim-actions">
          <button className="danger">Rejeter</button>
          <button className="active">Accepter</button>
        </div>
      </div>
    </div>
  );

  if (!overlay) return content;

  return (
    <div className="phone-screen pispi-screen pispi-return-screen pispi-transfer-modal-screen" data-screen-label="PiSPI Annulation modal">
      <div className="pispi-modal-underlay">{content}</div>
      <div className="pispi-modal-dim"></div>
      <section className={`pispi-result-sheet pispi-transfer-result ${mode === 'failure' || mode === 'timeout' ? 'is-danger' : ''}`}>
        {mode === 'reject-success' ? (
          <>
            <div className="pispi-result-icon"><M_Icon name="check" /></div>
            <h2>Annulation rejetée</h2>
            <p>La demande d'annulation est rejetée avec succès.</p>
            <button type="button">Continuer</button>
          </>
        ) : mode === 'loading' ? (
          <>
            <div className="pispi-transfer-spinner"></div>
            <h2>Retour en cours</h2>
            <p>Le retour de fonds est envoyé après acceptation de la demande.</p>
          </>
        ) : mode === 'success' ? (
          <>
            <div className="pispi-result-icon"><M_Icon name="check" /></div>
            <h2>Annulation acceptée</h2>
            <p>Le retour de fonds est irrévocable et la demande est clôturée.</p>
            <button type="button">Continuer</button>
          </>
        ) : mode === 'failure' ? (
          <>
            <div className="pispi-result-icon"><M_Icon name="x" /></div>
            <h2>Retour rejeté</h2>
            <p>Le retour de fonds n'a pas pu être exécuté: compte payeur indisponible.</p>
            <button type="button">Fermer</button>
          </>
        ) : (
          <>
            <div className="pispi-result-icon"><M_Icon name="clock-alert" /></div>
            <h2>Statut en attente</h2>
            <p>Le réseau SPI n'a pas confirmé le retour après 30 secondes.</p>
            <button type="button">Voir le statut</button>
          </>
        )}
      </section>
    </div>
  );
};

const PiSPIPaymentRequestDetailScreen = ({ mode = 'default' } = {}) => {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); }, [mode]);
  const shared = mode === 'shared';
  const received = mode === 'received';
  const pico = mode === 'pico' || mode === 'pico-fee';
  const picash = mode === 'picash' || mode === 'picash-fee';
  const deferred = mode === 'deferred';
  const invoice = mode === 'invoice';
  const online = mode === 'online';
  const security = mode === 'security';
  const rejectReasons = mode === 'reject-reasons';
  const program = mode === 'program';
  const modalMode = ['reject', 'geo', 'loading', 'success', 'failure', 'timeout', 'reject-success'].includes(mode);
  const clientName = online ? 'Sahel Market' : received ? 'Mamadou Diallo' : 'Awa Traoré';
  const clientAlias = online ? 'sahel.market@pi' : received ? 'mamadou.d@pi' : 'awa.tr@pi';
  const amount = pico ? '36.500' : picash ? '25.000' : deferred ? '64.000' : invoice ? '18.450' : received ? '12.500' : '10.000';
  const fee = mode === 'pico-fee' ? '350 CFA' : mode === 'picash-fee' ? '250 CFA' : 'Gratuit';

  if (mode === 'auth') {
    return (
      <div className="phone-screen pispi-screen pispi-claim-pin-screen" data-screen-label="PiSPI Paiement demande PIN">
        <StatusBar />
        <button className="pispi-claim-pin-back" type="button"><M_Icon name="chevron-left" /></button>
        <div className="pispi-claim-pin-body">
          <div className="pispi-claim-pin-avatar">AT</div>
          <h2>Bonjour, Moustapha</h2>
          <p>Saisissez votre code PIN pour payer la demande de Awa Traoré.</p>
          <div className="pispi-claim-pin-grid">
            {[1,2,3,4,5,6,7,8,9].map(n => <button key={n}>{n}</button>)}
            <button><M_Icon name="fingerprint" /></button>
            <button>0</button>
            <button><M_Icon name="delete" /></button>
          </div>
          <button className="pispi-claim-pin-forgot" type="button">Code PIN oublié ?</button>
        </div>
      </div>
    );
  }

  const extraSection = () => {
    if (shared) {
      return (
        <div className="pispi-detail-card">
          <div className="pispi-info-row"><span>Paiement partagé</span><strong>Déjeuner équipe</strong></div>
          <div className="pispi-info-row"><span>Client payé</span><strong>Awa Traoré</strong></div>
          <div className="pispi-info-row"><span>Montant du paiement</span><strong>30.000 CFA</strong></div>
          <div className="pispi-info-row"><span>Date du paiement</span><strong>7 juin, 15:17</strong></div>
          <div className="pispi-info-row"><span>Participant</span><strong><PiSPIAvatar name="Awa Traoré" tone="success" /></strong></div>
        </div>
      );
    }
    if (pico) {
      return (
        <div className="pispi-detail-card">
          <div className="pispi-info-row"><span>Retrait avec Achat (PICO)</span><strong>Marchand validé</strong></div>
          <div className="pispi-info-row"><span>Montant de l'achat</span><strong>18.500 CFA</strong></div>
          <div className="pispi-info-row"><span>Montant du retrait</span><strong>18.000 CFA</strong></div>
          <div className="pispi-info-row"><span>Frais</span><strong>{fee}</strong></div>
        </div>
      );
    }
    if (picash) {
      return (
        <div className="pispi-detail-card">
          <div className="pispi-info-row"><span>Retrait avec Achat (PICASH)</span><strong>Agent PI</strong></div>
          <div className="pispi-info-row"><span>Montant du retrait</span><strong>25.000 CFA</strong></div>
          <div className="pispi-info-row"><span>Frais</span><strong>{fee}</strong></div>
        </div>
      );
    }
    if (deferred) {
      return (
        <div className="pispi-detail-card">
          <div className="pispi-info-row"><span>Débit différé</span><strong>Fin de mois</strong></div>
          <div className="pispi-info-row"><span>Message</span><strong>Achetez maintenant, Payez plus tard.</strong></div>
          <div className="pispi-info-row"><span>Mensualités</span><strong>Payer en 3 mensualités</strong></div>
          <div className="pispi-info-row"><span>Montant par mois</span><strong>21.333 CFA</strong></div>
        </div>
      );
    }
    if (invoice) {
      return (
        <div className="pispi-detail-card">
          <div className="pispi-info-row"><span>Document</span><strong>Facture · NIG-2406-118</strong></div>
          <div className="pispi-info-row"><span>Remise</span><strong>1.500 CFA</strong></div>
          <div className="pispi-info-row"><span>Valable jusqu'au</span><strong>12 juin, 18:00</strong></div>
        </div>
      );
    }
    if (online) {
      return (
        <div className="pispi-detail-card">
          <div className="pispi-info-row"><span>Canal</span><strong>521 · Paiement en ligne</strong></div>
          <div className="pispi-info-row"><span>Site e-commerce</span><strong>Sahel Market</strong></div>
          <div className="pispi-info-row"><span>Vérification</span><strong className="m-badge m-badge-success">Site e-commerce vérifiée</strong></div>
        </div>
      );
    }
    if (rejectReasons) {
      const reasons = ['Montant incorrect', 'Demande inconnue', 'Service non reçu', 'Alias du bénéficiaire suspect'];
      return (
        <div className="pispi-option-list pispi-reject-reasons">
          {reasons.map((reason, idx) => (
            <button className={`pispi-option-row ${idx === 0 ? 'active' : ''}`} type="button" key={reason}>
              <span className="icon"><M_Icon name={idx === 0 ? 'check' : 'circle'} /></span>
              <span className="body"><strong>{reason}</strong><small>Motif visible dans le suivi de la demande</small></span>
            </button>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderModal = () => {
    if (mode === 'reject') {
      return (
        <section className="pispi-confirm-dialog">
          <h2>Rejeter la demande ?</h2>
          <p>Choisissez un motif de rejet avant de confirmer. Le payeur recevra le statut de la demande.</p>
          <div><button className="secondary" type="button">Annuler</button><button className="danger" type="button">Rejeter</button></div>
        </section>
      );
    }
    if (mode === 'geo') {
      return (
        <section className="pispi-result-sheet pispi-transfer-result">
          <div className="pispi-result-icon warning"><M_Icon name="map-pin" /></div>
          <h2>Autoriser la position</h2>
          <p>La position GPS est requise avant de payer cette demande PI.</p>
          <button type="button">Autoriser et continuer</button>
        </section>
      );
    }
    if (mode === 'loading') {
      return (
        <section className="pispi-result-sheet pispi-transfer-result">
          <div className="pispi-transfer-spinner"></div>
          <h2>Paiement en cours</h2>
          <p>L'ordre de transfert est envoyé au réseau SPI. Merci de patienter.</p>
        </section>
      );
    }
    if (mode === 'success') {
      return (
        <section className="pispi-result-sheet pispi-transfer-result">
          <div className="pispi-result-icon"><M_Icon name="check" /></div>
          <h2>Paiement effectué</h2>
          <p>La transaction est irrévocable. Un reçu est disponible dans l'historique.</p>
          <button type="button">Continuer</button>
        </section>
      );
    }
    if (mode === 'failure') {
      return (
        <section className="pispi-result-sheet pispi-transfer-result">
          <div className="pispi-result-icon danger"><M_Icon name="x" /></div>
          <h2>Paiement rejeté</h2>
          <p>Le paiement n'a pas pu être finalisé. Solde insuffisant pour couvrir la demande.</p>
          <button type="button">Réessayer</button>
        </section>
      );
    }
    if (mode === 'timeout') {
      return (
        <section className="pispi-result-sheet pispi-transfer-result">
          <div className="pispi-result-icon warning"><M_Icon name="clock-3" /></div>
          <h2>Traitement en cours</h2>
          <p>Aucun statut final reçu après 30 secondes. La demande reste suivie dans Notifications.</p>
          <button type="button">Voir le suivi</button>
        </section>
      );
    }
    return (
      <section className="pispi-result-sheet pispi-transfer-result">
        <div className="pispi-result-icon"><M_Icon name="check" /></div>
        <h2>Demande rejetée</h2>
        <p>La demande de paiement est rejetée avec succès</p>
        <button type="button">Continuer</button>
      </section>
    );
  };

  return (
    <div className={`phone-screen pispi-screen ${modalMode ? 'pispi-claim-dialog-screen' : ''}`} data-screen-label="PiSPI Demande paiement détail">
      <StatusBar />
      <MNav title="Demande de paiement" onBack={() => {}} />
      <div className="pispi-content compact">
        <section className="pispi-detail-hero">
          <div>
            <div className="detail-amount">{amount} <span>CFA</span></div>
            <div className="detail-party">{received ? 'Demandé par' : shared ? 'Paiement partagé avec' : online ? 'Paiement demandé par' : 'Vous avez demandé à'} <strong>{clientName}</strong></div>
            <div className="detail-date">{shared ? 'Paiement du 7 juin, 15:17' : received ? 'Reçue le 7 juin, 15:42' : 'Échéance le 8 juin, 18:00'}</div>
          </div>
          <PiSPIAvatar name={clientName} tone={online ? 'warning' : received ? 'brand' : 'success'} />
        </section>
        {security && (
          <div className="pispi-claim-warning">
            <M_Icon name="triangle-alert" />
            <span>L'alias du client payé doit être enregistré dans vos contacts pour activer Payer et Programmer.</span>
          </div>
        )}
        {program && (
          <div className="pispi-note-card"><M_Icon name="calendar-plus" /><div><strong>Programmation du paiement</strong><span>Le parcours de création d'un paiement programmé démarre depuis cette demande.</span></div></div>
        )}
        <div className="pispi-detail-card">
          <div className="pispi-info-row"><span>Statut</span><strong className="m-badge m-badge-warning">En attente</strong></div>
          <div className="pispi-info-row"><span>Pays</span><strong>Niger</strong></div>
          <div className="pispi-info-row alias-copy-row"><span>Alias</span><strong>{clientAlias}</strong><PiSPICopyMini label="Copier l'alias" /></div>
          <div className="pispi-info-row"><span>Date de demande</span><strong>7 juin, 15:42</strong></div>
          <div className="pispi-info-row"><span>Date d'échéance</span><strong>{received ? '7 juin, 18:00' : '8 juin, 18:00'}</strong></div>
          <div className="pispi-info-row"><span>Motif</span><strong>{invoice ? 'Règlement facture' : online ? 'Commande e-commerce' : 'Paiement de service'}</strong></div>
        </div>
        {extraSection()}
        {!online && <button className="pispi-beneficiary-save" type="button"><M_Icon name="user-plus" /> Enregistrer dans les contacts</button>}
      </div>
      <div className={`pispi-claim-actions ${online ? '' : 'three'}`}>
        <button className="danger" type="button">Rejeter</button>
        {!online && <button className={security ? 'disabled' : ''} type="button">Programmer</button>}
        <button className={`active ${security ? 'disabled' : ''}`} type="button">Payer</button>
      </div>
      {modalMode && (
        <>
          <div className="pispi-modal-dim"></div>
          {renderModal()}
        </>
      )}
    </div>
  );
};

const PiSPIPaymentRequestFormScreen = ({ mode = 'alias' } = {}) => {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); }, [mode]);
  const contactNoAlias = mode === 'contact-no-alias' || mode === 'contact-alias-added';
  const contactAlias = mode === 'contact-alias';
  const phoneWarning = mode === 'phone-alias-warning' || mode === 'phone-alias-edit';
  const prefill = mode === 'prefill';
  const qrMode = mode.startsWith('qr');
  const aliasInvalid = mode === 'alias-invalid';
  const withOverlay = mode === 'geo' || mode === 'loading' || mode === 'success' || mode.endsWith('-geo') || mode.endsWith('-loading') || mode.endsWith('-success');
  const contactName = contactAlias ? 'Awa Traoré' : contactNoAlias ? 'Amina Oumarou' : 'Mamadou Diallo';
  const aliasValue = phoneWarning ? '+227 96 74 98 31' : contactNoAlias ? (mode === 'contact-alias-added' ? 'amina.oumarou@pi' : 'Coller ou saisir un alias') : contactAlias ? 'awa.tr@pi' : 'mamadou.d@pi';

  if (phoneWarning) {
    return (
      <div className="phone-screen pispi-screen" data-screen-label="PiSPI Demande téléphone non supporté">
        <StatusBar />
        <MNav title="Demande de paiement" onBack={() => {}} />
        <div className="pispi-content compact">
          <section className="pispi-contact-detail-card">
            <PiSPIAvatar name="Ali Issoufou" tone="brand" />
            <h2>Ali Issoufou</h2>
            <p>+227 96 74 98 31</p>
          </section>
          <div className="pispi-claim-warning">
            <M_Icon name="triangle-alert" />
            <span>L'alias Numéro de téléphone ne peut pas être utilisé pour les demandes de paiement.</span>
          </div>
          {mode === 'phone-alias-edit' ? (
            <div className="pispi-form-card">
              <label>Nom du contact</label>
              <div className="pispi-input-line is-locked"><M_Icon name="user-round" /><span>Ali Issoufou</span><M_Icon name="lock-keyhole" /></div>
              <label>Adresse de paiement</label>
              <div className="pispi-input-line"><M_Icon name="at-sign" /><span>Coller une adresse PI</span><button type="button" className="pispi-paste-mini"><M_Icon name="clipboard" /> Coller</button></div>
            </div>
          ) : (
            <div className="pispi-contact-actions">
              <button type="button"><M_Icon name="at-sign" /> Ajouter une adresse de paiement</button>
            </div>
          )}
        </div>
        {mode === 'phone-alias-edit' && <div className="cta-bar"><button className="cta">Enregistrer et continuer</button></div>}
      </div>
    );
  }

  return (
    <div className={`phone-screen pispi-screen ${withOverlay ? 'pispi-transfer-modal-screen' : ''}`} data-screen-label="PiSPI Formulaire demande paiement">
      <StatusBar />
      <MNav title={qrMode ? 'Demande QR Code' : contactNoAlias ? contactName : contactAlias ? contactName : 'Demande de paiement'} onBack={() => {}} />
      <div className="pispi-content compact">
        <section className="pispi-form-title">
          <h2>{qrMode ? 'Demande de paiement par QR Code' : contactNoAlias ? 'Ajouter une adresse PI' : `Demander à ${contactName}`}</h2>
          <p>{qrMode ? 'Complétez la demande détectée depuis le QR Code PI.' : contactNoAlias ? 'Le contact sera mis à jour avec le tag @PI avant la demande.' : 'Coller ou saisir l’alias puis le montant à demander.'}</p>
        </section>
        <div className="pispi-form-card">
          {!qrMode && (
            <>
              <label>{contactNoAlias || contactAlias ? 'Nom du contact' : 'Nom du payeur'}</label>
              <div className="pispi-input-line is-locked"><M_Icon name="user-round" /><span>{contactName}</span><M_Icon name="lock-keyhole" /></div>
              <label>Alias</label>
              <div className={`pispi-input-line ${aliasInvalid ? 'has-error' : ''}`}>
                <M_Icon name="at-sign" />
                <span>{aliasInvalid ? 'mamadou' : aliasValue}</span>
                {!contactAlias && <button type="button" className="pispi-paste-mini"><M_Icon name="clipboard" /> Coller</button>}
              </div>
              {aliasInvalid && <p className="pispi-field-error">Alias invalide. Saisissez une adresse de paiement PI valide.</p>}
            </>
          )}
          {!contactNoAlias && (
            <>
              <label>Montant</label>
              <div className="pispi-input-line"><M_Icon name="coins" /><span>{qrMode && mode.includes('amount') ? '18.450 CFA' : prefill ? '10.000 CFA' : '12.500 CFA'}</span></div>
              <small className="pispi-balance-hint">Le montant demandé peut être supérieur au solde disponible.</small>
              <label>Note</label>
              <div className="pispi-input-line"><M_Icon name="message-square-text" /><span>{mode === 'qr-reference' ? 'REF-FACTURE-2406' : prefill ? 'Demande reprise' : 'Paiement de service'}</span></div>
              <small className="pispi-balance-hint">Optionnel · 140 caractères maximum</small>
            </>
          )}
        </div>
        {mode === 'contact-alias-added' && <div className="pispi-inline-toast success"><M_Icon name="check" /> Alias enregistré avec le tag @PI.</div>}
      </div>
      <div className="cta-bar"><button className="cta">{contactNoAlias ? 'Enregistrer et continuer' : 'Envoyer'}</button></div>
      {withOverlay && (
        <>
          <div className="pispi-modal-dim"></div>
          <section className="pispi-result-sheet pispi-transfer-result">
            {mode.endsWith('loading') || mode === 'loading' ? (
              <>
                <div className="pispi-transfer-spinner"></div>
                <h2>Demande en cours</h2>
                <p>La demande de paiement est envoyée au réseau SPI.</p>
              </>
            ) : mode.endsWith('geo') || mode === 'geo' ? (
              <>
                <div className="pispi-result-icon"><M_Icon name="map-pin" /></div>
                <h2>Autoriser la position</h2>
                <p>Votre position GPS est demandée avant l'envoi de la demande.</p>
                <button type="button">Autoriser et envoyer</button>
              </>
            ) : (
              <>
                <div className="pispi-result-icon"><M_Icon name="check" /></div>
                <h2>Demande envoyée</h2>
                <p>Le payeur recevra une notification. La demande reste consultable dans Notifications.</p>
                <button type="button">Continuer</button>
              </>
            )}
          </section>
        </>
      )}
    </div>
  );
};


const PiSPIBrandHeader = ({ compact = false }) => (
  <div className={`pispi-brand-panel ${compact ? 'compact' : ''}`}>
    <img src="assets/logo-spi-dark.png" alt="SPI BCEAO" />
    <span>Service réglementé BCEAO</span>
  </div>
);

const PiSPIIntroScreen = ({ onContinue }) => {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  return (
    <div className="phone-screen pispi-screen" data-screen-label="PiSPI Introduction">
      <StatusBar />
      <div className="pispi-auth-hero">
        <PiSPIBrandHeader />
        <div className="pispi-orbit-mark"><M_Icon name="landmark" /></div>
        <h2>Bienvenue sur SPI</h2>
        <p>Transférez, recevez et suivez vos paiements instantanés dans l'espace UEMOA.</p>
      </div>
      <div className="pispi-content compact">
        <div className="pispi-feature-stack">
          {[
            ['shield-check', 'Cadre BCEAO', 'Parcours aligné sur les règles PI/SPI.'],
            ['at-sign', 'Alias PI', 'Recevoir avec une adresse de paiement ou un numéro.'],
            ['clock-3', 'Instantané', 'Suivi clair des statuts et références de bout en bout.'],
          ].map(([icon, title, text]) => (
            <div className="pispi-feature-row" key={title}>
              <span><M_Icon name={icon} /></span>
              <div><strong>{title}</strong><small>{text}</small></div>
            </div>
          ))}
        </div>
      </div>
      <div className="cta-bar"><button className="cta" onClick={onContinue}>Se connecter</button></div>
    </div>
  );
};

const PiSPILoginScreen = () => {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  return (
    <div className="phone-screen pispi-screen" data-screen-label="PiSPI Connexion">
      <StatusBar />
      <div className="pispi-content compact">
        <PiSPIBrandHeader />
        <section className="pispi-form-title">
          <h2>Connexion à SPI</h2>
          <p>Utilisez les identifiants fournis par votre institution financière.</p>
        </section>
        <div className="pispi-form-card">
          <label>Votre identifiant</label>
          <div className="pispi-input-line"><M_Icon name="user-round" /><span>moustapha.kodjo</span></div>
          <label>Mot de passe</label>
          <div className="pispi-input-line"><M_Icon name="lock" /><span>••••••••••••</span></div>
          <button className="pispi-primary-btn">Continuer</button>
        </div>
        <div className="pispi-compliance-note">
          <M_Icon name="file-check-2" />
          <span>En continuant, vous acceptez les conditions d'utilisation SPI et la politique de confidentialité.</span>
        </div>
      </div>
    </div>
  );
};

const PiSPIPinScreen = () => {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  return (
    <div className="phone-screen pispi-screen" data-screen-label="PiSPI Code PIN">
      <StatusBar />
      <div className="pispi-content compact">
        <PiSPIBrandHeader compact />
        <section className="pispi-pin-card">
          <div className="pispi-pin-icon"><M_Icon name="fingerprint" /></div>
          <h2>Confirmez votre identité</h2>
          <p>Saisissez votre code PIN pour valider l'accès au compte SPI.</p>
          <div className="pispi-pin-dots"><span></span><span></span><span></span><span className="empty"></span></div>
        </section>
        <div className="pispi-keypad-mini">
          {[1,2,3,4,5,6,7,8,9,'bio',0,'back'].map(k => (
            <button key={k}>{k === 'bio' ? <M_Icon name="fingerprint" /> : k === 'back' ? <M_Icon name="delete" /> : k}</button>
          ))}
        </div>
      </div>
    </div>
  );
};

const PiSPIPermissionsScreen = () => {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  return (
    <div className="phone-screen pispi-screen" data-screen-label="PiSPI Permissions">
      <StatusBar />
      <MNav title="Autorisations" onBack={() => {}} />
      <div className="pispi-content compact">
        <section className="pispi-form-title">
          <h2>Activer les services utiles</h2>
          <p>SPI demande seulement les accès nécessaires au fonctionnement des paiements.</p>
        </section>
        <div className="pispi-option-list">
          <button className="pispi-option-row">
            <span className="icon"><M_Icon name="bell-ring" /></span>
            <span className="body"><strong>Notifications</strong><small>Recevoir les demandes, statuts et alertes de sécurité</small></span>
            <span className="pill-badge success">Activé</span>
          </button>
          <button className="pispi-option-row">
            <span className="icon"><M_Icon name="contact-round" /></span>
            <span className="body"><strong>Contacts</strong><small>Retrouver les alias PI enregistrés localement</small></span>
            <span className="pill-badge neutral">À valider</span>
          </button>
        </div>
        <div className="pispi-compliance-note"><M_Icon name="shield" /><span>Les permissions peuvent être modifiées à tout moment dans les paramètres.</span></div>
      </div>
      <div className="cta-bar"><button className="cta">Continuer</button></div>
    </div>
  );
};

const PiSPIAliasScreen = ({ onBack, onSelect, onAddressSelect, onPhoneSelect }) => {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  const chooseAddress = onAddressSelect || onSelect || (() => {});
  const choosePhone = onPhoneSelect || onSelect || (() => {});
  return (
    <div className="phone-screen pispi-screen pispi-alias-screen" data-screen-label="PiSPI Alias">
      <div className="pispi-alias-header">
        <StatusBar onDark />
        <div className="pispi-alias-topbar">
          <button onClick={onBack || (() => {})} aria-label="Retour"><M_Icon name="chevron-left" /></button>
          <span className="pispi-alias-header-logo"><img src="assets/logo-spi-dark.png" alt="SPI BCEAO" /></span>
          <span className="pispi-alias-header-spacer"></span>
        </div>
      </div>
      <div className="pispi-alias-simple">
        <section className="pispi-alias-title">
          <h2>Créer un alias</h2>
          <p>L'alias simplifie le processus et vous permet de recevoir des transactions en toute simplicité tout en préservant votre vie privée.</p>
        </section>
        <div className="pispi-alias-option-list">
          <button className="pispi-alias-option" onClick={chooseAddress}>
            <span className="icon"><M_Icon name="scan-face" /></span>
            <span className="body"><strong>Choisir l'adresse de paiement</strong><small>L'adresse de paiement est créée par PI</small></span>
          </button>
          <button className="pispi-alias-option" onClick={choosePhone}>
            <span className="icon"><M_Icon name="smartphone" /></span>
            <span className="body"><strong>Choisir le numéro de téléphone</strong><small>Sera enregistré comme alias par PI</small></span>
          </button>
        </div>
      </div>
      <TabBar current="home" onNav={() => {}} />
    </div>
  );
};

const PiSPIAliasSuccessScreen = ({ onContinue }) => {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  return (
    <div className="phone-screen pispi-screen pispi-success-screen" data-screen-label="PiSPI Alias succès">
      <div className="pispi-success-dim">
        <StatusBar />
        <div className="pispi-success-back"><M_Icon name="chevron-left" /></div>
        <section className="pispi-success-sheet">
          <div className="pispi-success-check"><M_Icon name="check" /></div>
          <h2>Bravo</h2>
          <h3>Votre alias est créé</h3>
          <p>
            Vous pouvez le partager avec d'autres personnes afin de recevoir des paiements
            instantanés sur votre compte PI-SPI.
          </p>
          <button onClick={onContinue || (() => {})}>Continuer</button>
        </section>
      </div>
    </div>
  );
};

const PiSPIPhoneNumberLockedScreen = ({ onBack, onContinue, dropdownOpen = false, keyboard = false } = {}) => {
  const indicators = [
    { flag: '🇸🇳', code: '+221', country: 'Sénégal' },
    { flag: '🇨🇮', code: '+225', country: "Côte d'Ivoire" },
    { flag: '🇧🇯', code: '+229', country: 'Bénin' },
    { flag: '🇧🇫', code: '+226', country: 'Burkina Faso' },
    { flag: '🇲🇱', code: '+223', country: 'Mali' },
    { flag: '🇳🇪', code: '+227', country: 'Niger' },
    { flag: '🇹🇬', code: '+228', country: 'Togo' },
    { flag: '🇬🇳', code: '+224', country: 'Guinée' },
  ];
  const [selected, setSelected] = React.useState(() => indicators.find(indicator => indicator.code === '+227') || indicators[0]);
  const [phoneDigits, setPhoneDigits] = React.useState('775401932');
  const [open, setOpen] = React.useState(dropdownOpen);
  const [keyboardOpen, setKeyboardOpen] = React.useState(keyboard);
  const [replaceOnNextDigit, setReplaceOnNextDigit] = React.useState(false);
  const formatPhone = (digits) => {
    const clean = digits.replace(/\D/g, '').slice(0, 9);
    const groups = [clean.slice(0, 2), clean.slice(2, 5), clean.slice(5, 7), clean.slice(7, 9)].filter(Boolean);
    return groups.join(' ');
  };
  const showKeyboard = () => { setOpen(false); setKeyboardOpen(true); setReplaceOnNextDigit(true); };
  const addPhoneDigit = (digit) => {
    setKeyboardOpen(true);
    setOpen(false);
    setPhoneDigits(current => {
      const next = replaceOnNextDigit ? digit : `${current}${digit}`;
      return next.replace(/\D/g, '').slice(0, 9);
    });
    setReplaceOnNextDigit(false);
  };
  const removePhoneDigit = () => {
    setKeyboardOpen(true);
    setOpen(false);
    setPhoneDigits(current => (replaceOnNextDigit ? '' : current.slice(0, -1)));
    setReplaceOnNextDigit(false);
  };
  const formattedPhone = formatPhone(phoneDigits);
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); }, [open, selected, keyboardOpen, phoneDigits]);
  return (
    <div className={`phone-screen pispi-screen pispi-phone-locked-screen ${keyboardOpen ? 'has-phone-keyboard' : ''}`} data-screen-label="PiSPI Numéro téléphone">
      <div className="pispi-alias-header pispi-phone-header">
        <StatusBar onDark />
        <div className="pispi-alias-topbar">
          <button onClick={onBack || (() => {})} aria-label="Retour"><M_Icon name="chevron-left" /></button>
          <span className="pispi-alias-header-logo"><img src="assets/logo-spi-dark.png" alt="SPI BCEAO" /></span>
          <span className="pispi-alias-header-spacer"></span>
        </div>
      </div>
      <section className="pispi-phone-locked-body">
        <h2>Numéro de téléphone</h2>
        <p>Un code de vérification sera envoyé sur ce numéro</p>
        <div className="pispi-phone-disabled-row">
          <div className="pispi-country-select">
            <button type="button" className="pispi-country-code" onClick={() => { setKeyboardOpen(false); setOpen(value => !value); }} aria-expanded={open} aria-label="Choisir un indicatif">
              <span>{selected.flag}</span><strong>{selected.code}</strong><M_Icon name="chevron-down" />
            </button>
            {open && (
              <div className="pispi-country-menu">
                {indicators.map(indicator => (
                  <button
                    key={indicator.code}
                    type="button"
                    className={indicator.code === selected.code ? 'selected' : ''}
                    onClick={() => { setSelected(indicator); setOpen(false); }}
                  >
                    <span>{indicator.flag}</span>
                    <strong>{indicator.code}</strong>
                    <small>{indicator.country}</small>
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            type="button"
            className={`pispi-phone-disabled-value ${keyboardOpen ? 'active' : ''}`}
            onMouseDown={showKeyboard}
            onFocus={showKeyboard}
            onClick={showKeyboard}
            aria-pressed={keyboardOpen}
          >
            <span className={formattedPhone ? '' : 'placeholder'}>{formattedPhone || 'Téléphone mobile'}</span>
          </button>
        </div>
      </section>
      <div className="pispi-phone-locked-footer">
        <button onClick={() => (onContinue || (() => {}))(selected, phoneDigits)}>Continuer</button>
      </div>
      {keyboardOpen && <PiSPINumericKeyboard onDigit={addPhoneDigit} onDelete={removePhoneDigit} />}
    </div>
  );
};

const PiSPINumericKeyboard = ({ onDigit, onDelete }) => {
  const keys = [
    ['1', ''], ['2', 'ABC'], ['3', 'DEF'],
    ['4', 'GHI'], ['5', 'JKL'], ['6', 'MNO'],
    ['7', 'PQRS'], ['8', 'TUV'], ['9', 'WXYZ'],
  ];
  return (
    <div className="pispi-ios-keyboard" aria-hidden="true">
      <div className="pispi-ios-key-grid">
        {keys.map(([num, letters]) => (
          <button key={num} type="button" className="pispi-ios-key" onClick={() => onDigit && onDigit(num)}>
            <strong>{num}</strong>{letters && <small>{letters}</small>}
          </button>
        ))}
        <span className="pispi-ios-key-spacer"></span>
        <button type="button" className="pispi-ios-key zero" onClick={() => onDigit && onDigit('0')}><strong>0</strong></button>
        <button type="button" className="pispi-ios-delete" aria-label="Effacer" onClick={() => onDelete && onDelete()}><M_Icon name="delete" /></button>
      </div>
      <div className="pispi-ios-home-indicator"></div>
    </div>
  );
};

const PiSPIOtpCodeScreen = ({ onBack, filled = false, keyboard = false, error = false, resendReady = false, errorMessage = 'Code incorrect. Vérifiez les 6 chiffres et réessayez.' }) => {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  const digits = filled ? ['0', '0', '0', '0', '0', '0'] : ['', '', '', '', '', ''];
  return (
    <div className={`phone-screen pispi-screen pispi-otp-screen ${keyboard ? 'has-keyboard' : ''} ${error ? 'has-error' : ''} ${resendReady ? 'has-resend-ready' : ''}`} data-screen-label="PiSPI OTP">
      <div className="pispi-alias-header pispi-otp-header">
        <StatusBar onDark />
        <div className="pispi-alias-topbar">
          <button onClick={onBack || (() => {})} aria-label="Retour"><M_Icon name="chevron-left" /></button>
          <span className="pispi-alias-header-logo"><img src="assets/logo-spi-dark.png" alt="SPI BCEAO" /></span>
          <span className="pispi-alias-header-spacer"></span>
        </div>
      </div>
      <section className="pispi-otp-body">
        <h2>Code de vérification</h2>
        <p>Saisissez le code envoyé au +227 77 540 19 32</p>
        <div className="pispi-otp-fields" aria-label="Code de vérification à 6 chiffres">
          {digits.map((digit, index) => (
            <span key={index} className={`${index === 0 ? 'active' : ''} ${digit ? 'filled' : ''}`}>
              {digit || (index === 0 ? <i></i> : null)}
            </span>
          ))}
        </div>
        {error && <div className="pispi-otp-error">{errorMessage}</div>}
        <button className={`pispi-otp-resend ${resendReady ? 'is-ready' : ''}`} type="button">
          {resendReady ? 'Renvoyer le code' : 'Renvoyer le code dans 00:53'}
        </button>
      </section>
      {keyboard && <PiSPINumericKeyboard />}
    </div>
  );
};

const PiSPIOtpResultModalScreen = ({ variant = 'success' }) => {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  const success = variant === 'success';
  const claimPending = variant === 'claim-pending';
  const claimSent = variant === 'claim-sent';
  const claimSuccess = variant === 'claim-sent-home';
  const claimResult = claimSent || claimSuccess;
  const homeUnderlay = variant === 'claim-sent-home';
  const copy = success ? {
    eyebrow: 'Bravo',
    title: 'Votre alias est créé',
    description: "Votre numéro est maintenant associé à votre alias PI-SPI. Vous pouvez recevoir des paiements instantanés sur votre compte.",
    icon: 'check',
  } : claimPending ? {
    eyebrow: 'Suivi requis',
    title: 'Numéro en cours de revendication',
    description: "Ce numéro fait déjà l'objet d'une revendication PI-SPI. Vous pouvez vérifier l'état de la demande ou choisir un autre alias.",
    icon: 'clock-3',
  } : claimSent ? {
    eyebrow: 'Demande envoyée',
    title: 'Revendication envoyée avec succès',
    description: "Votre demande est transmise à PI-SPI. Vous pourrez suivre son statut depuis vos notifications.",
    icon: 'check',
  } : claimSuccess ? {
    eyebrow: 'Revendication réussie',
    title: 'Votre alias est disponible',
    description: "La revendication a abouti. Vous pouvez maintenant utiliser cet alias pour recevoir vos paiements PI-SPI.",
    icon: 'check',
  } : {
    eyebrow: 'Oooops',
    title: 'Cet alias est pris',
    description: "Le numéro de téléphone est déjà enregistré comme alias sur un autre compte.",
    icon: 'x',
  };
  return (
    <div className={`phone-screen pispi-screen pispi-otp-modal-screen ${success || claimResult ? 'is-success' : 'is-failure'} ${claimPending ? 'is-claim-pending' : ''} ${claimResult ? 'is-claim-sent' : ''}`} data-screen-label={success ? 'PiSPI OTP succès' : claimPending ? 'PiSPI OTP revendication' : claimResult ? 'PiSPI revendication envoyée' : 'PiSPI OTP échec'}>
      <div className="pispi-modal-underlay">
        {homeUnderlay ? (
          <PiSPIHomeScreen onSend={() => {}} onReceive={() => {}} onSelectTx={() => {}} />
        ) : (
          <PiSPIOtpCodeScreen filled />
        )}
      </div>
      <div className="pispi-modal-dim"></div>
      <section className="pispi-result-sheet">
        {(!success || claimResult) && <div className="pispi-result-handle"></div>}
        <div className="pispi-result-icon"><M_Icon name={copy.icon} /></div>
        <h2>{copy.eyebrow}</h2>
        <h3>{copy.title}</h3>
        <p>{copy.description}</p>
        {claimResult ? null : success ? (
          <button type="button">Continuer</button>
        ) : claimPending ? (
          <div className="pispi-result-actions">
            <button type="button">Vérifier le statut</button>
            <button type="button" className="secondary">Choisir un autre alias</button>
          </div>
        ) : (
          <div className="pispi-result-actions">
            <button type="button">Revendiquer l'alias</button>
            <button type="button" className="secondary">Choisir un autre alias</button>
          </div>
        )}
      </section>
    </div>
  );
};

const PiSPIQrCodeScreen = ({ mode = 'default' } = {}) => {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  const shareChoice = mode === 'share-choice';
  const shareImage = mode === 'share-image';
  const shareAction = mode === 'share-action' || shareChoice;
  const scannerMode = mode.startsWith('scan');
  const galleryMode = mode.startsWith('gallery');
  const scannerError = mode === 'scan-error' || mode === 'gallery-error';
  const scannerReference = mode === 'scan-reference' || mode === 'gallery-reference';
  const scannerAmount = mode === 'scan-amount' || mode === 'gallery-amount';

  const qrSize = 21;
  const isFinder = (row, col, startRow, startCol) => {
    const r = row - startRow;
    const c = col - startCol;
    if (r < 0 || c < 0 || r > 6 || c > 6) return false;
    return r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4);
  };
  const inReservedFinder = (row, col, startRow, startCol) => (
    row >= startRow - 1 && row <= startRow + 7 && col >= startCol - 1 && col <= startCol + 7
  );
  const qrCells = Array.from({ length: qrSize * qrSize }, (_, i) => {
    const row = Math.floor(i / qrSize);
    const col = i % qrSize;
    const finder = isFinder(row, col, 0, 0) || isFinder(row, col, 0, 14) || isFinder(row, col, 14, 0);
    const reserved = inReservedFinder(row, col, 0, 0) || inReservedFinder(row, col, 0, 14) || inReservedFinder(row, col, 14, 0);
    const timing = (row === 6 || col === 6) && !reserved && (row + col) % 2 === 0;
    const payload = !reserved && (
      ((row * 5 + col * 3 + row * col) % 7 === 0) ||
      ((row + col * 2) % 11 === 0) ||
      ((row * 2 + col * 5) % 13 === 3)
    );
    return { on: finder || timing || payload, finder };
  });

  const qrMatrix = (
    <div className="pispi-qr-grid" aria-label="QR Code alias PI de Moustapha K.">
      {qrCells.map((cell, i) => <span key={i} className={`${cell.on ? 'on' : ''} ${cell.finder ? 'finder' : ''}`} />)}
      <em className="pispi-qr-center-logo" aria-hidden="true"><img src="assets/logo-spi-dark.png" alt="" /></em>
    </div>
  );

  const bottomSwitch = (active = 'code') => (
    <div className="pispi-qr-bottom-switch">
      <button type="button" className={active === 'scan' ? 'active' : ''}><M_Icon name="scan-line" /> Scanner</button>
      <button type="button" className={active === 'code' ? 'active' : ''}><M_Icon name="qr-code" /> Mon Code</button>
    </div>
  );

  if (scannerMode || galleryMode) {
    return (
      <div className="phone-screen pispi-screen pispi-scanner-screen" data-screen-label="PiSPI Scanner QR">
        <StatusBar />
        <MNav title="Scanner" onBack={() => {}} right={<button className="btn"><M_Icon name="image-plus" /></button>} />
        <div className="pispi-scanner-camera">
          <div className="pispi-scanner-corners"><span></span><span></span><span></span><span></span></div>
          <M_Icon name={galleryMode ? 'image' : 'scan-line'} />
          <strong>{galleryMode ? 'QR Code importé' : 'Caméra activée'}</strong>
          <small>{galleryMode ? 'Analyse de l’image sélectionnée' : 'Placez le QR Code PI dans le cadre'}</small>
          {scannerReference && <em>Reference Label détecté · TXID envoyé avec la transaction</em>}
          {scannerAmount && <em>Montant détecté · 48.200 CFA</em>}
          {scannerError && <p><M_Icon name="triangle-alert" /> QR Code invalide. Vous pouvez scanner un autre QR Code PI.</p>}
        </div>
        <div className="pispi-scanner-actions">
          <button type="button"><M_Icon name="flashlight" /> Lampe torche</button>
          <button type="button"><M_Icon name="image-plus" /> Galerie</button>
        </div>
        {bottomSwitch('scan')}
      </div>
    );
  }

  if (shareImage) {
    return (
      <div className="phone-screen pispi-screen" data-screen-label="PiSPI QR Code partagé">
        <StatusBar />
        <MNav title="Partager QR Code" onBack={() => {}} />
        <div className="pispi-content compact pispi-qr-content">
          <section className="pispi-share-preview">
            <div className="pispi-share-preview-brand"><img src="assets/logo-spi-dark.png" alt="SPI BCEAO" /></div>
            {qrMatrix}
            <h2>Moustapha Kodjo</h2>
            <p>moustapha.k@pi</p>
            <span>Compte SPI vérifié</span>
          </section>
          <div className="pispi-compliance-note qr-note"><M_Icon name="shield-check" /><span>L'image partagée contient le QR Code et le nom du titulaire.</span></div>
        </div>
        <div className="cta-bar"><button className="cta">Partager l'image</button></div>
      </div>
    );
  }

  return (
    <div className={`phone-screen pispi-screen ${shareChoice ? 'pispi-qr-share-screen' : ''}`} data-screen-label="PiSPI QR Code">
      <StatusBar />
      <MNav title="Mon QR Code" onBack={() => {}} right={<button className="btn"><M_Icon name="share-2" /></button>} />
      <div className="pispi-content compact pispi-qr-content">
        <section className="pispi-qr-card">
          {qrMatrix}
          <div className="pispi-qr-logo-lockup"><img src="assets/logo-spi-dark.png" alt="SPI BCEAO" /></div>
          <h2>Moustapha Kodjo</h2>
          <p>moustapha.k@pi · Compte SPI vérifié</p>
        </section>
        <div className="pispi-action-strip two qr-actions">
          <button><span><M_Icon name={shareAction ? 'share-2' : 'copy'} /></span>{shareAction ? 'Partager QR Code' : 'Copier alias'}</button>
          <button><span><M_Icon name={shareAction ? 'copy' : 'scan-line'} /></span>{shareAction ? 'Copier alias' : 'Scanner'}</button>
        </div>
        <div className="pispi-compliance-note qr-note"><M_Icon name="shield-check" /><span>Le QR Code contient uniquement les informations nécessaires au paiement PI.</span></div>
      </div>
      {bottomSwitch('code')}
      {shareChoice && (
        <>
          <div className="pispi-modal-dim"></div>
          <section className="pispi-share-sheet">
            <div className="pispi-result-handle"></div>
            <h2>Partager</h2>
            <button type="button"><span><M_Icon name="at-sign" /></span><strong>Partager l'alias</strong><small>moustapha.k@pi</small></button>
            <button type="button"><span><M_Icon name="qr-code" /></span><strong>Partager le QR Code</strong><small>Image avec nom et QR Code</small></button>
          </section>
        </>
      )}
    </div>
  );
};

const PiSPITransactionFormScreen = ({ mode = 'ready' } = {}) => {
  const [amount, setAmount] = React.useState(48200);
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); }, [amount]);
  const accountEntry = mode.startsWith('account') || mode.startsWith('iban');
  const ibanEntry = mode.startsWith('iban');
  const aliasEntry = mode.startsWith('alias');
  const contactSend = mode.startsWith('contact-send') || mode.startsWith('recent-send');
  const contactSelected = mode === 'contact-selected';
  const recentPrefill = mode === 'recent-prefill';
  const qrNoAmount = mode === 'qr-no-amount';
  const aliasAmountError = mode === 'alias-insufficient';
  const contactAmountError = mode === 'contact-send-insufficient';
  const recentSend = mode.startsWith('recent-send');
  const aliasValue = mode === 'alias-phone'
    ? '+227 77 540 19 32'
    : mode === 'alias-address'
      ? 'mamadou.d@pi'
      : mode === 'alias-contact'
        ? 'Rechercher ou sélectionner un contact'
        : 'mamadou.d@pi';

  if (contactSend) {
    return (
      <div className="phone-screen pispi-screen" data-screen-label="PiSPI Envoi contact">
        <StatusBar />
        <MNav title="Envoyer à un contact" onBack={() => {}} />
        <div className="pispi-content compact">
          <section className="pispi-form-title">
            <h2>{recentSend ? 'Reprendre un transfert' : 'Envoyer à Amina Oumarou'}</h2>
            <p>{recentSend ? 'Les informations de la transaction récente restent modifiables.' : 'Le contact est enregistré avec son alias PI.'}</p>
          </section>
          <div className="pispi-form-card pispi-contact-transfer-card">
            <label>Nom du contact</label>
            <div className="pispi-input-line is-locked"><M_Icon name="user-round" /><span>{recentSend ? 'Mamadou Diallo' : 'Amina Oumarou'}</span><M_Icon name="lock-keyhole" /></div>
            <label>Alias de compte</label>
            <div className="pispi-input-line is-locked"><M_Icon name="at-sign" /><span>{recentSend ? 'mamadou.d@pi' : 'amina.ou@pi'}</span><M_Icon name="lock-keyhole" /></div>
            <label>Montant</label>
            <div className={`pispi-input-line ${contactAmountError ? 'has-error' : ''}`}><M_Icon name="coins" /><span>{contactAmountError ? '325.000 CFA' : recentSend ? '10.000 CFA' : '48.200 CFA'}</span></div>
            <small className="pispi-balance-hint">Solde disponible · 284.910 CFA</small>
            {contactAmountError && <p className="pispi-field-error">Solde insuffisant pour effectuer ce transfert.</p>}
            <label>Note</label>
            <div className="pispi-input-line"><M_Icon name="message-square-text" /><span>{recentSend ? 'Aide familiale' : 'Règlement facture'}</span></div>
            <small className="pispi-balance-hint">Optionnel · 104 caractères maximum</small>
          </div>
        </div>
        <div className="cta-bar"><button className="cta">Continuer</button></div>
      </div>
    );
  }

  if (accountEntry) {
    const countryLocked = ibanEntry || mode === 'account-iban' || mode === 'account-country-locked' || mode === 'account-bank-locked';
    const institutionLocked = ibanEntry || mode === 'account-iban' || mode === 'account-bank-locked';
    const institutionError = mode === 'account-bank-disabled' || mode === 'account-bank-missing';
    const amountError = mode === 'account-insufficient' || mode === 'iban-insufficient';
    const accountNumber = ibanEntry
      ? 'NE58 BIA 01001 000012345678'
      : mode === 'account-phone-local'
      ? '96 74 98 31'
      : mode === 'account-phone-intl'
        ? '+227 96 74 98 31'
        : mode === 'account-iban' || mode === 'account-country-locked' || mode === 'account-bank-locked'
          ? 'NE58 BIA 01001 000012345678'
          : mode === 'account-rib'
            ? 'NE038 01001 000012345678 64'
            : mode === 'account-contact'
              ? 'Rechercher un contact ou compte'
              : '01001 000012345678';
    const countryValue = countryLocked ? 'Niger' : 'Sélectionner un pays UEMOA';
    const institutionValue = mode === 'account-bank-disabled'
      ? 'Banque du Sahel'
      : mode === 'account-bank-missing'
        ? 'Institution introuvable'
        : mode === 'account-bank-select'
          ? 'Choisir une institution'
          : 'BIA Niger';
    return (
      <div className="phone-screen pispi-screen" data-screen-label="PiSPI Formulaire numéro de compte">
        <StatusBar />
        <MNav title={ibanEntry ? 'Envoi par IBAN' : 'Envoi par compte'} onBack={() => {}} />
        <div className="pispi-content compact">
          <section className="pispi-form-title">
            <h2>{ibanEntry ? 'Envoyer par IBAN' : 'Envoyer par numéro de compte'}</h2>
            <p>{ibanEntry ? 'Coller ou saisir le numéro de compte bancaire international' : 'RIB, IBAN, n° de téléphone ou autre identifiant'}</p>
          </section>
          <div className="pispi-form-card pispi-account-transfer-card">
            <label>{ibanEntry ? 'Numéro IBAN' : 'Numéro de compte'}</label>
            <div className="pispi-input-line">
              <M_Icon name={mode === 'account-contact' ? 'search' : 'credit-card'} />
              <span>{accountNumber}</span>
              {mode === 'account-paste' && <button type="button" className="pispi-paste-mini"><M_Icon name="clipboard" /> Coller</button>}
            </div>

            <label>Pays du bénéficiaire</label>
            <div className={`pispi-input-line ${countryLocked ? 'is-locked' : ''}`}>
              <M_Icon name="map-pin" />
              <span>{countryValue}</span>
              <M_Icon name={countryLocked ? 'lock-keyhole' : 'chevron-down'} />
            </div>
            {mode === 'account-uemoa' && (
              <div className="pispi-chip-row">
                {['Niger', 'Sénégal', 'Bénin', 'Mali'].map(country => <span key={country}>{country}</span>)}
              </div>
            )}

            <label>{ibanEntry ? 'Banque' : 'Institution financière'}</label>
            <div className={`pispi-input-line ${institutionLocked ? 'is-locked' : ''} ${institutionError ? 'has-error' : ''}`}>
              <M_Icon name="landmark" />
              <span>{institutionValue}</span>
              <M_Icon name={institutionLocked ? 'lock-keyhole' : 'chevron-down'} />
            </div>
            {mode === 'account-bank-disabled' && <p className="pispi-field-error">Institution indisponible pour le moment.</p>}
            {mode === 'account-bank-missing' && <p className="pispi-field-error">Cette institution n'est pas disponible dans PI-SPI.</p>}
            {mode === 'account-country-banks' && (
              <div className="pispi-chip-row">
                {['BIA Niger', 'BAGRI', 'SONIBANK'].map(bank => <span key={bank}>{bank}</span>)}
              </div>
            )}

            <label>Montant</label>
            <div className={`pispi-input-line ${amountError ? 'has-error' : ''}`}><M_Icon name="coins" /><span>{amountError ? '325.000 CFA' : '48.200 CFA'}</span></div>
            <small className="pispi-balance-hint">Solde disponible · 284.910 CFA</small>
            {amountError && <p className="pispi-field-error">Solde insuffisant pour effectuer ce transfert.</p>}
            <label>Note</label>
            <div className="pispi-input-line"><M_Icon name="message-square-text" /><span>Règlement facture</span></div>
          </div>
        </div>
        <div className="cta-bar"><button className="cta">Continuer</button></div>
      </div>
    );
  }

  if (aliasEntry || qrNoAmount) {
    return (
      <div className="phone-screen pispi-screen" data-screen-label="PiSPI Formulaire alias">
        <StatusBar />
        <MNav title="Envoyer par Alias" onBack={() => {}} />
        <div className="pispi-content compact">
          <section className="pispi-form-title">
            <h2>Envoyer par Alias</h2>
            <p>{qrNoAmount ? 'QR Code PI valide sans montant. Complétez le transfert.' : "Coller ou saisir l'alias"}</p>
          </section>
          <div className="pispi-form-card pispi-alias-transfer-card">
            <label>Alias</label>
            <div className={`pispi-input-line ${mode === 'alias-invalid' ? 'has-error' : ''}`}>
              <M_Icon name={mode === 'alias-contact' ? 'search' : 'at-sign'} />
              <span>{aliasValue}</span>
              <button type="button" className="pispi-paste-mini"><M_Icon name="clipboard" /> Coller</button>
            </div>
            {mode === 'alias-invalid' && <p className="pispi-field-error">Alias invalide. Saisissez un numéro avec indicatif ou une adresse PI valide.</p>}
            <label>Montant</label>
            <div className={`pispi-input-line ${aliasAmountError ? 'has-error' : ''}`}><M_Icon name="coins" /><span>{mode === 'alias-empty-amount' ? 'Montant' : aliasAmountError ? '325.000 CFA' : '48.200 CFA'}</span></div>
            <small className="pispi-balance-hint">Solde disponible · 284.910 CFA</small>
            {aliasAmountError && <p className="pispi-field-error">Solde insuffisant pour effectuer ce transfert.</p>}
            <label>Note</label>
            <div className="pispi-input-line"><M_Icon name="message-square-text" /><span>Règlement facture</span></div>
          </div>
        </div>
        <div className="cta-bar"><button className="cta">Continuer</button></div>
      </div>
    );
  }

  return (
    <div className="phone-screen pispi-screen" data-screen-label="PiSPI Formulaire transfert">
      <StatusBar />
      <MNav title="Transfert par alias" onBack={() => {}} />
      <div className="pispi-content compact">
        <div className="recipient-pill">
          <PiSPIAvatar name={contactSelected ? 'Amina Oumarou' : 'Mamadou Diallo'} tone="brand" />
          <div><div style={{ fontSize: 14, fontWeight: 800, color: 'var(--fg-1)' }}>{contactSelected ? 'Amina Oumarou' : 'Mamadou Diallo'}</div><div style={{ fontSize: 12, color: 'var(--fg-3)' }}>{contactSelected ? 'amina.oumarou@pi' : 'mamadou.d@pi'} · Alias vérifié</div></div>
          <M_Icon name="chevron-right" />
        </div>
        <div className="amount-screen pispi-amount-block">
          <div className="amount-display">{fmtCFA(recentPrefill ? 10000 : amount)}<span className="amount-cents"> CFA</span></div>
          <div className="amount-hint">Frais SPI estimés · 0 CFA</div>
        </div>
        <div className="amount-chips">
          {[5000,10000,50000].map(v => <div key={v} className="amount-chip" onClick={() => setAmount(v)}>{fmtCFA(v)} F</div>)}
        </div>
        <div className="pispi-form-card compact-card">
          <label>Motif</label>
          <div className="pispi-input-line"><M_Icon name="message-square-text" /><span>Règlement facture</span></div>
          <label>Date d'exécution</label>
          <div className="pispi-input-line"><M_Icon name="calendar" /><span>Aujourd'hui · immédiat</span></div>
        </div>
      </div>
      <div className="cta-bar"><button className="cta">Continuer</button></div>
    </div>
  );
};

const PiSPITransferReviewScreen = ({ referenceLabel = false, mode = 'default', channel = 'alias' } = {}) => {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  const chargedFee = mode === 'fee-charged';
  const withOverlay = ['geo', 'loading', 'success', 'failure', 'timeout'].includes(mode);
  const accountChannel = channel === 'account';
  const ibanChannel = channel === 'iban';
  const beneficiaryRows = accountChannel || ibanChannel ? [
    [ibanChannel ? 'IBAN' : 'Numéro de compte', ibanChannel ? 'NE58 BIA 01001 000012345678' : '01001 000012345678'],
    ['Pays', 'Niger'],
    [ibanChannel ? 'Banque' : 'Institution financière', 'BIA Niger'],
    ['Nom du bénéficiaire', 'Mamadou Diallo'],
  ] : [
    ['Alias', 'mamadou.d@pi'],
    ['Pays', 'Niger'],
    ['Institution financière', 'BIA Niger'],
    ['Nom du bénéficiaire', 'Mamadou Diallo'],
  ];

  if (mode === 'auth') {
    return (
      <div className="phone-screen pispi-screen pispi-claim-pin-screen" data-screen-label="PiSPI Validation PIN transfert">
        <StatusBar />
        <button type="button" className="pispi-claim-pin-back" aria-label="Retour"><M_Icon name="arrow-left" /></button>
        <section className="pispi-claim-pin-body">
          <div className="pispi-claim-pin-avatar">MK</div>
          <h2>Bonjour, Moustapha K.</h2>
          <p>Saisissez votre code PIN pour confirmer le transfert PI-SPI.</p>
          <div className="pispi-claim-pin-grid" aria-label="Clavier code PIN">
            {[1,2,3,4,5,6,7,8,9].map(number => <button type="button" key={number}>{number}</button>)}
            <button type="button"><M_Icon name="fingerprint" /></button>
            <button type="button">0</button>
            <button type="button"><M_Icon name="delete" /></button>
          </div>
          <button type="button" className="pispi-claim-pin-forgot">Code PIN oublié?</button>
        </section>
      </div>
    );
  }

  if (mode === 'program') {
    return (
      <div className="phone-screen pispi-screen" data-screen-label="PiSPI Programmer transfert">
        <StatusBar />
        <MNav title="Programmer" onBack={() => {}} />
        <div className="pispi-content compact">
          <section className="pispi-form-title">
            <h2>Programmer l'envoi</h2>
            <p>Choisissez quand exécuter ce transfert vers Mamadou Diallo.</p>
          </section>
          <div className="pispi-form-card">
            <label>Fréquence</label>
            <div className="pispi-input-line"><M_Icon name="repeat" /><span>Une seule fois</span><M_Icon name="chevron-down" /></div>
            <label>Date d'exécution</label>
            <div className="pispi-input-line"><M_Icon name="calendar" /><span>7 juin, 15:17</span></div>
            <label>Montant</label>
            <div className="pispi-input-line"><M_Icon name="coins" /><span>48.200 CFA</span></div>
          </div>
        </div>
        <div className="cta-bar"><button className="cta">Continuer</button></div>
      </div>
    );
  }

  return (
    <div className={`phone-screen pispi-screen ${withOverlay ? 'pispi-transfer-modal-screen' : ''}`} data-screen-label="PiSPI Vérification transfert">
      <StatusBar />
      <MNav title="Confirmation" onBack={() => {}} />
      <div className="pispi-content compact">
        <section className="pispi-form-title">
          <h2>Confirmation</h2>
          <p>Voulez-vous vraiment effectuer un transfert au profit de ce bénéficiaire ?</p>
        </section>
        <section className="pispi-detail-hero centered">
          <div className="pispi-check-icon"><M_Icon name="shield-check" /></div>
          <div className="detail-amount">48.200 <span>CFA</span></div>
          <div className="detail-party">à <strong>Mamadou Diallo</strong></div>
          <div className="detail-date">Validation par code PIN requise</div>
        </section>
        <div className="pispi-detail-card">
          {beneficiaryRows.map(([label, value]) => (
            <div className="pispi-info-row" key={label}><span>{label}</span><strong>{value}</strong></div>
          ))}
          <div className="pispi-info-row"><span>Montant</span><strong>48.200 CFA</strong></div>
          <div className="pispi-info-row"><span>Frais</span><strong>{chargedFee ? '1.250 CFA' : 'Gratuit'}</strong></div>
          <div className="pispi-info-row"><span>Motif</span><strong>Règlement facture</strong></div>
          {referenceLabel && <div className="pispi-info-row"><span>txId</span><strong className="mono">REF-FACT-2406</strong></div>}
          <div className="pispi-info-row"><span>Référence</span><strong className="mono">Pré-générée</strong></div>
        </div>
        <div className="pispi-compliance-note"><M_Icon name="lock-keyhole" /><span>Une fois confirmé, l'ordre est transmis au réseau SPI.</span></div>
      </div>
      <div className="pispi-review-actions">
        <button className="secondary">Annuler</button>
        <button className="secondary">Programmer</button>
        <button>Confirmer</button>
      </div>
      {withOverlay && (
        <>
          <div className="pispi-modal-dim"></div>
          <section className={`pispi-result-sheet pispi-transfer-result ${mode === 'failure' || mode === 'timeout' ? 'is-danger' : ''}`}>
            {mode === 'loading' ? (
              <>
                <div className="pispi-transfer-spinner"></div>
                <h2>Traitement en cours</h2>
                <p>Votre ordre de transfert est envoyé au réseau SPI. Cette étape peut prendre quelques secondes.</p>
              </>
            ) : mode === 'geo' ? (
              <>
                <div className="pispi-result-icon"><M_Icon name="map-pin" /></div>
                <h2>Autoriser la position</h2>
                <p>Votre position GPS est demandée avant de confirmer ce transfert conformément aux règles de sécurité.</p>
                <button type="button">Autoriser et continuer</button>
              </>
            ) : mode === 'success' ? (
              <>
                <div className="pispi-result-icon"><M_Icon name="check" /></div>
                <h2>Transfert envoyé</h2>
                <p>La transaction est irrévocable. Mamadou Diallo recevra une notification de paiement.</p>
                <button type="button">Continuer</button>
              </>
            ) : mode === 'failure' ? (
              <>
                <div className="pispi-result-icon"><M_Icon name="x" /></div>
                <h2>Transfert rejeté</h2>
                <p>Le transfert n'a pas pu être exécuté. Vérifiez le motif puis réessayez.</p>
                <button type="button">Choisir un autre transfert</button>
              </>
            ) : (
              <>
                <div className="pispi-result-icon"><M_Icon name="clock-alert" /></div>
                <h2>Statut en attente</h2>
                <p>Le réseau SPI n'a pas confirmé la transaction après 30 secondes. Suivez son statut dans l'historique.</p>
                <button type="button">Voir le statut</button>
              </>
            )}
          </section>
        </>
      )}
    </div>
  );
};

const PiSPITransactionSearchScreen = ({ onBack, mode = 'list' } = {}) => {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); }, [mode]);
  const filterMode = mode === 'filters';
  return (
    <div className="phone-screen pispi-screen" data-screen-label="PiSPI Historique">
      <StatusBar />
      <MNav title="Transactions" onBack={onBack || (() => {})} right={<button className="btn"><M_Icon name="sliders-horizontal" /></button>} />
      <div className="pispi-history-search">
        <M_Icon name="search" />
        <span>Nom, référence, alias ou montant</span>
      </div>
      <div className="filter-row">
        <div className="filter-chip active"><span>{filterMode ? '7 juin' : 'Statut'}</span><M_Icon name="chevron-down" /></div>
        <div className="filter-chip"><span>{filterMode ? '12 juin' : 'Période'}</span><M_Icon name="chevron-down" /></div>
        <div className="filter-chip"><span>{filterMode ? 'Reçues' : 'Sens'}</span><M_Icon name="chevron-down" /></div>
        {filterMode && <div className="filter-chip"><span>Factures</span><M_Icon name="chevron-down" /></div>}
      </div>
      <div className="pispi-content compact">
        {filterMode && (
          <div className="pispi-detail-card">
            <div className="pispi-info-row"><span>Date de début</span><strong>7 juin, 00:00</strong></div>
            <div className="pispi-info-row"><span>Date de fin</span><strong>12 juin, 23:59</strong></div>
            <div className="pispi-info-row"><span>Sens</span><strong>Reçues et envoyées</strong></div>
            <div className="pispi-info-row"><span>Catégorie</span><strong>Factures</strong></div>
          </div>
        )}
        <div className="pispi-list-card">
          {PISPI_TX.map(tx => <PiSPIRecentRow key={tx.id} tx={tx} />)}
        </div>
        <div className="pispi-result-count">{PISPI_TX.length} transactions affichées · réseau PI/SPI</div>
      </div>
      {filterMode && <div className="cta-bar"><button className="cta">Appliquer</button></div>}
    </div>
  );
};

const PiSPISubscriptionListScreen = ({ mode = 'list' } = {}) => {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); }, [mode]);
  const empty = mode === 'empty' || mode === 'new-sheet';
  const grouped = mode === 'grouped' || mode === 'single';
  const rows = [
    ['calendar-clock', 'Paiement programmé', 'SENELEC · 18.450 CFA · demain'],
    ['repeat-2', 'Abonnement mensuel', 'Canal+ · 12.000 CFA · chaque 05'],
    ['clock', 'Virement différé', 'Awa Traoré · 25.000 CFA · vendredi'],
  ];
  const scheduledRows = [
    ['calendar-clock', 'Envoi programmé', 'Mamadou Diallo · 48.200 CFA · 7 juin, 15:17'],
    ['clock', 'Virement différé', 'Awa Traoré · 25.000 CFA · 12 juin, 09:00'],
  ];
  const subscriptionRows = [
    ['repeat-2', 'Abonnement mensuel', 'NIGELEC · 18.450 CFA · chaque 05'],
    ['receipt-text', 'Canal+ Essentiel', '12.000 CFA · prochain paiement 7 juin, 11:56'],
  ];
  if (empty) {
    return (
      <div className={`phone-screen pispi-screen ${mode === 'new-sheet' ? 'pispi-claim-dialog-screen' : ''}`} data-screen-label="PiSPI Transactions à venir">
        <StatusBar />
        <MNav title="Abonnements" onBack={() => {}} right={<button className="btn"><M_Icon name="plus" /></button>} />
        <div className="pispi-content compact">
          <section className="pispi-section-head tight">
            <div>
              <h3>Transactions à venir</h3>
              <p>Gérez vos abonnements et vos paiements programmés en un seul endroit</p>
            </div>
          </section>
          <div className="pispi-empty-state">
            <span><M_Icon name="calendar-clock" /></span>
            <strong>Aucune transaction planifiée</strong>
            <small>Créez un envoi programmé ou un abonnement depuis SPI.</small>
          </div>
        </div>
        <div className="cta-bar"><button className="cta">Nouveau</button></div>
        {mode === 'new-sheet' && (
          <>
            <div className="pispi-modal-dim"></div>
            <section className="pispi-result-sheet pispi-program-sheet">
              <div className="pispi-result-handle"></div>
              <h2>Nouveau</h2>
              <div className="pispi-option-list">
                <button className="pispi-option-row" type="button">
                  <span className="icon"><M_Icon name="calendar-plus" /></span>
                  <span className="body"><strong>Programmer un envoi</strong><small>Executer un envoi à une date donnée</small></span>
                  <M_Icon name="chevron-right" />
                </button>
                <button className="pispi-option-row" type="button">
                  <span className="icon"><M_Icon name="repeat-2" /></span>
                  <span className="body"><strong>Créer un abonnement</strong><small>Convertir un envoi en un abonnement</small></span>
                  <M_Icon name="chevron-right" />
                </button>
              </div>
            </section>
          </>
        )}
      </div>
    );
  }
  if (grouped) {
    const onlySubscriptions = mode === 'single';
    return (
      <div className="phone-screen pispi-screen" data-screen-label="PiSPI Transactions à venir">
        <StatusBar />
        <MNav title="Abonnements" onBack={() => {}} right={<button className="btn"><M_Icon name="plus" /></button>} />
        <div className="pispi-content compact">
          <section className="pispi-section-head tight">
            <div><h3>Transactions à venir</h3><p>Abonnements et envois programmés SPI</p></div>
          </section>
          {!onlySubscriptions && (
            <>
              <section className="pispi-section-head tight">
                <div><h3>Envois programmés</h3><p>Exécutions à une date donnée</p></div>
                <button type="button"><M_Icon name="plus" /> Ajouter</button>
              </section>
              <div className="pispi-option-list">
                {scheduledRows.map(([icon, title, text]) => (
                  <button className="pispi-option-row" key={title}>
                    <span className="icon"><M_Icon name={icon} /></span>
                    <span className="body"><strong>{title}</strong><small>{text}</small></span>
                    <M_Icon name="chevron-right" />
                  </button>
                ))}
              </div>
            </>
          )}
          <section className="pispi-section-head tight">
            <div><h3>Abonnements</h3><p>Paiements récurrents validés</p></div>
            <button type="button"><M_Icon name="plus" /> Ajouter</button>
          </section>
          <div className="pispi-option-list">
            {(onlySubscriptions ? subscriptionRows.slice(0, 1) : subscriptionRows).map(([icon, title, text]) => (
              <button className="pispi-option-row" key={title}>
                <span className="icon"><M_Icon name={icon} /></span>
                <span className="body"><strong>{title}</strong><small>{text}</small></span>
                <M_Icon name="chevron-right" />
              </button>
            ))}
          </div>
        </div>
        <div className="cta-bar"><button className="cta">Nouveau</button></div>
      </div>
    );
  }
  return (
    <div className="phone-screen pispi-screen" data-screen-label="PiSPI Abonnements">
      <StatusBar />
      <MNav title="Abonnements" onBack={() => {}} right={<button className="btn"><M_Icon name="plus" /></button>} />
      <div className="pispi-content compact">
        <section className="pispi-section-head tight"><div><h3>Paiements programmés</h3><p>Ordres SPI à venir</p></div></section>
        <div className="pispi-option-list">
          {rows.map(([icon, title, text]) => (
            <button className="pispi-option-row" key={title}>
              <span className="icon"><M_Icon name={icon} /></span>
              <span className="body"><strong>{title}</strong><small>{text}</small></span>
              <M_Icon name="chevron-right" />
            </button>
          ))}
        </div>
        <button className="pispi-primary-btn ghost"><M_Icon name="plus" /> Créer un abonnement</button>
      </div>
    </div>
  );
};

const PiSPISubscriptionCreateScreen = ({ mode = 'select' } = {}) => {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); }, [mode]);
  const selected = mode === 'selected' || mode === 'created';
  if (mode === 'created') return <PiSPIScheduledDetailScreen mode="subscription" />;
  return (
    <div className={`phone-screen pispi-screen ${mode === 'success' ? 'pispi-transfer-modal-screen' : ''}`} data-screen-label="PiSPI Créer abonnement">
      <StatusBar />
      <MNav title="Créer un abonnement" onBack={() => {}} />
      <div className="pispi-content compact">
        <section className="pispi-form-title">
          <h2>Créer un abonnement</h2>
          <p>Recherchez dans vos transactions et sélectionnez un envoi recurrent</p>
        </section>
        <div className="pispi-history-search"><M_Icon name="search" /><span>Rechercher un bénéficiaire ou un motif</span></div>
        <div className="pispi-option-list">
          {[
            ['Mamadou Diallo', 'mamadou.d@pi · 48.200 CFA · 7 juin, 15:17', 'brand'],
            ['NIGELEC · Facture', 'nigelec@pi · 18.450 CFA · chaque mois', 'warning'],
            ['Awa Traoré', 'awa.tr@pi · 25.000 CFA · 12 juin, 09:00', 'success'],
          ].map(([name, text, tone], index) => (
            <button className={`pispi-option-row ${selected && index === 1 ? 'active' : ''}`} key={name}>
              <span className="icon"><PiSPIAvatar name={name} tone={tone} /></span>
              <span className="body"><strong>{name}</strong><small>{text}</small></span>
              {selected && index === 1 ? <M_Icon name="check" /> : <M_Icon name="chevron-right" />}
            </button>
          ))}
        </div>
        {selected && (
          <div className="pispi-detail-card">
            <div className="pispi-info-row"><span>Fréquence estimée</span><strong>Mensuelle</strong></div>
            <div className="pispi-info-row"><span>Prochain paiement</span><strong>7 juin, 15:17</strong></div>
            <div className="pispi-info-row"><span>Montant</span><strong>18.450 CFA</strong></div>
          </div>
        )}
      </div>
      <div className="cta-bar"><button className="cta">{selected ? 'Confirmer' : 'Sélectionner une transaction'}</button></div>
      {mode === 'success' && (
        <>
          <div className="pispi-modal-dim"></div>
          <section className="pispi-result-sheet pispi-transfer-result">
            <div className="pispi-result-icon"><M_Icon name="check" /></div>
            <h2>Abonnement créé</h2>
            <p>La fréquence par défaut est déterminée à partir de l'historique des transactions.</p>
            <button type="button">Voir le détail</button>
          </section>
        </>
      )}
    </div>
  );
};

const PiSPIScheduleFormScreen = ({ mode = 'form' } = {}) => {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); }, [mode]);
  const withGeo = mode === 'geo';
  return (
    <div className={`phone-screen pispi-screen ${withGeo ? 'pispi-transfer-modal-screen' : ''}`} data-screen-label="PiSPI Programmer">
      <StatusBar />
      <MNav title="Programmer" onBack={() => {}} />
      <div className="pispi-content compact">
        <section className="pispi-form-title">
          <h2>Programmer</h2>
          <p>Définissez la fréquence et les dates d'exécution du transfert.</p>
        </section>
        <div className="pispi-form-card">
          <label>Fréquence</label>
          <div className="pispi-input-line"><M_Icon name="repeat-2" /><span>Mensuelle</span><M_Icon name="chevron-down" /></div>
          <div className="pispi-chip-row">
            {['Une seule fois', 'Quotidienne', 'Hebdomadaire', 'Mensuelle', 'Annuelle', 'Sur Mesure'].map(item => <span key={item}>{item}</span>)}
          </div>
          <label>Date de début</label>
          <div className="pispi-input-line"><M_Icon name="calendar" /><span>7 juin, 15:17</span></div>
          <label>Date de fin</label>
          <div className="pispi-input-line"><M_Icon name="calendar-days" /><span>Optionnelle</span></div>
          <label>Note</label>
          <div className="pispi-input-line"><M_Icon name="message-square-text" /><span>Règlement facture</span></div>
          <small className="pispi-balance-hint">Optionnel · 104 caractères maximum</small>
        </div>
      </div>
      <div className="cta-bar"><button className="cta">Continuer</button></div>
      {withGeo && (
        <>
          <div className="pispi-modal-dim"></div>
          <section className="pispi-result-sheet pispi-transfer-result">
            <div className="pispi-result-icon warning"><M_Icon name="map-pin" /></div>
            <h2>Autoriser la position</h2>
            <p>La position GPS est requise avant de programmer ce transfert.</p>
            <button type="button">Autoriser et continuer</button>
          </section>
        </>
      )}
    </div>
  );
};

const PiSPIScheduledDetailScreen = ({ mode = 'subscription' } = {}) => {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); }, [mode]);
  const scheduled = mode === 'scheduled';
  const account = mode === 'account';
  return (
    <div className="phone-screen pispi-screen" data-screen-label="PiSPI Détail transaction à venir">
      <StatusBar />
      <MNav title={scheduled ? 'Envoi programmé' : 'Détail abonnement'} onBack={() => {}} right={<button className="btn"><M_Icon name="more-horizontal" /></button>} />
      <div className="pispi-content compact">
        <section className="pispi-detail-hero">
          <div>
            <div className="detail-amount">-18.450 <span>CFA</span></div>
            <div className="detail-party">Payé à <strong>{account ? 'Mamadou Diallo' : 'NIGELEC'}</strong></div>
            <div className="detail-date">{scheduled ? 'Programmé pour le 7 juin, 15:17' : 'Prochain paiement le 7 juin, 15:17'}</div>
          </div>
          <PiSPIAvatar name={account ? 'Mamadou Diallo' : 'NIGELEC'} tone={account ? 'brand' : 'warning'} />
        </section>
        <div className="pispi-action-strip">
          <button><span><M_Icon name="pencil" /></span>Éditer</button>
          <button><span><M_Icon name="pause" /></span>Désactiver</button>
          <button><span><M_Icon name="play" /></span>Réactiver</button>
          <button><span><M_Icon name="trash-2" /></span>Supprimer</button>
        </div>
        <div className="pispi-detail-card">
          <div className="pispi-info-row"><span>Fréquence</span><strong>{scheduled ? 'Une seule fois' : 'Mensuelle'}</strong></div>
          <div className="pispi-info-row"><span>{scheduled ? 'Programmé pour' : 'Date de début'}</span><strong>7 juin, 15:17</strong></div>
          {!scheduled && <div className="pispi-info-row"><span>Prochain paiement</span><strong>7 juillet, 15:17</strong></div>}
          {!scheduled && <div className="pispi-info-row"><span>Date de fin</span><strong>Sans date de fin</strong></div>}
          <div className="pispi-info-row"><span>Note</span><strong>Règlement facture</strong></div>
        </div>
        <div className="pispi-detail-card pispi-beneficiary-card">
          <div className="pispi-info-row"><span>Envoyé à</span><strong>{account ? 'Mamadou Diallo' : 'NIGELEC'}</strong></div>
          <div className="pispi-info-row"><span>Pays</span><strong>Niger</strong></div>
          <div className="pispi-info-row"><span>Institution financière</span><strong>BIA Niger</strong></div>
          {account ? (
            <div className="pispi-info-row"><span>Numéro de compte</span><strong className="mono">01001 000012345678</strong><PiSPICopyMini label="Copier le numéro de compte" /></div>
          ) : (
            <div className="pispi-info-row alias-copy-row"><span>Alias</span><strong>nigelec@pi</strong><PiSPICopyMini label="Copier l'alias" /></div>
          )}
          <button className="pispi-beneficiary-save" type="button"><M_Icon name="user-plus" /> Enregistrer dans les contacts</button>
        </div>
        <div className="pispi-note-card">
          <M_Icon name="tag" />
          <div><strong>Catégorie</strong><span>Classer ce transfert dans Budget et analytique.</span></div>
          <span className="pill-badge neutral">Factures</span>
        </div>
      </div>
    </div>
  );
};

const PiSPICategoriesScreen = () => {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  const cats = [['home','Logement'], ['shopping-bag','Shopping'], ['utensils','Restaurant'], ['heart-pulse','Soins'], ['plane','Voyage'], ['ellipsis','Autre']];
  return (
    <div className="phone-screen pispi-screen" data-screen-label="PiSPI Catégories">
      <StatusBar />
      <MNav title="Catégories" onBack={() => {}} right={<button className="btn"><M_Icon name="plus" /></button>} />
      <div className="pispi-content compact">
        <div className="pispi-category-grid">
          {cats.map(([icon, label]) => (
            <button key={label}><span><M_Icon name={icon} /></span><strong>{label}</strong><small>Analytique</small></button>
          ))}
        </div>
      </div>
    </div>
  );
};

const PiSPIContactCreateScreen = () => {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  return (
    <div className="phone-screen pispi-screen" data-screen-label="PiSPI Contact">
      <StatusBar />
      <MNav title="Nouveau contact" onBack={() => {}} />
      <div className="pispi-content compact">
        <div className="pispi-form-card">
          <label>Nom complet</label>
          <div className="pispi-input-line"><M_Icon name="user-round" /><span>Awa Traoré</span></div>
          <label>Alias PI</label>
          <div className="pispi-input-line"><M_Icon name="at-sign" /><span>awa.tr@pi</span></div>
          <label>Téléphone</label>
          <div className="pispi-input-line"><M_Icon name="smartphone" /><span>+227 77 540 19 32</span></div>
        </div>
        <div className="pispi-compliance-note"><M_Icon name="badge-check" /><span>L'alias sera vérifié dans PI avant d'être enregistré.</span></div>
      </div>
      <div className="cta-bar"><button className="cta">Enregistrer</button></div>
    </div>
  );
};

const PISPI_NOTIFICATION_CATEGORIES = [
  { key: 'unread', label: 'Non lues' },
  { key: 'all', label: 'Tous' },
  { key: 'payment', label: 'Demande de paiement' },
  { key: 'transfer', label: 'Transfert' },
  { key: 'cancellation', label: 'Annulation' },
  { key: 'claim', label: "Revendication d'alias" },
  { key: 'subscription', label: 'Abonnement' },
  { key: 'savings', label: 'Tirelire' },
  { key: 'tontine', label: 'Tontine' },
];

const PISPI_NOTIFICATIONS = [
  { category: 'claim', unread: true, day: "Aujourd'hui", icon: 'at-sign', title: "Revendication d'alias", text: 'Vous avez reçu une revendication sur votre alias +227 77 540 19 32', badge: 'Important', tone: 'danger' },
  { category: 'payment', unread: true, day: "Aujourd'hui", icon: 'arrow-down-left', title: 'Demande de paiement', text: 'Demandée par Mamadou Diallo · 12.500 CFA', badge: 'À traiter', tone: 'warn' },
  { category: 'payment', unread: false, day: "Aujourd'hui", icon: 'arrow-up-right', title: 'Demande de paiement', text: 'Demandée à Awa Traoré · 10.000 CFA', badge: 'Envoyée', tone: 'neutral' },
  { category: 'transfer', unread: true, day: '7 juin', icon: 'arrow-up-right', title: 'Transaction échouée', text: 'Envoi à Mamadou Diallo · -48.200 CFA', badge: 'Échec', tone: 'danger' },
  { category: 'transfer', unread: false, day: '7 juin', icon: 'rotate-ccw', title: 'Retour de fonds échoué', text: 'Retour à Awa Traoré · 12.500 CFA', badge: 'Échec', tone: 'danger' },
  { category: 'cancellation', unread: true, day: '7 juin', icon: 'rotate-ccw', title: 'Annulation', text: 'Demandée par Mamadou Diallo · PI-2406-7698', badge: 'À traiter', tone: 'warn' },
  { category: 'cancellation', unread: false, day: '6 juin', icon: 'x-circle', title: 'Annulation rejetée', text: 'Demandée à Awa Traoré · rejetée', badge: 'Lu', tone: 'neutral' },
  { category: 'subscription', unread: false, day: '6 juin', icon: 'repeat-2', title: 'Abonnement actif', text: 'NIGELEC sera payé automatiquement le 05 juillet', badge: 'Planifié', tone: 'warn' },
  { category: 'subscription', unread: true, day: '5 juin', icon: 'calendar-clock', title: 'Paiement abonnement proche', text: 'Votre abonnement Canal+ sera exécuté le 7 juin, 11:56', badge: 'Nouveau', tone: 'success' },
  { category: 'savings', unread: true, day: '5 juin', icon: 'piggy-bank', title: 'Tirelire alimentée', text: '5.000 CFA ajoutés à la tirelire Projet Tabaski', badge: 'Nouveau', tone: 'success' },
  { category: 'savings', unread: false, day: '4 juin', icon: 'target', title: 'Objectif tirelire atteint', text: 'La tirelire Études atteint 80% de son objectif', badge: 'Info', tone: 'neutral' },
  { category: 'tontine', unread: true, day: '5 juin', icon: 'users', title: 'Tontine - tour reçu', text: 'Votre tour de tontine Famille Niamey est confirmé', badge: 'Nouveau', tone: 'success' },
  { category: 'tontine', unread: false, day: '4 juin', icon: 'hand-coins', title: 'Cotisation enregistrée', text: 'Votre cotisation de 15.000 CFA a été enregistrée', badge: 'Succès', tone: 'success' },
];

const PiSPINotificationsScreen = ({ filter = 'unread' } = {}) => {
  const activeFilter = filter === 'grouped' ? 'all' : filter;
  const tabsRef = React.useRef(null);
  React.useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
    const activeTab = tabsRef.current?.querySelector('button.active');
    if (tabsRef.current && activeTab) {
      tabsRef.current.scrollLeft = Math.max(0, activeTab.offsetLeft - 14);
    }
  }, [activeFilter]);
  const notices = filter === 'grouped'
    ? PISPI_NOTIFICATIONS
    : PISPI_NOTIFICATIONS.filter(notice => {
      if (activeFilter === 'all') return true;
      if (activeFilter === 'unread') return notice.unread;
      return notice.category === activeFilter;
    });
  const categories = PISPI_NOTIFICATION_CATEGORIES;
  const groups = notices.reduce((acc, notice) => {
    acc[notice.day] = acc[notice.day] || [];
    acc[notice.day].push(notice);
    return acc;
  }, {});

  return (
    <div className="phone-screen pispi-screen" data-screen-label="PiSPI Notifications">
      <StatusBar />
      <MNav title="Notifications" onBack={() => {}} />
      <div className="pispi-content compact">
        <div className="pispi-notification-tabs" aria-label="Catégories de notifications" ref={tabsRef}>
          {categories.map(category => (
            <button key={category.key} className={category.key === activeFilter ? 'active' : ''}>{category.label}</button>
          ))}
        </div>
        {Object.entries(groups).map(([day, rows]) => (
          <section className="pispi-notification-group" key={day}>
            <div className="pispi-date-group">{day}</div>
            <div className="pispi-option-list">
              {rows.map(notice => (
                <button className="pispi-option-row" key={`${day}-${notice.title}`}>
                  <span className={`icon ${notice.tone}`}><M_Icon name={notice.icon} /></span>
                  <span className="body"><strong>{notice.title}</strong><small>{notice.text}</small></span>
                  <span className={`pill-badge ${notice.tone}`}>{notice.badge}</span>
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

const PiSPIClaimDetailScreen = ({ mode = 'default', onBack }) => {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); }, [mode]);
  const accepted = mode === 'accepted';
  return (
    <div className="phone-screen pispi-screen" data-screen-label="PiSPI Revendication alias">
      <StatusBar />
      <MNav title="Revendication d'alias" onBack={onBack || (() => {})} />
      <div className="pispi-content compact">
        <section className="pispi-claim-hero">
          <span><M_Icon name="badge-alert" /></span>
          <div>
            <h2>Numéro de téléphone réclamé</h2>
            <p>Une demande de revendication a été initiée via PI-RAC.</p>
          </div>
        </section>

        <div className="pispi-detail-card">
          <div className="pispi-info-row"><span>Numéro de téléphone</span><strong>+227 77 540 19 32</strong></div>
          <div className="pispi-info-row"><span>Date de la demande</span><strong>7 juin, 15:17</strong></div>
          <div className="pispi-info-row"><span>Statut</span><strong className={`m-badge ${accepted ? 'm-badge-success' : 'm-badge-warning'}`}>{accepted ? 'Acceptée' : 'En attente'}</strong></div>
          {accepted ? (
            <div className="pispi-info-row"><span>Date d'acceptation</span><strong>21 juin, 16:15</strong></div>
          ) : (
            <div className="pispi-info-row"><span>Alias actuel</span><strong>moustapha.k@pi</strong></div>
          )}
        </div>

        {!accepted && (
          <>
            <div className="pispi-claim-warning">
              <M_Icon name="triangle-alert" />
              <span>Si vous ne rejetez pas cette demande avec succès d'ici le 14 juin, vous ne pourrez plus faire de transactions avec cet alias. Si à la date du 21 juin la demande est toujours en attente, l'alias sera supprimé.</span>
            </div>

            <div className="pispi-claim-actions">
              <button className={mode === 'refuse' ? 'active danger' : 'danger'}>Refuser</button>
              <button className={mode === 'accept' ? 'active' : ''}>Accepter</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const PiSPIClaimAcceptDialogScreen = ({ variant = 'confirm' }) => {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); }, [variant]);
  const isAuth = variant === 'auth';
  const isSuccess = variant === 'success';

  if (isAuth) {
    return (
      <div className="phone-screen pispi-screen pispi-claim-pin-screen" data-screen-label="PiSPI Double authentification">
        <StatusBar />
        <button type="button" className="pispi-claim-pin-back" aria-label="Retour"><M_Icon name="arrow-left" /></button>
        <section className="pispi-claim-pin-body">
          <div className="pispi-claim-pin-avatar">KD</div>
          <h2>Bonjour, Khady Diop</h2>
          <p>Saisissez votre code PIN</p>
          <div className="pispi-claim-pin-grid" aria-label="Clavier code PIN">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(number => (
              <button key={number} type="button">{number}</button>
            ))}
            <button type="button" aria-label="Biométrie"><M_Icon name="fingerprint" /></button>
            <button type="button">0</button>
            <button type="button" aria-label="Effacer"><M_Icon name="delete" /></button>
          </div>
          <button type="button" className="pispi-claim-pin-forgot">Code PIN oublié?</button>
        </section>
      </div>
    );
  }

  return (
    <div className={`phone-screen pispi-screen pispi-claim-dialog-screen ${isSuccess ? 'is-success' : ''}`} data-screen-label={isSuccess ? 'PiSPI Revendication acceptée' : isAuth ? 'PiSPI Double authentification' : 'PiSPI Confirmation revendication'}>
      <div className="pispi-modal-underlay"><PiSPIClaimDetailScreen mode="accept" /></div>
      <div className="pispi-modal-dim"></div>
      {isSuccess ? (
        <section className="pispi-result-sheet">
          <div className="pispi-result-icon"><M_Icon name="check" /></div>
          <h2>Revendication acceptée</h2>
          <h3>Alias supprimé avec succès</h3>
          <p>Le numéro réclamé n’est plus associé à votre compte. La liste des notifications est actualisée.</p>
          <button type="button">Retour aux notifications</button>
        </section>
      ) : (
        <section className="pispi-confirm-dialog">
          <h2>Êtes-vous sûr(e) de vouloir accepter la revendication ?</h2>
          <p>À l'acceptation, votre alias +227 77 540 19 32 sera supprimé, cette action sera irréversible. Vous ne pourrez plus recevoir de paiement avec cet alias. Cependant vous pourrez toujours utiliser l'adresse de paiement associée.</p>
          <div>
            <button type="button">Confirmer</button>
            <button type="button" className="secondary">Annuler</button>
          </div>
        </section>
      )}
    </div>
  );
};

const PiSPICopyMini = ({ label = 'Copier' }) => (
  <button type="button" className="pispi-copy-mini" aria-label={label}><M_Icon name="copy" /></button>
);

const PiSPIAccountInfoRow = ({ label, value, copy = false }) => (
  <div className="pispi-account-info-row">
    <span>{label}</span>
    <strong>{value}</strong>
    {copy && <PiSPICopyMini label={`Copier ${label}`} />}
  </div>
);

const PiSPIAliasProfileScreen = ({ mode = 'profile' } = {}) => {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); }, [mode]);
  const accountMode = ['account', 'delete-confirm', 'delete-success'].includes(mode);
  const photoMode = ['avatar-edit', 'avatar-updated'].includes(mode);
  const hasUserAvatar = ['avatar-edit', 'avatar-updated', 'profile-photo'].includes(mode);

  if (mode === 'delete-auth') {
    return (
      <div className="phone-screen pispi-screen pispi-claim-pin-screen" data-screen-label="PiSPI Suppression alias - PIN">
        <StatusBar />
        <button type="button" className="pispi-claim-pin-back" aria-label="Retour"><M_Icon name="arrow-left" /></button>
        <section className="pispi-claim-pin-body">
          <div className="pispi-claim-pin-avatar">MK</div>
          <h2>Bonjour, Moustapha Kodjo</h2>
          <p>Saisissez votre code PIN</p>
          <div className="pispi-claim-pin-grid" aria-label="Clavier code PIN">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(number => <button key={number} type="button">{number}</button>)}
            <button type="button" aria-label="Biométrie"><M_Icon name="fingerprint" /></button>
            <button type="button">0</button>
            <button type="button" aria-label="Effacer"><M_Icon name="delete" /></button>
          </div>
          <button type="button" className="pispi-claim-pin-forgot">Code PIN oublié?</button>
        </section>
      </div>
    );
  }

  const profileHero = (
    <section className={`pispi-profile-identity ${photoMode ? 'is-editable' : ''} ${hasUserAvatar ? 'is-photo' : ''}`}>
      <div className="pispi-profile-photo">
        <div className="pispi-profile-photo-fill">{hasUserAvatar ? <M_Icon name="user-round" /> : <PiSPIAvatar name="Moustapha Kodjo" tone="brand" />}</div>
        {photoMode && <button type="button" aria-label="Modifier la photo"><M_Icon name="camera" /></button>}
      </div>
      <div className="pispi-profile-identity-copy">
        <h2>Moustapha Kodjo</h2>
        <p>moustapha.k@pi</p>
      </div>
      <PiSPICopyMini label="Copier l'alias" />
    </section>
  );

  const accountDetails = (
    <>
      <div className="pispi-detail-card pispi-account-detail">
        <PiSPIAccountInfoRow label="Type de compte" value="Compte personnel SPI" />
        <PiSPIAccountInfoRow label="Numéro de compte" value="NE-227-4050-1182" copy />
        <PiSPIAccountInfoRow label="Adresse de paiement" value="moustapha.k@pi" copy />
        <PiSPIAccountInfoRow label="Alias téléphone" value="+227 77 540 19 32" copy />
      </div>
      <button type="button" className="pispi-delete-alias"><M_Icon name="trash-2" /> Supprimer mon alias</button>
    </>
  );

  return (
    <div className={`phone-screen pispi-screen ${mode === 'delete-confirm' || mode === 'delete-success' ? 'pispi-account-modal-screen' : ''}`} data-screen-label="PiSPI Profil Compte">
      <StatusBar />
      <MNav title={accountMode ? 'Compte' : 'Profil'} onBack={() => {}} />
      <div className="pispi-content compact">
        {profileHero}
        {mode === 'avatar-edit' && (
          <div className="pispi-photo-actions">
            <button type="button"><M_Icon name="image-plus" /> Choisir une photo</button>
            <button type="button"><M_Icon name="camera" /> Prendre une photo</button>
          </div>
        )}
        {mode === 'avatar-updated' && (
          <div className="pispi-inline-toast success"><M_Icon name="check" /> Photo mise à jour dans PI</div>
        )}
        {accountMode ? accountDetails : (
          <div className="pispi-option-list">
            <button className="pispi-option-row"><span className="icon"><M_Icon name="circle-user" /></span><span className="body"><strong>Compte</strong><small>Type, numéro de compte et alias PI</small></span><M_Icon name="chevron-right" /></button>
            <button className="pispi-option-row"><span className="icon"><M_Icon name="contact-round" /></span><span className="body"><strong>Contacts et Alias</strong><small>Gérer les bénéficiaires enregistrés</small></span><M_Icon name="chevron-right" /></button>
            <button className="pispi-option-row"><span className="icon"><M_Icon name="shield-check" /></span><span className="body"><strong>Sécurité et confidentialité</strong><small>PIN, biométrie et visibilité des montants</small></span><M_Icon name="chevron-right" /></button>
            <button className="pispi-option-row"><span className="icon"><M_Icon name="settings" /></span><span className="body"><strong>Paramètres</strong><small>Langue, notifications et préférences</small></span><M_Icon name="chevron-right" /></button>
            <button className="pispi-option-row"><span className="icon"><M_Icon name="help-circle" /></span><span className="body"><strong>Centre d'aide</strong><small>Assistance et questions fréquentes</small></span><M_Icon name="chevron-right" /></button>
          </div>
        )}
      </div>
      {mode === 'delete-confirm' && (
        <>
          <div className="pispi-modal-dim"></div>
          <section className="pispi-confirm-dialog pispi-delete-dialog">
            <h2>Supprimer cet alias ?</h2>
            <p>Votre alias téléphone +227 77 540 19 32 ne pourra plus recevoir de paiements. L'adresse de paiement moustapha.k@pi restera disponible.</p>
            <div>
              <button type="button">Confirmer</button>
              <button type="button" className="secondary">Annuler</button>
            </div>
          </section>
        </>
      )}
      {mode === 'delete-success' && (
        <>
          <div className="pispi-modal-dim"></div>
          <section className="pispi-result-sheet pispi-profile-result-sheet">
            <div className="pispi-result-icon"><M_Icon name="check" /></div>
            <h2>Alias supprimé</h2>
            <p>Le numéro +227 77 540 19 32 n'est plus associé à votre compte. Vous restez sur le menu Compte.</p>
            <button type="button">Continuer</button>
          </section>
        </>
      )}
    </div>
  );
};

const PISPI_ALIAS_CONTACTS = [
  { name: 'Amina Oumarou', alias: 'amina.ou@pi', phone: '90 24 76 36', tone: 'warning', hasAlias: true },
  { name: 'Ali Issoufou', alias: '+227 96 74 98 31', phone: '+227 96 74 98 31', tone: 'brand', hasAlias: false },
  { name: 'Awa Traoré', alias: 'awa.tr@pi', phone: '88 40 19 26', tone: 'success', hasAlias: true },
  { name: 'Abdou Karim', alias: '+227 91 40 18 22', phone: '+227 91 40 18 22', tone: 'info', hasAlias: false },
];

const PiSPIAliasContactRow = ({ contact, active = false }) => (
  <button className={`pispi-contact-alias-row ${active ? 'active' : ''}`} type="button">
    <span className="pispi-contact-avatar-wrap">
      <PiSPIAvatar name={contact.name} tone={contact.tone} />
      {contact.hasAlias && <span className="pispi-contact-pi-badge">π</span>}
    </span>
    <span className="body"><strong>{contact.name}</strong><small>{contact.alias}</small></span>
    <M_Icon name="chevron-right" />
  </button>
);

const PiSPIContactsAliasScreen = ({ mode = 'list' } = {}) => {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); }, [mode]);
  const formMode = ['new-form', 'new-form-phone', 'new-form-invalid', 'add-alias', 'edit-alias'].includes(mode);
  const selected = PISPI_ALIAS_CONTACTS[0];

  if (formMode) {
    const addingAlias = mode === 'add-alias';
    const editingAlias = mode === 'edit-alias';
    const newContact = mode.startsWith('new-form');
    const aliasValue = mode === 'new-form-phone' ? '+227 90 24 76 36' : mode === 'new-form-invalid' ? 'amina-oumarou' : 'amina.ou@pi';
    return (
      <div className="phone-screen pispi-screen" data-screen-label="PiSPI Contact formulaire">
        <StatusBar />
        <MNav title={addingAlias || editingAlias ? selected.name : 'Ajouter un contact'} onBack={() => {}} />
        <div className="pispi-content compact">
          {newContact && (
            <section className="pispi-form-title">
              <h2>Ajouter un contact</h2>
              <p>Enregistrer un nouveau contact avec son alias</p>
            </section>
          )}
          <div className="pispi-form-card pispi-contact-form-card">
            {!addingAlias && !editingAlias && (
              <>
                <label>Prénoms et nom</label>
                <div className="pispi-input-line"><M_Icon name="user-round" /><span>Amina Oumarou</span></div>
              </>
            )}
            <label>Alias</label>
            <div className={`pispi-input-line ${mode === 'new-form-invalid' ? 'has-error' : ''}`}>
              <M_Icon name="at-sign" />
              <span>{editingAlias ? selected.alias : addingAlias ? selected.alias : aliasValue}</span>
              <button type="button" className="pispi-paste-mini"><M_Icon name="clipboard" /> Coller</button>
            </div>
            {mode === 'new-form-invalid' && <p className="pispi-field-error">Alias invalide. Collez une adresse PI ou un numéro avec indicatif.</p>}
          </div>
          <div className="pispi-compliance-note"><M_Icon name="badge-check" /><span>Le contact sera enregistré avec le tag @PI dans le carnet d'adresses.</span></div>
        </div>
        <div className="pispi-form-actions">
          <button type="button" className="pispi-secondary-cta">Annuler</button>
          <button type="button" className="cta">{newContact ? 'Enregistrer et continuer' : 'Enregistrer'}</button>
        </div>
      </div>
    );
  }

  if (mode === 'permission') {
    return (
      <div className="phone-screen pispi-screen" data-screen-label="PiSPI Contacts permission">
        <StatusBar />
        <MNav title="Contacts et Alias" onBack={() => {}} />
        <div className="pispi-content compact">
          <section className="pispi-contact-permission">
            <span><M_Icon name="contact-round" /></span>
            <h2>Autoriser les contacts</h2>
            <p>PI-SPI peut afficher vos contacts pour vous aider à associer ou retrouver leurs alias de paiement.</p>
            <button type="button">Autoriser l'accès</button>
          </section>
        </div>
      </div>
    );
  }

  if (['contact-actions', 'delete-contact', 'alias-removed'].includes(mode)) {
    const removed = mode === 'alias-removed';
    const deleted = mode === 'delete-contact';
    return (
      <div className="phone-screen pispi-screen" data-screen-label="PiSPI Contact détail">
        <StatusBar />
        <MNav title={deleted ? 'Contact supprimé' : selected.name} onBack={() => {}} />
        <div className="pispi-content compact">
          <section className="pispi-contact-detail-card">
            <PiSPIAvatar name={selected.name} tone={selected.tone} />
            <h2>{selected.name}</h2>
            <p>{removed ? selected.phone : selected.alias}</p>
            {deleted && <div className="pispi-inline-toast success"><M_Icon name="check" /> Contact supprimé du téléphone</div>}
            {removed && <div className="pispi-inline-toast success"><M_Icon name="check" /> Alias supprimé, numéro conservé</div>}
          </section>
          {!deleted && !removed && (
            <div className="pispi-contact-actions">
              <button type="button"><M_Icon name="pencil" /> Modifier l'alias</button>
              <button type="button" className="danger"><M_Icon name="trash-2" /> Supprimer l'alias</button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="phone-screen pispi-screen" data-screen-label="PiSPI Contacts et Alias">
      <StatusBar />
      <MNav title="Contacts et Alias" onBack={() => {}} />
      <div className="pispi-content compact">
        <div className="pispi-search-field"><M_Icon name="search" /><span>Rechercher un contact ou un alias</span></div>
        <button className="pispi-new-contact-card" type="button">
          <span><M_Icon name="user-plus" /></span>
          <span className="body"><strong>Nouveau contact</strong><small>Ajouter un contact avec son alias</small></span>
          <M_Icon name="chevron-right" />
        </button>
        <div className="pispi-send-letter">A</div>
        <div className="pispi-contact-list">
          {PISPI_ALIAS_CONTACTS.map(contact => <PiSPIAliasContactRow key={contact.name} contact={contact} />)}
        </div>
      </div>
    </div>
  );
};

const PiSPIProfileScreen = () => {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  return (
    <div className="phone-screen pispi-screen" data-screen-label="PiSPI Profil">
      <StatusBar />
      <MNav title="Profil" onBack={() => {}} />
      <div className="pispi-content compact">
        <section className="pispi-profile-top">
          <PiSPIAvatar name="Moustapha K." tone="brand" />
          <div><h2>Moustapha Kodjo</h2><p>Client particulier · SPI vérifié</p></div>
        </section>
        <div className="pispi-option-list">
          {[
            ['circle-user', 'Compte', 'Informations personnelles et détails du compte'],
            ['shield', 'Sécurité & confidentialité', 'PIN, biométrie, cacher les montants'],
            ['settings', "Paramètres de l'application", 'Langue, thème, notifications, QR Code'],
            ['help-circle', "Centre d'aide", 'Support et assistance SPI'],
          ].map(([icon, title, text]) => (
            <button className="pispi-option-row" key={title}>
              <span className="icon"><M_Icon name={icon} /></span>
              <span className="body"><strong>{title}</strong><small>{text}</small></span>
              <M_Icon name="chevron-right" />
            </button>
          ))}
        </div>
        <button className="m-cta-danger"><M_Icon name="log-out" />Déconnexion</button>
        <div className="pispi-version">Version 0.0.1 · PI/SPI</div>
      </div>
    </div>
  );
};

const PiSPISettingsScreen = () => {
  const [qr, setQr] = React.useState(true);
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); }, [qr]);
  return (
    <div className="phone-screen pispi-screen" data-screen-label="PiSPI Paramètres">
      <StatusBar />
      <MNav title="Paramètres" onBack={() => {}} />
      <div className="pispi-content compact">
        <div className="pispi-option-list">
          <button className="pispi-option-row"><span className="icon"><M_Icon name="languages" /></span><span className="body"><strong>Langue</strong><small>Français</small></span><M_Icon name="chevron-right" /></button>
          <button className="pispi-option-row"><span className="icon"><M_Icon name="palette" /></span><span className="body"><strong>Thème</strong><small>Système</small></span><M_Icon name="chevron-right" /></button>
          <button className="pispi-option-row"><span className="icon"><M_Icon name="bell" /></span><span className="body"><strong>Notifications</strong><small>Alertes · son Aurora · vibration</small></span><M_Icon name="chevron-right" /></button>
          <button className="pispi-option-row" onClick={() => setQr(v => !v)}><span className="icon"><M_Icon name="qr-code" /></span><span className="body"><strong>Mon QR Code par défaut</strong><small>{qr ? 'Afficher le QR à l’ouverture' : 'Afficher le scanner'}</small></span><span className={`m-switch ${qr ? 'on' : ''}`}></span></button>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, {
  PiSPIMainAppHomeScreen,
  PiSPIHomeScreen,
  PiSPIAccountSwitchScreen,
  PiSPISendOptionsScreen,
  PiSPIRequestOptionsScreen,
  PiSPITransactionDetailScreen,
  PiSPICancellationRequestScreen,
  PiSPIPaymentShareScreen,
  PiSPIReceiptScreen,
  PiSPIReturnFundsScreen,
  PiSPICancellationDetailScreen,
  PiSPIPaymentRequestDetailScreen,
  PiSPIPaymentRequestFormScreen,
  PiSPIIntroScreen,
  PiSPILoginScreen,
  PiSPIPinScreen,
  PiSPIPermissionsScreen,
  PiSPIAliasScreen,
  PiSPIAliasSuccessScreen,
  PiSPIPhoneNumberLockedScreen,
  PiSPIOtpCodeScreen,
  PiSPIOtpResultModalScreen,
  PiSPIQrCodeScreen,
  PiSPITransactionFormScreen,
  PiSPITransferReviewScreen,
  PiSPITransactionSearchScreen,
  PiSPISubscriptionListScreen,
  PiSPISubscriptionCreateScreen,
  PiSPIScheduleFormScreen,
  PiSPIScheduledDetailScreen,
  PiSPICategoriesScreen,
  PiSPIContactCreateScreen,
  PiSPINotificationsScreen,
  PiSPIClaimDetailScreen,
  PiSPIClaimAcceptDialogScreen,
  PiSPIAliasProfileScreen,
  PiSPIContactsAliasScreen,
  PiSPIProfileScreen,
  PiSPISettingsScreen,
  PISPI_TX,
});
