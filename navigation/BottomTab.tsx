import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { cn } from "../util/cn";

import { Text, TouchableOpacity, Image, View } from "../components/Tailwind";
import HomeHeader from "../components/HomeHeader";
import Home from "../screens/Home";
import Setting from "../screens/Setting";
import { Platform } from "react-native";

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator
      sceneContainerStyle={{ backgroundColor: "white" }}
      screenOptions={{
        tabBarStyle: {
          borderWidth: 1,
          borderColor:"#e9eef5",
          shadowColor:'transparent',
          height: Platform.OS === "android" ? 80 : 90,
          borderTopColor: Platform.OS === "ios" ? "#cbd5e1" : "transparent",
        },
        tabBarInactiveTintColor: "#8e8e8e",
        tabBarActiveTintColor: "#1354fe",
        header: () => <HomeHeader />,
      }}
    >
      <Tab.Screen
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color }) => (
            <Ionicons name="wallet" size={25} color={color} />
          ),
        }}
        name="Wallet"
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color }) => (
            <TouchableOpacity
              className={cn(
                "top-[3px] rounded-full bg-white flex items-center justify-center w-[60px] h-[60px] relative",
                {
                  "w-[75px] h-[75px]  p-1 border border-slate-100  top-[-30px] relative":
                    Platform.OS === "android",
                }
              )}
            >
              <View className="w-full h-full bg-blueDefault rounded-full flex justify-center items-center">
                <Image
                  className="w-[40%] h-[40%]"
                  source={require("../assets/images/two-arrow.png")}
                ></Image>
              </View>
            </TouchableOpacity>
          ),
        }}
        name="Exchange"
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color }) => (
            <AntDesign name="setting" size={25} color={color} />
          ),
        }}
        name="Setting"
        component={Setting}
      />
    </Tab.Navigator>
  );
}
