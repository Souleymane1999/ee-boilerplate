<script setup>
// Ported from ui_kits/mobile/PiSPIScreens.jsx (PiSPICategoriesScreen)
const cats = [['home','Logement'], ['shopping-bag','Shopping'], ['utensils','Restaurant'], ['heart-pulse','Soins'], ['plane','Voyage'], ['ellipsis','Autre']]
</script>

<template>
  <div class="phone-screen pispi-screen" data-screen-label="PiSPI Catégories">
    <StatusBar />
    <MNav title="Catégories">
      <template #right>
        <button class="btn"><Icon name="plus" /></button>
      </template>
    </MNav>
    <div class="pispi-content compact">
      <div class="pispi-category-grid">
        <button v-for="[icon, label] in cats" :key="label"><span><Icon :name="icon" /></span><strong>{{ label }}</strong><small>Analytique</small></button>
      </div>
    </div>
  </div>
</template>
