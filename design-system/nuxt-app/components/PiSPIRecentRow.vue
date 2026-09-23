<script setup>
// Ported from ui_kits/mobile/PiSPIScreens.jsx (PiSPIRecentRow)
defineProps({
  tx: { type: Object },
})
const emit = defineEmits(['click'])
</script>

<template>
  <button class="pispi-tx-row" @click="emit('click')">
    <span class="pispi-tx-avatar-wrap">
      <PiSPIAvatar :name="tx.name" :tone="tx.tone" />
      <span :class="`pispi-tx-direction ${tx.amount > 0 ? 'incoming' : 'outgoing'}`">
        <Icon :name="tx.amount > 0 ? 'arrow-down-left' : 'arrow-up-right'" />
      </span>
    </span>
    <span class="body">
      <span class="name">{{ tx.name }}</span>
      <span class="meta">{{ tx.title }} · {{ tx.when }}</span>
    </span>
    <span class="amount">
      <span :class="tx.amount > 0 ? 'pos' : ''">{{ tx.amount > 0 ? '+' : '-' }}{{ fmtCFA(tx.amount) }} CFA</span>
      <span class="status">{{ tx.statusLabel }}</span>
    </span>
  </button>
</template>
