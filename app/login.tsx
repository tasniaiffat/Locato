import React, { useEffect, useState } from "react";
import MyButton from "@/components/MyButton";
import { router } from "expo-router";
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  ImageSourcePropType,
  TextInput,
  Platform,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";
import { grey, lightblue } from "../constants/Colors";
import Heading from "@/components/Heading";
import SubHeading from "@/components/MyText";
import MyLink from "@/components/MyLink";
import MyText from "@/components/MyText";
import api from "@/services/api";
import { showAlert } from "@/services/alertUtil";
import * as SecureStore from "expo-secure-store";
import { ExpoPushToken } from 'expo-notifications';
import { usePushNotifications } from "@/hooks/usePushNotifications";


const backgroundimage: ImageSourcePropType = require("@/assets/images/locato_bg.jpg");
const locatologo: ImageSourcePropType = require("@/assets/images/LocatoLogo-transparent.png");

const pushExpoToken = async (expoPushToken: ExpoPushToken) => {
  try {
    console.log("Push Token", expoPushToken.data);
    
    const response = (await api.post(`/api/expo-token`,
      { token:expoPushToken.data, },
      { headers: {
          Authorization: `Bearer ${await SecureStore.getItemAsync("jwt")}`,  
      }}
    )).data;
    console.log("Push Token Response", response);
    
  } catch (error) {
    console.error(error);
  }

}

const Index = () => {

  const { expoPushToken, notification } = usePushNotifications();



  // useEffect(() => {
  //   SecureStore.getItemAsync("jwt")
  //   .then((jwt) => {
  //     if (jwt) {
  //       router.push("/(tabs)/");
  //     }
  //   });
  // },[]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleForgotPassword = () => {
    router.push("/forgot-password");
  };

  const handleLogin = async () => {
    if (!email || !password) {
      showAlert("Error", "Please fill in all required fields.");
      return;
    }
  
    try {
      const response = await api.post("/auth/login", { email, password });
      if (response.status === 200) {
        showAlert("Success", "User logged in successfully!");
        console.log(response.data?.jwt);
        console.log(response.data?.userId);
  
        if (response.data?.jwt) {
          await SecureStore.setItemAsync("jwt", response.data.jwt);
        }
        if (response.data?.userId) {
          await SecureStore.setItemAsync("userId", JSON.stringify(response.data.userId));
        }
  
        // Store the email
        await SecureStore.setItemAsync("email", email);
  
        if (expoPushToken) {
          pushExpoToken(expoPushToken);
        }
        router.push("/(tabs)/");
      } else {
        showAlert("Error", "Login failed. Please try again.");
      }
    } catch (error) {
      showAlert("Login Failed", "Email and Password did not match");
    }
  };
  

  return (
    // Dismiss keyboard on tap outside
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground source={backgroundimage} resizeMode="cover" style={styles.background}>
          <View style={styles.container}>
            <View style={styles.rightContainer}>
              <Image source={locatologo} style={styles.logo} />
              <Heading textLabel="Welcome Back" textColor="white" />
              <SubHeading textLabel="Login to your account" textColor={grey} />
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
                <MyButton bgColor={lightblue} textColor={grey} btnLabel="Login" onPress={handleLogin} />
                <View style={styles.signupcta}>
                  <MyText textLabel="Working with us?" textColor="white" fontWeight="normal" />
                  <MyLink
                    textLabel="Login as Specialist"
                    textColor="white"
                    onPress={() => router.push("/login-specialist")}
                  />
                </View>
                <View style={styles.signupcta}>
                  <MyText textLabel="Don't have an account? " textColor="white" fontWeight="normal" />
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
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
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
    width: 150,
    height: 150,
    borderRadius: 25,
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
  rememberforgot: {
    width: "100%",
    paddingRight: 5,
    marginVertical: 5,
    alignItems: "flex-end",
  },
  signupcta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
});

export default Index;
