<script setup>
// Ported from mobile/components.jsx `MNav`. `right` slot replaces the React
// `right` prop; falls back to a spacer div when empty.
import { useSlots } from 'vue'

defineProps({
  title: { type: String, default: '' },
})
const emit = defineEmits(['back'])
const slots = useSlots()
</script>

<template>
  <div class="m-nav">
    <button class="btn" @click="emit('back')"><Icon name="chevron-left" /></button>
    <div class="title">{{ title }}</div>
    <slot v-if="slots.right" name="right" />
    <div v-else style="width: 38px" />
  </div>
</template>
