<script setup>
// Ported from ui_kits/mobile/PiSPIScreens.jsx (PiSPIPermissionsScreen)
</script>

<template>
  <div class="phone-screen pispi-screen" data-screen-label="PiSPI Permissions">
    <StatusBar />
    <MNav title="Autorisations" />
    <div class="pispi-content compact">
      <section class="pispi-form-title">
        <h2>Activer les services utiles</h2>
        <p>SPI demande seulement les accès nécessaires au fonctionnement des paiements.</p>
      </section>
      <div class="pispi-option-list">
        <button class="pispi-option-row">
          <span class="icon"><Icon name="bell-ring" /></span>
          <span class="body"><strong>Notifications</strong><small>Recevoir les demandes, statuts et alertes de sécurité</small></span>
          <span class="pill-badge success">Activé</span>
        </button>
        <button class="pispi-option-row">
          <span class="icon"><Icon name="contact-round" /></span>
          <span class="body"><strong>Contacts</strong><small>Retrouver les alias PI enregistrés localement</small></span>
          <span class="pill-badge neutral">À valider</span>
        </button>
      </div>
      <div class="pispi-compliance-note"><Icon name="shield" /><span>Les permissions peuvent être modifiées à tout moment dans les paramètres.</span></div>
    </div>
    <div class="cta-bar"><button class="cta">Continuer</button></div>
  </div>
</template>
