<script setup>
// Ported from ui_kits/mobile/PiSPIScreens.jsx (PiSPINumericKeyboard)
const emit = defineEmits(['digit', 'delete'])

const keys = [
  ['1', ''], ['2', 'ABC'], ['3', 'DEF'],
  ['4', 'GHI'], ['5', 'JKL'], ['6', 'MNO'],
  ['7', 'PQRS'], ['8', 'TUV'], ['9', 'WXYZ'],
]
</script>

<template>
  <div class="pispi-ios-keyboard" aria-hidden="true">
    <div class="pispi-ios-key-grid">
      <button v-for="[num, letters] in keys" :key="num" type="button" class="pispi-ios-key" @click="emit('digit', num)">
        <strong>{{ num }}</strong><small v-if="letters">{{ letters }}</small>
      </button>
      <span class="pispi-ios-key-spacer"></span>
      <button type="button" class="pispi-ios-key zero" @click="emit('digit', '0')"><strong>0</strong></button>
      <button type="button" class="pispi-ios-delete" aria-label="Effacer" @click="emit('delete')"><Icon name="delete" /></button>
    </div>
    <div class="pispi-ios-home-indicator"></div>
  </div>
</template>
