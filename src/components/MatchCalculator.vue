<template>
  <h3>{{ title }}</h3>

  <div v-if="resultsVisible">
    <h2>Gruppentabellen</h2>

    <div class="group-container">
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
          <tr
            v-for="team in sortedTeams(group.teams)"
            :key="team.id"
            :class="{ 'winner-team': isGroupWinner(group, team), 'runner-up-team': isGroupRunnerUp(group, team) }"
          >
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
  </div>

  <br />
  <h2>Ergebnisrechner</h2>
  <p>Hier kannst du deine Ergebnisse eingeben und schauen, ob es dein Team schafft!</p>
  <p>Keine Sorge, du kannst nichts falsch machen - negative Eingaben sind nicht möglich.</p>
  <br />

  <div class="buttons">
    <button @click="generateRandomResultsForAll">Alle Ergebnisse generieren</button>
    <button @click="saveAllMatches">Alle Ergebnisse speichern</button>
    <button @click="resetAllMatches">Alle Ergebnisse zurücksetzen</button>
    <button @click="highlightWinners">Alle Sieger küren</button>
  </div>
  <br />

  <ul>
    <li v-for="match in matches" :key="match.id" class="match-item">
      <div class="match-info">
        {{ match.homeTeam.name }} vs {{ match.visitorTeam.name }} ({{ match.stadium.name }}):
      </div>
      <div class="match-inputs">
        <select v-model="match.homeScore" class="score-input">
          <option :value="''" selected hidden></option>
          <option v-for="n in 10" :key="n" :value="n-1">{{ n - 1 }}</option>
        </select>
        -
        <select v-model="match.visitorScore" class="score-input">
          <option :value="''" selected hidden></option>
          <option v-for="n in 10" :key="n" :value="n-1">{{ n - 1 }}</option>
        </select>
      </div>
      <div class="match-buttons">
        <button class="small-button" @click="generateRandomResult(match)">Zufälliges Ergebnis</button>
      </div>
    </li>
  </ul>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import apiClient from '../axios.js';

defineProps(['title']);

const matches = ref([]);
const groups = ref([]);
const winnersHighlighted = ref(false);
const resultsSaved = ref(false); // Neuer Zustand für das Speichern der Ergebnisse
const resultsVisible = ref(false);  // Neues State für die Sichtbarkeit von Ergebnissen

// Watcher für Kontrolle der Eingaben
watch(matches, () => {
  resultsVisible.value = matches.value.some(
    match => match.homeScore !== '' || match.visitorScore !== ''
  );
  updateGroupStats();
});

onMounted(async () => {
  await loadMatches();
  await loadGroups();
});

async function loadMatches() {
  try {
    const matchesResponse = await apiClient.get('/matches');
    matches.value = matchesResponse.data.map(match => ({
      ...match,
      homeScore: match.homeScore !== undefined ? match.homeScore.toString() : '',
      visitorScore: match.visitorScore !== undefined ? match.visitorScore.toString() : '',
    }));
  } catch (error) {
    console.error('Error fetching matches:', error);
  }
}

async function loadGroups() {
  try {
    const groupsResponse = await apiClient.get('/groups');
    groups.value = groupsResponse.data;
  } catch (error) {
    console.error('Error fetching groups:', error);
  }
}

function updateGroupStats() {
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

  matches.value.forEach(match => {
    if (match.homeScore !== '' && match.visitorScore !== '') {
      const homeTeam = groups.value
        .flatMap(g => g.teams)
        .find(t => t.team.id === match.homeTeam.id);
      const visitorTeam = groups.value
        .flatMap(g => g.teams)
        .find(t => t.team.id === match.visitorTeam.id);

      if (homeTeam && visitorTeam) {
        homeTeam.matches++;
        visitorTeam.matches++;

        homeTeam.goalScored += parseInt(match.homeScore);
        visitorTeam.goalScored += parseInt(match.visitorScore);

        homeTeam.goalDifference += parseInt(match.homeScore) - parseInt(match.visitorScore);
        visitorTeam.goalDifference += parseInt(match.visitorScore) - parseInt(match.homeScore);

        if (parseInt(match.homeScore) > parseInt(match.visitorScore)) {
          homeTeam.wins++;
          visitorTeam.losses++;
          homeTeam.points += 3;
        } else if (parseInt(match.homeScore) < parseInt(match.visitorScore)) {
          visitorTeam.wins++;
          homeTeam.losses++;
          visitorTeam.points += 3;
        } else {
          homeTeam.draws++;
          visitorTeam.draws++;
          homeTeam.points += 1;
          visitorTeam.points += 1;
        }
      }
    }
  });
}

