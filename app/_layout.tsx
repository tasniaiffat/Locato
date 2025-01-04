import { Text, View } from 'react-native'
import React, { useState } from 'react'
import { Stack } from 'expo-router'
import { NativeBaseProvider, Box } from "native-base";
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { SpecialistType } from '@/types/SpecialistType';
import { SelectedSpecialistContext } from '@/contexts/SelectedSpecialistContext';
import { usePushNotifications } from '@/hooks/usePushNotifications';

const RootLayout = () =>{
    
    const [selectedSpecialist, setSelectedSpecialist] = useState<SpecialistType | null>(null);
    const { expoPushToken, notification } = usePushNotifications();

    const data = JSON.stringify(notification,undefined,2);
    console.log(expoPushToken);
    console.log(data);
    

    return (
        <GluestackUIProvider>
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
        </GluestackUIProvider>
    )
  
}

export default RootLayout