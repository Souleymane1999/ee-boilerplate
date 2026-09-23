<script setup>
// Ported from ui_kits/mobile/PiSPIScreens.jsx (PiSPICancellationDetailScreen)
import { computed } from 'vue'

const props = defineProps({
  mode: { type: String, default: 'pending' },
})

const overlay = computed(() => ['reject-success', 'loading', 'success', 'failure', 'timeout'].includes(props.mode))
</script>

<template>
  <div v-if="mode === 'auth'" class="phone-screen pispi-screen pispi-claim-pin-screen" data-screen-label="PiSPI Annulation PIN">
    <StatusBar />
    <button type="button" class="pispi-claim-pin-back" aria-label="Retour"><Icon name="arrow-left" /></button>
    <section class="pispi-claim-pin-body">
      <div class="pispi-claim-pin-avatar">MK</div>
      <h2>Bonjour, Moustapha K.</h2>
      <p>Saisissez votre code PIN pour accepter l'annulation.</p>
      <div class="pispi-claim-pin-grid" aria-label="Clavier code PIN">
        <button type="button" v-for="number in [1,2,3,4,5,6,7,8,9]" :key="number">{{ number }}</button>
        <button type="button"><Icon name="fingerprint" /></button>
        <button type="button">0</button>
        <button type="button"><Icon name="delete" /></button>
      </div>
      <button type="button" class="pispi-claim-pin-forgot">Code PIN oublié?</button>
    </section>
  </div>

  <div v-else-if="!overlay" class="phone-screen pispi-screen" data-screen-label="PiSPI Détail annulation">
    <StatusBar />
    <MNav title="Demande d'annulation" />
    <div class="pispi-content compact">
      <section class="pispi-claim-hero">
        <span><Icon name="rotate-ccw" /></span>
        <div>
          <h2>Demande d'annulation</h2>
          <p>48.200 CFA · Référence PI-2406-7698</p>
        </div>
      </section>
      <div class="pispi-detail-card">
        <div class="pispi-info-row"><span>Référence</span><strong class="mono">PI-2406-7698</strong><PiSPICopyMini label="Copier la référence" /></div>
        <div class="pispi-info-row"><span>Reçu de</span><strong>Mamadou Diallo</strong></div>
        <div class="pispi-info-row"><span>Reçu à</span><strong>7 juin, 15:42</strong></div>
        <div class="pispi-info-row"><span>Pays</span><strong>Niger</strong></div>
        <div class="pispi-info-row"><span>Date de la demande</span><strong>7 juin, 16:02</strong></div>
        <div class="pispi-info-row"><span>Raison</span><strong>Mauvais bénéficiaire</strong></div>
        <div class="pispi-info-row"><span>Statut</span><strong class="m-badge m-badge-warning">En attente</strong></div>
      </div>
      <div class="pispi-claim-warning">
        <Icon name="triangle-alert" />
        <span>En acceptant, vous autorisez le retour des fonds au client payeur. Cette opération devient irrévocable après confirmation SPI.</span>
      </div>
      <div class="pispi-claim-actions">
        <button class="danger">Rejeter</button>
        <button class="active">Accepter</button>
      </div>
    </div>
  </div>

  <div v-else class="phone-screen pispi-screen pispi-return-screen pispi-transfer-modal-screen" data-screen-label="PiSPI Annulation modal">
    <div class="pispi-modal-underlay">
      <div class="phone-screen pispi-screen" data-screen-label="PiSPI Détail annulation">
        <StatusBar />
        <MNav title="Demande d'annulation" />
        <div class="pispi-content compact">
          <section class="pispi-claim-hero">
            <span><Icon name="rotate-ccw" /></span>
            <div>
              <h2>Demande d'annulation</h2>
              <p>48.200 CFA · Référence PI-2406-7698</p>
            </div>
          </section>
          <div class="pispi-detail-card">
            <div class="pispi-info-row"><span>Référence</span><strong class="mono">PI-2406-7698</strong><PiSPICopyMini label="Copier la référence" /></div>
            <div class="pispi-info-row"><span>Reçu de</span><strong>Mamadou Diallo</strong></div>
            <div class="pispi-info-row"><span>Reçu à</span><strong>7 juin, 15:42</strong></div>
            <div class="pispi-info-row"><span>Pays</span><strong>Niger</strong></div>
            <div class="pispi-info-row"><span>Date de la demande</span><strong>7 juin, 16:02</strong></div>
            <div class="pispi-info-row"><span>Raison</span><strong>Mauvais bénéficiaire</strong></div>
            <div class="pispi-info-row"><span>Statut</span><strong class="m-badge m-badge-warning">En attente</strong></div>
          </div>
          <div class="pispi-claim-warning">
            <Icon name="triangle-alert" />
            <span>En acceptant, vous autorisez le retour des fonds au client payeur. Cette opération devient irrévocable après confirmation SPI.</span>
          </div>
          <div class="pispi-claim-actions">
            <button class="danger">Rejeter</button>
            <button class="active">Accepter</button>
          </div>
        </div>
      </div>
    </div>
    <div class="pispi-modal-dim"></div>
    <section :class="`pispi-result-sheet pispi-transfer-result ${mode === 'failure' || mode === 'timeout' ? 'is-danger' : ''}`">
      <template v-if="mode === 'reject-success'">
        <div class="pispi-result-icon"><Icon name="check" /></div>
        <h2>Annulation rejetée</h2>
        <p>La demande d'annulation est rejetée avec succès.</p>
        <button type="button">Continuer</button>
      </template>
      <template v-else-if="mode === 'loading'">
        <div class="pispi-transfer-spinner"></div>
        <h2>Retour en cours</h2>
        <p>Le retour de fonds est envoyé après acceptation de la demande.</p>
      </template>
      <template v-else-if="mode === 'success'">
        <div class="pispi-result-icon"><Icon name="check" /></div>
        <h2>Annulation acceptée</h2>
        <p>Le retour de fonds est irrévocable et la demande est clôturée.</p>
        <button type="button">Continuer</button>
      </template>
      <template v-else-if="mode === 'failure'">
        <div class="pispi-result-icon"><Icon name="x" /></div>
        <h2>Retour rejeté</h2>
        <p>Le retour de fonds n'a pas pu être exécuté: compte payeur indisponible.</p>
        <button type="button">Fermer</button>
      </template>
      <template v-else>
        <div class="pispi-result-icon"><Icon name="clock-alert" /></div>
        <h2>Statut en attente</h2>
        <p>Le réseau SPI n'a pas confirmé le retour après 30 secondes.</p>
        <button type="button">Voir le statut</button>
      </template>
    </section>
  </div>
</template>
