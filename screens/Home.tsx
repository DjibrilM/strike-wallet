import React, { useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";

import CurrencyHomeList from "../components/CurrencyHomeList";
import ShareControls from "../components/Common/ShareControls";
import { StatusBar } from "../components/Common/StatusBar";
import AnimatedScrollView from "../components/Common/AnimatedScrollView";

import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "../components/Tailwind";
import Visible from "../components/Common/Visibility";
import { useNavigation } from "@react-navigation/native";
import { routes } from "../util/shared/constant";
import {
  TokenSelectionParams,
  TokenSelectionScreenActions,
} from "../util/shared/types";

const Home = () => {
  const [hideBalance, setHideBalance] = useState(false);
  const navigation = useNavigation() as any;

  return (
    <SafeAreaView className="flex-1 relative bg-white">
      <StatusBar />
      <AnimatedScrollView
        searchBar
        searchBardPrefix={
          <View className="flex flex-row gap-3">
            <TouchableOpacity className="bg-slate-200 p-2 rounded-lg">
              <AntDesign name="scan1" size={18} color="#64748b" />
            </TouchableOpacity>

            <TouchableOpacity className="bg-slate-200 p-2 rounded-lg">
              <Feather name="copy" size={18} color="#64748b" />
            </TouchableOpacity>
          </View>
        }
      >
        <View className="flex mt-5 px-7 flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => setHideBalance(!hideBalance)}
            className="flex relative left-2 flex-row gap-2 items-center"
          >
            <Visible condition={!hideBalance}>
              <View className="flex flex-row items-center">
                <Text className="text-[30px] text-slate-500">$</Text>
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
                {Array.from({ length: 7 }).map((_, index) => (
                  <View
                    key={"hide-dots-" + index}
                    className="h-2 w-2 bg-black/60 rounded-full"
                  />
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
        </View>

        <View className="mt-10 px-5">
          <ShareControls
            onExchange={() =>
              navigation.navigate(
                routes.tokenSelection as keyof typeof routes,
                {
                  title: "Send",
                  tokenSelectionScreenAction: "Send",
                } as TokenSelectionParams
              )
            }
          />
        </View>

        <View className="mt-4" />
        <CurrencyHomeList />
      </AnimatedScrollView>
    </SafeAreaView>
  );
};

export default Home;
