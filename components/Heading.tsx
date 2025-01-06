import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

type HeadingProps = {
  textLabel: string;
  textColor: string;
  size?: number;
  style?: object;
};

const Heading: React.FC<HeadingProps> = ({ textLabel, textColor,size, style }) => {
  if(!size) size = 22;
  return (
      <Text style={{ fontSize: size, color: textColor, fontWeight: "bold", ...style }}>
        {textLabel}
      </Text>
  );
};

export default Heading;
