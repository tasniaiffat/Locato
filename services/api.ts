import axios from "axios";

// Create the Axios instance
const api = axios.create({
  baseURL: "http://192.168.0.106:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

export const mlAPI = axios.create({
  baseURL: "http://192.168.0.106:8000",
  headers: {
    "Content-Type": "application/json",
  },
})

export default api;
