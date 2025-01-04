<script setup>
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { computed, ref } from 'vue'

const email = ref('');
const password = ref('');
const formIsValid = ref(true);
const mode = ref('login');
const submitForm = () => {
  if (email.value === '' || email.value.indexOf('@') === -1 || password.value === '' || password.value.length < 6) {
    formIsValid.value = false;
    return;
  }
  formIsValid.value = true;
  if (mode.value === 'login') {
    console.log('Login');
  }
}
const switchAuthMode = () => {
  if (mode.value === 'login') {
    mode.value = 'signup';
  } else {
    mode.value = 'login';
  }
}
const submitButtonCaption = computed(() => {
  if(mode.value === 'login') {
    return 'Login';
  } else {
    return 'Signup';
  }
})
const switchModeButtonCaption = computed(() => {
  if(mode.value === 'login') {
    return 'Signup Instead';
  } else {
    return 'Login Instead';
  }
})
</script>

<template>
  <base-card class="card">
    <form @submit.prevent="submitForm" class="login-form">
      <div class="form-control">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div class="form-control">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <p v-if="!formIsValid">Please enter a valid email and password (at least 6 characters</p>
      <div class="button-group">
        <base-button mode="submit-btn">{{ submitButtonCaption }}</base-button>
        <base-button type="button" mode="flat" @click="switchAuthMode">{{ switchModeButtonCaption }}</base-button>
      </div>
    </form>
  </base-card>
</template>

<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 1rem;
}

.form-control {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-control label {
  color: #374151;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.form-control input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  color: #1f2937;
  background-color: white;
  transition: all 0.2s ease;
}

.form-control input:hover {
  border-color: #9ca3af;
}

.form-control input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.form-control input::placeholder {
  color: #9ca3af;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

@media (max-width: 640px) {
  .login-form {
    padding: 0.75rem;
  }

  .form-control input {
    padding: 0.625rem 0.875rem;
    font-size: 0.9375rem;
  }

  .button-group {
    gap: 0.5rem;
  }
}

</style>
