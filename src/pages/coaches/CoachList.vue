<script setup>
import { useCoachesStore } from '@/stores/coaches/index.js'
import CoachItem from '@/components/coaches/CoachItem.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const coachesStore = useCoachesStore()
</script>

<!-- CoachesList.vue -->
<template>
  <div class="container">
    <section class="filter-section">Filter</section>
    <section class="coaches-section">
     <base-card>
       <div class="controls">
         <base-button mode="outline" >Refresh</base-button>
         <base-button link to="/register" mode="flat">Register as Coach</base-button>
       </div>
       <div v-if="coachesStore.hasCoaches" class="coaches-grid">
         <coach-item v-for="coach in coachesStore.coaches" :key="coach.id" :id="coach.id"
                     :firstName="coach.firstName" :lastName="coach.lastName" :rate="coach.hourlyRate"
                     :areas="coach.areas" />
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

.filter-section {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.controls {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
}



.coaches-grid {
  display: grid;
  grid-template-columns:1fr 1fr;
  gap: 1.5rem;
}

.no-coaches {
  text-align: center;
  color: #4b5563;
  font-size: 1.25rem;
  padding: 3rem 0;
}
</style>
