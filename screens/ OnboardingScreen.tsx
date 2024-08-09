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
        justifyContent: "space-between",
        height: "100%",
        backgroundColor: "#f9fafb",
      }}
    >
      <StatusBar barStyle="light-content" />
      <FlatList
        onViewableItemsChanged={(e) =>
          setViewIndex(e.viewableItems[0]?.index || 0)
        }
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        horizontal
        renderItem={(item) => (
          <View
            style={{ height: height - 200, width: width }}
            className="px-6 flex justify-center"
          >
            <View className="w-[70%] relative top-4 h-[70%] flex justify-center items-center mx-auto">
              <Image
                resizeMode="contain"
                className=" object-contain w-full h-full relative top-3"
                source={item.item.image}
              />
            </View>

            <Text
              style={{ fontFamily: "Nunito-Bold" }}
              className="mt-3 relative   text-slate-600 font-semibold mb-8 text-center text-2xl"
            >
              {item.item.title}
            </Text>

            <Text
              style={{ fontFamily: "Nunito-Regular" }}
              className="text-slate-500 relative bottom-6 text-center w-full leading-10 mt-2  text-base"
            >
              {item.item.description}
            </Text>
          </View>
        )}
        data={onboarding_screen_data}
      ></FlatList>

      <View className="pb-10 mt-4">
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
