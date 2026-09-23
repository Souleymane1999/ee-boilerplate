<script setup>
// Design System · Components — Form inputs preview.
</script>

<template>
  <Preview eyebrow="Components" title="Form inputs"
    description="10px radius, hairline borders, inset shadow for Stripe-like depth, lime focus ring at 35% alpha.">
    <div :style="{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px' }">
      <div class="pv-field">
        <label class="pv-label">Business name</label>
        <input class="pv-input" value="Northwind Trading Co." />
        <div class="pv-help">Shown to recipients on transfers.</div>
      </div>
      <div class="pv-field">
        <label class="pv-label">Email</label>
        <input class="pv-input is-error" value="ops@northwind" />
        <div class="pv-help err">Enter a valid email address.</div>
      </div>
      <div class="pv-field">
        <label class="pv-label">Amount</label>
        <div class="pv-input-prefix"><span>CFA</span><input value="48.210" /></div>
      </div>
      <div class="pv-field">
        <label class="pv-label">Reference (optional)</label>
        <input class="pv-input" placeholder="INV-2031" />
      </div>
    </div>
  </Preview>
</template>

<style>
.pv-field { display:flex; flex-direction:column; gap:6px; }
.pv-label { font-size:13px; font-weight:600; color:var(--fg-1); }
.pv-input { font-family:var(--font-sans); font-size:14px; color:var(--fg-1); padding:10px 12px; border:1px solid var(--border-default); border-radius:10px; background:#fff; box-shadow: inset 0 1px 2px rgba(14,17,16,0.04); transition: border-color 120ms, box-shadow 120ms; }
.pv-input:focus { outline:none; border-color:var(--brand-lime-600); box-shadow: inset 0 1px 2px rgba(14,17,16,0.04), 0 0 0 3px rgba(187,203,68,0.32); }
.pv-input.is-error { border-color:#C8362D; box-shadow: 0 0 0 3px rgba(200,54,45,0.18); }
.pv-help { font-size:12px; color:var(--fg-3); }
.pv-help.err { color:#C8362D; }
.pv-input-prefix { display:flex; align-items:center; border:1px solid var(--border-default); border-radius:10px; background:#fff; overflow:hidden; box-shadow: inset 0 1px 2px rgba(14,17,16,0.04); }
.pv-input-prefix > span { padding:0 10px; color:var(--fg-3); border-right:1px solid var(--border-default); background:var(--neutral-25); height:38px; display:flex; align-items:center; font-variant-numeric: tabular-nums; font-family:var(--font-mono); font-size:13px; }
.pv-input-prefix > input { border:0; padding:10px 12px; flex:1; font-family:var(--font-sans); font-size:14px; outline:none; background:transparent; font-variant-numeric:tabular-nums; min-width:0; }
</style>
