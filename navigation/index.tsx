import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import OnboardingScreen from "../screens/ OnboardingScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RootStckNavigator from "./RootStackNavigator";


const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <RootStckNavigator/>
    </NavigationContainer>
  );
};

export default Navigation;
