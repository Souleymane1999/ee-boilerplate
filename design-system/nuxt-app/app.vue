<script setup>
// ─────────────────────────────────────────────────────────────────────────
// Delta Force · iFutur Design System — app shell.
// Ported from the original static index.html (React) App + sidebar routing.
// ─────────────────────────────────────────────────────────────────────────
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import FoundationsColorBrand from './components/FoundationsColorBrand.vue'
import FoundationsColorNeutrals from './components/FoundationsColorNeutrals.vue'
import FoundationsColorSemantic from './components/FoundationsColorSemantic.vue'
import FoundationsColorForeground from './components/FoundationsColorForeground.vue'
import FoundationsBrandPalette from './components/FoundationsBrandPalette.vue'
import FoundationsTypeScale from './components/FoundationsTypeScale.vue'
import FoundationsTypeWeights from './components/FoundationsTypeWeights.vue'
import FoundationsTypeNumerals from './components/FoundationsTypeNumerals.vue'
import FoundationsSpacingScale from './components/FoundationsSpacingScale.vue'
import FoundationsRadii from './components/FoundationsRadii.vue'
import FoundationsElevation from './components/FoundationsElevation.vue'
import ComponentsButtons from './components/ComponentsButtons.vue'
import ComponentsInputs from './components/ComponentsInputs.vue'
import ComponentsBadges from './components/ComponentsBadges.vue'
import ComponentsStat from './components/ComponentsStat.vue'
import ComponentsTableSimple from './components/ComponentsTableSimple.vue'
import ComponentsTablePayouts from './components/ComponentsTablePayouts.vue'
import BrandLogoLight from './components/BrandLogoLight.vue'
import BrandLogoDark from './components/BrandLogoDark.vue'
import WebUI from './components/WebUI.vue'
import MobileUI from './components/MobileUI.vue'
import PiSPIMobileUI from './components/PiSPIMobileUI.vue'
import PiFinale from './components/PiFinale.vue'
import PiSPITestCaptures from './components/PiSPITestCaptures.vue'

// Navigation model. Each entry: { group, label, icon, comp, kind }
//   kind: 'preview' → padded content area; 'kit' → fullscreen flow
const ROUTES = {
  // Foundations · Color
  'color-brand': { group: 'Foundations · Color', label: 'Brand · Lime', icon: 'palette', kind: 'preview', comp: 'FoundationsColorBrand' },
  'color-neutrals': { group: 'Foundations · Color', label: 'Neutrals', icon: 'circle', kind: 'preview', comp: 'FoundationsColorNeutrals' },
  'color-semantic': { group: 'Foundations · Color', label: 'Semantic', icon: 'alert-circle', kind: 'preview', comp: 'FoundationsColorSemantic' },
  'color-foreground': { group: 'Foundations · Color', label: 'Foreground', icon: 'type', kind: 'preview', comp: 'FoundationsColorForeground' },
  'brand-palette': { group: 'Foundations · Color', label: 'Full palette', icon: 'layers', kind: 'preview', comp: 'FoundationsBrandPalette' },
  // Foundations · Type
  'type-scale': { group: 'Foundations · Type', label: 'Type scale', icon: 'type', kind: 'preview', comp: 'FoundationsTypeScale' },
  'type-weights': { group: 'Foundations · Type', label: 'Weights', icon: 'bold', kind: 'preview', comp: 'FoundationsTypeWeights' },
  'type-numerals': { group: 'Foundations · Type', label: 'Numerals', icon: 'hash', kind: 'preview', comp: 'FoundationsTypeNumerals' },
  // Foundations · Spacing
  'spacing-scale': { group: 'Foundations · Spacing', label: 'Spacing scale', icon: 'move', kind: 'preview', comp: 'FoundationsSpacingScale' },
  'spacing-radii': { group: 'Foundations · Spacing', label: 'Radii', icon: 'square', kind: 'preview', comp: 'FoundationsRadii' },
  'spacing-elevation': { group: 'Foundations · Spacing', label: 'Elevation', icon: 'box-select', kind: 'preview', comp: 'FoundationsElevation' },
  // Components
  'comp-buttons': { group: 'Components', label: 'Buttons', icon: 'mouse-pointer-click', kind: 'preview', comp: 'ComponentsButtons' },
  'comp-inputs': { group: 'Components', label: 'Inputs', icon: 'text-cursor-input', kind: 'preview', comp: 'ComponentsInputs' },
  'comp-badges': { group: 'Components', label: 'Badges', icon: 'tag', kind: 'preview', comp: 'ComponentsBadges' },
  'comp-stat': { group: 'Components', label: 'Stat card', icon: 'trending-up', kind: 'preview', comp: 'ComponentsStat' },
  'comp-table': { group: 'Components', label: 'Table · simple', icon: 'table', kind: 'preview', comp: 'ComponentsTableSimple' },
  'comp-table-payouts': { group: 'Components', label: 'Table · advanced', icon: 'table-properties', kind: 'preview', comp: 'ComponentsTablePayouts' },
  // Brand
  'brand-logo-light': { group: 'Brand', label: 'Logo · light bg', icon: 'image', kind: 'preview', comp: 'BrandLogoLight' },
  'brand-logo-dark': { group: 'Brand', label: 'Logo · dark bg', icon: 'image', kind: 'preview', comp: 'BrandLogoDark' },
  // UI Kits
  'web-ui': { group: 'UI Kits', label: 'Web UI', icon: 'monitor', kind: 'kit', comp: 'WebUI' },
  'mobile-ui': { group: 'UI Kits', label: 'Mobile UI', icon: 'smartphone', kind: 'kit', comp: 'MobileUI' },
  'pispi-mobile-ui': { group: 'UI Kits', label: 'PiSPI Mobile', icon: 'smartphone', kind: 'kit', comp: 'PiSPIMobileUI' },
  'pi-finale': { group: 'UI Kits', label: 'PiFinale', icon: 'send', kind: 'kit', comp: 'PiFinale' },
  'pispi-test-captures': { group: 'UI Kits', label: 'PiSPI Tests', icon: 'list-checks', kind: 'kit', comp: 'PiSPITestCaptures' },
}

