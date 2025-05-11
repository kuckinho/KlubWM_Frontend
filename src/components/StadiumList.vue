<template>
  <h3>{{ title }}</h3>

  <!-- Flexbox-Container für Button und Filter -->
  <div class="filter-container">

    <!-- Initialisierung Suchfeld und Filteroptionen in einer Reihe -->
    <div class="filters">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Stadion suchen..."
        @input="filterStadiums"
      />

      <!-- Filteroption Stadt -->
      <label>
        Stadt
        <select v-model="filters.city" @change="filterStadiums">
          <option value="">Alle</option>
          <option
            v-for="option in getUniqueValues('city')"
            :key="option"
            :value="option"
          >
            {{ option }}
          </option>
        </select>
      </label>

      <!-- Filteroption Phase -->
      <label>
        Phase
        <select v-model="filters.phase" @change="filterStadiums">
          <option value="">Alle</option>
          <option value="group">Gruppenphase</option>
          <option value="ko">K.O.-Phase</option>
        </select>
      </label>

      <!-- Hinzufügen des als Button gestylten Links -->
      <a href="https://www.fifa.com/de/tournaments/mens/club-world-cup/usa-2025/articles/stadien-fifa-klub-wm-2025-uebersicht"
         target="_blank"
         class="custom-button">
        Zur FIFA-Stadionübersicht
      </a>

    </div>
  </div>

  <!-- Initialisierung Tabellenstruktur -->
  <table>
    <tr>
      <th>Stadionname</th>
      <th>Stadt</th>
      <th>Kapazität</th>
      <th>Eröffnung</th>
      <th>Ausgetragene Spiele</th>
    </tr>
    <tr v-for="stadium in filteredStadiums" :key="stadium.name">
      <td>{{ stadium.name }}</td>
      <td>{{ stadium.city }}</td>
      <td>{{ stadium.capacity }}</td>
      <td>{{ stadium.opened }}</td>
      <td>
        <ul>
          <li v-for="game in stadium.filteredGames" :key="game">{{ game }}</li>
        </ul>
      </td>
    </tr>
  </table>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Props für Titel
defineProps(['title'])

// Initialisierung Suche und Filter
const stadiums = ref([])
const searchQuery = ref('')
const filters = ref({
  city: '',
  capacity: '',
  phase: ''
})

