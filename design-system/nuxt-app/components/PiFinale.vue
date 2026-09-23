<script setup>
// PiFinale — developer handoff catalog for the final PI mobile experience.
import { computed } from 'vue'

const SCREEN_COMPONENTS = Object.fromEntries(
  Object.entries(import.meta.glob('./*.vue', { eager: true, import: 'default' }))
    .map(([path, component]) => [path.match(/\/([^/]+)\.vue$/)?.[1], component])
    .filter(([name]) => Boolean(name))
)

const screenComponent = (name) => SCREEN_COMPONENTS[name] || 'div'

const SECTIONS = [
  {
    id: 'entry',
    num: '01',
    title: "Entrée dans l'espace PI",
    summary: "Point d'accès depuis l'application principale, ouverture du service et premier état de compte.",
    flow: ['Accueil app', 'Service PI', 'Compte PI'],
    screens: [
      { label: 'Accueil app', tag: 'App', comp: 'PiSPIMainAppHomeScreen', props: {} },
      { label: 'Compte PI', tag: 'Home', comp: 'PiSPIHomeScreen', props: {} },
      { label: 'Choix compte', tag: 'Compte', comp: 'PiSPIAccountSwitchScreen', props: {} },
    ],
  },
  {
    id: 'enrolment',
    num: '02',
    title: 'Création et revendication alias',
    summary: "Création d'adresse PI, sélection du téléphone Niger, OTP, erreurs et succès de revendication.",
    flow: ['Créer un alias', 'Téléphone', 'OTP', 'Succès ou revendication'],
    screens: [
      { label: 'Créer un alias', tag: 'Identité', comp: 'PiSPIAliasScreen', props: {} },
      { label: 'Numéro téléphone', tag: 'Alias', comp: 'PiSPIPhoneNumberLockedScreen', props: {} },
      { label: 'Téléphone éditable', tag: 'Saisie', comp: 'PiSPIPhoneNumberLockedScreen', props: { keyboard: true } },
      { label: 'Code OTP', tag: 'Sécurité', comp: 'PiSPIOtpCodeScreen', props: { keyboard: true } },
      { label: 'Renvoyer code', tag: 'Relance', comp: 'PiSPIOtpCodeScreen', props: { keyboard: true, resendReady: true } },
      { label: 'Erreur OTP', tag: 'Erreur', comp: 'PiSPIOtpCodeScreen', props: { filled: true, keyboard: true, error: true } },
      { label: 'Alias créé', tag: 'Succès', comp: 'PiSPIAliasSuccessScreen', props: {} },
      { label: 'Alias pris', tag: 'Erreur', comp: 'PiSPIOtpResultModalScreen', props: { variant: 'failure' } },
      { label: 'Revendication envoyée', tag: 'Succès', comp: 'PiSPIOtpResultModalScreen', props: { variant: 'claim-sent' } },
    ],
  },
  {
    id: 'identity',
    num: '03',
    title: 'Identité PI et QR',
    summary: "Alias visible, QR Code PI, partage, profil compte et paramètres utiles à l'identité utilisateur.",
    flow: ['Mon QR Code', 'Profil', 'Contacts alias'],
    screens: [
      { label: 'Mon QR Code', tag: 'QR', comp: 'PiSPIQrCodeScreen', props: {} },
      { label: 'Alias profil', tag: 'Profil', comp: 'PiSPIAliasProfileScreen', props: {} },
      { label: 'Profil utilisateur', tag: 'Compte', comp: 'PiSPIProfileScreen', props: {} },
      { label: 'Paramètres', tag: 'Réglages', comp: 'PiSPISettingsScreen', props: {} },
      { label: 'Contacts alias', tag: 'Répertoire', comp: 'PiSPIContactsAliasScreen', props: {} },
      { label: 'Nouveau contact', tag: 'Formulaire', comp: 'PiSPIContactCreateScreen', props: {} },
    ],
  },
  {
    id: 'payments',
    num: '04',
    title: 'Envoyer et recevoir',
    summary: "Options d'envoi, demandes de paiement, formulaires, confirmation, détails et historique complet.",
    flow: ['Options', 'Formulaire', 'Confirmation', 'Détail'],
    screens: [
      { label: 'Envoyer', tag: 'Flux', comp: 'PiSPISendOptionsScreen', props: {} },
      { label: 'Demande paiement', tag: 'Recevoir', comp: 'PiSPIRequestOptionsScreen', props: {} },
      { label: 'Formulaire transfert', tag: 'Saisie', comp: 'PiSPITransactionFormScreen', props: {} },
      { label: 'Confirmation transfert', tag: 'Validation', comp: 'PiSPITransferReviewScreen', props: {} },
      { label: 'Détail transaction', tag: 'Détail', comp: 'PiSPITransactionDetailScreen', props: { tx: PISPI_TX[0] } },
      { label: 'Historique', tag: 'Liste', comp: 'PiSPITransactionSearchScreen', props: {} },
      { label: 'Demande reçue', tag: 'Request', comp: 'PiSPIPaymentRequestDetailScreen', props: {} },
      { label: 'Créer demande', tag: 'Formulaire', comp: 'PiSPIPaymentRequestFormScreen', props: {} },
    ],
  },
  {
    id: 'edge-cases',
    num: '05',
    title: 'Cas opérationnels',
    summary: "Annulation, partage de paiement, reçu, retour de fonds et états qui ferment les parcours réglementaires.",
    flow: ['Notification', 'Détail', 'Action', 'Résultat'],
    screens: [
      { label: 'Demande annulation', tag: 'Annulation', comp: 'PiSPICancellationRequestScreen', props: {} },
      { label: 'Détail annulation', tag: 'Annulation', comp: 'PiSPICancellationDetailScreen', props: {} },
      { label: 'Paiement partagé', tag: 'Partage', comp: 'PiSPIPaymentShareScreen', props: {} },
      { label: 'Reçu paiement', tag: 'Reçu', comp: 'PiSPIReceiptScreen', props: {} },
      { label: 'Retour fonds', tag: 'Retour', comp: 'PiSPIReturnFundsScreen', props: {} },
    ],
  },
  {
    id: 'scheduled',
    num: '06',
    title: 'Programmer et organiser',
    summary: "Abonnements, programmation, catégories et écrans de gestion des paiements récurrents.",
    flow: ['Abonnements', 'Programmer', 'Détail', 'Catégoriser'],
    screens: [
      { label: 'Abonnements', tag: 'Liste', comp: 'PiSPISubscriptionListScreen', props: {} },
      { label: 'Créer abonnement', tag: 'Création', comp: 'PiSPISubscriptionCreateScreen', props: {} },
      { label: 'Programmer', tag: 'Saisie', comp: 'PiSPIScheduleFormScreen', props: {} },
      { label: 'Détail programmé', tag: 'Détail', comp: 'PiSPIScheduledDetailScreen', props: {} },
      { label: 'Catégories', tag: 'Analyse', comp: 'PiSPICategoriesScreen', props: {} },
    ],
  },
  {
    id: 'notifications',
    num: '07',
    title: 'Notifications et revendications',
    summary: "Filtres notification, revendication d'alias, confirmation, authentification et état accepté.",
    flow: ['Notifications', 'Revendication', 'Confirmation', 'PIN', 'Succès'],
    screens: [
      { label: 'Notifications', tag: 'Alertes', comp: 'PiSPINotificationsScreen', props: {} },
      { label: 'Revendication alias', tag: 'Détail', comp: 'PiSPIClaimDetailScreen', props: {} },
      { label: 'Dialogue acceptation', tag: 'Dialogue', comp: 'PiSPIClaimAcceptDialogScreen', props: {} },
      { label: 'PIN revendication', tag: 'Sécurité', comp: 'PiSPIClaimAcceptDialogScreen', props: { variant: 'auth' } },
      { label: 'Revendication acceptée', tag: 'Succès', comp: 'PiSPIClaimAcceptDialogScreen', props: { variant: 'success' } },
    ],
  },
]

