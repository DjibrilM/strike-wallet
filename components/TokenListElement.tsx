import React from "react";
import { useNavigation } from "@react-navigation/native";
import { SharedTransition } from "react-native-reanimated";
import Animated,{withSpring} from "react-native-reanimated";

import { Image } from "react-native";
import { Pressable, View, Text } from "./Tailwind";
import { routes } from "../util/shared/constant";
import { TokenData } from "../util/shared/types";
import { TokenSelectionScreenAction } from "../util/shared/types";
import { cn } from "../util/cn";

interface Props {
  dta: TokenData;
  tokenClickAction?: TokenSelectionScreenAction;
}

const TokenListElement: React.FC<Props> = ({ dta, tokenClickAction }) => {
  const navigation = useNavigation() as any;

  const onTokenPress = () => {
    switch (tokenClickAction) {
      case "Send":
        navigation.navigate(routes.sendToken as never, {
          name: routes.sendToken,
          data: {
            ...dta,
          },
        });

        break;

      case "Receive":
        navigation.navigate(routes.tokenReception as never, {
          name: routes.sendToken,
          data: {
            ...dta,
          },
        });

        break;

      default:
        navigation.navigate(routes.currencyDetailPage as never, {
          name: routes.currencyDetailPage,
          data: {
            ...dta,
          },
        });
        break;
    }
  };

  return (
    <Pressable
      onPress={onTokenPress}
      android_ripple={{ color: "#0000003f" }}
      id={dta.id}
      className="flex mb-5 py-2 px-6 flex-row gap-2"
    >
      <Animated.Image
        source={{
          cache: "force-cache",
          width: 40,
          height: 40,
          uri: dta.image,
        }}
      />
      <View>
        <Text style={{ fontFamily: "Nunito-Regular" }} className="text-[17px] mb-1 dark:text-white">
          {dta.name}
        </Text>
        <View className="flex-row gap-3">
          <Text
            style={{ fontFamily: "Nunito-Regular" }}
            className="text-[12px] text-slate-600 dark:text-white"
          >
            ${dta.current_price}
          </Text>

          <Text
            style={{ fontFamily: "Nunito-Regular" }}
            className={cn("text-[12px] text-slate-600", {
              "text-green-600 dark:text-green-500": Number(dta.price_change_24h) >= 0,
              "text-red-600 dark:text-red-500": Number(dta.price_change_24h) < 0,
            })}
          >
            {dta.price_change_percentage_24h} %
          </Text>
        </View>
      </View>

      <View className="flex-1 flex justify-center items-end">
        <Text
          className="text-slate-600 dark:text-white"
          style={{ fontFamily: "Nunito-Regular" }}
        >
          0
        </Text>
        <Text
          className="text-slate-600 dark:text-white text-sm"
          style={{ fontFamily: "Nunito-Regular" }}
        >
          $0.00
        </Text>
      </View>
    </Pressable>
  );
};

export default TokenListElement;
