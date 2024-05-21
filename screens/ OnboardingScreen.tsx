import React, { useState } from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { View, Text } from "../components/Tailwind";
import { Image } from "../components/Tailwind";
import { Dimensions } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Button from "../components/Widgets/Button";
import { onboarding_screen_data, routes } from "../util/shared/constant";
import { useNavigation } from "@react-navigation/native";

import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});

const { height, width } = Dimensions.get("window");

const OnboardingScreen = () => {
  const [ViewIndex, setViewIndex] = useState<number>(0);
  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: "#f9fafb",
      }}
    >
      <StatusBar barStyle="default" />
      <View className="flex gap-3 w-full  mt-5 justify-center items-center flex-col">
        <Image
          source={require("../assets/images/logo.png")}
          className="w-12 h-12"
        />
      </View>

      <FlatList
        onViewableItemsChanged={(e) =>
          setViewIndex(e.viewableItems[0]?.index || 0)
        }
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        horizontal
        renderItem={(item) => (
          <View style={{ height: height - 300, width: width }} className="px-6 flex justify-center">
            <Image
              className="mx-auto scale-[0.8] object-contain"
              source={item.item.image}
            />

            <Text
              style={{ fontFamily: "Nunito-SemiBold" }}
              className="text-left mt-3  text-slate-700 font-semibold text-[25px]"
            >
              {item.item.title}
            </Text>

            <Text className="text-slate-700 w-full leading-10 mt-2  text-left text-base">
              {item.item.description}
            </Text>
          </View>
        )}
        data={onboarding_screen_data}
      ></FlatList>

      <View className="pb-10">
        <View className="justify-center mb-10 items-center flex-row gap-3 w-full mx-auto">
          {onboarding_screen_data.map((dt, index) => (
            <View
              style={{
                backgroundColor: index === ViewIndex ? "#1354fe" : "#cbd5e1",
              }}
              key={dt.id}
              className="w-3 h-3 rounded-lg bg-slate-400"
            />
          ))}
        </View>

        <View className="px-6">
          <Button
            label="Start"
            onPress={() => navigation.navigate(routes.walletSetup as never)}
          ></Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;
