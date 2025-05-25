
<template>
  <h3>{{ title }}</h3>

  <!-- Anzeige der Gruppen mit flexibler Anordnung -->
  <div v-if="groups.length" class="group-container">
    <div v-for="group in groups" :key="group.id" class="group">
      <h2>{{ group.name }}</h2>
      <table>
        <thead>
        <tr>
          <th>Mannschaft</th>
          <th>Spiele</th>
          <th>S</th>
          <th>U</th>
          <th>N</th>
          <th>TD</th>
          <th>GT</th>
          <th>Punkte</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="team in sortedTeams(group.teams)" :key="team.id">
          <td>{{ team.team.name }}</td>
          <td>{{ team.matches }}</td>
          <td>{{ team.wins }}</td>
          <td>{{ team.draws }}</td>
          <td>{{ team.losses }}</td>
          <td>{{ team.goalDifference }}</td>
          <td>{{ team.goalScored }}</td>
          <td>{{ team.points }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>

  <br>

  <div class="buttons">
    <button @click="generateRandomResultsForAll">Alle Ergebnisse generieren</button>
    <button @click="saveAllMatches">Alle Ergebnisse speichern</button>
    <button @click="resetAllMatches">Alle Ergebnisse zurücksetzen</button>
  </div>

  <br>

  <ul>
    <li v-for="match in matches" :key="match.id">
      {{ match.homeTeam.name }} vs {{ match.visitorTeam.name }} in {{ match.stadium.name }}:
      <input type="number" v-model.number="match.homeScore" placeholder="Home" min="0" /> -
      <input type="number" v-model.number="match.visitorScore" placeholder="Visitor" min="0" />
      <button @click="generateRandomResult(match)">Zufälliges Ergebnis</button>
    </li>
  </ul>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import apiClient from '../axios.js';

defineProps(['title']);

const matches = ref([]);
const groups = ref([]);

onMounted(async () => {
  await loadMatches();
  await loadGroups();
});

async function loadMatches() {
  try {
    const matchesResponse = await apiClient.get('/matches');
    matches.value = matchesResponse.data;
  } catch (error) {
    console.error("Error fetching matches:", error);
  }
}

async function loadGroups() {
  try {
    const groupsResponse = await apiClient.get('/groups');
    groups.value = groupsResponse.data;
  } catch (error) {
    console.error("Error fetching groups:", error);
  }
}

async function saveAllMatches() {
  try {
    const matchUpdates = matches.value.map(match => ({
      id: match.id,
      homeScore: match.homeScore,
      visitorScore: match.visitorScore,
    }));

    await apiClient.put('/matches/batch', matchUpdates);

    // Nach dem Speichern die Gruppen neu laden
    await loadGroups();

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

function generateRandomResultsForAll() {
  matches.value.forEach(match => {
    match.homeScore = generateRandomScore();
    match.visitorScore = generateRandomScore();
  });
}

function generateRandomScore() {
  const random = Math.random();
  if (random < 0.5) {
    return Math.floor(random * 3);
  } else if (random < 0.8) {
    return Math.floor(random * 2) + 3;
  } else {
    return Math.floor(random * 3) + 5;
  }
}

function sortedTeams(teams) {
  return [...teams].sort((a, b) =>
    b.points - a.points ||
    b.goalDifference - a.goalDifference ||
    b.goalScored - a.goalScored ||
    (Math.random() - 0.5)  // Zufällige Entscheidung
  );
}
</script>

<style scoped>
.buttons {
  display: flex;
  justify-content: center; /* Zentriert die Buttons horizontal */
  gap: 10px; /* Abstand zwischen den Buttons */
}

button {
  color: #cfc;
  background-color: #003366;
  transition: background-color 0.3s;
  padding: 9px 15px;
  border-radius: 50px;
}

button:hover {
  background-color: #003366;
  color: #39FF14;
  font-weight: bold;
}

/* Flex Container für die Gruppenansicht */
.group-container {
  display: flex;
  flex-wrap: wrap; /* Ermöglicht Umbruch in mehreren Zeilen */
  justify-content: center; /* Zentriert die Gruppen in einer Reihe */
  gap: 50px; /* Abstand horizontal zwischen den Gruppen */
  margin-top: 20px;
}

/* Stilisierung jeder einzelnen Gruppe */
.group {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 23%; /* Breite für vier Gruppen pro Zeile */
}

table {
  border-collapse: collapse;
  width: 100%;
  margin-top: 10px;
}

th, td {
  border: 1px solid #ccffcc;
  padding: 8px;
}

th {
  text-align: left;
  background-color: #003366;
}
</style>
