import React from "react";
import Feather from "@expo/vector-icons/Feather";

import { View, Text, Pressable } from "../Tailwind";

interface Props {
  onSend?: () => void;
  onReceive?: () => void;
}

const ShareControls: React.FC<Props> = ({ onSend, onReceive }) => {
  return (
    <View className="bg-slate-600 relative overflow-hidden py-2 items-center justify-center flex-row px-2 rounded-xl">
      <View className="absolute rounded-full left-[-30px] top-1 w-20 h-20 border-[10px] border-white/20"></View>
      <View className="h-20 rotate-12 bottom-10 w-7 left-20 absolute bg-white/20"></View>
      <View className="h-20 rotate-12 w-7 right-20 absolute bg-white/20"></View>
      <Pressable
        onPress={onSend}
        className="flex py-4 mr-1 flex-auto flex-row justify-center rounded-xl bg-white items-center"
      >
        <Feather name="arrow-down-left" size={20} color="#475569" />
        <Text className="text-slate-700 mx-2">Send</Text>
      </Pressable>

      <Pressable
        onPress={onReceive}
        className="flex py-4 flex-auto flex-row ml-2 justify-center rounded-xl bg-white items-center"
      >
        <Text className="mx-2 text-slate-600">Receive</Text>
        <Feather name="arrow-up-right" size={20} color="#475569" />
      </Pressable>
    </View>
  );
};

export default ShareControls;
