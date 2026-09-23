<script setup>
// Ported from ui_kits/mobile/PiSPIScreens.jsx (PiSPIPinScreen)
const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'bio', 0, 'back']
</script>

<template>
  <div class="phone-screen pispi-screen" data-screen-label="PiSPI Code PIN">
    <StatusBar />
    <div class="pispi-content compact">
      <PiSPIBrandHeader compact />
      <section class="pispi-pin-card">
        <div class="pispi-pin-icon"><Icon name="fingerprint" /></div>
        <h2>Confirmez votre identité</h2>
        <p>Saisissez votre code PIN pour valider l'accès au compte SPI.</p>
        <div class="pispi-pin-dots"><span></span><span></span><span></span><span class="empty"></span></div>
      </section>
      <div class="pispi-keypad-mini">
        <button v-for="k in keys" :key="k">
          <Icon v-if="k === 'bio'" name="fingerprint" />
          <Icon v-else-if="k === 'back'" name="delete" />
          <template v-else>{{ k }}</template>
        </button>
      </div>
    </div>
  </div>
</template>
