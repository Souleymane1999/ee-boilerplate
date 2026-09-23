<script setup>
// Ported from ui_kits/mobile/PiSPIScreens.jsx (PiSPITransactionDetailScreen)
import { computed } from 'vue'

const props = defineProps({
  tx: { type: Object, default: () => PISPI_TX[0] },
  mode: { type: String, default: 'default' },
  channel: { type: String, default: 'alias' },
})
const emit = defineEmits(['back'])

const outgoing = computed(() => props.tx.amount < 0)
const incomingMode = computed(() => props.mode === 'incoming')
const failedMode = computed(() => props.mode === 'failed' || props.mode === 'failed-return')
const statusClass = computed(() => failedMode.value ? 'm-badge-danger' : props.tx.statusLabel === 'En attente' ? 'm-badge-warning' : 'm-badge-success')
const statusLabel = computed(() => failedMode.value ? 'Échec' : props.tx.statusLabel)
const cancelDisabled = computed(() => props.mode === 'cancel-disabled')
const showCancellationInfo = computed(() => props.mode === 'cancellation-info')
const showRefundInfo = computed(() => props.mode === 'refund-info')
const accountChannel = computed(() => props.channel === 'account')
const ibanChannel = computed(() => props.channel === 'iban')
const partyLabel = computed(() => incomingMode.value ? 'Reçu de' : failedMode.value && props.mode === 'failed-return' ? 'Retour à' : 'Envoyé à')
const counterpartyName = computed(() => incomingMode.value || props.mode === 'failed-return' ? props.tx.name : 'Mamadou Diallo')
const counterpartyAlias = computed(() => incomingMode.value || props.mode === 'failed-return' ? 'awa.tr@pi' : 'mamadou.d@pi')
const displayWhen = computed(() => props.tx.when === '7 juin, 11:56' ? '7 juin, 15:17' : props.tx.when)
</script>

<template>
  <div class="phone-screen pispi-screen" data-screen-label="PiSPI Détail transaction">
    <StatusBar />
    <MNav :title="failedMode ? 'Transaction échouée' : 'Détail transaction'" @back="emit('back')">
      <template #right>
        <button class="btn"><Icon name="more-horizontal" /></button>
      </template>
    </MNav>

    <div class="pispi-content compact">
      <section class="pispi-detail-hero">
        <div>
          <div class="detail-amount">{{ outgoing ? '-' : '+' }}{{ fmtCFA(tx.amount) }} <span>CFA</span></div>
          <div class="detail-party">{{ failedMode ? (mode === 'failed-return' ? 'Retour à' : 'Envoi à') : outgoing ? 'Payé à' : 'Reçu de' }} <strong>{{ tx.name }}</strong></div>
          <div class="detail-date">{{ displayWhen }}</div>
        </div>
        <PiSPIAvatar :name="tx.name" :tone="tx.tone" />
      </section>

      <div :class="`pispi-action-strip ${incomingMode ? 'three' : ''}`">
        <template v-if="incomingMode">
          <button><span><Icon name="arrow-up-right" /></span>Envoyer</button>
          <button><span><Icon name="arrow-down-left" /></span>Recevoir</button>
          <button><span><Icon name="rotate-ccw" /></span>Retourner</button>
        </template>
        <template v-else>
          <button><span><Icon name="arrow-up-right" /></span>Envoyer</button>
          <button :class="cancelDisabled ? 'disabled' : ''"><span><Icon name="x-circle" /></span>Annuler</button>
          <button><span><Icon name="split" /></span>Partager</button>
          <button><span><Icon name="calendar-plus" /></span>Planifier</button>
        </template>
      </div>

      <div class="pispi-detail-card">
        <div class="pispi-info-row"><span>Statut</span><strong :class="`m-badge ${statusClass}`">{{ statusLabel }}</strong></div>
        <div class="pispi-info-row"><span>Mode</span><strong>{{ tx.method }}</strong></div>
        <div class="pispi-info-row"><span>Référence</span><strong class="mono">{{ tx.ref }}</strong><PiSPICopyMini label="Copier la référence" /></div>
        <div class="pispi-info-row"><span>Identifiant</span><strong class="mono">TX-MD-240607</strong><PiSPICopyMini label="Copier l'identifiant" /></div>
        <div class="pispi-info-row"><span>Frais</span><strong>0 CFA</strong></div>
        <div class="pispi-info-row"><span>Motif</span><strong>{{ incomingMode ? 'Paiement reçu' : 'Règlement facture' }}</strong></div>
        <div v-if="failedMode" class="pispi-info-row"><span>Raison du rejet</span><strong>Compte bénéficiaire indisponible</strong></div>
        <div v-if="showCancellationInfo" class="pispi-info-row"><span>Demande d'annulation</span><strong>7 juin, 16:02</strong></div>
        <div v-if="showRefundInfo" class="pispi-info-row"><span>Retour de fonds irrévocable</span><strong>8 juin, 10:45</strong></div>
      </div>

      <div class="pispi-detail-card pispi-beneficiary-card">
        <div class="pispi-info-row"><span>{{ partyLabel }}</span><strong>{{ counterpartyName }}</strong></div>
        <div class="pispi-info-row"><span>Pays</span><strong>Niger</strong></div>
        <div class="pispi-info-row"><span>Institution financière</span><strong>BIA Niger</strong></div>
        <div v-if="accountChannel || ibanChannel" class="pispi-info-row"><span>{{ ibanChannel ? 'IBAN' : 'Numéro de compte' }}</span><strong class="mono">{{ ibanChannel ? 'NE58 BIA 01001 000012345678' : '01001 000012345678' }}</strong><PiSPICopyMini label="Copier le numéro de compte" /></div>
        <div v-else class="pispi-info-row alias-copy-row"><span>Alias</span><strong>{{ counterpartyAlias }}</strong><PiSPICopyMini label="Copier l'alias" /></div>
        <button class="pispi-beneficiary-save" type="button"><Icon name="user-plus" /> Enregistrer dans les contacts</button>
      </div>

      <div class="pispi-option-list detached">
        <button class="pispi-option-row">
          <span class="icon"><Icon name="file-down" /></span>
          <span class="body"><strong>Reçu du paiement</strong><small>Télécharger ou partager le reçu</small></span>
          <Icon name="chevron-right" />
        </button>
        <button class="pispi-option-row">
          <span class="icon"><Icon name="tag" /></span>
          <span class="body"><strong>Catégorie</strong><small>Ajouter une catégorie analytique</small></span>
          <span class="pill-badge neutral">Aucune</span>
        </button>
        <button class="pispi-option-row">
          <span class="icon"><Icon name="receipt-text" /></span>
          <span class="body"><strong>Ticket de caisse</strong><small>Ajouter une pièce justificative</small></span>
          <Icon name="plus" />
        </button>
      </div>

      <div class="pispi-note-card">
        <Icon name="bar-chart-3" />
        <div><strong>Analytique</strong><span>Cette transaction est incluse dans les statistiques du compte.</span></div>
        <span class="m-switch on"></span>
      </div>
    </div>
  </div>
</template>
