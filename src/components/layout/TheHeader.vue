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
  width: 100%;
  height: 4rem;
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

header a {
  text-decoration: none;
  color: #e0e7ff;
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  transition: all 0.3s ease;
}

a:active,
a:hover,
a.router-link-active {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  transform: translateY(-1px);
}

h1 {
  margin: 0;
  font-weight: 600;
}

h1 a {
  color: white;
  font-size: 1.25rem;
  padding: 0.5rem 0;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  background-color: transparent;
  transform: none;
}

header nav {
  width: 90%;
  max-width: 1200px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 1rem;
  align-items: center;
}

li {
  margin: 0;
}

@media (max-width: 640px) {
  header {
    height: auto;
    padding: 1rem 0;
  }

  header nav {
    flex-direction: column;
    gap: 1rem;
  }

  header ul {
    width: 100%;
    justify-content: center;
  }
}
</style>
