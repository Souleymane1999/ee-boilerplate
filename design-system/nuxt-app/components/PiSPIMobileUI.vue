<script setup>
// PiSPI Mobile UI page — current Flutter app screens redrawn in the Delta Force style.
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

const SECTIONS = [
  {
    id: 'core',
    num: '01',
    title: 'Parcours principal',
    lede: "Point d'entrée de l'application, création d'alias puis accueil compte PI.",
    screens: [
      { id: 'app-home', label: 'Accueil app · Services', tag: 'Interactif', interactive: true },
      { id: 'alias', label: 'Créer un alias', tag: 'Identité' },
      { id: 'alias-success', label: 'Alias créé', tag: 'Modal' },
      { id: 'phone-locked', label: 'Numéro téléphone', tag: 'Verrouillé' },
      { id: 'otp-code', label: 'Code OTP', tag: 'Sécurité' },
      { id: 'otp-code-keyboard', label: 'Code OTP avec clavier', tag: 'Saisie' },
      { id: 'otp-resend', label: 'Renvoyer le code', tag: 'Relance' },
      { id: 'otp-keyboard', label: 'OTP rempli avec clavier', tag: 'Saisie' },
      { id: 'otp-error', label: 'OTP erreur', tag: 'Erreur' },
      { id: 'otp-success-modal', label: 'Modal succès OTP', tag: 'Succès' },
      { id: 'otp-failure-modal', label: 'Modal échec OTP', tag: 'Échec' },
      { id: 'otp-claim-modal', label: 'Alias en revendication', tag: 'Échec' },
      { id: 'claim-sent-modal', label: 'Revendication envoyée', tag: 'Succès' },
      { id: 'claim-sent-home-modal', label: 'Revendication · Accueil', tag: 'Succès' },
      { id: 'home', label: 'PI SPI · Compte', tag: 'Service' },
    ],
  },
  {
    id: 'access',
    num: '02',
    title: 'Accès & conformité',
    lede: "Onboarding, connexion, contrôle PIN et autorisations système avec la marque SPI visible dans les points réglementaires.",
    screens: [
      { id: 'intro', label: 'Introduction SPI', tag: 'Onboarding' },
      { id: 'login', label: 'Connexion', tag: 'Auth' },
      { id: 'pin', label: 'Code PIN', tag: 'Sécurité' },
      { id: 'permissions', label: 'Autorisations', tag: 'Système' },
    ],
  },
  {
    id: 'identity',
    num: '03',
    title: 'Alias & QR',
    lede: "Écrans d'identité de paiement : QR Code partageable et identité de réception.",
    screens: [
      { id: 'qr', label: 'Mon QR Code', tag: 'Paiement' },
    ],
  },
  {
    id: 'transfer',
    num: '04',
    title: 'Paiements & historique',
    lede: "Formulaire de transfert, vérification avant PIN et recherche dans l'historique des mouvements PI/SPI.",
    screens: [
      { id: 'send', label: 'Envoyer', tag: 'Flux' },
      { id: 'request-payment', label: 'Demande de paiement', tag: 'Flux' },
      { id: 'transactions-complete', label: 'Transactions complètes', tag: 'Liste' },
      { id: 'transfer-form', label: 'Formulaire transfert', tag: 'Saisie' },
      { id: 'transfer-review', label: 'Vérification transfert', tag: 'Validation' },
      { id: 'detail', label: 'Détail transaction', tag: 'Actions' },
      { id: 'history', label: 'Historique filtré', tag: 'Recherche' },
    ],
  },
  {
    id: 'organization',
    num: '05',
    title: 'Organisation',
    lede: "Paiements programmés, création d'abonnement, catégories d'analyse et carnet de contacts PI.",
    screens: [
      { id: 'subscriptions', label: 'Abonnements', tag: 'Planifié' },
      { id: 'subscription-create', label: 'Créer abonnement', tag: 'Formulaire' },
      { id: 'categories', label: 'Catégories', tag: 'Analyse' },
      { id: 'contact-create', label: 'Nouveau contact', tag: 'Répertoire' },
    ],
  },
  {
    id: 'profile',
    num: '06',
    title: 'Notifications & profil',
    lede: "Alertes SPI, profil vérifié et paramètres d'application dans un traitement proche du kit mobile Delta Force.",
    screens: [
      { id: 'notifications', label: 'Notifications', tag: 'Alertes' },
      { id: 'claim-detail', label: "Revendication d'alias", tag: 'Alias' },
      { id: 'claim-confirm', label: 'Confirmation revendication', tag: 'Dialogue' },
      { id: 'claim-auth', label: 'Authentification revendication', tag: 'Sécurité' },
      { id: 'claim-accepted', label: 'Revendication acceptée', tag: 'Succès' },
      { id: 'profile', label: 'Profil', tag: 'Compte' },
      { id: 'settings', label: 'Paramètres', tag: 'Réglages' },
    ],
  },
]

