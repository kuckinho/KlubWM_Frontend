
<template>
  <h3>{{ title }}</h3>

  <div class="timeline-and-records-container">
  <div class="timeline-container">
    <div class="timeline-item" v-for="event in timelineEvents" :key="event.year">
      <div class="year">{{ event.year }}</div>
      <div class="content">
        <h2>{{ event.winner }}</h2>
        <p>{{ event.location }}</p>
        <p>{{ event.score }}</p>
      </div>
    </div>
  </div>

    <!-- Rekordsieger-Abschnitt -->
    <div class="records-container">
      <div class="timeline-item" v-for="team in recordWinners" :key="team.team">
        <div class="counter">{{ team.wins }}</div>
        <div class="content">
          <h2>{{ team.team }}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { defineProps } from 'vue';

// Props für Titel
defineProps(['title'])

// Verwende `ref()` für reaktive Variablen
const timelineEvents = ref([
  { year: 2000, winner: 'Corinthians', location: '- Brasilien -', score: '0-0, 4-3 i.E.' },
  { year: 2005, winner: 'FC São Paulo', location: '- Japan -', score: '1-0' },
  { year: 2006, winner: 'SC Internacional', location: '- Japan -', score: '1-0' },
  { year: 2007, winner: 'AC Mailand', location: '- Japan -', score: '4-2' },
  { year: 2008, winner: 'Manchester United', location: '- Japan -', score: '1-0' },
  { year: 2009, winner: 'FC Barcelona', location: '- VAE -', score: '2-1 n.V.' },
  { year: 2010, winner: 'Inter Mailand', location: '- VAE -', score: '3-0' },
  { year: 2011, winner: 'FC Barcelona', location: '- Japan -', score: '4-0' },
  { year: 2012, winner: 'Corinthians', location: '- Japan -', score: '1-0' },
  { year: 2013, winner: 'FC Bayern München', location: '- Marokko -', score: '2-0' },
  { year: 2014, winner: 'Real Madrid', location: '- Marokko -', score: '2-0' },
  { year: 2015, winner: 'FC Barcelona', location: '- Japan -', score: '3-0' },
  { year: 2016, winner: 'Real Madrid', location: '- Japan -', score: '4-2 n.V.' },
  { year: 2017, winner: 'Real Madrid', location: '- VAE -', score: '1-0' },
  { year: 2018, winner: 'Real Madrid', location: '- VAE -', score: '4-1' },
  { year: 2019, winner: 'FC Liverpool', location: '- Katar -', score: '1-0 n.V.' },
  { year: 2020, winner: 'FC Bayern München', location: '- Katar -', score: '1-0' },
  { year: 2021, winner: 'FC Chelsea', location: '- VAE -', score: '2-1 n.V.' },
  { year: 2022, winner: 'Real Madrid', location: '- Marokko -', score: '5-3' },
  { year: 2023, winner: 'Manchester City', location: '- Saudi-Arabien -', score: '4-0' },
  { year: 2025, winner: '?', location: '- USA -', score: '?' },
])

timelineEvents.value.reverse();

const recordWinners = ref([
  { team: 'Real Madrid', wins: 5 },
  { team: 'FC Barcelona', wins: 3 },
  { team: 'FC Bayern München', wins: 2 },
  { team: 'Corinthians São Paulo', wins: 2 },
  { team: 'Manchester City', wins: 1 },
  { team: 'FC Chelsea', wins: 1 },
  { team: 'FC Liverpool', wins: 1 },
  { team: 'Inter Mailand', wins: 1 },
  { team: 'Manchester United', wins: 1 },
  { team: 'AC Mailand', wins: 1 },
  { team: 'SC Internacional', wins: 1 },
  { team: 'FC São Paulo', wins: 1 },
])
</script>

<style scoped>
.timeline-and-records-container {
  display: flex;
  justify-content: space-around;
  margin-top: 25px;
  gap: 100px;
}

.timeline-container {
  background: #003366;
  border-radius: 10px;
  padding: 10px;
  max-width: 600px;
}

.records-container {
  background: #003366;
  border-radius: 10px;
  padding: 10px;
  max-width: 600px;
  max-height: 2200px;
}

.timeline-item {
  position: relative;
  width: 100%;
  text-align: center;
}

.year {
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.5rem;
  font-weight: bold;
  background-color: #32CD32;
  color: #fff;
  padding: 5px 10px;
  border-radius: 50%;
  width: 80px;
  z-index: 1;
}

.counter {
  position: absolute;
  top: 25px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.5rem;
  font-weight: bold;
  background-color: #32CD32;
  color: #fff;
  padding: 5px 10px;
  border-radius: 50%;
  width: 80px;
  z-index: 1;
}

.content {
  background-color: #fff;
  color: #003366;
  padding: 20px 10px;
  border-radius: 10px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
  margin-top: 50px;
}

.records-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;
}

.records-container h3 {
  color: #fff;
  margin-bottom: 10px;
}

.records-container ul {
  list-style-type: none;
  padding: 0;
}

.records-container li {
  margin: 5px 0;
}

.content p {
  font-weight: bold;
  margin: 2px 0;
}
</style>
