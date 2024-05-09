import React from "react";
import { FlatList } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";

import OnboardingScreen from "../screens/ OnboardingScreen";

const Navigation = () => {
  return (
    <NavigationContainer>
      <OnboardingScreen />
    </NavigationContainer>
  );
};

export default Navigation;