// Initialisierung Stadien mit Daten
function initStadiums() {
  const initialStadiums = [
    {
      name: 'Mercedes-Benz-Stadion',
      city: 'Atlanta, GA',
      capacity: '75,000',
      opened: 2017,
      groupPhaseGames: [
        '16. Juni: Chelsea FC - Club León',
        '19. Juni: Inter Miami CF - FC Porto',
        '22. Juni: Manchester City - Al Ain FC'
      ],
      koPhaseGames: [
        '29. Juni: Achtelfinale: Sieger Gruppe B - Zweiter Gruppe A',
        '1. Juli: Achtelfinale: Sieger Gruppe F - Zweiter Gruppe E',
        '5. Juli: Viertelfinale: Sieger Spiel 51 - Sieger Spiel 52'
      ]
    },
    {
      name: 'Bank-of-America-Stadion',
      city: 'Charlotte, NC',
      capacity: '75,000',
      opened: 1996,
      groupPhaseGames: [
        '22. Juni: Real Madrid C.F. - CF Pachuca',
        '24. Juni: SL Benfica - FC Bayern München'
      ],
      koPhaseGames: [
        '28. Juni: Achtelfinale: Sieger Gruppe C - Zweiter Gruppe D',
        '30. Juni: Achtelfinale: Sieger Gruppe E - Zweiter Gruppe F'
      ]
    },
    {
      name: 'TQL-Stadion',
      city: 'Cincinnati, OH',
      capacity: '26,000',
      opened: 2021,
      groupPhaseGames: [
        '15. Juni: FC Bayern München - Auckland City FC',
        '18. Juni: CF Pachuca - FC Salzburg',
        '21. Juni: Mamelodi Sundowns FC - Borussia Dortmund',
        '25. Juni: Borussia Dortmund - Ulsan HD'
      ],
      koPhaseGames: []
    },
    {
      name: 'Rose-Bowl-Stadion',
      city: 'Los Angeles, CA',
      capacity: '88,500',
      opened: 1922,
      groupPhaseGames: [
        '15. Juni: Paris Saint-Germain - Atlético de Madrid',
        '17. Juni: CF Monterrey - FC Internazionale Milano',
        '19. Juni: Paris Saint-Germain - Botafogo',
        '21. Juni: CA River Plate - CF Monterrey',
        '23. Juni: Atlético de Madrid - Botafogo',
        '25. Juni: Urawa Red Diamonds - CF Monterrey'
      ],
      koPhaseGames: []
    },
    {
      name: 'Hard-Rock-Stadion',
      city: 'Miami, FL',
      capacity: '65,000',
      opened: 1987,
      groupPhaseGames: [
        '14. Juni: Al Ahly FC - Inter Miami CF',
        '16. Juni: CA Boca Juniors - SL Benfica',
        '18. Juni: Real Madrid C. F. - Al Hilal',
        '20. Juni: FC Bayern München - CA Boca Juniors',
        '23. Juni: Inter Miami CF - SE Palmeiras',
        '25. Juni: Mamelodi Sundowns FC - Fluminense FC'
      ],
      koPhaseGames: [
        '29. Juni: Achtelfinale: Sieger Gruppe D - Zweiter Gruppe C',
        '1. Juli: Achtelfinale: Sieger Gruppe H - Zweiter Gruppe G'
      ]
    },
    {
      name: 'GEODIS-Park',
      city: 'Nashville, TN',
      capacity: '30,000',
      opened: 2022,
      groupPhaseGames: [
        '20. Juni: Club León - Espérance Sportive de Tunis',
        '24. Juni: Auckland City FC - CA Boca Juniors',
        '26. Juni: Al Hilal - CF Pachuca'
      ],
      koPhaseGames: []
    },
    {
      name: 'MetLife-Stadion',
      city: 'New York New Jersey',
      capacity: '82,500',
      opened: 2010,
      groupPhaseGames: [
        '15. Juni: SE Palmeiras - FC Porto',
        '17. Juni: Fluminense FC - Borussia Dortmund',
        '19. Juni: SE Palmeiras - Al Ahly FC',
        '21. Juni: Fluminense FC - Ulsan HD',
        '23. Juni: FC Porto - Al Ahly FC'
      ],
      koPhaseGames: [
        '5. Juli: Viertelfinale: Sieger Spiel 55 - Sieger Spiel 56',
        '8. Juli: Halbfinale: Sieger Spiel 57 - Sieger Spiel 58',
        '9. Juli: Halbfinale: Sieger Spiel 59 - Sieger Spiel 60',
        '13. Juli: Finale: Sieger Spiel 61 - Sieger Spiel 62'
      ]
    },
    {
      name: 'Camping-World-Stadion',
      city: 'Orlando, FL',
      capacity: '65,000',
      opened: 1936,
      groupPhaseGames: [
        '24. Juni: Club León - CR Flamengo',
        '26. Juni: Juventus FC - Manchester City'
      ],
      koPhaseGames: [
        '30. Juni: Achtelfinale: Sieger Gruppe G - Zweiter Gruppe H',
        '4. Juli: Viertelfinale: Sieger Spiel 53 - Sieger Spiel 54'
      ]
    },
    {
      name: 'Inter&Co-Stadion',
      city: 'Orlando, FL',
      capacity: '25,000',
      opened: 2017,
      groupPhaseGames: [
        '17. Juni: Ulsan HD - Mamelodi Sundowns FC',
        '20. Juni: SL Benfica - Auckland City FC'
      ],
      koPhaseGames: []
    },
    {
      name: 'Lincoln Financial Field',
      city: 'Philadelphia, PA',
      capacity: '69,000',
      opened: 2003,
      groupPhaseGames: [
        '16. Juni: CR Flamengo - Espérance Sportive de Tunis',
        '18. Juni: Manchester City - Wydad AC',
        '20. Juni: CR Flamengo - Chelsea FC',
        '24. Juni: Espérance Sportive de Tunis - Chelsea FC',
        '26. Juni: FC Salzburg - Real Madrid C. F.'
      ],
      koPhaseGames: [
        '28. Juni: Achtelfinale: Sieger Gruppe A - Zweiter Gruppe B',
        '4. Juli: Viertelfinale: Sieger Spiel 49 - Sieger Spiel 50'
      ]
    },
    {
      name: 'Lumen Field',
      city: 'Seattle, WA',
      capacity: '69,000',
      opened: 2002,
      groupPhaseGames: [
        '15. Juni: Botafogo - Seattle Sounders FC',
        '17. Juni: CA River Plate - Urawa Red Diamonds',
        '19. Juni: Seattle Sounders FC - Atlético de Madrid',
        '21. Juni: FC Internazionale Milano - Urawa Red Diamonds',
        '23. Juni: Seattle Sounders FC - Paris Saint-Germain'
      ],
      koPhaseGames: []
    },
    {
      name: 'Audi Field',
      city: 'Washington, D.C.',
      capacity: '20,000',
      opened: 2018,
      groupPhaseGames: [
        '18. Juni: Al Ain FC - Juventus FC',
        '22. Juni: FC Salzburg - Al Hilal',
        '26. Juni: Wydad AC - Al Ain FC'
      ],
      koPhaseGames: []
    }
  ]

  // Kompilieren und Formatieren der Spiele von Gruppenphase und K.O.-Phase
  initialStadiums.forEach((stadium) => {
    const allGames = []
    stadium.groupPhaseGames.forEach((game) => {
      const [date, teams] = game.split(': ')
      allGames.push(`Gruppenphase: ${teams} (${date})`)
    })
    stadium.koPhaseGames.forEach((game) => {
      const [date, teams] = game.split(': ')
      allGames.push(`K.O.-Phase: ${teams} (${date})`)
    })
    stadium.games = allGames
    stadiums.value.push(stadium)
  })
}

