<script setup>
const rows = [
  { tok: '--space-1',  px: 4,  use: 'hairline gaps' },
  { tok: '--space-2',  px: 8,  use: 'icon→label, chip padding' },
  { tok: '--space-3',  px: 12, use: 'form rows' },
  { tok: '--space-4',  px: 16, use: 'card inner padding' },
  { tok: '--space-6',  px: 24, use: 'section gaps' },
  { tok: '--space-8',  px: 32, use: 'card outer padding' },
  { tok: '--space-12', px: 48, use: 'between sections' },
  { tok: '--space-20', px: 80, use: 'marketing page rhythm' },
]
</script>

<template>
  <Preview eyebrow="Foundations · Spacing" title="Spacing scale · 4px base">
    <div :style="{ display: 'flex', flexDirection: 'column', gap: '8px' }">
      <div v-for="r in rows" :key="r.tok" :style="{ display: 'flex', alignItems: 'center', gap: '14px' }">
        <div :style="{ width: r.px + 'px', height: '14px', background: 'var(--brand-lime)', borderRadius: '1px', flexShrink: 0 }"></div>
        <span class="pv-token-name" :style="{ width: '80px' }">{{ r.tok }}</span>
        <span class="if-body-sm">{{ r.px }}px · {{ r.use }}</span>
      </div>
    </div>
  </Preview>
</template>
