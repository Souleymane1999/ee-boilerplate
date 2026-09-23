<script setup>
// Ported from ui_kits/mobile/PiSPIScreens.jsx (PiSPIScheduledDetailScreen)
import { computed } from 'vue'

const props = defineProps({
  mode: { type: String, default: 'subscription' },
})

const scheduled = computed(() => props.mode === 'scheduled')
const account = computed(() => props.mode === 'account')
</script>

<template>
  <div class="phone-screen pispi-screen" data-screen-label="PiSPI Détail transaction à venir">
    <StatusBar />
    <MNav :title="scheduled ? 'Envoi programmé' : 'Détail abonnement'">
      <template #right>
        <button class="btn"><Icon name="more-horizontal" /></button>
      </template>
    </MNav>
    <div class="pispi-content compact">
      <section class="pispi-detail-hero">
        <div>
          <div class="detail-amount">-18.450 <span>CFA</span></div>
          <div class="detail-party">Payé à <strong>{{ account ? 'Mamadou Diallo' : 'NIGELEC' }}</strong></div>
          <div class="detail-date">{{ scheduled ? 'Programmé pour le 7 juin, 15:17' : 'Prochain paiement le 7 juin, 15:17' }}</div>
        </div>
        <PiSPIAvatar :name="account ? 'Mamadou Diallo' : 'NIGELEC'" :tone="account ? 'brand' : 'warning'" />
      </section>
      <div class="pispi-action-strip">
        <button><span><Icon name="pencil" /></span>Éditer</button>
        <button><span><Icon name="pause" /></span>Désactiver</button>
        <button><span><Icon name="play" /></span>Réactiver</button>
        <button><span><Icon name="trash-2" /></span>Supprimer</button>
      </div>
      <div class="pispi-detail-card">
        <div class="pispi-info-row"><span>Fréquence</span><strong>{{ scheduled ? 'Une seule fois' : 'Mensuelle' }}</strong></div>
        <div class="pispi-info-row"><span>{{ scheduled ? 'Programmé pour' : 'Date de début' }}</span><strong>7 juin, 15:17</strong></div>
        <div v-if="!scheduled" class="pispi-info-row"><span>Prochain paiement</span><strong>7 juillet, 15:17</strong></div>
        <div v-if="!scheduled" class="pispi-info-row"><span>Date de fin</span><strong>Sans date de fin</strong></div>
        <div class="pispi-info-row"><span>Note</span><strong>Règlement facture</strong></div>
      </div>
      <div class="pispi-detail-card pispi-beneficiary-card">
        <div class="pispi-info-row"><span>Envoyé à</span><strong>{{ account ? 'Mamadou Diallo' : 'NIGELEC' }}</strong></div>
        <div class="pispi-info-row"><span>Pays</span><strong>Niger</strong></div>
        <div class="pispi-info-row"><span>Institution financière</span><strong>BIA Niger</strong></div>
        <div v-if="account" class="pispi-info-row"><span>Numéro de compte</span><strong class="mono">01001 000012345678</strong><PiSPICopyMini label="Copier le numéro de compte" /></div>
        <div v-else class="pispi-info-row alias-copy-row"><span>Alias</span><strong>nigelec@pi</strong><PiSPICopyMini label="Copier l'alias" /></div>
        <button class="pispi-beneficiary-save" type="button"><Icon name="user-plus" /> Enregistrer dans les contacts</button>
      </div>
      <div class="pispi-note-card">
        <Icon name="tag" />
        <div><strong>Catégorie</strong><span>Classer ce transfert dans Budget et analytique.</span></div>
        <span class="pill-badge neutral">Factures</span>
      </div>
    </div>
  </div>
</template>
