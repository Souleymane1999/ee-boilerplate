<script setup>
// Ported from mobile/Screens2.jsx `AgentSettingsScreen` — Paramètres agent.
const emit = defineEmits(['back'])
</script>

<template>
  <div class="phone-screen" data-screen-label="Paramètres agent">
    <StatusBar />
    <MNav title="Paramètres" @back="emit('back')">
      <template #right>
        <button class="btn"><Icon name="more-vertical" /></button>
      </template>
    </MNav>

    <div class="profile-card">
      <div class="profile-row">
        <div class="ic"><Icon name="circle-user" /></div>
        <div>
          <div class="k">Nom</div>
          <div class="v">i-Futur Test Kodjo</div>
        </div>
      </div>
      <div class="profile-row">
        <div class="ic"><Icon name="phone" /></div>
        <div>
          <div class="k">Téléphone</div>
          <div class="v">+227 87 50 50 52</div>
        </div>
      </div>
      <div class="profile-row">
        <div class="ic"><Icon name="store" /></div>
        <div>
          <div class="k">Type de compte</div>
          <div class="v">Point de vente · Niamey</div>
        </div>
      </div>
    </div>

    <div :style="{ height: '8px' }" />

    <div class="menu-btn-lg">
      <div class="ic"><Icon name="shield-check" /></div>
      <span class="lbl">Mon KYC (Identification)</span>
      <span class="pill-badge warn" :style="{ marginLeft: 'auto' }">Approuvé</span>
    </div>
    <div class="menu-btn-lg">
      <div class="ic"><Icon name="qr-code" /></div>
      <span class="lbl">Code de visite agent</span>
      <span class="chev"><Icon name="chevron-right" /></span>
    </div>
    <div class="menu-btn-lg">
      <div class="ic"><Icon name="lock" /></div>
      <span class="lbl">Paramètres de sécurité</span>
      <span class="chev"><Icon name="chevron-right" /></span>
    </div>
    <div class="menu-btn-lg">
      <div class="ic"><Icon name="printer" /></div>
      <span class="lbl">Paramétrer l'imprimante</span>
      <span class="chev"><Icon name="chevron-right" /></span>
    </div>
    <div class="menu-btn-lg">
      <div class="ic"><Icon name="headphones" /></div>
      <span class="lbl">Contacter le service client</span>
      <span class="chev"><Icon name="chevron-right" /></span>
    </div>

    <div :style="{ flex: 1 }" />

    <button class="m-cta-danger"><Icon name="log-out" />Déconnexion</button>
    <div :style="{ textAlign: 'center', fontSize: '11px', color: 'var(--fg-3)', paddingBottom: '12px' }">
      Version <strong :style="{ color: 'var(--fg-2)' }">1.3.5</strong>
    </div>
  </div>
</template>
