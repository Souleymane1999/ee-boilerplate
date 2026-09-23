<script setup>
// Ported from mobile/Screens3.jsx `CardsListScreen` — Mes cartes VISA (liste).
import { ref } from 'vue'

const emit = defineEmits(['back', 'openCard', 'create'])
const tab = ref('virtuel')
</script>

<template>
  <div class="phone-screen" data-screen-label="Mes cartes VISA">
    <StatusBar />
    <MNav title="Mes cartes VISA" @back="emit('back')">
      <template #right>
        <button class="btn" :style="{ background: 'var(--brand-lime-600)', borderColor: 'var(--brand-lime-700)' }">
          <Icon name="hand-coins" :style="{ width: '18px', height: '18px', color: '#fff' }" />
        </button>
      </template>
    </MNav>

    <div class="content">
      <div class="stat-duo" :style="{ marginTop: '4px' }">
        <div class="col">
          <div class="ic"><Icon name="credit-card" /></div>
          <div class="v">1</div>
          <div class="k">Cartes actives</div>
        </div>
        <div class="div" />
        <div class="col">
          <div class="ic"><Icon name="wallet" /></div>
          <div class="v">2.000 CFA</div>
          <div class="k">Solde total</div>
        </div>
      </div>

      <button class="m-cta-primary" @click="emit('create')" :style="{ marginTop: '14px' }">Créer une nouvelle carte</button>

      <div :style="{ display: 'flex', justifyContent: 'flex-end', padding: '18px 16px 14px' }">
        <div class="segmented">
          <div :class="`seg ${tab === 'virtuel' ? 'active' : ''}`" @click="tab = 'virtuel'">
            <Icon name="smartphone" /> Virtuel
          </div>
          <div :class="`seg ${tab === 'physique' ? 'active' : ''}`" @click="tab = 'physique'">
            <Icon name="credit-card" /> Physique
          </div>
        </div>
      </div>

      <div @click="emit('openCard')" :style="{ cursor: 'pointer' }">
        <VisaCard number="2432" kind="virtuelle" />
      </div>
    </div>
  </div>
</template>
