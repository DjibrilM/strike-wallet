import React from "react";
import useSWR from "swr";
import { ActivityIndicator } from "react-native";

import { Pressable } from "./Tailwind";
import { currencies, routes } from "../utils/shared/constant";
import { View, Text, Image } from "./Tailwind";
import Visible from "./Common/Visibility";
import { cn } from "../utils/cn";
import { TokenData } from "../utils/shared/types";
import { useNavigation } from "@react-navigation/native";
import { TokenSelectionScreenAction } from "../utils/shared/types";
import TokenListElement from "./TokenListElement";

interface Props {
  tokenClickAction?: TokenSelectionScreenAction;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const TokensList: React.FC<Props> = ({ tokenClickAction }) => {
  const { data, error, isLoading } = useSWR<TokenData[]>(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,tether,binancecoin,cardano,ripple,solana,polkadot,dogecoin,shiba-inu,polygon,uniswap,litecoin,chainlink,bitcoin-cash,stellar&order=market_cap_desc&per_page=16&page=1&sparkline=true",
    fetcher
  );

  return (
    <View className="">
      <Visible condition={!isLoading && !error}>
        <View className="h-[80px] px-6 flex justify-center">
          <Text
            style={{ fontFamily: "Nunito-Bold" }}
            className="text-[20px] text-slate-600 dark:text-white"
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
        <TokenListElement
          tokenClickAction={tokenClickAction}
          dta={dta}
          key={"token-list-element" + index}
        />
      ))}
    </View>
  );
};

export default TokensList;
