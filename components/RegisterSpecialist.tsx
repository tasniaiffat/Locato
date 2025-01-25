import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker, MapPressEvent } from "react-native-maps";
import { useForm, Controller } from "react-hook-form";
import RNPickerSelect from "react-native-picker-select";
import Heading from "@/components/Heading";
import api from "@/services/api";
import { SpecialityType } from "@/types/SpecialityType";
import { ZoneType } from "@/types/ZoneType";
import { useLocation } from "@/hooks/useLocation";
import { useMapRegion } from "@/hooks/useMapRegion";
import { SpecialistCreateType } from "@/types/SpecialistType";
import { getCoordinatesFromAddress } from "@/services/getCoordinatesFromAddress";
import { colors, grey } from "@/constants/Colors";


const RegisterSpecialist = () => {
  const [specialities, setSpecialities] = useState<SpecialityType[]>([]);
  const [zones, setZones] = useState<ZoneType[]>([]);
  const [selectedCoordinates, setSelectedCoordinates] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [address, setAddress] = useState<string>("");
  const { location } = useLocation();
  const { mapRegion, setMapRegion } = useMapRegion();
  const [isRegionSet, setIsRegionSet] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<SpecialistCreateType>({
    defaultValues: {
      email: "",
      password: "",
      name: "",
      zoneId: 0,
      locationLatitude: 0,
      locationLongitude: 0,
      experienceYears: 0,
      rating: 0,
      serviceRate: 0,
      certifications: "",
      specialties: [],
    },
  });

  useEffect(() => {
    if (location) {
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      setIsRegionSet(true);
    }
  }, [location]);

  const getSpecialities = async () => {
    try {
      const data = (await api.get("/specialties")).data;
      setSpecialities(data);
    } catch (error) {
      console.error("Error fetching specialties:", error);
    }
  };

  const getZones = async () => {
    try {
      const data = (await api.get("/zones")).data;
      setZones(data);
    } catch (error) {
      console.error("Error fetching zones:", error);
    }
  };

  useEffect(() => {
    getSpecialities();
    getZones();
  }, []);

  const handleMapPress = (event: MapPressEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedCoordinates({ latitude, longitude });
    setValue("locationLatitude", latitude);
    setValue("locationLongitude", longitude);
  };

  const fetchCoordinates = async (inputAddress: string) => {
    try {
      const coordinates = await getCoordinatesFromAddress(inputAddress);
      setSelectedCoordinates(coordinates);
      setValue("locationLatitude", coordinates.latitude);
      setValue("locationLongitude", coordinates.longitude);
      setMapRegion({
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    } catch (error) {
      Alert.alert("Error", "Failed to fetch coordinates. Please try again.");
    }
  };

  const onSubmit = async (data: SpecialistCreateType) => {
    try {
      data.locationLatitude = selectedCoordinates?.latitude || 0;
      data.locationLongitude = selectedCoordinates?.longitude || 0;
      console.log("Form Data:", data);
      const response = await api.post("/sp", data);
      Alert.alert("Success", "Specialist registered successfully!");
    } catch (error) {
      console.error("Error in submitting form:", error);
      Alert.alert("Error", "Failed to register specialist. Please try again.");
    }
    // Add API call to submit form data
  };

  if (!location || !isRegionSet) {
    return (
      <View>
        <Text>Loading location...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Heading 
        textColor={colors.textWhite}
        textLabel="Register as a Specialist" 
        size={35}
        style={{ marginBottom: 20 }} />

      <Text style={styles.label}>Email</Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            inputMode="email"
            style={styles.input}
            placeholder="Enter your email"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.email && <Text style={styles.errorText}>Email is required</Text>}

      <Text style={styles.label}>Password</Text>
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.password && <Text style={styles.errorText}>Password is required</Text>}

      <Text style={styles.label}>Name</Text>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.name && <Text style={styles.errorText}>Name is required</Text>}

      <Text style={styles.label}>Zone</Text>
      <Controller
        control={control}
        name="zoneId"
        render={({ field: { onChange, value } }) => (
          <RNPickerSelect
            onValueChange={onChange}
            items={zones.map((zone) => ({
              label: zone.title,
              value: zone.id,
            }))}
            value={value}
          />
        )}
      />

      <Text style={styles.label}>Specialties</Text>
      <Controller
        control={control}
        name="specialties"
        render={({ field: { onChange, value } }) => (
          <RNPickerSelect
            onValueChange={(selectedValue) => {
              if (selectedValue) {
                // Check if the value is already in the array to avoid duplicates
                const updatedList = value.includes(selectedValue)
                  ? value // If it already exists, keep the array unchanged
                  : [...value, selectedValue]; // Add the new value to the array

                onChange(updatedList); // Update the specialties array
              }
            }}
            items={specialities.map((speciality) => ({
              label: speciality.title,
              value: speciality.id,
            }))}
            value={value}
          />
        )}
      />
      <Text style={styles.label}>Experience (Years)</Text>
      <Controller
        control={control}
        name="experienceYears"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter years of experience"
            keyboardType="numeric"
            value={value ? value.toString() : ""}
            onChangeText={(text) => onChange(Number(text))}
          />
        )}
      />

      <Text style={styles.label}>Service Rate</Text>
      <Controller
        control={control}
        name="serviceRate"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter service rate"
            keyboardType="numeric"
            value={value ? value.toString() : ""}
            onChangeText={(text) => onChange(Number(text))}
          />
        )}
      />

      <Text style={styles.label}>Certifications</Text>
      <Controller
        control={control}
        name="certifications"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter certifications"
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      <Text style={styles.label}>Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your address"
        value={address}
        onChangeText={(text) => setAddress(text)}
      />
      <TouchableOpacity style={styles.button} onPress={
        () => fetchCoordinates(address)
      }>
        <Text style={{ color: "white", width: "100%", textAlign: "center" }}>Fetch Coordinates</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Select Location</Text>
      <MapView style={styles.map} region={mapRegion} onPress={handleMapPress}>
        {selectedCoordinates && (
          <Marker
            coordinate={{
              latitude: selectedCoordinates.latitude,
              longitude: selectedCoordinates.longitude,
            }}
          />
        )}
      </MapView>
      {errors.locationLatitude && <Text style={styles.errorText}>Latitude is required</Text>}
      {errors.locationLongitude && <Text style={styles.errorText}>Longitude is required</Text>}

      <View style={styles.buttonView}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={{ color: "white", width: "100%", textAlign: "center" }}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resetButton} onPress={() => reset()}>
          <Text style={{ color: "white", width: "100%", textAlign: "center" }}>Reset</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default RegisterSpecialist;


const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.textWhite,
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
  errorInput: {
    borderColor: colors.errorText,
  },
  errorText: {
    color: colors.errorText,
    marginBottom: 10,
  },
  map: {
    width: "100%",
    height: 200,
    marginBottom: 10,
  },
  button: {
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: colors.tint,
    padding: 10,
    textAlign: "center",
    flex: 1,
  },
  resetButton: {
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: colors.tabIconDefault,
    padding: 10,
    textAlign: "center",
    flex: 1,
  },
  buttonView: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    gap: 10,
  }
});
