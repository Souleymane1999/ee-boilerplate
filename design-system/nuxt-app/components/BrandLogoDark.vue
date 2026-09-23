<script setup>
// Design System · Brand — logo on dark surfaces.
</script>

<template>
  <Preview eyebrow="Brand" title="Logo · on dark surfaces">
    <div :style="{ background: 'var(--brand-ink)', color: 'var(--fg-on-dark)', borderRadius: '12px', padding: '36px 28px', display: 'flex', gap: '32px', alignItems: 'center' }">
      <AppLogo name="on-dark" alt="iFutur" :style="{ height: '64px', width: 'auto' }" />
      <div :style="{ display: 'flex', flexDirection: 'column', gap: '6px' }">
        <div class="if-body-sm" :style="{ color: '#C5C5BC' }">Use on <code class="if-mono" :style="{ color: '#BBCB44' }">--bg-inverse</code> (#0E1110) or any &gt;700 neutral.</div>
        <div class="if-body-sm" :style="{ color: '#9A9A90' }">The lime is electric on dark — perfect for hero sections.</div>
      </div>
    </div>
  </Preview>
</template>
