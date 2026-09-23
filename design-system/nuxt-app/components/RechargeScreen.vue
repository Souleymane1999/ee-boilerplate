<script setup>
// Ported from mobile/Screens2.jsx `RechargeScreen` — Recharger mon compte.
// RECHARGES / htxStatusLabel come from the useMobileData composable.
import { ref } from 'vue'

const emit = defineEmits(['back'])
const method = ref('falaphone')
</script>

<template>
  <div class="phone-screen" data-screen-label="Recharger">
    <StatusBar />
    <MNav title="Recharger mon compte" @back="emit('back')" />

    <div class="m-section-h-sm">Modes de recharge</div>
    <div class="method-grid">
      <div :class="`method-card ${method === 'falaphone' ? 'active' : ''}`" @click="method = 'falaphone'">
        <div class="logo" :style="{ background: '#DCEFEE' }"><Icon name="user-round" :style="{ color: '#2A8B85' }" /></div>
        <div class="lbl">Falaphone</div>
      </div>
      <div :class="`method-card ${method === 'amanata' ? 'active' : ''}`" @click="method = 'amanata'">
        <div class="logo" :style="{ background: '#E0F0DA' }"><Icon name="credit-card" :style="{ color: '#2E6B26' }" /></div>
        <div class="lbl">AmanaTa</div>
      </div>
      <div :class="`method-card ${method === 'guichet' ? 'active' : ''}`" @click="method = 'guichet'">
        <div class="logo" :style="{ background: '#F2F6D6' }"><Icon name="landmark" :style="{ color: '#5E6A1A' }" /></div>
        <div class="lbl">Guichet Amana</div>
      </div>
    </div>

    <div class="m-field-label">Numéro de téléphone</div>
    <div class="m-input">
      <div class="country-pill"><span class="flag" /><span class="code">+227</span></div>
      <input placeholder="90 00 00 00" value="87 50 50 52" />
    </div>

    <div class="m-field-label">Montant à recharger</div>
    <div class="m-input">
      <div class="icon"><Icon name="coins" /></div>
      <input placeholder="Entrez le montant" value="10.000" />
      <span :style="{ fontSize: '12.5px', color: 'var(--fg-3)', fontWeight: 700 }">CFA</span>
    </div>

    <button class="m-cta-primary" :style="{ marginTop: '14px' }">Recharger maintenant</button>

    <div class="m-section-h" :style="{ display: 'flex', alignItems: 'center', gap: '8px' }">
      <Icon name="history" :style="{ width: '16px', height: '16px', color: 'var(--brand-lime-700)' }" />
      Historique de recharge
    </div>
    <div class="content" :style="{ padding: 0 }">
      <div class="rh-card" v-for="(r, i) in RECHARGES" :key="i">
        <div class="rh-top">
          <div>
            <div class="rh-amt">{{ fmtCFA(r.amount) }} CFA</div>
            <div class="rh-meta">{{ r.method }}</div>
          </div>
          <span :class="`m-status ${r.status}`">{{ htxStatusLabel[r.status] }}</span>
        </div>
        <div class="rh-foot">
          <Icon name="calendar" /> {{ r.date }}
          <span class="ref">{{ r.ref }}</span>
        </div>
      </div>
      <div :style="{ height: '16px' }" />
    </div>
  </div>
</template>
