<script setup>
// Ported from ui_kits/mobile/PiSPIScreens.jsx (PiSPISettingsScreen)
import { ref } from 'vue'

const qr = ref(true)
</script>

<template>
  <div class="phone-screen pispi-screen" data-screen-label="PiSPI Paramètres">
    <StatusBar />
    <MNav title="Paramètres" />
    <div class="pispi-content compact">
      <div class="pispi-option-list">
        <button class="pispi-option-row"><span class="icon"><Icon name="languages" /></span><span class="body"><strong>Langue</strong><small>Français</small></span><Icon name="chevron-right" /></button>
        <button class="pispi-option-row"><span class="icon"><Icon name="palette" /></span><span class="body"><strong>Thème</strong><small>Système</small></span><Icon name="chevron-right" /></button>
        <button class="pispi-option-row"><span class="icon"><Icon name="bell" /></span><span class="body"><strong>Notifications</strong><small>Alertes · son Aurora · vibration</small></span><Icon name="chevron-right" /></button>
        <button class="pispi-option-row" @click="qr = !qr"><span class="icon"><Icon name="qr-code" /></span><span class="body"><strong>Mon QR Code par défaut</strong><small>{{ qr ? 'Afficher le QR à l’ouverture' : 'Afficher le scanner' }}</small></span><span :class="`m-switch ${qr ? 'on' : ''}`"></span></button>
      </div>
    </div>
  </div>
</template>
