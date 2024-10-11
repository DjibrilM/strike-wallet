import React, { useMemo } from "react";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useColorScheme } from "nativewind";
import queryKeys from "../utils/queryKeys";

import {
  useQuery,
  useQueryClient
} from '@tanstack/react-query'

import CurrencyHomeList from "../components/TokensList";
import { Image } from "../components/Tailwind";
import ShareControls from "../components/Common/ShareControls";
import { StatusBar } from "../components/Common/StatusBar";
import Button from "../components/Widgets/Button";
import AnimatedScrollView from "../components/Common/AnimatedScrollView";
import { backendBaseuRL } from "../utils/shared/constant";

import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "../components/Tailwind";


import Visible from "../components/Common/Visibility";
import { useNavigation } from "@react-navigation/native";
import { routes } from "../utils/shared/constant";
import { CoinGeckoTokenData, TokenSelectionParams } from "../utils/shared/types";
import { useTokensStore } from "../states/token.state";
import NativeTokenListElement from "../components/NativeTokenElement";
import { useWallet } from "../states/wallet";
import { ActivityIndicator } from "react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";

const fetcher = (url: string) => fetch(url).then(async (res) => {
  return await res.json()
});

const Home = () => {
  const { nativeUsdBalance, showBalance, toggleBalanceVisibility, getThereumTokensTotalBalance, ethereumTokens } = useWallet();
  const queryClient = useQueryClient()
  const { isLoading, data: ethereumNativeToken, isRefetching, error, refetch } = useQuery<CoinGeckoTokenData>({ queryKey: [queryKeys.tokens], queryFn: () => fetcher(`${backendBaseuRL}tokens/get-native-token`) });
  const { tokens } = useTokensStore()
  const navigation = useNavigation() as any;
  const { colorScheme } = useColorScheme();

  const onRefresh = () => {
    refetch();
    queryClient.invalidateQueries({ queryKey: [queryKeys.tokens, queryKeys.erc20Refresher] });
  }

  const balance = useMemo(() => {
    return (getThereumTokensTotalBalance() + (nativeUsdBalance || 0)).toLocaleString();
  }, [ethereumTokens]);



  return (
    <SafeAreaView className="flex-1 relative duration-500">
      <StatusBar />
      <AnimatedScrollView
        refreshing={isRefetching}
        onRefresh={() => onRefresh()}
        searchBar
        searchBardPrefix={
          <View className="flex flex-row gap-3">
            <TouchableOpacity className="bg-slate-600 dark:bg-[#1f1f1f] p-2 rounded-lg">
              <AntDesign
                name="scan1"
                size={18}
                color={colorScheme ? "#ffff" : "#64748b"}
              />
            </TouchableOpacity>

            <TouchableOpacity className="bg-slate-600 dark:bg-[#1f1f1f] p-2 rounded-lg">
              <Feather
                name="copy"
                size={18}
                color={colorScheme ? "#ffff" : "#64748b"}
              />
            </TouchableOpacity>
          </View>
        }
      >
        <View className="flex mt-5 px-7 flex-row items-center justify-between">
          <Visible condition={(showBalance!) && !error && !isLoading}>
          <TouchableOpacity
            onPress={() => toggleBalanceVisibility()}
              className="flex relative h-12 left-2  flex-row gap-2 items-center"
            >
              <View className="flex flex-row items-center">
                <Text className="text-[25px] text-slate-500 dark:text-white">
                  $
                </Text>
                <Text
                  style={{ fontFamily: "Nunito-ExtraBold" }}
                  className="text-[30px] text-slate-500 dark:text-white"
                >
                  {Number(balance) <= 0 ? nativeUsdBalance : balance}
                </Text>
              </View>

              <Feather
                name={showBalance ? "eye-off" : "eye"}
                size={20}
                color={"#64748b"}
              />
            </TouchableOpacity>
          </Visible>

          <Visible condition={!showBalance}>
            <TouchableOpacity onPress={() => toggleBalanceVisibility()}>

              <View className=" text-slate-700 justify-center items-center h-12  flex flex-row gap-2">
                {Array.from({ length: 7 }).map((_, index) => (
                  <View
                    key={"hide-dots-" + index}
                    className="h-2 w-2 bg-black/60 rounded-full"
                  />
                ))}
              </View>

            </TouchableOpacity>
          </Visible>

          <Visible condition={!!error}>
            <View className="">
              <Text className="text-slate-600">Failed to load the balance</Text>

              <TouchableOpacity onPress={() => refetch()} className="mt-5 relative top-2 flex-row gap-1 items-center">
                <Text className="text-blue-600">Retry</Text>
                <EvilIcons name="refresh" size={20} color="#334155" />
              </TouchableOpacity>
            </View>
          </Visible>

          <Visible condition={isLoading}>
            <View className="">
              <ActivityIndicator />
            </View>
          </Visible>

          <View className="flex flex-row gap-3">
            <TouchableOpacity className="bg-slate-600 p-2 dark:bg-[#1f1f1f] rounded-lg">
              <AntDesign
                name="scan1"
                size={18}
                color={colorScheme ? "#ffff" : "#64748b"}
              />
            </TouchableOpacity>

            <TouchableOpacity className="bg-slate-600 dark:bg-[#1f1f1f] p-2 rounded-lg">
              <Feather
                name="copy"
                size={18}
                color={colorScheme ? "#ffff" : "#64748b"}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View className="mt-10 px-5">
          <ShareControls
            onReceive={() => {
              navigation.navigate(
                routes.tokenSelection as keyof typeof routes,
                {
                  title: "Receive",
                  tokenSelectionScreenAction: "Receive",
                } as TokenSelectionParams
              );
            }}
            onSend={() =>
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
        <NativeTokenListElement loading={isLoading} dta={ethereumNativeToken!} />

        <Visible
          fallBack={
            <View className="flex items-center flex-col justify-center">
              <Image className="w-24 h-24" source={require('../assets/images/planet.png')}></Image>
              <Text style={{ fontFamily: "Nunito-Regular" }} className="mt-3 text-slate-700">No Ethereum token yet</Text>

              <Button onPress={() => {
                navigation.navigate(
                  routes.tokenSelection as keyof typeof routes,
                  {
                    title: "Add token",
                    tokenSelectionScreenAction: "Create",
                  } as TokenSelectionParams
                );
              }}
                className="min-h-[40px] py-0 flex-row items-center justify-center px-4 mt-4 bg-blueLight rounded-lg">
                <View className="flex-row">
                  <Text className="text-white">Add token</Text>
                  <AntDesign style={{ marginLeft: 5 }} name="plus" color='white' size={15} />
                </View>
              </Button>
            </View>
          } condition={tokens.length > 0 || isLoading}>
          <CurrencyHomeList enableFetch showBalance={showBalance} isLoading={isLoading || isRefetching} tokens={tokens} />
        </Visible>

      </AnimatedScrollView>
    </SafeAreaView>
  );
};

export default Home;
