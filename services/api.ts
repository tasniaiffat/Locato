import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.0.127:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

export const mlAPI = axios.create({
  baseURL: "http://192.168.0.127:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
