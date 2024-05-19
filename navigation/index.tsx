import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import OnboardingScreen from "../screens/ OnboardingScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WalletSetup from "../screens/Auth/WalletSetup";
import { routes } from "../util/shared/constant";
import { AuthScreenHeader } from "./configs";
import SecurityConfig from "../screens/Auth/PasswordConfig";
import SeedPhraseSetupReminder from "../screens/Auth/SeedPhraseSetupReminder";
import SeedPhraseGeneration from "../screens/Auth/SeedPhraseGeneration";
import SeedPhraseRevelation from "../screens/Auth/SeedPhraseRevelation";
import SeedPhraseMatchTest from "../screens/Auth/SeedPhraseMatchTest";
import SeedPhraseSetUpEnd from "../screens/Auth/SeedPhraseSetUpEnd";

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

        <Stack.Screen
          options={{
            ...AuthScreenHeader,
            animation: "fade_from_bottom",
          }}
          name={routes.seedPhraseSetupReminder}
          component={SeedPhraseSetupReminder}
        />

        <Stack.Screen
          options={{
            ...AuthScreenHeader,
            animation: "fade_from_bottom",
          }}
          name={routes.seedPhraseGenerationPage}
          component={SeedPhraseGeneration}
        />

        <Stack.Screen
          options={{
            ...AuthScreenHeader,
            animation: "fade_from_bottom",
          }}
          name={routes.seedPhraseRevelation}
          component={SeedPhraseRevelation}
        />

        <Stack.Screen
          options={{
            ...AuthScreenHeader,
            animation: "fade_from_bottom",
          }}
          name={routes.seedPhraseMatchTest}
          component={SeedPhraseMatchTest}
        />

        <Stack.Screen
          options={{
            ...AuthScreenHeader,
            animation: "fade_from_bottom",
          }}
          name={routes.SeedPhraseSetUpEnd}
          component={SeedPhraseSetUpEnd}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
