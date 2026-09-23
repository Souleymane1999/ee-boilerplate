<script setup>
// Design System · Components — Buttons preview.
</script>

<template>
  <Preview eyebrow="Components" title="Buttons"
    description="Lime primary for the single most important action per surface. Secondary for safe actions, ghost for cancel/back, danger for destructive.">
    <div :style="{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }">
      <span class="pv-row-label">primary</span>
      <button class="pv-btn pv-btn-primary">Send payout</button>
      <button class="pv-btn pv-btn-primary pv-btn-hover">Hover</button>
      <button class="pv-btn pv-btn-primary pv-btn-focus">Focused</button>
      <button class="pv-btn pv-btn-primary" disabled :style="{ opacity: 0.45, cursor: 'not-allowed' }">Disabled</button>
    </div>
    <div :style="{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }">
      <span class="pv-row-label">variants</span>
      <button class="pv-btn pv-btn-secondary">Export CSV</button>
      <button class="pv-btn pv-btn-ghost">Cancel</button>
      <button class="pv-btn pv-btn-danger">Refund</button>
    </div>
    <div :style="{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }">
      <span class="pv-row-label">sizes</span>
      <button class="pv-btn pv-btn-primary pv-btn-sm">Small</button>
      <button class="pv-btn pv-btn-primary">Default</button>
      <button class="pv-btn pv-btn-primary pv-btn-lg">Large</button>
    </div>
  </Preview>
</template>

<style>
.pv-btn { display:inline-flex; align-items:center; gap:8px; font-family:var(--font-sans); font-size:14px; font-weight:600; line-height:1; padding:10px 16px; border-radius:10px; border:1px solid transparent; cursor:pointer; transition:background 120ms, box-shadow 120ms, transform 120ms; letter-spacing:-0.005em; }
.pv-btn-primary { background:var(--brand-lime); color:var(--brand-ink); border-color:var(--brand-lime-600); box-shadow: 0 1px 0 rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.25); }
.pv-btn-primary:hover { background:var(--brand-lime-600); }
.pv-btn-secondary { background:#fff; color:var(--fg-1); border-color:var(--border-default); box-shadow: var(--shadow-xs); }
.pv-btn-ghost { background:transparent; color:var(--fg-2); }
.pv-btn-danger { background:var(--danger); color:#fff; border-color:#A82C24; }
.pv-btn-sm { padding:7px 12px; font-size:13px; border-radius:8px; }
.pv-btn-lg { padding:13px 20px; font-size:15px; border-radius:12px; }
.pv-btn-hover { background:var(--brand-lime-600) !important; }
.pv-btn-focus { box-shadow: 0 0 0 3px rgba(187,203,68,0.35); }
.pv-row-label { font-family:var(--font-mono); font-size:11px; color:var(--fg-3); width:84px; }
</style>
