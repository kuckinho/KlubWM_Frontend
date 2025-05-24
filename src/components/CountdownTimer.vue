
<template>
  <h3>{{ title }}</h3>
  <div class="filter">
  <div>
    <label>Mannschaft auswählen </label>
    <select v-model="selectedTeam">
      <option value="">Kein Team ausgewählt</option>
      <option
        v-for="(team, index) in teams"
        :key="index"
        :value="team"
      >
        {{ team }}
      </option>
    </select>
  </div>
  </div>

  <!-- Eröffnungs- und Finalspiel-Countdowns anzeigen, wenn kein Team ausgewählt ist -->
  <div class="container" v-if="!selectedTeam">
    <div
      v-for="game in [openingGame, finalGame]"
      :key="game.index"
      class="countdown-wrapper"
    >
      <h2>{{ game.phase }}</h2>
      <p>{{ game.teams[0] }} vs. {{ game.teams[1] }}</p>
      <p>{{ game.date }} um {{ game.time }} Uhr</p>
      <table>
        <thead>
        <tr>
          <th>Tage</th>
          <th>Stunden</th>
          <th>Minuten</th>
          <th>Sekunden</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>{{ countdowns[game.index].days }}</td>
          <td>{{ countdowns[game.index].hours }}</td>
          <td>{{ countdowns[game.index].minutes }}</td>
          <td>{{ countdowns[game.index].seconds }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Countdowns für ausgewählte Mannschaft, wenn ein Team ausgewählt ist -->
  <div class="container" v-if="selectedTeam">
    <div
      v-for="game in filteredGames"
      :key="game.index"
      class="countdown-wrapper"
    >
      <h2>{{ game.phase }}</h2>
      <p>{{ game.teams[0] }} vs. {{ game.teams[1] }}</p>
      <p>{{ game.date }} um {{ game.time }} Uhr</p>
      <table>
        <thead>
        <tr>
          <th>Tage</th>
          <th>Stunden</th>
          <th>Minuten</th>
          <th>Sekunden</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>{{ countdowns[game.index].days }}</td>
          <td>{{ countdowns[game.index].hours }}</td>
          <td>{{ countdowns[game.index].minutes }}</td>
          <td>{{ countdowns[game.index].seconds }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

// Props für Titel
defineProps(['title']);

// Umstellung der Zeitzonen von UTC-4 auf MEZ (UTC+1)
function convertToMEZ(hour, day, month) {
  const date = new Date(Date.UTC(2025, month, day, hour));
  const offset = 4 + 1; // Von UTC-4 nach UTC+1
  date.setHours(date.getHours() + offset);
  return date;
}

const games = ref([
  { phase: 'Eröffnungsspiel', teams: ['Al Ahly', 'Inter Miami'], date: '15.6.', time: '02:00', dateTime: convertToMEZ(2, 15, 5), index: 0 },
  { phase: 'Finalspiel', teams: ['noch offen', 'noch offen'], date: '13.7.', time: '21:00', dateTime: convertToMEZ(21, 13, 6), index: 1 },
  { phase: 'Spieltag 1 von 3', teams: ['Bayern', 'Auckland City'], date: '15.6.', time: '18:00', dateTime: convertToMEZ(18, 15, 5), index: 2 },
  { phase: 'Spieltag 1 von 3', teams: ['PSG', 'Atlético Madrid'], date: '15.6.', time: '21:00', dateTime: convertToMEZ(21, 15, 5), index: 3 },
  { phase: 'Spieltag 1 von 3', teams: ['Palmeiras', 'FC Porto'], date: '16.6.', time: '00:00', dateTime: convertToMEZ(0, 16, 5), index: 4 },
  { phase: 'Spieltag 1 von 3', teams: ['Botafogo', 'Seattle Sounders'], date: '16.6.', time: '04:00', dateTime: convertToMEZ(4, 16, 5), index: 5 },
  { phase: 'Spieltag 1 von 3', teams: ['Chelsea', 'Hertha BSC'], date: '16.6.', time: '21:00', dateTime: convertToMEZ(21, 16, 5), index: 6 },
  { phase: 'Spieltag 1 von 3', teams: ['Boca Juniors', 'Benfica'], date: '17.6.', time: '00:00', dateTime: convertToMEZ(0, 17, 5), index: 7 },
  { phase: 'Spieltag 1 von 3', teams: ['Flamengo', 'ES Tunis'], date: '17.6.', time: '03:00', dateTime: convertToMEZ(3, 17, 5), index: 8 },
  { phase: 'Spieltag 1 von 3', teams: ['Fluminense', 'Dortmund'], date: '17.6.', time: '18:00', dateTime: convertToMEZ(18, 17, 5), index: 9 },
  { phase: 'Spieltag 1 von 3', teams: ['River Plate', 'Urawa Reds'], date: '17.6.', time: '21:00', dateTime: convertToMEZ(21, 17, 5), index: 10 },
  { phase: 'Spieltag 1 von 3', teams: ['Ulsan', 'Mamelodi Sundowns'], date: '18.6.', time: '00:00', dateTime: convertToMEZ(0, 18, 5), index: 11 },
  { phase: 'Spieltag 1 von 3', teams: ['Monterrey', 'Inter'], date: '18.6.', time: '03:00', dateTime: convertToMEZ(3, 18, 5), index: 12 },
  { phase: 'Spieltag 1 von 3', teams: ['Man City', 'Wydad AC'], date: '18.6.', time: '18:00', dateTime: convertToMEZ(18, 18, 5), index: 13 },
  { phase: 'Spieltag 1 von 3', teams: ['Real Madrid', 'Al-Hilal'], date: '18.6.', time: '21:00', dateTime: convertToMEZ(21, 18, 5), index: 14 },
  { phase: 'Spieltag 1 von 3', teams: ['Pachuca', 'RB Salzburg'], date: '19.6.', time: '00:00', dateTime: convertToMEZ(0, 19, 5), index: 15 },
  { phase: 'Spieltag 1 von 3', teams: ['Al-Ain', 'Juventus'], date: '19.6.', time: '03:00', dateTime: convertToMEZ(3, 19, 5), index: 16 },
  { phase: 'Spieltag 2 von 3', teams: ['Palmeiras', 'Al Ahly'], date: '19.6.', time: '18:00', dateTime: convertToMEZ(18, 19, 5), index: 17 },
  { phase: 'Spieltag 2 von 3', teams: ['Inter Miami', 'FC Porto'], date: '19.6.', time: '21:00', dateTime: convertToMEZ(21, 19, 5), index: 18 },
  { phase: 'Spieltag 2 von 3', teams: ['Seattle Sounders', 'Atlético Madrid'], date: '20.6.', time: '00:00', dateTime: convertToMEZ(0, 20, 5), index: 19 },
  { phase: 'Spieltag 2 von 3', teams: ['PSG', 'Botafogo'], date: '20.6.', time: '03:00', dateTime: convertToMEZ(3, 20, 5), index: 20 },
  { phase: 'Spieltag 2 von 3', teams: ['Benfica', 'Auckland City'], date: '20.6.', time: '18:00', dateTime: convertToMEZ(18, 20, 5), index: 21 },
  { phase: 'Spieltag 2 von 3', teams: ['Flamengo', 'Chelsea'], date: '20.6.', time: '20:00', dateTime: convertToMEZ(20, 20, 5), index: 22 },
  { phase: 'Spieltag 2 von 3', teams: ['Hertha BSC', 'ES Tunis'], date: '21.6.', time: '00:00', dateTime: convertToMEZ(0, 21, 5), index: 23 },
  { phase: 'Spieltag 2 von 3', teams: ['Bayern', 'Boca Juniors'], date: '21.6.', time: '03:00', dateTime: convertToMEZ(3, 21, 5), index: 24 },
  { phase: 'Spieltag 2 von 3', teams: ['Mamelodi Sundowns', 'Dortmund'], date: '21.6.', time: '18:00', dateTime: convertToMEZ(18, 21, 5), index: 25 },
  { phase: 'Spieltag 2 von 3', teams: ['Inter', 'Urawa Reds'], date: '21.6.', time: '21:00', dateTime: convertToMEZ(21, 21, 5), index: 26 },
  { phase: 'Spieltag 2 von 3', teams: ['Fluminense', 'Ulsan'], date: '22.6.', time: '00:00', dateTime: convertToMEZ(0, 22, 5), index: 27 },
  { phase: 'Spieltag 2 von 3', teams: ['River Plate', 'Monterrey'], date: '22.6.', time: '03:00', dateTime: convertToMEZ(3, 22, 5), index: 28 },
  { phase: 'Spieltag 2 von 3', teams: ['Juventus', 'Wydad AC'], date: '22.6.', time: '18:00', dateTime: convertToMEZ(18, 22, 5), index: 29 },
  { phase: 'Spieltag 2 von 3', teams: ['Real Madrid', 'Pachuca'], date: '22.6.', time: '21:00', dateTime: convertToMEZ(21, 22, 5), index: 30 },
  { phase: 'Spieltag 2 von 3', teams: ['RB Salzburg', 'Al-Hilal'], date: '23.6.', time: '00:00', dateTime: convertToMEZ(0, 23, 5), index: 31 },
  { phase: 'Spieltag 2 von 3', teams: ['Man City', 'Al-Ain'], date: '23.6.', time: '03:00', dateTime: convertToMEZ(3, 23, 5), index: 32 },
  { phase: 'Spieltag 3 von 3', teams: ['Seattle Sounders', 'PSG'], date: '23.6.', time: '21:00', dateTime: convertToMEZ(21, 23, 5), index: 33 },
  { phase: 'Spieltag 3 von 3', teams: ['Atlético Madrid', 'Botafogo'], date: '23.6.', time: '21:00', dateTime: convertToMEZ(21, 23, 5), index: 34 },
  { phase: 'Spieltag 3 von 3', teams: ['FC Porto', 'Al Ahly'], date: '24.6.', time: '03:00', dateTime: convertToMEZ(3, 24, 5), index: 35 },
  { phase: 'Spieltag 3 von 3', teams: ['Inter Miami', 'Palmeiras'], date: '24.6.', time: '03:00', dateTime: convertToMEZ(3, 24, 5), index: 36 },
  { phase: 'Spieltag 3 von 3', teams: ['Auckland City', 'Boca Juniors'], date: '24.6.', time: '21:00', dateTime: convertToMEZ(21, 24, 5), index: 37 },
  { phase: 'Spieltag 3 von 3', teams: ['Benfica', 'Bayern'], date: '24.6.', time: '21:00', dateTime: convertToMEZ(21, 24, 5), index: 38 },
  { phase: 'Spieltag 3 von 3', teams: ['ES Tunis', 'Chelsea'], date: '25.6.', time: '03:00', dateTime: convertToMEZ(3, 25, 5), index: 39 },
  { phase: 'Spieltag 3 von 3', teams: ['Hertha BSC', 'Flamengo'], date: '25.6.', time: '03:00', dateTime: convertToMEZ(3, 25, 5), index: 40 },
  { phase: 'Spieltag 3 von 3', teams: ['Dortmund', 'Ulsan'], date: '25.6.', time: '21:00', dateTime: convertToMEZ(21, 25, 5), index: 41 },
  { phase: 'Spieltag 3 von 3', teams: ['Mamelodi Sundowns', 'Fluminense'], date: '25.6.', time: '21:00', dateTime: convertToMEZ(21, 25, 5), index: 42 },
  { phase: 'Spieltag 3 von 3', teams: ['Urawa Reds', 'Monterrey'], date: '26.6.', time: '03:00', dateTime: convertToMEZ(3, 26, 5), index: 43 },
  { phase: 'Spieltag 3 von 3', teams: ['Inter', 'River Plate'], date: '26.6.', time: '03:00', dateTime: convertToMEZ(3, 26, 5), index: 44 },
  { phase: 'Spieltag 3 von 3', teams: ['Juventus', 'Man City'], date: '26.6.', time: '21:00', dateTime: convertToMEZ(21, 26, 5), index: 45 },
  { phase: 'Spieltag 3 von 3', teams: ['Wydad AC', 'Al-Ain'], date: '26.6.', time: '21:00', dateTime: convertToMEZ(21, 26, 5), index: 46 },
  { phase: 'Spieltag 3 von 3', teams: ['Al-Hilal', 'Pachuca'], date: '27.6.', time: '03:00', dateTime: convertToMEZ(3, 27, 5), index: 47 },
  { phase: 'Spieltag 3 von 3', teams: ['RB Salzburg', 'Real Madrid'], date: '27.6.', time: '03:00', dateTime: convertToMEZ(3, 27, 5), index: 48 },
]);

const openingGame = games.value.find(game => game.phase === 'Eröffnungsspiel');
const finalGame = games.value.find(game => game.phase === 'Finalspiel');

const selectedTeam = ref('');
const teams = computed(() =>
  Array.from(new Set(games.value.flatMap(game => game.teams)))
);

const filteredGames = computed(() => {
  if (!selectedTeam.value) return [];
  return games.value.filter(game => game.teams.includes(selectedTeam.value));
});

function calculateTimeLeft(targetDateTime) {
  const now = new Date().getTime();
  const difference = targetDateTime.getTime() - now;
  return Math.max(0, Math.floor(difference / 1000));
}

const countdowns = ref(games.value.map(() => ({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0
})));

function updateCountdowns() {
  games.value.forEach((game, index) => {
    const totalSeconds = calculateTimeLeft(game.dateTime);
    countdowns.value[index].days = Math.floor(totalSeconds / (3600 * 24));
    countdowns.value[index].hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    countdowns.value[index].minutes = Math.floor((totalSeconds % 3600) / 60);
    countdowns.value[index].seconds = totalSeconds % 60;
  });
}

let interval = null;

onMounted(() => {
  updateCountdowns();  // Initiale Berechnung
  interval = setInterval(() => {
    updateCountdowns();  // Aktualisiert die Countdowns jede Sekunde
  }, 1000);
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>

<style scoped>
.filter {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  margin-top: 30px;
  justify-content: center;
  font-size: 20px;
}

/* Formatierung Container Flexbox */
.container {
  display: flex;
  flex-direction: row; /* Darstellung in einer Reihe */
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.countdown-wrapper {
  margin: 20px;
}

/* Formatierung Tabellen-Struktur */
table {
  margin: 8px auto;
  border-collapse: collapse;
}

/* Formatierung Tabellen-Zellen */
th, td {
  padding: 10px;
  text-align: center;
}

/* Formatierung Tabellen-Kopfzeile */
th {
  font-size: 24px;
  color: #32CD32;
}

/* Formatierung Tabellen-Zellen */
td {
  font-weight: bold;
  font-size: 54px;
  color: #FFFFFF;
  text-shadow: 0 0 15px #39FF14;
  line-height: 1.1;
}

select {
  margin-top: 10px;
}
</style>
