<script setup>
// Ported from ui_kits/mobile/PiSPIScreens.jsx (PiSPIClaimDetailScreen)
import { computed } from 'vue'

const props = defineProps({
  mode: { type: String, default: 'default' },
})
const emit = defineEmits(['back'])

const accepted = computed(() => props.mode === 'accepted')
</script>

<template>
  <div class="phone-screen pispi-screen" data-screen-label="PiSPI Revendication alias">
    <StatusBar />
    <MNav title="Revendication d'alias" @back="emit('back')" />
    <div class="pispi-content compact">
      <section class="pispi-claim-hero">
        <span><Icon name="badge-alert" /></span>
        <div>
          <h2>Numéro de téléphone réclamé</h2>
          <p>Une demande de revendication a été initiée via PI-RAC.</p>
        </div>
      </section>

      <div class="pispi-detail-card">
        <div class="pispi-info-row"><span>Numéro de téléphone</span><strong>+227 77 540 19 32</strong></div>
        <div class="pispi-info-row"><span>Date de la demande</span><strong>7 juin, 15:17</strong></div>
        <div class="pispi-info-row"><span>Statut</span><strong :class="`m-badge ${accepted ? 'm-badge-success' : 'm-badge-warning'}`">{{ accepted ? 'Acceptée' : 'En attente' }}</strong></div>
        <div v-if="accepted" class="pispi-info-row"><span>Date d'acceptation</span><strong>21 juin, 16:15</strong></div>
        <div v-else class="pispi-info-row"><span>Alias actuel</span><strong>moustapha.k@pi</strong></div>
      </div>

      <template v-if="!accepted">
        <div class="pispi-claim-warning">
          <Icon name="triangle-alert" />
          <span>Si vous ne rejetez pas cette demande avec succès d'ici le 14 juin, vous ne pourrez plus faire de transactions avec cet alias. Si à la date du 21 juin la demande est toujours en attente, l'alias sera supprimé.</span>
        </div>

        <div class="pispi-claim-actions">
          <button :class="mode === 'refuse' ? 'active danger' : 'danger'">Refuser</button>
          <button :class="mode === 'accept' ? 'active' : ''">Accepter</button>
        </div>
      </template>
    </div>
  </div>
</template>
