
<script setup>

import CoachForm from '@/components/coaches/CoachForm.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import { useCoachesStore } from '@/stores/coaches/index.js'
import { useRouter } from 'vue-router'

const coachesStore = useCoachesStore();
const router = useRouter();
const saveData = async(data) => {
  await coachesStore.registerCoach(data);
  router.replace('/coaches');
}
</script>

<template>
<section>
  <base-card class="card">
    <h2>Register as a coach now!</h2>
    <coach-form @save-data="saveData "></coach-form>
  </base-card>
</section>
</template>

<style scoped>

</style>
