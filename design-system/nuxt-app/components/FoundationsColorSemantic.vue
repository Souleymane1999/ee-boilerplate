<script setup>
const tones = [
  { name: 'Success', fg: '#2F8F4F', bg: '#E6F4EA', border: '#BFE0CB', usage: 'paid · settled' },
  { name: 'Warning', fg: '#C2841A', bg: '#FCF3DD', border: '#ECD7A0', usage: 'pending · review' },
  { name: 'Danger',  fg: '#C8362D', bg: '#FBE7E5', border: '#EFBEB9', usage: 'failed · refunded' },
  { name: 'Info',    fg: '#2C6DB5', bg: '#E5EFF9', border: '#BCD3EC', usage: 'scheduled' },
]
</script>

<template>
  <Preview eyebrow="Foundations · Color" title="Semantic — used sparingly"
    description="Lime is the brand, never a status. Status uses these four semantic colors. Each has solid / bg / border tokens.">
    <div :style="{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }">
      <div v-for="t in tones" :key="t.name" :style="{ border: `1px solid ${t.border}`, background: t.bg, borderRadius: '10px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }">
        <div :style="{ display: 'flex', alignItems: 'center', gap: '6px', color: t.fg, fontWeight: 600, fontSize: '13px' }">
          <span :style="{ width: '8px', height: '8px', borderRadius: '50%', background: t.fg }"></span>{{ t.name }}
        </div>
        <div class="pv-token-name">{{ t.fg }} · {{ t.usage }}</div>
      </div>
    </div>
  </Preview>
</template>
