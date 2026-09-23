<script setup>
// Ported from web_app/Dashboard.jsx `Sparkline`.
import { computed } from 'vue'

const props = defineProps({
  values: { type: Array, required: true },
  color: { type: String, default: '#BBCB44' },
  height: { type: Number, default: 60 },
  fill: { type: Boolean, default: true },
})

const w = 220
const pad = 4
const h = computed(() => props.height)
const geo = computed(() => {
  const vals = props.values
  const max = Math.max(...vals)
  const min = Math.min(...vals)
  const xs = vals.map((_, i) => pad + (i * (w - pad * 2)) / (vals.length - 1))
  const ys = vals.map((v) => pad + (h.value - pad * 2) * (1 - (v - min) / (max - min || 1)))
  const path = vals
    .map((_, i) => `${i === 0 ? 'M' : 'L'} ${xs[i].toFixed(1)} ${ys[i].toFixed(1)}`)
    .join(' ')
  const area = `${path} L ${xs[xs.length - 1].toFixed(1)} ${h.value - pad} L ${pad} ${h.value - pad} Z`
  return { path, area }
})
</script>

<template>
  <svg :width="w" :height="h" :viewBox="`0 0 ${w} ${h}`">
    <path v-if="fill" :d="geo.area" :fill="color" opacity="0.14" />
    <path
      :d="geo.path"
      fill="none"
      :stroke="color"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
