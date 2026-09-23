<script setup>
// Ported from ui_kits/mobile/PiSPIScreens.jsx (PiSPIProfileScreen)
const rows = [
  ['circle-user', 'Compte', 'Informations personnelles et détails du compte'],
  ['shield', 'Sécurité & confidentialité', 'PIN, biométrie, cacher les montants'],
  ['settings', "Paramètres de l'application", 'Langue, thème, notifications, QR Code'],
  ['help-circle', "Centre d'aide", 'Support et assistance SPI'],
]
</script>

<template>
  <div class="phone-screen pispi-screen" data-screen-label="PiSPI Profil">
    <StatusBar />
    <MNav title="Profil" />
    <div class="pispi-content compact">
      <section class="pispi-profile-top">
        <PiSPIAvatar name="Moustapha K." tone="brand" />
        <div><h2>Moustapha Kodjo</h2><p>Client particulier · SPI vérifié</p></div>
      </section>
      <div class="pispi-option-list">
        <button v-for="[icon, title, text] in rows" class="pispi-option-row" :key="title">
          <span class="icon"><Icon :name="icon" /></span>
          <span class="body"><strong>{{ title }}</strong><small>{{ text }}</small></span>
          <Icon name="chevron-right" />
        </button>
      </div>
      <button class="m-cta-danger"><Icon name="log-out" />Déconnexion</button>
      <div class="pispi-version">Version 0.0.1 · PI/SPI</div>
    </div>
  </div>
</template>
