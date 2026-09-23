<script setup>
// Ported from ui_kits/mobile/PiSPIScreens.jsx (PiSPISendOptionsScreen)
import { computed } from 'vue'

const props = defineProps({
  mode: { type: String, default: 'default' },
})
const emit = defineEmits(['back'])

const searchActive = computed(() => props.mode === 'search-active')
const qrFocus = computed(() => props.mode === 'qr-focus')
const ibanDisabled = computed(() => props.mode === 'iban-disabled')
const contactPermission = computed(() => props.mode === 'contact-permission')
const addAlias = computed(() => props.mode === 'add-alias' || props.mode === 'add-alias-success')

const optionRows = [
  { icon: 'contact', title: 'Par Alias', text: 'Adresse de paiement ou n° de téléphone' },
  { icon: 'files', title: 'Par numéro de compte', text: 'IBAN, RIB, n° de téléphone ou autre' },
]
const searchResults = [
  { name: 'Mamadou Diallo', phone: 'mamadou.d@pi', tone: 'brand', alias: true },
  { name: 'Awa Traoré', phone: '+227 90 24 76 36', tone: 'success' },
]
const recentTransfers = [
  { name: 'Mamadou Diallo', meta: 'Vous avez envoyé 10 000', date: '18 mai', tone: 'brand', direction: 'sent' },
  { name: 'Awa Traoré', meta: 'Vous avez reçu 50 000', date: '21 févr.', tone: 'success', direction: 'received' },
]
const contacts = [
  { name: 'Amina Oumarou', phone: '90 24 76 36', tone: 'warning' },
  { name: 'Ali Issoufou', phone: '+227 96 74 98 31', tone: 'brand' },
  { name: 'Hadiza Abdou', phone: '+227 91 40 18 22', tone: 'info' },
]
</script>

