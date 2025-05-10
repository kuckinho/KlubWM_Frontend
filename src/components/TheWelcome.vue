
<template>
  <h3>{{ title }}</h3>
    <h2>Hier findest du Informationen und Funktionen rund um die FIFA Klub-WM 2025</h2>

    <section class="gallery-image">
    <img src="/Home1.png" alt="Bild 1" class="gallery-image" />
    </section>
</template>


<script setup>
// Props für Titel
defineProps(['title']);
</script>


<style scoped>
.gallery-image {
  width: 1900px;
  height: auto;
  display: block;
}
</style>
