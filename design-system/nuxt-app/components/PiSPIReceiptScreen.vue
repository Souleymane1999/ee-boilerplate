<script setup>
// Ported from ui_kits/mobile/PiSPIScreens.jsx (PiSPIReceiptScreen)
import { computed } from 'vue'

const props = defineProps({
  mode: { type: String, default: 'alias' },
})

const accountMode = computed(() => props.mode === 'account')
const receivedMode = computed(() => props.mode.startsWith('received'))
const feeMode = computed(() => props.mode === 'fee' || props.mode === 'received-fee')
</script>

<template>
  <div class="phone-screen pispi-screen" data-screen-label="PiSPI Reçu envoi">
    <StatusBar />
    <MNav title="Reçu de l'envoi" />
    <div class="pispi-content compact">
      <section class="pispi-receipt-brand"><AppLogo name="spi-dark" alt="SPI BCEAO" /></section>
      <div class="pispi-detail-card">
        <div class="pispi-info-row"><span>Référence</span><strong class="mono">PI-2406-7721-ENDTOEND-00048200</strong><PiSPICopyMini label="Copier la référence" /></div>
        <div class="pispi-info-row"><span>Identifiant</span><strong class="mono">TX-MD-240607-1542</strong><PiSPICopyMini label="Copier l'identifiant" /></div>
        <div class="pispi-info-row"><span>Montant</span><strong>48.200 CFA</strong></div>
        <div class="pispi-info-row"><span>Frais</span><strong>{{ feeMode ? '1.250 CFA' : 'Gratuit' }}</strong></div>
        <div class="pispi-info-row"><span>{{ receivedMode ? 'Reçu de' : 'Envoyé à' }}</span><strong>{{ receivedMode ? 'Awa Traoré' : 'Mamadou Diallo' }}</strong></div>
        <template v-if="accountMode">
          <div class="pispi-info-row"><span>Numéro de compte</span><strong class="mono">01001 000012345678</strong></div>
          <div class="pispi-info-row"><span>Institution financière</span><strong>BIA Niger</strong></div>
        </template>
        <div v-else class="pispi-info-row"><span>Alias</span><strong>{{ receivedMode ? 'awa.tr@pi' : 'mamadou.d@pi' }}</strong></div>
        <div class="pispi-info-row"><span>Date</span><strong>7 juin, 15:17</strong></div>
      </div>
    </div>
    <div class="cta-bar"><button class="cta"><Icon name="share-2" /> Partager</button></div>
  </div>
</template>
