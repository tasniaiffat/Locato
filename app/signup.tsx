import React, { useState } from "react";
import MyButton from "@/components/MyButton";
import { router } from "expo-router";
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  TextInput,
  Platform,
  Alert,
} from "react-native";
import { grey } from "../constants/Colors";
import Heading from "@/components/Heading";
import SubHeading from "@/components/MyText";
import MyLink from "@/components/MyLink";
import MyText from "@/components/MyText";
import api from "@/services/api";

const backgroundimage = { uri: "../assets/images/locato_bg.jpg" };
const locatologo = { uri: "../assets/images/LocatoLogo-transparent.png" };

const Index = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [zoneId, setZoneId] = useState("1"); // Default zoneId
  const [locationLatitude, setLocationLatitude] = useState("0.0");
  const [locationLongitude, setLocationLongitude] = useState("0.0");

  const showAlert = (title: string, message: string) => {
    if (Platform.OS === "web") {
      window.alert(`${title}: ${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const handleSignUp = async () => {
    console.log(firstname);
    console.log(lastname);
    console.log(email);
    console.log(password);
    console.log(confirmpassword);
    if (!firstname || !lastname || !email || !password) {
      showAlert("Error", "Please fill in all required fields.");
      console.log("Please fill in all required fields.");
      return;
    }
    if (password != confirmpassword) {
      showAlert("Error","Password did not match");
      console.log("Password did not match");
      return;
    }

    try {
      const requestBody = {
        email,
        password,
        name: `${firstname} ${lastname}`,
        zoneId: parseInt(zoneId, 10),
        locationLatitude: parseFloat(locationLatitude),
        locationLongitude: parseFloat(locationLongitude),
      };

      const response = await api.post("/auth/register_user", requestBody);

      if (response.status === 200) {
        console.log("Successful");
        showAlert("Success", "User registered successfully!");
        router.push("/(tabs)/");
      } else {
        console.log("Registration failed");
        showAlert("Error", "Registration failed. Please try again.");
      }
    } catch (error) {
      console.log("Signup error");
      console.error("Signup error:", error);
      showAlert("Error", "Failed to register user. Please try again.");
    }
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
                placeholder="First Name*"
                placeholderTextColor={grey}
                value={firstname}
                onChangeText={setFirstName}
              />

              <TextInput
                style={styles.nameinput}
                placeholder="Last Name*"
                placeholderTextColor={grey}
                value={lastname}
                onChangeText={setLastName}
              />
            </View>

            <TextInput
              style={styles.input}
              placeholder="Enter your email*"
              placeholderTextColor={grey}
              value={email}
              keyboardType="email-address"
              onChangeText={setEmail}
              autoCapitalize="none"
            />

            <TextInput
              style={styles.input}
              placeholder="Enter your password*"
              placeholderTextColor={grey}
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />

            <TextInput
              style={styles.input}
              placeholder="Confirm password*"
              placeholderTextColor={grey}
              secureTextEntry={true}
              value={confirmpassword}
              onChangeText={setConfirmPassword}
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
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },
  leftContainer: {
    flex: 1,
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
  nameContainer: {
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
  },
  formContainer: {
    width: "80%",
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
});

export default Index;
