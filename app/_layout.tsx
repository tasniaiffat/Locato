import { Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { NativeBaseProvider, Box } from "native-base";

const RootLayout = () =>{
    return (
        <NativeBaseProvider>
        <Stack screenOptions={{headerShown: false, gestureEnabled: true }}>
            <Stack.Screen name = "index" options={{headerShown: false}} />
            <Stack.Screen name = "login" options={{headerShown: false}} />
            <Stack.Screen name = "signup" options={{headerShown: false}} />
            <Stack.Screen name = "forgot-password" />
            {/* <Stack.Screen name = "about/index"/> */}
            <Stack.Screen name = "(tabs)" options={{headerShown: false}} />
        </Stack>
        </NativeBaseProvider>
    )
  
}

export default RootLayout