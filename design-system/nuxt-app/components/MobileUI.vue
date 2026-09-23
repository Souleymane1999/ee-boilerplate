<script setup>
// Ported from pages/mobile-ui.jsx `MobileUI` — documentation grid of phone
// screens. The nested React `PhoneArt` wrapper and `InteractivePhone`
// components are expressed inline in the template; screen selection is driven
// by each screen's `id` via v-if/v-else-if inside <mk-frame>.
import { ref, computed } from 'vue'

// Interactive phone local state (Home → Send / Detail / History / Settings).
const page = ref('home')
const tx = ref(null)

const goDetail = (t) => {
  tx.value = t
  page.value = 'detail'
}
const onTabNav = (t) => {
  if (t === 'send') page.value = 'send'
  else if (t === 'activity') page.value = 'history'
  else if (t === 'more') page.value = 'more'
  else page.value = 'home'
}

// page → active tab mapping (detail collapses back to home tab).
const tabPage = computed(() =>
  page.value === 'detail'
    ? 'home'
    : page.value === 'history'
      ? 'activity'
      : page.value === 'more'
        ? 'more'
        : page.value,
)

const SECTIONS = [
  {
    id: 'core', num: '01', title: 'Parcours client',
    lede: "Le cœur de l'expérience iMoney — accueil, envoi d'argent et détail d'une transaction. Le premier téléphone est interactif.",
    screens: [
      { id: 'home',   label: 'Accueil',            tag: 'Interactif',  interactive: true },
      { id: 'send',   label: 'Envoyer · montant',  tag: 'Saisie' },
      { id: 'detail', label: 'Détail transaction', tag: 'Statique' },
    ],
  },
  {
    id: 'money', num: '02', title: 'Argent',
    lede: 'Recharge du compte, dépôt en agence et historique complet — vues client et agent.',
    screens: [
      { id: 'recharger',  label: 'Recharger mon compte',        tag: 'Client' },
      { id: 'depot',      label: 'Dépôt agent',                 tag: 'Agent' },
      { id: 'historique', label: 'Historique des transactions', tag: 'Client' },
    ],
  },
  {
    id: 'account', num: '03', title: 'Compte',
    lede: "Vérification d'identité (KYC), paramètres client et paramètres agent — incluant l'accès aux outils de transaction côté agent.",
    screens: [
      { id: 'kyc',          label: "Vérification d'identité",   tag: 'KYC' },
      { id: 'params',       label: 'Paramètres · client',       tag: 'Client' },
      { id: 'params-agent', label: 'Paramètres · agent',        tag: 'Agent' },
      { id: 'tx-menu',      label: 'Menu Transactions · agent', tag: 'Agent' },
    ],
  },
  {
    id: 'cards', num: '04', title: 'Carte VISA',
    lede: "Cycle de vie complet de la carte VISA virtuelle : liste, détail (avec état d'erreur), recharge et création.",
    screens: [
      { id: 'cards-list',    label: 'Mes cartes VISA',          tag: 'Liste' },
      { id: 'card-detail',   label: 'Carte · détail (erreur)',  tag: 'État erreur' },
      { id: 'card-recharge', label: 'Recharger ma carte',       tag: 'Flux' },
      { id: 'card-create',   label: 'Créer une nouvelle carte', tag: 'Flux' },
    ],
  },
]

const totalScreens = SECTIONS.reduce((n, s) => n + s.screens.length, 0)

// HOME_TX auto-imported from useMobileData; DetailScreen static art uses HOME_TX[1].
const detailArtTx = HOME_TX[1]
</script>

<template>
  <div class="mk-page">
    <header class="mk-head">
      <div class="mk-eyebrow">UI Kit · Mobile</div>
      <h1 class="mk-title">iMoney — application mobile</h1>
      <p class="mk-lede">
        {{ totalScreens }} écrans organisés en {{ SECTIONS.length }} parcours.
        Chaque écran est rendu à 70&nbsp;% de sa taille native (iPhone 14, 390×844).
        Le premier téléphone du premier parcours est interactif — cliquez les onglets pour naviguer.
      </p>
      <nav class="mk-toc">
        <a v-for="s in SECTIONS" :key="s.id" :href="`#sec-${s.id}`">
          {{ s.title }}<span class="mk-count">{{ s.screens.length }}</span>
        </a>
      </nav>
    </header>

    <section v-for="sec in SECTIONS" :key="sec.id" class="mk-section" :id="`sec-${sec.id}`">
      <div class="mk-section-head">
        <div class="num">{{ sec.num }}</div>
        <div class="body">
          <h2>{{ sec.title }}</h2>
          <p>{{ sec.lede }}</p>
        </div>
        <div class="count">{{ sec.screens.length }} écrans</div>
      </div>
      <div class="mk-grid">
        <div v-for="scr in sec.screens" :key="scr.id" class="mk-card">
          <div class="mk-frame">
            <!-- Interactive Home phone -->
            <div v-if="scr.id === 'home'" class="phone is-interactive">
              <div class="phone-screen">
                <HomeScreen v-if="page === 'home'" @select-tx="goDetail" @send="page = 'send'" />
                <SendScreen v-else-if="page === 'send'" @back="page = 'home'" @continue="page = 'home'" />
                <DetailScreen v-else-if="page === 'detail'" :tx="tx" @back="page = 'home'" />
                <HistoryScreen v-else-if="page === 'history'" @back="page = 'home'" />
                <SettingsScreen v-else-if="page === 'more'" @back="page = 'home'" />
                <HomeScreen v-else @select-tx="goDetail" @send="page = 'send'" />
                <TabBar v-if="page !== 'send'" :current="tabPage" @nav="onTabNav" />
              </div>
            </div>

            <!-- Static PhoneArt-wrapped screens -->
            <div v-else class="phone">
              <div class="phone-screen">
                <SendScreen v-if="scr.id === 'send'" @back="() => {}" @continue="() => {}" />
                <DetailScreen v-else-if="scr.id === 'detail'" :tx="detailArtTx" @back="() => {}" />
                <RechargeScreen v-else-if="scr.id === 'recharger'" @back="() => {}" />
                <DepositScreen v-else-if="scr.id === 'depot'" @back="() => {}" />
                <HistoryScreen v-else-if="scr.id === 'historique'" @back="() => {}" />
                <KYCScreen v-else-if="scr.id === 'kyc'" @back="() => {}" />
                <SettingsScreen v-else-if="scr.id === 'params'" @back="() => {}" />
                <AgentSettingsScreen v-else-if="scr.id === 'params-agent'" @back="() => {}" />
                <TxMenuScreen v-else-if="scr.id === 'tx-menu'" @back="() => {}" />
                <CardsListScreen v-else-if="scr.id === 'cards-list'" @back="() => {}" @open-card="() => {}" @create="() => {}" />
                <CardDetailScreen v-else-if="scr.id === 'card-detail'" @back="() => {}" @recharge="() => {}" />
                <CardRechargeScreen v-else-if="scr.id === 'card-recharge'" @back="() => {}" />
                <CardCreateScreen v-else-if="scr.id === 'card-create'" @back="() => {}" />
              </div>
            </div>
          </div>
          <div class="mk-caption">
            <span v-if="scr.tag" :class="`mk-tag ${scr.interactive ? '' : 'muted'}`">{{ scr.tag }}</span>
            <span>{{ scr.label }}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
