<script setup>
// Auth gate — shared credentials (casual client-side deterrent only).
// Ported from index.html `AuthGate`.
import { ref, onMounted } from 'vue'

const AUTH_USER = 'agentX'
const AUTH_PASSWORD = 'marines@lph@90'
const AUTH_KEY = 'ds-auth-v2'
const LEGACY_AUTH_KEY = 'ds-auth-v1'
const AUTH_SESSION_VALUE = 'ok'

const authed = ref(false)
const u = ref('')
const p = ref('')
const err = ref(false)

onMounted(() => {
  try { authed.value = localStorage.getItem(AUTH_KEY) === AUTH_SESSION_VALUE } catch (_) {}
})

const submit = () => {
  const identity = u.value.trim()
  const password = p.value

  if (identity === AUTH_USER && password === AUTH_PASSWORD) {
    try {
      localStorage.setItem(AUTH_KEY, AUTH_SESSION_VALUE)
      localStorage.removeItem(LEGACY_AUTH_KEY)
    } catch (_) {}
    err.value = false
    authed.value = true
  } else {
    err.value = true
  }
}
</script>

<template>
  <slot v-if="authed" />
  <div v-else class="ds-auth">
    <form class="ds-auth-card" @submit.prevent="submit">
      <div class="ds-auth-head">
        <AppLogo name="on-light" class="ds-auth-logo"  alt="iFutur" />
        <div class="ds-auth-head-text">
          <div class="if-eyebrow" style="color: var(--brand-lime-700, #889732)">Design System</div>
          <h1 class="ds-auth-title">Delta Force</h1>
        </div>
      </div>
      <p class="ds-auth-sub">⚠ Only Marines are authorized on this battlefield. Identify yourself, soldier.</p>

      <div class="ds-auth-label">Username</div>
      <input
        :class="`ds-auth-input ${err ? 'is-error' : ''}`"
        placeholder="agentX"
        autocomplete="username"
        autofocus
        :aria-invalid="err"
        :value="u"
        @input="u = $event.target.value; err = false"
      />

      <div class="ds-auth-label">Password</div>
      <input
        :class="`ds-auth-input ${err ? 'is-error' : ''}`"
        placeholder="Password"
        type="password"
        autocomplete="current-password"
        :aria-invalid="err"
        :value="p"
        @input="p = $event.target.value; err = false"
      />

      <div v-if="err" class="ds-auth-err">Incorrect username or password.</div>
      <button class="ds-auth-btn" type="submit">Unlock</button>
    </form>
    <ContraGame />
  </div>
</template>
