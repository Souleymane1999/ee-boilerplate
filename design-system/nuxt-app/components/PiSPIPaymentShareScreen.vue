<script setup>
// Ported from ui_kits/mobile/PiSPIScreens.jsx (PiSPIPaymentShareScreen)
import { computed } from 'vue'

const props = defineProps({
  mode: { type: String, default: 'select' },
})

const permission = computed(() => props.mode === 'permission')
const form = computed(() => props.mode === 'form' || props.mode === 'sent')
const addAlias = computed(() => props.mode.startsWith('add-alias'))
const phoneAliasError = computed(() => props.mode === 'phone-alias-error' || props.mode === 'add-alias-phone-error')

const selected = [
  { name: 'Awa Traoré', alias: 'awa.tr@pi', tone: 'success', hasAlias: true },
  { name: 'Mamadou Diallo', alias: 'mamadou.d@pi', tone: 'brand', hasAlias: true },
]
const contacts = [
  ...selected,
  { name: 'Ali Issoufou', alias: '+227 96 74 98 31', tone: 'info', hasAlias: false },
  { name: 'Amina Oumarou', alias: '90 24 76 36', tone: 'warning', hasAlias: false },
]
</script>

<template>
  <div v-if="permission" class="phone-screen pispi-screen" data-screen-label="PiSPI Partage contacts permission">
    <StatusBar />
    <MNav title="Partager avec" />
    <div class="pispi-content compact">
      <section class="pispi-contact-permission">
        <span><Icon name="contact-round" /></span>
        <h2>Autoriser les contacts</h2>
        <p>PI-SPI peut afficher vos contacts pour sélectionner les personnes avec qui partager ce paiement.</p>
        <button type="button">Autoriser l'accès</button>
      </section>
    </div>
  </div>

  <div v-else-if="addAlias" class="phone-screen pispi-screen" data-screen-label="PiSPI Partage ajout alias">
    <StatusBar />
    <MNav title="Ali Issoufou" />
    <div class="pispi-content compact">
      <section class="pispi-form-title">
        <h2>Ajouter une adresse de paiement</h2>
        <p>Pour partager ce paiement, le contact doit avoir un alias de type adresse de paiement.</p>
      </section>
      <div class="pispi-form-card">
        <label>Nom du contact</label>
        <div class="pispi-input-line is-locked"><Icon name="user-round" /><span>Ali Issoufou</span><Icon name="lock-keyhole" /></div>
        <label>Alias</label>
        <div :class="`pispi-input-line ${phoneAliasError ? 'has-error' : ''}`"><Icon name="at-sign" /><span>{{ phoneAliasError ? '+227 96 74 98 31' : 'ali.issoufou@pi' }}</span><button type="button" class="pispi-paste-mini"><Icon name="clipboard" /> Coller</button></div>
        <p v-if="phoneAliasError" class="pispi-field-error">L'alias doit être une adresse de paiement, pas un numéro de téléphone.</p>
      </div>
      <div v-if="mode === 'add-alias-success'" class="pispi-inline-toast success"><Icon name="check" /> Alias enregistré avec le tag @PI.</div>
    </div>
    <div class="cta-bar"><button class="cta">Enregistrer et continuer</button></div>
  </div>

  <div v-else-if="form" :class="`phone-screen pispi-screen ${mode === 'sent' ? 'pispi-cancel-modal-screen' : ''}`" data-screen-label="PiSPI Partage paiement">
    <StatusBar />
    <MNav title="Partager le paiement" />
    <div class="pispi-content compact">
      <section class="pispi-form-title">
        <h2>Partager le paiement</h2>
        <p>Répartissez le montant entre les contacts sélectionnés.</p>
      </section>
      <div class="pispi-detail-card">
        <div class="pispi-info-row"><span>Paiement partagé</span><strong>PI-2406-7721</strong></div>
        <div class="pispi-info-row"><span>Montant initial</span><strong>48.200 CFA</strong></div>
        <div class="pispi-info-row"><span>Votre part</span><strong>16.068 CFA</strong></div>
      </div>
      <div class="pispi-form-card">
        <template v-for="(contact, index) in selected" :key="contact.name">
          <label>{{ contact.name }}</label>
          <div class="pispi-input-line"><PiSPIAvatar :name="contact.name" :tone="contact.tone" /><span>{{ index === 0 ? '16.066 CFA' : '16.066 CFA' }}</span></div>
        </template>
      </div>
      <div class="pispi-compliance-note"><Icon name="bell" /><span>Les demandes envoyées seront visibles dans les notifications.</span></div>
    </div>
    <div class="cta-bar"><button class="cta">Partager le paiement</button></div>
    <template v-if="mode === 'sent'">
      <div class="pispi-modal-dim"></div>
      <section class="pispi-result-sheet pispi-transfer-result">
        <div class="pispi-result-icon"><Icon name="check" /></div>
        <h2>Demandes envoyées</h2>
        <p>Les demandes de paiement ont été envoyées aux contacts sélectionnés.</p>
        <button type="button">Continuer</button>
      </section>
    </template>
  </div>

  <div v-else class="phone-screen pispi-screen" data-screen-label="PiSPI Partager avec">
    <StatusBar />
    <MNav title="Partager avec" />
    <div class="pispi-content compact">
      <div class="pispi-search-field"><Icon name="search" /><span>Rechercher un contact</span></div>
      <section class="pispi-selected-contacts">
        <h3>Contacts sélectionnés</h3>
        <div><span v-for="contact in selected" :key="contact.name">{{ contact.name }}</span></div>
      </section>
      <div class="pispi-send-letter">A</div>
      <div class="pispi-contact-list">
        <button class="pispi-contact-alias-row" type="button" v-for="contact in contacts" :key="contact.name">
          <span class="pispi-contact-avatar-wrap">
            <PiSPIAvatar :name="contact.name" :tone="contact.tone" />
            <span v-if="contact.hasAlias" class="pispi-contact-pi-badge">π</span>
          </span>
          <span class="body"><strong>{{ contact.name }}</strong><small>{{ contact.alias }}</small></span>
          <Icon v-if="selected.some(item => item.name === contact.name)" name="check" />
          <Icon v-else name="chevron-right" />
        </button>
      </div>
    </div>
    <div class="cta-bar"><button class="cta">Continuer</button></div>
  </div>
</template>
