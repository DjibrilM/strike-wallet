import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootStckNavigator from "./RootStackNavigator";

const Navigation = () => {
  return (
    <NavigationContainer>
      <RootStckNavigator />
    </NavigationContainer>
  );
};

export default Navigation;
