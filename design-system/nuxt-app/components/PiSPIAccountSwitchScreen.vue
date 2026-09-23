<script setup>
// Ported from ui_kits/mobile/PiSPIScreens.jsx (PiSPIAccountSwitchScreen)
const emit = defineEmits(['back'])
const accounts = [
  { initials: 'PI', title: 'Compte courant PI', subtitle: 'Alias moustapha.k@pi', balance: '284.910 CFA', active: true },
  { initials: 'EP', title: 'Épargne projet', subtitle: 'Solde et historique dédiés', balance: '78.400 CFA' },
  { initials: 'PR', title: 'Compte professionnel', subtitle: 'Transactions professionnelles', balance: '1.204.500 CFA' },
]
</script>

<template>
  <div class="phone-screen pispi-screen" data-screen-label="PiSPI Choix compte">
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
      <section class="pispi-balance-card pispi-account-balance-card">
        <div>
          <div class="kicker">Compte sélectionné</div>
          <div class="balance">284.910 <span>CFA</span></div>
          <div class="sub"><Icon name="refresh-cw" /> Données actualisées</div>
        </div>
        <button class="pispi-eye"><Icon name="chevron-down" /></button>
      </section>

      <section class="pispi-section-head">
        <div>
          <h3>Choisir un compte</h3>
          <p>Le solde et les transactions suivent le compte sélectionné.</p>
        </div>
      </section>

      <div class="pispi-option-list pispi-account-switch-list">
        <button :class="`pispi-option-row ${account.active ? 'active' : ''}`" v-for="account in accounts" :key="account.title">
          <span class="icon account-initials">{{ account.initials }}</span>
          <span class="body"><strong>{{ account.title }}</strong><small>{{ account.subtitle }}</small></span>
          <span class="pispi-account-balance">{{ account.balance }}</span>
        </button>
      </div>

      <div class="pispi-compliance-note">
        <Icon name="shield-check" />
        <span>La sélection du compte s’effectue depuis l’accueil. Les données affichées sont synchronisées avec le compte actif.</span>
      </div>
    </div>

    <PiSPIDock current="home" />
  </div>
</template>
