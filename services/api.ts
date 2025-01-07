import axios from 'axios';

// Create the Axios instance
const api = axios.create({
  baseURL: 'http://10.33.19.104:8080',
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
