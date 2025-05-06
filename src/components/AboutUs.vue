
<template>
  <h2>{{ title }}</h2>
  <div class="container">
    <div class="about-component">
      <h1>Das Team hinter den Teams:</h1>
      <p>Johannes Mateyka</p>
      <p>James Kuck</p>
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
