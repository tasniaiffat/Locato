import axios from "axios";


export const getCoordinatesFromAddress = async (address: string) => {
    const URL = process.env.EXPO_PUBLIC_LOCATIONIQ_URL;
    const API_KEY = process.env.EXPO_PUBLIC_LOCATIONIQ_API_KEY;
    //https://us1.locationiq.com/v1/search?key=Your_API_Access_Token&q=221b%2C%20Baker%20St%2C%20London%20&format=json&

    try {
      const url = `${URL}/search?key=${API_KEY}&q=${encodeURIComponent(address)}&format=json&`;
      console.log("URL", url);
      
      const data = (await axios.get(`${URL}/search?key=${API_KEY}&q=${encodeURIComponent(address)}&format=json&`)).data;
  
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        return {
          latitude: parseFloat(lat),
          longitude: parseFloat(lon),
        };
      } else {
        throw new Error("Unable to fetch coordinates for the given address.");
      }
    } catch (error) {
      console.error("Error in getCoordinatesFromAddress:", error);
      throw error;
    }
  };
  