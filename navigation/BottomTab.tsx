import { useRef } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useColorScheme } from "nativewind";

import { CustomeBottomSheetRef } from "../utils/shared/types";
import { TouchableOpacity } from "../components/Tailwind";
import HomeHeader from "../components/HomeHeader";
import Home from "../screens/Home";
import Setting from "../screens/Setting";

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  const bottomSheet = useRef<CustomeBottomSheetRef>();
  useColorScheme();

  return (
    <Tab.Navigator
      sceneContainerStyle={{ backgroundColor: "white" }}
      screenOptions={{
        tabBarStyle: {
          backfaceVisibility: 'visible',
          backgroundColor: '#fff',
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
              <TouchableOpacity
                onPress={() => bottomSheet.current?.open()}
              >
                <AntDesign name="clockcircle" size={25} color="#5a8dfe" />
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
