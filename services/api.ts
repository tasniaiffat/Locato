import axios from "axios";

const api = axios.create({
  baseURL: "http://10.33.19.104:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

export const mlAPI = axios.create({
  baseURL: "http://10.33.19.104:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
