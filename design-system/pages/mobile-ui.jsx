// Design System · Mobile UI Kit page — documentation grid of phone screens.

const MobileUI = () => {
  React.useEffect(() => {
    requestAnimationFrame(() => { if (window.lucide) window.lucide.createIcons(); });
  });

  const PhoneArt = ({ children }) => (
    <div className="phone"><div className="phone-screen">{children}</div></div>
  );

  // Interactive phone — full Home → Send / Detail / History / Settings flow.
  const InteractivePhone = () => {
    const [page, setPage] = React.useState('home');
    const [tx, setTx] = React.useState(null);

    React.useEffect(() => {
      requestAnimationFrame(() => { if (window.lucide) window.lucide.createIcons(); });
    }, [page]);

    const screen = page === 'home'    ? <HomeScreen onSelectTx={(t) => { setTx(t); setPage('detail'); }} onSend={() => setPage('send')} />
                : page === 'send'    ? <SendScreen onBack={() => setPage('home')} onContinue={() => setPage('home')} />
                : page === 'detail'  ? <DetailScreen tx={tx} onBack={() => setPage('home')} />
                : page === 'history' ? <HistoryScreen onBack={() => setPage('home')} />
                : page === 'more'    ? <SettingsScreen onBack={() => setPage('home')} />
                : <HomeScreen onSelectTx={(t) => { setTx(t); setPage('detail'); }} onSend={() => setPage('send')} />;
    const tabPage = page === 'detail' ? 'home' : (page === 'history' ? 'activity' : (page === 'more' ? 'more' : page));

    return (
      <div className="phone is-interactive">
        <div className="phone-screen">
          {screen}
          {page !== 'send' && (
            <TabBar current={tabPage}
              onNav={(t) => {
                if (t === 'send') setPage('send');
                else if (t === 'activity') setPage('history');
                else if (t === 'more') setPage('more');
                else setPage('home');
              }} />
          )}
        </div>
      </div>
    );
  };

  const SECTIONS = [
    { id: 'core', num: '01', title: 'Parcours client',
      lede: "Le cœur de l'expérience iMoney — accueil, envoi d'argent et détail d'une transaction. Le premier téléphone est interactif.",
      screens: [
        { id: 'home',   label: 'Accueil',            tag: 'Interactif',  interactive: true,
          render: () => <InteractivePhone /> },
        { id: 'send',   label: 'Envoyer · montant',  tag: 'Saisie',
          render: () => <PhoneArt><SendScreen onBack={() => {}} onContinue={() => {}} /></PhoneArt> },
        { id: 'detail', label: 'Détail transaction', tag: 'Statique',
          render: () => <PhoneArt><DetailScreen tx={HOME_TX[1]} onBack={() => {}} /></PhoneArt> },
      ],
    },
    { id: 'money', num: '02', title: 'Argent',
      lede: 'Recharge du compte, dépôt en agence et historique complet — vues client et agent.',
      screens: [
        { id: 'recharger',  label: 'Recharger mon compte',         tag: 'Client',
          render: () => <PhoneArt><RechargeScreen onBack={() => {}} /></PhoneArt> },
        { id: 'depot',      label: 'Dépôt agent',                  tag: 'Agent',
          render: () => <PhoneArt><DepositScreen onBack={() => {}} /></PhoneArt> },
        { id: 'historique', label: 'Historique des transactions',  tag: 'Client',
          render: () => <PhoneArt><HistoryScreen onBack={() => {}} /></PhoneArt> },
      ],
    },
    { id: 'account', num: '03', title: 'Compte',
      lede: "Vérification d'identité (KYC), paramètres client et paramètres agent — incluant l'accès aux outils de transaction côté agent.",
      screens: [
        { id: 'kyc',          label: "Vérification d'identité",   tag: 'KYC',
          render: () => <PhoneArt><KYCScreen onBack={() => {}} /></PhoneArt> },
        { id: 'params',       label: 'Paramètres · client',       tag: 'Client',
          render: () => <PhoneArt><SettingsScreen onBack={() => {}} /></PhoneArt> },
        { id: 'params-agent', label: 'Paramètres · agent',        tag: 'Agent',
          render: () => <PhoneArt><AgentSettingsScreen onBack={() => {}} /></PhoneArt> },
        { id: 'tx-menu',      label: 'Menu Transactions · agent', tag: 'Agent',
          render: () => <PhoneArt><TxMenuScreen onBack={() => {}} /></PhoneArt> },
      ],
    },
    { id: 'cards', num: '04', title: 'Carte VISA',
      lede: 'Cycle de vie complet de la carte VISA virtuelle : liste, détail (avec état d\'erreur), recharge et création.',
      screens: [
        { id: 'cards-list',    label: 'Mes cartes VISA',          tag: 'Liste',
          render: () => <PhoneArt><CardsListScreen onBack={() => {}} onOpenCard={() => {}} onCreate={() => {}} /></PhoneArt> },
        { id: 'card-detail',   label: 'Carte · détail (erreur)',  tag: 'État erreur',
          render: () => <PhoneArt><CardDetailScreen onBack={() => {}} onRecharge={() => {}} /></PhoneArt> },
        { id: 'card-recharge', label: 'Recharger ma carte',       tag: 'Flux',
          render: () => <PhoneArt><CardRechargeScreen onBack={() => {}} /></PhoneArt> },
        { id: 'card-create',   label: 'Créer une nouvelle carte', tag: 'Flux',
          render: () => <PhoneArt><CardCreateScreen onBack={() => {}} /></PhoneArt> },
      ],
    },
  ];

  const totalScreens = SECTIONS.reduce((n, s) => n + s.screens.length, 0);

  return (
    <div className="mk-page">
      <header className="mk-head">
        <div className="mk-eyebrow">UI Kit · Mobile</div>
        <h1 className="mk-title">iMoney — application mobile</h1>
        <p className="mk-lede">
          {totalScreens} écrans organisés en {SECTIONS.length} parcours.
          Chaque écran est rendu à 70&nbsp;% de sa taille native (iPhone 14, 390×844).
          Le premier téléphone du premier parcours est interactif — cliquez les onglets pour naviguer.
        </p>
        <nav className="mk-toc">
          {SECTIONS.map(s => (
            <a key={s.id} href={`#sec-${s.id}`}>
              {s.title}<span className="mk-count">{s.screens.length}</span>
            </a>
          ))}
        </nav>
      </header>

      {SECTIONS.map(sec => (
        <section key={sec.id} className="mk-section" id={`sec-${sec.id}`}>
          <div className="mk-section-head">
            <div className="num">{sec.num}</div>
            <div className="body">
              <h2>{sec.title}</h2>
              <p>{sec.lede}</p>
            </div>
            <div className="count">{sec.screens.length} écrans</div>
          </div>
          <div className="mk-grid">
            {sec.screens.map(scr => (
              <div key={scr.id} className="mk-card">
                <div className="mk-frame">{scr.render()}</div>
                <div className="mk-caption">
                  {scr.tag && <span className={`mk-tag ${scr.interactive ? '' : 'muted'}`}>{scr.tag}</span>}
                  <span>{scr.label}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

window.MobileUI = MobileUI;
