<script setup>
// Ported from ui_kits/mobile/PiSPIScreens.jsx (PiSPIBrandHeader)
defineProps({
  compact: { type: Boolean, default: false },
})
</script>

<template>
  <div :class="`pispi-brand-panel ${compact ? 'compact' : ''}`">
    <AppLogo name="spi-dark" alt="SPI BCEAO" />
    <span>Service réglementé BCEAO</span>
  </div>
</template>