async function saveAllMatches() {
  try {
    const matchUpdates = matches.value.map(match => ({
      id: match.id,
      homeScore: match.homeScore === '' ? 0 : parseInt(match.homeScore),
      visitorScore: match.visitorScore === '' ? 0 : parseInt(match.visitorScore),
    }));

    if (matchUpdates.length > 0) {
      await apiClient.put('/matches/batch', matchUpdates);
      await loadGroups();

      // Ergebnisse sind nun gespeichert und sichtbar
      resultsSaved.value = true;
      resultsVisible.value = true;
    } else {
      console.log('Keine gültigen Ergebnisse zum Speichern.');
    }
  } catch (error) {
    console.error('Fehler beim Speichern der Ergebnisse:', error);
  }
}

function resetAllMatches() {
  matches.value.forEach(match => {
    match.homeScore = '';
    match.visitorScore = '';
  });

  updateGroupStats();
  winnersHighlighted.value = false;
  resultsSaved.value = false;
  resultsVisible.value = false;  // Setze Sichtbarkeit auf falsch zurück
}

function generateRandomResult(match) {
  match.homeScore = generateRandomScore().toString();
  match.visitorScore = generateRandomScore().toString();
}

function generateRandomResultsForAll() {
  matches.value.forEach(match => {
    match.homeScore = generateRandomScore().toString();
    match.visitorScore = generateRandomScore().toString();
  });
}

function generateRandomScore() {
  const weightedOptions = [
    ...Array(25).fill(0),
    ...Array(20).fill(1),
    ...Array(20).fill(2),
    ...Array(15).fill(3),
    ...Array(10).fill(4),
    ...Array(5).fill(5),
    ...Array(2).fill(6),
    ...Array(2).fill(7),
    ...Array(1).fill(8),
    ...Array(1).fill(9),
  ];
  return weightedOptions[Math.floor(Math.random() * weightedOptions.length)];
}

function sortedTeams(teams) {
  return [...teams].sort(
    (a, b) =>
      b.points - a.points ||
      b.goalDifference - a.goalDifference ||
      b.goalScored - a.goalScored ||
      Math.random() - 0.5
  );
}

function isGroupWinner(group, team) {
  if (!winnersHighlighted.value) return false;
  const sorted = sortedTeams(group.teams);
  return sorted.length > 0 && sorted[0].id === team.id;
}

function isGroupRunnerUp(group, team) {
  if (!winnersHighlighted.value) return false;
  const sorted = sortedTeams(group.teams);
  return sorted.length > 1 && sorted[1].id === team.id;
}

function highlightWinners() {
  winnersHighlighted.value = true;
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
  justify-content: flex-start;
}

.match-buttons {
  flex: 1;
  display: flex;
  justify-content: flex-start;
}

.score-input {
  width: 80px;
  text-align: center;
  font-weight: bold;
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
  width: 500px;
  margin-top: 10px;
}

th,
td {
  border: 1px solid #ccffcc;
  padding: 8px;
  white-space: nowrap;
}

th {
  text-align: left;
  background-color: #003366;
  font-weight: bold;
}

th,
td:nth-child(n + 2) {
  width: 70px;
}

.winner-team {
  color: gold;
}

.runner-up-team {
  color: #b8860b;
}

h2 {
  margin-top: 15px;
  margin-bottom: 5px;
}

h1 {
  margin-top: 5px;
  margin-bottom: 5px;
  color: #32cd32;
}
</style>
