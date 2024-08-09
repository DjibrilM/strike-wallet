import "reflect-metadata";
import "react-native-get-random-values";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";
import "react-native-gesture-handler";
import { useColorScheme } from "nativewind";

import { useCallback, useLayoutEffect } from "react";
import { useFonts } from "expo-font";
import { AppState } from "react-native";
import { useEffect } from "react";

import Navigation from "./navigation";
import fonts from "./util/shared/fonts";
import { useAppStateStore } from "./states/appState";
import DatabaseConnectionProvider from "./data/connection";

import "./style.css";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts(fonts);
  const { updateCurrentApplicationState } = useAppStateStore();
  const { colorScheme, toggleColorScheme, setColorScheme } = useColorScheme();
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  useLayoutEffect(() => {
    setColorScheme("dark");
    onLayoutRootView();
  }, [fontsLoaded]);

  useEffect(() => {
    const subscriber = AppState.addEventListener("change", (states) => {
      updateCurrentApplicationState(states);
    });

    return () => subscriber.remove();
  }, []);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <DatabaseConnectionProvider>
      <GestureHandlerRootView>
        <BottomSheetModalProvider>
          <Navigation />
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </DatabaseConnectionProvider>
  );
}
