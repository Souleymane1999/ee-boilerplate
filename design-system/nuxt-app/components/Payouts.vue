<script setup>
// Ported from web_app/Payouts.jsx `Payouts` (+ local RowDetail).
import { ref, computed } from 'vue'

const emit = defineEmits(['selectTx'])

const ALL_PAYOUTS = [
  { id: 'p1',  name: 'Northwind Trading', tone:'brand',   ref:'INV-2031', status:'paid',      amount: 48210.00, date:'Nov 11', method:'ACH',  from:'Chase ••4218', to:'Wells Fargo ••9302', initiated:'Nov 11 · 10:02 AM', settled:'Nov 11 · 11:31 AM', memo:'Q4 services — milestone 2 of 4. PO #NW-2026-Q4-114.' },
  { id: 'p2',  name: 'Atlas Corp.',       tone:'warning', ref:'INV-2030', status:'pending',   amount:  1180.55, date:'Nov 11', method:'Wire', from:'Chase ••4218', to:'BofA ••1140',         initiated:'Nov 11 · 08:14 AM', settled:'Expected Nov 12',     memo:'November retainer.' },
  { id: 'p3',  name: 'Helios Studio',     tone:'info',    ref:'INV-2029', status:'scheduled', amount:  6420.00, date:'Nov 14', method:'ACH',  from:'Chase ••4218', to:'Mercury ••2204',       initiated:'Scheduled Nov 14',  settled:'Expected Nov 14',     memo:'Design sprint — November.' },
  { id: 'p4',  name: 'Vega Labs',         tone:'danger',  ref:'INV-2028', status:'failed',    amount:   312.00, date:'Nov 10', method:'ACH',  from:'Chase ••4218', to:'Wells Fargo ••5512',  initiated:'Nov 10 · 09:31 AM', settled:'Returned R03',        memo:'API usage — Oct.' },
  { id: 'p5',  name: 'Meridian Co.',      tone:'brand',   ref:'INV-2027', status:'paid',      amount: 12500.00, date:'Nov 10', method:'Wire', from:'Chase ••4218', to:'Citi ••7711',         initiated:'Nov 10 · 09:02 AM', settled:'Nov 10 · 09:48 AM',   memo:'Equipment lease — Q4.' },
  { id: 'p6',  name: 'Stratus Inc.',      tone:'info',    ref:'INV-2026', status:'scheduled', amount:  4290.00, date:'Nov 13', method:'ACH',  from:'Chase ••4218', to:'Chase ••8804',         initiated:'Scheduled Nov 13',  settled:'Expected Nov 13',     memo:'Cloud services — Oct.' },
  { id: 'p7',  name: 'Polaris Holdings',  tone:'brand',   ref:'INV-2025', status:'paid',      amount: 89400.00, date:'Nov 09', method:'Wire', from:'Chase ••4218', to:'JPM ••0021',           initiated:'Nov 09 · 02:11 PM', settled:'Nov 09 · 03:02 PM',   memo:'Acquisition advisory fee.' },
  { id: 'p8',  name: 'Beacon LLC',        tone:'warning', ref:'INV-2024', status:'pending',   amount:  2120.00, date:'Nov 09', method:'ACH',  from:'Chase ••4218', to:'Mercury ••8821',       initiated:'Nov 09 · 11:08 AM', settled:'Expected Nov 12',     memo:'Marketing partner — Oct.' },
  { id: 'p9',  name: 'Cascade Foods',     tone:'brand',   ref:'INV-2023', status:'paid',      amount: 18750.00, date:'Nov 08', method:'ACH',  from:'Chase ••4218', to:'PNC ••3340',           initiated:'Nov 08 · 09:00 AM', settled:'Nov 08 · 10:18 AM',   memo:'Distribution — week 45.' },
  { id: 'p10', name: 'Lattice Studio',    tone:'neutral', ref:'INV-2022', status:'draft',     amount:   850.00, date:'—',      method:'ACH',  from:'Chase ••4218', to:'Mercury ••0099',       initiated:'Not submitted',     settled:'—',                    memo:'Drafted — pending review.' },
]

const TIMELINE_BY_STATUS = {
  paid:      [1,1,1,1],
  pending:   [1,1,1,0],
  scheduled: [1,1,0,0],
  failed:    [1,1,1,0],
  draft:     [1,0,0,0],
}

const detailSteps = (tx) => ['Created', 'Reviewed', 'Submitted', tx.status === 'paid' ? 'Settled' : (tx.status === 'failed' ? 'Returned' : 'Settling')]
const detailDone = (tx) => TIMELINE_BY_STATUS[tx.status] || [1,0,0,0]

