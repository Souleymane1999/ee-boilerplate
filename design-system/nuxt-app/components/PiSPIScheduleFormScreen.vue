<script setup>
// Ported from ui_kits/mobile/PiSPIScreens.jsx (PiSPIScheduleFormScreen)
import { computed } from 'vue'

const props = defineProps({
  mode: { type: String, default: 'form' },
})

const withGeo = computed(() => props.mode === 'geo')
</script>

<template>
  <div :class="`phone-screen pispi-screen ${withGeo ? 'pispi-transfer-modal-screen' : ''}`" data-screen-label="PiSPI Programmer">
    <StatusBar />
    <MNav title="Programmer" />
    <div class="pispi-content compact">
      <section class="pispi-form-title">
        <h2>Programmer</h2>
        <p>Définissez la fréquence et les dates d'exécution du transfert.</p>
      </section>
      <div class="pispi-form-card">
        <label>Fréquence</label>
        <div class="pispi-input-line"><Icon name="repeat-2" /><span>Mensuelle</span><Icon name="chevron-down" /></div>
        <div class="pispi-chip-row">
          <span v-for="item in ['Une seule fois', 'Quotidienne', 'Hebdomadaire', 'Mensuelle', 'Annuelle', 'Sur Mesure']" :key="item">{{ item }}</span>
        </div>
        <label>Date de début</label>
        <div class="pispi-input-line"><Icon name="calendar" /><span>7 juin, 15:17</span></div>
        <label>Date de fin</label>
        <div class="pispi-input-line"><Icon name="calendar-days" /><span>Optionnelle</span></div>
        <label>Note</label>
        <div class="pispi-input-line"><Icon name="message-square-text" /><span>Règlement facture</span></div>
        <small class="pispi-balance-hint">Optionnel · 104 caractères maximum</small>
      </div>
    </div>
    <div class="cta-bar"><button class="cta">Continuer</button></div>
    <template v-if="withGeo">
      <div class="pispi-modal-dim"></div>
      <section class="pispi-result-sheet pispi-transfer-result">
        <div class="pispi-result-icon warning"><Icon name="map-pin" /></div>
        <h2>Autoriser la position</h2>
        <p>La position GPS est requise avant de programmer ce transfert.</p>
        <button type="button">Autoriser et continuer</button>
      </section>
    </template>
  </div>
</template>
