import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vite.dev/config/
export default defineConfig({
  // Hier Basispfad Projekt definieren
  base: '/',

  plugins: [
    vue(),
    vueDevTools(),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  // Optional: Falls zusätzliche serverbezogene Entwicklungen oder Proxies benötigt werden
  server: {
    port: 3000, // Beispielport für lokales Arbeiten, Standard: 5173
    strictPort: true, // Fehler, wenn Port bereits belegt
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // Ziel-API-Server
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