const filter = ref('all')
const selected = ref(new Set())
const expanded = ref(new Set())

const filtered = computed(() => filter.value === 'all' ? ALL_PAYOUTS : ALL_PAYOUTS.filter(p => p.status === filter.value))

const counts = computed(() => ({
  all: ALL_PAYOUTS.length,
  paid: ALL_PAYOUTS.filter(p => p.status === 'paid').length,
  pending: ALL_PAYOUTS.filter(p => p.status === 'pending').length,
  scheduled: ALL_PAYOUTS.filter(p => p.status === 'scheduled').length,
  failed: ALL_PAYOUTS.filter(p => p.status === 'failed').length,
}))

const toggleSelect = (id) => {
  const next = new Set(selected.value)
  if (next.has(id)) next.delete(id); else next.add(id)
  selected.value = next
}

const toggleExpand = (id) => {
  const next = new Set(expanded.value)
  if (next.has(id)) next.delete(id); else next.add(id)
  expanded.value = next
}

const expandAll = () => { expanded.value = new Set(filtered.value.map(f => f.id)) }
const collapseAll = () => { expanded.value = new Set() }

const totalSelected = computed(() => [...selected.value].reduce((sum, id) => {
  const tx = ALL_PAYOUTS.find(t => t.id === id)
  return sum + (tx ? tx.amount : 0)
}, 0))

const onHeadCheck = (e) => {
  selected.value = e.target.checked ? new Set(filtered.value.map(f => f.id)) : new Set()
}
</script>

