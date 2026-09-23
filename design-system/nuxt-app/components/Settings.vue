<script>
// Local sub-components ported from web_app/Settings.jsx (Section, SettingRow, Field, Toggle).
import { defineComponent, h } from 'vue'

const Section = defineComponent({
  name: 'SettingsSection',
  props: {
    title: { type: String, default: '' },
    sub: { type: String, default: '' },
  },
  setup(props, { slots }) {
    return () => h('div', { class: 'card-surf', style: { marginBottom: '20px' } }, [
      h('div', { style: { display: 'flex', alignItems: 'center', padding: '18px 24px', borderBottom: '1px solid var(--border-subtle)' } }, [
        h('div', [
          h('div', { style: { fontSize: '15px', fontWeight: 600, color: 'var(--fg-1)' } }, props.title),
          props.sub ? h('div', { style: { fontSize: '12px', color: 'var(--fg-3)', marginTop: '2px' } }, props.sub) : null,
        ]),
        slots.action ? h('div', { style: { marginLeft: 'auto' } }, slots.action()) : null,
      ]),
      h('div', { style: { padding: '24px' } }, slots.default ? slots.default() : []),
    ])
  },
})

const SettingRow = defineComponent({
  name: 'SettingsRow',
  props: {
    label: { type: String, default: '' },
    hint: { type: String, default: '' },
    divider: { type: Boolean, default: true },
  },
  setup(props, { slots }) {
    return () => h('div', { style: { display: 'grid', gridTemplateColumns: '260px 1fr', gap: '32px', padding: '16px 0', borderBottom: props.divider ? '1px dashed var(--border-subtle)' : 'none', alignItems: 'flex-start' } }, [
      h('div', [
        h('div', { style: { fontSize: '13.5px', fontWeight: 600, color: 'var(--fg-1)' } }, props.label),
        props.hint ? h('div', { style: { fontSize: '12px', color: 'var(--fg-3)', marginTop: '4px', lineHeight: 1.5 } }, props.hint) : null,
      ]),
      h('div', slots.control ? slots.control() : []),
    ])
  },
})

const Field = defineComponent({
  name: 'SettingsField',
  props: {
    value: { type: [String, Number], default: '' },
    prefix: { type: String, default: '' },
    suffix: { type: String, default: '' },
    type: { type: String, default: 'text' },
  },
  setup(props) {
    return () => props.prefix
      ? h('div', { class: 'input-prefix', style: { maxWidth: '360px' } }, [
          h('span', props.prefix),
          h('input', { value: props.value, type: props.type }),
        ])
      : h('input', { class: 'input', value: props.value, type: props.type, style: { width: '100%', maxWidth: '360px' } })
  },
})

const Toggle = defineComponent({
  name: 'SettingsToggle',
  props: {
    on: { type: Boolean, default: false },
  },
  setup(props) {
    return () => h('button', {
      style: {
        width: '38px', height: '22px', borderRadius: '999px', padding: '2px', border: '1px solid ' + (props.on ? 'var(--brand-lime-600)' : 'var(--border-default)'),
        background: props.on ? 'var(--brand-lime)' : 'var(--neutral-100)',
        display: 'flex', alignItems: 'center', cursor: 'pointer', transition: 'all 160ms', justifyContent: props.on ? 'flex-end' : 'flex-start',
      },
    }, [
      h('span', { style: { width: '16px', height: '16px', borderRadius: '50%', background: '#fff', boxShadow: '0 1px 2px rgba(0,0,0,0.15)' } }),
    ])
  },
})

export default {
  components: { Section, SettingRow, Field, Toggle },
}
</script>

<script setup>
// Ported from web_app/Settings.jsx `Settings`.
import { ref } from 'vue'

const tab = ref('workspace')

const tabs = [
  { key: 'workspace', label: 'Workspace', icon: 'building-2' },
  { key: 'business',  label: 'Business',  icon: 'briefcase' },
  { key: 'notify',    label: 'Notifications', icon: 'bell' },
  { key: 'security',  label: 'Security',  icon: 'shield' },
  { key: 'billing',   label: 'Billing',   icon: 'credit-card' },
]

const SESSIONS = [
  { device: 'MacBook Pro · Chrome', loc: 'Brooklyn, NY · Current', current: true },
  { device: 'iPhone 15 · iFutur app', loc: 'Brooklyn, NY · 2h ago' },
  { device: 'Windows · Edge', loc: 'Newark, NJ · 3 days ago' },
]
</script>

