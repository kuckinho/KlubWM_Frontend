
<template>
  <h3>{{ title }}</h3>

  <div class="timeline-and-records-container">
    <!-- Timeline-Abschnitt -->
    <h2>Bisherige Champions</h2>
    <div class="timeline-container">
      <div class="timeline-scroll-area">
        <div class="timeline-item" v-for="event in timelineEvents" :key="event.year">
          <div class="year">{{ event.year }}</div>
          <div class="content">
            <h2>{{ event.winner }}</h2>
            <p>{{ event.location }}</p>
            <p>{{ event.score }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Rekordsieger-Abschnitt -->
    <h2>Aktuelle Rekord-Champions</h2>
    <div class="records-container">
      <div class="records-scroll-area">
        <div class="timeline-item" v-for="team in rankedTeams" :key="team.team">
          <!-- # vor dem Platz -->
          <div class="counter">#{{ team.rank }}</div>
          <div class="content">
            <h2>{{ team.team }}</h2>
            <p>
              <span v-for="n in team.wins" :key="n">★</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <h2>Champions-Galerie</h2>
  <swiper
    :modules="[Pagination, Navigation, Autoplay]"
    navigation
    pagination
    :autoplay="{ delay: 4000, disableOnInteraction: false }"
    class="mySwiper"
  >
    <swiper-slide v-for="(image, index) in images" :key="index">
      <img :src="image" :alt="'Gallery image ' + (index + 1)" class="gallery-image" />
    </swiper-slide>
  </swiper>
</template>

<script setup>
import { ref, computed } from 'vue';
import { defineProps } from 'vue';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Props für Titel
defineProps(['title']);

// Array mit Bildpfaden
const images = [
  '/Gallery1.png',
  '/Gallery2.jpg',
  '/Gallery3.png',
  '/Gallery4.jpeg',
  '/Gallery5.png',
  '/Gallery6.jpeg',
  '/Gallery7.jpeg',
  '/Gallery8.jpeg',
  '/Gallery9.jpeg',
  '/Gallery10.jpg',
  '/Gallery11.jpeg',
  '/Gallery12.jpeg'
];

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

const rankedTeams = computed(() => {
  // Erstelle eine neue Liste und sortiere sie nach Siegen absteigend
  const sortedTeams = [...recordWinners.value].sort((a, b) => b.wins - a.wins);

  // Vergib Plätze, dabei Erkennen von Gleichstand
  let rank = 1; // Beginne mit Rang 1
  let lastWins = sortedTeams[0].wins; // Die Anzahl der Siege des besten/ersten Teams

  return sortedTeams.map((team, index) => {
    if (team.wins < lastWins) {
      rank = index + 1; // Aktualisiere den Rang entsprechend der Position
      lastWins = team.wins;
    }

    return {
      ...team,
      rank
    };
  });
});
</script>

<style scoped>
* {
  box-sizing: border-box;
}

html, body {
  height: 100%;
  margin: 0;
  overflow: hidden; /* Verhindert das Scrollen der gesamten Seite */
  display: flex;
  justify-content: center;
  align-items: center;
}

h3 {
  margin-bottom: 5px;
}

h2 {
  margin-bottom: 5px;
  color: #B8860B;
}

.timeline-and-records-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  max-width: 100vw;
  margin-bottom: 30px;
}

.timeline-container,
.records-container {
  background: transparent;
  border-radius: 10px;
  padding: 10px;
  max-width: 90%; /* Passe die Breite an, um genügend Platz zu lassen */
  width: 100%;
  height: 40%;
  overflow-x: auto;
  white-space: nowrap;
  margin-bottom: 20px;
}

.timeline-scroll-area,
.records-scroll-area {
  display: inline-flex;
}

.timeline-item {
  width: 350px;
  text-align: center;
  display: inline-block;
  margin: 0 10px;
}

.year, .counter {
  font-size: 1.5rem;
  font-weight: bold;
  background-color: #32CD32;
  color: #fff;
  padding: 5px 10px;
  border-radius: 50%;
  width: 80px;
  display: inline-block;
  margin-bottom: -10px;
}

.content {
  background-color: #ccffcc;
  color: #003366;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
}

.content p {
  font-weight: bold;
  margin: 2px 0;
}

.records-container h3,
.records-container ul,
.records-container li {
  color: #fff;
  margin: 5px 0;
  text-align: left;
}

.gallery-image {
  width: 100%;
  height: auto;
  display: block;
  max-width: 800px;
  margin: 0 auto;
}

.mySwiper {
  width: 100%;
  max-width: 80vw;
  height: auto;
  color: #cfc;
}

</style>
