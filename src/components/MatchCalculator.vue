
<template>
  <h3>{{ title }}</h3>
  <h2>Gruppentabellen</h2>
  <!-- Anzeige der Gruppen mit flexibler Anordnung -->
  <div v-if="groups.length" class="group-container">
    <div v-for="group in groups" :key="group.id" class="group">
      <h1>{{ group.name }}</h1>
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
        <tr v-for="team in sortedTeams(group.teams)" :key="team.id" :class="{ 'winner-team': isGroupWinner(group, team), 'runner-up-team': isGroupRunnerUp(group, team) }">
          <td>
            {{ team.team.name }}
            <span v-if="isGroupWinner(group, team)" class="trophy-icon">🏆</span>
          </td>
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
  <h2>Ergebnisrechner</h2>

  <div class="buttons">
    <button @click="generateRandomResultsForAll">Alle Ergebnisse generieren</button>
    <button @click="saveAllMatches">Alle Ergebnisse speichern</button>
    <button @click="resetAllMatches">Alle Ergebnisse zurücksetzen</button>
  </div>

  <br>

  <ul>
    <li v-for="match in matches" :key="match.id" class="match-item">
      <div class="match-info">
        {{ match.homeTeam.name }} vs {{ match.visitorTeam.name }} in {{ match.stadium.name }}:
      </div>
      <div class="match-inputs">
        <input type="number" v-model.number="match.homeScore" placeholder="Home" min="0" class="score-input" /> -
        <input type="number" v-model.number="match.visitorScore" placeholder="Visitor" min="0" class="score-input" />
      </div>
      <div class="match-buttons">
        <button class="small-button" @click="generateRandomResult(match)">Zufälliges Ergebnis</button>
      </div>
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

  groups.value.forEach(group => {
    group.teams.forEach(team => {
      team.matches = 0;
      team.wins = 0;
      team.draws = 0;
      team.losses = 0;
      team.goalDifference = 0;
      team.goalScored = 0;
      team.points = 0;
    });
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

function isGroupWinner(group, team) {
  const sorted = sortedTeams(group.teams);
  return sorted.length > 0 && sorted[0].id === team.id;
}

function isGroupRunnerUp(group, team) {
  const sorted = sortedTeams(group.teams);
  return sorted.length > 1 && sorted[1].id === team.id;
}

</script>

<style scoped>
.buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}

button {
  color: #cfc;
  background-color: #003366;
  transition: background-color 0.3s;
  padding: 9px 15px;
  border-radius: 50px;
  width: 275px;
}

button:hover {
  background-color: #003366;
  color: #39FF14;
  font-weight: bold;
}

.small-button {
  padding: 5px 10px;
  width: 150px;
}

.match-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  gap: 5px;
}

.match-info {
  flex: 2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.match-inputs {
  flex: 1;
  display: flex;
  justify-content: center;
}

.match-buttons {
  flex: 1;
  display: flex;
  justify-content: center;
}

.score-input {
  width: 25%;
  text-align: center;
}

.group-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 50px;
  margin-top: 20px;
  justify-items: center;
}

.group {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

table {
  border-collapse: collapse;
  width: 100%;
  margin-top: 10px;
}

th, td {
  border: 1px solid #ccffcc;
  padding: 8px;
  white-space: nowrap;
}

th {
  text-align: left;
  background-color: #003366;
  font-weight: bold;
}

h2 {
  margin-top: 5px;
  margin-bottom: 5px;
}

h1 {
  margin-top: 5px;
  margin-bottom: 5px;
  color: #32CD32;
}

.winner-team {
  color: #B8860B;
  font-weight: bold;
}

.runner-up-team {
  color: #B8860B; /* Goldene Farbe für den Zweitplatzierten */
  font-weight: bold;
}

.trophy-icon {
  margin-left: 5px;
}
</style>
