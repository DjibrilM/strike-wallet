import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { cn } from "../utils/cn";

import { View, Text, Pressable } from "./Tailwind";
import { useAuthSetps } from "../states/authSteps.state";
import { useNavigation } from "@react-navigation/native";

const steps = 3;

const AuthHeader = () => {
  const { currentStep } = useAuthSetps();
  const { goBack } = useNavigation();

  return (
    <View
      className={cn(
        "w-full flex-row justify-between  mt-6 relative mb-5 flex top-0 ",
        {}
      )}
    >
      <Pressable onPress={goBack} className={"h-6 relative bottom-1"}>
        <Ionicons
          style={{ position: "relative", right: 10 }}
          name="chevron-back-outline"
          size={26}
          color="#1354fe"
        />
      </Pressable>

      <View className="w-10/12   relative flex justify-between flex-row items-center">
        <View className="absolute justify-between flex flex-row w-full">
          {Array.from({ length: 2 }).map((_, index) => (
            <View
              key={"auth-header-steps-dott-" + index}
              className={cn(
                "h-[3px] w-[47%] flex relative right  bg-slate-300 rounded-full",
                {
                  " bg-blueDefault": currentStep - index >= index,
                }
              )}
            >
              <Text>{index}:oo</Text>
            </View>
          ))}
        </View>

        {Array.from({ length: steps }).map((_, index) => (
          <View
            key={"auth-header-steps-" + index}
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
      </View>
    </View>
  );
};

export default AuthHeader;
