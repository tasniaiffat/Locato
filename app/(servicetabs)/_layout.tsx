import React from 'react';
import { Tabs } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { Image, StyleSheet } from 'react-native';
import MyText from '@/components/MyText';
import { grey } from '../../constants/Colors';

export default function Dashboard() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#f4f4f4',
        },
        headerLeft: () => (
          <Image 
            source={require('@/assets/images/LocatoLogo-transparent.png')}
            style={styles.logo}
          />
        ),
        headerTitle: () => (
          <MyText textLabel="Locato" textColor={grey} />
        ),
        headerRight: () => (
          <AntDesign name="bells" size={24} color={grey} style={styles.notificationIcon} />
        ),
        tabBarStyle: {
          backgroundColor: '#f4f4f4',
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8e8e93',
      }}
    >
      <Tabs.Screen 
        name="index" 
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <AntDesign size={28} name="home" color={color} />,
        }} 
      />
      <Tabs.Screen 
        name="chats" 
        options={{
          title: 'Chats',
          tabBarIcon: ({ color }) => <AntDesign size={28} name="message1" color={color} />,
        }} 
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 35,
    height: 35,
    borderRadius: 25,
  },
  notificationIcon: {
    marginRight: 16,
  },
});