const totalScreens = SECTIONS.reduce((n, s) => n + s.screens.length, 0)
const allScreens = SECTIONS.flatMap(sec => sec.screens.map(scr => ({ ...scr, sectionId: sec.id, sectionTitle: sec.title })))
const defaultScreenIds = allScreens.map(scr => scr.id)
const sectionById = Object.fromEntries(SECTIONS.map(sec => [sec.id, sec]))
const screenById = Object.fromEntries(allScreens.map(scr => [scr.id, scr]))
const screenLayoutStorageKey = 'pispi-mobile-screen-layout-v1'

// Interactive phone state (mirrors InteractivePiSPIPhone)
const page = ref('main')
const tx = ref(PISPI_TX[0])

const hiddenScreenIds = ref([])
const screenLayout = ref({ order: [], sections: {} })
const dragTarget = ref(null)
const draggedScreenId = ref(null)

onMounted(() => {
  try {
    const saved = JSON.parse(window.localStorage.getItem(screenLayoutStorageKey) || '{}')
    screenLayout.value = {
      order: Array.isArray(saved.order) ? saved.order : [],
      sections: saved.sections && typeof saved.sections === 'object' ? saved.sections : {},
    }
  } catch (error) {
    screenLayout.value = { order: [], sections: {} }
  }
})

watch(screenLayout, (value) => {
  try {
    window.localStorage.setItem(screenLayoutStorageKey, JSON.stringify(value))
  } catch (error) {}
}, { deep: true })

const normalizeOrder = (order = []) => {
  const known = order.filter(id => screenById[id])
  const missing = defaultScreenIds.filter(id => !known.includes(id))
  return [...known, ...missing]
}

const orderedScreenIds = computed(() => normalizeOrder(screenLayout.value.order))
const screenSectionId = (screenId) => screenLayout.value.sections?.[screenId] || screenById[screenId]?.sectionId
const screensForSection = (sectionId) => orderedScreenIds.value
  .map(id => screenById[id])
  .filter(scr => scr && screenSectionId(scr.id) === sectionId)
const visibleScreensForSection = (sectionId) => screensForSection(sectionId).filter(scr => !isHidden(scr.id))
const hiddenScreens = computed(() => allScreens.filter(scr => hiddenScreenIds.value.includes(scr.id)))
const visibleTotalScreens = computed(() => totalScreens - hiddenScreenIds.value.length)
const isHidden = (id) => hiddenScreenIds.value.includes(id)
const hideScreen = (id) => { if (!hiddenScreenIds.value.includes(id)) hiddenScreenIds.value = [...hiddenScreenIds.value, id] }
const restoreScreen = (id) => { hiddenScreenIds.value = hiddenScreenIds.value.filter(item => item !== id) }
const restoreFromSelect = (event) => {
  const value = event.target.value
  if (!value) return
  if (value === '__all') hiddenScreenIds.value = []
  else restoreScreen(value)
  event.target.value = ''
}
const moveScreen = (screenId, targetSectionId, beforeId = null) => {
  if (!screenById[screenId]) return
  const layout = screenLayout.value
  const nextOrder = normalizeOrder(layout.order).filter(id => id !== screenId)
  const beforeIndex = beforeId && beforeId !== screenId ? nextOrder.indexOf(beforeId) : -1
  if (beforeIndex >= 0) nextOrder.splice(beforeIndex, 0, screenId)
  else nextOrder.push(screenId)

  const nextSections = { ...(layout.sections || {}) }
  if (targetSectionId && targetSectionId !== screenById[screenId].sectionId) nextSections[screenId] = targetSectionId
  else delete nextSections[screenId]

  screenLayout.value = { order: nextOrder, sections: nextSections }
}

const handlePointerMove = (event) => {
  const node = document.elementFromPoint(event.clientX, event.clientY)
  const card = node?.closest?.('.mk-card[data-screen-id]')
  if (card) {
    dragTarget.value = { sectionId: card.dataset.sectionId, beforeId: card.dataset.screenId }
    return
  }

  const grid = node?.closest?.('.mk-grid[data-section-id]')
  if (grid) dragTarget.value = { sectionId: grid.dataset.sectionId, beforeId: null }
}
const handlePointerUp = () => {
  const target = dragTarget.value
  const screenId = draggedScreenId.value
  if (target && screenId && screenId !== target.beforeId) moveScreen(screenId, target.sectionId, target.beforeId)
  draggedScreenId.value = null
  dragTarget.value = null
}

