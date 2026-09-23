<script setup>
// Ported from web_app/Recipients.jsx `Recipients`.
import { ref, computed } from 'vue'

const RECIPIENTS = [
  { id: 'r1', name: 'Northwind Trading',  tone: 'brand',   country: 'United States',     currency: 'USD', type: 'Business', accounts: 2, lastPaid: 'Nov 11', volume: 248120.00, status: 'active' },
  { id: 'r2', name: 'Atlas Corp.',         tone: 'warning', country: 'Canada',            currency: 'CAD', type: 'Business', accounts: 1, lastPaid: 'Nov 09', volume:  82400.00, status: 'active' },
  { id: 'r3', name: 'Helios Studio',       tone: 'info',    country: 'United Kingdom',    currency: 'GBP', type: 'Business', accounts: 1, lastPaid: 'Nov 08', volume:  42800.00, status: 'active' },
  { id: 'r4', name: 'Mei Chen',            tone: 'neutral', country: 'Singapore',         currency: 'SGD', type: 'Individual', accounts: 1, lastPaid: 'Nov 06', volume:  14200.00, status: 'active' },
  { id: 'r5', name: 'Vega Labs',           tone: 'danger',  country: 'United States',     currency: 'USD', type: 'Business', accounts: 1, lastPaid: 'Nov 02', volume:   8400.00, status: 'review' },
  { id: 'r6', name: 'Pellican Coffee',     tone: 'success', country: 'Netherlands',       currency: 'EUR', type: 'Business', accounts: 2, lastPaid: 'Oct 28', volume:  32100.00, status: 'active' },
  { id: 'r7', name: 'Quartz Robotics',     tone: 'brand',   country: 'Germany',           currency: 'EUR', type: 'Business', accounts: 1, lastPaid: 'Oct 24', volume:  61400.00, status: 'active' },
  { id: 'r8', name: 'Sora Tanaka',         tone: 'info',    country: 'Japan',             currency: 'JPY', type: 'Individual', accounts: 1, lastPaid: 'Oct 22', volume:   4200.00, status: 'active' },
]

const selected = ref(RECIPIENTS[0].id)
const sel = computed(() => RECIPIENTS.find(r => r.id === selected.value) || RECIPIENTS[0])
const selInitials = computed(() => sel.value.name.split(' ').map(s => s[0]).slice(0, 2).join('').toUpperCase())
</script>

<template>
  <div class="page">
    <div class="page-header">
      <div>
        <h1 class="page-title">Recipients</h1>
        <div class="page-sub">People and businesses you've paid. 8 active · 1 in review.</div>
      </div>
      <div :style="{ display: 'flex', gap: '8px', flexShrink: 0 }">
        <Btn variant="secondary" icon="upload"><span :style="{ whiteSpace: 'nowrap' }">Import CSV</span></Btn>
        <Btn variant="primary" icon="user-plus"><span :style="{ whiteSpace: 'nowrap' }">Add recipient</span></Btn>
      </div>
    </div>

    <div :style="{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '20px' }">
      <div class="card-surf">
        <div class="toolbar">
          <div class="topbar-search" :style="{ flex: 1, maxWidth: '280px' }">
            <Icon name="search" />
            <input placeholder="Search recipients…" />
          </div>
          <div class="grow"></div>
          <Btn variant="secondary" icon="filter"><span :style="{ whiteSpace: 'nowrap' }">Filter</span></Btn>
        </div>
        <table class="tbl">
          <thead><tr>
            <th>Recipient</th><th>Country</th><th>Currency</th><th>Status</th><th :style="{ textAlign: 'right' }">Volume</th>
          </tr></thead>
          <tbody>
            <tr v-for="r in RECIPIENTS" :key="r.id" @click="selected = r.id" :class="selected === r.id ? 'is-selected' : ''" :style="{ cursor: 'pointer' }">
              <td><div class="row-name"><Avatar :name="r.name" :tone="r.tone" /><div :style="{ display: 'flex', flexDirection: 'column' }"><span>{{ r.name }}</span><span :style="{ fontSize: '11px', color: 'var(--fg-3)' }">{{ r.type }} · {{ r.accounts }} {{ r.accounts === 1 ? 'account' : 'accounts' }}</span></div></div></td>
              <td :style="{ color: 'var(--fg-2)', fontSize: '13px' }">{{ r.country }}</td>
              <td class="ref">{{ r.currency }}</td>
              <td>
                <span v-if="r.status === 'active'" class="badge badge-success"><span class="dot" :style="{ background: '#2F8F4F' }"></span>Active</span>
                <span v-else class="badge badge-warning"><span class="dot" :style="{ background: '#C2841A' }"></span>In review</span>
              </td>
              <td class="num"><Money :amount="r.volume" /></td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Recipient detail panel -->
      <div class="card-surf" :style="{ padding: '24px', height: 'fit-content', position: 'sticky', top: '80px' }">
        <div :style="{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }">
          <div :style="{ width: '56px', height: '56px', borderRadius: '50%', background: '#F2F6D6', color: '#5E6A1A', fontWeight: 800, fontSize: '19px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #E4ECAA' }">
            {{ selInitials }}
          </div>
          <div :style="{ flex: 1, minWidth: 0 }">
            <div :style="{ fontSize: '17px', fontWeight: 700, color: 'var(--fg-1)' }">{{ sel.name }}</div>
            <div :style="{ fontSize: '12px', color: 'var(--fg-3)', marginTop: '2px' }">{{ sel.type }} · {{ sel.country }}</div>
          </div>
          <button class="icon-btn"><Icon name="more-horizontal" /></button>
        </div>

        <div :style="{ display: 'flex', gap: '8px', marginBottom: '18px' }">
          <Btn variant="primary" icon="arrow-up-right"><span :style="{ whiteSpace: 'nowrap' }">Send payout</span></Btn>
          <Btn variant="secondary" icon="pencil"><span :style="{ whiteSpace: 'nowrap' }">Edit</span></Btn>
        </div>

        <div :style="{ borderTop: '1px solid var(--border-subtle)', paddingTop: '14px' }">
          <div class="detail-row"><span class="k">Currency</span><span class="v">{{ sel.currency }}</span></div>
          <div class="detail-row"><span class="k">Bank accounts</span><span class="v">{{ sel.accounts }}</span></div>
          <div class="detail-row"><span class="k">Last paid</span><span class="v">{{ sel.lastPaid }}, 2026</span></div>
          <div class="detail-row"><span class="k">Lifetime volume</span><span class="v"><Money :amount="sel.volume * 4.2" /></span></div>
          <div class="detail-row"><span class="k">KYB status</span><span class="v">{{ sel.status === 'active' ? 'Verified' : 'Pending review' }}</span></div>
        </div>

        <div :style="{ marginTop: '18px', padding: '14px', background: 'var(--neutral-25)', border: '1px solid var(--border-subtle)', borderRadius: '10px', display: 'flex', gap: '10px' }">
          <Icon name="shield-check" :style="{ color: '#2F8F4F', flexShrink: 0, marginTop: '2px' }" />
          <div>
            <div :style="{ fontSize: '13px', fontWeight: 600, color: 'var(--fg-1)' }">Verified counterparty</div>
            <div :style="{ fontSize: '12px', color: 'var(--fg-3)', marginTop: '2px', lineHeight: 1.5 }">Bank ownership and identity confirmed. Payouts &lt; 15.000.000 CFA clear without manual review.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
