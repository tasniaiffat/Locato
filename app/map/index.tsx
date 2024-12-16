import BottomSheet from "@/components/BottomSheet";
import GoogleMapView from "@/components/GoogleMapView";
import { CoordinateType } from "@/types/CoordinateType";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import api from "@/services/api";
import { showAlert } from "@/services/alertUtil";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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
    const specialists = response.data.content;

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
  console.log("Query: ", query);

  const [specialists, setSpecialists] = useState([]);
  const [specialistLocations, setSpecialistLocation] = useState<
    CoordinateType[]
  >([]);

  useEffect(() => {
    (async () => {
      const data = await submitAssistanceRequest(query as string);
      setSpecialists(data?.specialistList || []);
      setSpecialistLocation(data?.specialistsCoordinates || []);
    })();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <GoogleMapView specialistLocations={specialistLocations} setSpecialistLocation={setSpecialistLocation} />
        <BottomSheet />
    </GestureHandlerRootView>
  );
};
export default MapPage;


const styles = StyleSheet.create({
  bottomSheet: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    elevation: 50,
  },
  mapContainer: {
    flex: 1,
  }
});
