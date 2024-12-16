import { useEffect, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { View, Text } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
  GestureHandlerRootView,
  TapGestureHandler,
} from "react-native-gesture-handler";
import * as Location from "expo-location";
import { getLocationPermission } from "@/services/getLocationPermission";
import { CoordinateType } from "@/types/CoordinateType";

const GoogleMapView = ({
  specialistLocations: specialistLocation,
  style
}: {
  specialistLocations: CoordinateType[];
  style?: object;
}) => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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
        console.log("location", location);

        setLocation(location);
      });
  }, []);

  const specialistLocations = [{ latitude: 23.765844, longitude: 90.35836 }];

  const [mapRegion, setMapRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    if (!location) return;

    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  }, [location]);
  console.log("location", location);

  return (
    <View style={{ ...styles.container, ...style }}>
      <GestureHandlerRootView>
        <TapGestureHandler>
          <MapView
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            showsMyLocationButton={true}
            region={mapRegion}
            style={styles.map}>
            <Marker title="You" coordinate={mapRegion} />

            {specialistLocations &&
              specialistLocations.map((location, index) => (
                <Marker
                  key={index}
                  title="Specialist"
                  coordinate={location}
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
    height: Dimensions.get("screen").height*0.5,
  },
  map: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
    alignSelf: "center",
  },
  bottom_container: {
    padding: 10,
  },
});
