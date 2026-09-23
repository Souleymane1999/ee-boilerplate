<script setup>
// Ported from ui_kits/mobile/PiSPIScreens.jsx (PiSPIAliasSuccessScreen)
const emit = defineEmits(['continue'])
</script>

<template>
  <div class="phone-screen pispi-screen pispi-success-screen" data-screen-label="PiSPI Alias succès">
    <div class="pispi-success-dim">
      <StatusBar />
      <div class="pispi-success-back"><Icon name="chevron-left" /></div>
      <section class="pispi-success-sheet">
        <div class="pispi-success-check"><Icon name="check" /></div>
        <h2>Bravo</h2>
        <h3>Votre alias est créé</h3>
        <p>
          Vous pouvez le partager avec d'autres personnes afin de recevoir des paiements
          instantanés sur votre compte PI-SPI.
        </p>
        <button @click="emit('continue')">Continuer</button>
      </section>
    </div>
  </div>
</template>
