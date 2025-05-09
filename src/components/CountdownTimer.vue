
<template>
  <h2>{{ title }}</h2>
  <div class="container">

    <div class="countdown-wrapper">
      <h3>Eröffnungsspiel</h3>
      <p>Gruppe A: Al Ahly FC - Inter Miami CF</p>
      <p>Hard-Rock-Stadion, Miami</p>
        <p>14 Juni, 20 Uhr (15. Juni 02 Uhr MESZ)</p>
      <!-- Initialisierung Tabellenstruktur für das Eröffnungsspiel -->
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
          <td>{{ daysToOpening }}</td>
          <td>{{ hoursToOpening }}</td>
          <td>{{ minutesToOpening }}</td>
          <td>{{ secondsToOpening }}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="divider"></div>

    <div class="countdown-wrapper">
      <h3>Finalspiel</h3>
      <p>Sieger Halbfinale 1 - Sieger Halbfinale 2</p>
      <p>MetLife-Stadion, New York</p>
        <p>13 Juli, 15 Uhr (21 Uhr MESZ)</p>
      <!-- Initialisierung Tabellenstruktur für das Finalspiel -->
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
          <td>{{ daysToFinal }}</td>
          <td>{{ hoursToFinal }}</td>
          <td>{{ minutesToFinal }}</td>
          <td>{{ secondsToFinal }}</td>
        </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';

// Props für Titel
defineProps(['title']);

// Ziel-Daten und -Zeiten für Eröffnungsspiel und Finalspiel
const openingDate = new Date(Date.UTC(2025, 5, 15, 0, 0)).getTime();
const finalDate = new Date(Date.UTC(2025, 6, 13, 19, 0)).getTime(); // 21:00 Uhr MESZ

// Verbleibende Zeit in Sekunden für beide Spiele
const timeLeftToOpening = ref(calculateTimeLeft(openingDate));
const timeLeftToFinal = ref(calculateTimeLeft(finalDate));

// Funktion zur Berechnung der verbleibenden Zeit bis zu einem Datum
function calculateTimeLeft(targetDate) {
  const now = new Date().getTime();
  const difference = targetDate - now;
  return Math.max(0, Math.floor(difference / 1000)); // Stellt sicher, dass es nicht negativ wird
}

let intervalOpeningId = null;
let intervalFinalId = null;

// Werte für verschiedene Zeiteinheiten für das Eröffnungsspiel
const daysToOpening = computed(() => Math.floor(timeLeftToOpening.value / (3600 * 24)));
const hoursToOpening = computed(() => Math.floor((timeLeftToOpening.value % (3600 * 24)) / 3600));
const minutesToOpening = computed(() => Math.floor((timeLeftToOpening.value % 3600) / 60));
const secondsToOpening = computed(() => timeLeftToOpening.value % 60);

// Werte für verschiedene Zeiteinheiten für das Finalspiel
const daysToFinal = computed(() => Math.floor(timeLeftToFinal.value / (3600 * 24)));
const hoursToFinal = computed(() => Math.floor((timeLeftToFinal.value % (3600 * 24)) / 3600));
const minutesToFinal = computed(() => Math.floor((timeLeftToFinal.value % 3600) / 60));
const secondsToFinal = computed(() => timeLeftToFinal.value % 60);

// Countdown starten und Update der verbleibenden Zeit bei > 0
function startCountdown() {
  intervalOpeningId = setInterval(() => {
    if (timeLeftToOpening.value > 0) {
      timeLeftToOpening.value = calculateTimeLeft(openingDate);
    } else {
      clearInterval(intervalOpeningId);
    }
  }, 1000);

  intervalFinalId = setInterval(() => {
    if (timeLeftToFinal.value > 0) {
      timeLeftToFinal.value = calculateTimeLeft(finalDate);
    } else {
      clearInterval(intervalFinalId);
    }
  }, 1000);
}

// Countdown bei Komponentenerstellung starten
onMounted(() => {
  startCountdown();
});

// Countdowns stoppen
onUnmounted(() => {
  if (intervalOpeningId !== null) {
    clearInterval(intervalOpeningId);
  }
  if (intervalFinalId !== null) {
    clearInterval(intervalFinalId);
  }
});
</script>

<style scoped>


/* Formatierung Container Flexbox */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 150px;
  height: auto;
}

.divider {
  width: 1px;
  background-color: #ccffcc;
  height: auto;
  align-self: stretch;
}

/* Formatierung Titel */
h2 {
  text-align: center;
  color: #32CD32;
  font-size: 34px;
  margin-bottom: 20px;
  margin-top: 20px;
}

h3 {
  text-align: center;
  margin-top: 30px;
  color: #32CD32;
  font-size: 25px;
  font-weight: bold;
}

p {
  text-align: center;
  color: #FFFFFF;
  font-size: 20px;
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
</style>
