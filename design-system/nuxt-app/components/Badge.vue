<script setup>
// Ported from web_app/components.jsx `Badge`.
defineProps({
  tone: { type: String, default: 'neutral' },
  dot: { type: String, default: '' },
})
</script>

<template>
  <span :class="`badge badge-${tone}`">
    <span v-if="dot" class="dot" :style="{ background: dot }" />
    <slot />
  </span>
</template>
