<script setup>
// Ported from web_app/components.jsx `Avatar`.
import { computed } from 'vue'

const props = defineProps({
  name: { type: String, required: true },
  tone: { type: String, default: 'brand' },
})

const toneMap = {
  brand: { bg: '#F2F6D6', fg: '#5E6A1A' },
  success: { bg: '#E6F4EA', fg: '#1F6E3A' },
  warning: { bg: '#FCF3DD', fg: '#8E5F0F' },
  danger: { bg: '#FBE7E5', fg: '#9F271E' },
  info: { bg: '#E5EFF9', fg: '#1E4F86' },
  neutral: { bg: '#ECECE7', fg: '#525249' },
}
const t = computed(() => toneMap[props.tone] || toneMap.brand)
const initials = computed(() =>
  props.name
    .split(' ')
    .map((s) => s[0])
    .slice(0, 2)
    .join('')
    .toUpperCase(),
)
</script>

<template>
  <span class="row-avatar" :style="{ background: t.bg, color: t.fg }">{{ initials }}</span>
</template>
