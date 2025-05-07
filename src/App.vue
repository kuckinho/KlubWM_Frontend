
<template>
  <div>
    <header>
      <div class="wrapper">
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
          <RouterLink to="/clubs">Clubs</RouterLink>
          <RouterLink to="/stadiums">Stadiums</RouterLink>
          <RouterLink to="/timer">Timer</RouterLink>
        </nav>
      </div>
    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>


<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>


<style scoped>
/* Formatierung Navigationsleiste */
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

/* Formatierung Navigationsleiste Größe */
.wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  justify-content: center;
}

/* Formatierung Navigationsleiste Größe Links */
nav {
  width: 100%;
  font-size: 22px;
  text-align: center;
}

/* Formatierung Navigationsleiste nicht aktiver Link */
nav a {
  display: inline-block;
  padding: 0 1rem;
  color: black;
}

/* Formatierung Navigationsleiste aktiver Link */
nav a.router-link-active {
  color: #32CD32;
  background-color: transparent;
  font-weight: bold;
}

/* Formatierung Navigationsleiste Links */
nav a:first-of-type {
  border: 0;
}

/* Hauptinhalt durch Navigationsleiste anpassen */
main {
  padding-top: 60px;
}

</style>
