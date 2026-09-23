<script setup>
// Ported from ui_kits/mobile/PiSPIScreens.jsx (PiSPIHomeScreen)
const props = defineProps({})
const emit = defineEmits(['send', 'receive', 'selectTx', 'back', 'showAll'])
</script>

<template>
  <div class="phone-screen pispi-screen" data-screen-label="PiSPI Accueil">
    <div class="pispi-home-hero">
      <StatusBar />
      <div class="pispi-home-bar">
        <div class="pispi-brand-group">
          <button class="pispi-home-back" @click="emit('back')" aria-label="Retour">
            <Icon name="chevron-left" />
          </button>
          <button class="pispi-profile-button" aria-label="Profil">
            <PiSPIAvatar name="Moustapha K." tone="brand" />
          </button>
          <div class="pispi-brand-lockup" aria-label="SPI BCEAO">
            <span class="pispi-home-logo-crop"><AppLogo name="spi-light" alt="SPI BCEAO" /></span>
          </div>
        </div>
        <div class="pispi-home-icons">
          <button><Icon name="search" /></button>
          <button><Icon name="bar-chart-3" /></button>
          <button><Icon name="bell" /></button>
        </div>
      </div>
      <div class="pispi-home-tabs">
        <span class="active">Compte</span>
        <span>Abonnements</span>
        <span>Économie</span>
      </div>
    </div>

    <div class="pispi-content">
      <section class="pispi-balance-card">
        <div>
          <div class="kicker">Solde SPI disponible</div>
          <div class="balance">284.910 <span>CFA</span></div>
          <div class="sub"><Icon name="trending-up" /> +12.420 CFA aujourd'hui</div>
        </div>
        <button class="pispi-eye"><Icon name="eye-off" /></button>
      </section>

      <div class="pispi-actions">
        <button @click="emit('send')"><span><Icon name="arrow-up-right" /></span>Envoyer</button>
        <button @click="emit('receive')"><span><Icon name="arrow-down-left" /></span>Recevoir</button>
        <button><span><Icon name="more-horizontal" /></span>Plus</button>
      </div>

      <section class="pispi-section-head">
        <div>
          <h3>Dernières transactions</h3>
          <p>Transactions traitées sur le réseau PI/SPI</p>
        </div>
      </section>

      <div class="pispi-list-card">
        <PiSPIRecentRow
          v-for="tx in PISPI_TX.slice(0, 3)"
          :key="tx.id"
          :tx="tx"
          @click="emit('selectTx', tx)"
        />
        <button class="pispi-show-all" @click="emit('showAll')">Tout afficher</button>
      </div>
    </div>

    <PiSPIDock current="home" @send="emit('send')" />
  </div>
</template>
