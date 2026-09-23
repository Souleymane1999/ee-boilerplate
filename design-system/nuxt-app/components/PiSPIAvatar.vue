<script setup>
// Ported from ui_kits/mobile/PiSPIScreens.jsx (PiSPIAvatar)
import { computed } from 'vue'

const props = defineProps({
  name: { type: String },
  tone: { type: String, default: 'brand' },
})

const initials = computed(() =>
  props.name.split(' ').map(s => s[0]).slice(0, 2).join('').toUpperCase(),
)
</script>

<template>
  <div :class="`pispi-avatar ${tone}`">{{ initials }}</div>
</template>
