<script setup>
// Ported from mobile/components.jsx `StatusBar`.
defineProps({
  onDark: { type: Boolean, default: false },
})
</script>

<template>
  <div :class="`status-bar ${onDark ? 'on-dark' : ''}`">
    <span style="font-variant-numeric: tabular-nums">9:41</span>
    <div class="notch" />
    <div class="icons">
      <Icon name="signal" /><Icon name="wifi" /><Icon name="battery" />
    </div>
  </div>
</template>