<template>
  <div class="page">
    <div class="page-header" :style="{ marginBottom: '8px' }">
      <div>
        <h1 class="page-title">Settings</h1>
        <div class="page-sub">Workspace preferences, business profile, security and billing.</div>
      </div>
    </div>

    <!-- Tabs -->
    <div :style="{ display: 'flex', gap: '4px', borderBottom: '1px solid var(--border-subtle)', marginBottom: '24px' }">
      <button v-for="t in tabs" :key="t.key" @click="tab = t.key" :style="{
        display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'transparent', border: 0, cursor: 'pointer',
        padding: '12px 14px', fontFamily: 'inherit', fontSize: '13.5px', fontWeight: 600,
        color: tab === t.key ? 'var(--fg-1)' : 'var(--fg-3)',
        borderBottom: tab === t.key ? '2px solid var(--brand-lime)' : '2px solid transparent',
        marginBottom: '-1px'
      }">
        <Icon :name="t.icon" :style="{ width: '15px', height: '15px' }" />{{ t.label }}
      </button>
    </div>

    <template v-if="tab === 'workspace'">
      <Section title="Workspace" sub="How your workspace appears across iFutur.">
        <template #action><Btn variant="primary"><span :style="{ whiteSpace: 'nowrap' }">Save changes</span></Btn></template>
        <SettingRow label="Workspace name" hint="Shown in the sidebar and on receipts.">
          <template #control><Field value="Northwind Trading" /></template>
        </SettingRow>
        <SettingRow label="Workspace logo" hint="PNG or SVG, max 2MB. Displayed on customer invoices.">
          <template #control>
            <div :style="{ display: 'flex', alignItems: 'center', gap: '14px' }">
              <div :style="{ width: '56px', height: '56px', borderRadius: '10px', background: 'var(--brand-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-lime)', fontWeight: 800, fontSize: '22px' }">N</div>
              <Btn variant="secondary" icon="upload"><span :style="{ whiteSpace: 'nowrap' }">Upload</span></Btn>
              <Btn variant="ghost"><span :style="{ whiteSpace: 'nowrap', color: '#9F271E' }">Remove</span></Btn>
            </div>
          </template>
        </SettingRow>
        <SettingRow label="Default currency" hint="New payouts and invoices default to this currency.">
          <template #control>
            <select class="input" value="XOF" :style="{ maxWidth: '240px' }">
              <option value="XOF">XOF — Franc CFA (BCEAO)</option><option value="XAF">XAF — Franc CFA (BEAC)</option><option value="EUR">EUR — Euro</option><option value="USD">USD — US Dollar</option>
            </select>
          </template>
        </SettingRow>
        <SettingRow label="Timezone" hint="Used for activity timestamps and scheduled transfers." :divider="false">
          <template #control>
            <select class="input" value="ET" :style="{ maxWidth: '280px' }">
              <option>(GMT−05:00) Eastern Time — New York</option><option>(GMT−08:00) Pacific Time — Los Angeles</option><option>(GMT+00:00) UTC</option>
            </select>
          </template>
        </SettingRow>
      </Section>

      <Section title="Danger zone" sub="Irreversible actions.">
        <div :style="{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0' }">
          <div>
            <div :style="{ fontSize: '13.5px', fontWeight: 600, color: 'var(--fg-1)' }">Close workspace</div>
            <div :style="{ fontSize: '12px', color: 'var(--fg-3)', marginTop: '4px' }">Permanently close Northwind Trading. Balances must be 0 CFA and all payouts settled.</div>
          </div>
          <Btn variant="secondary" :style="{ color: '#9F271E', borderColor: '#EFBEB9' }"><span :style="{ whiteSpace: 'nowrap' }">Close workspace</span></Btn>
        </div>
      </Section>
    </template>

    <Section v-if="tab === 'business'" title="Business profile" sub="Used for KYB, compliance, and invoices.">
      <SettingRow label="Legal entity" hint="As registered with your local authority.">
        <template #control><Field value="Northwind Trading Co., LLC" /></template>
      </SettingRow>
      <SettingRow label="Tax ID (EIN)">
        <template #control><Field value="83-2810490" /></template>
      </SettingRow>
      <SettingRow label="Industry">
        <template #control><select class="input" value="Retail" :style="{ maxWidth: '280px' }"><option>Retail</option><option>Software / SaaS</option><option>Logistics</option><option>Professional services</option></select></template>
      </SettingRow>
      <SettingRow label="Registered address" hint="Must match what's on your bank statements." :divider="false">
        <template #control>
          <div :style="{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '360px' }">
            <input class="input" value="1224 Linden Ave, Suite 400" />
            <div :style="{ display: 'flex', gap: '10px' }">
              <input class="input" value="Brooklyn" :style="{ flex: 2 }" />
              <input class="input" value="NY 11215" :style="{ flex: 1 }" />
            </div>
          </div>
        </template>
      </SettingRow>
    </Section>

    <Section v-if="tab === 'notify'" title="Notifications" sub="Choose what reaches your inbox.">
      <SettingRow label="Payout sent" hint="When a payout is initiated from your workspace.">
        <template #control><Toggle on /></template>
      </SettingRow>
      <SettingRow label="Payout settled" hint="When funds land in the recipient's account.">
        <template #control><Toggle on /></template>
      </SettingRow>
      <SettingRow label="Payout failed" hint="When a transfer can't be completed and requires action.">
        <template #control><Toggle on /></template>
      </SettingRow>
      <SettingRow label="Invoice paid" hint="When a customer pays an invoice.">
        <template #control><Toggle on /></template>
      </SettingRow>
      <SettingRow label="Low balance" hint="When your available balance drops below 25.000 CFA." :divider="false">
        <template #control><Toggle /></template>
      </SettingRow>
    </Section>

    <template v-if="tab === 'security'">
      <Section title="Authentication" sub="Protect your iFutur account.">
        <SettingRow label="Two-factor authentication" hint="Required for all owners and admins.">
          <template #control><span class="badge badge-success"><span class="dot" :style="{ background: '#2F8F4F' }"></span>Enabled · Authenticator app</span></template>
        </SettingRow>
        <SettingRow label="Passkeys" hint="Sign in with Face ID, Touch ID, or a security key.">
          <template #control><Btn variant="secondary"><span :style="{ whiteSpace: 'nowrap' }">Add passkey</span></Btn></template>
        </SettingRow>
        <SettingRow label="Session timeout" hint="Automatically sign out after inactivity." :divider="false">
          <template #control><select class="input" value="30 min" :style="{ maxWidth: '200px' }"><option>15 min</option><option>30 min</option><option>1 hour</option><option>4 hours</option></select></template>
        </SettingRow>
      </Section>
      <Section title="Active sessions" sub="Devices currently signed in.">
        <div v-for="(s, i) in SESSIONS" :key="i" :style="{ display: 'flex', alignItems: 'center', padding: '12px 0', borderBottom: i === SESSIONS.length - 1 ? 'none' : '1px dashed var(--border-subtle)' }">
          <Icon :name="s.device.includes('iPhone') ? 'smartphone' : 'monitor'" :style="{ width: '18px', height: '18px', color: 'var(--fg-3)', marginRight: '14px' }" />
          <div :style="{ flex: 1 }">
            <div :style="{ fontSize: '13.5px', color: 'var(--fg-1)', fontWeight: 600 }">{{ s.device }}</div>
            <div :style="{ fontSize: '12px', color: 'var(--fg-3)' }">{{ s.loc }}</div>
          </div>
          <span v-if="s.current" class="badge badge-brand">This device</span>
          <Btn v-else variant="ghost"><span :style="{ whiteSpace: 'nowrap', color: '#9F271E' }">Revoke</span></Btn>
        </div>
      </Section>
    </template>

    <Section v-if="tab === 'billing'" title="Plan & billing" sub="Manage your iFutur subscription.">
      <div :style="{ padding: '20px', background: 'var(--brand-ink)', color: '#F4F4F1', borderRadius: '12px', marginBottom: '20px' }">
        <div :style="{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }">
          <div>
            <div :style="{ fontSize: '11px', color: 'var(--brand-lime)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600 }">Current plan</div>
            <div :style="{ fontSize: '24px', fontWeight: 700, marginTop: '6px' }">Business</div>
            <div :style="{ fontSize: '13px', color: '#C5C5BC', marginTop: '4px' }">89.400 CFA / month · renews Jan 12, 2027</div>
          </div>
          <Btn variant="secondary" :style="{ background: 'transparent', color: 'var(--brand-lime)', borderColor: 'rgba(187,203,68,0.4)' }"><span :style="{ whiteSpace: 'nowrap' }">Upgrade plan</span></Btn>
        </div>
      </div>
      <SettingRow label="Payment method" hint="Used for subscription and fee invoices.">
        <template #control><div :style="{ display: 'flex', alignItems: 'center', gap: '12px' }"><div :style="{ width: '36px', height: '24px', borderRadius: '4px', background: 'linear-gradient(135deg,#1A1F71,#2C6DB5)' }"></div><span :style="{ fontFamily: 'var(--font-mono)', fontSize: '13px' }">VISA •••• 4421</span><Btn variant="ghost"><span :style="{ whiteSpace: 'nowrap' }">Update</span></Btn></div></template>
      </SettingRow>
      <SettingRow label="Billing email">
        <template #control><Field value="finance@northwind.co" /></template>
      </SettingRow>
      <SettingRow label="Tax / VAT ID" hint="Added to invoices for jurisdictions that require it." :divider="false">
        <template #control><Field value="—" /></template>
      </SettingRow>
    </Section>
  </div>
</template>
