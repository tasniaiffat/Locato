import React from 'react'
import { Tabs } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'

export default function TabRoot() {
  return (
    <Tabs>
        <Tabs.Screen name = "index" options={{title: "Home", tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color}/> }}/>
        <Tabs.Screen name = "bookmarks" options={{title: "Bookmarks", tabBarIcon: ({ color }) => <FontAwesome size={28} name="bookmark" color={color}/>}}/>
        <Tabs.Screen name = "contribute" options={{title: "Contribute", tabBarIcon: ({ color }) => <FontAwesome size={28} name="plus" color={color}/>}}/>
    </Tabs>
  )
}