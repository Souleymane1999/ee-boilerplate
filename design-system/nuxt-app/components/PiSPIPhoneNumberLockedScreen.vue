<script setup>
// Ported from ui_kits/mobile/PiSPIScreens.jsx (PiSPIPhoneNumberLockedScreen)
import { ref, computed } from 'vue'

const props = defineProps({
  dropdownOpen: { type: Boolean, default: false },
  keyboard: { type: Boolean, default: false },
})
const emit = defineEmits(['back', 'continue'])

const indicators = [
  { flag: '🇸🇳', code: '+221', country: 'Sénégal' },
  { flag: '🇨🇮', code: '+225', country: "Côte d'Ivoire" },
  { flag: '🇧🇯', code: '+229', country: 'Bénin' },
  { flag: '🇧🇫', code: '+226', country: 'Burkina Faso' },
  { flag: '🇲🇱', code: '+223', country: 'Mali' },
  { flag: '🇳🇪', code: '+227', country: 'Niger' },
  { flag: '🇹🇬', code: '+228', country: 'Togo' },
  { flag: '🇬🇳', code: '+224', country: 'Guinée' },
]
const selected = ref(indicators.find(indicator => indicator.code === '+227') || indicators[0])
const phoneDigits = ref('775401932')
const open = ref(props.dropdownOpen)
const keyboardOpen = ref(props.keyboard)
const replaceOnNextDigit = ref(false)

const formatPhone = (digits) => {
  const clean = digits.replace(/\D/g, '').slice(0, 9)
  const groups = [clean.slice(0, 2), clean.slice(2, 5), clean.slice(5, 7), clean.slice(7, 9)].filter(Boolean)
  return groups.join(' ')
}
const showKeyboard = () => { open.value = false; keyboardOpen.value = true; replaceOnNextDigit.value = true }
const addPhoneDigit = (digit) => {
  keyboardOpen.value = true
  open.value = false
  const current = phoneDigits.value
  const next = replaceOnNextDigit.value ? digit : `${current}${digit}`
  phoneDigits.value = next.replace(/\D/g, '').slice(0, 9)
  replaceOnNextDigit.value = false
}
const removePhoneDigit = () => {
  keyboardOpen.value = true
  open.value = false
  phoneDigits.value = replaceOnNextDigit.value ? '' : phoneDigits.value.slice(0, -1)
  replaceOnNextDigit.value = false
}
const formattedPhone = computed(() => formatPhone(phoneDigits.value))
</script>

<template>
  <div :class="`phone-screen pispi-screen pispi-phone-locked-screen ${keyboardOpen ? 'has-phone-keyboard' : ''}`" data-screen-label="PiSPI Numéro téléphone">
    <div class="pispi-alias-header pispi-phone-header">
      <StatusBar on-dark />
      <div class="pispi-alias-topbar">
        <button @click="emit('back')" aria-label="Retour"><Icon name="chevron-left" /></button>
        <span class="pispi-alias-header-logo"><AppLogo name="spi-dark" alt="SPI BCEAO" /></span>
        <span class="pispi-alias-header-spacer"></span>
      </div>
    </div>
    <section class="pispi-phone-locked-body">
      <h2>Numéro de téléphone</h2>
      <p>Un code de vérification sera envoyé sur ce numéro</p>
      <div class="pispi-phone-disabled-row">
        <div class="pispi-country-select">
          <button type="button" class="pispi-country-code" @click="keyboardOpen = false; open = !open" :aria-expanded="open" aria-label="Choisir un indicatif">
            <span>{{ selected.flag }}</span><strong>{{ selected.code }}</strong><Icon name="chevron-down" />
          </button>
          <div v-if="open" class="pispi-country-menu">
            <button
              v-for="indicator in indicators"
              :key="indicator.code"
              type="button"
              :class="indicator.code === selected.code ? 'selected' : ''"
              @click="selected = indicator; open = false"
            >
              <span>{{ indicator.flag }}</span>
              <strong>{{ indicator.code }}</strong>
              <small>{{ indicator.country }}</small>
            </button>
          </div>
        </div>
        <button
          type="button"
          :class="`pispi-phone-disabled-value ${keyboardOpen ? 'active' : ''}`"
          @mousedown="showKeyboard"
          @focus="showKeyboard"
          @click="showKeyboard"
          :aria-pressed="keyboardOpen"
        >
          <span :class="formattedPhone ? '' : 'placeholder'">{{ formattedPhone || 'Téléphone mobile' }}</span>
        </button>
      </div>
    </section>
    <div class="pispi-phone-locked-footer">
      <button @click="emit('continue', selected, phoneDigits)">Continuer</button>
    </div>
    <PiSPINumericKeyboard v-if="keyboardOpen" @digit="addPhoneDigit" @delete="removePhoneDigit" />
  </div>
</template>
