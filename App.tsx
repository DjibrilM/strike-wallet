import "reflect-metadata";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";


import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "nativewind";
import "react-native-get-random-values";
import 'react-native-gesture-handler'
import "react-native-gesture-handler";

import NotificationProvider from "./utils/NotificationProvider";

const queryClient = new QueryClient()

import { useCallback, useLayoutEffect } from "react";
import { useFonts } from "expo-font";
import { AppState } from "react-native";
import { useEffect } from "react";

import Navigation from "./navigation";
import fonts from "./utils/shared/fonts";
import { useAppStateStore } from "./states/appStatus.state";
import DatabaseConnectionProvider from "./data/connection";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts(fonts);
  const { updateCurrentApplicationState } = useAppStateStore();
  const { setColorScheme } = useColorScheme();
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  useLayoutEffect(() => {
    setColorScheme("light");
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
    <NotificationProvider>
    <DatabaseConnectionProvider>
      <GestureHandlerRootView>
          <BottomSheetModalProvider>
            <QueryClientProvider client={queryClient}>

              <Navigation />

          </QueryClientProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
      </DatabaseConnectionProvider>
    </NotificationProvider>
  );
}
