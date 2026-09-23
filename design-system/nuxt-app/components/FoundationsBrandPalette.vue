<script setup>
</script>

<template>
  <Preview eyebrow="Foundations · Color" title="Brand palette at a glance"
    description="Lime > Ink > Bone — the trio that defines every iFutur surface. Semantic colors are accents only.">
    <div :style="{ display: 'flex', height: '140px', borderRadius: '14px', overflow: 'hidden', border: '1px solid var(--border-subtle)' }">
      <div :style="{ flex: 2.2, background: '#BBCB44', display: 'flex', alignItems: 'flex-end', padding: '12px', color: '#0E1110', fontWeight: 700, fontSize: '13px', fontFamily: 'var(--font-mono)' }">#BBCB44</div>
      <div :style="{ flex: 1,   background: '#0E1110', display: 'flex', alignItems: 'flex-end', padding: '12px', color: '#BBCB44', fontWeight: 700, fontSize: '13px', fontFamily: 'var(--font-mono)' }">#0E1110</div>
      <div :style="{ flex: 1,   background: '#F4F4F1', display: 'flex', alignItems: 'flex-end', padding: '12px', color: '#36362F', fontWeight: 700, fontSize: '13px', fontFamily: 'var(--font-mono)' }">#F4F4F1</div>
      <div :style="{ flex: 0.6, background: '#6F6F66', display: 'flex', alignItems: 'flex-end', padding: '12px', color: '#fff', fontWeight: 700, fontSize: '11px', fontFamily: 'var(--font-mono)' }">#6F6F66</div>
      <div :style="{ flex: 0.4, background: '#2F8F4F' }"></div>
      <div :style="{ flex: 0.4, background: '#C2841A' }"></div>
      <div :style="{ flex: 0.4, background: '#C8362D' }"></div>
    </div>
  </Preview>
</template>
