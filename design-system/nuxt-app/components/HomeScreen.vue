<script setup>
// Ported from mobile/Screens.jsx `HomeScreen` — Accueil. HOME_TX comes from
// the auto-imported useMobileData composable.
const emit = defineEmits(['selectTx', 'send'])
</script>

<template>
  <div class="phone-screen" data-screen-label="Accueil">
    <div class="balance-hero">
      <StatusBar :on-dark="true" />
      <div :style="{ padding: '14px 6px 0' }">
        <div class="greet">Solde disponible · Moustapha K.</div>
        <div class="amt">284.910 <span :style="{ fontSize: '22px', fontWeight: 600, color: '#9A9A90' }">CFA</span></div>
        <div class="sub">↑ 12.420 CFA aujourd'hui</div>
      </div>
    </div>
    <div class="quick-actions">
      <div class="qa" @click="emit('send')"><Icon name="arrow-up-right" /><span>Envoyer</span></div>
      <div class="qa"><Icon name="arrow-down-left" /><span>Recharger</span></div>
      <div class="qa"><Icon name="qr-code" /><span>Scanner</span></div>
      <div class="qa"><Icon name="receipt-text" /><span>Factures</span></div>
    </div>
    <div class="content">
      <div :style="{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '4px 20px 6px' }">
        <div :style="{ fontSize: '16px', fontWeight: 700, color: 'var(--fg-1)' }">Mes transactions</div>
        <span :style="{ fontSize: '12px', color: 'var(--brand-lime-700)', fontWeight: 600 }">Voir tout</span>
      </div>
      <div class="m-list">
        <MTxRow
          v-for="t in HOME_TX"
          :key="t.id"
          :tx="t"
          :clickable="true"
          @click="emit('selectTx', t)"
        />
      </div>
      <div :style="{ height: '12px' }" />
    </div>
  </div>
</template>
