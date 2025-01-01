<script setup>
import { reactive, ref } from 'vue';

// Emit event for parent communication
const emit = defineEmits(['save-data']);

// Form data state with `reactive` for reactivity
const data = reactive({
  firstName: {
    value: '',
    isValid: true,
  },
  lastName: {
    value: '',
    isValid: true,
  },
  description: {
    value: '',
    isValid: true,
  },
  hourlyRate: {
    value: 0,
    isValid: true,
  },
  areas: {
    value: [],
    isValid: true,
  },
});

// State to track overall form validity
const formIsValid = ref(true);

// Validation logic
const validateForm = () => {
  // Reset validity status
  formIsValid.value = true;

  // Validate firstName
  if (!data.firstName.value.trim()) {
    data.firstName.isValid = false;
    formIsValid.value = false;
  } else {
    data.firstName.isValid = true;
  }

  // Validate lastName
  if (!data.lastName.value.trim()) {
    data.lastName.isValid = false;
    formIsValid.value = false;
  } else {
    data.lastName.isValid = true;
  }

  // Validate description
  if (!data.description.value.trim()) {
    data.description.isValid = false;
    formIsValid.value = false;
  } else {
    data.description.isValid = true;
  }

  // Validate hourlyRate
  if (data.hourlyRate.value <= 0 || isNaN(data.hourlyRate.value)) {
    data.hourlyRate.isValid = false;
    formIsValid.value = false;
  } else {
    data.hourlyRate.isValid = true;
  }

  // Validate areas
  if (data.areas.value.length === 0) {
    data.areas.isValid = false;
    formIsValid.value = false;
  } else {
    data.areas.isValid = true;
  }
};

// Function to reset validity of a specific input
const clearValidity = (inputField) => {
  inputField.isValid = true;
};

// Form submission handler
const submitForm = () => {
  validateForm();

  // Check form validity before proceeding
  if (!formIsValid.value) {
    console.warn('Form is invalid. Please correct the errors.');
    return;
  }

  const coachData = {
    first: data.firstName.value,
    last: data.lastName.value,
    desc: data.description.value,
    rate: data.hourlyRate.value,
    areas: data.areas.value,
  };

  console.log(coachData); // Debugging/logging form data
  emit('save-data', coachData); // Emit the event with form data

};
</script>

<template>
  <form @submit.prevent="submitForm">
    <!-- First Name Field -->
    <div
      class="form-control"
      :class="{ invalid: !data.firstName.isValid }">
      <label for="firstname">First Name</label>
      <input
        type="text"
        id="firstname"
        v-model.trim="data.firstName.value"
        placeholder="Enter first name"
        @blur="clearValidity(data.firstName)"
      />
      <span v-if="!data.firstName.isValid" class="error-message">First Name is required!</span>
    </div>

    <!-- Last Name Field -->
    <div
      class="form-control"
      :class="{ invalid: !data.lastName.isValid }"

    >
      <label for="lastname">Last Name</label>
      <input
        type="text"
        id="lastname"
        v-model.trim="data.lastName.value"
        placeholder="Enter last name"
        @blur="clearValidity(data.lastName)"
      />
      <span v-if="!data.lastName.isValid" class="error-message">Last Name is required!</span>
    </div>

    <!-- Description Field -->
    <div
      class="form-control"
      :class="{ invalid: !data.description.isValid }"

    >
      <label for="description">Description</label>
      <textarea
        id="description"
        rows="5"
        v-model.trim="data.description.value"
        placeholder="Write a short description"
        @blur="clearValidity(data.description)"
      ></textarea>
      <span v-if="!data.description.isValid" class="error-message">Description is required!</span>
    </div>

    <!-- Hourly Rate Field -->
    <div
      class="form-control"
      :class="{ invalid: !data.hourlyRate.isValid }"

    >
      <label for="rate">Hourly Rate</label>
      <input
        type="number"
        id="rate"
        v-model.number="data.hourlyRate.value"
        min="0"
        @blur="clearValidity(data.hourlyRate)"
      />
      <span v-if="!data.hourlyRate.isValid" class="error-message">Hourly Rate must be greater than 0!</span>
    </div>

    <!-- Areas of Expertise Field -->
    <div
      class="form-control"
      :class="{ invalid: !data.areas.isValid }"

    >
      <h3>Areas of Expertise</h3>
      <div>
        <input
          type="checkbox"
          id="frontend"
          value="frontend"
          v-model="data.areas.value"
          @blur="clearValidity(data.areas)"
        />
        <label for="frontend">Frontend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="backend"
          value="backend"
          v-model="data.areas.value"
          @blur="clearValidity(data.areas)"
        />
        <label for="backend">Backend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="career"
          value="career"
          v-model="data.areas.value"
          @blur="clearValidity(data.areas)"
        />
        <label for="career">Career Advisory</label>
      </div>
      <span v-if="!data.areas.isValid" class="error-message">Please select at least one area!</span>
    </div>
    <p v-if="!formIsValid" class="error-summary">Please fix the above errors and submit again.</p>
    <!-- Submit Button -->
    <base-button mode="outline">Register</base-button>
  </form>
</template>
<style scoped>
/* Error message style */
.error-message {
  color: #dc2626;
  font-size: 0.9rem;
  margin-top: 0.25rem;
  display: block;
}

.error-summary {
  color: #dc2626;
  font-weight: bold;
  margin-bottom: 1rem;
}

/* Invalid input styles */
.invalid input,
.invalid textarea {
  border: 2px solid #dc2626;
  background-color: #fef2f2;
}

.invalid label {
  color: #dc2626;
}

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
