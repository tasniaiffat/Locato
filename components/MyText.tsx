import React from "react";
import { DimensionValue, Text, TextStyle } from "react-native";

// Valid font weight values
type FontWeight = "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";


type MyTextProps = {
  textLabel: string;
  textColor: string;
  fontWeight?: FontWeight;
  marginBottom?: DimensionValue;
};

const MyText: React.FC<MyTextProps> = ({ textLabel, textColor, fontWeight = "bold", marginBottom = 0}) => {
  return (
    <Text style={{ fontSize: 16, color: textColor, fontWeight, marginBottom}}>
      {textLabel}
    </Text>
  );
};

export default MyText;
