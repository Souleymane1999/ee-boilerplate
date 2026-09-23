<script setup>
// Ported from ui_kits/mobile/PiSPIScreens.jsx (PiSPIDock)
defineProps({
  current: { type: String, default: 'home' },
})
const emit = defineEmits(['send'])
</script>

<template>
  <div class="pispi-dock-wrap">
    <div class="pispi-dock">
      <button :class="current === 'home' ? 'active' : ''"><Icon name="home" /><span>Accueil</span></button>
      <button><Icon name="qr-code" /><span>QR Code</span></button>
      <button class="send" @click="emit('send')"><Icon name="arrow-up-right" /><span>Envoyer</span></button>
    </div>
  </div>
</template>
