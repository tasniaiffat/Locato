import BottomSheet from "@/components/BottomSheet";
import GoogleMapView from "@/components/GoogleMapView";
import { CoordinateType } from "@/types/CoordinateType";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
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
import * as SecureStore from "expo-secure-store";

const submitAssistanceRequest = async (
  data: string,
  latitude: number,
  longitude: number
) => {
  console.log("Submitting request");

  try {
    const requestBody = {
      requestText: data,
    };
    const userId = await SecureStore.getItemAsync("userId");
    if (!userId) {
      Alert.alert("Error", "User not logged in. Please login to continue.");
      return;
    }
    const uri = encodeURI(
      `/sp/SpecialistRadius?givenText=${data}&userId=${userId}&latitude=${latitude}&longitude=${longitude}&count=10&page=0&size=10`
    );

    const response = await api.get(uri);

    console.log("Data: ", response.data);

    // setSpecialists(response.data.content);
    const jobType = response.data.specialistName;
    await SecureStore.setItemAsync("jobType", jobType);

    const specialistList: SpecialistType[] = response.data.serviceProviders;

    const specialistsCoordinates: CoordinateType[] = specialistList.map(
      (specialist: any) => {
        return {
          latitude: specialist.locationLatitude,
          longitude: specialist.locationLongitude,
        };
      }
    );
    console.log("Specialists coordinates", specialistsCoordinates);

    return { specialistList, specialistsCoordinates };
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

  const fetchSpecialists = async () => {
    const response = await submitAssistanceRequest(
      query as string,
      location?.coords.latitude || 23,
      location?.coords.longitude || 90
    );

    setSpecialists(response?.specialistList || []);
  };

  useEffect(() => {
    fetchSpecialists();
  }, []);

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
        errorMsg={errorMsg}
        setErrorMsg={setErrorMsg}
      />
      <BottomSheet />
    </GestureHandlerRootView>
  );
};
export default MapPage;
