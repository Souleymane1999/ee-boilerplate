<script setup>
// Ported from ui_kits/mobile/PiSPIScreens.jsx (PiSPIOtpCodeScreen)
import { computed } from 'vue'

const props = defineProps({
  filled: { type: Boolean, default: false },
  keyboard: { type: Boolean, default: false },
  error: { type: Boolean, default: false },
  resendReady: { type: Boolean, default: false },
  errorMessage: { type: String, default: 'Code incorrect. Vérifiez les 6 chiffres et réessayez.' },
})
const emit = defineEmits(['back'])

const digits = computed(() => props.filled ? ['0', '0', '0', '0', '0', '0'] : ['', '', '', '', '', ''])
</script>

<template>
  <div :class="`phone-screen pispi-screen pispi-otp-screen ${keyboard ? 'has-keyboard' : ''} ${error ? 'has-error' : ''} ${resendReady ? 'has-resend-ready' : ''}`" data-screen-label="PiSPI OTP">
    <div class="pispi-alias-header pispi-otp-header">
      <StatusBar :onDark="true" />
      <div class="pispi-alias-topbar">
        <button aria-label="Retour" @click="emit('back')"><Icon name="chevron-left" /></button>
        <span class="pispi-alias-header-logo"><AppLogo name="spi-dark" alt="SPI BCEAO" /></span>
        <span class="pispi-alias-header-spacer"></span>
      </div>
    </div>
    <section class="pispi-otp-body">
      <h2>Code de vérification</h2>
      <p>Saisissez le code envoyé au +227 77 540 19 32</p>
      <div class="pispi-otp-fields" aria-label="Code de vérification à 6 chiffres">
        <span v-for="(digit, index) in digits" :key="index" :class="`${index === 0 ? 'active' : ''} ${digit ? 'filled' : ''}`">
          <template v-if="digit">{{ digit }}</template>
          <i v-else-if="index === 0"></i>
        </span>
      </div>
      <div v-if="error" class="pispi-otp-error">{{ errorMessage }}</div>
      <button :class="`pispi-otp-resend ${resendReady ? 'is-ready' : ''}`" type="button">
        {{ resendReady ? 'Renvoyer le code' : 'Renvoyer le code dans 00:53' }}
      </button>
    </section>
    <PiSPINumericKeyboard v-if="keyboard" />
  </div>
</template>
