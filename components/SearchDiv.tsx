import { colors } from "@/constants/Colors";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  ImageSourcePropType,
  ImageBackground,
} from "react-native";
import {
  useForm,
  Controller,
  SubmitHandler,
  FieldValues,
} from "react-hook-form";
import { router } from "expo-router";

const backgroundimage: ImageSourcePropType = require("@/assets/images/locato_bg_search.jpg");

const SearchDiv = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data.text);
    router.push({ pathname: "/search-results", params: { query: data.text } });
  };

  return (
    <ImageBackground
      source={backgroundimage}
      resizeMode="cover"
      style={styles.background}
    >
    <View style={styles.container}>
      <Text style={styles.text}>
        Tell us what you need
      </Text>
      <Controller
        control={control}
        rules={{ required: true }}
        name="text"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.textInput}
            placeholder="Enter the problem you are facing"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
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
  background:{
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
  },
  errorText: {
    color: colors.errorText,
    marginTop: 5,
  },
});