watch(draggedScreenId, (value) => {
  if (value) {
    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
    window.addEventListener('pointercancel', handlePointerUp)
  } else {
    window.removeEventListener('pointermove', handlePointerMove)
    window.removeEventListener('pointerup', handlePointerUp)
    window.removeEventListener('pointercancel', handlePointerUp)
  }
})

onUnmounted(() => {
  window.removeEventListener('pointermove', handlePointerMove)
  window.removeEventListener('pointerup', handlePointerUp)
  window.removeEventListener('pointercancel', handlePointerUp)
})

const handlePointerDragStart = (event, screenId) => {
  if (event.button !== undefined && event.button !== 0) return
  event.preventDefault()
  draggedScreenId.value = screenId
  dragTarget.value = { sectionId: screenSectionId(screenId), beforeId: screenId }
}
const handleDragStart = (event, screenId) => {
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('text/plain', screenId)
  draggedScreenId.value = screenId
}
const handleDragOver = (event, sectionId, beforeId = null) => {
  if (!draggedScreenId.value) return
  event.preventDefault()
  event.stopPropagation()
  event.dataTransfer.dropEffect = 'move'
  dragTarget.value = { sectionId, beforeId }
}
const handleDrop = (event, sectionId, beforeId = null) => {
  event.preventDefault()
  event.stopPropagation()
  const screenId = event.dataTransfer.getData('text/plain') || draggedScreenId.value
  if (screenId && screenId !== beforeId) moveScreen(screenId, sectionId, beforeId)
  draggedScreenId.value = null
  dragTarget.value = null
}
const handleDragEnd = () => {
  draggedScreenId.value = null
  dragTarget.value = null
}
const resetScreenOrder = () => {
  screenLayout.value = { order: [], sections: {} }
  try { window.localStorage.removeItem(screenLayoutStorageKey) } catch (error) {}
}
const hasCustomOrder = computed(() => screenLayout.value.order.length > 0 || Object.keys(screenLayout.value.sections || {}).length > 0)

// Interactive phone transitions
const selectTx = (selected) => { tx.value = selected; page.value = 'detail' }
</script>

