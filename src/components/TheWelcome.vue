
<template>
  <h2>{{ title }}</h2>
  <div class="container">
    <div class="about-component">
      <h1>Willkommen auf unserer Webseite - </h1>
      <h1>Hier findest du alle Informationen rund um die FIFA Klub-WM 2025</h1>
    </div>
  </div>
</template>

<script setup>

// Props für Titel
defineProps(['title']);
</script>


<style scoped>
.container {
  display: flex;
  justify-content: center; /* Zentriert Inhalte horizontal */
  align-items: center; /* Zentriert Inhalte vertikal */
  height: 50vh;
}

h2 {
  /* Überschrift */
  text-align: center;
  color: #32CD32;
  font-size: 34px;
  margin-bottom: 20px;
}

.about-component {
  font-family: Arial, sans-serif;
  text-align: center;
}

h1 {
  color: #32CD32;
  font-size: 34px;
}

p {
  color: #32CD32;
  font-size: 20px;
}
</style>
