import { NativeStackNavigationOptions } from "@react-navigation/native-stack";

import { View, Text } from "../components/Tailwind";
import { useAuthSetps } from "../states/authSteps.state";
import AuthHeaderStep from "../components/AuthHeaderStep";
import AuthHeaderBackButton from "../components/AuthHeaderBackButton";
import { cn } from "../utils/cn";
import { Platform } from "react-native";

export const AuthScreenHeader: NativeStackNavigationOptions = {
  headerStyle: {
    backgroundColor: "#fff",
  },

  headerShadowVisible: false,
  headerRight: () => {
    const { currentStep, maxSteps } = useAuthSetps();

    return (
      <View
        className={cn("flex  justify-center rounded-full w-28", {
          "mt-2": Platform.OS === "android",
        })}
      >
        <Text style={{ fontFamily: "Nunito-Regular", textAlign: "right" }}>
          {currentStep}/{maxSteps}
        </Text>
      </View>
    );
  },
  headerTitle:()=>  <View className="bg-red h-7 w-full"></View>,

  headerBackVisible: false,
  headerLeft: () => <AuthHeaderBackButton />,
};
