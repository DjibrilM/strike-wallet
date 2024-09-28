import { useRef } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useColorScheme } from "nativewind";

import CustomBottomSheet from "../components/Widgets/BottomSheet";
import { CustomeBottomSheetRef } from "../utils/shared/types";
import { cn } from "../utils/cn";
import { Text, TouchableOpacity, View } from "../components/Tailwind";
import HomeHeader from "../components/HomeHeader";
import Home from "../screens/Home";
import Setting from "../screens/Setting";
import Button from "../components/Widgets/Button";

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  const bottomSheet = useRef<CustomeBottomSheetRef>();
  const { colorScheme } = useColorScheme();

  return (
    <Tab.Navigator
      sceneContainerStyle={{ backgroundColor: "white" }}
      screenOptions={{
        tabBarStyle: {
          backfaceVisibility: 'visible',
          backgroundColor: '#transparent',
          shadowColor: "transparent",
          height: Platform.OS === "android" ? 80 : 90,
        },
        tabBarInactiveTintColor: "#8e8e8e",
        tabBarActiveTintColor: "#5a8dfe",
        header: () => <HomeHeader />,
      }}
    >

      <Tab.Screen
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color }) => (
            <Ionicons name="wallet" size={20} color={color} />
          ),
        }}
        name="Wallet"
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarLabel: () => null,
          tabBarIcon: () => (
            <>
              <CustomBottomSheet ref={bottomSheet}>
                <View className="px-6 pb-6 w-full">
                  <Text className="text-slate-500"></Text>

                  <View className="flex w-full flex-row gap-4">
                    <Button className="flex-1 flex  ">
                      <View className="flex w-full justify-center items-center flex-row gap-2">
                        <Text
                          style={{ fontFamily: "Nunito-SemiBold" }}
                          className="text-white"
                        >
                          Send
                        </Text>
                        <Feather
                          name="arrow-up-right"
                          size={24}
                          color="white"
                        />
                      </View>
                    </Button>

                    <Button className="flex-1 flex  ">
                      <View className="flex w-full justify-center items-center flex-row gap-2">
                        <Text
                          style={{ fontFamily: "Nunito-SemiBold" }}
                          className="text-white"
                        >
                          Receive
                        </Text>
                        <Feather
                          name="arrow-down-left"
                          size={24}
                          color="white"
                        />
                      </View>
                    </Button>
                  </View>
                </View>
              </CustomBottomSheet>

              <TouchableOpacity
                onPress={() => bottomSheet.current?.open()}
              >
                <AntDesign name="clockcircle" size={30} color="#5a8dfe" />
              </TouchableOpacity>
            </>
          ),
        }}
        name="Exchange"
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color }) => (
            <AntDesign name="setting" size={20} color={color} />
          ),
        }}
        name="Setting"
        component={Setting}
      />
    </Tab.Navigator>
  );
}
