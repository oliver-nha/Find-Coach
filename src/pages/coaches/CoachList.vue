<script setup>
import { useCoachesStore } from '@/stores/coaches/index.js'
import CoachItem from '@/components/coaches/CoachItem.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import CoachFilter from '@/components/coaches/CoachFilter.vue'
import { computed, onMounted, reactive } from 'vue'

const coachesStore = useCoachesStore();
onMounted(() => {
  coachesStore.loadCoaches();
});
const activeFilters = reactive({
  frontend: true,
  backend: true,
  career: true
})

const setFilter = (updatedFilters) => {
  activeFilters.frontend = updatedFilters.frontend
  activeFilters.backend = updatedFilters.backend
  activeFilters.career = updatedFilters.career
}

const filteredCoaches = computed(() => {
  return coachesStore.coaches.filter(coach => {
    return (
      (activeFilters.frontend && coach.areas.includes('frontend')) ||
      (activeFilters.backend && coach.areas.includes('backend')) ||
      (activeFilters.career && coach.areas.includes('career'))
    )
  })
})

const loadCoaches = () => {
  coachesStore.loadCoaches();
}
</script>

<template>
  <div class="container">
    <coach-filter @change-filter="setFilter" />
    <section class="coaches-section">
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches">Refresh</base-button>
          <base-button link to="/register" mode="flat">Register as Coach</base-button>
        </div>
        <div v-if="filteredCoaches.length > 0" class="coaches-grid">
          <coach-item
            v-for="coach in filteredCoaches"
            :key="coach.id"
            :id="coach.id"
            :firstName="coach.firstName"
            :lastName="coach.lastName"
            :rate="coach.hourlyRate"
            :areas="coach.areas"
          />
        </div>
        <h3 v-else class="no-coaches">No coaches found.</h3>
      </base-card>
    </section>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.controls {
  display: flex;
  justify-content: space-between;
  margin: 2rem 0;
}

.coaches-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.no-coaches {
  text-align: center;
  color: #4b5563;
  font-size: 1.25rem;
  padding: 3rem 0;
}
</style>
