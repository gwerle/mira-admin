import axios from 'axios';

const api = axios.create({
  baseURL: 'https://apimira.sharedgis.com/',
});

export default api;
