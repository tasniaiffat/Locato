import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

type HeadingProps = {
  textLabel: string;
  textColor: string;
};

const Heading: React.FC<HeadingProps> = ({ textLabel, textColor }) => {
  return (
      <Text style={{ fontSize: 22, color: textColor, fontWeight: "bold" }}>
        {textLabel}
      </Text>
  );
};

export default Heading;
