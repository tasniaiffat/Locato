import React, { useState } from "react";
import MyButton from "@/components/MyButton";
import { router } from "expo-router";
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  TextInput,
} from "react-native";
import { grey } from "../constants/Colors";
import Heading from "@/components/Heading";
import SubHeading from "@/components/MyText";
import MyLink from "@/components/MyLink";
import MyText from "@/components/MyText";

const backgroundimage = { uri: "../assets/images/locato_bg.jpg" };
const locatologo = { uri: "../assets/images/LocatoLogo-transparent.png" };

const Index = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    console.log("Name:", firstname + " " + lastname);
    console.log("Email:", email);
    console.log("Password:", password);
    router.push("/(tabs)/");
  };

  return (
    <ImageBackground
      source={backgroundimage}
      resizeMode="cover"
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Image source={locatologo} style={styles.logo} />
        </View>

        <View style={styles.rightContainer}>
          <Heading textLabel="Welcome to Locato" textColor="white" />
          <SubHeading
            textLabel="Create an account"
            textColor={grey}
            marginBottom={40}
          />
          <View style={styles.formContainer}>
            <View style={styles.nameContainer}>
              <TextInput
                style={styles.nameinput}
                placeholder="First Name"
                placeholderTextColor={grey}
                value={email}
                onChangeText={setFirstName}
              />

              <TextInput
                style={styles.nameinput}
                placeholder="Last Name"
                placeholderTextColor={grey}
                value={email}
                onChangeText={setFirstName}
              />
            </View>

            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor={grey}
              value={email}
              keyboardType={"email-address"}
              onChangeText={setEmail}
            />

            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor={grey}
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />

            <TextInput
              style={styles.input}
              placeholder="Confirm password"
              placeholderTextColor={grey}
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />

            <MyButton
              bgColor={grey}
              textColor="white"
              btnLabel="Sign Up"
              onPress={handleSignUp}
            />

            <View style={styles.logincta}>
              <MyText
                textLabel="Already have an account? "
                textColor="white"
                fontWeight="normal"
              />
              <MyLink
                textLabel="Login"
                textColor="white"
                onPress={() => router.push("/login")}
              />
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftContainer: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  rightContainer: {
    flex: 2,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  nameContainer:{
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  background: {
    flex: 1,
    height: "100%",
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 25,
  },
  formContainer: {
    width: "60%",
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 15,
    color: grey,
  },
  nameinput: {
    width: "48%",
    height: 50,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 15,
    color: grey,
  },
  logincta: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
});

export default Index;
