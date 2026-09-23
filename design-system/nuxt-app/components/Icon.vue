<script setup>
// Drop-in replacement for the original `<Icon name="..." />` /
// `<M_Icon name="..." />` helpers which rendered `<i data-lucide="name">`.
// Uses lucide-vue-next; the rendered <svg> carries the `lucide` class so all
// existing `.lucide { width/height/color }` CSS rules keep working unchanged.
import * as lucide from 'lucide-vue-next'
import { computed } from 'vue'

const props = defineProps({
  name: { type: String, required: true },
})

const toPascal = (n) =>
  n
    .split('-')
    .map((p) => (p ? p[0].toUpperCase() + p.slice(1) : ''))
    .join('')

const comp = computed(() => {
  const pascal = toPascal(props.name)
  return lucide[pascal] || lucide[pascal + 'Icon'] || lucide.Circle
})
</script>

<template>
  <component :is="comp" />
</template>
