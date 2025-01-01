<script setup>
import { reactive } from 'vue';

// Emit event for parent communication
const emit = defineEmits(['save-data']);

// Form data state with `reactive` for reactivity
const data = reactive({
  firstName: '',
  lastName: '',
  description: '',
  hourlyRate: 0,
  areas: []
});

// Form submission handler
const submitForm = () => {
  const coachData = {
    first: data.firstName,
    last: data.lastName,
    desc: data.description,
    rate: data.hourlyRate,
    areas: data.areas
  };

  console.log(coachData); // Debugging/logging form data
  emit('save-data', coachData); // Emit the event with form data
};
</script>

<template>
  <form @submit.prevent="submitForm">
    <!-- First Name Field -->
    <div class="form-control">
      <label for="firstname">First Name</label>
      <input
        type="text"
        id="firstname"
        v-model.trim="data.firstName"
        placeholder="Enter first name"
      />
    </div>

    <!-- Last Name Field -->
    <div class="form-control">
      <label for="lastname">Last Name</label>
      <input
        type="text"
        id="lastname"
        v-model.trim="data.lastName"
        placeholder="Enter last name"
      />
    </div>

    <!-- Description Field -->
    <div class="form-control">
      <label for="description">Description</label>
      <textarea
        id="description"
        rows="5"
        v-model.trim="data.description"
        placeholder="Write a short description"
      ></textarea>
    </div>

    <!-- Hourly Rate Field -->
    <div class="form-control">
      <label for="rate">Hourly Rate</label>
      <input
        type="number"
        id="rate"
        v-model.number="data.hourlyRate"
        min="0"
      />
    </div>

    <!-- Areas of Expertise Field -->
    <div class="form-control">
      <h3>Areas of Expertise</h3>
      <div>
        <input
          type="checkbox"
          id="frontend"
          value="frontend"
          v-model="data.areas"
        />
        <label for="frontend">Frontend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="backend"
          value="backend"
          v-model="data.areas"
        />
        <label for="backend">Backend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="career"
          value="career"
          v-model="data.areas"
        />
        <label for="career">Career Advisory</label>
      </div>
    </div>

    <!-- Submit Button -->
    <base-button mode="outline">Register</base-button>
  </form>
</template>

<style scoped>
/* Your existing styles with minor refinements for consistency */

.form-control {
  margin: 1rem 0;
}

label {
  font-weight: 600;
  display: block;
  margin-bottom: 0.75rem;
  color: #2c3e50;
}

input[type="checkbox"] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.75rem;
  cursor: pointer;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font: inherit;
  padding: 0.75rem;
  transition: all 0.3s ease;
}

input:focus,
textarea:focus {
  background-color: #f8f4ff;
  outline: none;
  border-color: #5b21b6;
  box-shadow: 0 0 0 3px rgba(91, 33, 182, 0.1);
}

input[type="checkbox"] {
  display: inline;
  width: auto;
  border: none;
  cursor: pointer;
  margin-right: 0.5rem;
}

input[type="checkbox"]:focus {
  outline: #5b21b6 solid 2px;
  outline-offset: 2px;
}

h3 {
  margin: 1rem 0;
  font-size: 1.1rem;
  color: #2c3e50;
}

.invalid label {
  color: #dc2626;
}

.invalid input,
.invalid textarea {
  border: 2px solid #dc2626;
  background-color: #fef2f2;
}

/* Add hover states */
input:hover,
textarea:hover {
  border-color: #5b21b6;
}

/* Style for disabled states */
input:disabled,
textarea:disabled {
  background-color: #f3f4f6;
  cursor: not-allowed;
}

/* Added spacing for checkbox groups */
.form-control div {
  margin: 0.5rem 0;
}

/* Smooth transition effects */
form {
  transition: all 0.3s ease;
}
</style>
