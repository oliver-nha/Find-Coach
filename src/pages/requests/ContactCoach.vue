<script setup>
import { reactive, ref } from 'vue';
import { useRequestsStore } from '@/stores/requests/index.js'
import { useRoute, useRouter } from 'vue-router'

// Reactive state to store form data
const data = reactive({
  email: '',
  message: '',
});
const requestStore = useRequestsStore();
const route = useRoute();
const router = useRouter();
// Reactive state for overall form validity
const formIsValid = ref(true);

// Form submission logic
const submitForm = () => {
  validateForm();

  // If form is not valid, stop submission
  if (!formIsValid.value) {
    console.warn('Form is invalid. Please fix the errors!');
    return;
  }

  // Submit the form data (e.g., to an API or parent component)
  requestStore.addRequest({
    message: data.message,
    email: data.email,
    coachId: route.params.id
  });

  router.replace('/coaches');
};

// Validation logic
const validateForm = () => {
  formIsValid.value = true;

  // Validate email
  if (!data.email || !isValidEmail(data.email)) {
    formIsValid.value = false;
    console.error('Invalid email');
  }

  // Validate message
  if (!data.message.trim()) {
    formIsValid.value = false;
    console.error('Message cannot be empty');
  }
};

// Helper function to validate email format
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
</script>

<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ 'invalid': !formIsValid && !data.email }">
      <label for="email">Your Email</label>
      <input
        type="email"
        id="email"
        placeholder="Enter your email"
        v-model.trim="data.email"
      />
      <span v-if="!formIsValid && !data.email" class="error-msg">
        Please enter a valid email.
      </span>
    </div>

    <div class="form-control" :class="{ 'invalid': !formIsValid && !data.message }">
      <label for="message">Message</label>
      <textarea
        id="message"
        rows="5"
        placeholder="Write your message"
        v-model.trim="data.message"
      ></textarea>
      <span v-if="!formIsValid && !data.message" class="error-msg">
        Message cannot be empty.
      </span>
    </div>

    <div class="actions">
      <base-button mode="submit-btn">Submit</base-button>
    </div>
  </form>
</template><style scoped>
/* General form styling */
form {
  max-width: 500px;
  margin: 2rem auto;
  padding: 1.5rem;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Form control styles */
.form-control {
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
}

label {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
}

input,
textarea {
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  padding: 0.8rem;
  width: 100%;
  transition: border-color 0.3s ease;
}

input:focus,
textarea:focus {
  border-color: #6200ee;
  outline: none;
}

textarea {
  resize: none;
  line-height: 1.5;
  height: auto;
}

/* Invalid input styles */
.invalid input,
.invalid textarea {
  border-color: #e63946;
  background-color: #ffeef0;
}

.invalid label {
  color: #e63946;
}

.error-msg {
  color: #e63946;
  font-size: 0.85rem;
  margin-top: 0.3rem;
}

/* Submit button styles */
.actions {
  display: flex;
  justify-content: flex-end;
}



/* Responsive styles */
@media (max-width: 768px) {
  form {
    padding: 1rem;
    margin: 1rem;
  }

  .submit-btn {
    width: 100%;
    text-align: center;
  }
}
</style>
