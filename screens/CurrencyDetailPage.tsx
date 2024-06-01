import React, { useLayoutEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Dimensions } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StatusBar } from "../components/common/StatusBar";
import Entypo from "@expo/vector-icons/Entypo";
import Animated, {
  useScrollViewOffset,
  useAnimatedRef,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { LineChart } from "react-native-chart-kit";

import ShareControls from "../components/common/ShareControls";
import { randomTransactions } from "../util/shared/constant";
import TransactioElement from "../components/common/TransactionElement";

import {
  SafeAreaView,
  Text,
  Pressable,
  View,
  Image,
  ScrollView,
} from "../components/Tailwind";
import { CurrencyData } from "../util/shared/types";
import { cn } from "../util/cn";

interface Params {
  data: CurrencyData;
}

const CurrencyDetailPage = () => {
  const route = useRoute();
  const params = route.params as Params;
  const navigation = useNavigation();
  const animatedRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(animatedRef);
  const opacity = useSharedValue(0);
  const [showTopBorder, setshowTopBorder] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: params.data.name,
      headerRight: () => (
        <Pressable className=" bg-blueDefault p-1 rounded-full">
          <Ionicons name="information" size={18} color="white" />
        </Pressable>
      ),
    });
  }, []);

  const scrollView = () => {
    if (scrollOffset.value > 30) {
      opacity.value = withTiming(100);
    } else {
      opacity.value = withTiming(0, { duration: 10 });
    }
  };

  return (
    <SafeAreaView className="flex-1  bg-white">
      <StatusBar />
      <Animated.View
        style={{ borderBottomWidth: 0.9, borderColor: "#1b1b1b12", opacity: opacity }}
      ></Animated.View>
      <ScrollView onScroll={scrollView} ref={animatedRef}>
        <View className="mx-auto mt-10 flex items-center justify-center">
          <Image source={{ uri: params.data.image, width: 60, height: 60 }} />
          <Text
            style={{ fontFamily: "Nunito-Black" }}
            className="text-[25px] text-slate-600 font-bold mt-4"
          >
            0.04399625
          </Text>
          <Text
            style={{ fontFamily: "Nunito-Regular" }}
            className="mt-3 text-slate-500"
          >
            ≈$255
          </Text>
        </View>

        <View className="mt-10 px-6 pb-5 border-[#00000016] border-b">
          <ShareControls />
        </View>

        <View className="px-4">
          {randomTransactions.map((tr, index) => (
            <TransactioElement
              current_price={params.data.current_price}
              key={"currency-detail-transaction-element-" + index}
              {...tr}
            />
          ))}
        </View>
      </ScrollView>
      <View className="border-t overflow-hidden flex-row h-18 flex  px-4 items-center  border-[#0000001e]">
        <View>
          <Text style={{ fontFamily: "Nunito-SemiBold" }} className="text-base">
            {params.data.name}
          </Text>
          <View className="flex-row flex">
            <Text className="text-sm">${params.data.price_change_24h}</Text>
            <Text
              style={{ fontFamily: "Nunito-Regular" }}
              className={cn("ml-1", {
                "text-green-500": params.data.price_change_24h > 0,
                "text-red-500": params.data.price_change_24h < 0,
              })}
            >
              {params.data.price_change_percentage_24h.toFixed(2)}%
            </Text>
          </View>
        </View>
        <LineChart
          data={{
            labels: [],
            datasets: [
              {
                strokeWidth: 1,
                data: params.data.sparkline_in_7d.price,
              },
            ],
          }}
          width={150} // from react-native
          height={60}
          // optional, defaults to 1
          chartConfig={{
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            color: (opacity = 1) =>
              params.data.price_change_24h > 0 ? "#38a169" : "red",

            labelColor: () => `rgba(0, 0, 0, 0)`, // Hides labels
            propsForDots: {
              r: "0", // Hides dots
            },

            propsForBackgroundLines: {
              strokeWidth: 0, // Hides background lines
            },
          }}
          bezier
          withInnerLines={false}
          withOuterLines={false}
          withShadow={false}
          withDots={false}
          style={{
            transform: "scale(0.8)",
            position: "relative",
            paddingBottom: 0,
            marginBottom: 0,
            paddingRight: 0, // Removes right padding
            paddingLeft: 0, // Removes left padding
          }}
        />

        <View className="flex-1 flex-row items-center justify-end h-full">
          <Entypo name="chevron-small-up" size={24} color="#2e2e2e" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CurrencyDetailPage;
