<script setup>
// Ported from ui_kits/mobile/PiSPIScreens.jsx (PiSPIQrCodeScreen)
import { computed } from 'vue'

const props = defineProps({
  mode: { type: String, default: 'default' },
})

const shareChoice = computed(() => props.mode === 'share-choice')
const shareImage = computed(() => props.mode === 'share-image')
const shareAction = computed(() => props.mode === 'share-action' || shareChoice.value)
const scannerMode = computed(() => props.mode.startsWith('scan'))
const galleryMode = computed(() => props.mode.startsWith('gallery'))
const scannerError = computed(() => props.mode === 'scan-error' || props.mode === 'gallery-error')
const scannerReference = computed(() => props.mode === 'scan-reference' || props.mode === 'gallery-reference')
const scannerAmount = computed(() => props.mode === 'scan-amount' || props.mode === 'gallery-amount')

const qrSize = 21
const isFinder = (row, col, startRow, startCol) => {
  const r = row - startRow
  const c = col - startCol
  if (r < 0 || c < 0 || r > 6 || c > 6) return false
  return r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4)
}
const inReservedFinder = (row, col, startRow, startCol) => (
  row >= startRow - 1 && row <= startRow + 7 && col >= startCol - 1 && col <= startCol + 7
)
const qrCells = Array.from({ length: qrSize * qrSize }, (_, i) => {
  const row = Math.floor(i / qrSize)
  const col = i % qrSize
  const finder = isFinder(row, col, 0, 0) || isFinder(row, col, 0, 14) || isFinder(row, col, 14, 0)
  const reserved = inReservedFinder(row, col, 0, 0) || inReservedFinder(row, col, 0, 14) || inReservedFinder(row, col, 14, 0)
  const timing = (row === 6 || col === 6) && !reserved && (row + col) % 2 === 0
  const payload = !reserved && (
    ((row * 5 + col * 3 + row * col) % 7 === 0) ||
    ((row + col * 2) % 11 === 0) ||
    ((row * 2 + col * 5) % 13 === 3)
  )
  return { on: finder || timing || payload, finder }
})
</script>

<template>
  <div v-if="scannerMode || galleryMode" class="phone-screen pispi-screen pispi-scanner-screen" data-screen-label="PiSPI Scanner QR">
    <StatusBar />
    <MNav title="Scanner">
      <template #right>
        <button class="btn"><Icon name="image-plus" /></button>
      </template>
    </MNav>
    <div class="pispi-scanner-camera">
      <div class="pispi-scanner-corners"><span></span><span></span><span></span><span></span></div>
      <Icon :name="galleryMode ? 'image' : 'scan-line'" />
      <strong>{{ galleryMode ? 'QR Code importé' : 'Caméra activée' }}</strong>
      <small>{{ galleryMode ? 'Analyse de l’image sélectionnée' : 'Placez le QR Code PI dans le cadre' }}</small>
      <em v-if="scannerReference">Reference Label détecté · TXID envoyé avec la transaction</em>
      <em v-if="scannerAmount">Montant détecté · 48.200 CFA</em>
      <p v-if="scannerError"><Icon name="triangle-alert" /> QR Code invalide. Vous pouvez scanner un autre QR Code PI.</p>
    </div>
    <div class="pispi-scanner-actions">
      <button type="button"><Icon name="flashlight" /> Lampe torche</button>
      <button type="button"><Icon name="image-plus" /> Galerie</button>
    </div>
    <div class="pispi-qr-bottom-switch">
      <button type="button" class="active"><Icon name="scan-line" /> Scanner</button>
      <button type="button" class=""><Icon name="qr-code" /> Mon Code</button>
    </div>
  </div>

  <div v-else-if="shareImage" class="phone-screen pispi-screen" data-screen-label="PiSPI QR Code partagé">
    <StatusBar />
    <MNav title="Partager QR Code" />
    <div class="pispi-content compact pispi-qr-content">
      <section class="pispi-share-preview">
        <div class="pispi-share-preview-brand"><AppLogo name="spi-dark" alt="SPI BCEAO" /></div>
        <div class="pispi-qr-grid" aria-label="QR Code alias PI de Moustapha K.">
          <span v-for="(cell, i) in qrCells" :key="i" :class="`${cell.on ? 'on' : ''} ${cell.finder ? 'finder' : ''}`" />
          <em class="pispi-qr-center-logo" aria-hidden="true"><AppLogo name="spi-dark" alt="" /></em>
        </div>
        <h2>Moustapha Kodjo</h2>
        <p>moustapha.k@pi</p>
        <span>Compte SPI vérifié</span>
      </section>
      <div class="pispi-compliance-note qr-note"><Icon name="shield-check" /><span>L'image partagée contient le QR Code et le nom du titulaire.</span></div>
    </div>
    <div class="cta-bar"><button class="cta">Partager l'image</button></div>
  </div>

  <div v-else :class="`phone-screen pispi-screen ${shareChoice ? 'pispi-qr-share-screen' : ''}`" data-screen-label="PiSPI QR Code">
    <StatusBar />
    <MNav title="Mon QR Code">
      <template #right>
        <button class="btn"><Icon name="share-2" /></button>
      </template>
    </MNav>
    <div class="pispi-content compact pispi-qr-content">
      <section class="pispi-qr-card">
        <div class="pispi-qr-grid" aria-label="QR Code alias PI de Moustapha K.">
          <span v-for="(cell, i) in qrCells" :key="i" :class="`${cell.on ? 'on' : ''} ${cell.finder ? 'finder' : ''}`" />
          <em class="pispi-qr-center-logo" aria-hidden="true"><AppLogo name="spi-dark" alt="" /></em>
        </div>
        <div class="pispi-qr-logo-lockup"><AppLogo name="spi-dark" alt="SPI BCEAO" /></div>
        <h2>Moustapha Kodjo</h2>
        <p>moustapha.k@pi · Compte SPI vérifié</p>
      </section>
      <div class="pispi-action-strip two qr-actions">
        <button><span><Icon :name="shareAction ? 'share-2' : 'copy'" /></span>{{ shareAction ? 'Partager QR Code' : 'Copier alias' }}</button>
        <button><span><Icon :name="shareAction ? 'copy' : 'scan-line'" /></span>{{ shareAction ? 'Copier alias' : 'Scanner' }}</button>
      </div>
      <div class="pispi-compliance-note qr-note"><Icon name="shield-check" /><span>Le QR Code contient uniquement les informations nécessaires au paiement PI.</span></div>
    </div>
    <div class="pispi-qr-bottom-switch">
      <button type="button" class=""><Icon name="scan-line" /> Scanner</button>
      <button type="button" class="active"><Icon name="qr-code" /> Mon Code</button>
    </div>
    <template v-if="shareChoice">
      <div class="pispi-modal-dim"></div>
      <section class="pispi-share-sheet">
        <div class="pispi-result-handle"></div>
        <h2>Partager</h2>
        <button type="button"><span><Icon name="at-sign" /></span><strong>Partager l'alias</strong><small>moustapha.k@pi</small></button>
        <button type="button"><span><Icon name="qr-code" /></span><strong>Partager le QR Code</strong><small>Image avec nom et QR Code</small></button>
      </section>
    </template>
  </div>
</template>
