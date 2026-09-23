<script setup>
// Ported from web_app/components.jsx `Topbar`.
</script>

<template>
  <header class="topbar">
    <div class="topbar-search">
      <Icon name="search" />
      <input placeholder="Search transactions, recipients, references…" />
    </div>
    <div class="topbar-actions">
      <slot />
      <button class="icon-btn"><Icon name="bell" /></button>
      <button class="icon-btn"><Icon name="circle-help" /></button>
      <span class="avatar">JA</span>
    </div>
  </header>
</template>
