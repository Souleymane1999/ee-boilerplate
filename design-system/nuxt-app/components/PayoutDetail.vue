<script setup>
// Ported from web_app/PayoutDetail.jsx `PayoutDetail`.
import { computed } from 'vue'

const props = defineProps({
  tx: { type: Object, default: null },
})
const emit = defineEmits(['back'])

const timeline = computed(() => {
  const tx = props.tx
  if (!tx) return []
  return [
    { label: 'Payout created',    sub: 'Nov 11 · 10:02 AM · by Jordan A.',   done: true },
    { label: 'Compliance review', sub: 'Nov 11 · 10:03 AM · auto-approved',   done: true },
    { label: 'Submitted to bank', sub: 'Nov 11 · 10:04 AM · Chase',           done: tx.status !== 'draft' },
    { label: 'Settled',           sub: tx.status === 'paid' ? 'Nov 11 · 11:31 AM' : 'Expected Nov 14', done: tx.status === 'paid' },
  ]
})
</script>

<template>
  <div v-if="tx" class="page">
    <div :style="{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }">
      <button class="btn btn-ghost" @click="emit('back')" :style="{ padding: '6px 10px' }">
        <Icon name="arrow-left" /> Payouts
      </button>
      <span :style="{ color: 'var(--fg-4)' }">/</span>
      <span :style="{ color: 'var(--fg-3)', fontSize: '13px', fontFamily: 'var(--font-mono)' }">{{ tx.ref }}</span>
    </div>

    <div class="page-header" :style="{ alignItems: 'flex-start' }">
      <div :style="{ display: 'flex', alignItems: 'center', gap: '16px' }">
        <Avatar :name="tx.name" :tone="tx.tone" />
        <div>
          <div class="amount-big"><Money :amount="tx.amount" /></div>
          <div :style="{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '8px' }">
            <span :style="{ fontSize: '14px', color: 'var(--fg-2)' }">to <strong :style="{ color: 'var(--fg-1)' }">{{ tx.name }}</strong></span>
            <TxStatus :status="tx.status" />
          </div>
        </div>
      </div>
      <div :style="{ display: 'flex', gap: '8px' }">
        <Btn v-if="tx.status === 'failed'" variant="primary" icon="rotate-cw">Retry payout</Btn>
        <Btn v-if="tx.status === 'scheduled'" variant="secondary" icon="x">Cancel</Btn>
        <Btn variant="secondary" icon="download">Receipt</Btn>
        <Btn variant="ghost" icon="more-horizontal" />
      </div>
    </div>

    <div class="detail-grid">
      <div class="card-surf" :style="{ padding: '20px' }">
        <div :style="{ fontSize: '13px', fontWeight: 600, color: 'var(--fg-1)', marginBottom: '10px' }">Transfer details</div>
        <div class="detail-row"><span class="k">Reference</span><span class="v" :style="{ fontFamily: 'var(--font-mono)' }">{{ tx.ref }}</span></div>
        <div class="detail-row"><span class="k">Method</span><span class="v">{{ tx.method || 'ACH' }}</span></div>
        <div class="detail-row"><span class="k">From</span><span class="v">Operating · Chase ••4218</span></div>
        <div class="detail-row"><span class="k">To</span><span class="v">{{ tx.name }} · Wells Fargo ••9302</span></div>
        <div class="detail-row"><span class="k">Initiated</span><span class="v">Nov 11, 2026 · 10:02 AM</span></div>
        <div class="detail-row"><span class="k">Expected settlement</span><span class="v">{{ tx.status === 'paid' ? 'Nov 11, 11:31 AM (1h 29m)' : 'Nov 14, 2026' }}</span></div>
        <div class="detail-row"><span class="k">Fee</span><span class="v">0 CFA</span></div>
        <div class="detail-row"><span class="k">Total debited</span><span class="v"><Money :amount="tx.amount" /></span></div>

        <div :style="{ fontSize: '13px', fontWeight: 600, color: 'var(--fg-1)', margin: '20px 0 10px' }">Memo</div>
        <div :style="{ background: 'var(--neutral-25)', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '12px', fontSize: '13.5px', color: 'var(--fg-2)', lineHeight: 1.5 }">
          Q4 services contract — milestone 2 of 4. PO #NW-2026-Q4-114.
        </div>

        <div v-if="tx.status === 'failed'" :style="{ marginTop: '16px', padding: '14px', background: '#FBE7E5', border: '1px solid #EFBEB9', borderRadius: '10px', display: 'flex', gap: '12px' }">
          <Icon name="alert-circle" :style="{ color: '#9F271E', width: '18px', height: '18px', flexShrink: 0, marginTop: '1px' }" />
          <div>
            <div :style="{ fontWeight: 600, color: '#9F271E', fontSize: '13px', marginBottom: '4px' }">R03 · No account / unable to locate</div>
            <div :style="{ fontSize: '13px', color: '#9F271E', lineHeight: 1.45 }">The receiving bank could not find the recipient account. Verify the account number with {{ tx.name }} and retry.</div>
          </div>
        </div>
      </div>

      <div :style="{ display: 'flex', flexDirection: 'column', gap: '16px' }">
        <div class="card-surf" :style="{ padding: '20px' }">
          <div :style="{ fontSize: '13px', fontWeight: 600, color: 'var(--fg-1)', marginBottom: '14px' }">Timeline</div>
          <div class="timeline">
            <div v-for="(t, i) in timeline" :key="i" :class="`tl-item ${t.done ? 'done' : ''}`">
              <div :class="`tl-dot ${t.done ? 'done' : ''}`">
                <Icon v-if="t.done" name="check" />
              </div>
              <div v-if="i < timeline.length - 1" class="tl-line"></div>
              <div class="tl-meta">
                <div class="tl-title" :style="{ color: t.done ? 'var(--fg-1)' : 'var(--fg-3)' }">{{ t.label }}</div>
                <div class="tl-sub">{{ t.sub }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="card-surf" :style="{ padding: '20px' }">
          <div :style="{ fontSize: '13px', fontWeight: 600, color: 'var(--fg-1)', marginBottom: '10px' }">Recipient</div>
          <div :style="{ display: 'flex', alignItems: 'center', gap: '12px', padding: '6px 0' }">
            <Avatar :name="tx.name" :tone="tx.tone" />
            <div :style="{ display: 'flex', flexDirection: 'column', gap: '2px' }">
              <span :style="{ fontSize: '13.5px', fontWeight: 600, color: 'var(--fg-1)' }">{{ tx.name }}</span>
              <span :style="{ fontSize: '12px', color: 'var(--fg-3)' }">Vendor · 14 transfers · since Mar 2024</span>
            </div>
          </div>
          <div :style="{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }">
            <Btn variant="ghost" icon="external-link">View recipient</Btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
