<script setup>
const swatches = [
  { hex: '#F9FBEC', label: '50' },
  { hex: '#F2F6D6', label: '100' },
  { hex: '#E4ECAA', label: '200' },
  { hex: '#C6D45C', label: '500' },
  { hex: '#BBCB44', label: 'Lime ★', border: '#A3B339', star: true },
  { hex: '#A3B339', label: '600' },
  { hex: '#889732', label: '700' },
]
</script>

<template>
  <Preview eyebrow="Foundations · Color" title="Brand — iFutur Lime"
    description="--brand-lime is the only true brand color. Use 600 for hover, 700 for active, 100/200 for tints and chip backgrounds.">
    <div class="pv-row" :style="{ gap: '18px', alignItems: 'flex-end', flexWrap: 'wrap' }">
      <div v-for="s in swatches" :key="s.hex" class="pv-col" :style="{ alignItems: 'center', gap: '6px' }">
        <div class="pv-swatch" :style="{ background: s.hex, borderColor: s.border }"></div>
        <div :class="s.star ? 'pv-swatch-name' : 'pv-swatch-label'">{{ s.label }}</div>
        <div class="pv-swatch-label">{{ s.hex.replace('#','') }}</div>
      </div>
    </div>
  </Preview>
</template>
