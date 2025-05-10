
<template>
  <h3>{{ title }}</h3>

  <div class="home-page">
    <section class="image">
      <img src="/TournamentTreeGroups.png" alt="Bild 1" class="gallery-image" />
    </section>
  </div>
</template>


<script setup>
// Props für Titel
defineProps(['title']);
</script>


<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  align-items: center;

}
</style>
