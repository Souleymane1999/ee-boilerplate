<script setup>
// Ported from web_app/components.jsx `Kpi`.
defineProps({
  label: { type: String, required: true },
  value: { type: String, required: true },
  deltaPct: { type: String, default: '' },
  direction: { type: String, default: 'up' },
})
</script>

<template>
  <div class="kpi">
    <div class="kpi-label">{{ label }}</div>
    <div class="kpi-value">{{ value }}</div>
    <div :class="`kpi-delta ${direction}`" style="white-space: nowrap">
      <span>{{ deltaPct }}</span>
      <span class="sub">vs. prev. 30d</span>
    </div>
  </div>
</template>
