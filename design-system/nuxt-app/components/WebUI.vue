<script setup>
// Ported from pages/web-ui.jsx `WebUI` — the shell that switches pages.
import { ref } from 'vue'

const page = ref('dashboard')
const tx = ref(null)

const selectTx = (t) => { tx.value = t; page.value = 'detail' }
const onNav = (k) => { page.value = k; tx.value = null }
</script>

<template>
  <div class="webui-shell">
    <div class="app" :data-screen-label="page">
      <Sidebar :current="page === 'detail' ? 'payouts' : page" @nav="onNav" />
      <div class="main">
        <Topbar />
        <Dashboard v-if="page === 'dashboard'" @select-tx="selectTx" @go-to-payouts="page = 'payouts'" />
        <Payouts v-if="page === 'payouts'" @select-tx="selectTx" />
        <PayoutDetail v-if="page === 'detail'" :tx="tx" @back="page = 'payouts'" />
        <Collections v-if="page === 'collections'" @select-tx="selectTx" />
        <Recipients v-if="page === 'recipients'" />
        <Team v-if="page === 'team'" />
        <Settings v-if="page === 'settings'" />
        <div v-if="page === 'balances'" class="page" :style="{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }">
          <div :style="{ textAlign: 'center', color: 'var(--fg-3)' }">
            <Icon name="wallet" :style="{ width: '32px', height: '32px', color: 'var(--fg-4)' }" />
            <div :style="{ marginTop: '12px', fontSize: '14px' }">Balances page — to be built.</div>
          </div>
        </div>
        <div v-if="page === 'developers'" class="page" :style="{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }">
          <div :style="{ textAlign: 'center', color: 'var(--fg-3)' }">
            <Icon name="code-2" :style="{ width: '32px', height: '32px', color: 'var(--fg-4)' }" />
            <div :style="{ marginTop: '12px', fontSize: '14px' }">Developers / API keys page — to be built.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