<template>
  <div class="mk-page pispi-mk-page" :style="{ '--mk-phone-scale': 0.66 }">
    <header class="mk-head">
      <div class="mk-eyebrow">UI Kit · PiSPI mobile</div>
      <h1 class="mk-title">PiSPI — application mobile</h1>
      <p class="mk-lede">
        {{ visibleTotalScreens }} écrans visibles sur {{ totalScreens }}, redessinés dans le style Delta Force.
        Le premier téléphone est interactif : ouvrez le service PI-SPI puis choisissez un alias.
      </p>
      <div class="mk-screen-tools">
        <span>{{ visibleTotalScreens }}/{{ totalScreens }} visibles</span>
        <button type="button" class="mk-tool-button" @click="resetScreenOrder" :disabled="!hasCustomOrder">
          <Icon name="rotate-ccw" /> Réinitialiser l'ordre
        </button>
        <select value="" @change="restoreFromSelect" aria-label="Réactiver un écran masqué">
          <option value="">{{ hiddenScreens.length ? 'Réactiver un écran masqué' : 'Aucun écran masqué' }}</option>
          <option v-for="scr in hiddenScreens" :key="scr.id" :value="scr.id">{{ scr.label }} · {{ sectionById[screenSectionId(scr.id)]?.title || scr.sectionTitle }}</option>
          <option v-if="hiddenScreens.length > 0" value="__all">Tout réactiver</option>
        </select>
      </div>
      <nav class="mk-toc">
        <a v-for="s in SECTIONS" :key="s.id" :href="`#sec-pispi-${s.id}`">
          {{ s.title }}<span class="mk-count">{{ visibleScreensForSection(s.id).length }}</span>
        </a>
      </nav>
    </header>

    <section
      v-for="sec in SECTIONS"
      :key="sec.id"
      class="mk-section"
      :id="`sec-pispi-${sec.id}`"
    >
      <div class="mk-section-head">
        <div class="num">{{ sec.num }}</div>
        <div class="body">
          <h2>{{ sec.title }}</h2>
          <p>{{ sec.lede }}</p>
        </div>
        <div class="count">{{ visibleScreensForSection(sec.id).length }}/{{ screensForSection(sec.id).length }} écrans</div>
      </div>
      <div
        :class="`mk-grid ${dragTarget?.sectionId === sec.id && !dragTarget.beforeId ? 'is-drop-zone' : ''}`"
        @dragover="(event) => handleDragOver(event, sec.id)"
        @drop="(event) => handleDrop(event, sec.id)"
        :data-section-id="sec.id"
      >
        <div
          v-for="scr in visibleScreensForSection(sec.id)"
          :key="scr.id"
          :class="`mk-card ${draggedScreenId === scr.id ? 'is-dragging' : ''} ${dragTarget?.sectionId === sec.id && dragTarget.beforeId === scr.id ? 'is-drop-target' : ''}`"
          @dragover="(event) => handleDragOver(event, sec.id, scr.id)"
          @drop="(event) => handleDrop(event, sec.id, scr.id)"
          :data-section-id="sec.id"
          :data-screen-id="scr.id"
        >
          <div class="mk-frame">
            <!-- Interactive phone -->
            <div v-if="scr.id === 'app-home'" class="phone is-interactive">
              <PiSPIMainAppHomeScreen v-if="page === 'main'" @open-pi="page = 'alias'" />
              <PiSPIAliasScreen
                v-else-if="page === 'alias'"
                @back="page = 'main'"
                @address-select="page = 'alias-success'"
                @phone-select="page = 'phone-locked'"
              />
              <PiSPIAliasSuccessScreen v-else-if="page === 'alias-success'" @continue="page = 'home'" />
              <PiSPIPhoneNumberLockedScreen v-else-if="page === 'phone-locked'" @back="page = 'alias'" @continue="page = 'otp'" />
              <PiSPIOtpCodeScreen v-else-if="page === 'otp'" @back="page = 'phone-locked'" keyboard />
              <PiSPISendOptionsScreen v-else-if="page === 'send'" @back="page = 'home'" />
              <PiSPIRequestOptionsScreen v-else-if="page === 'request'" @back="page = 'home'" />
              <PiSPITransactionDetailScreen v-else-if="page === 'detail'" :tx="tx" @back="page = 'home'" />
              <PiSPITransactionSearchScreen v-else-if="page === 'history'" @back="page = 'home'" />
              <PiSPIHomeScreen
                v-else
                @back="page = 'main'"
                @send="page = 'send'"
                @receive="page = 'request'"
                @show-all="page = 'history'"
                @select-tx="selectTx"
              />
            </div>

            <!-- Static screens (PhoneArt wrapper) -->
            <div v-else-if="scr.id === 'alias'" class="phone"><div class="phone-screen"><PiSPIAliasScreen /></div></div>
            <div v-else-if="scr.id === 'alias-success'" class="phone"><div class="phone-screen"><PiSPIAliasSuccessScreen /></div></div>
            <div v-else-if="scr.id === 'phone-locked'" class="phone"><div class="phone-screen"><PiSPIPhoneNumberLockedScreen /></div></div>
            <div v-else-if="scr.id === 'otp-code'" class="phone"><div class="phone-screen"><PiSPIOtpCodeScreen /></div></div>
            <div v-else-if="scr.id === 'otp-code-keyboard'" class="phone"><div class="phone-screen"><PiSPIOtpCodeScreen keyboard /></div></div>
            <div v-else-if="scr.id === 'otp-resend'" class="phone"><div class="phone-screen"><PiSPIOtpCodeScreen keyboard resend-ready /></div></div>
            <div v-else-if="scr.id === 'otp-keyboard'" class="phone"><div class="phone-screen"><PiSPIOtpCodeScreen filled keyboard /></div></div>
            <div v-else-if="scr.id === 'otp-error'" class="phone"><div class="phone-screen"><PiSPIOtpCodeScreen filled keyboard error /></div></div>
            <div v-else-if="scr.id === 'otp-success-modal'" class="phone"><div class="phone-screen"><PiSPIOtpResultModalScreen variant="success" /></div></div>
            <div v-else-if="scr.id === 'otp-failure-modal'" class="phone"><div class="phone-screen"><PiSPIOtpResultModalScreen variant="failure" /></div></div>
            <div v-else-if="scr.id === 'otp-claim-modal'" class="phone"><div class="phone-screen"><PiSPIOtpResultModalScreen variant="claim-pending" /></div></div>
            <div v-else-if="scr.id === 'claim-sent-modal'" class="phone"><div class="phone-screen"><PiSPIOtpResultModalScreen variant="claim-sent" /></div></div>
            <div v-else-if="scr.id === 'claim-sent-home-modal'" class="phone"><div class="phone-screen"><PiSPIOtpResultModalScreen variant="claim-sent-home" /></div></div>
            <div v-else-if="scr.id === 'home'" class="phone"><div class="phone-screen"><PiSPIHomeScreen /></div></div>

            <div v-else-if="scr.id === 'intro'" class="phone"><div class="phone-screen"><PiSPIIntroScreen /></div></div>
            <div v-else-if="scr.id === 'login'" class="phone"><div class="phone-screen"><PiSPILoginScreen /></div></div>
            <div v-else-if="scr.id === 'pin'" class="phone"><div class="phone-screen"><PiSPIPinScreen /></div></div>
            <div v-else-if="scr.id === 'permissions'" class="phone"><div class="phone-screen"><PiSPIPermissionsScreen /></div></div>

            <div v-else-if="scr.id === 'qr'" class="phone"><div class="phone-screen"><PiSPIQrCodeScreen /></div></div>

            <div v-else-if="scr.id === 'send'" class="phone"><div class="phone-screen"><PiSPISendOptionsScreen /></div></div>
            <div v-else-if="scr.id === 'request-payment'" class="phone"><div class="phone-screen"><PiSPIRequestOptionsScreen /></div></div>
            <div v-else-if="scr.id === 'transactions-complete'" class="phone"><div class="phone-screen"><PiSPITransactionSearchScreen /></div></div>
            <div v-else-if="scr.id === 'transfer-form'" class="phone"><div class="phone-screen"><PiSPITransactionFormScreen /></div></div>
            <div v-else-if="scr.id === 'transfer-review'" class="phone"><div class="phone-screen"><PiSPITransferReviewScreen /></div></div>
            <div v-else-if="scr.id === 'detail'" class="phone"><div class="phone-screen"><PiSPITransactionDetailScreen :tx="PISPI_TX[0]" /></div></div>
            <div v-else-if="scr.id === 'history'" class="phone"><div class="phone-screen"><PiSPITransactionSearchScreen /></div></div>

            <div v-else-if="scr.id === 'subscriptions'" class="phone"><div class="phone-screen"><PiSPISubscriptionListScreen /></div></div>
            <div v-else-if="scr.id === 'subscription-create'" class="phone"><div class="phone-screen"><PiSPISubscriptionCreateScreen /></div></div>
            <div v-else-if="scr.id === 'categories'" class="phone"><div class="phone-screen"><PiSPICategoriesScreen /></div></div>
            <div v-else-if="scr.id === 'contact-create'" class="phone"><div class="phone-screen"><PiSPIContactCreateScreen /></div></div>

            <div v-else-if="scr.id === 'notifications'" class="phone"><div class="phone-screen"><PiSPINotificationsScreen /></div></div>
            <div v-else-if="scr.id === 'claim-detail'" class="phone"><div class="phone-screen"><PiSPIClaimDetailScreen /></div></div>
            <div v-else-if="scr.id === 'claim-confirm'" class="phone"><div class="phone-screen"><PiSPIClaimAcceptDialogScreen /></div></div>
            <div v-else-if="scr.id === 'claim-auth'" class="phone"><div class="phone-screen"><PiSPIClaimAcceptDialogScreen variant="auth" /></div></div>
            <div v-else-if="scr.id === 'claim-accepted'" class="phone"><div class="phone-screen"><PiSPIClaimAcceptDialogScreen variant="success" /></div></div>
            <div v-else-if="scr.id === 'profile'" class="phone"><div class="phone-screen"><PiSPIProfileScreen /></div></div>
            <div v-else-if="scr.id === 'settings'" class="phone"><div class="phone-screen"><PiSPISettingsScreen /></div></div>
          </div>
          <div class="mk-caption">
            <button
              class="mk-drag-screen"
              type="button"
              draggable="true"
              @pointerdown="(event) => handlePointerDragStart(event, scr.id)"
              @dragstart="(event) => handleDragStart(event, scr.id)"
              @dragend="handleDragEnd"
              title="Déplacer cet écran"
              :aria-label="`Déplacer ${scr.label}`"
            >
              <Icon name="grip-vertical" />
            </button>
            <span v-if="scr.tag" :class="`mk-tag ${scr.interactive ? '' : 'muted'}`">{{ scr.tag }}</span>
            <span class="mk-caption-label">{{ scr.label }}</span>
            <button class="mk-hide-screen" @click="hideScreen(scr.id)" title="Masquer cet écran">
              <Icon name="eye-off" />
            </button>
          </div>
        </div>
        <div v-if="!visibleScreensForSection(sec.id).length" class="mk-empty-section">Tous les écrans de cette section sont masqués.</div>
      </div>
    </section>
  </div>
</template>