// Suche Stadien basierend auf Suchbegriff und Filtern
const filteredStadiums = computed(() => {
  return stadiums.value.map((stadium) => {
    const matchesSearchQuery = stadium.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesFilters = ['city', 'capacity'].every((column) => {
      return filters.value[column] === '' || stadium[column] === filters.value[column]
    })

    // Filtern gemäß ausgewählter Phase
    stadium.filteredGames = stadium.games.filter((game) => {
      if (filters.value.phase === 'group') {
        return game.startsWith('Gruppenphase:')
      } else if (filters.value.phase === 'ko') {
        return game.startsWith('K.O.-Phase:')
      }
      return true
    })

    // Rückgabe der Stadien, die den Kriterien entsprechen
    return matchesSearchQuery && matchesFilters && stadium.filteredGames.length > 0
      ? stadium
      : null
  }).filter(Boolean)
})

// Gibt sichtbare Werte für Spalte Stadion zurück
function getUniqueValues(column) {
  const values = stadiums.value.map((stadium) => stadium[column])
  return [...new Set(values)]
}

// Stadien beim Laden der Komponente aufrufen
onMounted(() => {
  initStadiums()
})

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
  margin: 8px 0;
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
th:nth-child(2), td:nth-child(2) { width: 15%; }
th:nth-child(3), td:nth-child(3) { width: 10%; }
th:nth-child(4), td:nth-child(4) { width: 10%; }
th:nth-child(5), td:nth-child(5) { width: 45%; }

/* Formatierung Filter und Suchfunktion */
input,
select {
  margin-right: 20px;
  padding: 5px;
}

/* Formatierung Werte in Zellen */
ul {
  padding: 0;
  list-style-type: none;
}

li {
  margin-bottom: 8px;
}
</style>
