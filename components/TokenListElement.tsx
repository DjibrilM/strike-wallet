import React, { useState, useTransition, memo, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
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

interface Props {
  dta: MoralisToken;
  tokenClickAction?: TokenSelectionScreenAction;
  index?: number;
  selectable?: boolean;
  onSelect?: (token: MoralisToken) => void;
  showBalance: boolean;
}

interface Balance {
  balance: number,
  usdBalance: number,
}

const fetchFn = async () => {
  try {
    const balance = await getBalance({
      contractAddress: "0x0CE7f7E03fAA4E9b7905a15F42c1DFAe3FC8DB23",
      usersAddress: "0xcD0C94A89ee80B69365c955d6A2441B35D5c76bD",
    }) as Promise<Balance>;

    return balance;
  } catch (error) {
    console.log(error);
    return null;
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
  }) => {
    const navigation = useNavigation() as any;
    const [pending, startTransition] = useTransition();
    const [selected, setSelected] = useState<boolean>(false);

    const { data, error, refetch, isLoading } = useQuery({
      queryFn: async () => {
        const data = await fetchFn();
        return data;
      }, queryKey: []
    });


    useEffect(() => {
      if (data) {

      }
    }, [data])

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
              } as MoralisToken,
            });

            break;

          case "Receive":
            navigation.navigate(routes.tokenReception as never, {
              name: routes.sendToken,
              data: {
                ...dta,
              } as MoralisToken,
            });

            break;

          default:
            navigation.navigate(routes.currencyDetailPage as never, {
              name: routes.currencyDetailPage,
              data: {
                ...dta,
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


          <View className="flex-row gap-3">
            <Text
              style={{ fontFamily: "Nunito-Regular" }}
              className="text-[12px] text-slate-600 dark:text-white"
            >
              ${dta.price_usd}
            </Text>

            <Text
              style={{ fontFamily: "Nunito-Regular" }}
              className={cn("text-[12px] text-slate-600", {
                "text-green-600 dark:text-green-500":
                  Number(dta.price_24h_percent_change) >= 0,
                "text-red-600 dark:text-red-500":
                  Number(dta.price_24h_percent_change) < 0,
              })}
            >
              {dta.price_24h_percent_change} %
            </Text>
          </View>
        </View>


        <Visible condition={showBalance && !isLoading && !!data}>
          <View className="flex-1 flex justify-center items-end">
            <Text
              className="text-slate-600 dark:text-white"
              style={{ fontFamily: "Nunito-Regular" }}
            >
              {data?.balance.toFixed()}
            </Text>
            <Text
              className="text-slate-600 dark:text-white text-sm"
              style={{ fontFamily: "Nunito-Regular" }}
            >
              ${data?.usdBalance.toFixed(3)}
            </Text>
          </View>
        </Visible>

        <Visible condition={isLoading}>
          <View className="absolute right-4">
            <ActivityIndicator />
          </View>
        </Visible>
      </Pressable>
    );
  }
);

export default TokenListElement;
