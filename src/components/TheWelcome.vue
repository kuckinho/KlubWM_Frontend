
<template>
  <h3>{{ title }}</h3>
  <h2>Hier findest du Informationen und Funktionen rund um die FIFA Klub-WM 2025</h2>

  <!-- Flex Container für Icon-basierte Navigation -->
  <div class="icon-nav-container">
    <div class="icon-nav-row">
      <router-link to="/login" class="icon-nav-link">
        <div class="icon-nav-item">
          <img src="/Home_Login.png" alt="Home Icon" class="nav-icon" />
          <p>Zum Login</p>
        </div>
      </router-link>
      <router-link to="/calculator" class="icon-nav-link">
        <div class="icon-nav-item">
          <img src="/Home_Tabellenrechner.png" alt="Home Icon" class="nav-icon" />
          <p>Zum Tabellenrechner</p>
        </div>
      </router-link>
      <router-link to="/timer" class="icon-nav-link">
        <div class="icon-nav-item">
          <img src="/Home_Countdown.png" alt="Timer Icon" class="nav-icon" />
          <p>Zur Countdown-Funktion</p>
        </div>
      </router-link>
      <router-link to="/pictures" class="icon-nav-link">
        <div class="icon-nav-item">
          <img src="/Home_PicturesGallery.png" alt="Pictures Icon" class="nav-icon" />
          <p>Zur HTW-Ehrengalerie</p>
        </div>
      </router-link>
    </div>
    <div class="icon-nav-row">
      <router-link to="/about" class="icon-nav-link">
        <div class="icon-nav-item">
          <img src="/Home_About.png" alt="About Icon" class="nav-icon" />
          <p>Informationen zur Klub WM</p>
        </div>
      </router-link>
      <router-link to="/tournament" class="icon-nav-link">
        <div class="icon-nav-item">
          <img src="/Home_Turnierbaum.png" alt="Tournament Icon" class="nav-icon" />
          <p>Informationen zur Turnierlogik</p>
        </div>
      </router-link>
      <router-link to="/clubs" class="icon-nav-link">
        <div class="icon-nav-item">
          <img src="/Home_Clubs.png" alt="Clubs Icon" class="nav-icon" />
          <p>Informationen zu Teilnehmern</p>
        </div>
      </router-link>
      <router-link to="/stadiums" class="icon-nav-link">
        <div class="icon-nav-item">
          <img src="/Home_Spielorte.png" alt="Stadiums Icon" class="nav-icon" />
          <p>Informationen zu Spielorten</p>
        </div>
      </router-link>
    </div>
  </div>

  <section class="home-image">
    <img src="/Home1.png" alt="Bild 1" class="home-image" />
  </section>

  <div class="video-container">
    <h2>Bald rollt der Ball! </h2>
    <video controls autoplay muted width="100%" style="max-width: 2000px;">
      <source src="/public/Video2.mp4" type="video/mp4" />
    </video>
  </div>

  <div class="video-container">
    <h2>Die Vorfreude steigt! </h2>
    <video controls autoplay muted width="100%" style="max-width: 2000px;">
      <source src="/public/Video1.mp4" type="video/mp4" />
    </video>
  </div>
</template>

<script setup>
defineProps(['title']);
</script>

<style scoped>
h3 {
  margin-bottom: 10px;
}

h2 {
  margin-top: 10px;
}

.home-image {
  width: 1900px;
  height: auto;
  display: block;
}

/* Flex Container für Icon-basierte Navigation */
.icon-nav-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
}

/* Jede Reihe enthält vier Icons */
.icon-nav-row {
  display: flex;
  justify-content: center;
  gap: 50px;
}

/* Styling für die Links */
.icon-nav-link {
  text-decoration: none;
  color: #ccffcc;
  background-color: transparent;
}

/* Styling für die einzelnen Navigations-Icons und Texte */
.icon-nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
}

.nav-icon {
  width: 60px;
  height: 60px;
  margin-bottom: 5px;
}

.icon-nav-item:hover p {
  color: #39FF14;
  font-weight: bold;
}

.video-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
}
</style>
