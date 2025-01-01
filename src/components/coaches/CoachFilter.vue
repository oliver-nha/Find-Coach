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
    <div class="filter-options-container">
      <div class="filter-option" :class="{ active: filters.frontend }">
        <input type="checkbox" id="frontend" v-model="filters.frontend" @change="setFilter">
        <label for="frontend">Frontend</label>
      </div>
      <div class="filter-option" :class="{ active: filters.backend }">
        <input type="checkbox" id="backend" v-model="filters.backend" @change="setFilter">
        <label for="backend">Backend</label>
      </div>
      <div class="filter-option" :class="{ active: filters.career }">
        <input type="checkbox" id="career" v-model="filters.career" @change="setFilter">
        <label for="career">Career</label>
      </div>
    </div>
  </base-card>
</template>

<style scoped>
h2 {
  margin: 1rem 0 1.5rem 0;
  color: #2c3e50;
  font-size: 1.5rem;
  font-weight: 600;
}

.filter-options-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.filter-option {
  position: relative;
  padding: 0.5rem 1rem;
  background-color: #f8fafc;
  border-radius: 8px;
  transition: all 0.2s ease;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  border: 2px solid #e2e8f0;
}

.filter-option:hover {
  background-color: #f1f5f9;
  border-color: #94a3b8;
}

.filter-option input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  width: 1.2rem;
  height: 1.2rem;
  border: 2px solid #94a3b8;
  border-radius: 4px;
  margin: 0;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
}

.filter-option input[type="checkbox"]:checked {
  background-color: #5b21b6;
  border-color: #5b21b6;
}

.filter-option input[type="checkbox"]:checked::after {
  content: "✓";
  position: absolute;
  color: white;
  font-size: 0.8rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.filter-option input[type="checkbox"]:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(91, 33, 182, 0.2);
}

.filter-option label {
  margin-left: 0.5rem;
  font-size: 0.95rem;
  color: #4b5563;
  cursor: pointer;
  user-select: none;
}

.filter-option.active {
  background-color: #f8f4ff;
  border-color: #5b21b6;
}

.filter-option.active label {
  font-weight: 600;
  color: #5b21b6;
}

/* Animation for checkbox */
.filter-option input[type="checkbox"] {
  transform-origin: center;
}

.filter-option input[type="checkbox"]:checked {
  animation: checkbox-pop 0.2s ease-in-out;
}

@keyframes checkbox-pop {
  0% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .filter-option {
    padding: 0.75rem;
    width: 100%;
  }

  h2 {
    font-size: 1.25rem;
    margin: 0.75rem 0 1rem 0;
  }
}
</style>
