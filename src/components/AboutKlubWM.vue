
<template>
  <h3>{{ title }}</h3>
  <div class="container">

    <!-- Linkes Bild -->
    <div class="image-container-l1">
      <img src="/ChampionsBadge.png" alt="Champions Badge" />
    </div>

    <!-- Hauptinhalt -->
    <div class="about-component">
      <section>
        <h1>Allgemeine Informationen</h1>
        <ul>
          <li>Die FIFA-Klub-Weltmeisterschaft (engl.: FIFA Club World Cup) ist die offizielle Weltmeisterschaft für Fußball-Vereinsmannschaften</li>
          <li>Ab 2025 wird das Turnier in einem neuen Format mit 32 teilnehmenden Teams ausgetragen</li>
          <li>Das erste Turnier im neuen Modus findet in den Vereinigten Staaten statt</li>
          <li>Mit der Umstellung wird das Turnier künftig alle vier Jahre stattfinden. Die teilnehmenden Mannschaften qualifizieren sich über mehrere Jahre hinweg über ihre jeweiligen kontinentalen Wettbewerbe</li>
        </ul>
      </section>

      <section>
        <h1>Informationen zu Turniermodus</h1>
        <ul>
          <li>Das Turnier beinhaltet eine Gruppenphase mit anschließender K.O.-Phase</li>
          <li>Die Gruppenphase wird mit acht Vierergruppen im Jeder-gegen-jeden-Modus ausgetragen, wobei sich die beiden besten Mannschaften jeder Gruppe für das Achtelfinale qualifizieren</li>
          <li>Die K.O.-Phase beinhaltet die nachfolgenden Spielrunden:
            <ul>
              <li>Achtelfinale: Acht Spiele</li>
              <li>Viertelfinale: Vier Spiele</li>
              <li>Halbfinale: Zwei Spiele</li>
              <li>Finale: Ein Spiel</li>
            </ul>
          </li>
          <li>Das Spiel um den 3. Platz wird nicht ausgespielt</li>
        </ul>
      </section>

      <section>
        <h1>Informationen zu Teilnehmerkreis und Auslosung</h1>
        <ul>
          <li>Es nehmen insgesamt 32 Mannschaften aus folgenden Verbänden an dem Turnier teil:
            <ul>
              <li>Ein Startplatz: OFC (Ozeanien)</li>
              <li>Vier Startplätze: AFC (Asien)</li>
              <li>Vier Startplätze: CAF (Afrika)</li>
              <li>Vier Startplätze: CONCACAF (Nord- und Mittelamerika sowie die Karibik)</li>
              <li>Sechs Startplätze: CONMEBOL (Südamerika)</li>
              <li>Zwölf Startplätze: UEFA (Europa)</li>
            </ul>
          </li>
          <li>Die Gruppenzuteilung erfolgte per Losverfahren, wobei alle teilnehmenden Mannschaften anhand der Konföderationen und der Ranglisten innerhalb der jeweiligen Konföderationen in vier Töpfe aufgeteilt wurden.</li>
          <li>Jeder Gruppe wurde je eine Mannschaft aus jedem Topf zugelost. Anhand der Topfeinteilung wurde sichergestellt, dass in jeder Gruppe maximal zwei europäische Mannschaften vertreten sind.</li>
        </ul>
      </section>

      <section>
        <h1>Historie</h1>
        <ul>
          <li>Die erste Klub-WM wurde in Brasilien mit acht Mannschaften ausgetragen, welche in zwei Vierer-Gruppen jeweils einmal gegeneinander spielten. Die Gruppensieger spielten gegeneinander das Finale, die beiden Zweitplatzierten das Spiel um den 3. Platz.</li>
          <li>Im Jahr 2001 war ein Turnier mit zwölf Mannschaften in Spanien geplant. Dabei sollten die Mannschaften in drei Vierer-Gruppen gegeneinander spielen. Die Gruppensieger sowie der beste Zweitplatzierte sollten das Halbfinale austragen. Dieses Turnier wurde aus finanziellen Gründen jedoch abgesagt.</li>
          <li>Von 2005 bis 2023 wurde das Turnier im K.-o.-System ausgetragen: Dabei waren die beiden Vertreter aus Südamerika und Europa für das Halbfinale gesetzt. Die Mannschaften aus den übrigen vier Konföderationen spielten im Viertelfinale die beiden Halbfinalgegner aus. Neben dem Finale wurde zwischen den beiden Halbfinalverlierern der 3. Platz ausgespielt. Zwischen den beiden Viertelfinalverlierern wurde der 5. Platz ausgespielt.</li>
          <li>Im Jahr 2022 wurde bekannt, dass die FIFA den Wettbewerb grundlegend neu strukturieren würde: Statt dem bisher jährlich in den Wintermonaten ausgetragenen Wettbewerb mit sieben Mannschaften wird fortan in einem 4-Jahres-Rhythmus mit 32 Mannschaften gespielt.</li>
          <li>Im Zuge der Reform wurde 2024 zusätzlich der FIFA-Interkontinental-Pokal eingeführt. Dieser Wettbewerb mit begrenzter Teilnehmerzahl ersetzt das bisherige jährliche Klub-WM-Format und soll weiterhin eine jährliche internationale Plattform für Vereinsfußball bieten.</li>
        </ul>
      </section>
    </div>

    <!-- Rechtes Bild -->
    <div class="image-container-r1">
      <img src="/CupTrophy.png" alt="Cup Trophy" />
    </div>

  </div>

</template>

<script setup>
// Props für Titel
defineProps(['title']);
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  height: auto;
}

.image-container-l1, .image-container-r1 {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 auto;
}

.image-container-l1 img {
  max-width: 150px;
  height: auto;
  margin: 0 40px;
}

.image-container-r1 img {
  max-width: 200px;
  height: auto;
  margin: 0 10px;
}

.about-component {
  flex: 1;
  max-width: 800px;
  margin: 0 10px; /* Weniger Margin um den Textinhalt */
}

section {
  margin-bottom: 20px;
}

h1 {
  margin-bottom: 10px;
  font-weight: bold;
  text-align: left;
}

ul {
  list-style-type: disc;
  margin-left: 20px;
}
</style>
