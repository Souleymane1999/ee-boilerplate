<script setup>
const hexes = ['#FFFFFF','#FAFAF8','#F4F4F1','#ECECE7','#DDDDD6','#C5C5BC','#9A9A90','#6F6F66','#525249','#36362F','#22221D','#131310']
const labels = [0,25,50,100,200,300,400,500,600,700,800,900]
</script>

<template>
  <Preview eyebrow="Foundations · Color" title="Neutrals — warm-cool slate"
    description="Neutrals trend slightly warm so they harmonize with the lime brand. Avoid pure cool greys (#888, etc.) — they fight the wordmark.">
    <div class="pv-row" :style="{ gap: '6px', alignItems: 'flex-end', flexWrap: 'nowrap' }">
      <div v-for="(hex, i) in hexes" :key="hex" class="pv-col" :style="{ alignItems: 'center', gap: '4px' }">
        <div class="pv-swatch-sm" :style="{ background: hex }"></div>
        <div class="pv-swatch-label">{{ labels[i] }}</div>
      </div>
    </div>
  </Preview>
</template>
