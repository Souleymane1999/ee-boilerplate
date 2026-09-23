<script setup>
// Ported from ui_kits/mobile/PiSPIScreens.jsx (PiSPIClaimAcceptDialogScreen)
import { computed } from 'vue'

const props = defineProps({
  variant: { type: String, default: 'confirm' },
})

const isAuth = computed(() => props.variant === 'auth')
const isSuccess = computed(() => props.variant === 'success')
</script>

<template>
  <div v-if="isAuth" class="phone-screen pispi-screen pispi-claim-pin-screen" data-screen-label="PiSPI Double authentification">
    <StatusBar />
    <button type="button" class="pispi-claim-pin-back" aria-label="Retour"><Icon name="arrow-left" /></button>
    <section class="pispi-claim-pin-body">
      <div class="pispi-claim-pin-avatar">KD</div>
      <h2>Bonjour, Khady Diop</h2>
      <p>Saisissez votre code PIN</p>
      <div class="pispi-claim-pin-grid" aria-label="Clavier code PIN">
        <button v-for="number in [1, 2, 3, 4, 5, 6, 7, 8, 9]" :key="number" type="button">{{ number }}</button>
        <button type="button" aria-label="Biométrie"><Icon name="fingerprint" /></button>
        <button type="button">0</button>
        <button type="button" aria-label="Effacer"><Icon name="delete" /></button>
      </div>
      <button type="button" class="pispi-claim-pin-forgot">Code PIN oublié?</button>
    </section>
  </div>

  <div v-else :class="`phone-screen pispi-screen pispi-claim-dialog-screen ${isSuccess ? 'is-success' : ''}`" :data-screen-label="isSuccess ? 'PiSPI Revendication acceptée' : isAuth ? 'PiSPI Double authentification' : 'PiSPI Confirmation revendication'">
    <div class="pispi-modal-underlay"><PiSPIClaimDetailScreen mode="accept" /></div>
    <div class="pispi-modal-dim"></div>
    <section v-if="isSuccess" class="pispi-result-sheet">
      <div class="pispi-result-icon"><Icon name="check" /></div>
      <h2>Revendication acceptée</h2>
      <h3>Alias supprimé avec succès</h3>
      <p>Le numéro réclamé n’est plus associé à votre compte. La liste des notifications est actualisée.</p>
      <button type="button">Retour aux notifications</button>
    </section>
    <section v-else class="pispi-confirm-dialog">
      <h2>Êtes-vous sûr(e) de vouloir accepter la revendication ?</h2>
      <p>À l'acceptation, votre alias +227 77 540 19 32 sera supprimé, cette action sera irréversible. Vous ne pourrez plus recevoir de paiement avec cet alias. Cependant vous pourrez toujours utiliser l'adresse de paiement associée.</p>
      <div>
        <button type="button">Confirmer</button>
        <button type="button" class="secondary">Annuler</button>
      </div>
    </section>
  </div>
</template>
