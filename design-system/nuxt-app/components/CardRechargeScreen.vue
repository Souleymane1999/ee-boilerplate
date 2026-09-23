<script setup>
// Ported from mobile/Screens3.jsx `CardRechargeScreen` — Recharger ma carte.
import { ref } from 'vue'

const emit = defineEmits(['back'])
const amount = ref(10000)
const src = ref('imoney')
const presets = [1000, 2000, 5000, 10000, 20000, 50000]

const onAmountInput = (e) => {
  amount.value = parseInt(e.target.value.replace(/\./g, '') || '0', 10)
}
</script>

<template>
  <div class="phone-screen" data-screen-label="Recharger ma carte">
    <StatusBar />
    <MNav title="Recharger ma carte" @back="emit('back')" />

    <VisaCard number="2432" kind="virtuelle" />

    <div class="m-field-label">Source de fonds</div>
    <div :style="{ display: 'flex', gap: '8px', padding: '0 16px' }">
      <div :class="`method-card ${src === 'imoney' ? 'active' : ''}`" :style="{ flex: 1 }" @click="src = 'imoney'">
        <div class="logo" :style="{ background: 'var(--brand-lime-50)' }"><Icon name="wallet" :style="{ color: 'var(--brand-lime-700)' }" /></div>
        <div class="lbl">Solde iMoney</div>
      </div>
      <div :class="`method-card ${src === 'momo' ? 'active' : ''}`" :style="{ flex: 1 }" @click="src = 'momo'">
        <div class="logo" :style="{ background: '#E0EDFC' }"><Icon name="smartphone" :style="{ color: '#1E4F86' }" /></div>
        <div class="lbl">Mobile Money</div>
      </div>
      <div :class="`method-card ${src === 'amanata' ? 'active' : ''}`" :style="{ flex: 1 }" @click="src = 'amanata'">
        <div class="logo" :style="{ background: '#E0F0DA' }"><Icon name="building-2" :style="{ color: '#2E6B26' }" /></div>
        <div class="lbl">AmanaTa</div>
      </div>
    </div>

    <div class="m-field-label">Montant à recharger</div>
    <div class="m-input">
      <div class="icon"><Icon name="coins" /></div>
      <input :value="fmtCFA(amount)" @input="onAmountInput" />
      <span :style="{ fontSize: '12.5px', color: 'var(--fg-3)', fontWeight: 700 }">CFA</span>
    </div>

    <div class="preset-label">Suggestions</div>
    <div class="preset-grid" :style="{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }">
      <div
        v-for="v in presets"
        :key="v"
        :class="`preset-chip ${amount === v ? 'active' : ''}`"
        @click="amount = v"
      >
        {{ fmtCFA(v) }}
      </div>
    </div>

    <div class="info-card" :style="{ margin: '14px 16px 0', background: 'var(--brand-lime-50)', borderColor: 'var(--brand-lime-200)' }">
      <div class="info-row" :style="{ padding: '10px 14px', alignItems: 'center' }">
        <span class="k" :style="{ flex: 0 }"><Icon name="zap" :style="{ width: '14px', height: '14px', color: 'var(--brand-lime-700)' }" /></span>
        <span class="v" :style="{ textAlign: 'left', fontWeight: 500, color: 'var(--fg-2)', fontSize: '12px', lineHeight: 1.45 }">
          La recharge est instantanée. Frais&nbsp;: <strong>1 % min. 200 CFA</strong>.
        </span>
      </div>
    </div>

    <div :style="{ flex: 1 }" />
    <button class="m-cta-primary">Recharger {{ fmtCFA(amount) }} CFA</button>
  </div>
</template>
