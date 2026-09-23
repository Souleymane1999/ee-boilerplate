<script setup>
// Ported from ui_kits/mobile/PiSPIScreens.jsx (PiSPINotificationsScreen)
import { ref, computed, onMounted, watch } from 'vue'

const props = defineProps({
  filter: { type: String, default: 'unread' },
})

const activeFilter = computed(() => props.filter === 'grouped' ? 'all' : props.filter)
const tabsRef = ref(null)

const scrollActiveIntoView = () => {
  const activeTab = tabsRef.value?.querySelector('button.active')
  if (tabsRef.value && activeTab) {
    tabsRef.value.scrollLeft = Math.max(0, activeTab.offsetLeft - 14)
  }
}
onMounted(scrollActiveIntoView)
watch(activeFilter, scrollActiveIntoView)

const notices = computed(() => props.filter === 'grouped'
  ? PISPI_NOTIFICATIONS
  : PISPI_NOTIFICATIONS.filter(notice => {
    if (activeFilter.value === 'all') return true
    if (activeFilter.value === 'unread') return notice.unread
    return notice.category === activeFilter.value
  }))
const categories = PISPI_NOTIFICATION_CATEGORIES
const groups = computed(() => notices.value.reduce((acc, notice) => {
  acc[notice.day] = acc[notice.day] || []
  acc[notice.day].push(notice)
  return acc
}, {}))
</script>

<template>
  <div class="phone-screen pispi-screen" data-screen-label="PiSPI Notifications">
    <StatusBar />
    <MNav title="Notifications" />
    <div class="pispi-content compact">
      <div class="pispi-notification-tabs" aria-label="Catégories de notifications" ref="tabsRef">
        <button v-for="category in categories" :key="category.key" :class="category.key === activeFilter ? 'active' : ''">{{ category.label }}</button>
      </div>
      <section v-for="[day, rows] in Object.entries(groups)" class="pispi-notification-group" :key="day">
        <div class="pispi-date-group">{{ day }}</div>
        <div class="pispi-option-list">
          <button v-for="notice in rows" class="pispi-option-row" :key="`${day}-${notice.title}`">
            <span :class="`icon ${notice.tone}`"><Icon :name="notice.icon" /></span>
            <span class="body"><strong>{{ notice.title }}</strong><small>{{ notice.text }}</small></span>
            <span :class="`pill-badge ${notice.tone}`">{{ notice.badge }}</span>
          </button>
        </div>
      </section>
    </div>
  </div>
</template>
