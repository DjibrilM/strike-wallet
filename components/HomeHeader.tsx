import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { View, Text, SafeAreaView, Image, Pressable } from "./Tailwind";
import { useColorScheme } from "nativewind";

const HomeHeader = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { colorScheme } = useColorScheme();

  return (
    <SafeAreaView className="bg-white  dark:bg-black">
      <View className="px-6 flex justify-between items-center flex-row bg-white dark:bg-black border-b-[0.5px] border-[#00000018] dark:border-white/10 h-20">
        <View>
          <Pressable className="h-[45px] w-[45px] flex items-center justify-center  bg-slate-600 dark:bg-[#1f1f1f]  rounded-lg ">
            <AntDesign
              name="plus"
              size={20}
              color={colorScheme ? "#ffff" : "#737272"}
            />
          </Pressable>
        </View>

        <Text
          style={{ fontFamily: "Nunito-Bold" }}
          className="text-[18px] right-3 relative  text-slate-700 dark:text-white"
        >
          {route.name}
        </Text>

        <View className=""></View>
      </View>
    </SafeAreaView>
  );
};

export default HomeHeader;
