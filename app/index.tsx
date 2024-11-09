import Heading from "@/components/Heading";
import MyLink from "@/components/MyLink";
import SubHeading from "@/components/MyText";
import { grey, lightblue } from "@/constants/Colors";
import { Link, router } from "expo-router";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
const backgroundimage = { uri: "../assets/images/locato_bg.jpg" };
const locatologo = { uri: "../assets/images/LocatoLogo-transparent.png" };

const Index = () => {
  const handlePress = () => {
    console.log("Get Started pressed");
    router.push("/login");
  };
  return (
    <ImageBackground
      source={backgroundimage}
      resizeMode="cover"
      style={styles.background}
    >
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
