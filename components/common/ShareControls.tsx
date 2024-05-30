import React from "react";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { View, Text } from "../Tailwind";

const ShareControls = () => {
  return (
    <View className="flex-row mx-auto justify-between   items-center w-full">
      <View className="flex  flex-col justify-center items-center">
        <View className=" bg-blueDefault p-3  rounded-full">
          <AntDesign name="arrowup" size={20} color="#ffff" />
        </View>
        <Text
          className="text-blueDefault mt-2"
          style={{ fontFamily: "Nunito-Bold" }}
        >
          Send
        </Text>
      </View>

      <View className="flex  flex-col rounded-[20px] justify-center items-center">
        <View className="bg-[#3b83f62b] p-3 rounded-full">
          <AntDesign name="arrowdown" size={20} color="#1354fe" />
        </View>
        <Text
          className="text-blueDefault mt-2"
          style={{ fontFamily: "Nunito-Bold" }}
        >
          Receive
        </Text>
      </View>

      <View className="flex  flex-col justify-center items-center">
        <View className="bg-[#3b83f62b] p-3  rounded-full">
          <AntDesign name="plus" size={20} color="#1354fe" />
        </View>
        <Text
          className="text-blueDefault mt-2"
          style={{ fontFamily: "Nunito-Bold" }}
        >
          Buy
        </Text>
      </View>

      <View className="flex  flex-col  justify-center items-center">
        <View className="bg-[#3b83f62b] w-[45px]   justify-center items-center h-[45px] rounded-full">
          <FontAwesome name="exchange" size={15} color="#1354fe" />
        </View>
        <Text
          className="text-blueDefault mt-3"
          style={{ fontFamily: "Nunito-Bold" }}
        >
          History
        </Text>
      </View>
    </View>
  );
};

export default ShareControls;
