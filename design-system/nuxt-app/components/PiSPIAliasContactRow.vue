<script setup>
// Ported from ui_kits/mobile/PiSPIScreens.jsx (PiSPIAliasContactRow)
defineProps({
  contact: { type: Object },
  active: { type: Boolean, default: false },
})
</script>

<template>
  <button :class="`pispi-contact-alias-row ${active ? 'active' : ''}`" type="button">
    <span class="pispi-contact-avatar-wrap">
      <PiSPIAvatar :name="contact.name" :tone="contact.tone" />
      <span v-if="contact.hasAlias" class="pispi-contact-pi-badge">π</span>
    </span>
    <span class="body"><strong>{{ contact.name }}</strong><small>{{ contact.alias }}</small></span>
    <Icon name="chevron-right" />
  </button>
</template>
