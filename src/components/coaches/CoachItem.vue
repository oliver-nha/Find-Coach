<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
const route = useRoute();
const props =defineProps([
  'id',
  'firstName',
  'lastName',
  'rate',
  'areas'
])

const fullName = computed(() => {
  return `${props.firstName} ${props.lastName}`
});

const coachContactLink = computed(() => {
  return `${route.path}/${props.id}/contact`;
})
const coachDetailsLink = computed(() => {
  return `${route.path}/${props.id}`;
})
</script>

<template>
  <div class="coach-card">
    <div class="coach-info">
      <h3>{{ fullName }}</h3>
      <p class="rate">${{ rate }}/hour</p>
    </div>
    <div class="areas">
      <base-badge  v-for="area in areas" :key="area" :type="area" :title="area">{{ area }}</base-badge>
    </div>
    <div class="actions">
      <base-button link mode="outline" :to="coachDetailsLink">View Details</base-button>
      <base-button link mode="flat" :to="coachContactLink">Contact</base-button>
    </div>
  </div>
</template>

<style scoped>
.coach-card {
  background: rgba(100, 216, 154, 0.53);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.coach-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.coach-info h3 {
  margin: 0;
  color: #1f2937;
}
.rate {
  color: #0d9488;
  font-size: 1.125rem;
  font-weight: 500;
  margin: 0.5rem 0 1rem;
}

.areas {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.actions {
  display: flex;
  gap: 1rem;
}

</style>
