<script setup>
// Ported from mobile/Screens3.jsx `CardDetailScreen` — Détail carte (état erreur).
const emit = defineEmits(['back', 'recharge'])
</script>

<template>
  <div class="phone-screen" data-screen-label="Détail carte">
    <StatusBar />
    <MNav title="Détail carte" @back="emit('back')">
      <template #right>
        <button class="btn" :style="{ background: '#FFEDD9', borderColor: '#F5C685' }">
          <Icon name="settings-2" :style="{ width: '18px', height: '18px', color: '#B5610B' }" />
        </button>
      </template>
    </MNav>

    <div class="content">
      <VisaCard number="2432" kind="virtuelle" :error="true" />

      <button class="m-cta-primary" @click="emit('recharge')" :style="{ marginTop: '14px' }">Recharger ma carte</button>

      <div class="m-section-row">
        <div class="t"><span class="ic"><Icon name="history" /></span>Historique de la carte</div>
        <span class="act">Voir tout</span>
      </div>

      <div class="err-tile">
        <div class="top"><Icon name="alert-octagon" /> Une erreur s'est produite</div>
        <div class="sub">Erreur interne du serveur. Nous n'avons pas pu charger l'historique.</div>
        <button class="retry-btn"><Icon name="rotate-cw" /> Réessayer</button>
      </div>
      <div :style="{ height: '24px' }" />
    </div>
  </div>
</template>
