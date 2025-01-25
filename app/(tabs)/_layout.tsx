import React from 'react'
import { Tabs } from 'expo-router'
import { AntDesign, FontAwesome } from '@expo/vector-icons'
import { Image, StyleSheet, View } from 'react-native'
import MyText from '@/components/MyText'
import { grey } from "../../constants/Colors";

export default function TabRoot() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "#dfe4e0", 
        },
        headerTitle: () => (
          <View style={styles.headerCenter}>
            <Image 
              source={require('@/assets/images/LocatoLogo-transparent.png')}
              style={styles.logo}
            />
            <MyText textLabel='Locato' textColor={grey}></MyText>
          </View>
        ),
        tabBarStyle: {
          backgroundColor: "#dfe4e0", 
        },
        tabBarIconStyle: {
          color: '#dfe4e0'
        }
      }} 
    >
      <Tabs.Screen name="index" options={{title: "Home", tabBarIcon: ({ color }) => <AntDesign size={28} name="home" color={color}/> }} />
      <Tabs.Screen name="bookmarks" options={{title: "Bookmarks", tabBarIcon: ({ color }) => <FontAwesome size={28} name="bookmark" color={color}/>}}/>
      <Tabs.Screen name="chats" options={{title: "Chats", tabBarIcon: ({ color }) => <AntDesign size={28} name="message1" color={color} />}}/>
    </Tabs>
  )
}

const styles = StyleSheet.create({
  logo: {
    width: 35,
    height: 35,
    borderRadius: 25,
    marginRight: 8
  },
  headerCenter: {
    flexDirection: 'row',
    paddingLeft: "43%",
    alignItems: 'center',
    justifyContent: 'center',
  },
})
