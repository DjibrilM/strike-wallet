import React, { memo } from "react";
import { ActivityIndicator } from "react-native";
import { Skeleton } from "moti/skeleton";

import { View, Text } from "./Tailwind";
import Visible from "./Common/Visibility";

import {
  MoralisToken,
  TokenSelectionScreenAction,
} from "../utils/shared/types";
import TokenListElement from "./TokenListElement";

interface Props {
  tokenClickAction?: TokenSelectionScreenAction;
  isLoading?: boolean;
  error?: boolean;
  tokens: MoralisToken[];
  title?: string;
  skeletonCounts?: number
  selectable?: boolean
  onSelect?: (token: MoralisToken) => void,
  showBalance?: boolean
}

const TokensList: React.FC<Props> = memo(({
  tokenClickAction,
  isLoading = false,
  error,
  tokens,
  title,
  selectable = false,
  skeletonCounts = 3,
  onSelect,
  showBalance=true
}) => {

  return (
    <Skeleton.Group show={isLoading}>
      <Visible condition={isLoading}>
        {new Array(skeletonCounts).fill('').map((_, index) => (
          <View key={'skeleton-element-' + index} className="flex mb-4 flex-row space-x-2 px-6">
            <Skeleton colorMode="light" />

            <View className="w-9/12">
              <Skeleton colorMode="light" width={"100%"} />
            </View>

            <View className="">
              <Skeleton colorMode="light" />
            </View>
          </View>
        ))}
      </Visible>

      <Visible condition={!isLoading && tokens.length > 0}>
        <View>
          <Visible condition={!isLoading && !error}>
            <View className="h-[80px] px-6 flex justify-center">
              <Text
                style={{ fontFamily: "Nunito-Bold" }}
                className="text-base text-slate-600 dark:text-white"
              >
                {title || "Ethereum Tokens"}
              </Text>
            </View>
          </Visible>

          {tokens && typeof tokens === 'object' &&  tokens.map((dta, index) => {
            return (
              <TokenListElement
                enableFetch
                showBalance={showBalance}
                onSelect={onSelect}
                index={index}
                selectable={selectable}
                tokenClickAction={tokenClickAction}
                dta={dta}
                key={"token-list-element" + index}
              />
            )
          })}
        </View>
      </Visible>
    </Skeleton.Group>
  )
}
)
export default TokensList;
