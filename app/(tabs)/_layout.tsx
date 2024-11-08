import React from 'react'
import { Tabs } from 'expo-router'
import { AntDesign, FontAwesome } from '@expo/vector-icons'
import { Image, StyleSheet } from 'react-native'

export default function TabRoot() {
  return (
    <Tabs 
      screenOptions={{
        headerShown: true,
        headerTitle: () => (
          <Image 
            source={require('@/assets/images/LocatoLogo.png')}
            style={styles.logo}
          />
        ),
        headerRight: () => (
          <Image 
            source={require('@/assets/images/user.png')} 
            style={styles.userImage}
          />
        ),
      }} 
      >
        <Tabs.Screen name = "index" options={{title: "Home", tabBarIcon: ({ color }) => <AntDesign size={28} name="home" color={color}/> }}/>
        <Tabs.Screen name = "bookmarks" options={{title: "Bookmarks", tabBarIcon: ({ color }) => <FontAwesome size={28} name="bookmark" color={color}/>}}/>
        <Tabs.Screen name = "contribute" options={{title: "Contribute", tabBarIcon: ({ color }) => <AntDesign size={28} name="plus" color={color}/>}}/>
    </Tabs>
  )
}

const styles = StyleSheet.create({
  logo: {
    width: 35,
    height: 35,
    borderRadius: 25  
  },
  userImage: {
    width: 35,
    height: 35,
    borderRadius: 25,
    marginRight: 16,
  }
})