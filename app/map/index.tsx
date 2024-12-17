import BottomSheet from "@/components/BottomSheet";
import GoogleMapView from "@/components/GoogleMapView";
import { CoordinateType } from "@/types/CoordinateType";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import api from "@/services/api";
import { showAlert } from "@/services/alertUtil";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SpecialistType } from "@/types/SpecialistType";
import { SelectedSpecialistContext } from "@/contexts/SelectedSpecialistContext";

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
    {"active": true, "certifications": "string", "createdAt": "2024-11-21T19:55:41.279824", "email": "miraj@gmail.com", "experienceYears": 0, "id": 25, "locationLatitude": 23.765844, "locationLongitude": 90.35836, "name": "Miraj", "rating": 0, "role": "ROLE_SERVICE_PROVIDER", "serviceRate": 0, "specialties": [], "updatedAt": "2024-11-21T19:55:41.279824", "zone": {}},
    {"active": true, "certifications": "string", "createdAt": "2024-11-21T19:55:41.279824", "email": "tahsinj@gmail.com", "experienceYears": 0, "id": 25, "locationLatitude": 23.763844, "locationLongitude": 90.35936, "name": "Tahsin", "rating": 0, "role": "ROLE_SERVICE_PROVIDER", "serviceRate": 0, "specialties": [], "updatedAt": "2024-11-21T19:55:41.279824", "zone": {}}
  ]);
  const [selectedSpecialist, setSelectedSpecialist] = useState<SpecialistType | null>(null);
  

  useEffect(() => {
    (async () => {
      const data = await submitAssistanceRequest(query as string);
      // setSpecialists(data?.specialistList || []);
    })();
  }, []);

  return (
    <SelectedSpecialistContext.Provider value={{selectedSpecialist, setSelectedSpecialist}}>
      <GestureHandlerRootView style={{ flex: 1 }}>
          <GoogleMapView specialists={specialists} setSpecialists={setSpecialists} />
          <BottomSheet />
      </GestureHandlerRootView>
    </SelectedSpecialistContext.Provider>
  );
};
export default MapPage;

