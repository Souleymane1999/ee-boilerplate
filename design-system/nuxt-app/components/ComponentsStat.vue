<script setup>
// Design System · Components — Stat / KPI card preview.
const kpis = [
  { label: 'Volume · 30d',       value: '1.240.000 CFA', delta: '↑ 12.4%',  tone: 'up' },
  { label: 'Successful payouts', value: '3.182',         delta: '↑ 4.1%',   tone: 'up' },
  { label: 'Failure rate',       value: '0.42%',         delta: '↑ 0.08pp', tone: 'down' },
]
</script>

<template>
  <Preview eyebrow="Components" title="Stat / KPI card"
    description="Used on dashboards. Tabular numerals, tight negative tracking, delta in success or danger tone.">
    <div :style="{ background: 'var(--neutral-25)', padding: '18px', borderRadius: '12px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }">
      <div v-for="k in kpis" :key="k.label" :style="{ background: '#fff', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '6px', boxShadow: 'var(--shadow-xs)' }">
        <div class="if-caption" :style="{ color: 'var(--fg-3)' }">{{ k.label }}</div>
        <div class="if-num-tabular" :style="{ fontSize: '26px', fontWeight: 700, color: 'var(--fg-1)', letterSpacing: '-0.018em' }">{{ k.value }}</div>
        <div :style="{ fontSize: '12px', color: k.tone === 'up' ? '#1F6E3A' : '#9F271E', display: 'flex', alignItems: 'center', gap: '4px' }">
          <span :style="{ fontWeight: 700 }">{{ k.delta }}</span>
          <span :style="{ color: 'var(--fg-3)', fontWeight: 400 }">vs prev.</span>
        </div>
      </div>
    </div>
  </Preview>
</template>
