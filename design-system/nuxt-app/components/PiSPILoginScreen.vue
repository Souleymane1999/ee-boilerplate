<script setup>
// Ported from ui_kits/mobile/PiSPIScreens.jsx (PiSPILoginScreen)
</script>

<template>
  <div class="phone-screen pispi-screen" data-screen-label="PiSPI Connexion">
    <StatusBar />
    <div class="pispi-content compact">
      <PiSPIBrandHeader />
      <section class="pispi-form-title">
        <h2>Connexion à SPI</h2>
        <p>Utilisez les identifiants fournis par votre institution financière.</p>
      </section>
      <div class="pispi-form-card">
        <label>Votre identifiant</label>
        <div class="pispi-input-line"><Icon name="user-round" /><span>moustapha.kodjo</span></div>
        <label>Mot de passe</label>
        <div class="pispi-input-line"><Icon name="lock" /><span>••••••••••••</span></div>
        <button class="pispi-primary-btn">Continuer</button>
      </div>
      <div class="pispi-compliance-note">
        <Icon name="file-check-2" />
        <span>En continuant, vous acceptez les conditions d'utilisation SPI et la politique de confidentialité.</span>
      </div>
    </div>
  </div>
</template>
