import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

import { Pressable } from "./Tailwind";
import { useNavigation } from "@react-navigation/native";
import { View } from "./Tailwind";
import { cn } from "../utils/cn";
import { Platform } from "react-native";

const AuthHeaderBackButton = () => {
  const navigation = useNavigation();
  return (
    <Pressable onPress={() => navigation.goBack()}>
      <View
        className={cn("mt-2 mr-3", {
          "rounded-lg relative right-2":
            Platform.OS === "android",
        })}
      >
        <Ionicons name="chevron-back-outline" size={25} color="#475569" />
      </View>
    </Pressable>
  );
};

export default AuthHeaderBackButton;
