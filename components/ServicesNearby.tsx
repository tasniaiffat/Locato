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
        const formattedData = response.data.map((service: Service) => ({
          id: service.id,
          name: service.name,
          specialties: service.specialties.map((spec) => spec.title).join(", "),
          rating: service.rating,
        }));
        setServices(formattedData);
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

  const handleSeeAllPress = () => {
    router.push("/services");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Services Near You</Text>
      {loading ? (
        <ActivityIndicator
          size="large"
          color={colors.lightblue}
          style={styles.loader}
        />
      ) : (
        <FlatList
          data={services}
          renderItem={({ item }) => (
            <ServiceCard
              name={item.name}
              specialty={item.specialties}
              rating={item.rating || 0} // Ensures rating is always a number (default to 0 if undefined)
              key={item.id}
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
    backgroundColor: colors.background,
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
