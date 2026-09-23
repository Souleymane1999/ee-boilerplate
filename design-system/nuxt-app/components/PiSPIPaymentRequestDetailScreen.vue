<script setup>
// Ported from ui_kits/mobile/PiSPIScreens.jsx (PiSPIPaymentRequestDetailScreen)
import { computed } from 'vue'

const props = defineProps({
  mode: { type: String, default: 'default' },
})

const shared = computed(() => props.mode === 'shared')
const received = computed(() => props.mode === 'received')
const pico = computed(() => props.mode === 'pico' || props.mode === 'pico-fee')
const picash = computed(() => props.mode === 'picash' || props.mode === 'picash-fee')
const deferred = computed(() => props.mode === 'deferred')
const invoice = computed(() => props.mode === 'invoice')
const online = computed(() => props.mode === 'online')
const security = computed(() => props.mode === 'security')
const rejectReasons = computed(() => props.mode === 'reject-reasons')
const program = computed(() => props.mode === 'program')
const modalMode = computed(() => ['reject', 'geo', 'loading', 'success', 'failure', 'timeout', 'reject-success'].includes(props.mode))
const clientName = computed(() => online.value ? 'Sahel Market' : received.value ? 'Mamadou Diallo' : 'Awa Traoré')
const clientAlias = computed(() => online.value ? 'sahel.market@pi' : received.value ? 'mamadou.d@pi' : 'awa.tr@pi')
const amount = computed(() => pico.value ? '36.500' : picash.value ? '25.000' : deferred.value ? '64.000' : invoice.value ? '18.450' : received.value ? '12.500' : '10.000')
const fee = computed(() => props.mode === 'pico-fee' ? '350 CFA' : props.mode === 'picash-fee' ? '250 CFA' : 'Gratuit')

const rejectReasonList = ['Montant incorrect', 'Demande inconnue', 'Service non reçu', 'Alias du bénéficiaire suspect']
</script>

