import axios from 'axios';

// Create the Axios instance
const api = axios.create({
  baseURL: 'http://172.20.10.5:8080',
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
