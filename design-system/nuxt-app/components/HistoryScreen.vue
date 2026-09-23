<script setup>
// Ported from mobile/Screens2.jsx `HistoryScreen` — Historique des transactions.
// HTX / htxToneMap / htxStatusLabel come from the useMobileData composable.
const emit = defineEmits(['back'])
</script>

<template>
  <div class="phone-screen" data-screen-label="Historique">
    <StatusBar />
    <MNav title="Historique des transactions" @back="emit('back')">
      <template #right>
        <button class="btn" :style="{ background: 'var(--brand-ink)', borderColor: 'var(--brand-ink)' }">
          <Icon name="qr-code" :style="{ width: '18px', height: '18px', color: 'var(--brand-lime)' }" />
        </button>
      </template>
    </MNav>
    <div class="filter-row">
      <div class="filter-chip active"><span>Services</span><Icon name="chevron-down" /></div>
      <div class="filter-chip"><span>Statut</span><Icon name="chevron-down" /></div>
      <div class="filter-chip"><span>Période</span><Icon name="chevron-down" /></div>
    </div>
    <div class="content">
      <div class="htx-list">
        <div class="htx-card" v-for="(t, i) in HTX" :key="i">
          <div class="htx-top">
            <div class="htx-icon" :style="{ background: (htxToneMap[t.tone] || htxToneMap.lime).bg, color: (htxToneMap[t.tone] || htxToneMap.lime).fg }">
              <Icon :name="t.icon" :style="{ color: (htxToneMap[t.tone] || htxToneMap.lime).fg }" />
            </div>
            <div :style="{ flex: 1, minWidth: 0 }">
              <div class="htx-name">{{ t.service }} <span :style="{ color: 'var(--fg-3)', fontWeight: 600 }">· {{ t.op }}</span></div>
              <div class="htx-amt">{{ fmtCFA(t.amount) }} CFA</div>
            </div>
            <span :class="`m-status ${t.status}`">{{ htxStatusLabel[t.status] }}</span>
          </div>
          <div class="htx-bot">
            <span :style="{ display: 'inline-flex', alignItems: 'center', gap: '4px' }">
              <Icon name="clock" :style="{ width: '12px', height: '12px' }" /> {{ t.date }}
            </span>
            <span class="htx-ref"><Icon name="ticket" />{{ t.ref }}</span>
          </div>
        </div>
        <div :style="{ textAlign: 'center', fontSize: '12px', color: 'var(--fg-3)', padding: '8px' }">
          Affichage de 7 transactions sur 248
        </div>
      </div>
    </div>
  </div>
</template>
