<script setup>
// Ported from ui_kits/mobile/PiSPIScreens.jsx (PiSPIAccountInfoRow)
defineProps({
  label: { type: String },
  value: { type: String },
  copy: { type: Boolean, default: false },
})
</script>

<template>
  <div class="pispi-account-info-row">
    <span>{{ label }}</span>
    <strong>{{ value }}</strong>
    <PiSPICopyMini v-if="copy" :label="`Copier ${label}`" />
  </div>
</template>
