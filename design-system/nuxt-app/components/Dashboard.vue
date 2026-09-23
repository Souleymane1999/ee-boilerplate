<script setup>
// Ported from web_app/Dashboard.jsx `Dashboard` (+ local BarChart, RECENT_TX).
// Sparkline is auto-imported (shared); BarChart is inlined below.
const emit = defineEmits(['selectTx', 'goToPayouts'])

const BAR_DATA = [
  { day: 'Mon', value: 142 }, { day: 'Tue', value: 188 }, { day: 'Wed', value: 164 },
  { day: 'Thu', value: 211 }, { day: 'Fri', value: 248 }, { day: 'Sat', value: 86 },
  { day: 'Sun', value: 64 },
]
const BAR_MAX = Math.max(...BAR_DATA.map((d) => d.value))
const CHART_H = 150

const RECENT_TX = [
  { id: 'INV-2031', name: 'Northwind Trading', tone: 'brand',   ref: 'INV-2031', status: 'paid',      amount: 48210.00, when: '12 min ago' },
  { id: 'INV-2030', name: 'Atlas Corp.',       tone: 'warning', ref: 'INV-2030', status: 'pending',   amount:  1180.55, when: '1 hr ago' },
  { id: 'INV-2029', name: 'Helios Studio',     tone: 'info',    ref: 'INV-2029', status: 'scheduled', amount:  6420.00, when: '3 hr ago' },
  { id: 'INV-2028', name: 'Vega Labs',         tone: 'danger',  ref: 'INV-2028', status: 'failed',    amount:   312.00, when: '5 hr ago' },
  { id: 'INV-2027', name: 'Meridian Co.',      tone: 'brand',   ref: 'INV-2027', status: 'paid',      amount: 12500.00, when: 'Yesterday' },
]
</script>

<template>
  <div class="page">
    <div class="page-header">
      <div>
        <h1 class="page-title">Good afternoon, Jordan.</h1>
        <div class="page-sub">Here's how Northwind moved money this month.</div>
      </div>
      <div :style="{ display: 'flex', gap: '8px', flexShrink: 0 }">
        <Btn variant="secondary" icon="calendar"><span :style="{ whiteSpace: 'nowrap' }">Last 30d</span></Btn>
        <Btn variant="primary" icon="arrow-up-right" @click="emit('goToPayouts')"><span :style="{ whiteSpace: 'nowrap' }">New payout</span></Btn>
      </div>
    </div>

    <div class="kpi-grid" :style="{ marginBottom: '20px' }">
      <Kpi label="Volume · 30d" value="1.240.000 CFA" deltaPct="+12.4%" direction="up" />
      <Kpi label="Payouts sent" value="3.182" deltaPct="+4.1%" direction="up" />
      <Kpi label="Failure rate" value="0.42%" deltaPct="+0.08pp" direction="down" />
      <Kpi label="Available balance" value="284.910 CFA" deltaPct="−48.000 CFA" direction="down" />
    </div>

    <div :style="{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '20px', marginBottom: '20px' }">
      <div class="card-surf" :style="{ padding: '20px' }">
        <div :style="{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }">
          <div>
            <div :style="{ fontSize: '12px', color: 'var(--fg-3)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }">Payout volume</div>
            <div :style="{ fontSize: '22px', fontWeight: 700, color: 'var(--fg-1)', letterSpacing: '-0.014em', fontVariantNumeric: 'tabular-nums', marginTop: '4px' }">1.103.247 CFA <span :style="{ fontSize: '13px', color: '#1F6E3A', fontWeight: 600, marginLeft: '8px' }">↑ 12.4%</span></div>
          </div>
          <div :style="{ display: 'flex', gap: '6px' }">
            <span class="chip active">Week</span>
            <span class="chip">Month</span>
            <span class="chip">Quarter</span>
          </div>
        </div>
        <div :style="{ display: 'flex', alignItems: 'flex-end', gap: '18px', padding: '8px 4px 0' }">
          <div v-for="(d, i) in BAR_DATA" :key="i" :style="{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }">
            <div :style="{ height: CHART_H + 'px', width: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }">
              <div
                :style="{
                  width: '70%',
                  height: Math.round((d.value / BAR_MAX) * CHART_H) + 'px',
                  background: i === 4 ? 'var(--brand-lime)' : 'var(--neutral-200)',
                  borderRadius: '6px 6px 2px 2px',
                  transition: 'background 200ms',
                }"
                :title="`${d.value}k CFA`"
              />
            </div>
            <div :style="{ fontSize: '11px', color: 'var(--fg-3)', fontWeight: 500 }">{{ d.day }}</div>
          </div>
        </div>
      </div>
      <div class="card-surf" :style="{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }">
        <div :style="{ fontSize: '12px', color: 'var(--fg-3)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }">Balance trend</div>
        <Sparkline :values="[280, 305, 290, 320, 310, 340, 332, 360, 345, 350, 330, 320, 285]" :height="100" />
        <div :style="{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--fg-3)' }">
          <span>Oct 12</span><span>Nov 11</span>
        </div>
        <div :style="{ borderTop: '1px solid var(--border-subtle)', paddingTop: '12px', display: 'flex', gap: '14px', fontSize: '13px' }">
          <div :style="{ flex: 1 }">
            <div :style="{ color: 'var(--fg-3)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }">Inflows</div>
            <div :style="{ fontWeight: 700, color: 'var(--fg-1)', fontVariantNumeric: 'tabular-nums', fontSize: '16px', marginTop: '2px' }">412.008 CFA</div>
          </div>
          <div :style="{ flex: 1 }">
            <div :style="{ color: 'var(--fg-3)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }">Outflows</div>
            <div :style="{ fontWeight: 700, color: 'var(--fg-1)', fontVariantNumeric: 'tabular-nums', fontSize: '16px', marginTop: '2px' }">498.420 CFA</div>
          </div>
        </div>
      </div>
    </div>

    <div class="card-surf">
      <div :style="{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px', borderBottom: '1px solid var(--border-subtle)' }">
        <div>
          <div :style="{ fontSize: '16px', fontWeight: 600, color: 'var(--fg-1)' }">Recent activity</div>
          <div :style="{ fontSize: '12px', color: 'var(--fg-3)', marginTop: '2px' }">Last 24 hours · 5 transactions</div>
        </div>
        <Btn variant="ghost" @click="emit('goToPayouts')"><span :style="{ whiteSpace: 'nowrap' }">View all payouts</span><Icon name="arrow-right" /></Btn>
      </div>
      <table class="tbl">
        <thead><tr>
          <th>Counterparty</th><th>Reference</th><th>Status</th><th>When</th><th :style="{ textAlign: 'right' }">Amount</th>
        </tr></thead>
        <tbody>
          <tr v-for="t in RECENT_TX" :key="t.id" @click="emit('selectTx', t)" :style="{ cursor: 'pointer' }">
            <td><div class="row-name"><Avatar :name="t.name" :tone="t.tone" />{{ t.name }}</div></td>
            <td class="ref">{{ t.ref }}</td>
            <td><TxStatus :status="t.status" /></td>
            <td :style="{ color: 'var(--fg-3)', fontSize: '13px' }">{{ t.when }}</td>
            <td class="num"><Money :amount="t.amount" /></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
