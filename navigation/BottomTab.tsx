import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";

import { Text, TouchableOpacity, Image, View } from "../components/Tailwind";
import HomeHeader from "../components/HomeHeader";
import Home from "../screens/Home";
import Setting from "../screens/Setting";

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator
      sceneContainerStyle={{ backgroundColor: "white" }}
      screenOptions={{
        tabBarStyle: {
          shadowColor: "transparent",
          borderTopColor: "#cbd5e1",
        },
        tabBarInactiveTintColor: "#8e8e8e",
        tabBarActiveTintColor: "#1354fe",
        header: () => <HomeHeader />,
      }}
    >
      <Tab.Screen
        options={{
          tabBarLabel:()=> null,
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
            <TouchableOpacity className=" bg-blueDefault rounded-full flex items-center justify-center w-[70px] h-[70px] relative bottom-4">
              <Image
                className="w-[40%] h-[40%]"
                source={require("../assets/images/two-arrow.png")}
              ></Image>
            </TouchableOpacity>
          ),
        }}
        name="Exchange"
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarLabel:()=> null,
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
