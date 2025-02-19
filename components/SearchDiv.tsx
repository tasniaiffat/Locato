import { colors, grey, lightblue } from "@/constants/Colors";
import { Dispatch, SetStateAction, useState } from "react";
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
import * as SecureStore from "expo-secure-store"; 

const backgroundImage: ImageSourcePropType = require("@/assets/images/locato_bg_search.jpg");

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
    if (data.text) {
      await SecureStore.setItemAsync("searchText", data.text);
    }
    router.push({
      pathname: "../map",
      params: { query: data.text },
    })
    // setIsModalVisible(true);
  };

  

  return (
    <ImageBackground
      source={backgroundImage}
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
              onChangeText={(text) => {
                onChange(text);
              }}
              onSubmitEditing={handleSubmit(onSubmit)}
              returnKeyType="search"
            />
          )}
        />
        {errors.text && <Text style={styles.errorText}>This is required.</Text>}
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
    fontWeight: "bold",
    fontSize: 16,
  },
});
