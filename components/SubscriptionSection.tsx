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
import api from "@/services/api"; // Assuming you have an API service set up

const LocatoSubscription: React.FC = () => {
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [email, setEmail] = useState<string | null>(null);

  // Load the subscription status from SecureStore and email on component mount
  useEffect(() => {
    const loadSubscriptionStatus = async () => {
      try {
        const savedEmail = await SecureStore.getItemAsync("email");
        const status = await SecureStore.getItemAsync("isSubscribed");

        if (savedEmail) {
          setEmail(savedEmail);
        }

        if (status) {
          setIsSubscribed(status === "true");
        }
      } catch (error) {
        console.error("Error loading subscription status:", error);
      }
    };

    loadSubscriptionStatus();
  }, []);

  // Function to toggle subscription state and call the API
  const toggleSubscription = async () => {
    if (!email) {
      console.error("Email not found");
      return;
    }

    try {
      const newStatus = !isSubscribed;
      setIsSubscribed(newStatus);

      // Save the new subscription status
      await SecureStore.setItemAsync("isSubscribed", newStatus.toString());


      // Call the appropriate API
      if (newStatus) {
        await api.post(`/api/notifications/subscribe?email=${email}`);
      } else {
        await api.post(`/api/notifications/unsubscribe?email=${email}`);
      }

      // Display an alert based on the subscription status
      Alert.alert(
        newStatus ? "Subscribed" : "Unsubscribed",
        `You have ${newStatus ? "subscribed" : "unsubscribed"} to promotional emails from Locato.`
      );
    } catch (error) {
      console.error("Error toggling subscription:", error);
      Alert.alert("Error", "Something went wrong, please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.sectionContainer}>
        <Text style={styles.title}>
          {isSubscribed ? "Subscribed to Promos" : "Get promotional emails now!"}
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
    backgroundColor: "#a0c3be",
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
