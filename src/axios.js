import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL, // Umgebungsvariable
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
