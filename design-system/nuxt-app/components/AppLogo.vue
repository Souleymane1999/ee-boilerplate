<script setup>
import { computed } from 'vue'
import logoOnDark from '~/assets/img/logo-on-dark.png'
import logoOnLight from '~/assets/img/logo-on-light.png'
import logoSpiDark from '~/assets/img/logo-spi-dark.png'
import logoSpiLight from '~/assets/img/logo-spi-light.png'

const props = defineProps({
  name: { type: String, required: true },
  alt: { type: String, default: '' },
})

const sources = {
  'on-dark': logoOnDark,
  'on-light': logoOnLight,
  'spi-dark': logoSpiDark,
  'spi-light': logoSpiLight,
}

const src = computed(() => sources[props.name] || logoOnLight)
</script>

<template>
  <img :src="src" :alt="alt" />
</template>
