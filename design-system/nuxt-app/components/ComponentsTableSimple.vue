<script setup>
// Design System · Components · Tables — simple table preview.
const rows = [
  { initials: 'NT', name: 'Northwind Trading', initialsBg: '#F2F6D6', initialsFg: '#5E6A1A', ref: 'INV-2031', status: 'Paid',    dot: '#2F8F4F', bg: '#E6F4EA', border: '#BFE0CB', fg: '#1F6E3A', amount: '48.210 CFA' },
  { initials: 'AC', name: 'Atlas Corp.',       initialsBg: '#FCF3DD', initialsFg: '#8E5F0F', ref: 'INV-2030', status: 'Pending', dot: '#C2841A', bg: '#FCF3DD', border: '#ECD7A0', fg: '#8E5F0F', amount: '1.180 CFA', shaded: true },
  { initials: 'VG', name: 'Vega Labs',         initialsBg: '#FBE7E5', initialsFg: '#9F271E', ref: 'INV-2028', status: 'Failed',  dot: '#C8362D', bg: '#FBE7E5', border: '#EFBEB9', fg: '#9F271E', amount: '312 CFA' },
]
</script>

<template>
  <Preview eyebrow="Components · Tables" title="Table — simple"
    description="The basic transactions row. Used in dashboards, summaries, and dense ledgers.">
    <div :style="{ border: '1px solid var(--border-subtle)', borderRadius: '12px', overflow: 'hidden' }">
      <div :style="{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 0.9fr 0.9fr 60px', padding: '10px 20px', background: 'var(--neutral-25)', color: 'var(--fg-3)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }">
        <div>Counterparty</div><div>Reference</div><div>Status</div><div :style="{ textAlign: 'right' }">Amount</div><div></div>
      </div>
      <div v-for="(r, i) in rows" :key="i" :style="{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 0.9fr 0.9fr 60px', padding: '14px 20px', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', fontSize: '14px', color: 'var(--fg-1)', background: r.shaded ? 'var(--neutral-25)' : 'transparent' }">
        <div :style="{ display: 'flex', alignItems: 'center', gap: '10px' }">
          <div :style="{ width: '28px', height: '28px', borderRadius: '50%', background: r.initialsBg, color: r.initialsFg, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px' }">{{ r.initials }}</div>
          <span>{{ r.name }}</span>
        </div>
        <div class="if-mono" :style="{ color: 'var(--fg-3)', fontSize: '12.5px' }">{{ r.ref }}</div>
        <div>
          <span :style="{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, padding: '2px 10px', borderRadius: '999px', background: r.bg, color: r.fg, border: `1px solid ${r.border}` }">
            <span :style="{ width: '6px', height: '6px', borderRadius: '50%', background: r.dot }"></span>{{ r.status }}
          </span>
        </div>
        <div class="if-num-tabular" :style="{ textAlign: 'right', fontWeight: 600 }">{{ r.amount }}</div>
        <div :style="{ textAlign: 'right', color: 'var(--fg-4)' }">⋯</div>
      </div>
    </div>
  </Preview>
</template>
