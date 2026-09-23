<script setup>
// Design System · Components · Tables — advanced Payouts table preview.
// Reuses Avatar / Btn / Badge / TxStatus / Money / Icon (auto-imported).
import { ref, computed } from 'vue'

const PV_PAYOUTS = [
  { id: 'p1', name: 'Northwind Trading', tone:'brand',   ref:'INV-2031', status:'paid',      amount: 48210.00, date:'Nov 11', method:'ACH',  from:'Chase ••4218', to:'Wells Fargo ••9302', initiated:'Nov 11 · 10:02 AM', settled:'Nov 11 · 11:31 AM', memo:'Q4 services — milestone 2 of 4.' },
  { id: 'p2', name: 'Atlas Corp.',       tone:'warning', ref:'INV-2030', status:'pending',   amount:  1180.55, date:'Nov 11', method:'Wire', from:'Chase ••4218', to:'BofA ••1140',         initiated:'Nov 11 · 08:14 AM', settled:'Expected Nov 12',     memo:'November retainer.' },
  { id: 'p3', name: 'Helios Studio',     tone:'info',    ref:'INV-2029', status:'scheduled', amount:  6420.00, date:'Nov 14', method:'ACH',  from:'Chase ••4218', to:'Mercury ••2204',       initiated:'Scheduled Nov 14',  settled:'Expected Nov 14',     memo:'Design sprint — November.' },
  { id: 'p4', name: 'Vega Labs',         tone:'danger',  ref:'INV-2028', status:'failed',    amount:   312.00, date:'Nov 10', method:'ACH',  from:'Chase ••4218', to:'Wells Fargo ••5512',  initiated:'Nov 10 · 09:31 AM', settled:'Returned R03',        memo:'API usage — Oct.' },
  { id: 'p5', name: 'Meridian Co.',      tone:'brand',   ref:'INV-2027', status:'paid',      amount: 12500.00, date:'Nov 10', method:'Wire', from:'Chase ••4218', to:'Citi ••7711',         initiated:'Nov 10 · 09:02 AM', settled:'Nov 10 · 09:48 AM',   memo:'Equipment lease — Q4.' },
  { id: 'p6', name: 'Stratus Inc.',      tone:'info',    ref:'INV-2026', status:'scheduled', amount:  4290.00, date:'Nov 13', method:'ACH',  from:'Chase ••4218', to:'Chase ••8804',         initiated:'Scheduled Nov 13',  settled:'Expected Nov 13',     memo:'Cloud services — Oct.' },
]
const PV_TIMELINE = { paid: [1,1,1,1], pending: [1,1,1,0], scheduled: [1,1,0,0], failed: [1,1,1,0], draft: [1,0,0,0] }
const pvFmt = (n) => Math.round(Math.abs(n)).toLocaleString('en-US').replace(/,/g, '.')

const detailSteps = (tx) => ['Created', 'Reviewed', 'Submitted', tx.status === 'paid' ? 'Settled' : (tx.status === 'failed' ? 'Returned' : 'Settling')]
const detailDone = (tx) => PV_TIMELINE[tx.status] || [1,0,0,0]

const filter = ref('all')
const selected = ref(new Set())
const expanded = ref(new Set(['p1']))

const filtered = computed(() => filter.value === 'all' ? PV_PAYOUTS : PV_PAYOUTS.filter(p => p.status === filter.value))
const counts = computed(() => ({
  all: PV_PAYOUTS.length,
  paid: PV_PAYOUTS.filter(p => p.status === 'paid').length,
  pending: PV_PAYOUTS.filter(p => p.status === 'pending').length,
  scheduled: PV_PAYOUTS.filter(p => p.status === 'scheduled').length,
  failed: PV_PAYOUTS.filter(p => p.status === 'failed').length,
}))

const filterKeys = ['all','paid','pending','scheduled','failed']

const toggleSelect = (id) => { const n = new Set(selected.value); n.has(id) ? n.delete(id) : n.add(id); selected.value = n }
const toggleExpand = (id) => { const n = new Set(expanded.value); n.has(id) ? n.delete(id) : n.add(id); expanded.value = n }
const totalSelected = computed(() => [...selected.value].reduce((s, id) => s + (PV_PAYOUTS.find(t => t.id === id)?.amount || 0), 0))

const cap = (k) => k[0].toUpperCase() + k.slice(1)

const toggleExpandAll = () => {
  expanded.value.size === filtered.value.length
    ? (expanded.value = new Set())
    : (expanded.value = new Set(filtered.value.map(f => f.id)))
}
const onHeadCheck = (e) => {
  selected.value = e.target.checked ? new Set(filtered.value.map(f => f.id)) : new Set()
}
</script>

