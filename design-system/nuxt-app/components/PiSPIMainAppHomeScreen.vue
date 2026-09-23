<script setup>
// Ported from ui_kits/mobile/PiSPIScreens.jsx (PiSPIMainAppHomeScreen)
import { ref } from 'vue'

const emit = defineEmits(['openPi'])
const nav = ref('home')
const appRows = HOME_TX || []
</script>

<template>
  <div class="phone-screen" data-screen-label="Accueil application PI">
    <div class="balance-hero">
      <StatusBar on-dark />
      <div :style="{ padding: '14px 6px 0' }">
        <div class="greet">Solde disponible · Moustapha K.</div>
        <div class="amt">284.910 <span :style="{ fontSize: '22px', fontWeight: 600, color: '#9A9A90' }">CFA</span></div>
        <div class="sub">↑ 12.420 CFA aujourd'hui</div>
      </div>
    </div>

    <div class="quick-actions pispi-main-shortcuts">
      <div class="qa"><Icon name="arrow-up-right" /><span>Envoyer</span></div>
      <div class="qa"><Icon name="arrow-down-left" /><span>Recharger</span></div>
      <div class="qa"><Icon name="qr-code" /><span>Scanner</span></div>
      <div class="qa"><Icon name="receipt-text" /><span>Factures</span></div>
    </div>

    <div class="content">
      <div class="pispi-main-section-row">
        <div>Services</div>
        <span>Disponible</span>
      </div>

      <div class="pispi-main-service-list">
        <button class="pispi-main-service-row" @click="emit('openPi')">
          <span class="service-logo" aria-hidden="true">
            <span class="service-logo-pi-mark"><AppLogo name="spi-dark" alt="" /></span>
          </span>
          <span class="service-copy">
            <strong>PI-SPI</strong>
          </span>
          <span class="service-tag">Ouvrir</span>
          <Icon name="chevron-right" />
        </button>
      </div>

      <div :style="{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '4px 20px 6px' }">
        <div :style="{ fontSize: '16px', fontWeight: 700, color: 'var(--fg-1)' }">Mes transactions</div>
        <span :style="{ fontSize: '12px', color: 'var(--brand-lime-700)', fontWeight: 600 }">Voir tout</span>
      </div>

      <div class="m-list">
        <MTxRow v-for="t in appRows" :key="t.id" :tx="t" @click="() => {}" />
      </div>
      <div :style="{ height: '12px' }"></div>
    </div>

    <TabBar :current="nav" @nav="nav = $event" />
  </div>
</template>
