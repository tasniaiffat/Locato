import { Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, Stack } from 'expo-router'
import { NativeBaseProvider, Box } from "native-base";
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { SpecialistType } from '@/types/SpecialistType';
import { SelectedSpecialistContext } from '@/contexts/SelectedSpecialistContext';
import { usePushNotifications } from '@/hooks/usePushNotifications';
import * as Location from 'expo-location';
import { LocationContext } from '@/contexts/LocationContext';
import { getLocationPermission } from '@/services/getLocationPermission';
import { MapRegionContext } from '@/contexts/MapRegionContext';
import { StripeProvider } from '@stripe/stripe-react-native';
import api from '@/services/api';

const fetchKey = async () => {
  try {
    const response = await api.get('/stripe-public-key');

    const { public_key } = response.data;

    return public_key;
  } catch (error) {
    console.error(error);
    return '';
  }
}

const RootLayout = () =>{
  const [publishableKey, setPublishableKey] = useState('');
  const [selectedSpecialist, setSelectedSpecialist] = useState<SpecialistType | null>(null);
  const { expoPushToken, notification } = usePushNotifications();
  const [location, setLocation ] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [mapRegion, setMapRegion] = useState({
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
  });

  const data = JSON.stringify(notification,undefined,2);
  console.log(expoPushToken);
  console.log(data);


  useEffect(() => {
      console.log("1st useEffect");
      (async () => {
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
          setMapRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          })
          console.log("Specialists");
          
        });
        // setSpecialists(data?.specialistList || []);
      })();
  }, []);

  useEffect(()=>{
    if (notification?.request?.content?.data?.url) {
      const { route, ...params } = notification.request.content.data;
      console.log("Foreground Notification Navigate to:", route);

      router.push({
        pathname: route, // Remove the custom scheme
        params: params || {}, // Pass additional parameters
      });
    }
  },[notification]);

  const fetchPublishableKey = async () => {
    const key = await fetchKey();
    setPublishableKey(key);
  }

  useEffect(() => {
    fetchPublishableKey();
  },[]);
    

  return (
      <StripeProvider
        publishableKey={publishableKey}>
      <GluestackUIProvider>
      <MapRegionContext.Provider value={{mapRegion, setMapRegion}}>
      <LocationContext.Provider value={{location, setLocation}}>
      <SelectedSpecialistContext.Provider value={{selectedSpecialist, setSelectedSpecialist}}>
      <Stack screenOptions={{headerShown: false, gestureEnabled: true }}>
          <Stack.Screen name = "index" options={{headerShown: false}} />
          <Stack.Screen name = "login" options={{headerShown: false}} />
          <Stack.Screen name = "signup" options={{headerShown: false}} />
          <Stack.Screen name = "forgot-password" />
          {/* <Stack.Screen name = "about/index"/> */}
          <Stack.Screen name = "(tabs)" options={{headerShown: false}} />
      </Stack>
      </SelectedSpecialistContext.Provider>
      </LocationContext.Provider>
      </MapRegionContext.Provider>
      </GluestackUIProvider>
      </StripeProvider>
  )
  
}

export default RootLayout