<template>
  <div v-if="addAlias" class="phone-screen pispi-screen pispi-send-screen" data-screen-label="PiSPI Alias contact">
    <StatusBar />
    <MNav title="Amina Oumarou" @back="emit('back')" />
    <div class="pispi-content compact">
      <section class="pispi-new-contact-card">
        <span><Icon name="at-sign" /></span>
        <span class="body"><strong>Ajouter un alias PI</strong><small>Le contact sera mis à jour avec le tag @PI.</small></span>
      </section>
      <div class="pispi-form-card pispi-contact-form-card">
        <label>Prénoms et nom</label>
        <div class="pispi-input-line"><Icon name="user-round" /><span>Amina Oumarou</span></div>
        <label>Alias</label>
        <div class="pispi-input-line">
          <Icon name="at-sign" />
          <span>{{ mode === 'add-alias-success' ? 'amina.oumarou@pi' : 'Coller ou saisir un alias' }}</span>
          <button type="button" class="pispi-paste-mini"><Icon name="clipboard" /> Coller</button>
        </div>
      </div>
      <div v-if="mode === 'add-alias-success'" class="pispi-inline-toast success"><Icon name="check" /> Alias enregistré dans les contacts du téléphone.</div>
    </div>
    <div class="pispi-form-actions"><button class="pispi-secondary-cta">Annuler</button><button class="cta">Enregistrer et continuer</button></div>
  </div>

  <div v-else-if="contactPermission" class="phone-screen pispi-screen pispi-send-screen" data-screen-label="PiSPI Permission contacts">
    <StatusBar />
    <MNav title="Contacts" @back="emit('back')" />
    <div class="pispi-content compact">
      <section class="pispi-contact-permission">
        <span><Icon name="contact-round" /></span>
        <h2>Autoriser l'accès aux contacts</h2>
        <p>PI-SPI peut afficher votre carnet pour sélectionner rapidement un bénéficiaire et gérer ses alias.</p>
        <button type="button">Autoriser les contacts</button>
      </section>
    </div>
  </div>

  <div v-else class="phone-screen pispi-screen pispi-send-screen" data-screen-label="PiSPI Envoyer">
    <StatusBar />
    <div class="pispi-send-topbar">
      <button class="btn back" @click="emit('back')" aria-label="Retour"><Icon name="chevron-left" /></button>
      <div :class="`pispi-send-search ${searchActive ? 'is-active' : ''}`">
        <Icon name="search" />
        <span>{{ searchActive ? 'awa' : 'Rechercher un contact' }}</span>
      </div>
      <button :class="`btn scan ${qrFocus ? 'is-focused' : ''}`" aria-label="Scanner un QR Code"><Icon name="scan-line" /></button>
    </div>

    <div class="pispi-content compact pispi-send-content">
      <template v-if="searchActive">
        <section class="pispi-section-head tight pispi-send-heading"><div><h3>Résultats</h3></div></section>
        <div class="pispi-send-contact-list">
          <button class="pispi-send-contact-row" v-for="contact in searchResults" :key="contact.name">
            <span class="pispi-contact-avatar-wrap">
              <PiSPIAvatar :name="contact.name" :tone="contact.tone" />
              <span v-if="contact.alias" class="pispi-contact-pi-badge"><AppLogo name="spi-dark" alt="" /></span>
            </span>
            <span class="body"><strong>{{ contact.name }}</strong><small>{{ contact.phone }}</small></span>
          </button>
        </div>
      </template>
      <template v-else>
        <section class="pispi-section-head tight pispi-send-heading">
          <div><h3>Envoi</h3></div>
        </section>

        <div class="pispi-option-list pispi-send-options">
          <button class="pispi-option-row" v-for="item in optionRows" :key="item.title">
            <span class="icon"><Icon :name="item.icon" /></span>
            <span class="body"><strong>{{ item.title }}</strong><small>{{ item.text }}</small></span>
            <Icon name="chevron-right" />
          </button>
          <button v-if="ibanDisabled" class="pispi-option-row disabled">
            <span class="icon neutral"><Icon name="landmark" /></span>
            <span class="body"><strong>Par IBAN</strong><small>Ancienne version uniquement · non disponible</small></span>
            <span class="pill-badge">désactivé</span>
          </button>
        </div>

        <div class="pispi-option-list pispi-send-options single">
          <button class="pispi-option-row">
            <span class="icon"><Icon name="user-round-plus" /></span>
            <span class="body"><strong>Nouveau contact</strong><small>Ajouter un contact avec son alias</small></span>
            <Icon name="chevron-right" />
          </button>
        </div>

        <section class="pispi-section-head tight pispi-send-heading">
          <div><h3>Transactions récentes</h3></div>
        </section>
        <div class="pispi-send-list-card">
          <button class="pispi-send-recent-row" v-for="item in recentTransfers" :key="item.name">
            <span class="pispi-send-avatar-wrap">
              <PiSPIAvatar :name="item.name" :tone="item.tone" />
              <span :class="`pispi-send-direction ${item.direction}`"><Icon :name="item.direction === 'sent' ? 'arrow-left' : 'arrow-right'" /></span>
            </span>
            <span class="body"><strong>{{ item.name }}</strong><small>{{ item.meta }}</small></span>
            <span class="date">{{ item.date }}</span>
          </button>
        </div>

        <section class="pispi-section-head tight pispi-send-heading">
          <div><h3>Contacts</h3></div>
        </section>
        <div class="pispi-send-contact-list">
          <div class="pispi-send-letter">A</div>
          <button class="pispi-send-contact-row" v-for="contact in contacts" :key="contact.name">
            <span class="pispi-contact-avatar-wrap">
              <PiSPIAvatar :name="contact.name" :tone="contact.tone" />
              <span v-if="contact.name !== 'Amina Oumarou'" class="pispi-contact-pi-badge"><AppLogo name="spi-dark" alt="" /></span>
            </span>
            <span class="body"><strong>{{ contact.name }}</strong><small>{{ contact.phone }}</small></span>
          </button>
        </div>
      </template>
    </div>
  </div>
</template>
