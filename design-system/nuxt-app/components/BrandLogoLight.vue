<script setup>
// Design System · Brand — logo on light surfaces.
</script>

<template>
  <Preview eyebrow="Brand" title="Logo · on light surfaces"
    description="Use on --bg-page or --bg-surface. Min height 24px. Clear-space equals the height of the 'i' mark on all sides.">
    <div :style="{ background: 'var(--neutral-25)', borderRadius: '12px', padding: '36px 28px', display: 'flex', gap: '32px', alignItems: 'center', border: '1px solid var(--border-subtle)' }">
      <AppLogo name="on-light" alt="iFutur" :style="{ height: '64px', width: 'auto' }" />
      <div :style="{ display: 'flex', flexDirection: 'column', gap: '6px' }">
        <div class="if-body-sm" :style="{ color: 'var(--fg-2)' }">Use on <code class="if-mono">--bg-page</code>, <code class="if-mono">--bg-surface</code>.</div>
        <div class="if-body-sm" :style="{ color: 'var(--fg-3)' }">Min height 24px. Clear-space = the height of the "i" mark on all sides.</div>
      </div>
    </div>
  </Preview>
</template>
