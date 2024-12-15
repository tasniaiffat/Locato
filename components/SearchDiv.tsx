import { colors, grey, lightblue } from "@/constants/Colors";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  ImageSourcePropType,
  ImageBackground,
  Modal,
  TouchableOpacity,
} from "react-native";
import {
  useForm,
  Controller,
  SubmitHandler,
  FieldValues,
} from "react-hook-form";
import { router } from "expo-router";
import api from "@/services/api";
import { showAlert } from "@/services/alertUtil";
import { CoordinateType } from "@/types/CoordinateType";

const backgroundimage: ImageSourcePropType = require("@/assets/images/locato_bg_search.jpg");

const SearchDiv = () => {
  const [responseData, setResponseData] = useState<any>(null); 
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data.text);
    await submitAssistanceRequest(data.text);
    setIsModalVisible(true);
  };

  const submitAssistanceRequest = async (data: string) => {
    try {
      const requestBody = {
        requestText: data,
      };
      
      router.push('../map');
      const response = await api.post("/assistance", requestBody);

      if (response.status !== 200) {
        console.log("Request failed");
        showAlert("Error", "Failed to submit assistance request. Please try again.");
        throw new Error("Request failed");
      }

      console.log(response.data);

      const specialists = response.data.content;

      const specialistsCoordinates: CoordinateType[] = specialists.map((specialist: any) => {
        return { 
          latitude: specialist.locationLatitude,
          longitude: specialist.locationLongitude,
        }
      });



      console.log("Specialists coordinates", specialistsCoordinates);

      const encodedCoordinates = encodeURIComponent(JSON.stringify(specialistsCoordinates));
      console.log("Encoded coordinates before push", encodedCoordinates);
      

      router.push(`../map?coordinatesParam=${encodedCoordinates}`);
      

      // if (response.status === 200) {
      //   console.log("Request successful");
      //   setResponseData(response.data); 
      //   showAlert("Success", "Assistance request submitted successfully!");
      // } else {
      //   console.log("Request failed");
      //   showAlert("Error", "Failed to submit assistance request. Please try again.");
      // }
    } catch (error) {
      console.log("Error in request submission");
      console.error("Error:", error);
      showAlert("Error", "An error occurred. Please try again.");
    }
  };

  return (
    <ImageBackground
      source={backgroundimage}
      resizeMode="cover"
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.text}>Tell us what you need</Text>
        <Controller
          control={control}
          rules={{ required: true }}
          name="text"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.textInput}
              placeholder="Enter the problem you are facing"
              placeholderTextColor={grey}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              onSubmitEditing={handleSubmit(onSubmit)}
              returnKeyType="search"
            />
          )}
        />
        {errors.text && <Text style={styles.errorText}>This is required.</Text>}

        {/* Modal for displaying response data */}
        {/* <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Search Results</Text>

              {responseData && responseData.content && responseData.content.length > 0 ? (
                <View >
                  {responseData.content.map((item: any, index: number) => (
                    <View key={index} style={styles.resultItem}>
                      <Text >Name: {item.name}</Text>
                      <Text >Email: {item.email}</Text>
                      {item.specialties && item.specialties.length > 0 ? (
                        <View>
                          <Text>Specialties:</Text>
                          {item.specialties.map((specialty: any, i: number) => (
                            <Text key={i}>
                               • {specialty.title}
                            </Text>
                          ))}
                        </View>
                      ) : (
                        <Text>No specialties listed</Text>
                      )}
                    </View>
                  ))}
                </View>
              ) : (
                <Text>No results found.</Text>
              )}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal> */}
      </View>
    </ImageBackground>
  );
};

export default SearchDiv;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    height: "100%",
    width: Dimensions.get("window").width,
  },
  container: {
    margin: 20,
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
  },
  text: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.text,
    marginVertical: 20,
  },
  textInput: {
    marginTop: 20,
    borderWidth: 1,
    padding: 4,
    borderRadius: 10,
    paddingLeft: 10,
    width: Dimensions.get("screen").width * 0.85,
    height: 50,
    borderColor: colors.icon,
    backgroundColor: "#dfe4e0",
  },
  errorText: {
    color: colors.errorText,
    marginTop: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Dark background
  },
  modalContainer: {
    width: "80%",
    padding: 20,
    backgroundColor: "#dfe4e0",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  resultItem: {
    padding: 10,
    borderRadius: 8,
    borderColor: colors.icon,
    borderWidth: 1,
    backgroundColor: "white",
    width: "100%",
  },
  closeButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: grey,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
});
