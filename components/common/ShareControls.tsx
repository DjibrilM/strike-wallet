import React from "react";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRoute } from "@react-navigation/native";

import { View, Text, Pressable } from "../Tailwind";
import { useNavigation } from "@react-navigation/native";
import { routes } from "../../util/shared/constant";
import { CurrencyData } from "../../util/shared/types";

interface Props {
  onExchange?: () => void;
}

const ShareControls: React.FC<Props> = ({ onExchange }) => {
  return (
    <View className="flex-row mx-auto justify-between px-1   items-center w-full">
      <Pressable onPress={onExchange} className="flex  flex-col justify-center items-center">
        <View className="bg-gray-400 p-4  rounded-full">
          <AntDesign name="arrowup" size={20} color="#ffff" />
        </View>
        <Text
          className="text-gray-500 mt-3"
          style={{ fontFamily: "Nunito-SemiBold" }}
        >
          Send
        </Text>
      </Pressable>

      <View className="flex  flex-col rounded-[20px] justify-center items-center">
        <View className="bg-slate-100 p-4 rounded-full">
          <AntDesign name="arrowdown" size={20} color="#6e6e6e" />
        </View>
        <Text
          className="text-gray-500 mt-3"
          style={{ fontFamily: "Nunito-SemiBold" }}
        >
          Receive
        </Text>
      </View>

      <View className="flex  flex-col rounded-[20px] justify-center items-center">
        <View className="bg-slate-100 p-4 rounded-full">
          <FontAwesome name="bank" size={20} color="#6e6e6e" />
        </View>
        <Text
          className="text-gray-500 mt-3"
          style={{ fontFamily: "Nunito-SemiBold" }}
        >
          Sell
        </Text>
      </View>

      <View className="flex  flex-col justify-center items-center">
        <View className="bg-slate-100 p-4  rounded-full">
          <AntDesign name="plus" size={20} color="#6e6e6e" />
        </View>
        <Text
          className="text-gray-500 mt-3"
          style={{ fontFamily: "Nunito-SemiBold" }}
        >
          Buy
        </Text>
      </View>

      <View className="flex  flex-col  justify-center items-center">
        <View className="bg-slate-100 w-[55px]   justify-center items-center h-[55px] rounded-full">
          <FontAwesome name="exchange" size={15} color="#6e6e6e" />
        </View>
        <Text
          className="text-gray-500 mt-3"
          style={{ fontFamily: "Nunito-SemiBold" }}
        >
          History
        </Text>
      </View>
    </View>
  );
};

export default ShareControls;
