import { LocationContext } from '@/contexts/LocationContext'
import { SpecialistLocationContext } from '@/contexts/SpecialistLocationContext'
import { useContext, useEffect, useState } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { View, Text } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'


const GoogleMapView = () => {
  const context = useContext(LocationContext);
  const specialistContext = useContext(SpecialistLocationContext);
  
  if(!context) {
    throw new Error("LocationContext not found")
  }
  if(!specialistContext) {
    throw new Error("SpecialistLocationContext not found")
  }

  const { location } = context;
  const { locations } = specialistContext;

  const specialistLocations = [
    { latitude: 23.765844, longitude: 90.358360 },
  ];

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
    })
  }, [location]);



  return (
    <View>
      <MapView
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsMyLocationButton={true}
        region={mapRegion}
        style={styles.map}
        >
        {/* <Marker
          title='You'
          coordinate={mapRegion} /> */}

        {specialistLocations && specialistLocations.map((location, index) => (
          <Marker
            key={index}
            title='Specialist'
            coordinate={location}
            pinColor='blue'
          />
        ))}
      </MapView>
      <View style={styles.bottom_container}>
        <Text>Specialists Available Nearby</Text>
      </View>
    </View>
  )
}
export default GoogleMapView;


const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height*0.8,
    alignSelf: 'center',
  },
  bottom_container: {
    padding: 10,
  }
})