import React from 'react'
import { Tabs } from 'expo-router'
import { AntDesign, FontAwesome } from '@expo/vector-icons'
import { Image, StyleSheet } from 'react-native'
import MyHeader from '@/components/MyHeader'
import MyText from '@/components/MyText'
import { grey, lightblue } from "../../constants/Colors";

export default function TabRoot() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "#dfe4e0", 
        },
        headerLeft: () => (
          <Image 
            source={require('@/assets/images/LocatoLogo-transparent.png')}
            style={styles.logo}
          />
        ),
        headerTitle: () => (
          <MyText textLabel='Locato' textColor={grey}></MyText>
        ),
        headerRight: () => (
          <Image 
            source={require('@/assets/images/profile.png')} 
            style={styles.userImage}
          />
        ),
        tabBarStyle: {
          backgroundColor: "#dfe4e0", 
        },
        tabBarIconStyle: {
          color: '#dfe4e0'
        }
      }} 
      >
        <Tabs.Screen name = "index" options={{title: "Home", tabBarIcon: ({ color }) => <AntDesign size={28} name="home" color={color}/> }}/>
        <Tabs.Screen name = "bookmarks" options={{title: "Bookmarks", tabBarIcon: ({ color }) => <FontAwesome size={28} name="bookmark" color={color}/>}}/>
        <Tabs.Screen name = "chats" options={{title: "Chats", tabBarIcon: ({ color }) => <AntDesign size={28} name="plus" color={color}/>}}/>
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
    width: 30,
    height: 30,
    borderRadius: 25,
    marginRight: 16,
  },
})