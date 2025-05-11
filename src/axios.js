import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITEAPIURL, // verwendet die Umgebungsvariable
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
