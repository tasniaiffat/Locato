import { Link } from "expo-router";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
const backgroundimage = {uri: '../assets/images/locato_bg.jpg'};
const locatologo = {uri: '../assets/images/LocatoLogo-transparent.png'};

const Index = () => {
  return (
    <ImageBackground 
    source={backgroundimage} resizeMode="cover" style={styles.background}
    >
    
    <View style={styles.container}>
      <Image source={locatologo}
          style={styles.logo}/>
      <Text style={styles.text}>Welcome to Login Screen</Text>
      <Link href={"/(tabs)/"} style={styles.link}>Get Started!</Link>
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  text:{
    color: 'white',
    fontWeight: 'bold'
  },
  link:{
    color: 'lightblue',
    fontWeight: 'bold',
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 25  
  },
});

export default Index;
