import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import OnboardingScreen from "../screens/ OnboardingScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WalletSetup from "../screens/Auth/WalletSetup";
import { routes } from "../util/shared/constant";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, View } from "../components/Tailwind";
import { useNavigation } from "@react-navigation/native";
import { Text } from "../components/Tailwind";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={routes.OnboardingScreen}>
        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: "#F3F2F2",
            },
            headerShadowVisible: false,
            headerTitle: () => {
              return (
                <View className="w-full relative right-12  flex items-center">
                  <Text className="text-2xl font-semibold text-slate-700 font-['Nunito-Regular']">Strike Wallet</Text>
                </View>
              );
            },
            headerBackVisible: false,
            headerLeft: () => {
              const navigation = useNavigation();
              return (
                <Pressable onPress={() => navigation.goBack()}>
                  <Ionicons
                    name="chevron-back-outline"
                    size={24}
                    color="#475569"
                  />
                </Pressable>
              );
            },
            title: "",
          }}
          name={routes.walletSetup}
          component={WalletSetup}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name={routes.OnboardingScreen}
          component={OnboardingScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
