import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import api from "@/services/api";
import type { ServiceRequestType } from "@/types/ServiceRequestType";
import { colors } from "@/constants/Colors";
import { UserType } from "@/types/UserType";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const IncomingRequest = () => {
  const [serviceRequest, setServiceRequest] = useState<ServiceRequestType | null>(null);
  const [user, setUser] = useState<UserType | null>(null);
  const [address, setAddress] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const { data } = useLocalSearchParams();

  useEffect(() => {
    const loadData = async () => {
      console.log("Data", data);
      
      try {
        if (!data) {
          console.log("No data passed in route parameters");
          setLoading(false);
          return;
        }
        const parsedData = JSON.parse(data as string);
        console.log("Parsed Data", parsedData);

        setServiceRequest(parsedData);
        const serviceRequestId = parsedData?.serviceRequestId;
        if (!serviceRequestId) {
          console.log("No service request ID found");
          setLoading(false);

        }
        await fetchUser(serviceRequestId);
      } catch (error) {
        console.error("Error parsing or loading data:", error);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const fetchUser = async (serviceRequestId: string) => {
    try {
      const response = await api.get(`/service_request/${serviceRequestId}`);
      console.log("User Data", response.data.user);

      setUser(response.data.user);
      const { locationLatitude, locationLongitude } = response.data.user;
      setAddress("1234 Main St, Springfield, IL 62701");
      // if (locationLatitude && locationLongitude) {
      //   await getAddressFromCoordinates(locationLatitude, locationLongitude);
      // }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getAddressFromCoordinates = async (latitude: number, longitude: number) => {
    try {
      console.log("Getting address from coordinates", latitude, longitude);
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_LOCATIONIQ_URL}/reverse`,
        {
          params: {
            key: process.env.EXPO_PUBLIC_LOCATIONIQ_API_KEY,
            lat: latitude,
            lon: longitude,
            format: "json",
          },
        }
      );
      console.log("Address", response.data.display_name);
      setAddress(response.data.display_name);
      // setAddress("1234 Main St, Springfield, IL 62701");
    } catch (error) {
      console.error("Error getting address:", error);
    }
  };

  const acceptRequest = async () => {
    try {
      const response = await api.patch(
        `/service_request/go-to-chat?id=${serviceRequest?.serviceRequestId}`
      );
      console.log("Request Accepted:", response.data);
      Alert.alert("Success", "Request Accepted");

      const userId = await SecureStore.getItemAsync("userId");
      if (!userId) {
        Alert.alert("Error", "UserId not found");
        return;
      }
      console.log("Other user for specialist chat", serviceRequest?.userEmail);
      
      router.replace({
        pathname: "/chat-specialist",
        params: {
          otherUserEmail: serviceRequest?.userEmail,
          userId,
        },
      });
    } catch (error) {
      Alert.alert("Error", "Failed to accept request");
      console.error("Error accepting request:", error);
    }
  };

  const declineRequest = async () => {
    try {
      const response = await api.patch(`/service_request/status?id=${serviceRequest?.serviceRequestId}`, {
        status: "REJECTED",
      });
      console.log("Request Declined:", response.data);
      Alert.alert("Success", "Request Declined");
      router.replace("/(servicetabs)/");
    } catch (error) {
      Alert.alert("Error", "Failed to decline request");
      console.error("Error declining request:", error);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color={colors.tabIconSelected} style={styles.loadingIndicator} />
        <Text style={styles.loadingText}>Loading request...</Text>
      </SafeAreaView>
    );
  }

  if (!serviceRequest) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>No service request data available.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Incoming Request</Text>

        <View style={styles.card}>
          {/* Service Request Details */}
          <View style={styles.infoRow}>
            <Ionicons name="briefcase-outline" size={24} color={colors.tabIconSelected} />
            <Text style={styles.infoText}>{serviceRequest.jobType}</Text>
          </View>
          {/* Other Fields */}
          <View style={styles.infoRow}>
            <Ionicons name="map" size={24} color={colors.tabIconSelected} />
            <Text style={styles.infoText}>{address || "No address found"}</Text>
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={declineRequest} style={[styles.button, styles.declineButton]}>
            <Ionicons name="close-circle-outline" size={24} color="white" />
            <Text style={styles.buttonText}>Decline</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={acceptRequest} style={[styles.button, styles.acceptButton]}>
            <Ionicons name="checkmark-circle-outline" size={24} color="white" />
            <Text style={styles.buttonText}>Accept</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    padding: 20,
  },
  loadingIndicator: {
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    padding: 15,
    borderRadius: 10,
  },
  declineButton: {
    backgroundColor: "red",
  },
  acceptButton: {
    backgroundColor: "green",
  },
  errorText: {
    marginTop: 50,
    textAlign: "center",
  },
  loadingText: {
    marginTop: 10,
    textAlign: "center",

  },
  buttonText: {
    color: "white",
    marginLeft: 10,
  }
});

export default IncomingRequest;