const totalScreens = computed(() =>
  SECTIONS.reduce((total, section) => total + section.screens.length, 0)
)
</script>

<template>
  <div class="mk-page pifinale-page" :style="{ '--mk-phone-scale': 0.62 }">
    <header class="mk-head">
      <div>
        <div class="mk-eyebrow">UI Kit · Pi Finale</div>
        <h1 class="mk-title">PiFinale — expérience mobile PI</h1>
        <p class="mk-lede">
          Référence finale des parcours PI à intégrer. Les écrans sont regroupés par expérience produit
          pour guider le développement sans repasser par les critères de test.
        </p>
      </div>
      <div class="pifinale-meta" aria-label="Résumé PiFinale">
        <div class="pifinale-stat"><span>Parcours</span><strong>{{ SECTIONS.length }}</strong></div>
        <div class="pifinale-stat"><span>Écrans</span><strong>{{ totalScreens }}</strong></div>
      </div>
      <nav class="mk-toc">
        <a v-for="section in SECTIONS" :key="section.id" :href="`#pifinale-${section.id}`">
          {{ section.title }}<span class="mk-count">{{ section.screens.length }}</span>
        </a>
      </nav>
    </header>

    <section
      v-for="section in SECTIONS"
      :key="section.id"
      class="pifinale-section"
      :id="`pifinale-${section.id}`"
    >
      <div class="pifinale-section-head">
        <div class="num">{{ section.num }}</div>
        <div>
          <h2>{{ section.title }}</h2>
          <p>{{ section.summary }}</p>
        </div>
        <div class="pifinale-flow">
          <template v-for="(item, index) in section.flow" :key="item">
            <Icon v-if="index > 0" name="arrow-right" />
            <span>{{ item }}</span>
          </template>
        </div>
      </div>
      <div class="pifinale-grid">
        <div
          v-for="screen in section.screens"
          :key="`${section.id}-${screen.label}`"
          class="pifinale-screen-card"
        >
          <div class="mk-frame">
            <div class="phone">
              <div class="phone-screen">
                <component :is="screenComponent(screen.comp)" v-bind="screen.props" />
              </div>
            </div>
          </div>
          <div class="pifinale-caption">
            <span>{{ screen.tag }}</span>
            <strong>{{ screen.label }}</strong>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
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
</style>
