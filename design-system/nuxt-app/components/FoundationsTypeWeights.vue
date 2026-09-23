<script setup>
</script>

<template>
  <Preview eyebrow="Foundations · Type" title="Display & weights"
    description="Display is Open Sans 800 with tight tracking. Hero headlines only.">
    <div :style="{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: '48px', lineHeight: 1.02, letterSpacing: '-0.028em', color: 'var(--fg-1)' }">
      A new operating system for B2B payments.
    </div>
    <div :style="{ display: 'flex', gap: '20px', alignItems: 'baseline', flexWrap: 'wrap' }">
      <span :style="{ fontWeight: 400, fontSize: '20px', color: 'var(--fg-3)' }">Regular 400</span>
      <span :style="{ fontWeight: 500, fontSize: '20px', color: 'var(--fg-3)' }">Medium 500</span>
      <span :style="{ fontWeight: 600, fontSize: '20px', color: 'var(--fg-2)' }">SemiBold 600</span>
      <span :style="{ fontWeight: 700, fontSize: '20px', color: 'var(--fg-1)' }">Bold 700</span>
      <span :style="{ fontWeight: 800, fontSize: '20px', color: 'var(--fg-1)' }">Black 800</span>
      <span :style="{ fontStyle: 'italic', fontWeight: 400, fontSize: '20px', color: 'var(--fg-3)' }">Italic 400</span>
    </div>
  </Preview>
</template>
