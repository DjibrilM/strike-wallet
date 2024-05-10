import React, { useState } from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { View, Text } from "../components/Tailwind";
import { Image } from "../components/Tailwind";
import { Dimensions } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Button from "../components/common/Button";
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
    <SafeAreaView>
      <StatusBar barStyle={"default"} />
      <View className="flex gap-3 w-full  mt-3 justify-center items-center flex-col">
        <Image
          source={require("../assets/images/logo.png")}
          className="w-16 h-16"
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
          <View style={{ height: height - 300, width: width }} className="px-5">
            <Text
              style={{ fontFamily: "Nunito-SemiBold" }}
              className="text-center mt-10  text-slate-700 font-black text-[25px]"
            >
              {item.item.title}
            </Text>

            <Text className="text-slate-700 w-full leading-10 mt-2  text-center text-base">
              {item.item.description}
            </Text>

            <Image
              className="w-[300px] h-[300px] mx-auto"
              source={item.item.image}
            />
          </View>
        )}
        data={onboarding_screen_data}
      ></FlatList>

      <View className="justify-center items-center flex-row gap-3 w-full mx-auto">
        {onboarding_screen_data.map((dt, index) => (
          <View
            style={{
              backgroundColor: index === ViewIndex ? "#1e293b" : "#cbd5e1",
            }}
            key={dt.id}
            className="w-3 h-3 rounded-lg bg-slate-400"
          />
        ))}
      </View>

      <View className="px-5 mt-7">
        <Button
          onPress={() => navigation.navigate(routes.walletSetup as never)}
        >
          <Text
            className="font-bold text-slate-200"
            style={{ fontFamily: "Nunito-Regular" }}
          >
            Start
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;
