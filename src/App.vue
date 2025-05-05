<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div>
    <header>
      <div class="wrapper">
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
          <RouterLink to="/clubs">Clubs</RouterLink>
          <RouterLink to="/timer">Timer</RouterLink>
        </nav>
      </div>
    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #cfc;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  justify-content: center;
}

nav {
  width: 100%;
  font-size: 22px;
  text-align: center;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  color: black;
}

nav a.router-link-active {
  color: dodgerblue;
  background-color: transparent;
}

nav a:first-of-type {
  border: 0;
}

main {
  padding-top: 60px; /* Anpassung für Platz unter der fixierten Navigationsleiste */
}

</style>
