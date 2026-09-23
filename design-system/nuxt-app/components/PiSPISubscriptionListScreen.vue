<script setup>
// Ported from ui_kits/mobile/PiSPIScreens.jsx (PiSPISubscriptionListScreen)
import { computed } from 'vue'

const props = defineProps({
  mode: { type: String, default: 'list' },
})

const empty = computed(() => props.mode === 'empty' || props.mode === 'new-sheet')
const grouped = computed(() => props.mode === 'grouped' || props.mode === 'single')
const onlySubscriptions = computed(() => props.mode === 'single')
const rows = [
  ['calendar-clock', 'Paiement programmé', 'SENELEC · 18.450 CFA · demain'],
  ['repeat-2', 'Abonnement mensuel', 'Canal+ · 12.000 CFA · chaque 05'],
  ['clock', 'Virement différé', 'Awa Traoré · 25.000 CFA · vendredi'],
]
const scheduledRows = [
  ['calendar-clock', 'Envoi programmé', 'Mamadou Diallo · 48.200 CFA · 7 juin, 15:17'],
  ['clock', 'Virement différé', 'Awa Traoré · 25.000 CFA · 12 juin, 09:00'],
]
const subscriptionRows = [
  ['repeat-2', 'Abonnement mensuel', 'NIGELEC · 18.450 CFA · chaque 05'],
  ['receipt-text', 'Canal+ Essentiel', '12.000 CFA · prochain paiement 7 juin, 11:56'],
]
const shownSubscriptionRows = computed(() => onlySubscriptions.value ? subscriptionRows.slice(0, 1) : subscriptionRows)
</script>

<template>
  <div v-if="empty" :class="`phone-screen pispi-screen ${mode === 'new-sheet' ? 'pispi-claim-dialog-screen' : ''}`" data-screen-label="PiSPI Transactions à venir">
    <StatusBar />
    <MNav title="Abonnements">
      <template #right>
        <button class="btn"><Icon name="plus" /></button>
      </template>
    </MNav>
    <div class="pispi-content compact">
      <section class="pispi-section-head tight">
        <div>
          <h3>Transactions à venir</h3>
          <p>Gérez vos abonnements et vos paiements programmés en un seul endroit</p>
        </div>
      </section>
      <div class="pispi-empty-state">
        <span><Icon name="calendar-clock" /></span>
        <strong>Aucune transaction planifiée</strong>
        <small>Créez un envoi programmé ou un abonnement depuis SPI.</small>
      </div>
    </div>
    <div class="cta-bar"><button class="cta">Nouveau</button></div>
    <template v-if="mode === 'new-sheet'">
      <div class="pispi-modal-dim"></div>
      <section class="pispi-result-sheet pispi-program-sheet">
        <div class="pispi-result-handle"></div>
        <h2>Nouveau</h2>
        <div class="pispi-option-list">
          <button class="pispi-option-row" type="button">
            <span class="icon"><Icon name="calendar-plus" /></span>
            <span class="body"><strong>Programmer un envoi</strong><small>Executer un envoi à une date donnée</small></span>
            <Icon name="chevron-right" />
          </button>
          <button class="pispi-option-row" type="button">
            <span class="icon"><Icon name="repeat-2" /></span>
            <span class="body"><strong>Créer un abonnement</strong><small>Convertir un envoi en un abonnement</small></span>
            <Icon name="chevron-right" />
          </button>
        </div>
      </section>
    </template>
  </div>

  <div v-else-if="grouped" class="phone-screen pispi-screen" data-screen-label="PiSPI Transactions à venir">
    <StatusBar />
    <MNav title="Abonnements">
      <template #right>
        <button class="btn"><Icon name="plus" /></button>
      </template>
    </MNav>
    <div class="pispi-content compact">
      <section class="pispi-section-head tight">
        <div><h3>Transactions à venir</h3><p>Abonnements et envois programmés SPI</p></div>
      </section>
      <template v-if="!onlySubscriptions">
        <section class="pispi-section-head tight">
          <div><h3>Envois programmés</h3><p>Exécutions à une date donnée</p></div>
          <button type="button"><Icon name="plus" /> Ajouter</button>
        </section>
        <div class="pispi-option-list">
          <button v-for="[icon, title, text] in scheduledRows" class="pispi-option-row" :key="title">
            <span class="icon"><Icon :name="icon" /></span>
            <span class="body"><strong>{{ title }}</strong><small>{{ text }}</small></span>
            <Icon name="chevron-right" />
          </button>
        </div>
      </template>
      <section class="pispi-section-head tight">
        <div><h3>Abonnements</h3><p>Paiements récurrents validés</p></div>
        <button type="button"><Icon name="plus" /> Ajouter</button>
      </section>
      <div class="pispi-option-list">
        <button v-for="[icon, title, text] in shownSubscriptionRows" class="pispi-option-row" :key="title">
          <span class="icon"><Icon :name="icon" /></span>
          <span class="body"><strong>{{ title }}</strong><small>{{ text }}</small></span>
          <Icon name="chevron-right" />
        </button>
      </div>
    </div>
    <div class="cta-bar"><button class="cta">Nouveau</button></div>
  </div>

  <div v-else class="phone-screen pispi-screen" data-screen-label="PiSPI Abonnements">
    <StatusBar />
    <MNav title="Abonnements">
      <template #right>
        <button class="btn"><Icon name="plus" /></button>
      </template>
    </MNav>
    <div class="pispi-content compact">
      <section class="pispi-section-head tight"><div><h3>Paiements programmés</h3><p>Ordres SPI à venir</p></div></section>
      <div class="pispi-option-list">
        <button v-for="[icon, title, text] in rows" class="pispi-option-row" :key="title">
          <span class="icon"><Icon :name="icon" /></span>
          <span class="body"><strong>{{ title }}</strong><small>{{ text }}</small></span>
          <Icon name="chevron-right" />
        </button>
      </div>
      <button class="pispi-primary-btn ghost"><Icon name="plus" /> Créer un abonnement</button>
    </div>
  </div>
</template>
