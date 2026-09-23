<script setup>
// Ported from ui_kits/mobile/PiSPIScreens.jsx (PiSPIReturnFundsScreen)
import { computed } from 'vue'

const props = defineProps({
  mode: { type: String, default: 'confirm' },
})

const insufficient = computed(() => props.mode === 'insufficient')
const overlay = computed(() => ['loading', 'success', 'failure', 'timeout'].includes(props.mode))
</script>

<template>
  <div v-if="mode === 'auth'" class="phone-screen pispi-screen pispi-claim-pin-screen" data-screen-label="PiSPI Retour fonds PIN">
    <StatusBar />
    <button type="button" class="pispi-claim-pin-back" aria-label="Retour"><Icon name="arrow-left" /></button>
    <section class="pispi-claim-pin-body">
      <div class="pispi-claim-pin-avatar">MK</div>
      <h2>Bonjour, Moustapha K.</h2>
      <p>Saisissez votre code PIN pour retourner les fonds.</p>
      <div class="pispi-claim-pin-grid" aria-label="Clavier code PIN">
        <button type="button" v-for="number in [1,2,3,4,5,6,7,8,9]" :key="number">{{ number }}</button>
        <button type="button"><Icon name="fingerprint" /></button>
        <button type="button">0</button>
        <button type="button"><Icon name="delete" /></button>
      </div>
      <button type="button" class="pispi-claim-pin-forgot">Code PIN oublié?</button>
    </section>
  </div>

  <div v-else :class="`phone-screen pispi-screen pispi-return-screen ${overlay ? 'pispi-transfer-modal-screen' : ''}`" data-screen-label="PiSPI Retour de fonds">
    <div class="pispi-modal-underlay"><PiSPITransactionDetailScreen :tx="PISPI_TX[1]" mode="incoming" /></div>
    <div class="pispi-modal-dim"></div>
    <section class="pispi-confirm-dialog pispi-return-dialog">
      <h2>Êtes-vous sûr de vouloir retourner les fonds ?</h2>
      <p>Vous allez retourner le paiement reçu de Awa Traoré.</p>
      <div class="pispi-return-summary">
        <span>Client payeur</span><strong>Awa Traoré</strong>
        <span>Montant</span><strong>12.500 CFA</strong>
      </div>
      <p v-if="insufficient" class="pispi-return-warning"><Icon name="triangle-alert" /> Solde insuffisant pour retourner ce montant.</p>
      <div>
        <button type="button" :class="insufficient ? 'disabled' : ''">OUI</button>
        <button type="button" class="secondary">NON</button>
      </div>
    </section>
    <section v-if="overlay" :class="`pispi-result-sheet pispi-transfer-result ${mode === 'failure' || mode === 'timeout' ? 'is-danger' : ''}`">
      <template v-if="mode === 'loading'">
        <div class="pispi-transfer-spinner"></div>
        <h2>Retour en cours</h2>
        <p>Le retour de fonds est envoyé au réseau SPI.</p>
      </template>
      <template v-else-if="mode === 'success'">
        <div class="pispi-result-icon"><Icon name="check" /></div>
        <h2>Fonds retournés</h2>
        <p>Le retour de fonds est irrévocable. Awa Traoré sera notifiée.</p>
        <button type="button">Continuer</button>
      </template>
      <template v-else-if="mode === 'failure'">
        <div class="pispi-result-icon"><Icon name="x" /></div>
        <h2>Retour rejeté</h2>
        <p>Le retour de fonds n'a pas pu être exécuté. Vérifiez le motif puis réessayez.</p>
        <button type="button">Fermer</button>
      </template>
      <template v-else>
        <div class="pispi-result-icon"><Icon name="clock-alert" /></div>
        <h2>Statut en attente</h2>
        <p>Le réseau SPI n'a pas confirmé le retour après 30 secondes.</p>
        <button type="button">Voir le statut</button>
      </template>
    </section>
  </div>
</template>
