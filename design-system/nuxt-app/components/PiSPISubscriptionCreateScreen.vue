<script setup>
// Ported from ui_kits/mobile/PiSPIScreens.jsx (PiSPISubscriptionCreateScreen)
import { computed } from 'vue'

const props = defineProps({
  mode: { type: String, default: 'select' },
})

const selected = computed(() => props.mode === 'selected' || props.mode === 'created')
const optionRows = [
  ['Mamadou Diallo', 'mamadou.d@pi · 48.200 CFA · 7 juin, 15:17', 'brand'],
  ['NIGELEC · Facture', 'nigelec@pi · 18.450 CFA · chaque mois', 'warning'],
  ['Awa Traoré', 'awa.tr@pi · 25.000 CFA · 12 juin, 09:00', 'success'],
]
</script>

<template>
  <PiSPIScheduledDetailScreen v-if="mode === 'created'" mode="subscription" />
  <div v-else :class="`phone-screen pispi-screen ${mode === 'success' ? 'pispi-transfer-modal-screen' : ''}`" data-screen-label="PiSPI Créer abonnement">
    <StatusBar />
    <MNav title="Créer un abonnement" />
    <div class="pispi-content compact">
      <section class="pispi-form-title">
        <h2>Créer un abonnement</h2>
        <p>Recherchez dans vos transactions et sélectionnez un envoi recurrent</p>
      </section>
      <div class="pispi-history-search"><Icon name="search" /><span>Rechercher un bénéficiaire ou un motif</span></div>
      <div class="pispi-option-list">
        <button v-for="([name, text, tone], index) in optionRows" :class="`pispi-option-row ${selected && index === 1 ? 'active' : ''}`" :key="name">
          <span class="icon"><PiSPIAvatar :name="name" :tone="tone" /></span>
          <span class="body"><strong>{{ name }}</strong><small>{{ text }}</small></span>
          <Icon v-if="selected && index === 1" name="check" />
          <Icon v-else name="chevron-right" />
        </button>
      </div>
      <div v-if="selected" class="pispi-detail-card">
        <div class="pispi-info-row"><span>Fréquence estimée</span><strong>Mensuelle</strong></div>
        <div class="pispi-info-row"><span>Prochain paiement</span><strong>7 juin, 15:17</strong></div>
        <div class="pispi-info-row"><span>Montant</span><strong>18.450 CFA</strong></div>
      </div>
    </div>
    <div class="cta-bar"><button class="cta">{{ selected ? 'Confirmer' : 'Sélectionner une transaction' }}</button></div>
    <template v-if="mode === 'success'">
      <div class="pispi-modal-dim"></div>
      <section class="pispi-result-sheet pispi-transfer-result">
        <div class="pispi-result-icon"><Icon name="check" /></div>
        <h2>Abonnement créé</h2>
        <p>La fréquence par défaut est déterminée à partir de l'historique des transactions.</p>
        <button type="button">Voir le détail</button>
      </section>
    </template>
  </div>
</template>
