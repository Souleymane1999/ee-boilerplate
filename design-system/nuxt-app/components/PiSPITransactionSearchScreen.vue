<script setup>
// Ported from ui_kits/mobile/PiSPIScreens.jsx (PiSPITransactionSearchScreen)
import { computed } from 'vue'

const props = defineProps({
  mode: { type: String, default: 'list' },
})
const emit = defineEmits(['back'])

const filterMode = computed(() => props.mode === 'filters')
</script>

<template>
  <div class="phone-screen pispi-screen" data-screen-label="PiSPI Historique">
    <StatusBar />
    <MNav title="Transactions" @back="emit('back')">
      <template #right>
        <button class="btn"><Icon name="sliders-horizontal" /></button>
      </template>
    </MNav>
    <div class="pispi-history-search">
      <Icon name="search" />
      <span>Nom, référence, alias ou montant</span>
    </div>
    <div class="filter-row">
      <div class="filter-chip active"><span>{{ filterMode ? '7 juin' : 'Statut' }}</span><Icon name="chevron-down" /></div>
      <div class="filter-chip"><span>{{ filterMode ? '12 juin' : 'Période' }}</span><Icon name="chevron-down" /></div>
      <div class="filter-chip"><span>{{ filterMode ? 'Reçues' : 'Sens' }}</span><Icon name="chevron-down" /></div>
      <div v-if="filterMode" class="filter-chip"><span>Factures</span><Icon name="chevron-down" /></div>
    </div>
    <div class="pispi-content compact">
      <div v-if="filterMode" class="pispi-detail-card">
        <div class="pispi-info-row"><span>Date de début</span><strong>7 juin, 00:00</strong></div>
        <div class="pispi-info-row"><span>Date de fin</span><strong>12 juin, 23:59</strong></div>
        <div class="pispi-info-row"><span>Sens</span><strong>Reçues et envoyées</strong></div>
        <div class="pispi-info-row"><span>Catégorie</span><strong>Factures</strong></div>
      </div>
      <div class="pispi-list-card">
        <PiSPIRecentRow v-for="tx in PISPI_TX" :key="tx.id" :tx="tx" />
      </div>
      <div class="pispi-result-count">{{ PISPI_TX.length }} transactions affichées · réseau PI/SPI</div>
    </div>
    <div v-if="filterMode" class="cta-bar"><button class="cta">Appliquer</button></div>
  </div>
</template>
