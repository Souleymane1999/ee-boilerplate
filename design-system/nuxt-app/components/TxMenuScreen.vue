<script setup>
// Ported from mobile/Screens2.jsx `TxMenuScreen` — Menu Transactions (agent).
const emit = defineEmits(['back'])

const items = [
  { lbl: 'Historique de gains',         icon: 'trending-up' },
  { lbl: 'Historique du solde',         icon: 'history' },
  { lbl: 'Historique des transactions', icon: 'receipt' },
  { lbl: 'Recharger mon compte',        icon: 'credit-card' },
  { lbl: 'Liste des plaintes',          icon: 'flag' },
]
</script>

<template>
  <div class="phone-screen" data-screen-label="Menu Transactions">
    <StatusBar />
    <MNav title="Transactions" @back="emit('back')" />

    <div class="profile-card" :style="{ background: 'var(--brand-ink)', borderColor: 'var(--brand-ink)', color: '#F4F4F1' }">
      <div :style="{ display: 'flex', alignItems: 'flex-start', gap: '12px' }">
        <div :style="{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(187,203,68,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }">
          <Icon name="wallet" :style="{ width: '20px', height: '20px', color: 'var(--brand-lime-500)' }" />
        </div>
        <div :style="{ flex: 1 }">
          <div :style="{ fontSize: '11.5px', color: '#9A9A90', fontWeight: 600 }">Gains du mois · 05/2026</div>
          <div :style="{ fontSize: '24px', fontWeight: 800, marginTop: '2px', letterSpacing: '-0.018em', fontVariantNumeric: 'tabular-nums', color: '#F4F4F1' }">184.250 <span :style="{ fontSize: '14px', color: '#9A9A90' }">CFA</span></div>
          <div :style="{ fontSize: '11.5px', color: 'var(--brand-lime-500)', fontWeight: 600, marginTop: '4px' }">↑ 12 % vs. avril</div>
        </div>
      </div>
    </div>

    <div :style="{ height: '14px' }" />

    <div class="menu-btn-lg" v-for="(item, i) in items" :key="i">
      <div class="ic"><Icon :name="item.icon" /></div>
      <span class="lbl">{{ item.lbl }}</span>
      <span class="chev"><Icon name="chevron-right" /></span>
    </div>

    <div :style="{ flex: 1 }" />
    <div :style="{ textAlign: 'center', fontSize: '11px', color: 'var(--fg-3)', paddingBottom: '14px' }">
      Agent <strong :style="{ color: 'var(--fg-2)' }">Niamey · Rhodésie</strong> · synchronisé il y a 2 min
    </div>
  </div>
</template>
