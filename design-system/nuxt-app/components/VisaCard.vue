<script setup>
// Ported from mobile/Screens3.jsx `VisaCard` — reusable Visa-style card preview.
defineProps({
  number: { type: String, default: '2432' },
  kind: { type: String, default: 'virtuelle' },
  error: { type: Boolean, default: false },
})
const emit = defineEmits(['retry'])
</script>

<template>
  <div :class="`visa-card ${error ? 'error' : ''}`">
    <div class="row">
      <div class="brand"><span class="dot" />imoney</div>
      <div class="visa">VISA</div>
    </div>
    <div class="num">**** **** **** <strong>{{ number }}</strong></div>
    <div class="foot">
      <span class="pager"><span class="dotnav on" /><span class="dotnav" /><span class="dotnav" /></span>
      <span class="badge">{{ kind }}</span>
    </div>
    <div v-if="error" class="err-overlay">
      <div class="ico"><Icon name="alert-circle" /></div>
      <div class="t">Erreur de chargement</div>
      <div class="s">Erreur interne du serveur</div>
      <div class="retry" @click="emit('retry')"><Icon name="rotate-cw" /></div>
    </div>
  </div>
</template>
