
<template>
  <h3>{{ title }}</h3>
  <ul>
    <li v-for="match in matches" :key="match.id">
      {{ match.homeTeam }} vs {{ match.visitorTeam }}:
      <input type="number" v-model.number="match.homeScore" placeholder="Home" /> -
      <input type="number" v-model.number="match.visitorScore" placeholder="Visitor" />
      <button @click="saveMatch(match)">Speichern</button>
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

async function saveMatch(match) {
  try {
    const response = await apiClient.post('/matches', match);
    console.log("Match result saved:", response.data);
  } catch (error) {
    console.error("Error saving match:", error);
  }
}
</script>


<style scoped>

</style>
