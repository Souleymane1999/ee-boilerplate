<script setup>
// Ported from mobile/Screens2.jsx `SettingsScreen` — Paramètres client.
import { ref } from 'vue'

const emit = defineEmits(['back'])
const bio = ref(false)
</script>

<template>
  <div class="phone-screen" data-screen-label="Paramètres">
    <StatusBar />
    <MNav title="Paramètres" @back="emit('back')">
      <template #right>
        <button class="btn red"><Icon name="log-out" /></button>
      </template>
    </MNav>

    <div class="content">
      <div class="set-card">
        <div class="set-card-h"><Icon name="circle-user" /><span class="t">Profil</span></div>
        <div class="set-row">
          <div class="ic"><Icon name="shield-check" /></div>
          <div class="lbl">
            <div class="l1">Vérification d'identité</div>
            <div class="l2">KYC — Know Your Customer</div>
          </div>
          <span class="pill-badge warn">Approuvé</span>
        </div>
        <div class="set-row">
          <div class="ic"><Icon name="pencil" /></div>
          <div class="lbl">
            <div class="l1">Mes informations</div>
            <div class="l2">Nom, email, téléphone</div>
          </div>
          <span class="chev"><Icon name="chevron-right" /></span>
        </div>
      </div>

      <div class="set-card">
        <div class="set-card-h"><Icon name="shield" /><span class="t">Sécurité</span></div>
        <div class="set-row">
          <div class="ic"><Icon name="lock" /></div>
          <div class="lbl">
            <div class="l1">Changer le mot de passe</div>
            <div class="l2">Mettre à jour votre mot de passe</div>
          </div>
          <span class="chev"><Icon name="chevron-right" /></span>
        </div>
        <div class="set-row">
          <div class="ic"><Icon name="fingerprint" /></div>
          <div class="lbl">
            <div class="l1">Authentification biométrique</div>
            <div class="l2">Empreinte digitale</div>
          </div>
          <span :class="`m-switch ${bio ? 'on' : ''}`" @click="bio = !bio" />
        </div>
      </div>

      <div class="set-card">
        <div class="set-card-h"><Icon name="help-circle" /><span class="t">Support</span></div>
        <div class="set-row">
          <div class="ic"><Icon name="message-circle-question" /></div>
          <div class="lbl">
            <div class="l1">Centre d'aide</div>
            <div class="l2">FAQ et guides</div>
          </div>
          <span class="chev"><Icon name="chevron-right" /></span>
        </div>
        <div class="set-row">
          <div class="ic"><Icon name="headphones" /></div>
          <div class="lbl">
            <div class="l1">Contacter le support</div>
            <div class="l2">Assistance 7j / 7</div>
          </div>
          <span class="chev"><Icon name="chevron-right" /></span>
        </div>
      </div>

      <div class="set-card">
        <div class="set-card-h"><Icon name="info" /><span class="t">À propos</span></div>
        <div class="set-row">
          <div class="ic"><Icon name="file-text" /></div>
          <div class="lbl">
            <div class="l1">Conditions d'utilisation</div>
            <div class="l2">Version 1.3.5 · 04/2026</div>
          </div>
          <span class="chev"><Icon name="chevron-right" /></span>
        </div>
      </div>
      <div :style="{ height: '16px' }" />
    </div>
  </div>
</template>
