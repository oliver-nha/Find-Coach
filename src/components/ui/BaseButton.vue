<script setup>
defineProps({
  link: {
    type: Boolean,
    required: false,
    default: false
  },
  to:{
    type: String,
    required: false,
    default: '/'
  },
  mode:{
    type: String,
    required: false,
    default: null
  }
})
</script>

<template>
  <button  v-if="!link" :class="mode">
    <slot></slot>
  </button>
  <router-link v-else :to="to" :class="mode">
    <slot></slot>
  </router-link>
</template>

<style scoped>
a,button {
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.3s ease;
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
</style>

