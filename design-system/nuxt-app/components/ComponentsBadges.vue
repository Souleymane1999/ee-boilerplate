<script setup>
// Design System · Components — Badges & status pills preview.
</script>

<template>
  <Preview eyebrow="Components" title="Badges & status pills"
    description="Six tones (success / warning / danger / info / neutral / brand). Use sparingly: one status per row.">
    <div :style="{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }">
      <span class="pv-badge pv-badge-success"><span class="dot" :style="{ background:'#2F8F4F' }"></span>Paid</span>
      <span class="pv-badge pv-badge-warning"><span class="dot" :style="{ background:'#C2841A' }"></span>Pending</span>
      <span class="pv-badge pv-badge-info"><span class="dot" :style="{ background:'#2C6DB5' }"></span>Scheduled</span>
      <span class="pv-badge pv-badge-danger"><span class="dot" :style="{ background:'#C8362D' }"></span>Failed</span>
      <span class="pv-badge pv-badge-neutral">Draft</span>
      <span class="pv-badge pv-badge-brand">New</span>
    </div>
    <div class="if-eyebrow" :style="{ marginTop: '6px' }">Filter chips</div>
    <div :style="{ display: 'flex', gap: '8px', flexWrap: 'wrap' }">
      <span class="pv-chip pv-chip-active">All <span :style="{ color:'#BBCB44', fontVariantNumeric:'tabular-nums' }">128</span></span>
      <span class="pv-chip">Paid <span class="if-num-tabular" :style="{ color:'var(--fg-3)' }">94</span></span>
      <span class="pv-chip">Pending <span class="if-num-tabular" :style="{ color:'var(--fg-3)' }">22</span></span>
      <span class="pv-chip">Failed <span class="if-num-tabular" :style="{ color:'var(--fg-3)' }">12</span></span>
    </div>
  </Preview>
</template>

<style>
.pv-badge { display:inline-flex; align-items:center; gap:6px; font-size:12px; font-weight:600; padding:3px 10px 3px 8px; border-radius:999px; border:1px solid transparent; line-height:1.4; }
.pv-badge .dot { width:6px; height:6px; border-radius:50%; }
.pv-badge-success { background:#E6F4EA; color:#1F6E3A; border-color:#BFE0CB; }
.pv-badge-warning { background:#FCF3DD; color:#8E5F0F; border-color:#ECD7A0; }
.pv-badge-danger  { background:#FBE7E5; color:#9F271E; border-color:#EFBEB9; }
.pv-badge-info    { background:#E5EFF9; color:#1E4F86; border-color:#BCD3EC; }
.pv-badge-neutral { background:var(--neutral-50); color:var(--fg-2); border-color:var(--border-default); }
.pv-badge-brand   { background:#F2F6D6; color:#5E6A1A; border-color:#E4ECAA; }
.pv-chip { display:inline-flex; align-items:center; gap:6px; font-size:12.5px; padding:5px 10px; background:#fff; border:1px solid var(--border-default); border-radius:999px; color:var(--fg-1); cursor:pointer; }
.pv-chip-active { background:var(--brand-ink); border-color:var(--brand-ink); color:#F4F4F1; }
</style>
