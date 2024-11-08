import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Text, SafeAreaView, TouchableOpacity, Pressable } from "./Tailwind";
import { useColorScheme } from "nativewind";
import Visible from "./Common/Visibility";
import { routes } from "../utils/shared/constant";
import { TokenSelectionParams } from "../utils/shared/types";

const HomeHeader = () => {
  const route = useRoute();
  const { colorScheme } = useColorScheme();
  const navigation = useNavigation() as any;



  return (
    <SafeAreaView className="bg-white  dark:bg-black">
      <View className="px-6 flex justify-between items-center flex-row bg-white dark:bg-black border-b-[0.5px] border-[#00000018] dark:border-white/10 h-20">
        <View>
          <Visible condition={route.name === "Wallet"}>
            <TouchableOpacity onPress={() => {
              navigation.navigate(
                routes.tokenSelection as keyof typeof routes,
                {
                  title: "Add token",
                  tokenSelectionScreenAction: "Create",
                } as TokenSelectionParams
              );
            }}
              className="h-[35px] w-[35px] flex items-center justify-center  bg-slate-600 dark:bg-[#1f1f1f]  rounded-lg ">
            <AntDesign
              name="plus"
              size={20}
              color={colorScheme ? "#ffff" : "#737272"}
            />
            </TouchableOpacity>
          </Visible>
        </View>

        <Text
          style={{ fontFamily: "Nunito-Bold" }}
          className="text-[18px]  relative  text-slate-700 dark:text-white"
        >
          {route.name}
        </Text>

        <View className=""></View>
      </View>
    </SafeAreaView>
  );
};

export default HomeHeader;
