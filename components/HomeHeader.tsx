import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Text, SafeAreaView, Image, Pressable } from "./Tailwind";

const HomeHeader = () => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <SafeAreaView className="bg-white">
      <View className="px-6 flex justify-between items-center flex-row bg-white border-b border-slate-200 h-20">
        <View>
          <Image
            className="w-[50px] h-[50px]"
            source={require("../assets/images/logo.png")}
          />
        </View>

        <Text
          style={{ fontFamily: "Nunito-Bold" }}
          className="text-[18px] relative left-6 text-slate-700"
        >
          {route.name}
        </Text>

        <View className="flex-row gap-2">
          <Pressable className="h-[45px] w-[45px] flex items-center justify-center  bg-slate-100 rounded-lg ">
            <AntDesign name="plus" size={20} color="#737272" />
          </Pressable>

          <Pressable className="h-[45px] w-[45px] flex items-center justify-center  bg-slate-100 rounded-lg ">
            <Ionicons name="notifications-outline" size={24} color="#737272" />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeHeader;
