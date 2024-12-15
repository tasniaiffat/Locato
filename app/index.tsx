import Heading from "@/components/Heading";
import MyLink from "@/components/MyLink";
import SubHeading from "@/components/MyText";
import { grey, lightblue } from "@/constants/Colors";
import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, Image, View, ImageBackground, ImageSourcePropType } from "react-native";
import * as Location from "expo-location";
import { LocationContext } from "@/contexts/LocationContext";

const backgroundimage:ImageSourcePropType = require("@/assets/images/locato_bg.jpg");
const locatologo:ImageSourcePropType =require("@/assets/images/LocatoLogo-transparent.png");


const handlePress = () => {
  console.log("Get Started pressed");
  router.push("/login");
};

const Index = () => {
  


  return (
    <ImageBackground
      source={backgroundimage}
      resizeMode="cover"
      style={styles.background}>

        <View style={styles.container}>
          <Image source={locatologo} style={styles.logo} />
          <Heading textLabel="Welcome to Locato" textColor="white" />
          <MyLink
            textLabel="Get Started!"
            textColor={lightblue}
            onPress={handlePress}
            />
        </View>
   </ImageBackground>
  );
};



const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 25,
  },
});

export default Index;
