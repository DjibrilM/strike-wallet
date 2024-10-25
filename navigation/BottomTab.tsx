
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from '@expo/vector-icons/AntDesign';

import HomeHeader from "../components/HomeHeader";
import Home from "../screens/Home";
import Setting from "../screens/Setting";
import TransactionsHistory from "../screens/TransactionsHistory";

const Tab = createBottomTabNavigator();

export default function BottomTab() {

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
          tabBarIcon: ({ color }) => (
            <AntDesign name="clockcircle" size={25} color={color} />

          ),
        }}
        name="Transactions"
        component={TransactionsHistory}
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
