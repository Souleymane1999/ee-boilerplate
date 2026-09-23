<script setup>
// Ported from web_app/components.jsx `TxStatus`.
import { computed } from 'vue'

const props = defineProps({
  status: { type: String, default: 'draft' },
})

const map = {
  paid: { tone: 'success', dot: '#2F8F4F', label: 'Paid' },
  pending: { tone: 'warning', dot: '#C2841A', label: 'Pending' },
  scheduled: { tone: 'info', dot: '#2C6DB5', label: 'Scheduled' },
  failed: { tone: 'danger', dot: '#C8362D', label: 'Failed' },
  draft: { tone: 'neutral', dot: null, label: 'Draft' },
}
const m = computed(() => map[props.status] || map.draft)
</script>

<template>
  <Badge :tone="m.tone" :dot="m.dot || ''">{{ m.label }}</Badge>
</template>
