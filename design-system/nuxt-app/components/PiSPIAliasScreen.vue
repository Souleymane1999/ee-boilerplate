<script setup>
// Ported from ui_kits/mobile/PiSPIScreens.jsx (PiSPIAliasScreen)
const emit = defineEmits(['back', 'select', 'addressSelect', 'phoneSelect'])

const chooseAddress = () => { emit('addressSelect'); emit('select') }
const choosePhone = () => { emit('phoneSelect'); emit('select') }
</script>

<template>
  <div class="phone-screen pispi-screen pispi-alias-screen" data-screen-label="PiSPI Alias">
    <div class="pispi-alias-header">
      <StatusBar on-dark />
      <div class="pispi-alias-topbar">
        <button @click="emit('back')" aria-label="Retour"><Icon name="chevron-left" /></button>
        <span class="pispi-alias-header-logo"><AppLogo name="spi-dark" alt="SPI BCEAO" /></span>
        <span class="pispi-alias-header-spacer"></span>
      </div>
    </div>
    <div class="pispi-alias-simple">
      <section class="pispi-alias-title">
        <h2>Créer un alias</h2>
        <p>L'alias simplifie le processus et vous permet de recevoir des transactions en toute simplicité tout en préservant votre vie privée.</p>
      </section>
      <div class="pispi-alias-option-list">
        <button class="pispi-alias-option" @click="chooseAddress">
          <span class="icon"><Icon name="scan-face" /></span>
          <span class="body"><strong>Choisir l'adresse de paiement</strong><small>L'adresse de paiement est créée par PI</small></span>
        </button>
        <button class="pispi-alias-option" @click="choosePhone">
          <span class="icon"><Icon name="smartphone" /></span>
          <span class="body"><strong>Choisir le numéro de téléphone</strong><small>Sera enregistré comme alias par PI</small></span>
        </button>
      </div>
    </div>
    <TabBar current="home" @nav="() => {}" />
  </div>
</template>
