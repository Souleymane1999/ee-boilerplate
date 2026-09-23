<script setup>
// Ported from ui_kits/mobile/PiSPIScreens.jsx (PiSPITransactionFormScreen)
import { ref, computed } from 'vue'

const props = defineProps({
  mode: { type: String, default: 'ready' },
})

const amount = ref(48200)
const setAmount = (v) => { amount.value = v }

const accountEntry = computed(() => props.mode.startsWith('account') || props.mode.startsWith('iban'))
const ibanEntry = computed(() => props.mode.startsWith('iban'))
const aliasEntry = computed(() => props.mode.startsWith('alias'))
const contactSend = computed(() => props.mode.startsWith('contact-send') || props.mode.startsWith('recent-send'))
const contactSelected = computed(() => props.mode === 'contact-selected')
const recentPrefill = computed(() => props.mode === 'recent-prefill')
const qrNoAmount = computed(() => props.mode === 'qr-no-amount')
const aliasAmountError = computed(() => props.mode === 'alias-insufficient')
const contactAmountError = computed(() => props.mode === 'contact-send-insufficient')
const recentSend = computed(() => props.mode.startsWith('recent-send'))
const aliasValue = computed(() => props.mode === 'alias-phone'
  ? '+227 77 540 19 32'
  : props.mode === 'alias-address'
    ? 'mamadou.d@pi'
    : props.mode === 'alias-contact'
      ? 'Rechercher ou sélectionner un contact'
      : 'mamadou.d@pi')

// account-entry derived values
const countryLocked = computed(() => ibanEntry.value || props.mode === 'account-iban' || props.mode === 'account-country-locked' || props.mode === 'account-bank-locked')
const institutionLocked = computed(() => ibanEntry.value || props.mode === 'account-iban' || props.mode === 'account-bank-locked')
const institutionError = computed(() => props.mode === 'account-bank-disabled' || props.mode === 'account-bank-missing')
const amountError = computed(() => props.mode === 'account-insufficient' || props.mode === 'iban-insufficient')
const accountNumber = computed(() => ibanEntry.value
  ? 'NE58 BIA 01001 000012345678'
  : props.mode === 'account-phone-local'
  ? '96 74 98 31'
  : props.mode === 'account-phone-intl'
    ? '+227 96 74 98 31'
    : props.mode === 'account-iban' || props.mode === 'account-country-locked' || props.mode === 'account-bank-locked'
      ? 'NE58 BIA 01001 000012345678'
      : props.mode === 'account-rib'
        ? 'NE038 01001 000012345678 64'
        : props.mode === 'account-contact'
          ? 'Rechercher un contact ou compte'
          : '01001 000012345678')
const countryValue = computed(() => countryLocked.value ? 'Niger' : 'Sélectionner un pays UEMOA')
const institutionValue = computed(() => props.mode === 'account-bank-disabled'
  ? 'Banque du Sahel'
  : props.mode === 'account-bank-missing'
    ? 'Institution introuvable'
    : props.mode === 'account-bank-select'
      ? 'Choisir une institution'
      : 'BIA Niger')
</script>

