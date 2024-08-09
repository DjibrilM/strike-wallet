import React from "react";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRoute } from "@react-navigation/native";
import { useColorScheme } from "nativewind";

import { View, Text, Pressable } from "../Tailwind";

interface Props {
  onSend?: () => void;
  onReceive?: () => void;
}

const ShareControls: React.FC<Props> = ({ onSend, onReceive }) => {
  const {colorScheme} = useColorScheme()
  return (
    <View className="flex-row mx-auto px-1 gap-6   items-center w-full">
      <Pressable
        onPress={onSend}
        className="flex  flex-col justify-center items-center"
      >
        <View className="bg-gray-400 p-4 dark:bg-[#1f1f1f]  rounded-full">
          <AntDesign name="arrowup" size={20} color="#ffff" />
        </View>
        <Text
          className="text-gray-500 mt-3 dark:text-white"
          style={{ fontFamily: "Nunito-SemiBold" }}
        >
          Send
        </Text>
      </Pressable>

      <Pressable
        onPress={onReceive}
        className="flex  flex-col rounded-[20px] justify-center items-center"
      >
        <View className="bg-slate-100 dark:bg-[#1f1f1f] p-4 rounded-full">
          <AntDesign name="arrowdown" size={20} color={colorScheme === 'dark' ? 'white' : "#6e6e6e"} />
        </View>
        <Text
          className="text-gray-500 mt-3 dark:text-white"
          style={{ fontFamily: "Nunito-SemiBold" }}
        >
          Receive
        </Text>
      </Pressable>
    </View>
  );
};

export default ShareControls;
