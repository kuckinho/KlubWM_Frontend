
<template>
  <h3>{{ title }}</h3>
  <ul>
    <li v-for="match in matches" :key="match.id">
      {{ match.homeTeam }} vs {{ match.visitorTeam }}: {{ match.homeScore }} - {{ match.visitorScore }}
    </li>
  </ul>
</template>


<script setup>
// Props für Titel
defineProps(['title']);

import { ref, onMounted } from 'vue';
import apiClient from '../axios.js';

const matches = ref([]);

onMounted(async () => {
  try {
    const response = await apiClient.get('/matches');
    console.log("Fetched matches:", response.data);  // Diese Zeile fügt ein Log hinzu
    matches.value = response.data;
  } catch (error) {
    console.error("Error fetching matches:", error);
  }
});
</script>


<style scoped>

</style>
