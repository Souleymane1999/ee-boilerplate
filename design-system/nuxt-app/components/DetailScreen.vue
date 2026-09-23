<script setup>
// Ported from mobile/Screens.jsx `DetailScreen` — Détail transaction.
import { computed } from 'vue'

const props = defineProps({
  tx: { type: Object, default: null },
})
const emit = defineEmits(['back'])

const isOutgoing = computed(() => props.tx && props.tx.amount < 0)
const statusTone = computed(() => ({
  'Reçu': 'success', 'Envoyé': 'success', 'Succès': 'success',
  'En attente': 'warning', 'Planifié': 'info', 'Échec': 'danger',
}[props.tx?.statusLabel] || 'success'))

const steps = ['Transaction créée', 'Validation conformité', 'Transmise au partenaire', 'Réglée']
const doneCount = computed(() =>
  props.tx && (props.tx.statusLabel === 'Succès' || props.tx.statusLabel === 'Envoyé' || props.tx.statusLabel === 'Reçu') ? 4 : 3,
)
</script>

<template>
  <div v-if="tx" class="phone-screen" data-screen-label="Détail">
    <StatusBar />
    <div :style="{ display: 'flex', alignItems: 'center', padding: '0 16px', height: '44px' }">
      <button @click="emit('back')" :style="{ background: 'transparent', border: 0, padding: '6px', cursor: 'pointer' }"><Icon name="chevron-left" :style="{ width: '22px', height: '22px', color: 'var(--fg-1)' }" /></button>
      <div :style="{ flex: 1, textAlign: 'center', fontWeight: 600, fontSize: '15px', color: 'var(--fg-1)' }">Transaction</div>
      <button :style="{ background: 'transparent', border: 0, padding: '6px', cursor: 'pointer' }"><Icon name="more-horizontal" :style="{ width: '20px', height: '20px', color: 'var(--fg-2)' }" /></button>
    </div>
    <div class="content">
      <div :style="{ padding: '8px 0' }">
        <div class="detail-amt">{{ isOutgoing ? '−' : '+' }}{{ fmtCFA(tx.amount) }} <span :style="{ fontSize: '22px', color: 'var(--fg-3)' }">CFA</span></div>
        <div class="detail-to">
          <span>{{ isOutgoing ? 'à' : 'de' }}</span>
          <strong :style="{ color: 'var(--fg-1)' }">{{ tx.name }}</strong>
          <span :class="`m-badge m-badge-${statusTone === 'danger' ? 'success' : statusTone}`" :style="{ marginLeft: 'auto' }">{{ tx.statusLabel }}</span>
        </div>
      </div>
      <div class="info-card">
        <div class="info-row"><span class="k">Mode</span><span class="v">{{ tx.method || 'Mobile Money' }}</span></div>
        <div class="info-row"><span class="k">Référence</span><span class="v" :style="{ fontFamily: 'var(--font-mono)' }">I377976535024</span></div>
        <div class="info-row"><span class="k">De</span><span class="v">iMoney · +227 87 50 50 52</span></div>
        <div class="info-row"><span class="k">À</span><span class="v">Airtel · +227 90 ••12</span></div>
        <div class="info-row"><span class="k">Initié</span><span class="v">{{ tx.when }}</span></div>
        <div class="info-row"><span class="k">Frais</span><span class="v">0 CFA</span></div>
      </div>

      <div class="m-eyebrow">Suivi</div>
      <div class="m-card">
        <div
          v-for="(step, i) in steps"
          :key="i"
          :style="{ display: 'flex', gap: '12px', alignItems: 'center', padding: '8px 0', position: 'relative' }"
        >
          <div :style="{ width: '22px', height: '22px', borderRadius: '50%', background: i < doneCount ? 'var(--brand-lime)' : '#fff', border: `2px solid ${i < doneCount ? 'var(--brand-lime-600)' : 'var(--border-default)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }">
            <Icon v-if="i < doneCount" name="check" :style="{ width: '10px', height: '10px', color: 'var(--brand-ink)' }" />
          </div>
          <div :style="{ fontSize: '13px', fontWeight: 600, color: i < doneCount ? 'var(--fg-1)' : 'var(--fg-3)' }">{{ step }}</div>
        </div>
      </div>
      <div :style="{ height: '24px' }" />
    </div>
    <div class="cta-bar">
      <button class="cta">Voir le reçu</button>
    </div>
  </div>
</template>
