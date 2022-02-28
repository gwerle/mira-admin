import axios from 'axios';

const api = axios.create({
  baseURL: 'http://apimira.sharedgis.com/',
});

export default api;
