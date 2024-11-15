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
import { CheckBox } from "react-native-btr";
import MyText from "@/components/MyText";
import api from "@/services/api";

const backgroundimage = { uri: "../assets/images/locato_bg.jpg" };
const locatologo = { uri: "../assets/images/LocatoLogo-transparent.png" };

const Index = () => {
  const showAlert = (title: string, message: string) => {
    if (Platform.OS === "web") {
      window.alert(`${title}: ${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleForgotPassword = () => {
    console.log("Forgot Password pressed");
    router.push("/forgot-password");
  };

  const handleLogin = async () => {
    console.log("Email:", email);
    console.log("Password:", password);

    if (!email || !password) {
      showAlert("Error", "Please fill in all required fields.");
      console.log("Please fill in all required fields.");
      return;
    }

    try {
      const requestBody = {
        email,
        password,
      };

      const response = await api.post("/auth/login", requestBody);

      if (response.status === 200) {
        console.log("Successful");
        showAlert("Success", "User logged in successfully!");
        router.push("/(tabs)/");
      } 
        else {
        console.log("Login failed");
        showAlert("Error", "Login failed. Please try again.");
      }
    } catch (error) {
      console.log("Login error");
      console.error("Login error:", error);
      showAlert("Login Failed", "Email and Password did not match");
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
          <Heading textLabel="Welcome Back" textColor="white" />
          <SubHeading
            textLabel="Login to your account"
            textColor={grey}
            marginBottom={40}
          />
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your email*"
              placeholderTextColor={grey}
              value={email}
              keyboardType={"email-address"}
              onChangeText={setEmail}
            />

            <TextInput
              style={styles.input}
              placeholder="Enter your password*"
              placeholderTextColor={grey}
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />

            <View style={styles.rememberforgot}>
              <MyLink
                textLabel="Forgot Password?"
                textColor="lightblue"
                fontWeight="normal"
                onPress={handleForgotPassword}
              />
            </View>

            <MyButton
              bgColor={grey}
              textColor="white"
              btnLabel="Login"
              onPress={handleLogin}
            />

            <View style={styles.signupcta}>
              <MyText
                textLabel="Don't have an account? "
                textColor="white"
                fontWeight="normal"
              />
              <MyLink
                textLabel="Sign Up"
                textColor="white"
                onPress={() => router.push("/signup")}
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
  rememberforgot: {
    width: "100%",
    paddingRight: 5,
    marginVertical: 5,
    alignItems: "flex-end",
  },
  forgotPasswordLink: {
    color: "lightblue",
    fontWeight: "bold",
  },
  signupcta: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
});

export default Index;
