
<template>
  <h3>{{ title }}</h3>

  <section class="gallery-image">
    <img src="/Gallery1.jpeg" class="gallery-image" />
    <img src="/Gallery2.png" class="gallery-image" />
    <img src="/Gallery3.png" class="gallery-image" />
    <img src="/Gallery4.jpeg" class="gallery-image" />
    <img src="/Gallery5.png" class="gallery-image" />
    <img src="/Gallery6.jpeg" class="gallery-image" />
    <img src="/Gallery7.jpeg" class="gallery-image" />
    <img src="/Gallery8.jpeg" class="gallery-image" />
    <img src="/Gallery9.jpeg" class="gallery-image" />
    <img src="/Gallery10.jpg" class="gallery-image" />
    <img src="/Gallery11.jpeg" class="gallery-image" />
    <img src="/Gallery12.jpeg" class="gallery-image" />
  </section>
</template>


<script setup>
// Props für Titel
defineProps(['title']);
</script>


<style scoped>
.gallery-image {
  width: 1500px;
  height: auto;
  display: block;
}
</style>
