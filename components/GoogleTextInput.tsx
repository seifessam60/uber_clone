import React from "react";
import { Text, View } from "react-native";
import { GoogleInputProps } from "@/types/type";

const GoogleTextInput = ({
  icon,
  initialLocation,
  textInputBackgroundColor,
  containerStyles,
  handlePress,
}: GoogleInputProps) => {
  return (
    <View
      className={`flex flex-row items-center justify-center relative z-50 rounded-xl ${containerStyles} mb-5`}
    >
      <Text>Search</Text>
    </View>
  );
};

export default GoogleTextInput;
