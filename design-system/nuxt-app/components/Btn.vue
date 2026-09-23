<script setup>
// Ported from web_app/components.jsx `Btn`.
defineProps({
  variant: { type: String, default: 'primary' },
  icon: { type: String, default: '' },
})
</script>

<template>
  <button :class="`btn btn-${variant}`">
    <Icon v-if="icon" :name="icon" />
    <slot />
  </button>
</template>
