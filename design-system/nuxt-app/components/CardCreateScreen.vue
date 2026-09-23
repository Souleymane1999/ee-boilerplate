<script setup>
// Ported from mobile/Screens3.jsx `CardCreateScreen` — Créer une nouvelle carte.
import { ref } from 'vue'

const emit = defineEmits(['back'])
const kind = ref('virtuelle')
const initial = ref(2000)
const presets = [2000, 5000, 10000, 25000]

const onInitialInput = (e) => {
  initial.value = parseInt(e.target.value.replace(/\./g, '') || '0', 10)
}
</script>

<template>
  <div class="phone-screen" data-screen-label="Créer une carte">
    <StatusBar />
    <MNav title="Créer une nouvelle carte" @back="emit('back')" />

    <div class="m-section-h-sm">Type de carte</div>
    <div :style="{ display: 'flex', gap: '10px', padding: '0 16px' }">
      <div :class="`method-card ${kind === 'virtuelle' ? 'active' : ''}`" :style="{ flex: 1, alignItems: 'flex-start', padding: '14px 14px 12px' }" @click="kind = 'virtuelle'">
        <div class="logo" :style="{ background: 'var(--brand-lime-50)' }"><Icon name="smartphone" :style="{ color: 'var(--brand-lime-700)' }" /></div>
        <div class="lbl" :style="{ textAlign: 'left' }">Carte virtuelle</div>
        <div :style="{ fontSize: '11px', color: 'var(--fg-3)', textAlign: 'left' }">Émission instantanée · gratuit</div>
      </div>
      <div :class="`method-card ${kind === 'physique' ? 'active' : ''}`" :style="{ flex: 1, alignItems: 'flex-start', padding: '14px 14px 12px' }" @click="kind = 'physique'">
        <div class="logo" :style="{ background: '#E0EDFC' }"><Icon name="credit-card" :style="{ color: '#1E4F86' }" /></div>
        <div class="lbl" :style="{ textAlign: 'left' }">Carte physique</div>
        <div :style="{ fontSize: '11px', color: 'var(--fg-3)', textAlign: 'left' }">Livrée à Niamey · 7.500 CFA</div>
      </div>
    </div>

    <div class="m-field-label">Nom sur la carte</div>
    <div class="m-input">
      <div class="icon"><Icon name="user-round" /></div>
      <input value="MOUSTAPHA K. AMADOU" />
    </div>

    <div class="m-field-label">Recharge initiale</div>
    <div class="m-input">
      <div class="icon"><Icon name="coins" /></div>
      <input :value="fmtCFA(initial)" @input="onInitialInput" />
      <span :style="{ fontSize: '12.5px', color: 'var(--fg-3)', fontWeight: 700 }">CFA</span>
    </div>

    <div class="preset-grid" :style="{ marginTop: '8px', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }">
      <div
        v-for="v in presets"
        :key="v"
        :class="`preset-chip ${initial === v ? 'active' : ''}`"
        @click="initial = v"
      >
        {{ fmtCFA(v) }}
      </div>
    </div>

    <div class="m-section-h-sm">Récapitulatif</div>
    <div class="info-card">
      <div class="info-row"><span class="k">Type</span><span class="v" :style="{ textTransform: 'capitalize' }">{{ kind }}</span></div>
      <div class="info-row"><span class="k">Émission</span><span class="v">{{ kind === 'virtuelle' ? 'Gratuit' : '7.500 CFA' }}</span></div>
      <div class="info-row"><span class="k">Recharge initiale</span><span class="v">{{ fmtCFA(initial) }} CFA</span></div>
      <div class="info-row"><span class="k">Total à débiter</span><span class="v" :style="{ color: 'var(--brand-lime-700)' }">{{ fmtCFA(initial + (kind === 'virtuelle' ? 0 : 7500)) }} CFA</span></div>
    </div>

    <div :style="{ flex: 1 }" />
    <button class="m-cta-primary">Créer la carte</button>
  </div>
</template>
