<script setup>
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import { computed } from 'vue'
import { useCoachesStore } from '@/stores/coaches/index.js'
import { useRoute } from 'vue-router'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const coachesStore = useCoachesStore()
const route = useRoute()

const coach = computed(() => coachesStore.coaches.find(coach => coach.id === props.id))

const coachDetails = computed(() => ({
  fullName: `${coach.value.firstName} ${coach.value.lastName}`,
  hourlyRate: coach.value.hourlyRate,
  areas: coach.value.areas,
  description: coach.value.description
}))

const contactLink = computed(() => `${route.path}/${props.id}/contact`)
</script>

<template>
  <div class="coach-details">
    <!-- Profile Header Section -->
    <section class="coach-info">
      <base-card>
        <div class="profile-header">
          <div class="avatar">
            <div class="avatar-circle">
              {{ coachDetails.fullName[0] }}
            </div>
          </div>
          <div class="profile-info">
            <h2>{{ coachDetails.fullName }}</h2>
            <div class="rate-badge">
              <span class="rate-amount">${{ coachDetails.hourlyRate }}</span>
              <span class="rate-period">/hour</span>
            </div>
          </div>
        </div>
      </base-card>
    </section>

    <!-- Expertise Section -->
    <section class="expertise-section">
      <base-card>
        <h3 class="section-title">Areas of Expertise</h3>
        <div class="areas">
          <base-badge
            v-for="area in coachDetails.areas"
            :key="area"
            :type="area"
            :title="area"
          />
        </div>
        <div class="description">
          <h3 class="section-title">About Me</h3>
          <p>{{ coachDetails.description }}</p>
        </div>
      </base-card>
    </section>

    <!-- Contact Section -->
    <section class="coach-contact">
      <base-card>
        <div class="contact-container">
          <div class="contact-text">
            <h2>Ready to start your journey?</h2>
            <p>Get in touch to schedule your first session!</p>
          </div>
          <base-button
            mode="outline"
            link
            :to="contactLink"
          >
            Contact Now
          </base-button>
        </div>
        <router-view></router-view>
      </base-card>
    </section>
  </div>
</template>

<style scoped>
.coach-details {
  margin: 2rem auto;
  max-width: 48rem;
  padding: 0 1rem;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 1rem 0;
}

.avatar-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #0d9488;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
}

.profile-info {
  flex: 1;
}

.profile-info h2 {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.rate-badge {
  display: inline-flex;
  align-items: baseline;
  background-color: #ccfbf1;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
}

.rate-amount {
  font-size: 1.5rem;
  font-weight: 600;
  color: #0d9488;
}

.rate-period {
  color: #115e59;
  margin-left: 0.25rem;
}

.section-title {
  font-size: 1.25rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.expertise-section {
  margin: 2rem 0;
}

.areas {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.description {
  margin-top: 2rem;
  line-height: 1.6;
}

.contact-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.contact-text h2 {
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.contact-text p {
  color: #666;
}

@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  .profile-info h2 {
    font-size: 1.5rem;
  }

  .contact-container {
    flex-direction: column;
    text-align: center;
  }
}
</style>
