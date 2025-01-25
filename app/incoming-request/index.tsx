import React, { useEffect, useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, Alert, SafeAreaView, ScrollView } from "react-native"
import { router, useLocalSearchParams } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import api from "@/services/api"
import type { ServiceRequestType } from "@/types/ServiceRequestType"
import { colors } from "@/constants/Colors"
import { UserType } from "@/types/UserType"
import axios from "axios"



const IncomingRequest = () => {
  const [serviceRequest, setServiceRequest] = useState<ServiceRequestType | null>(null)
  const { data } = useLocalSearchParams();
  const [user, setUser] = useState<UserType|null>(null);
  const [address, setAddress] = useState<string>("");

  useEffect(() => {
    try {
      const parsedData = JSON.parse(data as string)
      console.log("Parsed Data", parsedData);
      
      setServiceRequest(parsedData);
      const serviceRequestId = parsedData?.serviceRequestId;
      if (!serviceRequestId) {
        console.log("No service request id found");
        return;
        
      };
      fetchUser(serviceRequestId);
    } catch (error) {
      console.log("error", error)
    }
  }, [data]);


  const fetchUser = async (serviceRequestId: string) => {
    const response = await api.get(`/service_request/${serviceRequestId}`);
    console.log("User", response.data.user);
    
    getCoordinateFromAddress(response.data?.user?.locationLatitude, response.data?.user?.locationLongitude);
    setUser(response.data.user);
  
  }
  const getCoordinateFromAddress = async (latitude: number, longitude: number) => {
    console.log("Getting address from coordinates", latitude, longitude);
    
    const response = await axios.get(`${process.env.EXPO_PUBLIC_LOCATIONIQ_URL}/reverse?key=${process.env.EXPO_PUBLIC_LOCATIONIQ_API_KEY}&lat=${latitude}&lon=${longitude}&format=json&`);
    console.log("Address", response.data.display_name);
    
    setAddress(response.data.display_name);
  }

  useEffect(() =>  {
    const serviceRequestId = serviceRequest?.serviceRequestId;
    if (!serviceRequestId) {
      console.log("No service request id found");
      return;
      
    };
    fetchUser(serviceRequestId);

  },[]);


  

  const acceptRequest = async () => {
    try {
      const response = await api.patch(`/service_request/go-to-chat?id=${serviceRequest?.serviceRequestId}`)
      console.log(response.data)
      Alert.alert("Success", "Request Accepted")
      router.replace("/(servicetabs)/")
    } catch (error) {
      Alert.alert("Error", "Failed to accept request")
    }
  }

  const declineRequest = async () => {
    try {
      const response = await api.patch(`/service_request/status?id=${serviceRequest?.serviceRequestId}`, {
        status: "REJECTED",
      })
      console.log(response.data)
      Alert.alert("Success", "Request Declined")
      router.replace("/(servicetabs)/")
    } catch (error) {
      Alert.alert("Error", "Failed to decline request")
    }
  }

  if (!serviceRequest) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Loading request...</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Incoming Request</Text>

        <View style={styles.card}>
          <View style={styles.infoRow}>
            <Ionicons name="briefcase-outline" size={24} color={colors.tabIconSelected} />
            <Text style={styles.infoText}>{serviceRequest.jobType}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="document-text-outline" size={24} color={colors.tabIconSelected} />
            <Text style={styles.infoText}>{serviceRequest.jobDescription}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="mail-outline" size={24} color={colors.tabIconSelected} />
            <Text style={styles.infoText}>{serviceRequest.userEmail}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="calendar-outline" size={24} color={colors.tabIconSelected} />
            <Text style={styles.infoText}>{new Date(
              Date.UTC(
                serviceRequest.appointmentDataTime[0], // Year
                serviceRequest.appointmentDataTime[1] - 1, // Month
                serviceRequest.appointmentDataTime[2], // Day
                serviceRequest.appointmentDataTime[3], // Hours
                serviceRequest.appointmentDataTime[4] // Minutes
              )
            ).toLocaleString()}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="image" size={24} color={colors.tabIconSelected} />
            <Text style={styles.infoText}>{user?.name || ""}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="map" size={24} color={colors.tabIconSelected} />
            <Text style={styles.infoText}>{address || "Address"}</Text>
          </View>
        </View>

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
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: colors.tabIconSelected,
    textAlign: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  infoText: {
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 10,
    flex: 0.48,
  },
  acceptButton: {
    backgroundColor: colors.tabIconSelected,
  },
  declineButton: {
    backgroundColor: colors.errorText,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 5,
  },
  loadingText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 50,
  },
})

export default IncomingRequest

