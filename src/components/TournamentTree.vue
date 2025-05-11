
<template>
  <h3>{{ title }}</h3>

  <div class="home-page">
<!-- Flexibles Container für zentrierte Buttons -->
<div class="button-wrapper">
<a href="https://www.fifa.com/de/tournaments/mens/club-world-cup/usa-2025/scores-and-fixtures"
   target="_blank"
   class="custom-button">
  Zur FIFA-Spielplanübersicht
</a>

<a href="https://www.fifa.com/de/tournaments/mens/club-world-cup/usa-2025/standings"
   target="_blank"
   class="custom-button">
  Zur FIFA-Tabellenübersicht
</a>
</div>

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

.button-wrapper {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

/* Formatierung Button-ähnlicher Link */
.custom-button {
  display: flex;
  padding: 6px 15px;
  border-radius: 50px;
  width: 275px;
  color: #cfc;
  background-color: #003366;
  transition: background-color 0.3s;
  justify-content: center;
  font-size: 15px;
  margin-bottom: 30px;
}

.custom-button:hover {
  background-color: #003366;
  color: #39FF14;
  font-weight: bold;
}

</style>
