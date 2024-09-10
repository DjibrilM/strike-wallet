import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Skeleton } from 'moti/skeleton'
import Animated from "react-native-reanimated";

import { Pressable, View, Text } from "./Tailwind";
import Visible from "./Common/Visibility";
import { routes } from "../utils/shared/constant";
import { Image } from "./Tailwind";
import { CoinGeckoTokenData } from "../utils/shared/types";
import { TokenSelectionScreenAction } from "../utils/shared/types";
import { cn } from "../utils/cn";


interface Props {
    dta: CoinGeckoTokenData | undefined | null;
    tokenClickAction?: TokenSelectionScreenAction;
    index?: number,
    loading?: boolean
}

const NativeTokenListElement: React.FC<Props> = ({ dta, index, tokenClickAction, loading = false }) => {
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
        <Skeleton.Group show={loading}>
            <Visible condition={loading}>
                <View className="flex mb-4 border-b pb-4 border-black/5 flex-row space-x-2 px-6">
                    <Skeleton colorMode="light" />

                    <View className="w-9/12">
                        <Skeleton colorMode="light" width={"100%"} />
                    </View>

                    <View className="">
                        <Skeleton colorMode="light" />
                    </View>
                </View>
            </Visible>

            <Visible condition={!!dta && !loading}>
                <Pressable
                    onPress={onTokenPress}
                    android_ripple={{ color: "#0000003f" }}
                    id={index + '-toke-element'}
                    className="flex border-b border-black/5 mb-5 py-2 px-6 items-center flex-row gap-2"
                >
                    <Image className="w-5 h-5" source={require('../assets/images/premium-quality.png')} />

                    <Animated.Image
                        source={{
                            cache: "force-cache",
                            width: 40,
                            height: 40,
                            uri: dta?.image,
                        }}
                    />

                    <View>
                        <Text style={{ fontFamily: "Nunito-Regular" }} className="text-[17px] mb-1 dark:text-white">
                            {dta?.name}
                        </Text>
                        <View className="flex-row gap-3">
                            <Text
                                style={{ fontFamily: "Nunito-Regular" }}
                                className="text-[12px] text-slate-600 dark:text-white"
                            >
                                ${dta?.current_price}
                            </Text>

                            <Text
                                style={{ fontFamily: "Nunito-Regular" }}
                                className={cn("text-[12px] text-slate-600", {
                                    "text-green-600 dark:text-green-500": Number(dta?.price_change_percentage_24h) >= 0,
                                    "text-red-600 dark:text-red-500": Number(dta?.price_change_percentage_24h) < 0,
                                })}
                            >
                                {dta?.price_change_24h} %
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
            </Visible>
        </Skeleton.Group>


    );
};

export default NativeTokenListElement;
