import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import ServiceCard from "@/components/ServiceCard";
import { colors } from "@/constants/Colors";
import api from "@/services/api";
import * as SecureStore from "expo-secure-store";

const LATITUDE = 23.762538703028838;
const LONGITUDE = 90.35908772330168;
const RADIUS = 10;

interface Service {
  id: number;
  name: string;
  specialties: { title: string }[];
  rating: number;
}

const ServicesNearby = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<number>>(new Set());

  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await api.get<Service[]>("/sp/AllRadius", {
        params: {
          latitude: LATITUDE,
          longitude: LONGITUDE,
          radius: RADIUS,
        },
      });

      if (response.status === 200) {
        setServices(response.data);
      } else {
        Alert.alert("Error", "Failed to fetch services.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again later.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleBookmarkToggle = async (serviceId: number) => {
    try {
      const isBookmarked = bookmarkedIds.has(serviceId);

      const response = await api.post(
        `/users/favorites/${serviceId}`,
        {},
        {
          headers: { Authorization: `Bearer ${await SecureStore.getItemAsync("jwt")}` },
        }
      );

      if (response.status === 200) {
        setBookmarkedIds((prev) => {
          const updated = new Set(prev);
          isBookmarked ? updated.delete(serviceId) : updated.add(serviceId);
          return updated;
        });
      } else {
        Alert.alert("Error", "Failed to update bookmark status.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to update bookmark status.");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Services Near You</Text>
      {loading ? (
        <ActivityIndicator size="large" color={colors.lightblue} style={styles.loader} />
      ) : (
        <FlatList
          data={services}
          renderItem={({ item }) => (
            <ServiceCard
              name={item.name}
              specialty={item.specialties.map((spec) => spec.title).join(", ")}
              rating={item.rating || 0}
              bookmarked={bookmarkedIds.has(item.id)} // Check if bookmarked
              onBookmarkPress={() => handleBookmarkToggle(item.id)} // Handle bookmark
            />
          )}
          horizontal
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dfe4e0",
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 16,
  },
  loader: {
    marginTop: 20,
  },
});

export default ServicesNearby;
