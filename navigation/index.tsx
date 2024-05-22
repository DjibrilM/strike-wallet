import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import OnboardingScreen from "../screens/ OnboardingScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WalletSetup from "../screens/Auth/WalletSetup";
import Ionicons from "@expo/vector-icons/Ionicons";
import { routes } from "../util/shared/constant";
import { AuthScreenHeader } from "./configs";
import SecurityConfig from "../screens/Auth/PasswordConfig";
import SeedPhraseSetupReminder from "../screens/Auth/SeedPhraseSetupReminder";
import SeedPhraseGeneration from "../screens/Auth/SeedPhraseGeneration";
import SeedPhraseRevelation from "../screens/Auth/SeedPhraseRevelation";
import SeedPhraseMatchTest from "../screens/Auth/SeedPhraseMatchTest";
import SeedPhraseSetUpEnd from "../screens/Auth/SeedPhraseSetUpEnd";
import ImportExistingSeedPhrase from "../screens/Auth/ImportExistingSeedPhrase";
import { View } from "../components/Tailwind";
import { Platform, Pressable } from "react-native";

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
          options={{ headerShown: false }}
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

        <Stack.Screen
          options={{
            headerLeft: () => {
              const { goBack } = useNavigation();
              return Platform.OS === "android" ? (
                <Pressable onPress={goBack}>
                  <View className={"mt-2 p-[3px] relative"}>
                    <Ionicons
                      name="chevron-back-outline"
                      size={25}
                      color="#475569"
                    />
                  </View>
                </Pressable>
              ) : (
                <></>
              );
            },

            headerShadowVisible: false,
            animation: Platform.OS === "ios" ? "slide_from_bottom" : "default",
            fullScreenGestureEnabled: true,
            gestureDirection: "vertical",
            gestureEnabled: true,
            headerShown: Platform.OS === "ios" ? false : true,
            title: "",
            presentation: "modal",
          }}
          name={routes.seedPhraseImportantion}
          component={ImportExistingSeedPhrase}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
