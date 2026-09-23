<script setup>
</script>

<template>
  <Preview eyebrow="Foundations · Type" title="Type scale"
    description="Typeface — Open Sans (Google Fonts CDN), weights 400 / 500 / 600 / 700 / 800. JetBrains Mono for tabular numerals and code. No mixing of display + body families.">
    <div class="if-display-lg" :style="{ color: 'var(--fg-1)' }">Move money fast.</div>
    <div class="if-display" :style="{ color: 'var(--fg-1)' }">Move money fast.</div>
    <h1 class="if-h1">Payment captured — 48.210 CFA</h1>
    <h2 class="if-h2">Invoices due this week</h2>
    <h3 class="if-h3">Settlement scheduled for Friday</h3>
    <h4 class="if-h4">Reconciliation rules</h4>
    <p class="if-body-lg" :style="{ margin: 0 }">Body large — for hero subheads and key explanatory text.</p>
    <p :style="{ margin: 0 }">Body — the default reading size for app content and dense screens.</p>
    <p class="if-body-sm" :style="{ margin: 0 }">Body small — table cells, helper text, secondary content.</p>
    <div class="if-eyebrow">Treasury · Updated 12 min ago</div>
  </Preview>
</template>
