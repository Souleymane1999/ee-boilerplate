<script setup>
// Ported from mobile/components.jsx `TabBar`.
defineProps({
  current: { type: String, default: 'home' },
})
const emit = defineEmits(['nav'])
</script>

<template>
  <div class="tabbar">
    <div :class="`tab ${current === 'home' ? 'active' : ''}`" @click="emit('nav', 'home')">
      <Icon name="home" /><span>Accueil</span>
    </div>
    <div :class="`tab ${current === 'activity' ? 'active' : ''}`" @click="emit('nav', 'activity')">
      <Icon name="list" /><span>Historique</span>
    </div>
    <div class="tab send" @click="emit('nav', 'send')">
      <Icon name="arrow-up-right" /><span>Envoyer</span>
    </div>
    <div :class="`tab ${current === 'cards' ? 'active' : ''}`" @click="emit('nav', 'cards')">
      <Icon name="credit-card" /><span>Carte</span>
    </div>
    <div :class="`tab ${current === 'more' ? 'active' : ''}`" @click="emit('nav', 'more')">
      <Icon name="circle-user" /><span>Plus</span>
    </div>
  </div>
</template>
