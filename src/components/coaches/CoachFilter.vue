<script setup>
import { reactive } from 'vue'

const emit = defineEmits(['change-filter'])

const filters = reactive({
  frontend: true,
  backend: true,
  career: true
})

const setFilter = (event) => {
  const inputId = event.target.id
  const isActive = event.target.checked
  filters[inputId] = isActive
  emit('change-filter', { ...filters }) // Emit the updated filters
}
</script>

<template>
  <base-card>
    <h2>Find a Coach</h2>
    <div class="filter-option">
      <input type="checkbox" id="frontend" v-model="filters.frontend" @change="setFilter">
      <label for="frontend">Frontend</label>
    </div>
    <div class="filter-option">
      <input type="checkbox" id="backend" v-model="filters.backend" @change="setFilter">
      <label for="backend">Backend</label>
    </div>
    <div class="filter-option">
      <input type="checkbox" id="career" v-model="filters.career" @change="setFilter">
      <label for="career">Career</label>
    </div>
  </base-card>
</template>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>
