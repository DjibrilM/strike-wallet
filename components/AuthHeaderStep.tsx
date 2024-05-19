import { useEffect } from "react";
import { useSharedValue, withDelay, withTiming } from "react-native-reanimated";
import Animated from "react-native-reanimated";
import { StyleSheet } from "react-native";
import { Platform } from "react-native";

import { View } from "./Tailwind";
import { useAuthSetps } from "../states/authSteps.state";

const AuthHeaderStep = () => {
  const { currentStep, maxSteps, previousStep } = useAuthSetps();
  const width = useSharedValue((100 * previousStep) / maxSteps + "%");

  const updateWidth = () => {
    width.value = withTiming((100 * currentStep) / maxSteps + "%", {
      duration: 500,
    });
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
};

const styles = StyleSheet.create({
  stepsContainer: {
    marginTop: Platform.OS === "android" ? 10 : "auto",
    width: "75%",
    marginHorizontal: 10,
    position: "relative",
    right: Platform.OS === "ios" ? 10 : "auto",
    left: Platform.OS === "android" ? 7 : "auto",
    backgroundColor: "#cbd5e1",
    borderRadius: 100,
  },
});

export default AuthHeaderStep;
