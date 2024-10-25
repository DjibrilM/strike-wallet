import React, { useEffect, useLayoutEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { LineChart } from "react-native-chart-kit";
import Animated, {
  useScrollViewOffset,
  useAnimatedRef,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Linking } from "react-native";

import { StatusBar } from "../components/Common/StatusBar";
import { Image } from "../components/Tailwind";
import getUrl from "../utils/getEtherscanTokenDetailUrl";

import ShareControls from "../components/Common/ShareControls";
import { routes } from "../utils/shared/constant";
import TransactioElement from "../components/Common/TransactionElement";
import useNavigationParam from "../utils/hooks/useNavigationParam";

import {
  SafeAreaView,
  Text,
  Pressable,
  View,
  ScrollView,
} from "../components/Tailwind";
import { MoralisToken } from "../utils/shared/types";
import { cn } from "../utils/cn";
import Visible from "../components/Common/Visibility";
import useDBqueries from "../utils/hooks/useDBqueries";
import { Transaction } from "../data/Entities/transactions/transaction";
import { RefreshControl } from "react-native";

interface Params {
  data: MoralisToken;
}

const CurrencyDetailPage = () => {
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [history, setHistory] = useState<Transaction[]>([]);
  const { getHistoryByContractAddress } = useDBqueries()
  const params = useNavigationParam<Params>();
  const navigation = useNavigation() as any;
  const animatedRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(animatedRef);
  const opacity = useSharedValue(0);

  const openTokenDetails = () => {
    Linking.openURL(getUrl(params.data.contract_address));
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: params.data.token_name,
      headerRight: () => (
        <Pressable onPress={() => openTokenDetails()} className=" bg-blueDefault p-1 rounded-full">
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

  const getHistory = async () => {
    try {
      setLoadingHistory(true);
      const history = await getHistoryByContractAddress(params.data.contract_address) as Transaction[];
      setHistory(history);
      setLoadingHistory(false);
    } catch (error) {
      setLoadingHistory(false);
      console.log(error);
    }
  }

  useEffect(() => {
    getHistory();
  }, [])


  return (
    <SafeAreaView className="flex-1  bg-white">
      <StatusBar />
      <Animated.View
        style={{
          borderBottomWidth: 0.9,
          borderColor: "#1b1b1b12",
          opacity: opacity,
        }}
      ></Animated.View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loadingHistory} onRefresh={getHistory} />
        }
        onScroll={scrollView} ref={animatedRef}>
        <View className="mx-auto mt-10 flex items-center justify-center">
          <View className="w-[60px] relative h-[60px] rounded-full bg-slate-300">
            <Image
              className="rounded-full w-full h-full"
              source={{ uri: params.data.token_logo }}
            />


            <Visible condition={!!params.data.contract_address}>
              <Image className="h-6 w-6 absolute left-[-10px]" source={require('../assets/images/ethereum.png')}></Image>
            </Visible>
          </View>

          <Text
            style={{ fontFamily: "Nunito-Black" }}
            className="text-[25px] text-slate-600 font-bold mt-4"
          >
            {params.data.balance?.toFixed(5)} {params.data.token_symbol}
          </Text>
          <Text
            style={{ fontFamily: "Nunito-Regular" }}
            className="mt-3 text-slate-500"
          >
            ≈${(Number(params.data.price_usd) * Number(params.data.balance)).toFixed(5)}
          </Text>
        </View>

        <View className="mt-10 px-6 pb-5 border-[#00000016] border-b">
          <ShareControls
            onReceive={() => {
               navigation.navigate(routes.tokenReception as never, {
                 name: routes.tokenReception,
                 data: {
                   ...params.data,
                 },
               });
            }}


            onSend={() =>
              navigation.navigate(routes.sendToken as never, {
                name: routes.sendToken,
                data: {
                  ...params.data,
                },
              })
            }
          />
        </View>


        {history.map((tr: any, index) => (
          <TransactioElement
              key={"currency-detail-transaction-element-" + index}
              {...tr}
            />
          ))}


        <Visible condition={!loadingHistory && history.length < 1}>
          <View className="flex justify-center items-center mt-8">
            <Text className="font-semibold text-slate-700">No history yet</Text>
            <Image className="h-32 w-32 mt-4" source={require('../assets/images/planet.png')} />
          </View>
        </Visible>

      </ScrollView>
      <View className="border-t overflow-hidden flex-row h-20 flex  px-4 items-center  border-[#0000001e]">
        <View>
          <Text style={{ fontFamily: "Nunito-SemiBold" }} className="text-base">
            {params.data.token_name}
          </Text>
          <View className="flex-row flex">
            <Text className="text-sm">${params.data.price_24h_percent_change}</Text>
            <Text
              style={{ fontFamily: "Nunito-Regular" }}
              className={cn("ml-1", {
                "text-green-500": Number(params.data.price_24h_percent_change) > 0,
                "text-red-500": Number(params.data.price_24h_percent_change) < 0,
              })}
            >
              {Number(params.data.price_24h_percent_change).toFixed(2)}%
            </Text>
          </View>
        </View>
        <LineChart
          data={{
            labels: [],
            datasets: [
              {
                strokeWidth: 1,
                data: []
              },
            ],
          }}
          width={150} // from react-native
          height={60}
          // optional, defaults to 1
          chartConfig={{
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            color: () =>
            Number(  params.data.price_24h_percent_change) > 0 ? "#38a169" : "red",

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
      </View>
    </SafeAreaView>
  );
};

export default CurrencyDetailPage;
