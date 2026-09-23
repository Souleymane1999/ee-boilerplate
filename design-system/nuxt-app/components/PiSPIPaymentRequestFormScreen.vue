<script setup>
// Ported from ui_kits/mobile/PiSPIScreens.jsx (PiSPIPaymentRequestFormScreen)
import { computed } from 'vue'

const props = defineProps({
  mode: { type: String, default: 'alias' },
})

const contactNoAlias = computed(() => props.mode === 'contact-no-alias' || props.mode === 'contact-alias-added')
const contactAlias = computed(() => props.mode === 'contact-alias')
const phoneWarning = computed(() => props.mode === 'phone-alias-warning' || props.mode === 'phone-alias-edit')
const prefill = computed(() => props.mode === 'prefill')
const qrMode = computed(() => props.mode.startsWith('qr'))
const aliasInvalid = computed(() => props.mode === 'alias-invalid')
const withOverlay = computed(() => props.mode === 'geo' || props.mode === 'loading' || props.mode === 'success' || props.mode.endsWith('-geo') || props.mode.endsWith('-loading') || props.mode.endsWith('-success'))
const contactName = computed(() => contactAlias.value ? 'Awa Traoré' : contactNoAlias.value ? 'Amina Oumarou' : 'Mamadou Diallo')
const aliasValue = computed(() => phoneWarning.value ? '+227 96 74 98 31' : contactNoAlias.value ? (props.mode === 'contact-alias-added' ? 'amina.oumarou@pi' : 'Coller ou saisir un alias') : contactAlias.value ? 'awa.tr@pi' : 'mamadou.d@pi')
</script>

<template>
  <div v-if="phoneWarning" class="phone-screen pispi-screen" data-screen-label="PiSPI Demande téléphone non supporté">
    <StatusBar />
    <MNav title="Demande de paiement" />
    <div class="pispi-content compact">
      <section class="pispi-contact-detail-card">
        <PiSPIAvatar name="Ali Issoufou" tone="brand" />
        <h2>Ali Issoufou</h2>
        <p>+227 96 74 98 31</p>
      </section>
      <div class="pispi-claim-warning">
        <Icon name="triangle-alert" />
        <span>L'alias Numéro de téléphone ne peut pas être utilisé pour les demandes de paiement.</span>
      </div>
      <div v-if="mode === 'phone-alias-edit'" class="pispi-form-card">
        <label>Nom du contact</label>
        <div class="pispi-input-line is-locked"><Icon name="user-round" /><span>Ali Issoufou</span><Icon name="lock-keyhole" /></div>
        <label>Adresse de paiement</label>
        <div class="pispi-input-line"><Icon name="at-sign" /><span>Coller une adresse PI</span><button type="button" class="pispi-paste-mini"><Icon name="clipboard" /> Coller</button></div>
      </div>
      <div v-else class="pispi-contact-actions">
        <button type="button"><Icon name="at-sign" /> Ajouter une adresse de paiement</button>
      </div>
    </div>
    <div v-if="mode === 'phone-alias-edit'" class="cta-bar"><button class="cta">Enregistrer et continuer</button></div>
  </div>

  <div v-else :class="`phone-screen pispi-screen ${withOverlay ? 'pispi-transfer-modal-screen' : ''}`" data-screen-label="PiSPI Formulaire demande paiement">
    <StatusBar />
    <MNav :title="qrMode ? 'Demande QR Code' : contactNoAlias ? contactName : contactAlias ? contactName : 'Demande de paiement'" />
    <div class="pispi-content compact">
      <section class="pispi-form-title">
        <h2>{{ qrMode ? 'Demande de paiement par QR Code' : contactNoAlias ? 'Ajouter une adresse PI' : `Demander à ${contactName}` }}</h2>
        <p>{{ qrMode ? 'Complétez la demande détectée depuis le QR Code PI.' : contactNoAlias ? 'Le contact sera mis à jour avec le tag @PI avant la demande.' : 'Coller ou saisir l’alias puis le montant à demander.' }}</p>
      </section>
      <div class="pispi-form-card">
        <template v-if="!qrMode">
          <label>{{ contactNoAlias || contactAlias ? 'Nom du contact' : 'Nom du payeur' }}</label>
          <div class="pispi-input-line is-locked"><Icon name="user-round" /><span>{{ contactName }}</span><Icon name="lock-keyhole" /></div>
          <label>Alias</label>
          <div :class="`pispi-input-line ${aliasInvalid ? 'has-error' : ''}`">
            <Icon name="at-sign" />
            <span>{{ aliasInvalid ? 'mamadou' : aliasValue }}</span>
            <button v-if="!contactAlias" type="button" class="pispi-paste-mini"><Icon name="clipboard" /> Coller</button>
          </div>
          <p v-if="aliasInvalid" class="pispi-field-error">Alias invalide. Saisissez une adresse de paiement PI valide.</p>
        </template>
        <template v-if="!contactNoAlias">
          <label>Montant</label>
          <div class="pispi-input-line"><Icon name="coins" /><span>{{ qrMode && mode.includes('amount') ? '18.450 CFA' : prefill ? '10.000 CFA' : '12.500 CFA' }}</span></div>
          <small class="pispi-balance-hint">Le montant demandé peut être supérieur au solde disponible.</small>
          <label>Note</label>
          <div class="pispi-input-line"><Icon name="message-square-text" /><span>{{ mode === 'qr-reference' ? 'REF-FACTURE-2406' : prefill ? 'Demande reprise' : 'Paiement de service' }}</span></div>
          <small class="pispi-balance-hint">Optionnel · 140 caractères maximum</small>
        </template>
      </div>
      <div v-if="mode === 'contact-alias-added'" class="pispi-inline-toast success"><Icon name="check" /> Alias enregistré avec le tag @PI.</div>
    </div>
    <div class="cta-bar"><button class="cta">{{ contactNoAlias ? 'Enregistrer et continuer' : 'Envoyer' }}</button></div>
    <template v-if="withOverlay">
      <div class="pispi-modal-dim"></div>
      <section class="pispi-result-sheet pispi-transfer-result">
        <template v-if="mode.endsWith('loading') || mode === 'loading'">
          <div class="pispi-transfer-spinner"></div>
          <h2>Demande en cours</h2>
          <p>La demande de paiement est envoyée au réseau SPI.</p>
        </template>
        <template v-else-if="mode.endsWith('geo') || mode === 'geo'">
          <div class="pispi-result-icon"><Icon name="map-pin" /></div>
          <h2>Autoriser la position</h2>
          <p>Votre position GPS est demandée avant l'envoi de la demande.</p>
          <button type="button">Autoriser et envoyer</button>
        </template>
        <template v-else>
          <div class="pispi-result-icon"><Icon name="check" /></div>
          <h2>Demande envoyée</h2>
          <p>Le payeur recevra une notification. La demande reste consultable dans Notifications.</p>
          <button type="button">Continuer</button>
        </template>
      </section>
    </template>
  </div>
</template>
