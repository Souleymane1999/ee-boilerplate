<script setup>
// Ported from ui_kits/mobile/PiSPIScreens.jsx (PiSPIIntroScreen)
const emit = defineEmits(['continue'])

const features = [
  ['shield-check', 'Cadre BCEAO', 'Parcours aligné sur les règles PI/SPI.'],
  ['at-sign', 'Alias PI', 'Recevoir avec une adresse de paiement ou un numéro.'],
  ['clock-3', 'Instantané', 'Suivi clair des statuts et références de bout en bout.'],
]
</script>

<template>
  <div class="phone-screen pispi-screen" data-screen-label="PiSPI Introduction">
    <StatusBar />
    <div class="pispi-auth-hero">
      <PiSPIBrandHeader />
      <div class="pispi-orbit-mark"><Icon name="landmark" /></div>
      <h2>Bienvenue sur SPI</h2>
      <p>Transférez, recevez et suivez vos paiements instantanés dans l'espace UEMOA.</p>
    </div>
    <div class="pispi-content compact">
      <div class="pispi-feature-stack">
        <div class="pispi-feature-row" v-for="[icon, title, text] in features" :key="title">
          <span><Icon :name="icon" /></span>
          <div><strong>{{ title }}</strong><small>{{ text }}</small></div>
        </div>
      </div>
    </div>
    <div class="cta-bar"><button class="cta" @click="emit('continue')">Se connecter</button></div>
  </div>
</template>
