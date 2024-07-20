import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomBottomSheet from "../components/Widgets/BottomSheet";
import { CustomeBottomSheetRef } from "../util/shared/types";
import Feather from "@expo/vector-icons/Feather";

import { cn } from "../util/cn";
import { Text, TouchableOpacity, Image, View } from "../components/Tailwind";
import HomeHeader from "../components/HomeHeader";
import Home from "../screens/Home";
import Setting from "../screens/Setting";
import Button from "../components/Widgets/Button";
import { useRef } from "react";

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  const bottomSheet = useRef<CustomeBottomSheetRef>();

  return (
    <Tab.Navigator
      sceneContainerStyle={{ backgroundColor: "white" }}
      screenOptions={{
        tabBarStyle: {
          borderWidth: 1,
          borderColor: "#e9eef5",
          shadowColor: "transparent",
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
            <AntDesign name="setting" size={25} color={color} />
          ),
        }}
        name="Setting"
        component={Setting}
      />
    </Tab.Navigator>
  );
}
