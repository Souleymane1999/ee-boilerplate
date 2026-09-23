<script setup>
// Ported from ui_kits/mobile/PiSPIScreens.jsx (PiSPIContactsAliasScreen)
import { computed } from 'vue'

const props = defineProps({
  mode: { type: String, default: 'list' },
})

const formMode = computed(() => ['new-form', 'new-form-phone', 'new-form-invalid', 'add-alias', 'edit-alias'].includes(props.mode))
const selected = computed(() => PISPI_ALIAS_CONTACTS[0])

const addingAlias = computed(() => props.mode === 'add-alias')
const editingAlias = computed(() => props.mode === 'edit-alias')
const newContact = computed(() => props.mode.startsWith('new-form'))
const aliasValue = computed(() => props.mode === 'new-form-phone' ? '+227 90 24 76 36' : props.mode === 'new-form-invalid' ? 'amina-oumarou' : 'amina.ou@pi')

const detailMode = computed(() => ['contact-actions', 'delete-contact', 'alias-removed'].includes(props.mode))
const removed = computed(() => props.mode === 'alias-removed')
const deleted = computed(() => props.mode === 'delete-contact')
</script>

<template>
  <div v-if="formMode" class="phone-screen pispi-screen" data-screen-label="PiSPI Contact formulaire">
    <StatusBar />
    <MNav :title="addingAlias || editingAlias ? selected.name : 'Ajouter un contact'" />
    <div class="pispi-content compact">
      <section v-if="newContact" class="pispi-form-title">
        <h2>Ajouter un contact</h2>
        <p>Enregistrer un nouveau contact avec son alias</p>
      </section>
      <div class="pispi-form-card pispi-contact-form-card">
        <template v-if="!addingAlias && !editingAlias">
          <label>Prénoms et nom</label>
          <div class="pispi-input-line"><Icon name="user-round" /><span>Amina Oumarou</span></div>
        </template>
        <label>Alias</label>
        <div :class="`pispi-input-line ${mode === 'new-form-invalid' ? 'has-error' : ''}`">
          <Icon name="at-sign" />
          <span>{{ editingAlias ? selected.alias : addingAlias ? selected.alias : aliasValue }}</span>
          <button type="button" class="pispi-paste-mini"><Icon name="clipboard" /> Coller</button>
        </div>
        <p v-if="mode === 'new-form-invalid'" class="pispi-field-error">Alias invalide. Collez une adresse PI ou un numéro avec indicatif.</p>
      </div>
      <div class="pispi-compliance-note"><Icon name="badge-check" /><span>Le contact sera enregistré avec le tag @PI dans le carnet d'adresses.</span></div>
    </div>
    <div class="pispi-form-actions">
      <button type="button" class="pispi-secondary-cta">Annuler</button>
      <button type="button" class="cta">{{ newContact ? 'Enregistrer et continuer' : 'Enregistrer' }}</button>
    </div>
  </div>

  <div v-else-if="mode === 'permission'" class="phone-screen pispi-screen" data-screen-label="PiSPI Contacts permission">
    <StatusBar />
    <MNav title="Contacts et Alias" />
    <div class="pispi-content compact">
      <section class="pispi-contact-permission">
        <span><Icon name="contact-round" /></span>
        <h2>Autoriser les contacts</h2>
        <p>PI-SPI peut afficher vos contacts pour vous aider à associer ou retrouver leurs alias de paiement.</p>
        <button type="button">Autoriser l'accès</button>
      </section>
    </div>
  </div>

  <div v-else-if="detailMode" class="phone-screen pispi-screen" data-screen-label="PiSPI Contact détail">
    <StatusBar />
    <MNav :title="deleted ? 'Contact supprimé' : selected.name" />
    <div class="pispi-content compact">
      <section class="pispi-contact-detail-card">
        <PiSPIAvatar :name="selected.name" :tone="selected.tone" />
        <h2>{{ selected.name }}</h2>
        <p>{{ removed ? selected.phone : selected.alias }}</p>
        <div v-if="deleted" class="pispi-inline-toast success"><Icon name="check" /> Contact supprimé du téléphone</div>
        <div v-if="removed" class="pispi-inline-toast success"><Icon name="check" /> Alias supprimé, numéro conservé</div>
      </section>
      <div v-if="!deleted && !removed" class="pispi-contact-actions">
        <button type="button"><Icon name="pencil" /> Modifier l'alias</button>
        <button type="button" class="danger"><Icon name="trash-2" /> Supprimer l'alias</button>
      </div>
    </div>
  </div>

  <div v-else class="phone-screen pispi-screen" data-screen-label="PiSPI Contacts et Alias">
    <StatusBar />
    <MNav title="Contacts et Alias" />
    <div class="pispi-content compact">
      <div class="pispi-search-field"><Icon name="search" /><span>Rechercher un contact ou un alias</span></div>
      <button class="pispi-new-contact-card" type="button">
        <span><Icon name="user-plus" /></span>
        <span class="body"><strong>Nouveau contact</strong><small>Ajouter un contact avec son alias</small></span>
        <Icon name="chevron-right" />
      </button>
      <div class="pispi-send-letter">A</div>
      <div class="pispi-contact-list">
        <PiSPIAliasContactRow v-for="contact in PISPI_ALIAS_CONTACTS" :key="contact.name" :contact="contact" />
      </div>
    </div>
  </div>
</template>
