<script setup>
</script>

<template>
  <Preview eyebrow="Foundations · Type" title="Tabular numerals — for tables & ledgers"
    description="Every amount, count, date, and ID in product surfaces uses tabular numerals so columns align. CFA · '.' separator · no decimals.">
    <div :style="{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'start' }">
      <div>
        <div class="pv-token-name" :style="{ marginBottom: '6px' }">tabular-nums (default in tables)</div>
        <div :style="{ fontVariantNumeric: 'tabular-nums lining-nums', fontSize: '22px', fontWeight: 600, color: 'var(--fg-1)', fontFeatureSettings: `'tnum' 1,'lnum' 1` }">
          <div>     48.210 CFA</div>
          <div>      1.180 CFA</div>
          <div>    312.008 CFA</div>
        </div>
      </div>
      <div>
        <div class="pv-token-name" :style="{ marginBottom: '6px' }">proportional (default in prose)</div>
        <div :style="{ fontVariantNumeric: 'proportional-nums lining-nums', fontSize: '22px', fontWeight: 600, color: 'var(--fg-1)' }">
          <div>48.210 CFA</div>
          <div>1.180 CFA</div>
          <div>312.008 CFA</div>
        </div>
      </div>
    </div>
  </Preview>
</template>
