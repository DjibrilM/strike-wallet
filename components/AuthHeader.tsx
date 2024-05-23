import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { cn } from "../util/cn";

import { View, Text, Pressable } from "./Tailwind";
import { useAuthSetps } from "../states/authSteps.state";
import { Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";

const steps = 4;

const AuthHeader = () => {
  const { currentStep } = useAuthSetps();
  const { goBack } = useNavigation();

  return (
    <View
      className={cn("w-full mt-6 relative mb-14 h-4 flex   top-0 ", {
        "px-6": Platform.OS === "ios",
      })}
    >
      <Pressable onPress={goBack} className={"h-6 relative bottom-1"}>
        <Ionicons
          style={{ position: "relative", right: 10 }}
          name="chevron-back-outline"
          size={26}
          color="#1354fe"
        />
      </Pressable>

      <View className="mt-8 relative flex justify-between flex-row items-center">
        {Array.from({ length: steps }).map((_, index) => (
          <View
            className={cn(
              "h-7 z-30 flex items-center border-[2px] border-slate-300 justify-center w-7 bg-white rounded-full",
              {
                "bg-blueDefault border-blueDefault": currentStep >= index + 1,
                "border-blueDefault bg-white": currentStep === index,
              }
            )}
          >
            <Text
              className={cn(" text-slate-400", {
                "text-blueDefault": currentStep === index,
                "text-white ": currentStep >= index + 1,
              })}
              style={{ fontFamily: "Nunito-Regular" }}
            >
              {index + 1}
            </Text>
          </View>
        ))}

        <View className="absolute justify-between flex flex-row w-full">
          {Array.from({ length: 3 }).map((_, index) => (
            <View
              className={cn(
                "h-[3px] w-[33%] flex relative right  bg-slate-300 rounded-full",
                {
                  " bg-blueDefault": currentStep - index >= index,
                }
              )}
            >
              <Text>{index}:oo</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default AuthHeader;
