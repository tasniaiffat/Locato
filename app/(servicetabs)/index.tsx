import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import * as SecureStore from "expo-secure-store";
import { grey, lightblue } from "@/constants/Colors";
import api from "@/services/api";
import { SpecialistRole, type SpecialistType } from "@/types/SpecialistType";
import axios from "axios";
import { useLocation } from "@/hooks/useLocation";

const Dashboard = () => {
  const [specialistData, setSpecialistData] = useState<SpecialistType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const { location } = useLocation();

  // Dummy data
  const dummyData: SpecialistType = {
    createdAt: "2025-01-23T14:49:41.474715",
    updatedAt: "2025-01-23T14:49:41.474715",
    id: 44,
    email: "jmuddin5823@gmail.com",
    name: "Plumbo",
    active: true,
    role: "ROLE_SERVICE_PROVIDER",
    zone: { id: 15, title: "Mohammadpur", createdAt: null, updatedAt: null },
    locationLatitude: 24.644688,
    locationLongitude: 87.976357,
    specialties: [{ id: 1, title: "Plumber", createdAt: null, updatedAt: null }],
    experienceYears: 3,
    serviceRate: 3,
    rating: 3,
    certifications: "PhD on plumbing",
  };

  const fetchSpecialistData = async () => {
    try {
      const userId = await SecureStore.getItemAsync("userId");
      if (!userId) {
        throw new Error("User ID not found in SecureStore");
      }
      const response = await api.get(`/sp/${userId}`);
      setSpecialistData(response.data);

      const addressResponse = await axios.get(
        `${process.env.EXPO_PUBLIC_LOCATIONIQ_URL}/reverse?key=${process.env.EXPO_PUBLIC_LOCATIONIQ_API_KEY}&lat=${response.data.locationLatitude}&lon=${response.data.locationLongitude}&format=json`
      );
      setAddress(addressResponse.data.display_name);
    } catch (err) {
      console.error(err);
      setSpecialistData(dummyData); // Use dummy data on failure
      setAddress("Dummy Address, City, Country");
      setError("Failed to fetch specialist data, using dummy data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpecialistData();
  }, []);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={lightblue} />
      </View>
    );
  }

  if (!specialistData) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error || "No data available"}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <Text style={styles.name}>{specialistData.name}</Text>
        <Text style={styles.speciality}>
          {specialistData.specialties.map((s) => s.title).join(", ")}
        </Text>
        <Text style={styles.experience}>
          {specialistData.experienceYears} years of experience
        </Text>
      </View>

      <View style={styles.statsSection}>
        <Text style={styles.statsHeader}>Service Rate</Text>
        <Text style={styles.revenue}>${specialistData.serviceRate}/hr</Text>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.infoHeader}>Specialist Information</Text>
        <Text style={styles.infoText}>Email: {specialistData.email}</Text>
        <Text style={styles.infoText}>
          Rating: {specialistData.rating.toFixed(1)}/5
        </Text>
        <Text style={styles.infoText}>
          Role:{" "}
          {specialistData.role === SpecialistRole.ROLE_SERVICE_PROVIDER
            ? "Service Provider"
            : ""}
        </Text>
        <Text style={styles.infoText}>Zone: {specialistData.zone.title}</Text>
        <Text style={styles.infoText}>
          Active: {specialistData.active ? "Yes" : "No"}
        </Text>
      </View>

      <View style={styles.certificationSection}>
        <Text style={styles.infoHeader}>Certifications</Text>
        <Text style={styles.infoText}>
          {specialistData.certifications || "No certifications listed"}
        </Text>
      </View>

      <View style={styles.locationSection}>
        <Text style={styles.infoHeader}>Location</Text>
        <Text style={styles.infoText}>Address: {address}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileHeader: {
    marginBottom: 20,
    alignItems: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  speciality: {
    fontSize: 18,
    color: "#555",
    marginTop: 4,
    textAlign: "center",
  },
  experience: {
    fontSize: 16,
    color: "#777",
    marginTop: 4,
  },
  statsSection: {
    marginBottom: 20,
    backgroundColor: lightblue,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  statsHeader: {
    fontSize: 18,
    color: grey,
    fontWeight: "bold",
  },
  revenue: {
    fontSize: 20,
    color: grey,
    fontWeight: "bold",
    marginTop: 8,
  },
  infoSection: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  certificationSection: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  locationSection: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  infoHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
});

export default Dashboard;
