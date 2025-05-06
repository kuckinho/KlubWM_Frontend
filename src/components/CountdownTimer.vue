<template>
  <h2>{{ title }}</h2>
  <div class="container">
  <div class="countdown-wrapper">
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

// Datum und Zeit zusammensetzen (MEZ: Mitteleuropäische Zeit)
const targetDate = new Date(Date.UTC(2025, 5, 15, 0, 0)).getTime();

const timeLeft = ref(calculateTimeLeft());

function calculateTimeLeft() {
  const now = new Date().getTime();
  const difference = targetDate - now;
  return Math.max(0, Math.floor(difference / 1000)); // Stellt sicher, dass es nicht negativ wird
}

const intervalId = ref(null);

const days = computed(() => Math.floor(timeLeft.value / (3600 * 24)));
const hours = computed(() => Math.floor((timeLeft.value % (3600 * 24)) / 3600));
const minutes = computed(() => Math.floor((timeLeft.value % 3600) / 60));
const seconds = computed(() => timeLeft.value % 60);

function startCountdown() {
  intervalId.value = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value = calculateTimeLeft();
    } else {
      clearInterval(intervalId.value);
    }
  }, 1000);
}

onMounted(() => {
  startCountdown();
});

onUnmounted(() => {
  if (intervalId.value !== null) {
    clearInterval(intervalId.value);
  }
});
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center; /* Zentriert Inhalte horizontal */
  align-items: center; /* Zentriert Inhalte vertikal */
  height: 50vh;
}

.countdown-wrapper {
  text-align: center;
  font-family: Arial, sans-serif;
}

h2 {
  /*Überschrift*/
  text-align: center;
  color: #32CD32;
  font-size: 34px;
  margin-bottom: 20px;
}

table {
  margin: 8px auto; /* Zentriert die Tabelle horizontal */
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  white-space: nowrap;
  color: #FFFFFF;
  text-align: center;
}

th {
  font-size: 24px;
}

td {
  font-weight: bold;
  font-size: 54px;
  text-shadow: 0 0 15px #39FF14;
}
</style>
