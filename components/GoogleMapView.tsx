import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { View, Text } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
  GestureHandlerRootView,
  TapGestureHandler,
} from "react-native-gesture-handler";
import useSelectedSpecialist from "@/hooks/useSelectedSpecialist";
import { SpecialistType } from "@/types/SpecialistType";
import { useLocation } from "@/hooks/useLocation";
import { useMapRegion } from "@/hooks/useMapRegion";

type GoogleMapViewProps = {
  specialists: SpecialistType[];
  setSpecialists: Dispatch<SetStateAction<SpecialistType[]>>;
  errorMsg: string | null;
  setErrorMsg: Dispatch<SetStateAction<string | null>>;
  style?: object;
};

const GoogleMapView = ({
  specialists,
  setSpecialists,
  errorMsg,
  setErrorMsg,
  style,
}: GoogleMapViewProps) => {
  const { selectedSpecialist, setSelectedSpecialist } = useSelectedSpecialist();
  const { location } = useLocation();
  const { mapRegion, setMapRegion } = useMapRegion();
  const [isRegionSet, setIsRegionSet] = useState(false);

  useEffect(() => {
    if (location) {
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      setIsRegionSet(true); // Mark region as set after initializing
    }
  }, [location]);

  if (!location || !isRegionSet) {
    return (
      <View style={styles.bottom_container}>
        <Text>{errorMsg || "Loading location..."}</Text>
      </View>
    );
  }

  return (
    <View style={{ ...styles.container, ...style }}>
      <GestureHandlerRootView>
        <TapGestureHandler>
          <MapView
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            showsMyLocationButton={true}
            region={mapRegion}
            style={styles.map}
          >
            {specialists &&
              specialists.map((specialist, index) => (
                <Marker
                  key={index}
                  title={specialist.name}
                  coordinate={{
                    latitude: specialist.locationLatitude,
                    longitude: specialist.locationLongitude,
                  }}
                  onSelect={() => {
                    setSelectedSpecialist(specialist);
                    console.log("Selected specialist", specialist);
                  }}
                  onDeselect={() => {
                    console.log("Deselected specialist");
                    setSelectedSpecialist(null);
                  }}
                  pinColor="blue"
                />
              ))}
          </MapView>
        </TapGestureHandler>
      </GestureHandlerRootView>
    </View>
  );
};

export default GoogleMapView;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("screen").width,
    minHeight: Dimensions.get("screen").height * 0.5,
    flex: 1,
  },
  map: {
    width: Dimensions.get("screen").width,
    flex: 1,
    alignSelf: "center",
  },
  bottom_container: {
    padding: 10,
  },
});
