
<template>
  <h3>{{ title }}</h3>

  <!-- Flexbox-Container für Button und Filter -->
  <div class="filter-container">

    <!-- Initialisierung Suchfeld und Filteroptionen in einer Reihe -->
    <div class="filters">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Verein suchen..."
        @input="filterClubs"
      />

      <!-- Filteroption Herkunftsland -->
      <label>
        Herkunftsland
        <select v-model="filters.country" @change="filterClubs">
          <option value="">Alle</option>
          <option
            v-for="option in getUniqueValues('country')"
            :key="option"
            :value="option"
          >
            {{ option }}
          </option>
        </select>
      </label>

      <!-- Filteroption Heimatliga -->
      <label>
        Heimatliga
        <select v-model="filters.league" @change="filterClubs">
          <option value="">Alle</option>
          <option
            v-for="option in getUniqueValues('league')"
            :key="option"
            :value="option"
          >
            {{ option }}
          </option>
        </select>
      </label>

      <!-- Hinzufügen des als Button gestylten Links -->
      <a href="https://www.fifa.com/de/tournaments/mens/club-world-cup/usa-2025/teams"
         target="_blank"
         class="custom-button">
        Zur FIFA-Teilnehmerübersicht
      </a>
    </div>
  </div>

  <!-- Initialisierung Tabellenstruktur -->
  <table>
    <tr>
      <th>Vereinsname</th>
      <th>Herkunftsland</th>
      <th>Herkunftsort</th>
      <th>Heimatliga</th>
      <th>Kader ø-Alter</th>
      <th>Marktwert</th>
    </tr>
    <tr v-for="club in filteredClubs" :key="club.id">
      <td>{{ club.name }}</td>
      <td>{{ club.country }}</td>
      <td>{{ club.location }}</td>
      <td>{{ club.league }}</td>
      <td>{{ club.averageAge }}</td>
      <td>{{ club.marketValue }}</td>
    </tr>
  </table>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';


// Props für Titel
defineProps(['title']);

// Initialisierung Suche und Filter
const clubs = ref([]);
const searchQuery = ref('');
const filters = ref({
  country: '',
  league: ''
});
let currentId = 1;

// Initialisierung Clubs mit Daten
function initClubs() {
  const initialClubs = [
    { name: 'Manchester City', country: 'England', location: 'Manchester', league: 'Premier League', averageAge: 26.8, marketValue: '1,31 Mrd. €' },
    { name: 'Real Madrid', country: 'Spanien', location: 'Madrid', league: 'La Liga', averageAge: 27.1, marketValue: '1,27 Mrd. €' },
    { name: 'FC Paris Saint-Germain', country: 'Frankreich', location: 'Paris', league: 'Ligue 1', averageAge: 23.8, marketValue: '923,50 Mio. €' },
    { name: 'FC Chelsea', country: 'England', location: 'London', league: 'Premier League', averageAge: 23.7, marketValue: '922,00 Mio. €' },
    { name: 'FC Bayern München', country: 'Deutschland', location: 'München', league: 'Bundesliga', averageAge: 27.8, marketValue: '859,00 Mio. €' },
    { name: 'Inter Mailand', country: 'Italien', location: 'Mailand', league: 'Serie A', averageAge: 29.5, marketValue: '663,80 Mio. €' },
    { name: 'Juventus Turin', country: 'Italien', location: 'Turin', league: 'Serie A', averageAge: 25.5, marketValue: '623,20 Mio. €' },
    { name: 'Atlético Madrid', country: 'Spanien', location: 'Madrid', league: 'La Liga', averageAge: 29.4, marketValue: '515,80 Mio. €' },
    { name: 'Borussia Dortmund', country: 'Deutschland', location: 'Dortmund', league: 'Bundesliga', averageAge: 25.3, marketValue: '436,40 Mio. €' },
    { name: 'Benfica Lissabon', country: 'Portugal', location: 'Lissabon', league: 'Primeira Liga', averageAge: 25.4, marketValue: '362,50 Mio. €' },
    { name: 'FC Porto', country: 'Portugal', location: 'Porto', league: 'Primeira Liga', averageAge: 25.3, marketValue: '312,70 Mio. €' },
    { name: 'SE Palmeiras São Paulo', country: 'Brasilien', location: 'São Paulo', league: 'Brasileirão', averageAge: 25.9, marketValue: '238,75 Mio. €' },
    { name: 'Flamengo Rio de Janeiro', country: 'Brasilien', location: 'Rio de Janeiro', league: 'Brasileirão', averageAge: 27.1, marketValue: '219,15 Mio. €' },
    { name: 'Al-Hilal SFC', country: 'Saudi-Arabien', location: 'Riad', league: 'Saudi Professional League', averageAge: 28.2, marketValue: '180,00 Mio. €' },
    { name: 'FC Red Bull Salzburg', country: 'Österreich', location: 'Salzburg', league: 'Österreichische Bundesliga', averageAge: 22.9, marketValue: '149,30 Mio. €' },
    { name: 'Botafogo Rio de Janeiro', country: 'Brasilien', location: 'Rio de Janeiro', league: 'Brasileirão', averageAge: 26.0, marketValue: '135,95 Mio. €' },
    { name: 'CA River Plate', country: 'Argentinien', location: 'Buenos Aires', league: 'Argentinische Primera División', averageAge: 29.6, marketValue: '103,65 Mio. €' },
    { name: 'CA Boca Juniors', country: 'Argentinien', location: 'Buenos Aires', league: 'Argentinische Primera División', averageAge: 28.1, marketValue: '83,63 Mio. €' },
    { name: 'Fluminense Rio de Janeiro', country: 'Brasilien', location: 'Rio de Janeiro', league: 'Brasileirão', averageAge: 28.3, marketValue: '73,60 Mio. €' },
    { name: 'CF Monterrey', country: 'Mexiko', location: 'Monterrey', league: 'Liga MX', averageAge: 28.5, marketValue: '73,20 Mio. €' },
    { name: 'Inter Miami CF', country: 'USA', location: 'Miami', league: 'Major League Soccer', averageAge: 26.0, marketValue: '69,15 Mio. €' },
    { name: 'Seattle Sounders FC', country: 'USA', location: 'Seattle', league: 'Major League Soccer', averageAge: 26.9, marketValue: '54,35 Mio. €' },
    { name: 'CF Pachuca', country: 'Mexiko', location: 'Pachuca', league: 'Liga MX', averageAge: 25.8, marketValue: '51,75 Mio. €' },
    { name: 'Al-Ain FC', country: 'Vereinigte Arabische Emirate', location: 'Al-Ain', league: 'UAE Pro League', averageAge: 25.8, marketValue: '44,84 Mio. €' },
    { name: 'Mamelodi Sundowns FC', country: 'Südafrika', location: 'Mamelodi', league: 'DSTV Premiership', averageAge: 27.7, marketValue: '35,48 Mio. €' },
    { name: 'Al Ahly FC', country: 'Ägypten', location: 'Kairo', league: 'Egyptian Premier League', averageAge: 27.4, marketValue: '33,90 Mio. €' },
    { name: 'Urawa Red Diamonds', country: 'Japan', location: 'Saitama', league: 'J1 League', averageAge: 27.3, marketValue: '20,53 Mio. €' },
    { name: 'Esperance Tunis', country: 'Tunesien', location: 'Tunis', league: 'Ligue Professionnelle 1', averageAge: 25.6, marketValue: '19,85 Mio. €' },
    { name: 'Wydad Casablanca', country: 'Marokko', location: 'Casablanca', league: 'Botola Pro', averageAge: 26.1, marketValue: '16,45 Mio. €' },
    { name: 'Ulsan HD FC', country: 'Südkorea', location: 'Ulsan', league: 'K League 1', averageAge: 27.2, marketValue: '16,30 Mio. €' },
    { name: 'Auckland City FC', country: 'Neuseeland', location: 'Auckland', league: 'New Zealand Football Championship', averageAge: 26.7, marketValue: '5,32 Mio. €' },
  ];

  initialClubs.forEach(club => {
    clubs.value.push({ ...club, id: currentId++ });
  });
}



