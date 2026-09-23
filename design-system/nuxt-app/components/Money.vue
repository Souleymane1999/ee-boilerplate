<script setup>
// Unified Money component covering both the web kit (`currency` prop) and the
// mobile kit (`suffix` / `signed` props). CFA formatting via fmtCFA.
import { computed } from 'vue'

const props = defineProps({
  amount: { type: Number, required: true },
  currency: { type: String, default: '' },
  suffix: { type: String, default: '' },
  signed: { type: Boolean, default: false },
})

const unit = computed(() => props.suffix || props.currency || 'CFA')
const sign = computed(() =>
  props.amount < 0 ? '−' : props.signed && props.amount > 0 ? '+' : '',
)
</script>

<template>
  <span class="if-num-tabular">{{ sign }}{{ fmtCFA(amount) }} {{ unit }}</span>
</template>
