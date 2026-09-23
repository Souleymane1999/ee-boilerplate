<script setup>
const boxes = [
  { r: 3,  label: 'xs · 3' },
  { r: 6,  label: 'sm · 6' },
  { r: 10, label: 'md · 10' },
  { r: 14, label: 'lg · 14' },
  { r: 20, label: 'xl · 20' },
  { r: 28, label: '2xl · 28' },
]
</script>

<template>
  <Preview eyebrow="Foundations · Spacing" title="Corner radii"
    description="Inputs & buttons use md. Cards use lg. Modals use xl. Pills only for chips and toggles.">
    <div :style="{ display: 'flex', gap: '14px', alignItems: 'flex-end', flexWrap: 'wrap' }">
      <div v-for="b in boxes" :key="b.r" class="pv-col" :style="{ alignItems: 'center', gap: '6px' }">
        <div :style="{ width: '64px', height: '64px', background: 'var(--neutral-100)', borderRadius: b.r + 'px', border: '1px solid var(--border-default)' }"></div>
        <div class="pv-swatch-label">{{ b.label }}</div>
      </div>
      <div class="pv-col" :style="{ alignItems: 'center', gap: '6px' }">
        <div :style="{ width: '120px', height: '36px', background: 'var(--neutral-100)', borderRadius: '999px', border: '1px solid var(--border-default)' }"></div>
        <div class="pv-swatch-label">pill</div>
      </div>
    </div>
  </Preview>
</template>