// Clubliste filtern basierend auf Suchbegriff und festgelegten Filtern
const filteredClubs = computed(() => {
  return clubs.value.filter(club => {
    const matchesSearchQuery = club.name.toLowerCase().includes(searchQuery.value.toLowerCase());

    // Clubliste prüfen, ob Club mit Filter übereinstimmt
    const matchesFilters = ['country', 'league'].every(column => {
      return filters.value[column] === '' || club[column] === filters.value[column];
    });
    return matchesSearchQuery && matchesFilters;
  });
});

// Gibt eine Liste von eindeutigen Werten für ein gegebenes Feld zurück
function getUniqueValues(column) {
  const values = clubs.value.map(club => club[column]);
  return [...new Set(values)];
}

// Initialisierung Club-Daten beim Laden der Komponente
onMounted(() => {
  initClubs();
});
</script>

<style scoped>
/* Flex-Container für Button und Filter */
.filter-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 30px;
  margin-top: 30px;
}

/* Formatierung Button-ähnlicher Link */
.custom-button {
  display: flex;
  padding: 5px 15px;
  border-radius: 50px;
  width: 275px;
  justify-content: center;
  color: #cfc;
  background-color: #003366;
  transition: background-color 0.3s;
}

.custom-button:hover {
  background-color: #003366;
  color: #39FF14;
  font-weight: bold;
}

/* Formatierung Filter */
.filters {
  display: flex;
  align-items: center;
}

/* Formatierung Titel */
h3 {
  margin-bottom: 20px;
}

/* Formatierung Tabellen-Struktur */
table {
  margin: 10px 0;
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

/* Formatierung Tabellen-Kopfzeile */
th {
  border: 1px solid #cfc;
  padding: 8px;
  white-space: nowrap;
  vertical-align: top;
  text-align: center;
  font-weight: bold;
}

/* Formatierung Tabellen-Zellen */
td {
  border: 1px solid #cfc;
  padding: 8px;
  white-space: nowrap;
  vertical-align: top;
  text-align: left;
}

/* Formatierung Tabellen-Spalten */
th:nth-child(1), td:nth-child(1) { width: 20%; }
th:nth-child(2), td:nth-child(2) { width: 20%; }
th:nth-child(3), td:nth-child(3) { width: 15%; }
th:nth-child(4), td:nth-child(4) { width: 25%; }
th:nth-child(5), td:nth-child(5) { width: 10%; }
th:nth-child(6), td:nth-child(6) { width: 10%; }

/* Formatierung Filter und Suchfunktion */
input, select {
  margin-right: 20px;
  padding: 5px;
}
</style>
