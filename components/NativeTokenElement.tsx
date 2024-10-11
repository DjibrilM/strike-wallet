import React, { useEffect, useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import { Skeleton } from 'moti/skeleton';
import { backendBaseuRL } from "../utils/shared/constant";
import queryKeys from "../utils/queryKeys";
import {
    useQuery,
} from '@tanstack/react-query'


import { Pressable, View, Text } from "./Tailwind";
import Visible from "./Common/Visibility";
import { routes } from "../utils/shared/constant";
import { Image } from "./Tailwind";
import { CoinGeckoTokenData, MoralisToken } from "../utils/shared/types";
import { TokenSelectionScreenAction } from "../utils/shared/types";
import { cn } from "../utils/cn";
import { useWallet } from "../states/wallet";
import { ActivityIndicator } from "react-native";


interface Props {
    dta: CoinGeckoTokenData | undefined | null;
    tokenClickAction?: TokenSelectionScreenAction;
    index?: number,
    loading?: boolean
}

const fetcher = (url: string) => fetch(url).then(async (res) => {
    if (!res.ok) {
        throw Error('');
    }
    return await res.json()
});

const NativeTokenListElement: React.FC<Props> = ({ dta, index, tokenClickAction, loading = false }) => {
    const navigation = useNavigation() as any;
    const { updateNativeBalances, showBalance, address } = useWallet();

    const { isLoading, data: amount, isFetching, } = useQuery<number>({
        initialData: 0,
        queryKey: [queryKeys.nativeBalance], queryFn: () => fetcher(`${backendBaseuRL}tokens/get-native-balance/${address}`)
    });


    useEffect(() => {
        if (!amount) return;

        if (amount && dta?.current_price) {
            const nativeUsdBalance = ((amount / 10 ** 18) * dta.current_price).toFixed(4);
            const nativeEthBalance = (amount / 10 ** 18).toFixed(4);
            updateNativeBalances({ eth: Number(nativeEthBalance), usd: Number(nativeUsdBalance) })
        }
    }, [amount]);


    const onTokenPress = () => {
        const balance = amount && (amount / 10 ** 18);
        switch (tokenClickAction) {
            case "Send":

                navigation.navigate(routes.sendToken as never, {
                    name: routes.sendToken,
                    data: {
                        balance: balance,
                        token_name: dta?.name,
                        token_symbol: dta?.symbol,
                        token_logo: dta?.image,
                        token_decimals: '',
                        contract_address: '',
                        price_usd: dta?.current_price || '',
                        price_24h_percent_change: (dta?.price_change_24h || ''),
                        price_7d_percent_change: (''),
                        market_cap_usd: dta?.market_cap || ''
                    } as MoralisToken,
                });

                break;

            case "Receive":
                navigation.navigate(routes.tokenReception as never, {
                    name: routes.sendToken,
                    data: {
                        balance: balance,
                        token_name: dta?.name,
                        token_symbol: dta?.symbol,
                        token_logo: dta?.image,
                        token_decimals: '',
                        contract_address: '',
                        price_usd: dta?.current_price || '',
                        price_24h_percent_change: (dta?.price_change_24h || ''),
                        price_7d_percent_change: (''),
                        market_cap_usd: dta?.market_cap || ''
                    } as MoralisToken,
                });

                break;

            default:
                navigation.navigate(routes.currencyDetailPage as never, {
                    name: routes.currencyDetailPage,
                    data: {
                        balance: balance,
                        token_name: dta?.name,
                        token_symbol: dta?.symbol,
                        token_logo: dta?.image,
                        token_decimals: '',
                        contract_address: '',
                        price_usd: dta?.current_price || '',
                        price_24h_percent_change: (dta?.price_change_24h || ''),
                        price_7d_percent_change: (''),
                        market_cap_usd: dta?.market_cap || ''
                    } as MoralisToken,
                });
                break;
        }
    };


    const extractedBalance = useMemo(() => {
        console.log({ amount }, 'something somerhing');
        return (amount && dta && ((amount / 10 ** 18) * Number(dta.current_price)).toFixed(4))
    }, [amount])

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
                    <Image className="w-4 h-4" source={require('../assets/images/premium-quality.png')} />

                    <View className="p-1 bg-slate-200 rounded-full">
                        <Image

                            source={{
                                cache: "force-cache",
                                width: 30,
                                height: 30,
                                uri: dta?.image,
                            }}
                        />
                    </View>


                    <View>
                        <Text style={{ fontFamily: "Nunito-Regular" }} className="text-[17px] mb-1 dark:text-white">
                            {dta?.name}
                        </Text>
                        <View className="flex-row gap-2">
                            <Text
                                style={{ fontFamily: "Nunito-Regular" }}
                                className="text-[12px] text-slate-600 dark:text-white"
                            >
                                ${dta?.current_price?.toFixed(4)}
                            </Text>

                            <Text
                                style={{ fontFamily: "Nunito-Regular" }}
                                className={cn("text-[12px] text-slate-600", {
                                    "text-green-600 dark:text-green-500": Number(dta?.price_change_percentage_24h) >= 0,
                                    "text-red-600 dark:text-red-500": Number(dta?.price_change_percentage_24h) < 0,
                                })}
                            >
                                {dta?.price_change_24h?.toFixed(4)} %
                            </Text>
                        </View>
                    </View>


                    <Visible condition={(showBalance!) && !isLoading && !isFetching}>
                        <Visible condition={!isLoading && !!dta}>
                            <View className="flex-1 flex justify-center items-end">
                                <Text
                                    className="text-slate-600 dark:text-white"
                                    style={{ fontFamily: "Nunito-Regular" }}
                                >
                                    {amount && (amount / (10 ** 18)).toFixed(4)} ETH
                                </Text>


                                <Text
                                    className="text-slate-600 dark:text-white text-sm"
                                    style={{ fontFamily: "Nunito-Regular" }}
                                >
                                    {extractedBalance}
                                    {/* {amount && dta?.current_price && ((amount / 10 ** 18) * Number(dta.current_price)).toFixed(4)}$ */}
                                </Text>
                            </View>
                        </Visible>
                    </Visible>

                    <Visible condition={!showBalance}>
                        <View className="items-end flex-row gap-2 relative top-2 flex-grow justify-end">
                            {new Array(4).fill('').map((_, index) => <View key={`native-token-balance-dots-${index}`} className="h-1 w-1 bg-slate-600 rounded-full"></View>)}
                        </View>
                    </Visible>

                    <Visible condition={isLoading && isFetching}>
                        <View className="absolute right-4">
                            <ActivityIndicator />
                        </View>
                    </Visible>
                </Pressable>
            </Visible>
        </Skeleton.Group>


    );
};

export default NativeTokenListElement;
