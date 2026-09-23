<script setup>
// Shared Preview wrapper — ported from window.Preview in index.html.
defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  dark: { type: Boolean, default: false },
})
</script>

<template>
  <section :class="['ds-preview', { 'is-dark': dark }]">
    <header v-if="eyebrow || title || description" class="ds-preview-header">
      <div v-if="eyebrow" class="if-eyebrow" :style="dark ? { color: '#9A9A90' } : null">{{ eyebrow }}</div>
      <h2 v-if="title" class="ds-preview-title" :style="dark ? { color: '#F4F4F1' } : null">{{ title }}</h2>
      <p v-if="description" class="ds-preview-desc" :style="dark ? { color: '#C5C5BC' } : null">{{ description }}</p>
    </header>
    <slot />
  </section>
</template>
