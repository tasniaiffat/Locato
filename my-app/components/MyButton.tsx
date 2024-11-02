import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

const MyButton = () => {
  return (
    <View>
      <TouchableOpacity
        style={{
          backgroundColor: "navy",
          paddingHorizontal: 20,
          paddingVertical: 15,
          borderRadius: 10,
        }}
      >
        <Text style={{ 
            fontSize: 14, 
            color: "white", 
            fontWeight: "bold", 
        }}>
          MyButton
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyButton;
