// import { View, Text } from 'react-native'
// import React from 'react'
// import MyHeader from '@/components/MyHeader'

// const Index = () =>  {
//   return (
//     <View>
//       <MyHeader/>
//       <Text>Home</Text>
//     </View>
//   )
// }

import MyButton from "@/components/MyButton";
import MyHeader from "@/components/MyHeader";
import { Link } from "expo-router";
import LottieView from "lottie-react-native";
import { StyleSheet, Text, View, Image } from "react-native";

const Index = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/LocatoLogo.png')}
          style={styles.logo}/>
      {/* <LottieView
        source={require('../assets/animations/locato.json')} 
        autoPlay
        loop
        style={styles.animation}
      /> */}
      <Text style={styles.text}>Welcome to Locato</Text>
      <Link href={"/(tabs)/"} style={styles.link}>Get Started!</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2a323d',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text:{
    color: 'white',
    fontWeight: 'bold'
  },
  link:{
    color: 'lightblue',
    fontWeight: 'bold',
  },
  animation: {
    width: 300,
    height: 300,
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 25  
  },
});

export default Index;
