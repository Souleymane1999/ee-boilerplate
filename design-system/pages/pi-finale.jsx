// PiFinale — developer handoff catalog for the final PI mobile experience.
const PiFinale = () => {
  React.useEffect(() => {
    const raf = requestAnimationFrame(() => { if (window.lucide) window.lucide.createIcons(); });
    return () => cancelAnimationFrame(raf);
  });

  const PhoneArt = ({ children }) => (
    <div className="phone"><div className="phone-screen">{children}</div></div>
  );

  const ScreenCard = ({ screen }) => (
    <div className="pifinale-screen-card">
      <div className="mk-frame">{screen.render()}</div>
      <div className="pifinale-caption">
        <span>{screen.tag}</span>
        <strong>{screen.label}</strong>
      </div>
    </div>
  );

  const FlowSteps = ({ items }) => (
    <div className="pifinale-flow">
      {items.map((item, index) => (
        <React.Fragment key={item}>
          {index > 0 && <i data-lucide="arrow-right"></i>}
          <span>{item}</span>
        </React.Fragment>
      ))}
    </div>
  );

  const SECTIONS = [
    {
      id: 'entry',
      num: '01',
      title: "Entrée dans l'espace PI",
      summary: "Point d'accès depuis l'application principale, ouverture du service et premier état de compte.",
      flow: ['Accueil app', 'Service PI', 'Compte PI'],
      screens: [
        { label: 'Accueil app', tag: 'App', render: () => <PhoneArt><PiSPIMainAppHomeScreen onOpenPi={() => {}} /></PhoneArt> },
        { label: 'Compte PI', tag: 'Home', render: () => <PhoneArt><PiSPIHomeScreen onSend={() => {}} onReceive={() => {}} onSelectTx={() => {}} /></PhoneArt> },
        { label: 'Choix compte', tag: 'Compte', render: () => <PhoneArt><PiSPIAccountSwitchScreen onBack={() => {}} /></PhoneArt> },
      ],
    },
    {
      id: 'enrolment',
      num: '02',
      title: 'Création et revendication alias',
      summary: "Création d'adresse PI, sélection du téléphone Niger, OTP, erreurs et succès de revendication.",
      flow: ['Créer un alias', 'Téléphone', 'OTP', 'Succès ou revendication'],
      screens: [
        { label: 'Créer un alias', tag: 'Identité', render: () => <PhoneArt><PiSPIAliasScreen onBack={() => {}} onAddressSelect={() => {}} onPhoneSelect={() => {}} /></PhoneArt> },
        { label: 'Numéro téléphone', tag: 'Alias', render: () => <PhoneArt><PiSPIPhoneNumberLockedScreen onBack={() => {}} onContinue={() => {}} /></PhoneArt> },
        { label: 'Téléphone éditable', tag: 'Saisie', render: () => <PhoneArt><PiSPIPhoneNumberLockedScreen onBack={() => {}} keyboard /></PhoneArt> },
        { label: 'Code OTP', tag: 'Sécurité', render: () => <PhoneArt><PiSPIOtpCodeScreen onBack={() => {}} keyboard /></PhoneArt> },
        { label: 'Renvoyer code', tag: 'Relance', render: () => <PhoneArt><PiSPIOtpCodeScreen onBack={() => {}} keyboard resendReady /></PhoneArt> },
        { label: 'Erreur OTP', tag: 'Erreur', render: () => <PhoneArt><PiSPIOtpCodeScreen onBack={() => {}} filled keyboard error /></PhoneArt> },
        { label: 'Alias créé', tag: 'Succès', render: () => <PhoneArt><PiSPIAliasSuccessScreen onContinue={() => {}} /></PhoneArt> },
        { label: 'Alias pris', tag: 'Erreur', render: () => <PhoneArt><PiSPIOtpResultModalScreen variant="failure" /></PhoneArt> },
        { label: 'Revendication envoyée', tag: 'Succès', render: () => <PhoneArt><PiSPIOtpResultModalScreen variant="claim-sent" /></PhoneArt> },
      ],
    },
    {
      id: 'identity',
      num: '03',
      title: 'Identité PI et QR',
      summary: "Alias visible, QR Code PI, partage, profil compte et paramètres utiles à l'identité utilisateur.",
      flow: ['Mon QR Code', 'Profil', 'Contacts alias'],
      screens: [
        { label: 'Mon QR Code', tag: 'QR', render: () => <PhoneArt><PiSPIQrCodeScreen /></PhoneArt> },
        { label: 'Alias profil', tag: 'Profil', render: () => <PhoneArt><PiSPIAliasProfileScreen /></PhoneArt> },
        { label: 'Profil utilisateur', tag: 'Compte', render: () => <PhoneArt><PiSPIProfileScreen /></PhoneArt> },
        { label: 'Paramètres', tag: 'Réglages', render: () => <PhoneArt><PiSPISettingsScreen /></PhoneArt> },
        { label: 'Contacts alias', tag: 'Répertoire', render: () => <PhoneArt><PiSPIContactsAliasScreen /></PhoneArt> },
        { label: 'Nouveau contact', tag: 'Formulaire', render: () => <PhoneArt><PiSPIContactCreateScreen /></PhoneArt> },
      ],
    },
    {
      id: 'payments',
      num: '04',
      title: 'Envoyer et recevoir',
      summary: "Options d'envoi, demandes de paiement, formulaires, confirmation, détails et historique complet.",
      flow: ['Options', 'Formulaire', 'Confirmation', 'Détail'],
      screens: [
        { label: 'Envoyer', tag: 'Flux', render: () => <PhoneArt><PiSPISendOptionsScreen onBack={() => {}} /></PhoneArt> },
        { label: 'Demande paiement', tag: 'Recevoir', render: () => <PhoneArt><PiSPIRequestOptionsScreen onBack={() => {}} /></PhoneArt> },
        { label: 'Formulaire transfert', tag: 'Saisie', render: () => <PhoneArt><PiSPITransactionFormScreen /></PhoneArt> },
        { label: 'Confirmation transfert', tag: 'Validation', render: () => <PhoneArt><PiSPITransferReviewScreen /></PhoneArt> },
        { label: 'Détail transaction', tag: 'Détail', render: () => <PhoneArt><PiSPITransactionDetailScreen tx={PISPI_TX[0]} onBack={() => {}} /></PhoneArt> },
        { label: 'Historique', tag: 'Liste', render: () => <PhoneArt><PiSPITransactionSearchScreen onBack={() => {}} /></PhoneArt> },
        { label: 'Demande reçue', tag: 'Request', render: () => <PhoneArt><PiSPIPaymentRequestDetailScreen /></PhoneArt> },
        { label: 'Créer demande', tag: 'Formulaire', render: () => <PhoneArt><PiSPIPaymentRequestFormScreen /></PhoneArt> },
      ],
    },
    {
      id: 'edge-cases',
      num: '05',
      title: 'Cas opérationnels',
      summary: "Annulation, partage de paiement, reçu, retour de fonds et états qui ferment les parcours réglementaires.",
      flow: ['Notification', 'Détail', 'Action', 'Résultat'],
      screens: [
        { label: 'Demande annulation', tag: 'Annulation', render: () => <PhoneArt><PiSPICancellationRequestScreen /></PhoneArt> },
        { label: 'Détail annulation', tag: 'Annulation', render: () => <PhoneArt><PiSPICancellationDetailScreen /></PhoneArt> },
        { label: 'Paiement partagé', tag: 'Partage', render: () => <PhoneArt><PiSPIPaymentShareScreen /></PhoneArt> },
        { label: 'Reçu paiement', tag: 'Reçu', render: () => <PhoneArt><PiSPIReceiptScreen /></PhoneArt> },
        { label: 'Retour fonds', tag: 'Retour', render: () => <PhoneArt><PiSPIReturnFundsScreen /></PhoneArt> },
      ],
    },
    {
      id: 'scheduled',
      num: '06',
      title: 'Programmer et organiser',
      summary: "Abonnements, programmation, catégories et écrans de gestion des paiements récurrents.",
      flow: ['Abonnements', 'Programmer', 'Détail', 'Catégoriser'],
      screens: [
        { label: 'Abonnements', tag: 'Liste', render: () => <PhoneArt><PiSPISubscriptionListScreen /></PhoneArt> },
        { label: 'Créer abonnement', tag: 'Création', render: () => <PhoneArt><PiSPISubscriptionCreateScreen /></PhoneArt> },
        { label: 'Programmer', tag: 'Saisie', render: () => <PhoneArt><PiSPIScheduleFormScreen /></PhoneArt> },
        { label: 'Détail programmé', tag: 'Détail', render: () => <PhoneArt><PiSPIScheduledDetailScreen /></PhoneArt> },
        { label: 'Catégories', tag: 'Analyse', render: () => <PhoneArt><PiSPICategoriesScreen /></PhoneArt> },
      ],
    },
    {
      id: 'notifications',
      num: '07',
      title: 'Notifications et revendications',
      summary: "Filtres notification, revendication d'alias, confirmation, authentification et état accepté.",
      flow: ['Notifications', 'Revendication', 'Confirmation', 'PIN', 'Succès'],
      screens: [
        { label: 'Notifications', tag: 'Alertes', render: () => <PhoneArt><PiSPINotificationsScreen /></PhoneArt> },
        { label: 'Revendication alias', tag: 'Détail', render: () => <PhoneArt><PiSPIClaimDetailScreen /></PhoneArt> },
        { label: 'Dialogue acceptation', tag: 'Dialogue', render: () => <PhoneArt><PiSPIClaimAcceptDialogScreen /></PhoneArt> },
        { label: 'PIN revendication', tag: 'Sécurité', render: () => <PhoneArt><PiSPIClaimAcceptDialogScreen variant="auth" /></PhoneArt> },
        { label: 'Revendication acceptée', tag: 'Succès', render: () => <PhoneArt><PiSPIClaimAcceptDialogScreen variant="success" /></PhoneArt> },
      ],
    },
  ];

  const totalScreens = SECTIONS.reduce((total, section) => total + section.screens.length, 0);

  return (
    <div className="mk-page pifinale-page" style={{ '--mk-phone-scale': 0.62 }}>
      <style>{`
        .pifinale-page .mk-head {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 24px;
          align-items: start;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--border-default);
        }
        .pifinale-page .mk-toc {
          grid-column: 1 / -1;
        }
        .pifinale-page .mk-lede { max-width: 760px; }
        .pifinale-meta {
          display: grid;
          grid-template-columns: repeat(2, minmax(112px, 1fr));
          gap: 10px;
          min-width: 280px;
        }
        .pifinale-stat {
          padding: 14px 16px;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          background: var(--bg-surface);
          box-shadow: var(--shadow-xs);
        }
        .pifinale-stat span {
          display: block;
          color: var(--fg-4);
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-weight: 800;
        }
        .pifinale-stat strong {
          display: block;
          margin-top: 6px;
          color: var(--fg-1);
          font-size: 22px;
          line-height: 1;
          font-weight: 900;
        }
        .pifinale-section {
          margin-top: 34px;
          scroll-margin-top: 16px;
        }
        .pifinale-section-head {
          display: grid;
          grid-template-columns: auto minmax(0, 1fr) auto;
          gap: 14px;
          align-items: start;
          margin-bottom: 18px;
          padding-bottom: 14px;
          border-bottom: 1px solid var(--border-default);
        }
        .pifinale-section-head .num {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 800;
          color: var(--fg-4);
          background: var(--neutral-100);
          border-radius: 6px;
          padding: 5px 8px;
          line-height: 1;
        }
        .pifinale-section-head h2 {
          margin: 0;
          color: var(--fg-1);
          font-size: 19px;
          line-height: 1.15;
          font-weight: 850;
          letter-spacing: 0;
        }
        .pifinale-section-head p {
          margin: 6px 0 0;
          max-width: 780px;
          color: var(--fg-3);
          font-size: 12.5px;
          line-height: 1.5;
        }
        .pifinale-flow {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 7px;
          flex-wrap: wrap;
          max-width: 460px;
        }
        .pifinale-flow span {
          display: inline-flex;
          align-items: center;
          min-height: 28px;
          padding: 0 10px;
          border-radius: 999px;
          border: 1px solid var(--border-subtle);
          background: var(--bg-surface);
          color: var(--fg-2);
          font-size: 11.5px;
          font-weight: 750;
          white-space: nowrap;
        }
        .pifinale-flow .lucide {
          width: 13px;
          height: 13px;
          color: var(--fg-4);
        }
        .pifinale-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(calc(402px * var(--mk-phone-scale) + 26px), 1fr));
          gap: 22px 18px;
          justify-items: center;
        }
        .pifinale-screen-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }
        .pifinale-caption {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 30px;
          padding: 0 8px;
          color: var(--fg-2);
          text-align: center;
          font-size: 13px;
          line-height: 1.25;
        }
        .pifinale-caption span {
          flex-shrink: 0;
          padding: 3px 8px;
          border-radius: 999px;
          background: var(--brand-lime);
          color: var(--brand-ink);
          font-size: 10px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-weight: 850;
        }
        .pifinale-caption strong {
          color: var(--fg-2);
          font-size: 13px;
          font-weight: 750;
          letter-spacing: 0;
        }
        @media (max-width: 980px) {
          .pifinale-page .mk-head,
          .pifinale-section-head {
            grid-template-columns: 1fr;
          }
          .pifinale-meta {
            min-width: 0;
            width: 100%;
          }
          .pifinale-flow {
            justify-content: flex-start;
            max-width: none;
          }
        }
      `}</style>

      <header className="mk-head">
        <div>
          <div className="mk-eyebrow">UI Kit · Pi Finale</div>
          <h1 className="mk-title">PiFinale — expérience mobile PI</h1>
          <p className="mk-lede">
            Référence finale des parcours PI à intégrer. Les écrans sont regroupés par expérience produit
            pour guider le développement sans repasser par les critères de test.
          </p>
        </div>
        <div className="pifinale-meta" aria-label="Résumé PiFinale">
          <div className="pifinale-stat"><span>Parcours</span><strong>{SECTIONS.length}</strong></div>
          <div className="pifinale-stat"><span>Écrans</span><strong>{totalScreens}</strong></div>
        </div>
        <nav className="mk-toc">
          {SECTIONS.map(section => (
            <a key={section.id} href={`#pifinale-${section.id}`}>
              {section.title}<span className="mk-count">{section.screens.length}</span>
            </a>
          ))}
        </nav>
      </header>

      {SECTIONS.map(section => (
        <section key={section.id} className="pifinale-section" id={`pifinale-${section.id}`}>
          <div className="pifinale-section-head">
            <div className="num">{section.num}</div>
            <div>
              <h2>{section.title}</h2>
              <p>{section.summary}</p>
            </div>
            <FlowSteps items={section.flow} />
          </div>
          <div className="pifinale-grid">
            {section.screens.map(screen => <ScreenCard key={`${section.id}-${screen.label}`} screen={screen} />)}
          </div>
        </section>
      ))}
    </div>
  );
};

window.PiFinale = PiFinale;