<template>
  <div class="page">
    <div class="page-header">
      <div>
        <h1 class="page-title">Payouts</h1>
        <div class="page-sub">All outbound transfers from your operating balance.</div>
      </div>
      <div :style="{ display: 'flex', gap: '8px' }">
        <Btn variant="secondary" icon="download">Export CSV</Btn>
        <Btn variant="primary" icon="plus">New payout</Btn>
      </div>
    </div>

    <div class="card-surf">
      <div class="toolbar">
        <div :style="{ display: 'flex', gap: '6px' }">
          <span :class="`chip ${filter === 'all' ? 'active' : ''}`"       @click="filter = 'all'">All <span class="count">{{ counts.all }}</span></span>
          <span :class="`chip ${filter === 'paid' ? 'active' : ''}`"      @click="filter = 'paid'">Paid <span class="count">{{ counts.paid }}</span></span>
          <span :class="`chip ${filter === 'pending' ? 'active' : ''}`"   @click="filter = 'pending'">Pending <span class="count">{{ counts.pending }}</span></span>
          <span :class="`chip ${filter === 'scheduled' ? 'active' : ''}`" @click="filter = 'scheduled'">Scheduled <span class="count">{{ counts.scheduled }}</span></span>
          <span :class="`chip ${filter === 'failed' ? 'active' : ''}`"    @click="filter = 'failed'">Failed <span class="count">{{ counts.failed }}</span></span>
        </div>
        <div class="grow"></div>
        <Btn variant="ghost" :icon="expanded.size === filtered.length ? 'chevrons-down-up' : 'chevrons-up-down'" @click="expanded.size === filtered.length ? collapseAll() : expandAll()">
          {{ expanded.size === filtered.length ? 'Collapse all' : 'Expand all' }}
        </Btn>
        <Btn variant="ghost" icon="filter">Filters</Btn>
        <Btn variant="ghost" icon="arrow-up-down">Sort</Btn>
      </div>

      <div v-if="selected.size > 0" :style="{ display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 20px', background: 'rgba(187,203,68,0.10)', borderBottom: '1px solid var(--border-subtle)', fontSize: '13px' }">
        <span :style="{ color: 'var(--fg-1)', fontWeight: 600 }">{{ selected.size }} selected · <span class="if-num-tabular">{{ fmtCFA(totalSelected) }} CFA</span></span>
        <div :style="{ flex: 1 }"></div>
        <Btn variant="secondary" icon="send">Send now</Btn>
        <Btn variant="ghost" icon="x" @click="selected = new Set()">Clear</Btn>
      </div>

      <div class="dlist">
        <div class="dlist-head">
          <div></div>
          <div><input type="checkbox"
            :checked="selected.size === filtered.length && filtered.length > 0"
            @change="onHeadCheck"
          /></div>
          <div>Counterparty</div><div>Reference</div><div>Method</div><div>Status</div><div>Date</div><div>Amount</div>
        </div>
        <template v-for="t in filtered" :key="t.id">
          <div
            :class="`dlist-row ${selected.has(t.id) ? 'is-selected' : ''} ${expanded.has(t.id) ? 'is-expanded' : ''}`"
            @click="toggleExpand(t.id)"
          >
            <div>
              <button
                :class="`chev-btn ${expanded.has(t.id) ? 'open' : ''}`"
                :aria-expanded="expanded.has(t.id)"
                @click.stop="toggleExpand(t.id)"
              >
                <Icon :name="expanded.has(t.id) ? 'minus' : 'plus'" />
              </button>
            </div>
            <div @click.stop>
              <input type="checkbox" :checked="selected.has(t.id)" @change="toggleSelect(t.id)" />
            </div>
            <div><div class="row-name"><Avatar :name="t.name" :tone="t.tone" /><span>{{ t.name }}</span></div></div>
            <div class="ref">{{ t.ref }}</div>
            <div class="meth">{{ t.method }}</div>
            <div><TxStatus :status="t.status" /></div>
            <div class="date">{{ t.date }}</div>
            <div class="num"><Money :amount="t.amount" /></div>
          </div>
          <div v-if="expanded.has(t.id)" class="dlist-detail">
            <div class="detail-pane">
              <div class="group">
                <div class="group-title">Transfer</div>
                <div class="kv"><span class="k">Reference</span><span class="v mono">{{ t.ref }}</span></div>
                <div class="kv"><span class="k">Method</span><span class="v">{{ t.method }}</span></div>
                <div class="kv"><span class="k">From</span><span class="v">{{ t.from }}</span></div>
                <div class="kv"><span class="k">To</span><span class="v">{{ t.to }}</span></div>
                <div class="kv"><span class="k">Fee</span><span class="v">0 CFA</span></div>
                <div class="kv"><span class="k">Memo</span><span class="v" :style="{ fontWeight: 400, color: 'var(--fg-2)', textAlign: 'right', maxWidth: '180px', fontVariantNumeric: 'normal' }">{{ t.memo }}</span></div>
              </div>
              <div class="group">
                <div class="group-title">Timeline</div>
                <div class="mini-tl">
                  <div v-for="(s, i) in detailSteps(t)" :key="i" :class="`step ${detailDone(t)[i] ? 'done' : ''}`">
                    <div class="dot"><Icon v-if="detailDone(t)[i]" name="check" /></div>
                    <span class="label">{{ s }}</span>
                  </div>
                </div>
                <div :style="{ fontSize: '12px', color: 'var(--fg-3)', marginTop: '6px' }">
                  <div>Initiated · <span :style="{ color: 'var(--fg-1)', fontWeight: 500 }">{{ t.initiated }}</span></div>
                  <div :style="{ marginTop: '2px' }">Settled · <span :style="{ color: t.status === 'failed' ? '#9F271E' : 'var(--fg-1)', fontWeight: 500 }">{{ t.settled }}</span></div>
                </div>
              </div>
              <div class="group">
                <div class="group-title">Actions</div>
                <div class="detail-actions">
                  <Btn variant="primary" icon="arrow-right" @click="emit('selectTx', t)">Full details</Btn>
                  <Btn variant="secondary" icon="download">Receipt</Btn>
                  <Btn v-if="t.status === 'failed'" variant="secondary" icon="rotate-cw">Retry</Btn>
                  <Btn v-if="t.status === 'scheduled'" variant="ghost" icon="x">Cancel</Btn>
                  <Btn variant="ghost" icon="copy">Duplicate</Btn>
                </div>
                <div v-if="t.status === 'failed'" :style="{ marginTop: '10px', padding: '10px', background: '#FBE7E5', border: '1px solid #EFBEB9', borderRadius: '8px', fontSize: '12px', color: '#9F271E', lineHeight: 1.4 }">
                  <strong>R03 · No account / unable to locate.</strong> Verify the recipient account number and retry.
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
      <div :style="{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', fontSize: '12px', color: 'var(--fg-3)' }">
        <span>Showing {{ filtered.length }} of {{ ALL_PAYOUTS.length }}{{ expanded.size > 0 ? ` · ${expanded.size} expanded` : '' }}</span>
        <div :style="{ display: 'flex', gap: '6px' }">
          <button class="icon-btn" disabled :style="{ opacity: 0.4 }"><Icon name="chevron-left" /></button>
          <button class="icon-btn"><Icon name="chevron-right" /></button>
        </div>
      </div>
    </div>
  </div>
</template>
