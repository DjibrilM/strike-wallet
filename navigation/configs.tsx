import Ionicons from "@expo/vector-icons/Ionicons";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { useSharedValue, withTiming } from "react-native-reanimated";
import Animated from "react-native-reanimated";

import { Pressable, View, Text } from "../components/Tailwind";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { useAuthSetps } from "../states/authSteps.state";
import { useEffect } from "react";

export const AuthScreenHeader: NativeStackNavigationOptions = {
  headerStyle: {
    backgroundColor: "#F3F2F2",
  },

  headerShadowVisible: false,
  headerRight: () => {
    const { currentStep, maxSteps } = useAuthSetps();

    return (
      <View>
        <View className="h-2 bg-slate-500 rounded-full w-28">
          <Text style={{ fontFamily: "Nunito-Regular" }}>
            {currentStep}/{maxSteps}
          </Text>
        </View>
      </View>
    );
  },
  headerTitle: () => {
    const { currentStep, maxSteps } = useAuthSetps();
    const width = useSharedValue("0%");

    const updateWidth = () => {
      width.value = withTiming((100 * currentStep) / maxSteps + "%");
    };

    useEffect(() => {
      updateWidth();
    }, [currentStep]);

    return (
      <View style={styles.stepsContainer}>
        <Animated.View
          style={{
            width: width as any,
            height: 10,
            backgroundColor: "#1e293b",
            borderRadius: 1000,
          }}
        ></Animated.View>
      </View>
    );
  },

  headerBackVisible: false,
  headerLeft: () => {
    const navigation = useNavigation();
    return (
      <Pressable style={{ right: 10 }} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back-outline" size={24} color="#475569" />
      </Pressable>
    );
  },
};

const styles = StyleSheet.create({
  stepsContainer: {
    width: "80%",
    marginHorizontal: 10,
    position: "relative",
    right: 10,
    backgroundColor: "#cbd5e1",
    borderRadius: 100,
  },
});
