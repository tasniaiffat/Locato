import GoogleMapView from "@/components/GoogleMapView";
import { LocationContext } from "@/contexts/LocationContext";
import { SpecialistLocationContext } from "@/contexts/SpecialistLocationContext";
import { getLocationPermission } from "@/services/getLocationPermission";
import { CoordinateType } from "@/types/CoordinateType";
import * as Location from "expo-location";
import { useLocalSearchParams, useSearchParams } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import { View } from "react-native";

const MapPage = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const { coordinatesParam } = useLocalSearchParams();
  const [specialistLocation, setSpecialistLocation] = useState<CoordinateType[]>([]);

  console.log("coordinatesParam", coordinatesParam);
    
  useEffect(() => {
    if (coordinatesParam && typeof coordinatesParam === "string") {
      const decodedCoordinates = JSON.parse(coordinatesParam);
      console.log("decodedCoordinates", decodedCoordinates);
      
    }
  })
  
  useEffect(() => {
    getLocationPermission()
      .then((status) => {
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }
      })
      .then(async () => {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      });

  }, []);

  return (
    <View>
      <SpecialistLocationContext.Provider value={{locations: specialistLocation, setLocations: setSpecialistLocation}}>
        <LocationContext.Provider value={{ location, setLocation }}>
          <GoogleMapView />
        </LocationContext.Provider>
      </SpecialistLocationContext.Provider>
    </View>
  );
};
export default MapPage;

