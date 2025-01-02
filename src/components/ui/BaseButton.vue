<template>
  <button v-if="!link" :class="['base-button', mode]">
    <slot></slot>
  </button>
  <router-link v-else :to="to" :class="['base-button', mode]">
    <slot></slot>
  </router-link>
</template>

<script setup>
defineProps({
  link: {
    type: Boolean,
    required: false,
    default: false
  },
  to: {
    type: String,
    required: false,
    default: '/'
  },
  mode: {
    type: String,
    required: false,
    default: 'primary'
  }
});
</script>

<style scoped>
a,button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.875rem;
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;
  outline: none;
}


.outline{
  background-color: #0d9488;
  color: white;
  border: none;
  cursor: pointer;
}
.outline:hover {
  background-color: #0f766e;
}
.flat {
  background-color: #ccfbf1;
  color: #115e59;
}
.flat:hover {
  background-color: #99f6e4;
}

.submit-btn {
  background-color: #059669;
  color: white;
  font-weight: 600;
  padding: 0.875rem 1.75rem;
}

.submit-btn:hover {
  background-color: #047857;
  transform: translateY(-1px);
}

.submit-btn:focus {
  box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.3);
}

@media (max-width: 640px) {
  .base-button {
    padding: 0.625rem 1.25rem;
    font-size: 0.8125rem;
  }
}
</style>
