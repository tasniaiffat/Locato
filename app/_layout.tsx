import { Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const RootLayout = () =>{
    return (
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name = "index"/>
            <Stack.Screen name = "login"/>
            <Stack.Screen name = "signup"/>
            <Stack.Screen name = "about/index"/>
            <Stack.Screen name = "(tabs)" options={{headerShown: false}}/>
        </Stack>
    )
  
}

export default RootLayout