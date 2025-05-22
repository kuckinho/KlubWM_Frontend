<template>
  <h3>{{ title }}</h3>
  <ul>
    <li v-for="match in matches" :key="match.id">
      {{ match.homeTeam.name }} vs {{ match.visitorTeam.name }} in {{ match.stadium.name }}:
      <input type="number" v-model.number="match.homeScore" placeholder="Home" min="0" /> -
      <input type="number" v-model.number="match.visitorScore" placeholder="Visitor" min="0" />
      <button @click="generateRandomResult(match)">Zufälliges Ergebnis</button>
    </li>
  </ul>
  <button @click="saveAllMatches">Alle Ergebnisse speichern</button>
  <button @click="resetAllMatches">Alle Ergebnisse auf 0 setzen</button>
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

async function saveAllMatches() {
  try {
    await Promise.all(matches.value.map(match => apiClient.post('/matches', match)));
  } catch (error) {
    console.error("Error saving matches:", error);
  }
}

function resetAllMatches() {
  matches.value.forEach(match => {
    match.homeScore = 0;
    match.visitorScore = 0;
  });
}

function generateRandomResult(match) {
  match.homeScore = generateRandomScore();
  match.visitorScore = generateRandomScore();
}

function generateRandomScore() {
  const random = Math.random();
  if (random < 0.5) {
    return Math.floor(Math.random() * 3); // Wahrscheinlichkeit für 0-2
  } else if (random < 0.8) {
    return Math.floor(Math.random() * 2) + 3; // Wahrscheinlichkeit für 3-4
  } else {
    return Math.floor(Math.random() * 3) + 5; // Wahrscheinlichkeit für 5-7
  }
}
</script>

<style scoped>
/* Styles für die Komponente */
</style>

