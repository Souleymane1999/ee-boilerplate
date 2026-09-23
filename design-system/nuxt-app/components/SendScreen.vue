<script setup>
// Ported from mobile/Screens.jsx `SendScreen` — Envoyer (saisie montant).
import { ref, computed } from 'vue'

const emit = defineEmits(['back', 'continue'])

const amount = ref('48200')

const pressKey = (k) => {
  if (k === 'back') {
    amount.value = amount.value.slice(0, -1) || '0'
    return
  }
  if (k === '.') return // no decimals in CFA
  amount.value = amount.value === '0' ? k : amount.value + k
}

const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '000', '0', 'back']
const display = computed(() => fmtCFA(parseInt(amount.value || '0', 10)))
</script>

<template>
  <div class="phone-screen" data-screen-label="Envoyer">
    <StatusBar />
    <div :style="{ display: 'flex', alignItems: 'center', padding: '0 16px', height: '44px' }">
      <button @click="emit('back')" :style="{ background: 'transparent', border: 0, padding: '6px', cursor: 'pointer' }"><Icon name="x" :style="{ width: '20px', height: '20px', color: 'var(--fg-2)' }" /></button>
      <div :style="{ flex: 1, textAlign: 'center', fontWeight: 600, fontSize: '15px', color: 'var(--fg-1)' }">Nouveau transfert</div>
      <div :style="{ width: '32px' }" />
    </div>
    <div class="recipient-pill">
      <div class="tx-avatar" :style="{ background: '#FCF3DD', color: '#8E5F0F' }">AK</div>
      <div>
        <div :style="{ fontSize: '14px', fontWeight: 600, color: 'var(--fg-1)' }">Aïssa Kané</div>
        <div :style="{ fontSize: '12px', color: 'var(--fg-3)' }">Airtel · +227 90 ••12</div>
      </div>
      <Icon name="chevron-right" />
    </div>
    <div class="amount-screen">
      <div class="amount-display">
        {{ display }}<span class="amount-cents" :style="{ fontSize: '24px', marginLeft: '6px', color: 'var(--fg-3)' }">CFA</span>
      </div>
      <div class="amount-hint">Airtel Money · arrive instantanément · frais 0 CFA</div>
    </div>
    <div class="amount-chips">
      <div class="amount-chip" @click="amount = '5000'">5.000 F</div>
      <div class="amount-chip" @click="amount = '10000'">10.000 F</div>
      <div class="amount-chip" @click="amount = '50000'">50.000 F</div>
    </div>
    <div class="keypad">
      <button
        v-for="k in keys"
        :key="k"
        :class="`key ${k === 'back' ? 'action' : ''}`"
        @click="pressKey(k === '000' ? '000' : k)"
      >
        <Icon v-if="k === 'back'" name="delete" />
        <template v-else>{{ k }}</template>
      </button>
    </div>
    <div class="cta-bar">
      <button class="cta" @click="emit('continue')">Confirmer le transfert</button>
    </div>
  </div>
</template>
