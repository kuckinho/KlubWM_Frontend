
<template>
  <h3>{{ title }}</h3>

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
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
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
</script>

<style>
h3 {
  margin-bottom: 50px;
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
