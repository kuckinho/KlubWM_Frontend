
<template>
  <h3>{{ title }}</h3>
  <div class="container">
    <div class="about-component">
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

</style>
