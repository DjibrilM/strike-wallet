import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Octicons from "@expo/vector-icons/Octicons";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import CurrencyHomeList from "../components/CurrencyHomeList";
import Animated, {
  useScrollViewOffset,
  useAnimatedRef,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
} from "../components/Tailwind";
import Visible from "../components/common/Visibility";

const Home = () => {
  const [hideBalance, setHideBalance] = useState(false);
  const animatedRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(animatedRef);
  const top = useSharedValue(-100);

  const scrollView = () => {
    if (scrollOffset.value > 227) {
      top.value = withTiming(0);
    } else {
      top.value = withTiming(-100);
    }
  };

  return (
    <SafeAreaView className="flex-1 relative bg-white">
      <StatusBar barStyle={"default"} />

      <Animated.View
        style={{
          paddingHorizontal:10,
          backgroundColor:'white',
          borderBottomWidth: 0.5,
          borderColor:'#0000001a',
          width: "100%",
          position: "absolute",
          justifyContent: 'center',
          alignItems:'center',
          top: top,
          zIndex: 30,
          display: "flex",
          flexDirection: "row",
          gap: 20,
        }}
      >
        <View className="py-4 flex-1  bg-white z-50">
          <Pressable
            onPress={() => {}}
            android_ripple={{ color: "#ffffff33" }}
            className="h-14 px-4 bg-slate-100   flex-row flex w-full items-center rounded-lg"
          >
            <EvilIcons name="search" size={24} color="#64748b" />
            <Text
              style={{ fontFamily: "Nunito-Regular" }}
              className="text-slate-500 ml-2"
            >
              Search
            </Text>
          </Pressable>
        </View>

        <TouchableOpacity className="bg-slate-200 p-2 h-[50px] w-[50px] justify-center items-center rounded-lg">
          <Feather name="copy" size={18} color="#64748b" />
        </TouchableOpacity>
      </Animated.View>

      <Animated.ScrollView
        onScroll={scrollView}
        ref={animatedRef}
        style={{ paddingHorizontal: 16 }}
      >
        <Pressable
          onPress={() => {}}
          android_ripple={{ color: "#ffffff33" }}
          className="h-14 bg-slate-100 flex-row flex px-4 items-center my-8 rounded-lg"
        >
          <EvilIcons name="search" size={24} color="#64748b" />
          <Text
            style={{ fontFamily: "Nunito-Regular" }}
            className="text-slate-500 ml-2"
          >
            Search
          </Text>
        </Pressable>

        <View className="flex flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => setHideBalance(!hideBalance)}
            className="flex relative left-2 flex-row gap-2 items-center"
          >
            <Visible condition={!hideBalance}>
              <View className="flex flex-row items-center">
                <Text className="text-[17px] text-slate-600">$</Text>
                <Text
                  style={{ fontFamily: "Nunito-ExtraBold" }}
                  className="text-[30px] text-slate-500"
                >
                  {10000.0}
                </Text>
              </View>
            </Visible>

            <Visible condition={hideBalance}>
              <View className=" text-slate-700 flex flex-row gap-2">
                {Array.from({ length: 7 }).map(() => (
                  <View className="h-3 w-3 bg-black/60 rounded-full" />
                ))}
              </View>
            </Visible>
            <Feather
              name={hideBalance ? "eye-off" : "eye"}
              size={20}
              color="#64748b"
              style={{ position: "relative", bottom: 5 }}
            />
          </TouchableOpacity>

          <TouchableOpacity className="bg-slate-200 p-2 rounded-lg">
            <Feather name="copy" size={18} color="#64748b" />
          </TouchableOpacity>
        </View>

        <View className="flex-row mx-auto gap-2 relative justify-between   items-center w-full mt-5">
          <View className="flex  flex-col flex-1 rounded-[20px] justify-center items-center min-h-[90px] bg-blueDefault ">
            <View className="bg-white p-1 rounded-full">
              <AntDesign name="arrowup" size={20} color="#475569" />
            </View>
            <Text className="text-white" style={{ fontFamily: "Nunito-Bold" }}>
              Send
            </Text>
          </View>

          <View className="flex  flex-col flex-1 rounded-[20px] justify-center items-center min-h-[90px] bg-[#3b83f62b] ">
            <View className="bg-blueDefault p-1 rounded-full">
              <AntDesign name="arrowdown" size={20} color="white" />
            </View>
            <Text
              className="text-blueDefault"
              style={{ fontFamily: "Nunito-Bold" }}
            >
              Receive
            </Text>
          </View>

          <View className="flex  flex-col flex-1 rounded-[20px] justify-center items-center min-h-[90px] bg-[#3b83f62b] ">
            <View className="bg-blueDefault p-1  rounded-full">
              <AntDesign name="plus" size={20} color="white" />
            </View>
            <Text
              className="text-blueDefault"
              style={{ fontFamily: "Nunito-Bold" }}
            >
              Buy
            </Text>
          </View>

          <View className="flex  flex-col flex-1 rounded-[20px] justify-center items-center min-h-[90px] bg-[#3b83f62b]">
            <View className="bg-blueDefault w-[30px]  justify-center items-center h-[30px] p-1 rounded-full">
              <FontAwesome name="exchange" size={15} color="white" />
            </View>
            <Text
              className="text-blueDefault"
              style={{ fontFamily: "Nunito-Bold" }}
            >
              History
            </Text>
          </View>
        </View>

        <CurrencyHomeList />
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default Home;
