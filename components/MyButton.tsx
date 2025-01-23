import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

type MyButtonProps = {
  bgColor: string;
  btnLabel: string;
  textColor: string;
  onPress: () => void;
};

const MyButton: React.FC<MyButtonProps> = ({ bgColor, btnLabel, textColor, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: bgColor,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 20,
        alignItems: "center",
        minWidth: 150,
        marginVertical: 10,
        marginBottom: 40
      }}
    >
      <Text style={{ fontSize: 20, color: textColor, fontWeight: "bold" }}>
        {btnLabel}
      </Text>
    </TouchableOpacity>
  );
};

export default MyButton;
