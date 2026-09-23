<script setup>
// Ported from ui_kits/mobile/PiSPIScreens.jsx (PiSPIAliasProfileScreen)
import { computed } from 'vue'

const props = defineProps({
  mode: { type: String, default: 'profile' },
})

const accountMode = computed(() => ['account', 'delete-confirm', 'delete-success'].includes(props.mode))
const photoMode = computed(() => ['avatar-edit', 'avatar-updated'].includes(props.mode))
const hasUserAvatar = computed(() => ['avatar-edit', 'avatar-updated', 'profile-photo'].includes(props.mode))
</script>

<template>
  <div v-if="mode === 'delete-auth'" class="phone-screen pispi-screen pispi-claim-pin-screen" data-screen-label="PiSPI Suppression alias - PIN">
    <StatusBar />
    <button type="button" class="pispi-claim-pin-back" aria-label="Retour"><Icon name="arrow-left" /></button>
    <section class="pispi-claim-pin-body">
      <div class="pispi-claim-pin-avatar">MK</div>
      <h2>Bonjour, Moustapha Kodjo</h2>
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

  <div v-else :class="`phone-screen pispi-screen ${mode === 'delete-confirm' || mode === 'delete-success' ? 'pispi-account-modal-screen' : ''}`" data-screen-label="PiSPI Profil Compte">
    <StatusBar />
    <MNav :title="accountMode ? 'Compte' : 'Profil'" />
    <div class="pispi-content compact">
      <section :class="`pispi-profile-identity ${photoMode ? 'is-editable' : ''} ${hasUserAvatar ? 'is-photo' : ''}`">
        <div class="pispi-profile-photo">
          <div class="pispi-profile-photo-fill"><Icon v-if="hasUserAvatar" name="user-round" /><PiSPIAvatar v-else name="Moustapha Kodjo" tone="brand" /></div>
          <button v-if="photoMode" type="button" aria-label="Modifier la photo"><Icon name="camera" /></button>
        </div>
        <div class="pispi-profile-identity-copy">
          <h2>Moustapha Kodjo</h2>
          <p>moustapha.k@pi</p>
        </div>
        <PiSPICopyMini label="Copier l'alias" />
      </section>
      <div v-if="mode === 'avatar-edit'" class="pispi-photo-actions">
        <button type="button"><Icon name="image-plus" /> Choisir une photo</button>
        <button type="button"><Icon name="camera" /> Prendre une photo</button>
      </div>
      <div v-if="mode === 'avatar-updated'" class="pispi-inline-toast success"><Icon name="check" /> Photo mise à jour dans PI</div>
      <template v-if="accountMode">
        <div class="pispi-detail-card pispi-account-detail">
          <PiSPIAccountInfoRow label="Type de compte" value="Compte personnel SPI" />
          <PiSPIAccountInfoRow label="Numéro de compte" value="NE-227-4050-1182" :copy="true" />
          <PiSPIAccountInfoRow label="Adresse de paiement" value="moustapha.k@pi" :copy="true" />
          <PiSPIAccountInfoRow label="Alias téléphone" value="+227 77 540 19 32" :copy="true" />
        </div>
        <button type="button" class="pispi-delete-alias"><Icon name="trash-2" /> Supprimer mon alias</button>
      </template>
      <div v-else class="pispi-option-list">
        <button class="pispi-option-row"><span class="icon"><Icon name="circle-user" /></span><span class="body"><strong>Compte</strong><small>Type, numéro de compte et alias PI</small></span><Icon name="chevron-right" /></button>
        <button class="pispi-option-row"><span class="icon"><Icon name="contact-round" /></span><span class="body"><strong>Contacts et Alias</strong><small>Gérer les bénéficiaires enregistrés</small></span><Icon name="chevron-right" /></button>
        <button class="pispi-option-row"><span class="icon"><Icon name="shield-check" /></span><span class="body"><strong>Sécurité et confidentialité</strong><small>PIN, biométrie et visibilité des montants</small></span><Icon name="chevron-right" /></button>
        <button class="pispi-option-row"><span class="icon"><Icon name="settings" /></span><span class="body"><strong>Paramètres</strong><small>Langue, notifications et préférences</small></span><Icon name="chevron-right" /></button>
        <button class="pispi-option-row"><span class="icon"><Icon name="help-circle" /></span><span class="body"><strong>Centre d'aide</strong><small>Assistance et questions fréquentes</small></span><Icon name="chevron-right" /></button>
      </div>
    </div>
    <template v-if="mode === 'delete-confirm'">
      <div class="pispi-modal-dim"></div>
      <section class="pispi-confirm-dialog pispi-delete-dialog">
        <h2>Supprimer cet alias ?</h2>
        <p>Votre alias téléphone +227 77 540 19 32 ne pourra plus recevoir de paiements. L'adresse de paiement moustapha.k@pi restera disponible.</p>
        <div>
          <button type="button">Confirmer</button>
          <button type="button" class="secondary">Annuler</button>
        </div>
      </section>
    </template>
    <template v-if="mode === 'delete-success'">
      <div class="pispi-modal-dim"></div>
      <section class="pispi-result-sheet pispi-profile-result-sheet">
        <div class="pispi-result-icon"><Icon name="check" /></div>
        <h2>Alias supprimé</h2>
        <p>Le numéro +227 77 540 19 32 n'est plus associé à votre compte. Vous restez sur le menu Compte.</p>
        <button type="button">Continuer</button>
      </section>
    </template>
  </div>
</template>
