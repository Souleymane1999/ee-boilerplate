<script setup>
// Ported from mobile/Screens2.jsx `KYCScreen` — Vérification d'identité (KYC).
const emit = defineEmits(['back'])
</script>

<template>
  <div class="phone-screen" data-screen-label="KYC">
    <StatusBar />
    <MNav title="Vérification d'identité" @back="emit('back')">
      <template #right>
        <button class="btn" :style="{ background: 'var(--brand-lime-600)', borderColor: 'var(--brand-lime-700)' }">
          <Icon name="shield-check" :style="{ width: '18px', height: '18px', color: '#fff' }" />
        </button>
      </template>
    </MNav>

    <div class="kyc-banner">
      <div class="seal"><Icon name="badge-check" /></div>
      <div class="title">Identité vérifiée</div>
      <div class="sub">Votre KYC a été validé avec succès</div>
      <div class="pill"><Icon name="check" :style="{ width: '12px', height: '12px' }" /> Approuvé · 04/2026</div>
    </div>

    <div class="content">
      <div class="m-section-h">Informations personnelles</div>
      <div class="info-card">
        <div class="info-row"><span class="k">Prénom</span><span class="v">Moustapha</span></div>
        <div class="info-row"><span class="k">Nom</span><span class="v">Kodjo Amadou</span></div>
        <div class="info-row"><span class="k">Genre</span><span class="v">Masculin</span></div>
        <div class="info-row"><span class="k">Date de naissance</span><span class="v">01/01/1990</span></div>
        <div class="info-row"><span class="k">Lieu de naissance</span><span class="v">Niamey</span></div>
      </div>

      <div class="m-section-h">Informations complémentaires</div>
      <div class="info-card">
        <div class="info-row"><span class="k">Profession</span><span class="v">Software Engineer</span></div>
        <div class="info-row"><span class="k">Pays de résidence</span><span class="v">Niger</span></div>
        <div class="info-row"><span class="k">Ville de résidence</span><span class="v">Niamey</span></div>
        <div class="info-row"><span class="k">Adresse de domicile</span><span class="v">Quartier Rhodésie</span></div>
      </div>

      <div class="m-section-h">Information de la pièce</div>
      <div class="info-card">
        <div class="info-row"><span class="k">Type</span><span class="v">CNI</span></div>
        <div class="info-row"><span class="k">Numéro de la pièce</span><span class="v" :style="{ fontFamily: 'var(--font-mono)' }">NER · 0028574</span></div>
        <div class="info-row"><span class="k">Date de création</span><span class="v">14/03/2021</span></div>
        <div class="info-row"><span class="k">Date d'expiration</span><span class="v">14/03/2031</span></div>
        <div class="info-row"><span class="k">Autorité émettrice</span><span class="v">DGD&nbsp;Niamey</span></div>
      </div>
      <div :style="{ height: '24px' }" />
    </div>
  </div>
</template>