const GROUPS = [
  { title: 'Foundations · Color', ids: ['color-brand', 'color-neutrals', 'color-semantic', 'color-foreground', 'brand-palette'] },
  { title: 'Foundations · Type', ids: ['type-scale', 'type-weights', 'type-numerals'] },
  { title: 'Foundations · Spacing', ids: ['spacing-scale', 'spacing-radii', 'spacing-elevation'] },
  { title: 'Components', ids: ['comp-buttons', 'comp-inputs', 'comp-badges', 'comp-stat', 'comp-table', 'comp-table-payouts'] },
  { title: 'Brand', ids: ['brand-logo-light', 'brand-logo-dark'] },
]
const KIT_IDS = ['web-ui', 'mobile-ui', 'pispi-mobile-ui', 'pi-finale', 'pispi-test-captures']
const DEFAULT_ID = 'color-brand'

const ROUTE_COMPONENTS = {
  FoundationsColorBrand,
  FoundationsColorNeutrals,
  FoundationsColorSemantic,
  FoundationsColorForeground,
  FoundationsBrandPalette,
  FoundationsTypeScale,
  FoundationsTypeWeights,
  FoundationsTypeNumerals,
  FoundationsSpacingScale,
  FoundationsRadii,
  FoundationsElevation,
  ComponentsButtons,
  ComponentsInputs,
  ComponentsBadges,
  ComponentsStat,
  ComponentsTableSimple,
  ComponentsTablePayouts,
  BrandLogoLight,
  BrandLogoDark,
  WebUI,
  MobileUI,
  PiSPIMobileUI,
  PiFinale,
  PiSPITestCaptures,
}

const routeIdFromHash = () => {
  const h = (typeof location !== 'undefined' ? location.hash || '' : '').replace(/^#/, '')
  if (/^tests-\d+-\d+$/.test(h)) return 'pispi-test-captures'
  return ROUTES[h] ? h : DEFAULT_ID
}

const id = ref(DEFAULT_ID)
const route = computed(() => ROUTES[id.value])
const currentComp = computed(() => ROUTE_COMPONENTS[route.value.comp] || ROUTE_COMPONENTS[ROUTES[DEFAULT_ID].comp])

const setId = (next) => { id.value = next }

const onHash = () => {
  const next = routeIdFromHash()
  if (next !== id.value) id.value = next
}

onMounted(() => {
  id.value = routeIdFromHash()
  window.addEventListener('hashchange', onHash)
})
onUnmounted(() => window.removeEventListener('hashchange', onHash))

watch(id, (val) => {
  history.replaceState(null, '', `${location.pathname}${location.search}#${val}`)
  document.title = `Delta Force · ${ROUTES[val].label}`
})

const signOut = () => {
  try {
    localStorage.removeItem('ds-auth-v2')
    localStorage.removeItem('ds-auth-v1')
  } catch (_) {}
  location.reload()
}
</script>

<template>
  <AuthGate>
    <div class="ds-app">
      <aside class="ds-sidebar">
        <div class="ds-brand">
          <AppLogo name="on-dark" alt="iFutur" />
          <div class="ds-brand-sub">Delta Force · Design System</div>
        </div>

        <nav class="ds-nav">
          <template v-for="grp in GROUPS" :key="grp.title">
            <div class="ds-section-title">{{ grp.title }}</div>
            <button
              v-for="itemId in grp.ids"
              :key="itemId"
              :class="`ds-link ${id === itemId ? 'is-active' : ''}`"
              @click="setId(itemId)"
            >
              <Icon :name="ROUTES[itemId].icon" />
              <span class="ds-link-body">{{ ROUTES[itemId].label }}</span>
            </button>
          </template>

          <div class="ds-divider" />
          <div class="ds-section-title">UI Kits</div>
          <button
            v-for="itemId in KIT_IDS"
            :key="itemId"
            :class="`ds-link ds-link-kit ${id === itemId ? 'is-active' : ''}`"
            @click="setId(itemId)"
          >
            <Icon :name="ROUTES[itemId].icon" />
            <span class="ds-link-body">{{ ROUTES[itemId].label }}</span>
          </button>
        </nav>

        <div class="ds-footer">
          Typeface · <code>Open Sans</code> (Google Fonts).<br />
          Tokens · <code>colors_and_type.css</code>.<br />
          See <code>README.md</code> for usage rules.
          <button
            class="ds-link"
            style="margin-top: 12px; padding: 6px 8px; font-size: 12px; color: var(--ds-sidebar-fg-muted)"
            @click="signOut"
          >
            <Icon name="log-out" />
            <span class="ds-link-body">Sign out</span>
          </button>
        </div>
      </aside>

      <main class="ds-main">
        <div class="ds-topbar">
          <div class="ds-crumbs">
            <span>{{ route.group }}</span>
            <span class="sep">/</span>
            <strong>{{ route.label }}</strong>
          </div>
        </div>
        <div :class="`ds-content ${route.kind === 'kit' ? 'is-kit' : 'is-preview'}`">
          <div v-if="route.kind === 'preview'" class="ds-stack">
            <component :is="currentComp" />
          </div>
          <component :is="currentComp" v-else />
        </div>
      </main>
    </div>
  </AuthGate>
</template>
