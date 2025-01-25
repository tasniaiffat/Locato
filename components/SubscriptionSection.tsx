import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { grey, lightblue } from "@/constants/Colors";

const LocatoSubscription: React.FC = () => {
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  // Load the subscription status from SecureStore on component mount
  useEffect(() => {
    const loadSubscriptionStatus = async () => {
      try {
        const status = await SecureStore.getItemAsync("isSubscribed");
        if (status) {
          setIsSubscribed(status === "true");
        }
      } catch (error) {
        console.error("Error loading subscription status:", error);
      }
    };

    loadSubscriptionStatus();
  }, []);

  // Save the subscription status to SecureStore
  const toggleSubscription = async () => {
    try {
      const newStatus = !isSubscribed;
      setIsSubscribed(newStatus);

      // Save the new subscription status
      await SecureStore.setItemAsync("isSubscribed", newStatus.toString());

      // Display an alert based on the subscription status
      Alert.alert(
        newStatus ? "Subscribed" : "Unsubscribed",
        `You have ${newStatus ? "subscribed" : "unsubscribed"} to promotional emails from Locato.`
      );
    } catch (error) {
      console.error("Error saving subscription status:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.sectionContainer}>
        <Text style={styles.title}>
          {isSubscribed ? "Subscribed to Promotional Emails." : "Get Promotional Emails now!"}
        </Text>
        <TouchableOpacity
          onPress={toggleSubscription}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            {isSubscribed ? "Unsubscribe" : "Subscribe"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: "100%",
    alignItems: "center",
  },
  sectionContainer: {
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: grey,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default LocatoSubscription;
