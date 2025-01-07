import BottomSheet from "@/components/BottomSheet";
import GoogleMapView from "@/components/GoogleMapView";
import { CoordinateType } from "@/types/CoordinateType";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import api from "@/services/api";
import { showAlert } from "@/services/alertUtil";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SpecialistRole, SpecialistType } from "@/types/SpecialistType";
import { SelectedSpecialistContext } from "@/contexts/SelectedSpecialistContext";
import { getLocationPermission } from "@/services/getLocationPermission";
import * as Location from "expo-location";
import useSelectedSpecialist from "@/hooks/useSelectedSpecialist";
import { useLocation } from "@/hooks/useLocation";
import { useMapRegion } from "@/hooks/useMapRegion";


const submitAssistanceRequest = async (data: string) => {
  console.log("Submitting request");

  try {
    const requestBody = {
      requestText: data,
    };

    const response = await api.post("/assistance", requestBody);

    if (response.status !== 200) {
      console.log("Request failed");
      showAlert(
        "Error",
        "Failed to submit assistance request. Please try again."
      );
      throw new Error("Request failed");
    }

    console.log("Data: ", response.data);

    // setSpecialists(response.data.content);
    const specialists: SpecialistType[] = response.data.content;

    const specialistsCoordinates: CoordinateType[] = specialists.map(
      (specialist: any) => {
        return {
          latitude: specialist.locationLatitude,
          longitude: specialist.locationLongitude,
        };
      }
    );
    console.log("Specialists coordinates", specialistsCoordinates);
    // setSpecialistLocation(specialistsCoordinates);
    return { specialistList: specialists, specialistsCoordinates };
  } catch (error) {
    console.log("Error in request submission");
    console.error("Error:", error);
    showAlert("Error", "An error occurred. Please try again.");
  }
};

const MapPage = () => {
  const { query } = useLocalSearchParams();
  // console.log("Query: ", query);

  const [specialists, setSpecialists] = useState<SpecialistType[]>([
    {"active": true, "certifications": "string", "createdAt": "2024-11-21T19:55:41.279824", "email": "miraj@gmail.com", "experienceYears": 0, "id": 25, "locationLatitude": 23.765844, "locationLongitude": 90.35836, "name": "Miraj", "rating": 3, "role": SpecialistRole.ROLE_SERVICE_PROVIDER, "serviceRate": 0, "specialties": [], "updatedAt": "2024-11-21T19:55:41.279824", "zone":  {createdAt:null, id:1, title:"Dhaka", updatedAt:null}},
    {"active": true, "certifications": "string", "createdAt": "2024-11-21T19:55:41.279824", "email": "tahsinj@gmail.com", "experienceYears": 0, "id": 25, "locationLatitude": 23.763844, "locationLongitude": 90.35936, "name": "Tahsin", "rating": 4, "role": SpecialistRole.ROLE_SERVICE_PROVIDER, "serviceRate": 0, "specialties": [], "updatedAt": "2024-11-21T19:55:41.279824", "zone": {createdAt:null, id:1, title:"Dhaka", updatedAt:null}},
  ]);
  const { selectedSpecialist, setSelectedSpecialist } = useSelectedSpecialist();

  // const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  // const [mapRegion, setMapRegion] = useState({
  //   latitude: 0,
  //   longitude: 0,
  //   latitudeDelta: 0.0922,
  //   longitudeDelta: 0.0421,
  // });

  const { location, setLocation } = useLocation();
  const { mapRegion, setMapRegion } = useMapRegion();

  console.log("Location", location);
  console.log("Map Region", mapRegion);
  

  

  // useEffect(() => {
  //   console.log("1st useEffect");
  //   (async () => {
  //     const data = await submitAssistanceRequest(query as string);
  //     getLocationPermission()
  //     .then((status) => {
  //       if (status !== "granted") {
  //         setErrorMsg("Permission to access location was denied");
  //         return;
  //       }
  //     })
  //     .then(async () => {
  //       let location = await Location.getCurrentPositionAsync({});
  //       console.log("location", location);

  //       setLocation(location);
  //       setMapRegion({
  //         latitude: location.coords.latitude,
  //         longitude: location.coords.longitude,
  //         latitudeDelta: 0.0922,
  //         longitudeDelta: 0.0421,
  //       })
  //       console.log("Specialists");
        
  //       specialists && specialists.forEach( specialist => console.log(specialist.locationLatitude, specialist.locationLongitude));
  //     });
  //     // setSpecialists(data?.specialistList || []);
  //   })();
  // }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <GoogleMapView 
          specialists={specialists} 
          setSpecialists={setSpecialists}
          errorMsg = {errorMsg}
          setErrorMsg = {setErrorMsg} />
        <BottomSheet />
    </GestureHandlerRootView>
  );
};
export default MapPage;

