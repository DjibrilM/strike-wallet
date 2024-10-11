import React, { useState, useTransition, memo, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { ActivityIndicator } from "react-native";
import Checkbox from "expo-checkbox";

import { Image } from "./Tailwind";
import { Pressable, View, Text } from "./Tailwind";
import { routes } from "../utils/shared/constant";
import { MoralisToken } from "../utils/shared/types";
import { useQuery } from "@tanstack/react-query";
import { getBalance } from "../utils/web3/ethers";
import { TokenSelectionScreenAction } from "../utils/shared/types";
import { cn } from "../utils/cn";
import Visible from "./Common/Visibility";
import { EthereumToken } from "../utils/shared/types";
import { useWallet } from "../states/wallet";


interface Props {
  dta: MoralisToken;
  tokenClickAction?: TokenSelectionScreenAction;
  index?: number;
  selectable?: boolean;
  onSelect?: (token: MoralisToken) => void;
  showBalance: boolean;
  enableFetch?: boolean
}


const fetchFn = async ({ userAddress }: { userAddress: string }) => {
  try {
    const balance = await getBalance({
      contractAddress: "0x0CE7f7E03fAA4E9b7905a15F42c1DFAe3FC8DB23",
      usersAddress: userAddress,
    }) as Promise<EthereumToken>;

    return balance;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

const TokenListElement: React.FC<Props> = memo(
  ({
    dta,
    index,
    tokenClickAction = false,
    selectable = false,
    onSelect,
    showBalance,
    enableFetch
  }) => {
    const { appendToEthereumToken, address } = useWallet()
    const navigation = useNavigation() as any;
    const [pending, startTransition] = useTransition();
    const [selected, setSelected] = useState<boolean>(false);


    const { data: token, error, refetch, isLoading, isRefetching } = useQuery({
      enabled: enableFetch,
      queryFn: async () => {
        const token = await fetchFn({ userAddress: address });
        return token;
      }, queryKey: [dta.contract_address]
    });

    useEffect(() => {
      if (token) {
        appendToEthereumToken(token)
      }

    }, [token])

    const onTokenPress = () => {
      if (selectable) {
        setSelected(!selected);

        startTransition(() => {
          onSelect?.(dta);
        });

      } else {
        switch (tokenClickAction) {
          case "Send":
            navigation.navigate(routes.sendToken as never, {
              name: routes.sendToken,
              data: {
                ...dta,
                balance: token?.balance,
                price_usd: token?.usdPrice || dta.price_usd,
                price_24h_percent_change: token?.["24hrPercentChange"],
              } as MoralisToken,
            });

            break;

          case "Receive":
            navigation.navigate(routes.tokenReception as never, {
              name: routes.sendToken,
              data: {
                ...dta,
                balance: token?.balance,
                price_usd: token?.usdPrice || dta.price_usd,
                price_24h_percent_change: token?.["24hrPercentChange"],
              } as MoralisToken,
            });

            break;

          default:
            navigation.navigate(routes.currencyDetailPage as never, {
              name: routes.currencyDetailPage,
              data: {
                ...dta,
                balance: token?.balance,
                price_usd: token?.usdPrice || dta.price_usd,
                price_24h_percent_change: token?.["24hrPercentChange"],
              } as MoralisToken,
            });
            break;
        }
      }
    };



    return (
      <Pressable
        onPress={onTokenPress}
        android_ripple={{ color: "#0000003f" }}
        id={index + "-toke-element"}
        className="flex border-b border-black/5 mb-5 py-2 px-6 flex-row gap-2"
      >
        <Visible condition={pending}>
          <Text>...loading</Text>
        </Visible>
        <Visible condition={(!!index || index === 0) && !selectable}>
          <View className="items-center flex-row">
            <Text className="text-slate-600">
              {index === 0 ? "#" : index! + 1}
            </Text>
          </View>
        </Visible>

        <Visible condition={selectable}>
          <View className="items-center mr-2 flex-row">
            <Checkbox
              onValueChange={onTokenPress}
              value={selected}
              color={"#5a8dfe"}
              style={{ width: 15, height: 15, borderWidth: 1, zIndex: 10 }}
            />
          </View>
        </Visible>

        <Image
          source={{
            cache: "force-cache",
            width: 40,
            height: 40,
            uri: dta.token_logo,
          }}
        />

        <View>
          <Text
            style={{ fontFamily: "Nunito-Regular" }}
            className="text-[17px] mb-1 dark:text-white"
          >
            {dta?.token_name?.length < 15
              ? dta?.token_name
              : dta.token_name?.split("").splice(0, 10).join("") + "..."}
          </Text>

          <Visible condition={Boolean(token)}>
            <View className="flex-row gap-3">
              <Text
                style={{ fontFamily: "Nunito-Regular" }}
                className="text-[12px] text-slate-600 dark:text-white"
              >
                ${token?.usdPrice.toFixed(4)}
              </Text>

              <Text
                style={{ fontFamily: "Nunito-Regular" }}
                className={cn("text-[12px] text-slate-600", {
                  'text-red-500': Number(token?.["24hrPercentChange"]),
                  'text-green-500': Number(token?.["24hrPercentChange"]) > 0
                })}
              >
                {Number(token?.["24hrPercentChange"]).toFixed(4)} %
              </Text>
            </View>
          </Visible>
        </View>

        <Visible condition={showBalance && !isLoading && !!token && !isRefetching}>
          <View className="flex-1 flex justify-center items-end">

            <View className="flex items-center flex-row gap-2">
              <Text className="text-[10px] ml-1 text-slate-600">{token?.tokenSymbol}</Text>
              <Text
                className="text-slate-600 dark:text-white"
                style={{ fontFamily: "Nunito-Regular" }}
              >
                {token?.balance.toFixed()}
              </Text>
            </View>


            <Text
              className="text-slate-600 mt-2 dark:text-white text-sm"
              style={{ fontFamily: "Nunito-Regular" }}
            >
              ${token?.usdBalance.toFixed(3)}
            </Text>
          </View>
        </Visible>


        <Visible condition={enableFetch || false}>
          <Visible condition={isLoading || isRefetching}>
            <View className="absolute right-4 top-2">
              <ActivityIndicator />
            </View>
          </Visible>

          <Visible condition={!showBalance && !isLoading && !isRefetching}>
            <View className="absolute h-full items-center flex flex-row gap-2 right-4">
              {Array(5).fill('').map((_, index) => <View key={'ethereum-token-hide-balance-dot-' + index} className="h-1 w-1 bg-slate-600 rounded-full"></View>)}
            </View>
          </Visible>


          <Visible condition={!!error}>
            <Pressable onPress={() => refetch()} className="absolute h-full items-center flex flex-col justify-center gap-2 right-4">
              <EvilIcons name="refresh" size={24} color="#334155" />
              <Text className="text-sm text-slate-700">Refresh</Text>
            </Pressable>
          </Visible>
        </Visible>
      </Pressable>
    );
  }
);

export default TokenListElement;
