import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import OnboardingScreen from "../screens/ OnboardingScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WalletSetup from "../screens/Auth/WalletSetup";
import { routes } from "../util/shared/constant";
import { AuthScreenHeader } from "./configs";
import SecurityConfig from "../screens/Auth/PasswordConfig";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={routes.OnboardingScreen}>
        <Stack.Screen
          options={{
            ...AuthScreenHeader,
            headerTitle: () => <></>,
            headerRight: () => <></>,
          }}
          name={routes.walletSetup}
          component={WalletSetup}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name={routes.OnboardingScreen}
          component={OnboardingScreen}
        />
        <Stack.Screen
          options={{
            ...AuthScreenHeader,
            animation: "fade_from_bottom",
          }}
          name={routes.securityConfig}
          component={SecurityConfig}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
