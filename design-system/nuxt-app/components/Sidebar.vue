<script setup>
// Ported from web_app/components.jsx `Sidebar`.
const props = defineProps({
  current: { type: String, default: 'dashboard' },
})
const emit = defineEmits(['nav'])

const items = [
  { key: 'dashboard', icon: 'home', label: 'Dashboard' },
  { key: 'payouts', icon: 'arrow-up-right', label: 'Payouts', badge: '3' },
  { key: 'collections', icon: 'arrow-down-left', label: 'Collections' },
  { key: 'recipients', icon: 'users', label: 'Recipients' },
  { key: 'balances', icon: 'wallet', label: 'Balances' },
]
const settings = [
  { key: 'team', icon: 'user-cog', label: 'Team' },
  { key: 'settings', icon: 'settings', label: 'Settings' },
  { key: 'developers', icon: 'code-2', label: 'Developers' },
]
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar-logo">
      <AppLogo name="on-light" alt="iFutur" />
    </div>
    <div class="sidebar-group">Money</div>
    <div
      v-for="it in items"
      :key="it.key"
      :class="`nav-item ${current === it.key ? 'active' : ''}`"
      @click="emit('nav', it.key)"
    >
      <Icon :name="it.icon" />
      <span>{{ it.label }}</span>
      <span v-if="it.badge" class="badge-dot">{{ it.badge }}</span>
    </div>
    <div class="sidebar-group">Workspace</div>
    <div
      v-for="it in settings"
      :key="it.key"
      :class="`nav-item ${current === it.key ? 'active' : ''}`"
      @click="emit('nav', it.key)"
    >
      <Icon :name="it.icon" />
      <span>{{ it.label }}</span>
    </div>
    <div
      style="margin-top: auto; padding: 12px; border-top: 1px solid var(--border-subtle); display: flex; gap: 10px; align-items: center"
    >
      <span class="avatar">JA</span>
      <div style="display: flex; flex-direction: column; font-size: 12px; line-height: 1.3">
        <span style="color: var(--fg-1); font-weight: 600">Jordan Avery</span>
        <span style="color: var(--fg-3)">Northwind Trading</span>
      </div>
    </div>
  </aside>
</template>
