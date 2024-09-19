import React, { useEffect, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useColorScheme } from "nativewind";
import { getBalance } from "../utils/web3/ethers";
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

const fetcher = (url: string) => fetch(url).then(async (res) => {
  return await res.json()
});

const Home = () => {
  const { nativeUsdBalance, showBalance, toggleBalanceVisibility } = useWallet();
  const queryClient = useQueryClient()
  const { isLoading, data: ethereumNativeToken, isRefetching } = useQuery<CoinGeckoTokenData>({ queryKey: [queryKeys.tokens], queryFn: () => fetcher(`${backendBaseuRL}tokens/get-native-token`) })
  const { tokens } = useTokensStore()
  const navigation = useNavigation() as any;
  const { colorScheme } = useColorScheme();

  const onRefresh = () => {
    queryClient.invalidateQueries({ queryKey: [queryKeys.tokens] });
  }


  useEffect(() => {
    const balance = getBalance({
      contractAddress: "0x0CE7f7E03fAA4E9b7905a15F42c1DFAe3FC8DB23",
      usersAddress: "0xcD0C94A89ee80B69365c955d6A2441B35D5c76bD",
    });
  }, [])

  return (
    <SafeAreaView className="flex-1 relative bg-white dark:bg-[#0a0a0a] duration-500">
      <StatusBar />
      <AnimatedScrollView
        refreshing={isRefetching}
        onRefresh={onRefresh}
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
          <TouchableOpacity
            onPress={() => toggleBalanceVisibility()}
            className="flex relative left-2  flex-row gap-2 items-center"
          >
            <Visible condition={showBalance || true}>
              <View className="flex flex-row items-center">
                <Text className="text-[25px] text-slate-500 dark:text-white">
                  $
                </Text>
                <Text
                  style={{ fontFamily: "Nunito-ExtraBold" }}
                  className="text-[30px] text-slate-500 dark:text-white"
                >
                  {nativeUsdBalance}
                </Text>
              </View>
            </Visible>

            <Visible condition={!showBalance}>
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
              name={showBalance ? "eye-off" : "eye"}
              size={20}
              color={colorScheme ? "#ffff" : "#64748b"}
              style={{ position: "relative", bottom: 5 }}
            />
          </TouchableOpacity>

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
        <NativeTokenListElement loading={isLoading || isRefetching} dta={ethereumNativeToken!} />

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
          } condition={tokens.length > 0 || isRefetching || isLoading}>
          <CurrencyHomeList isLoading={isLoading || isRefetching} tokens={tokens} />
        </Visible>

      </AnimatedScrollView>
    </SafeAreaView>
  );
};

export default Home;
