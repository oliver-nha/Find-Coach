<template>
  <base-dialog :show="!!error" title="An error occurred!"  @close="error = null">
    <p>{{ error }}</p>
  </base-dialog>
  <section>
    <base-card>
      <header>
        <h2>Requests Received</h2>
      </header>
      <div v-if="isLoading">
        <base-spinner />
      </div>
      <ul v-else-if="!isLoading &&  store.hasRequests">
        <request-item
          v-for="req in store.getRequests"
          :key="req.id"
          :email="req.userEmail"
          :message="req.message"
        ></request-item>
      </ul>
      <h3 v-else>You haven't received any requests yet!</h3>
    </base-card>
  </section>
</template>

<script setup>


import RequestItem from '@/components/requests/RequestItem.vue'
import { useRequestsStore } from '@/stores/requests/index.js'
import { onMounted, ref } from 'vue'
import BaseDialog from '@/components/ui/BaseDialog.vue'
import BaseSpinner from '@/components/ui/BaseSpinner.vue'

const store = useRequestsStore();
const isLoading = ref(false);
const error = ref(null);
const loadRequests = async () => {
  isLoading.value = true;
  try{
    await store.loadRequests();
  } catch (err) {
    error.value = err.message || 'Something went wrong!';
  }
  isLoading.value = false;
}

onMounted(() => {
  loadRequests();
})
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
