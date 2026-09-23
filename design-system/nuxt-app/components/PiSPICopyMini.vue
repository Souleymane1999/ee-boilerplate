<script setup>
// Ported from ui_kits/mobile/PiSPIScreens.jsx (PiSPICopyMini)
defineProps({
  label: { type: String, default: 'Copier' },
})
</script>

<template>
  <button type="button" class="pispi-copy-mini" :aria-label="label"><Icon name="copy" /></button>
</template>
