
<template>
  <h3>{{ title }}</h3>

</template>


<script setup>
// Props für Titel
defineProps(['title']);

import { ref, onMounted } from 'vue';
import apiClient from '../axios.js';

const matches = ref([]);

onMounted(async () => {
  try {
    const response = await apiClient.get('/matches');
    matches.value = response.data;
  } catch (error) {
    console.error("Error fetching matches:", error);
  }
});
</script>


<style scoped>

</style>
