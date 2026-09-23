<script setup>
// Ported from mobile/Screens2.jsx `DepositScreen` — Dépôt agent.
import { ref } from 'vue'

const emit = defineEmits(['back'])
const amount = ref(50000)
const presets = [100, 200, 500, 1000, 2000, 5000, 10000, 20000, 50000, 100000]

const onAmountInput = (e) => {
  amount.value = parseInt(e.target.value.replace(/\./g, '') || '0', 10)
}
</script>

<template>
  <div class="phone-screen" data-screen-label="Dépôt">
    <StatusBar />
    <MNav title="Dépôt" @back="emit('back')">
      <template #right>
        <button class="btn" :style="{ background: '#FFEDD9', borderColor: '#F5C685' }">
          <Icon name="wallet" :style="{ width: '18px', height: '18px', color: '#B5610B' }" />
        </button>
      </template>
    </MNav>

    <div class="m-field-label">Numéro de téléphone</div>
    <div class="m-input">
      <div class="country-pill"><span class="flag" /><span class="code">+227</span></div>
      <input placeholder="Saisir le numéro" />
    </div>

    <div class="m-field-label">Montant</div>
    <div class="m-input">
      <div class="icon"><Icon name="coins" /></div>
      <input :value="fmtCFA(amount)" @input="onAmountInput" />
      <span :style="{ fontSize: '12.5px', color: 'var(--fg-3)', fontWeight: 700 }">CFA</span>
    </div>

    <div class="preset-label">Ou sélectionner un montant</div>
    <div class="preset-grid">
      <div
        v-for="v in presets"
        :key="v"
        :class="`preset-chip ${amount === v ? 'active' : ''}`"
        @click="amount = v"
      >
        {{ fmtCFA(v) }}
      </div>
    </div>

    <div :style="{ flex: 1 }" />

    <div class="info-card" :style="{ margin: '12px 16px 0', background: 'var(--brand-lime-50)', borderColor: 'var(--brand-lime-200)' }">
      <div class="info-row" :style="{ padding: '10px 14px' }">
        <span class="k" :style="{ flex: 0 }"><Icon name="info" :style="{ width: '14px', height: '14px', color: 'var(--brand-lime-700)' }" /></span>
        <span class="v" :style="{ textAlign: 'left', fontWeight: 500, color: 'var(--fg-2)', fontSize: '12px', lineHeight: 1.45 }">
          Le client recevra un SMS de confirmation. Frais agent : <strong>0 CFA</strong>.
        </span>
      </div>
    </div>

    <button class="m-cta-primary" :style="{ marginTop: '12px' }">Valider le dépôt</button>
  </div>
</template>
