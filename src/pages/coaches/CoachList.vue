<script setup>
import { useCoachesStore } from '@/stores/coaches/index.js'
import CoachItem from '@/components/coaches/CoachItem.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseSpinner from '@/components/ui/BaseSpinner.vue';
import CoachFilter from '@/components/coaches/CoachFilter.vue'
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'
import BaseDialog from '@/components/ui/BaseDialog.vue'

const coachesStore = useCoachesStore();
const activeFilters = reactive({
  frontend: true,
  backend: true,
  career: true,
});

const isLoading = ref(true);
const error = ref(null);

// Load coaches on component mount
onMounted(async () => {
  isLoading.value = true;
  await loadCoaches();
  isLoading.value = false;
});
onUnmounted(() =>{
  coachesStore.setFetchTimestamp();
})

const setFilter = (updatedFilters) => {
  Object.assign(activeFilters, updatedFilters);
};

const filteredCoaches = computed(() =>
  coachesStore.coaches.filter((coach) =>
    Object.keys(activeFilters).some(
      (filter) => activeFilters[filter] && coach.areas.includes(filter)
    )
  )
);

const loadCoaches = async (refresh = false) => {
  isLoading.value = true;
  try {
    await coachesStore.loadCoaches(refresh);
  } catch (err) {
    error.value = err.message || 'Something went wrong!';
  }
  isLoading.value = false;
};

</script>

<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occurred!"
      @close="error = null"
    >
      <p>{{ error }}</p>
    </base-dialog>

    <div class="container">
      <coach-filter @change-filter="setFilter" />

      <section class="coaches-section">
        <base-card>
          <div class="controls">
            <base-button
              mode="outline"
              @click="loadCoaches(true)"
              :disabled="isLoading"
            >
              {{ isLoading ? 'Loading...' : 'Refresh' }}
            </base-button>

            <base-button
              v-if="!isLoading && !coachesStore.hasCoaches"
              link
              to="/register"
              mode="flat"
            >
              Register as Coach
            </base-button>
          </div>

          <div v-if="isLoading" class="spinner-container">
            <base-spinner />
          </div>

          <div
            v-else-if="coachesStore.hasCoaches"
            class="coaches-grid"
          >
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

          <h3 v-else class="no-coaches">
            No coaches found.
          </h3>
        </base-card>
      </section>
    </div>
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
