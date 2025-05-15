<template>
  <h3>{{ title }}</h3>
  <ul>
    <li v-for="match in matches" :key="match.id">
      {{ match.homeTeam.name }} vs {{ match.visitorTeam.name }} in {{ match.stadium.name }}:
      <input type="number" v-model.number="match.homeScore" placeholder="Home" /> -
      <input type="number" v-model.number="match.visitorScore" placeholder="Visitor" />
      <button @click="saveMatch(match)">Speichern</button>
    </li>
  </ul>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import apiClient from '../axios.js';

defineProps(['title']);

const matches = ref([]);

onMounted(async () => {
  try {
    const response = await apiClient.get('/matches');
    matches.value = response.data;
  } catch (error) {
    console.error("Error fetching matches:", error);
  }
});

async function saveMatch(match) {
  try {
    await apiClient.post('/matches', match);
  } catch (error) {
    console.error("Error saving match:", error);
  }
}
</script>

<style scoped>
/* Styles für die Komponente */
</style>

