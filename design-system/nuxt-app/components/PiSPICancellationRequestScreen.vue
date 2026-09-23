<script setup>
// Ported from ui_kits/mobile/PiSPIScreens.jsx (PiSPICancellationRequestScreen)
import { computed } from 'vue'

const props = defineProps({
  mode: { type: String, default: 'default' },
})

const success = computed(() => props.mode === 'success')
const reasons = [
  ['user-x', 'Mauvais bénéficiaire', 'Le paiement a été envoyé au mauvais destinataire.'],
  ['badge-x', 'Montant incorrect', 'Le montant envoyé ne correspond pas au montant prévu.'],
  ['copy-x', 'Paiement en double', 'La même opération a été exécutée plusieurs fois.'],
  ['package-x', 'Service non fourni', "Le service ou le bien n'a pas été livré."],
  ['message-square', 'Autre raison', 'Ajouter une précision à la demande.'],
]
</script>

<template>
  <div :class="`phone-screen pispi-screen ${success ? 'pispi-cancel-modal-screen' : ''}`" data-screen-label="PiSPI Demande annulation">
    <StatusBar />
    <MNav title="Demande d'annulation" />
    <div class="pispi-content compact">
      <section class="pispi-form-title">
        <h2>Demande d'annulation</h2>
        <p>Quelle est la raison de la demande ?</p>
      </section>
      <div class="pispi-option-list pispi-cancel-reasons">
        <button v-for="([icon, title, text], index) in reasons" :class="index === 0 ? 'pispi-option-row active' : 'pispi-option-row'" type="button" :key="title">
          <span class="icon"><Icon :name="icon" /></span>
          <span class="body"><strong>{{ title }}</strong><small>{{ text }}</small></span>
          <Icon v-if="index === 0" name="check" />
        </button>
      </div>
      <div class="pispi-compliance-note"><Icon name="info" /><span>La demande est envoyée directement au réseau SPI sans authentification supplémentaire.</span></div>
    </div>
    <div class="cta-bar"><button class="cta">Demander l'annulation</button></div>
    <template v-if="success">
      <div class="pispi-modal-dim"></div>
      <section class="pispi-result-sheet pispi-transfer-result">
        <div class="pispi-result-icon"><Icon name="check" /></div>
        <h2>Demande d'annulation envoyée</h2>
        <p>La demande est en attente d'acceptation. Vous serez notifié dès que le bénéficiaire aura répondu.</p>
        <button type="button">Continuer</button>
      </section>
    </template>
  </div>
</template>