<template>
  <div v-if="mode === 'auth'" class="phone-screen pispi-screen pispi-claim-pin-screen" data-screen-label="PiSPI Paiement demande PIN">
    <StatusBar />
    <button class="pispi-claim-pin-back" type="button"><Icon name="chevron-left" /></button>
    <div class="pispi-claim-pin-body">
      <div class="pispi-claim-pin-avatar">AT</div>
      <h2>Bonjour, Moustapha</h2>
      <p>Saisissez votre code PIN pour payer la demande de Awa Traoré.</p>
      <div class="pispi-claim-pin-grid">
        <button v-for="n in [1,2,3,4,5,6,7,8,9]" :key="n">{{ n }}</button>
        <button><Icon name="fingerprint" /></button>
        <button>0</button>
        <button><Icon name="delete" /></button>
      </div>
      <button class="pispi-claim-pin-forgot" type="button">Code PIN oublié ?</button>
    </div>
  </div>

  <div v-else :class="`phone-screen pispi-screen ${modalMode ? 'pispi-claim-dialog-screen' : ''}`" data-screen-label="PiSPI Demande paiement détail">
    <StatusBar />
    <MNav title="Demande de paiement" />
    <div class="pispi-content compact">
      <section class="pispi-detail-hero">
        <div>
          <div class="detail-amount">{{ amount }} <span>CFA</span></div>
          <div class="detail-party">{{ received ? 'Demandé par' : shared ? 'Paiement partagé avec' : online ? 'Paiement demandé par' : 'Vous avez demandé à' }} <strong>{{ clientName }}</strong></div>
          <div class="detail-date">{{ shared ? 'Paiement du 7 juin, 15:17' : received ? 'Reçue le 7 juin, 15:42' : 'Échéance le 8 juin, 18:00' }}</div>
        </div>
        <PiSPIAvatar :name="clientName" :tone="online ? 'warning' : received ? 'brand' : 'success'" />
      </section>
      <div v-if="security" class="pispi-claim-warning">
        <Icon name="triangle-alert" />
        <span>L'alias du client payé doit être enregistré dans vos contacts pour activer Payer et Programmer.</span>
      </div>
      <div v-if="program" class="pispi-note-card"><Icon name="calendar-plus" /><div><strong>Programmation du paiement</strong><span>Le parcours de création d'un paiement programmé démarre depuis cette demande.</span></div></div>
      <div class="pispi-detail-card">
        <div class="pispi-info-row"><span>Statut</span><strong class="m-badge m-badge-warning">En attente</strong></div>
        <div class="pispi-info-row"><span>Pays</span><strong>Niger</strong></div>
        <div class="pispi-info-row alias-copy-row"><span>Alias</span><strong>{{ clientAlias }}</strong><PiSPICopyMini label="Copier l'alias" /></div>
        <div class="pispi-info-row"><span>Date de demande</span><strong>7 juin, 15:42</strong></div>
        <div class="pispi-info-row"><span>Date d'échéance</span><strong>{{ received ? '7 juin, 18:00' : '8 juin, 18:00' }}</strong></div>
        <div class="pispi-info-row"><span>Motif</span><strong>{{ invoice ? 'Règlement facture' : online ? 'Commande e-commerce' : 'Paiement de service' }}</strong></div>
      </div>

      <div v-if="shared" class="pispi-detail-card">
        <div class="pispi-info-row"><span>Paiement partagé</span><strong>Déjeuner équipe</strong></div>
        <div class="pispi-info-row"><span>Client payé</span><strong>Awa Traoré</strong></div>
        <div class="pispi-info-row"><span>Montant du paiement</span><strong>30.000 CFA</strong></div>
        <div class="pispi-info-row"><span>Date du paiement</span><strong>7 juin, 15:17</strong></div>
        <div class="pispi-info-row"><span>Participant</span><strong><PiSPIAvatar name="Awa Traoré" tone="success" /></strong></div>
      </div>
      <div v-else-if="pico" class="pispi-detail-card">
        <div class="pispi-info-row"><span>Retrait avec Achat (PICO)</span><strong>Marchand validé</strong></div>
        <div class="pispi-info-row"><span>Montant de l'achat</span><strong>18.500 CFA</strong></div>
        <div class="pispi-info-row"><span>Montant du retrait</span><strong>18.000 CFA</strong></div>
        <div class="pispi-info-row"><span>Frais</span><strong>{{ fee }}</strong></div>
      </div>
      <div v-else-if="picash" class="pispi-detail-card">
        <div class="pispi-info-row"><span>Retrait avec Achat (PICASH)</span><strong>Agent PI</strong></div>
        <div class="pispi-info-row"><span>Montant du retrait</span><strong>25.000 CFA</strong></div>
        <div class="pispi-info-row"><span>Frais</span><strong>{{ fee }}</strong></div>
      </div>
      <div v-else-if="deferred" class="pispi-detail-card">
        <div class="pispi-info-row"><span>Débit différé</span><strong>Fin de mois</strong></div>
        <div class="pispi-info-row"><span>Message</span><strong>Achetez maintenant, Payez plus tard.</strong></div>
        <div class="pispi-info-row"><span>Mensualités</span><strong>Payer en 3 mensualités</strong></div>
        <div class="pispi-info-row"><span>Montant par mois</span><strong>21.333 CFA</strong></div>
      </div>
      <div v-else-if="invoice" class="pispi-detail-card">
        <div class="pispi-info-row"><span>Document</span><strong>Facture · NIG-2406-118</strong></div>
        <div class="pispi-info-row"><span>Remise</span><strong>1.500 CFA</strong></div>
        <div class="pispi-info-row"><span>Valable jusqu'au</span><strong>12 juin, 18:00</strong></div>
      </div>
      <div v-else-if="online" class="pispi-detail-card">
        <div class="pispi-info-row"><span>Canal</span><strong>521 · Paiement en ligne</strong></div>
        <div class="pispi-info-row"><span>Site e-commerce</span><strong>Sahel Market</strong></div>
        <div class="pispi-info-row"><span>Vérification</span><strong class="m-badge m-badge-success">Site e-commerce vérifiée</strong></div>
      </div>
      <div v-else-if="rejectReasons" class="pispi-option-list pispi-reject-reasons">
        <button v-for="(reason, idx) in rejectReasonList" :class="`pispi-option-row ${idx === 0 ? 'active' : ''}`" type="button" :key="reason">
          <span class="icon"><Icon :name="idx === 0 ? 'check' : 'circle'" /></span>
          <span class="body"><strong>{{ reason }}</strong><small>Motif visible dans le suivi de la demande</small></span>
        </button>
      </div>

      <button v-if="!online" class="pispi-beneficiary-save" type="button"><Icon name="user-plus" /> Enregistrer dans les contacts</button>
    </div>
    <div :class="`pispi-claim-actions ${online ? '' : 'three'}`">
      <button class="danger" type="button">Rejeter</button>
      <button v-if="!online" :class="security ? 'disabled' : ''" type="button">Programmer</button>
      <button :class="`active ${security ? 'disabled' : ''}`" type="button">Payer</button>
    </div>
    <template v-if="modalMode">
      <div class="pispi-modal-dim"></div>
      <section v-if="mode === 'reject'" class="pispi-confirm-dialog">
        <h2>Rejeter la demande ?</h2>
        <p>Choisissez un motif de rejet avant de confirmer. Le payeur recevra le statut de la demande.</p>
        <div><button class="secondary" type="button">Annuler</button><button class="danger" type="button">Rejeter</button></div>
      </section>
      <section v-else-if="mode === 'geo'" class="pispi-result-sheet pispi-transfer-result">
        <div class="pispi-result-icon warning"><Icon name="map-pin" /></div>
        <h2>Autoriser la position</h2>
        <p>La position GPS est requise avant de payer cette demande PI.</p>
        <button type="button">Autoriser et continuer</button>
      </section>
      <section v-else-if="mode === 'loading'" class="pispi-result-sheet pispi-transfer-result">
        <div class="pispi-transfer-spinner"></div>
        <h2>Paiement en cours</h2>
        <p>L'ordre de transfert est envoyé au réseau SPI. Merci de patienter.</p>
      </section>
      <section v-else-if="mode === 'success'" class="pispi-result-sheet pispi-transfer-result">
        <div class="pispi-result-icon"><Icon name="check" /></div>
        <h2>Paiement effectué</h2>
        <p>La transaction est irrévocable. Un reçu est disponible dans l'historique.</p>
        <button type="button">Continuer</button>
      </section>
      <section v-else-if="mode === 'failure'" class="pispi-result-sheet pispi-transfer-result">
        <div class="pispi-result-icon danger"><Icon name="x" /></div>
        <h2>Paiement rejeté</h2>
        <p>Le paiement n'a pas pu être finalisé. Solde insuffisant pour couvrir la demande.</p>
        <button type="button">Réessayer</button>
      </section>
      <section v-else-if="mode === 'timeout'" class="pispi-result-sheet pispi-transfer-result">
        <div class="pispi-result-icon warning"><Icon name="clock-3" /></div>
        <h2>Traitement en cours</h2>
        <p>Aucun statut final reçu après 30 secondes. La demande reste suivie dans Notifications.</p>
        <button type="button">Voir le suivi</button>
      </section>
      <section v-else class="pispi-result-sheet pispi-transfer-result">
        <div class="pispi-result-icon"><Icon name="check" /></div>
        <h2>Demande rejetée</h2>
        <p>La demande de paiement est rejetée avec succès</p>
        <button type="button">Continuer</button>
      </section>
    </template>
  </div>
</template>