<template>
  <Preview eyebrow="Components · Tables" title="Table — advanced (Payouts)"
    description="Expandable rows with inline detail pane (Transfer / Timeline / Actions), bulk-select toolbar, status filter chips, and a footer with pagination.">
    <div class="card-surf" :style="{ overflow: 'hidden' }">
      <div class="toolbar">
        <div :style="{ display: 'flex', gap: '6px', flexWrap: 'wrap' }">
          <span v-for="k in filterKeys" :key="k" :class="`chip ${filter === k ? 'active' : ''}`" @click="filter = k">
            {{ cap(k) }} <span class="count">{{ counts[k] }}</span>
          </span>
        </div>
        <div class="grow"></div>
        <Btn variant="ghost" :icon="expanded.size === filtered.length ? 'chevrons-down-up' : 'chevrons-up-down'"
          @click="toggleExpandAll">
          {{ expanded.size === filtered.length ? 'Collapse all' : 'Expand all' }}
        </Btn>
        <Btn variant="ghost" icon="filter">Filters</Btn>
        <Btn variant="ghost" icon="arrow-up-down">Sort</Btn>
      </div>

      <div v-if="selected.size > 0" :style="{ display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 20px', background: 'rgba(187,203,68,0.10)', borderBottom: '1px solid var(--border-subtle)', fontSize: '13px' }">
        <span :style="{ color: 'var(--fg-1)', fontWeight: 600 }">{{ selected.size }} selected · <span class="if-num-tabular">{{ pvFmt(totalSelected) }} CFA</span></span>
        <div :style="{ flex: 1 }"></div>
        <Btn variant="secondary" icon="send">Send now</Btn>
        <Btn variant="ghost" icon="x" @click="selected = new Set()">Clear</Btn>
      </div>

      <div class="dlist">
        <div class="dlist-head">
          <div></div>
          <div><input type="checkbox" :checked="selected.size === filtered.length && filtered.length > 0"
            @change="onHeadCheck" /></div>
          <div>Counterparty</div><div>Reference</div><div>Method</div><div>Status</div><div>Date</div><div>Amount</div>
        </div>
        <template v-for="t in filtered" :key="t.id">
          <div :class="`dlist-row ${selected.has(t.id) ? 'is-selected' : ''} ${expanded.has(t.id) ? 'is-expanded' : ''}`" @click="toggleExpand(t.id)">
            <div>
              <button :class="`chev-btn ${expanded.has(t.id) ? 'open' : ''}`" :aria-expanded="expanded.has(t.id)" @click.stop="toggleExpand(t.id)">
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
                <div class="kv"><span class="k">Memo</span><span class="v" :style="{ fontWeight: 400, color:'var(--fg-2)', textAlign:'right', maxWidth: '180px', fontVariantNumeric:'normal' }">{{ t.memo }}</span></div>
              </div>
              <div class="group">
                <div class="group-title">Timeline</div>
                <div class="mini-tl">
                  <div v-for="(s, i) in detailSteps(t)" :key="i" :class="`step ${detailDone(t)[i] ? 'done' : ''}`">
                    <div class="dot"><Icon v-if="detailDone(t)[i]" name="check" /></div>
                    <span class="label">{{ s }}</span>
                  </div>
                </div>
                <div :style="{ fontSize: '12px', color:'var(--fg-3)', marginTop: '6px' }">
                  <div>Initiated · <span :style="{ color:'var(--fg-1)', fontWeight: 500 }">{{ t.initiated }}</span></div>
                  <div :style="{ marginTop: '2px' }">Settled · <span :style="{ color: t.status === 'failed' ? '#9F271E' : 'var(--fg-1)', fontWeight: 500 }">{{ t.settled }}</span></div>
                </div>
              </div>
              <div class="group">
                <div class="group-title">Actions</div>
                <div class="detail-actions">
                  <Btn variant="primary" icon="arrow-right">Full details</Btn>
                  <Btn variant="secondary" icon="download">Receipt</Btn>
                  <Btn v-if="t.status === 'failed'" variant="secondary" icon="rotate-cw">Retry</Btn>
                  <Btn v-if="t.status === 'scheduled'" variant="ghost" icon="x">Cancel</Btn>
                  <Btn variant="ghost" icon="copy">Duplicate</Btn>
                </div>
                <div v-if="t.status === 'failed'" :style="{ marginTop: '10px', padding: '10px', background:'#FBE7E5', border:'1px solid #EFBEB9', borderRadius: '8px', fontSize: '12px', color:'#9F271E', lineHeight: 1.4 }">
                  <strong>R03 · No account / unable to locate.</strong> Verify the recipient account number and retry.
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>

      <div :style="{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', fontSize: '12px', color: 'var(--fg-3)', borderTop: '1px solid var(--border-subtle)' }">
        <span>Showing {{ filtered.length }} of {{ PV_PAYOUTS.length }}{{ expanded.size > 0 ? ` · ${expanded.size} expanded` : '' }}{{ selected.size > 0 ? ` · ${selected.size} selected` : '' }}</span>
        <div :style="{ display: 'flex', gap: '6px' }">
          <button class="icon-btn" disabled :style="{ opacity: 0.4 }"><Icon name="chevron-left" /></button>
          <button class="icon-btn"><Icon name="chevron-right" /></button>
        </div>
      </div>
    </div>
  </Preview>
</template>
