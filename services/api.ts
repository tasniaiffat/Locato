import axios from "axios";
// import AsyncStorage from '@react-native-async-storage/async-storage';

// Create the Axios instance
const api = axios.create({
  baseURL: 'http://192.168.0.121:8080',
  headers: {
    "Content-Type": "application/json",
  },
});

// api.interceptors.request.use(
//   async (config) => {
//     const token = await AsyncStorage.getItem('token'); // Get the token from AsyncStorage
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`; // Attach the token in Authorization header
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default api;
