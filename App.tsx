import "react-native-gesture-handler";
import { useCallback, useLayoutEffect } from "react";
import { useFonts } from "expo-font";
import Navigation from "./navigation";
import fonts from "./util/shared/fonts";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import "./style.css";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts(fonts);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  useLayoutEffect(() => {
    onLayoutRootView();
  }, [fontsLoaded]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <Navigation />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
