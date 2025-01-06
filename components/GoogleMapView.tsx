import { Dispatch, SetStateAction, useEffect, useState } from "react";
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
import useSelectedSpecialist from "@/hooks/useSelectedSpecialist";
import { SpecialistType } from "@/types/SpecialistType";

type MapRegionType = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

type GoogleMapViewProps = {
  specialists: SpecialistType[];
  setSpecialists: Dispatch<SetStateAction<SpecialistType[]>>;
  location: Location.LocationObject | null;
  setLocation: Dispatch<SetStateAction<Location.LocationObject | null>>;
  errorMsg: string | null;
  setErrorMsg: Dispatch<SetStateAction<string | null>>;
  mapRegion: MapRegionType;
  setMapRegion: Dispatch<SetStateAction<MapRegionType>>;
  style?: object;
};

const GoogleMapView = ({
  specialists,
  setSpecialists,
  location,
  setLocation,
  errorMsg,
  setErrorMsg,
  mapRegion,
  setMapRegion,
  style
}: GoogleMapViewProps) => {
  // const [location, setLocation] = useState<Location.LocationObject | null>(null);
  // const [errorMsg, setErrorMsg] = useState<string | null>(null);
  // const [mapRegion, setMapRegion] = useState({
  //   latitude: 0,
  //   longitude: 0,
  //   latitudeDelta: 0.0922,
  //   longitudeDelta: 0.0421,
  // });
  
  const {selectedSpecialist, setSelectedSpecialist } = useSelectedSpecialist();
  

  // useEffect(() => {
  //   console.log("1st useEffect");
    
  //   getLocationPermission()
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
  // }, []);



  useEffect(() => {
    console.log("2nd useEffect");
    if (!location) {
      console.log("No location");
      return;
    };
    

    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    console.log("Map region", mapRegion);
    
  }, [location]);
  // console.log("location", location);
  if (location === null) {
    return (
      <View style={styles.bottom_container}>
        <Text>{errorMsg}</Text>
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
            style={styles.map}>
            {/* <Marker 
              title="You" 
              coordinate={mapRegion} /> */}

            {specialists && specialists.map((specialist, index) => (
              <Marker 
                key={index}
                title={specialist.name}
                coordinate={{ latitude: specialist.locationLatitude, longitude: specialist.locationLongitude }} 
                onSelect={() => {
                  setSelectedSpecialist(specialist);
                  console.log("Selected specialist", specialist);
                }}
                onDeselect={() => {
                  console.log("Deselected specialist");
                  setSelectedSpecialist(null)
                }}
                pinColor="blue" />
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
    minHeight: Dimensions.get("screen").height*0.5,
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
