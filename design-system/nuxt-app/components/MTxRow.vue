<script setup>
// Ported from mobile/components.jsx `M_TxRow`.
import { computed } from 'vue'

const props = defineProps({
  tx: { type: Object, required: true },
  clickable: { type: Boolean, default: false },
})
const emit = defineEmits(['click'])

const toneMap = {
  brand: { bg: '#F2F6D6', fg: '#5E6A1A' },
  success: { bg: '#E6F4EA', fg: '#1F6E3A' },
  warning: { bg: '#FCF3DD', fg: '#8E5F0F' },
  info: { bg: '#E5EFF9', fg: '#1E4F86' },
  danger: { bg: '#FBE7E5', fg: '#9F271E' },
}
const t = computed(() => toneMap[props.tx.tone] || { bg: '#ECECE7', fg: '#525249' })
const initials = computed(() =>
  props.tx.name
    .split(' ')
    .map((s) => s[0])
    .slice(0, 2)
    .join('')
    .toUpperCase(),
)
</script>

<template>
  <div
    class="tx-row"
    :style="{ cursor: clickable ? 'pointer' : 'default' }"
    @click="emit('click')"
  >
    <div class="tx-avatar" :style="{ background: t.bg, color: t.fg }">{{ initials }}</div>
    <div>
      <div class="tx-name">{{ tx.name }}</div>
      <div class="tx-meta">{{ tx.subtitle || tx.when }}</div>
    </div>
    <div>
      <div :class="`tx-amount ${tx.amount > 0 ? 'pos' : ''}`">
        {{ tx.amount > 0 ? '+' : '−' }}{{ fmtCFA(tx.amount) }} CFA
      </div>
      <div class="tx-status">{{ tx.statusLabel || tx.method || '' }}</div>
    </div>
  </div>
</template>