<template>
  <div v-if="contactSend" class="phone-screen pispi-screen" data-screen-label="PiSPI Envoi contact">
    <StatusBar />
    <MNav title="Envoyer à un contact" />
    <div class="pispi-content compact">
      <section class="pispi-form-title">
        <h2>{{ recentSend ? 'Reprendre un transfert' : 'Envoyer à Amina Oumarou' }}</h2>
        <p>{{ recentSend ? 'Les informations de la transaction récente restent modifiables.' : 'Le contact est enregistré avec son alias PI.' }}</p>
      </section>
      <div class="pispi-form-card pispi-contact-transfer-card">
        <label>Nom du contact</label>
        <div class="pispi-input-line is-locked"><Icon name="user-round" /><span>{{ recentSend ? 'Mamadou Diallo' : 'Amina Oumarou' }}</span><Icon name="lock-keyhole" /></div>
        <label>Alias de compte</label>
        <div class="pispi-input-line is-locked"><Icon name="at-sign" /><span>{{ recentSend ? 'mamadou.d@pi' : 'amina.ou@pi' }}</span><Icon name="lock-keyhole" /></div>
        <label>Montant</label>
        <div :class="`pispi-input-line ${contactAmountError ? 'has-error' : ''}`"><Icon name="coins" /><span>{{ contactAmountError ? '325.000 CFA' : recentSend ? '10.000 CFA' : '48.200 CFA' }}</span></div>
        <small class="pispi-balance-hint">Solde disponible · 284.910 CFA</small>
        <p v-if="contactAmountError" class="pispi-field-error">Solde insuffisant pour effectuer ce transfert.</p>
        <label>Note</label>
        <div class="pispi-input-line"><Icon name="message-square-text" /><span>{{ recentSend ? 'Aide familiale' : 'Règlement facture' }}</span></div>
        <small class="pispi-balance-hint">Optionnel · 104 caractères maximum</small>
      </div>
    </div>
    <div class="cta-bar"><button class="cta">Continuer</button></div>
  </div>

  <div v-else-if="accountEntry" class="phone-screen pispi-screen" data-screen-label="PiSPI Formulaire numéro de compte">
    <StatusBar />
    <MNav :title="ibanEntry ? 'Envoi par IBAN' : 'Envoi par compte'" />
    <div class="pispi-content compact">
      <section class="pispi-form-title">
        <h2>{{ ibanEntry ? 'Envoyer par IBAN' : 'Envoyer par numéro de compte' }}</h2>
        <p>{{ ibanEntry ? 'Coller ou saisir le numéro de compte bancaire international' : 'RIB, IBAN, n° de téléphone ou autre identifiant' }}</p>
      </section>
      <div class="pispi-form-card pispi-account-transfer-card">
        <label>{{ ibanEntry ? 'Numéro IBAN' : 'Numéro de compte' }}</label>
        <div class="pispi-input-line">
          <Icon :name="mode === 'account-contact' ? 'search' : 'credit-card'" />
          <span>{{ accountNumber }}</span>
          <button v-if="mode === 'account-paste'" type="button" class="pispi-paste-mini"><Icon name="clipboard" /> Coller</button>
        </div>

        <label>Pays du bénéficiaire</label>
        <div :class="`pispi-input-line ${countryLocked ? 'is-locked' : ''}`">
          <Icon name="map-pin" />
          <span>{{ countryValue }}</span>
          <Icon :name="countryLocked ? 'lock-keyhole' : 'chevron-down'" />
        </div>
        <div v-if="mode === 'account-uemoa'" class="pispi-chip-row">
          <span v-for="country in ['Niger', 'Sénégal', 'Bénin', 'Mali']" :key="country">{{ country }}</span>
        </div>

        <label>{{ ibanEntry ? 'Banque' : 'Institution financière' }}</label>
        <div :class="`pispi-input-line ${institutionLocked ? 'is-locked' : ''} ${institutionError ? 'has-error' : ''}`">
          <Icon name="landmark" />
          <span>{{ institutionValue }}</span>
          <Icon :name="institutionLocked ? 'lock-keyhole' : 'chevron-down'" />
        </div>
        <p v-if="mode === 'account-bank-disabled'" class="pispi-field-error">Institution indisponible pour le moment.</p>
        <p v-if="mode === 'account-bank-missing'" class="pispi-field-error">Cette institution n'est pas disponible dans PI-SPI.</p>
        <div v-if="mode === 'account-country-banks'" class="pispi-chip-row">
          <span v-for="bank in ['BIA Niger', 'BAGRI', 'SONIBANK']" :key="bank">{{ bank }}</span>
        </div>

        <label>Montant</label>
        <div :class="`pispi-input-line ${amountError ? 'has-error' : ''}`"><Icon name="coins" /><span>{{ amountError ? '325.000 CFA' : '48.200 CFA' }}</span></div>
        <small class="pispi-balance-hint">Solde disponible · 284.910 CFA</small>
        <p v-if="amountError" class="pispi-field-error">Solde insuffisant pour effectuer ce transfert.</p>
        <label>Note</label>
        <div class="pispi-input-line"><Icon name="message-square-text" /><span>Règlement facture</span></div>
      </div>
    </div>
    <div class="cta-bar"><button class="cta">Continuer</button></div>
  </div>

  <div v-else-if="aliasEntry || qrNoAmount" class="phone-screen pispi-screen" data-screen-label="PiSPI Formulaire alias">
    <StatusBar />
    <MNav title="Envoyer par Alias" />
    <div class="pispi-content compact">
      <section class="pispi-form-title">
        <h2>Envoyer par Alias</h2>
        <p>{{ qrNoAmount ? 'QR Code PI valide sans montant. Complétez le transfert.' : "Coller ou saisir l'alias" }}</p>
      </section>
      <div class="pispi-form-card pispi-alias-transfer-card">
        <label>Alias</label>
        <div :class="`pispi-input-line ${mode === 'alias-invalid' ? 'has-error' : ''}`">
          <Icon :name="mode === 'alias-contact' ? 'search' : 'at-sign'" />
          <span>{{ aliasValue }}</span>
          <button type="button" class="pispi-paste-mini"><Icon name="clipboard" /> Coller</button>
        </div>
        <p v-if="mode === 'alias-invalid'" class="pispi-field-error">Alias invalide. Saisissez un numéro avec indicatif ou une adresse PI valide.</p>
        <label>Montant</label>
        <div :class="`pispi-input-line ${aliasAmountError ? 'has-error' : ''}`"><Icon name="coins" /><span>{{ mode === 'alias-empty-amount' ? 'Montant' : aliasAmountError ? '325.000 CFA' : '48.200 CFA' }}</span></div>
        <small class="pispi-balance-hint">Solde disponible · 284.910 CFA</small>
        <p v-if="aliasAmountError" class="pispi-field-error">Solde insuffisant pour effectuer ce transfert.</p>
        <label>Note</label>
        <div class="pispi-input-line"><Icon name="message-square-text" /><span>Règlement facture</span></div>
      </div>
    </div>
    <div class="cta-bar"><button class="cta">Continuer</button></div>
  </div>

  <div v-else class="phone-screen pispi-screen" data-screen-label="PiSPI Formulaire transfert">
    <StatusBar />
    <MNav title="Transfert par alias" />
    <div class="pispi-content compact">
      <div class="recipient-pill">
        <PiSPIAvatar :name="contactSelected ? 'Amina Oumarou' : 'Mamadou Diallo'" tone="brand" />
        <div><div :style="{ fontSize: '14px', fontWeight: 800, color: 'var(--fg-1)' }">{{ contactSelected ? 'Amina Oumarou' : 'Mamadou Diallo' }}</div><div :style="{ fontSize: '12px', color: 'var(--fg-3)' }">{{ contactSelected ? 'amina.oumarou@pi' : 'mamadou.d@pi' }} · Alias vérifié</div></div>
        <Icon name="chevron-right" />
      </div>
      <div class="amount-screen pispi-amount-block">
        <div class="amount-display">{{ fmtCFA(recentPrefill ? 10000 : amount) }}<span class="amount-cents"> CFA</span></div>
        <div class="amount-hint">Frais SPI estimés · 0 CFA</div>
      </div>
      <div class="amount-chips">
        <div v-for="v in [5000, 10000, 50000]" :key="v" class="amount-chip" @click="setAmount(v)">{{ fmtCFA(v) }} F</div>
      </div>
      <div class="pispi-form-card compact-card">
        <label>Motif</label>
        <div class="pispi-input-line"><Icon name="message-square-text" /><span>Règlement facture</span></div>
        <label>Date d'exécution</label>
        <div class="pispi-input-line"><Icon name="calendar" /><span>Aujourd'hui · immédiat</span></div>
      </div>
    </div>
    <div class="cta-bar"><button class="cta">Continuer</button></div>
  </div>
</template>
