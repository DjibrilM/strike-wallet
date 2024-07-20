import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState, useContext } from "react";
import { ActivityIndicator } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text } from "../components/Tailwind";

import { routes } from "../util/shared/constant";
import { SafeAreaView } from "../components/Tailwind";
import WalletSetup from "../screens/Auth/WalletSetup";
import SecurityConfig from "../screens/Auth/PasswordConfig";
import SeedPhraseSetupReminder from "../screens/Auth/SeedPhraseSetupReminder";
import SeedPhraseGeneration from "../screens/Auth/SeedPhraseGeneration";
import SeedPhraseRevelation from "../screens/Auth/SeedPhraseRevelation";
import SeedPhraseMatchTest from "../screens/Auth/SeedPhraseMatchTest";
import SeedPhraseSetUpEnd from "../screens/Auth/SeedPhraseSetUpEnd";
import ImportExistingSeedPhrase from "../screens/Auth/ImportExistingSeedPhrase";
import { View } from "../components/Tailwind";
import { Platform, Pressable } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import BottomTab from "./BottomTab";
import CurrencyDetailPage from "../screens/CurrencyDetailPage";
import SendToken from "../screens/SendToken";
import OnboardingScreen from "../screens/ OnboardingScreen";
import Visible from "../components/Common/Visibility";
import { DatabaseConnectionContext } from "../data/connection";
import LockScreen from "../components/Hoc/LockCheckerScreen";
import TokenSelection from "../screens/TokenSelection";
import { useSettings } from "../states/settings";

//stack navigator
const Stack = createNativeStackNavigator();
//
const RootStckNavigator = () => {
  const [loading, setLoading] = useState(true);
  const initialRouteName = useRef("");
  const databaseContext = useContext(DatabaseConnectionContext);
  const { setSetting } = useSettings();
  const [enableLockScreen, setEnableLockScreen] = useState(false);

  const getPassword = async () => {
    try {
      const passwordsCount = await databaseContext.SettingsEntity?.count();
      const configurations = await databaseContext.SettingsEntity?.find();

      if (!Boolean(passwordsCount)) {
        initialRouteName.current = routes.OnboardingScreen;
        setLoading(false);
      } else {
        initialRouteName.current = routes.home;
        setLoading(false);
        setSetting(configurations![0]);
        setEnableLockScreen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPassword();
  }, []);

  return (
    <>
      <Visible condition={loading}>
        <SafeAreaView className="flex flex-1 items-center justify-center flex-row">
          <View>
            <ActivityIndicator size={30} color={"#1354fe"} />
            <Text className="text-slate-600 mt-4 text-center">..loading</Text>
          </View>
        </SafeAreaView>
      </Visible>

      <Visible condition={!loading}>
        <LockScreen enableLockScreen={enableLockScreen}>
          <Stack.Navigator initialRouteName={initialRouteName.current}>
            <Stack.Screen
              options={{
                header: () => {
                  const { goBack } = useNavigation();
                  return (
                    <SafeAreaView style={{ backgroundColor: "white" }}>
                      <View className="border-b flex justify-center px-4 border-slate-200 h-[70px]">
                        <Pressable onPress={goBack}>
                          <Ionicons
                            name="chevron-back-outline"
                            size={25}
                            color="#1354fe"
                          />
                        </Pressable>
                      </View>
                    </SafeAreaView>
                  );
                },
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
                header: () => {
                  const { goBack } = useNavigation();
                  return (
                    <SafeAreaView style={{ backgroundColor: "white" }}>
                      <View className="border-b flex justify-center px-4 border-slate-200 h-16">
                        <TouchableOpacity onPress={goBack}>
                          <Ionicons
                            name="chevron-back-outline"
                            size={25}
                            color="#1354fe"
                          />
                        </TouchableOpacity>
                      </View>
                    </SafeAreaView>
                  );
                },
              }}
              name={routes.securityConfig}
              component={SecurityConfig}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name={routes.seedPhraseSetupReminder}
              component={SeedPhraseSetupReminder}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name={routes.seedPhraseGenerationPage}
              component={SeedPhraseGeneration}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name={routes.seedPhraseRevelation}
              component={SeedPhraseRevelation}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name={routes.seedPhraseMatchTest}
              component={SeedPhraseMatchTest}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name={routes.SeedPhraseSetUpEnd}
              component={SeedPhraseSetUpEnd}
            />
            <Stack.Screen
              options={{
                header: () => {
                  const { goBack } = useNavigation();
                  return Platform.OS === "android" ? (
                    <SafeAreaView style={{ backgroundColor: "white" }}>
                      <View className="border-b flex justify-center px-4 border-slate-200 h-[70px]">
                        <TouchableOpacity onPress={goBack}>
                          <Ionicons
                            name="chevron-back-outline"
                            size={25}
                            color="#1354fe"
                          />
                        </TouchableOpacity>
                      </View>
                    </SafeAreaView>
                  ) : (
                    <></>
                  );
                },

                headerShadowVisible: false,
                animation:
                  Platform.OS === "ios" ? "slide_from_bottom" : "default",
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
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name={routes.home}
              component={BottomTab}
            />
            <Stack.Screen
              options={{
                headerTitleStyle: { fontFamily: "Nunito-SemiBold" },
                headerTitleAlign: "center",
                headerLeft: () => {
                  const { goBack } = useNavigation();
                  return (
                    <Pressable onPress={goBack}>
                      <Ionicons
                        name="chevron-back-outline"
                        size={25}
                        color="#1354fe"
                      />
                    </Pressable>
                  );
                },
                headerShadowVisible: false,
                headerStyle: { backgroundColor: "white" },
                animation: "slide_from_right",
              }}
              name={routes.currencyDetailPage}
              component={CurrencyDetailPage}
            />

            <Stack.Screen
              options={{
                headerTitleStyle: { fontFamily: "Nunito-SemiBold" },
                headerTitleAlign: "center",
                headerLeft: () => {
                  const { goBack } = useNavigation();
                  return (
                    <Pressable onPress={goBack}>
                      <Ionicons
                        name="chevron-back-outline"
                        size={25}
                        color="#1354fe"
                      />
                    </Pressable>
                  );
                },
                headerShadowVisible: false,
                headerStyle: { backgroundColor: "white" },
                animation: "slide_from_right",
              }}
              name={routes.tokenSelection}
              component={TokenSelection}
            />

            <Stack.Screen
              options={{
                headerTitleStyle: { fontFamily: "Nunito-SemiBold" },
                headerTitleAlign: "center",
                headerLeft: () => {
                  const { goBack } = useNavigation();
                  return (
                    <Pressable onPress={goBack}>
                      <Ionicons
                        name="chevron-back-outline"
                        size={25}
                        color="#1354fe"
                      />
                    </Pressable>
                  );
                },
                headerShadowVisible: false,
                headerStyle: { backgroundColor: "white" },
                animation: "slide_from_right",
              }}
              name={routes.sendToken}
              component={SendToken}
            />
          </Stack.Navigator>
        </LockScreen>
      </Visible>
    </>
  );
};

export default RootStckNavigator;
