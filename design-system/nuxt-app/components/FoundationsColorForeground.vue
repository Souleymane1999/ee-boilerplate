<script setup>
const rows = [
  { token: 'fg-1', label: 'headlines, primary value', hex: '#131310', size: 22, weight: 600 },
  { token: 'fg-2', label: 'body, table cells',         hex: '#36362F', size: 17 },
  { token: 'fg-3', label: 'secondary text, captions',  hex: '#6F6F66', size: 15 },
  { token: 'fg-4', label: 'placeholder, disabled, muted icons', hex: '#9A9A90', size: 15 },
]
</script>

<template>
  <Preview eyebrow="Foundations · Color" title="Foreground hierarchy">
    <div :style="{ display: 'flex', flexDirection: 'column', gap: '10px' }">
      <div v-for="r in rows" :key="r.token" :style="{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }">
        <span :style="{ color: `var(--${r.token})`, fontSize: r.size + 'px', fontWeight: r.weight }">
          {{ r.token }} — {{ r.label }}
        </span>
        <span class="pv-token-name">{{ r.hex }}</span>
      </div>
    </div>
  </Preview>
</template>
