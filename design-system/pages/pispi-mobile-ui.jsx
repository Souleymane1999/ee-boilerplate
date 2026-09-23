// PiSPI Mobile UI page — current Flutter app screens redrawn in the Delta Force style.
const PiSPIMobileUI = () => {
  React.useEffect(() => {
    requestAnimationFrame(() => { if (window.lucide) window.lucide.createIcons(); });
  });

  const PhoneArt = ({ children }) => (
    <div className="phone"><div className="phone-screen">{children}</div></div>
  );

  const InteractivePiSPIPhone = () => {
    const [page, setPage] = React.useState('main');
    const [tx, setTx] = React.useState(PISPI_TX[0]);

    React.useEffect(() => {
      requestAnimationFrame(() => { if (window.lucide) window.lucide.createIcons(); });
    }, [page, tx]);

    if (page === 'main') {
      return <PiSPIMainAppHomeScreen onOpenPi={() => setPage('alias')} />;
    }

    if (page === 'alias') {
      return (
        <PiSPIAliasScreen
          onBack={() => setPage('main')}
          onAddressSelect={() => setPage('alias-success')}
          onPhoneSelect={() => setPage('phone-locked')}
        />
      );
    }

    if (page === 'alias-success') {
      return <PiSPIAliasSuccessScreen onContinue={() => setPage('home')} />;
    }

    if (page === 'phone-locked') {
      return <PiSPIPhoneNumberLockedScreen onBack={() => setPage('alias')} onContinue={() => setPage('otp')} />;
    }

    if (page === 'otp') {
      return <PiSPIOtpCodeScreen onBack={() => setPage('phone-locked')} keyboard />;
    }

    if (page === 'send') {
      return <PiSPISendOptionsScreen onBack={() => setPage('home')} />;
    }

    if (page === 'request') {
      return <PiSPIRequestOptionsScreen onBack={() => setPage('home')} />;
    }

    if (page === 'detail') {
      return <PiSPITransactionDetailScreen tx={tx} onBack={() => setPage('home')} />;
    }

    if (page === 'history') {
      return <PiSPITransactionSearchScreen onBack={() => setPage('home')} />;
    }

    return (
      <PiSPIHomeScreen
        onBack={() => setPage('main')}
        onSend={() => setPage('send')}
        onReceive={() => setPage('request')}
        onShowAll={() => setPage('history')}
        onSelectTx={(selected) => { setTx(selected); setPage('detail'); }}
      />
    );
  };

  const SECTIONS = [
    {
      id: 'core',
      num: '01',
      title: 'Parcours principal',
      lede: "Point d'entrée de l'application, création d'alias puis accueil compte PI.",
      screens: [
        { id: 'app-home', label: 'Accueil app · Services', tag: 'Interactif', interactive: true,
          render: () => <div className="phone is-interactive"><InteractivePiSPIPhone /></div> },
        { id: 'alias', label: 'Créer un alias', tag: 'Identité',
          render: () => <PhoneArt><PiSPIAliasScreen onBack={() => {}} onSelect={() => {}} /></PhoneArt> },
        { id: 'alias-success', label: 'Alias créé', tag: 'Modal',
          render: () => <PhoneArt><PiSPIAliasSuccessScreen onContinue={() => {}} /></PhoneArt> },
        { id: 'phone-locked', label: 'Numéro téléphone', tag: 'Verrouillé',
          render: () => <PhoneArt><PiSPIPhoneNumberLockedScreen onBack={() => {}} /></PhoneArt> },
        { id: 'otp-code', label: 'Code OTP', tag: 'Sécurité',
          render: () => <PhoneArt><PiSPIOtpCodeScreen onBack={() => {}} /></PhoneArt> },
        { id: 'otp-code-keyboard', label: 'Code OTP avec clavier', tag: 'Saisie',
          render: () => <PhoneArt><PiSPIOtpCodeScreen onBack={() => {}} keyboard /></PhoneArt> },
        { id: 'otp-resend', label: 'Renvoyer le code', tag: 'Relance',
          render: () => <PhoneArt><PiSPIOtpCodeScreen onBack={() => {}} keyboard resendReady /></PhoneArt> },
        { id: 'otp-keyboard', label: 'OTP rempli avec clavier', tag: 'Saisie',
          render: () => <PhoneArt><PiSPIOtpCodeScreen onBack={() => {}} filled keyboard /></PhoneArt> },
        { id: 'otp-error', label: 'OTP erreur', tag: 'Erreur',
          render: () => <PhoneArt><PiSPIOtpCodeScreen onBack={() => {}} filled keyboard error /></PhoneArt> },
        { id: 'otp-success-modal', label: 'Modal succès OTP', tag: 'Succès',
          render: () => <PhoneArt><PiSPIOtpResultModalScreen variant="success" /></PhoneArt> },
        { id: 'otp-failure-modal', label: 'Modal échec OTP', tag: 'Échec',
          render: () => <PhoneArt><PiSPIOtpResultModalScreen variant="failure" /></PhoneArt> },
        { id: 'otp-claim-modal', label: 'Alias en revendication', tag: 'Échec',
          render: () => <PhoneArt><PiSPIOtpResultModalScreen variant="claim-pending" /></PhoneArt> },
        { id: 'claim-sent-modal', label: 'Revendication envoyée', tag: 'Succès',
          render: () => <PhoneArt><PiSPIOtpResultModalScreen variant="claim-sent" /></PhoneArt> },
        { id: 'claim-sent-home-modal', label: 'Revendication · Accueil', tag: 'Succès',
          render: () => <PhoneArt><PiSPIOtpResultModalScreen variant="claim-sent-home" /></PhoneArt> },
        { id: 'home', label: 'PI SPI · Compte', tag: 'Service',
          render: () => <PhoneArt><PiSPIHomeScreen onSend={() => {}} onReceive={() => {}} onSelectTx={() => {}} /></PhoneArt> },
      ],
    },
    {
      id: 'access',
      num: '02',
      title: 'Accès & conformité',
      lede: "Onboarding, connexion, contrôle PIN et autorisations système avec la marque SPI visible dans les points réglementaires.",
      screens: [
        { id: 'intro', label: 'Introduction SPI', tag: 'Onboarding',
          render: () => <PhoneArt><PiSPIIntroScreen onContinue={() => {}} /></PhoneArt> },
        { id: 'login', label: 'Connexion', tag: 'Auth',
          render: () => <PhoneArt><PiSPILoginScreen /></PhoneArt> },
        { id: 'pin', label: 'Code PIN', tag: 'Sécurité',
          render: () => <PhoneArt><PiSPIPinScreen /></PhoneArt> },
        { id: 'permissions', label: 'Autorisations', tag: 'Système',
          render: () => <PhoneArt><PiSPIPermissionsScreen /></PhoneArt> },
      ],
    },
    {
      id: 'identity',
      num: '03',
      title: 'Alias & QR',
      lede: "Écrans d'identité de paiement : QR Code partageable et identité de réception.",
      screens: [
        { id: 'qr', label: 'Mon QR Code', tag: 'Paiement',
          render: () => <PhoneArt><PiSPIQrCodeScreen /></PhoneArt> },
      ],
    },
    {
      id: 'transfer',
      num: '04',
      title: 'Paiements & historique',
      lede: "Formulaire de transfert, vérification avant PIN et recherche dans l'historique des mouvements PI/SPI.",
      screens: [
        { id: 'send', label: 'Envoyer', tag: 'Flux',
          render: () => <PhoneArt><PiSPISendOptionsScreen onBack={() => {}} /></PhoneArt> },
        { id: 'request-payment', label: 'Demande de paiement', tag: 'Flux',
          render: () => <PhoneArt><PiSPIRequestOptionsScreen onBack={() => {}} /></PhoneArt> },
        { id: 'transactions-complete', label: 'Transactions complètes', tag: 'Liste',
          render: () => <PhoneArt><PiSPITransactionSearchScreen onBack={() => {}} /></PhoneArt> },
        { id: 'transfer-form', label: 'Formulaire transfert', tag: 'Saisie',
          render: () => <PhoneArt><PiSPITransactionFormScreen /></PhoneArt> },
        { id: 'transfer-review', label: 'Vérification transfert', tag: 'Validation',
          render: () => <PhoneArt><PiSPITransferReviewScreen /></PhoneArt> },
        { id: 'detail', label: 'Détail transaction', tag: 'Actions',
          render: () => <PhoneArt><PiSPITransactionDetailScreen tx={PISPI_TX[0]} onBack={() => {}} /></PhoneArt> },
        { id: 'history', label: 'Historique filtré', tag: 'Recherche',
          render: () => <PhoneArt><PiSPITransactionSearchScreen /></PhoneArt> },
      ],
    },
    {
      id: 'organization',
      num: '05',
      title: 'Organisation',
      lede: "Paiements programmés, création d'abonnement, catégories d'analyse et carnet de contacts PI.",
      screens: [
        { id: 'subscriptions', label: 'Abonnements', tag: 'Planifié',
          render: () => <PhoneArt><PiSPISubscriptionListScreen /></PhoneArt> },
        { id: 'subscription-create', label: 'Créer abonnement', tag: 'Formulaire',
          render: () => <PhoneArt><PiSPISubscriptionCreateScreen /></PhoneArt> },
        { id: 'categories', label: 'Catégories', tag: 'Analyse',
          render: () => <PhoneArt><PiSPICategoriesScreen /></PhoneArt> },
        { id: 'contact-create', label: 'Nouveau contact', tag: 'Répertoire',
          render: () => <PhoneArt><PiSPIContactCreateScreen /></PhoneArt> },
      ],
    },
    {
      id: 'profile',
      num: '06',
      title: 'Notifications & profil',
      lede: "Alertes SPI, profil vérifié et paramètres d'application dans un traitement proche du kit mobile Delta Force.",
      screens: [
        { id: 'notifications', label: 'Notifications', tag: 'Alertes',
          render: () => <PhoneArt><PiSPINotificationsScreen /></PhoneArt> },
        { id: 'claim-detail', label: "Revendication d'alias", tag: 'Alias',
          render: () => <PhoneArt><PiSPIClaimDetailScreen /></PhoneArt> },
        { id: 'claim-confirm', label: 'Confirmation revendication', tag: 'Dialogue',
          render: () => <PhoneArt><PiSPIClaimAcceptDialogScreen /></PhoneArt> },
        { id: 'claim-auth', label: 'Authentification revendication', tag: 'Sécurité',
          render: () => <PhoneArt><PiSPIClaimAcceptDialogScreen variant="auth" /></PhoneArt> },
        { id: 'claim-accepted', label: 'Revendication acceptée', tag: 'Succès',
          render: () => <PhoneArt><PiSPIClaimAcceptDialogScreen variant="success" /></PhoneArt> },
        { id: 'profile', label: 'Profil', tag: 'Compte',
          render: () => <PhoneArt><PiSPIProfileScreen /></PhoneArt> },
        { id: 'settings', label: 'Paramètres', tag: 'Réglages',
          render: () => <PhoneArt><PiSPISettingsScreen /></PhoneArt> },
      ],
    },
  ];

  const totalScreens = SECTIONS.reduce((n, s) => n + s.screens.length, 0);
  const allScreens = SECTIONS.flatMap(sec => sec.screens.map(scr => ({ ...scr, sectionId: sec.id, sectionTitle: sec.title })));
  const defaultScreenIds = allScreens.map(scr => scr.id);
  const sectionById = Object.fromEntries(SECTIONS.map(sec => [sec.id, sec]));
  const screenById = Object.fromEntries(allScreens.map(scr => [scr.id, scr]));
  const screenLayoutStorageKey = 'pispi-mobile-screen-layout-v1';
  const [hiddenScreenIds, setHiddenScreenIds] = React.useState([]);
  const [screenLayout, setScreenLayout] = React.useState(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem(screenLayoutStorageKey) || '{}');
      return {
        order: Array.isArray(saved.order) ? saved.order : [],
        sections: saved.sections && typeof saved.sections === 'object' ? saved.sections : {},
      };
    } catch (error) {
      return { order: [], sections: {} };
    }
  });
  const [dragTarget, setDragTarget] = React.useState(null);
  const [draggedScreenId, setDraggedScreenId] = React.useState(null);
  const dragTargetRef = React.useRef(null);
  const draggedScreenIdRef = React.useRef(null);

  React.useEffect(() => {
    try {
      window.localStorage.setItem(screenLayoutStorageKey, JSON.stringify(screenLayout));
    } catch (error) {}
  }, [screenLayout]);
  React.useEffect(() => { dragTargetRef.current = dragTarget; }, [dragTarget]);
  React.useEffect(() => { draggedScreenIdRef.current = draggedScreenId; }, [draggedScreenId]);

  const normalizeOrder = (order = []) => {
    const known = order.filter(id => screenById[id]);
    const missing = defaultScreenIds.filter(id => !known.includes(id));
    return [...known, ...missing];
  };

  const orderedScreenIds = normalizeOrder(screenLayout.order);
  const screenSectionId = (screenId) => screenLayout.sections?.[screenId] || screenById[screenId]?.sectionId;
  const screensForSection = (sectionId) => orderedScreenIds
    .map(id => screenById[id])
    .filter(scr => scr && screenSectionId(scr.id) === sectionId);
  const visibleScreensForSection = (sectionId) => screensForSection(sectionId).filter(scr => !isHidden(scr.id));
  const hiddenScreens = allScreens.filter(scr => hiddenScreenIds.includes(scr.id));
  const visibleTotalScreens = totalScreens - hiddenScreenIds.length;
  const isHidden = (id) => hiddenScreenIds.includes(id);
  const hideScreen = (id) => setHiddenScreenIds(ids => ids.includes(id) ? ids : [...ids, id]);
  const restoreScreen = (id) => setHiddenScreenIds(ids => ids.filter(item => item !== id));
  const restoreFromSelect = (event) => {
    const value = event.target.value;
    if (!value) return;
    if (value === '__all') setHiddenScreenIds([]);
    else restoreScreen(value);
    event.target.value = '';
  };
  const moveScreen = (screenId, targetSectionId, beforeId = null) => {
    if (!screenById[screenId]) return;
    setScreenLayout(layout => {
      const nextOrder = normalizeOrder(layout.order).filter(id => id !== screenId);
      const beforeIndex = beforeId && beforeId !== screenId ? nextOrder.indexOf(beforeId) : -1;
      if (beforeIndex >= 0) nextOrder.splice(beforeIndex, 0, screenId);
      else nextOrder.push(screenId);

      const nextSections = { ...(layout.sections || {}) };
      if (targetSectionId && targetSectionId !== screenById[screenId].sectionId) nextSections[screenId] = targetSectionId;
      else delete nextSections[screenId];

      return { order: nextOrder, sections: nextSections };
    });
  };
  React.useEffect(() => {
    if (!draggedScreenId) return undefined;

    const handlePointerMove = (event) => {
      const node = document.elementFromPoint(event.clientX, event.clientY);
      const card = node?.closest?.('.mk-card[data-screen-id]');
      if (card) {
        setDragTarget({ sectionId: card.dataset.sectionId, beforeId: card.dataset.screenId });
        return;
      }

      const grid = node?.closest?.('.mk-grid[data-section-id]');
      if (grid) setDragTarget({ sectionId: grid.dataset.sectionId, beforeId: null });
    };
    const handlePointerUp = () => {
      const target = dragTargetRef.current;
      const screenId = draggedScreenIdRef.current;
      if (target && screenId && screenId !== target.beforeId) moveScreen(screenId, target.sectionId, target.beforeId);
      setDraggedScreenId(null);
      setDragTarget(null);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [draggedScreenId]);
  const handlePointerDragStart = (event, screenId) => {
    if (event.button !== undefined && event.button !== 0) return;
    event.preventDefault();
    setDraggedScreenId(screenId);
    setDragTarget({ sectionId: screenSectionId(screenId), beforeId: screenId });
  };
  const handleDragStart = (event, screenId) => {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', screenId);
    setDraggedScreenId(screenId);
  };
  const handleDragOver = (event, sectionId, beforeId = null) => {
    if (!draggedScreenId) return;
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = 'move';
    setDragTarget({ sectionId, beforeId });
  };
  const handleDrop = (event, sectionId, beforeId = null) => {
    event.preventDefault();
    event.stopPropagation();
    const screenId = event.dataTransfer.getData('text/plain') || draggedScreenId;
    if (screenId && screenId !== beforeId) moveScreen(screenId, sectionId, beforeId);
    setDraggedScreenId(null);
    setDragTarget(null);
  };
  const handleDragEnd = () => {
    setDraggedScreenId(null);
    setDragTarget(null);
  };
  const resetScreenOrder = () => {
    setScreenLayout({ order: [], sections: {} });
    try { window.localStorage.removeItem(screenLayoutStorageKey); } catch (error) {}
  };
  const hasCustomOrder = screenLayout.order.length > 0 || Object.keys(screenLayout.sections || {}).length > 0;

  return (
    <div className="mk-page pispi-mk-page" style={{ '--mk-phone-scale': 0.66 }}>
      <header className="mk-head">
        <div className="mk-eyebrow">UI Kit · PiSPI mobile</div>
        <h1 className="mk-title">PiSPI — application mobile</h1>
        <p className="mk-lede">
          {visibleTotalScreens} écrans visibles sur {totalScreens}, redessinés dans le style Delta Force.
          Le premier téléphone est interactif : ouvrez le service PI-SPI puis choisissez un alias.
        </p>
        <div className="mk-screen-tools">
          <span>{visibleTotalScreens}/{totalScreens} visibles</span>
          <button type="button" className="mk-tool-button" onClick={resetScreenOrder} disabled={!hasCustomOrder}>
            <M_Icon name="rotate-ccw" /> Réinitialiser l'ordre
          </button>
          <select defaultValue="" onChange={restoreFromSelect} aria-label="Réactiver un écran masqué">
            <option value="">{hiddenScreens.length ? 'Réactiver un écran masqué' : 'Aucun écran masqué'}</option>
            {hiddenScreens.map(scr => (
              <option key={scr.id} value={scr.id}>{scr.label} · {sectionById[screenSectionId(scr.id)]?.title || scr.sectionTitle}</option>
            ))}
            {hiddenScreens.length > 0 && <option value="__all">Tout réactiver</option>}
          </select>
        </div>
        <nav className="mk-toc">
          {SECTIONS.map(s => {
            const visibleCount = visibleScreensForSection(s.id).length;
            return <a key={s.id} href={`#sec-pispi-${s.id}`}>
              {s.title}<span className="mk-count">{visibleCount}</span>
            </a>
          })}
        </nav>
      </header>

      {SECTIONS.map(sec => {
        const sectionScreens = screensForSection(sec.id);
        const visibleScreens = sectionScreens.filter(scr => !isHidden(scr.id));
        return <section key={sec.id} className="mk-section" id={`sec-pispi-${sec.id}`}>
          <div className="mk-section-head">
            <div className="num">{sec.num}</div>
            <div className="body">
              <h2>{sec.title}</h2>
              <p>{sec.lede}</p>
            </div>
            <div className="count">{visibleScreens.length}/{sectionScreens.length} écrans</div>
          </div>
          <div
            className={`mk-grid ${dragTarget?.sectionId === sec.id && !dragTarget.beforeId ? 'is-drop-zone' : ''}`}
            onDragOver={(event) => handleDragOver(event, sec.id)}
            onDrop={(event) => handleDrop(event, sec.id)}
            data-section-id={sec.id}
          >
            {visibleScreens.map(scr => (
              <div
                key={scr.id}
                className={`mk-card ${draggedScreenId === scr.id ? 'is-dragging' : ''} ${dragTarget?.sectionId === sec.id && dragTarget.beforeId === scr.id ? 'is-drop-target' : ''}`}
                onDragOver={(event) => handleDragOver(event, sec.id, scr.id)}
                onDrop={(event) => handleDrop(event, sec.id, scr.id)}
                data-section-id={sec.id}
                data-screen-id={scr.id}
              >
                <div className="mk-frame">{scr.render()}</div>
                <div className="mk-caption">
                  <button
                    className="mk-drag-screen"
                    type="button"
                    draggable
                    onPointerDown={(event) => handlePointerDragStart(event, scr.id)}
                    onDragStart={(event) => handleDragStart(event, scr.id)}
                    onDragEnd={handleDragEnd}
                    title="Déplacer cet écran"
                    aria-label={`Déplacer ${scr.label}`}
                  >
                    <M_Icon name="grip-vertical" />
                  </button>
                  {scr.tag && <span className={`mk-tag ${scr.interactive ? '' : 'muted'}`}>{scr.tag}</span>}
                  <span className="mk-caption-label">{scr.label}</span>
                  <button className="mk-hide-screen" onClick={() => hideScreen(scr.id)} title="Masquer cet écran">
                    <M_Icon name="eye-off" />
                  </button>
                </div>
              </div>
            ))}
            {!visibleScreens.length && <div className="mk-empty-section">Tous les écrans de cette section sont masqués.</div>}
          </div>
        </section>
      })}
    </div>
  );
};

window.PiSPIMobileUI = PiSPIMobileUI;
