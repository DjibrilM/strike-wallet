import React from "react";
import useSWR from "swr";
import { ActivityIndicator } from "react-native";

import { Pressable } from "./Tailwind";
import { currencies, routes } from "../util/shared/constant";
import { View, Text, Image } from "./Tailwind";
import Visible from "./Common/Visibility";
import { cn } from "../util/cn";
import { CurrencyData } from "../util/shared/types";
import { useNavigation } from "@react-navigation/native";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const CurrencyHomeList = () => {
  const navigation = useNavigation() as any;
  const { data, error, isLoading } = useSWR<CurrencyData[]>(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,tether,binancecoin,cardano,ripple,solana,polkadot,dogecoin,shiba-inu,polygon,uniswap,litecoin,chainlink,bitcoin-cash,stellar&order=market_cap_desc&per_page=16&page=1&sparkline=true",
    fetcher
  );

  return (
    <View className="">
      <Visible condition={!isLoading && !error}>
        <View className="h-[80px] px-6 flex justify-center">
          <Text
            style={{ fontFamily: "Nunito-Bold" }}
            className="text-[20px] text-slate-600"
          >
            Tokens
          </Text>
        </View>
      </Visible>

      <Visible condition={isLoading}>
        <View className="mt-6">
          <ActivityIndicator style={{ marginTop: 100 }} color={"#1354fe"} />
        </View>
      </Visible>

      {currencies?.map((dta, index) => (
        <Pressable
          key={"home-currency-element-" + index}
          onPress={() =>
            navigation.navigate(routes.currencyDetailPage as never, {
              name: routes.currencyDetailPage,
              data: {
                ...dta,
              },
            })
          }
          android_ripple={{ color: "#0000003f" }}
          id={dta.id}
          className="flex mb-5 py-2 px-6 flex-row gap-2"
        >
          <Image
            source={{
              cache:'force-cache',
              width: 40,
              height: 40,
              uri: dta.image,
            }}
          />
          <View>
            <Text
              style={{ fontFamily: "Nunito-Regular" }}
              className="text-[17px]"
            >
              {dta.name}
            </Text>
            <View className="flex-row gap-3">
              <Text
                style={{ fontFamily: "Nunito-Regular" }}
                className="text-[12px] text-slate-600"
              >
                ${dta.current_price}
              </Text>

              <Text
                style={{ fontFamily: "Nunito-Regular" }}
                className={cn("text-[12px] text-slate-600", {
                  "text-green-600": Number(dta.price_change_24h) >= 0,
                  "text-red-600": Number(dta.price_change_24h) < 0,
                })}
              >
                {dta.price_change_percentage_24h} %
              </Text>
            </View>
          </View>

          <View className="flex-1 flex justify-center items-end">
            <Text
              className="text-slate-600"
              style={{ fontFamily: "Nunito-Regular" }}
            >
              0
            </Text>
            <Text
              className="text-slate-600 text-sm"
              style={{ fontFamily: "Nunito-Regular" }}
            >
              $0.00
            </Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
};

export default CurrencyHomeList;
