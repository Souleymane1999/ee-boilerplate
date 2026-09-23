<script setup>
// Ported from ui_kits/mobile/PiSPIScreens.jsx (PiSPIContactCreateScreen)
</script>

<template>
  <div class="phone-screen pispi-screen" data-screen-label="PiSPI Contact">
    <StatusBar />
    <MNav title="Nouveau contact" />
    <div class="pispi-content compact">
      <div class="pispi-form-card">
        <label>Nom complet</label>
        <div class="pispi-input-line"><Icon name="user-round" /><span>Awa Traoré</span></div>
        <label>Alias PI</label>
        <div class="pispi-input-line"><Icon name="at-sign" /><span>awa.tr@pi</span></div>
        <label>Téléphone</label>
        <div class="pispi-input-line"><Icon name="smartphone" /><span>+227 77 540 19 32</span></div>
      </div>
      <div class="pispi-compliance-note"><Icon name="badge-check" /><span>L'alias sera vérifié dans PI avant d'être enregistré.</span></div>
    </div>
    <div class="cta-bar"><button class="cta">Enregistrer</button></div>
  </div>
</template>
