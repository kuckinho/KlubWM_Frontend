
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
import apiClient from '../axios.js';

// Props für Titel
defineProps(['title']);

// Initialisierung Suche und Filter
const clubs = ref([]);
const searchQuery = ref('');
const filters = ref({
  country: '',
  league: ''
});

// Daten vom Backend laden
onMounted(async () => {
  try {
    const response = await apiClient.get('/teams');
    clubs.value = response.data;
  } catch (error) {
    console.error("Error fetching clubs:", error);
  }
});

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
