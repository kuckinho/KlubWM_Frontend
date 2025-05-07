
<template>
  <h2>{{ title }}</h2>
  <div class="container">
  <div class="countdown-wrapper">

    <!-- Initialisierung Tabellenstruktur -->
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
        <td>{{ days }}</td>
        <td>{{ hours }}</td>
        <td>{{ minutes }}</td>
        <td>{{ seconds }}</td>
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

// Ziel-Datum und Zeit zusammensetzen (MEZ: Mitteleuropäische Zeit)
const targetDate = new Date(Date.UTC(2025, 5, 15, 0, 0)).getTime();

// Verbleibende Zeit in Sekunden
const timeLeft = ref(calculateTimeLeft());

// Verbleibende Zeit bis zum Zieldatum berechnen
function calculateTimeLeft() {
  const now = new Date().getTime();
  const difference = targetDate - now;
  return Math.max(0, Math.floor(difference / 1000)); // Stellt sicher, dass es nicht negativ wird
}

const intervalId = ref(null);

// Werte für verschiedene Zeiteinheiten berechnen
const days = computed(() => Math.floor(timeLeft.value / (3600 * 24)));
const hours = computed(() => Math.floor((timeLeft.value % (3600 * 24)) / 3600));
const minutes = computed(() => Math.floor((timeLeft.value % 3600) / 60));
const seconds = computed(() => timeLeft.value % 60);

// Countdown starten und Update der verbleibenden Zeit bei > 0
function startCountdown() {
  intervalId.value = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value = calculateTimeLeft();
    } else {
      clearInterval(intervalId.value);
    }
  }, 1000);
}

// Countdown bei Komponentenerstellung starten
onMounted(() => {
  startCountdown();
});

// Countdown stoppen
onUnmounted(() => {
  if (intervalId.value !== null) {
    clearInterval(intervalId.value);
  }
});
</script>


<style scoped>
/* Formatierung Container Flexbox */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
}

/* Formatierung Titel */
h2 {
  text-align: center;
  color: #32CD32;
  font-size: 34px;
  margin-bottom: 20px;
  margin-top: 20px;
}

/* Formatierung Tabellen-Struktur */
table {
  margin: 8px auto;
  border-collapse: collapse;
}

/* Formatierung Tabellen-Zellen */
th, td {
  padding: 10px;
  white-space: nowrap;
  color: #FFFFFF;
  text-align: center;
}

/* Formatierung Tabellen-Kopfzeile */
th {
  font-size: 24px;
}

/* Formatierung Tabellen-Zellen */
td {
  font-weight: bold;
  font-size: 54px;
  text-shadow: 0 0 15px #39FF14;
}
</style>
