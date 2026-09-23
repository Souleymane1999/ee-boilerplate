<script setup>
const boxes = [
  { l: 'xs', s: '0 1px 1px rgba(14,17,16,0.04)' },
  { l: 'sm', s: '0 1px 2px rgba(14,17,16,0.06), 0 1px 1px rgba(14,17,16,0.04)' },
  { l: 'md', s: '0 4px 12px rgba(14,17,16,0.06), 0 1px 2px rgba(14,17,16,0.04)' },
  { l: 'lg', s: '0 12px 28px rgba(14,17,16,0.10), 0 2px 4px rgba(14,17,16,0.04)' },
  { l: 'xl', s: '0 24px 56px rgba(14,17,16,0.14), 0 4px 8px rgba(14,17,16,0.05)' },
]
</script>

<template>
  <Preview eyebrow="Foundations · Spacing" title="Elevation & shadows" :dark="false"
    description="Shadows are layered (ambient + key) and warm-tinted to match the ink palette. Never use pure black shadows.">
    <div :style="{ background: 'var(--neutral-25)', padding: '20px', borderRadius: '12px' }">
      <div :style="{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '14px' }">
        <div v-for="b in boxes" :key="b.l" :style="{ background: '#fff', borderRadius: '10px', height: '80px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: '8px', boxShadow: b.s, border: b.l === 'xs' ? '1px solid var(--border-subtle)' : 'none' }">
          <span class="pv-swatch-label">{{ b.l }}</span>
        </div>
      </div>
    </div>
  </Preview>
</template>
