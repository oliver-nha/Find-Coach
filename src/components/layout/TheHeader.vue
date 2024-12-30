<script setup>

</script>

<template>
  <header>
    <nav>
      <h1><router-link to="/">Find a Coach</router-link></h1>
      <ul>
        <li><router-link to="/coaches">All Coaches</router-link></li>
        <li><router-link to="/requests">Request</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
header {
  background: linear-gradient(to right, #0d9488, #115e59);
  padding: 0 1rem;
}

nav {
  max-width: 1200px;
  margin: 0 auto;
  height: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h1 {
  margin: 0;
  font-size: 1.5rem;
}

h1 a {
  color: white;
  text-decoration: none;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 1.5rem;
}

nav a {
  color: #99f6e4;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.3s ease;
}

nav a:hover,
nav a.router-link-active {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

@media (max-width: 640px) {
  nav {
    flex-direction: column;
    height: auto;
    padding: 1rem 0;
    gap: 1rem;
  }

  ul {
    justify-content: center;
    width: 100%;
  }
}
</style>
