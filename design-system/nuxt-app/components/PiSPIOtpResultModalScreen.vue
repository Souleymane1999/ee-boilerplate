<script setup>
// Ported from ui_kits/mobile/PiSPIScreens.jsx (PiSPIOtpResultModalScreen)
import { computed } from 'vue'

const props = defineProps({
  variant: { type: String, default: 'success' },
})

const success = computed(() => props.variant === 'success')
const claimPending = computed(() => props.variant === 'claim-pending')
const claimSent = computed(() => props.variant === 'claim-sent')
const claimSuccess = computed(() => props.variant === 'claim-sent-home')
const claimResult = computed(() => claimSent.value || claimSuccess.value)
const homeUnderlay = computed(() => props.variant === 'claim-sent-home')
const copy = computed(() => success.value ? {
  eyebrow: 'Bravo',
  title: 'Votre alias est créé',
  description: "Votre numéro est maintenant associé à votre alias PI-SPI. Vous pouvez recevoir des paiements instantanés sur votre compte.",
  icon: 'check',
} : claimPending.value ? {
  eyebrow: 'Suivi requis',
  title: 'Numéro en cours de revendication',
  description: "Ce numéro fait déjà l'objet d'une revendication PI-SPI. Vous pouvez vérifier l'état de la demande ou choisir un autre alias.",
  icon: 'clock-3',
} : claimSent.value ? {
  eyebrow: 'Demande envoyée',
  title: 'Revendication envoyée avec succès',
  description: "Votre demande est transmise à PI-SPI. Vous pourrez suivre son statut depuis vos notifications.",
  icon: 'check',
} : claimSuccess.value ? {
  eyebrow: 'Revendication réussie',
  title: 'Votre alias est disponible',
  description: "La revendication a abouti. Vous pouvez maintenant utiliser cet alias pour recevoir vos paiements PI-SPI.",
  icon: 'check',
} : {
  eyebrow: 'Oooops',
  title: 'Cet alias est pris',
  description: "Le numéro de téléphone est déjà enregistré comme alias sur un autre compte.",
  icon: 'x',
})
</script>

<template>
  <div :class="`phone-screen pispi-screen pispi-otp-modal-screen ${success || claimResult ? 'is-success' : 'is-failure'} ${claimPending ? 'is-claim-pending' : ''} ${claimResult ? 'is-claim-sent' : ''}`" :data-screen-label="success ? 'PiSPI OTP succès' : claimPending ? 'PiSPI OTP revendication' : claimResult ? 'PiSPI revendication envoyée' : 'PiSPI OTP échec'">
    <div class="pispi-modal-underlay">
      <PiSPIHomeScreen v-if="homeUnderlay" />
      <PiSPIOtpCodeScreen v-else :filled="true" />
    </div>
    <div class="pispi-modal-dim"></div>
    <section class="pispi-result-sheet">
      <div v-if="!success || claimResult" class="pispi-result-handle"></div>
      <div class="pispi-result-icon"><Icon :name="copy.icon" /></div>
      <h2>{{ copy.eyebrow }}</h2>
      <h3>{{ copy.title }}</h3>
      <p>{{ copy.description }}</p>
      <template v-if="claimResult"></template>
      <button v-else-if="success" type="button">Continuer</button>
      <div v-else-if="claimPending" class="pispi-result-actions">
        <button type="button">Vérifier le statut</button>
        <button type="button" class="secondary">Choisir un autre alias</button>
      </div>
      <div v-else class="pispi-result-actions">
        <button type="button">Revendiquer l'alias</button>
        <button type="button" class="secondary">Choisir un autre alias</button>
      </div>
    </section>
  </div>
</template>
