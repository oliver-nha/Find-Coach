<template>
  <teleport to="body">
    <div v-if="show" @click="tryClose" class="backdrop"></div>
    <dialog open v-if="show">
      <header>
        <slot name="header">
          <h2>{{ title }}</h2>
        </slot>
      </header>
      <section>
        <slot></slot>
      </section>
      <menu v-if="!fixed">
        <slot name="actions">
          <base-button mode="outline" @click="tryClose">Close</base-button>
        </slot>
      </menu>
    </dialog>
  </teleport>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    required: false,
  },
  fixed: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emit = defineEmits(['close']);

const tryClose = () => {
  if (props.fixed) {
    return;
  }
  emit('close');
};
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(50, 50, 50, 0.7);
  backdrop-filter: blur(4px);
  z-index: 10;
  transition: background-color 0.3s ease, opacity 0.3s ease;
}

dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 40rem;
  z-index: 100;
  border-radius: 16px;
  border: none;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
  0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 0;
  margin: 0;
  overflow: hidden;
  background-color: #e3f2fd;
  transition: background-color 0.3s ease;
  animation: modal-appear 0.3s ease-out forwards;
}

header {
  background-color: #333;
  color: #f5f5f5;
  transition: background-color 0.3s ease, color 0.3s ease;
  width: 100%;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

header h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

section {
  padding: 1.5rem;
  line-height: 1.6;
}

menu {
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin: 0;
  border-top: 1px solid #e5e7eb;
  background-color: #444;
  color: #f5f5f5;
  transition: background-color 0.3s ease, color 0.3s ease;
}

@keyframes modal-appear {
  from {
    opacity: 0;
    transform: translate(-50%, -60%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}

@media (min-width: 768px) {
  dialog {
    width: 40rem;
  }
}
</style>


