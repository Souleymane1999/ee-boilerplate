<script setup>
// Ported from ui_kits/mobile/PiSPIScreens.jsx (PiSPITransferReviewScreen)
import { computed } from 'vue'

const props = defineProps({
  referenceLabel: { type: Boolean, default: false },
  mode: { type: String, default: 'default' },
  channel: { type: String, default: 'alias' },
})

const chargedFee = computed(() => props.mode === 'fee-charged')
const withOverlay = computed(() => ['geo', 'loading', 'success', 'failure', 'timeout'].includes(props.mode))
const accountChannel = computed(() => props.channel === 'account')
const ibanChannel = computed(() => props.channel === 'iban')
const beneficiaryRows = computed(() => accountChannel.value || ibanChannel.value ? [
  [ibanChannel.value ? 'IBAN' : 'Numéro de compte', ibanChannel.value ? 'NE58 BIA 01001 000012345678' : '01001 000012345678'],
  ['Pays', 'Niger'],
  [ibanChannel.value ? 'Banque' : 'Institution financière', 'BIA Niger'],
  ['Nom du bénéficiaire', 'Mamadou Diallo'],
] : [
  ['Alias', 'mamadou.d@pi'],
  ['Pays', 'Niger'],
  ['Institution financière', 'BIA Niger'],
  ['Nom du bénéficiaire', 'Mamadou Diallo'],
])
</script>

<template>
  <div v-if="mode === 'auth'" class="phone-screen pispi-screen pispi-claim-pin-screen" data-screen-label="PiSPI Validation PIN transfert">
    <StatusBar />
    <button type="button" class="pispi-claim-pin-back" aria-label="Retour"><Icon name="arrow-left" /></button>
    <section class="pispi-claim-pin-body">
      <div class="pispi-claim-pin-avatar">MK</div>
      <h2>Bonjour, Moustapha K.</h2>
      <p>Saisissez votre code PIN pour confirmer le transfert PI-SPI.</p>
      <div class="pispi-claim-pin-grid" aria-label="Clavier code PIN">
        <button v-for="number in [1,2,3,4,5,6,7,8,9]" type="button" :key="number">{{ number }}</button>
        <button type="button"><Icon name="fingerprint" /></button>
        <button type="button">0</button>
        <button type="button"><Icon name="delete" /></button>
      </div>
      <button type="button" class="pispi-claim-pin-forgot">Code PIN oublié?</button>
    </section>
  </div>

  <div v-else-if="mode === 'program'" class="phone-screen pispi-screen" data-screen-label="PiSPI Programmer transfert">
    <StatusBar />
    <MNav title="Programmer" />
    <div class="pispi-content compact">
      <section class="pispi-form-title">
        <h2>Programmer l'envoi</h2>
        <p>Choisissez quand exécuter ce transfert vers Mamadou Diallo.</p>
      </section>
      <div class="pispi-form-card">
        <label>Fréquence</label>
        <div class="pispi-input-line"><Icon name="repeat" /><span>Une seule fois</span><Icon name="chevron-down" /></div>
        <label>Date d'exécution</label>
        <div class="pispi-input-line"><Icon name="calendar" /><span>7 juin, 15:17</span></div>
        <label>Montant</label>
        <div class="pispi-input-line"><Icon name="coins" /><span>48.200 CFA</span></div>
      </div>
    </div>
    <div class="cta-bar"><button class="cta">Continuer</button></div>
  </div>

  <div v-else :class="`phone-screen pispi-screen ${withOverlay ? 'pispi-transfer-modal-screen' : ''}`" data-screen-label="PiSPI Vérification transfert">
    <StatusBar />
    <MNav title="Confirmation" />
    <div class="pispi-content compact">
      <section class="pispi-form-title">
        <h2>Confirmation</h2>
        <p>Voulez-vous vraiment effectuer un transfert au profit de ce bénéficiaire ?</p>
      </section>
      <section class="pispi-detail-hero centered">
        <div class="pispi-check-icon"><Icon name="shield-check" /></div>
        <div class="detail-amount">48.200 <span>CFA</span></div>
        <div class="detail-party">à <strong>Mamadou Diallo</strong></div>
        <div class="detail-date">Validation par code PIN requise</div>
      </section>
      <div class="pispi-detail-card">
        <div v-for="[label, value] in beneficiaryRows" class="pispi-info-row" :key="label"><span>{{ label }}</span><strong>{{ value }}</strong></div>
        <div class="pispi-info-row"><span>Montant</span><strong>48.200 CFA</strong></div>
        <div class="pispi-info-row"><span>Frais</span><strong>{{ chargedFee ? '1.250 CFA' : 'Gratuit' }}</strong></div>
        <div class="pispi-info-row"><span>Motif</span><strong>Règlement facture</strong></div>
        <div v-if="referenceLabel" class="pispi-info-row"><span>txId</span><strong class="mono">REF-FACT-2406</strong></div>
        <div class="pispi-info-row"><span>Référence</span><strong class="mono">Pré-générée</strong></div>
      </div>
      <div class="pispi-compliance-note"><Icon name="lock-keyhole" /><span>Une fois confirmé, l'ordre est transmis au réseau SPI.</span></div>
    </div>
    <div class="pispi-review-actions">
      <button class="secondary">Annuler</button>
      <button class="secondary">Programmer</button>
      <button>Confirmer</button>
    </div>
    <template v-if="withOverlay">
      <div class="pispi-modal-dim"></div>
      <section :class="`pispi-result-sheet pispi-transfer-result ${mode === 'failure' || mode === 'timeout' ? 'is-danger' : ''}`">
        <template v-if="mode === 'loading'">
          <div class="pispi-transfer-spinner"></div>
          <h2>Traitement en cours</h2>
          <p>Votre ordre de transfert est envoyé au réseau SPI. Cette étape peut prendre quelques secondes.</p>
        </template>
        <template v-else-if="mode === 'geo'">
          <div class="pispi-result-icon"><Icon name="map-pin" /></div>
          <h2>Autoriser la position</h2>
          <p>Votre position GPS est demandée avant de confirmer ce transfert conformément aux règles de sécurité.</p>
          <button type="button">Autoriser et continuer</button>
        </template>
        <template v-else-if="mode === 'success'">
          <div class="pispi-result-icon"><Icon name="check" /></div>
          <h2>Transfert envoyé</h2>
          <p>La transaction est irrévocable. Mamadou Diallo recevra une notification de paiement.</p>
          <button type="button">Continuer</button>
        </template>
        <template v-else-if="mode === 'failure'">
          <div class="pispi-result-icon"><Icon name="x" /></div>
          <h2>Transfert rejeté</h2>
          <p>Le transfert n'a pas pu être exécuté. Vérifiez le motif puis réessayez.</p>
          <button type="button">Choisir un autre transfert</button>
        </template>
        <template v-else>
          <div class="pispi-result-icon"><Icon name="clock-alert" /></div>
          <h2>Statut en attente</h2>
          <p>Le réseau SPI n'a pas confirmé la transaction après 30 secondes. Suivez son statut dans l'historique.</p>
          <button type="button">Voir le statut</button>
        </template>
      </section>
    </template>
  </div>
</template>
