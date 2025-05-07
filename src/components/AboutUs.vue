
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
/* Container-Stil für Zentrierung horizontal und vertikal */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
}

/* Formatierung Titel */
h2 {
  text-align: center;
  color: #32CD32;
  font-size: 34px;
  margin-bottom: 20px;
  margin-top: 20px;
}

/* Formatierung Überschrift */
h1 {
  color: #32CD32;
  font-size: 30px;
  text-align: center;
}

/* Formatierung Text */
p {
  color: #32CD32;
  font-size: 20px;
  text-align: center;
}
</style>
