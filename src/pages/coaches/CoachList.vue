<script setup>
  import { useCoachesStore } from '@/stores/coaches/index.js'

  const coachesStore =  useCoachesStore();
</script>

<template>
  <section>Filter</section>
  <section>
    <div class="controls">
      <button>Refresh</button>
      <router-link to="/register">Register as Coach</router-link>
    </div>
    <ul v-if="coachesStore.hasCoaches">
      <li v-for="coach in coachesStore.getCoaches" :key="coach.id" >
        {{ coach.firstName}}
      </li>
    </ul>
    <h3 v-else>No coaches found.</h3>
  </section>
</template>

<style scoped>

</style>
