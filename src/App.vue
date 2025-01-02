<script setup>
import { RouterView } from 'vue-router'
import TheHeader from '@/components/layout/TheHeader.vue'

</script>

<template>
  <TheHeader />
  <router-view v-slot="{ Component }">
    <transition name="route" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

* {
  box-sizing: border-box;
}

html {
  font-family: "Roboto", sans-serif;
}

body {
  margin: 0;
}
.route-enter-from,
.route-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.route-enter-active,
.route-leave-active {
  transition: all 0.3s ease-out;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
