import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

// Valid font weight values
type FontWeight =
  | "normal"
  | "bold"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900";

type MyLinkProps = {
  textLabel: string;
  textColor: string;
  fontWeight?: FontWeight;
  onPress: () => void;
};

const MyLink: React.FC<MyLinkProps> = ({
  textLabel,
  textColor,
  fontWeight = "bold",
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={{ fontSize: 16, color: textColor, fontWeight }}>
        {textLabel}
      </Text>
    </TouchableOpacity>
  );
};

export default MyLink;
