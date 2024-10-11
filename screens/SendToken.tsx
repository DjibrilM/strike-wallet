import React, { useLayoutEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRoute, useNavigation } from "@react-navigation/native";

import {
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  View,
} from "../components/Tailwind";
import { StatusBar } from "../components/Common/StatusBar";
import { MoralisToken } from "../utils/shared/types";
import { Pressable } from "../components/Tailwind";
import { backendBaseuRL } from "../utils/shared/constant";
import Button from "../components/Widgets/Button";
import Input from "../components/Widgets/Input";
import { getGasPriceEstimation } from "../utils/services/backendHttp";
import { cn } from "../utils/cn";
import { CoinGeckoTokenData } from "../utils/shared/types";
import TransactionConfirmationModal from "../components/Common/TransactionConfirmationModal";
import { getErcTransferGasPriceEstimation } from "../utils/services/backendHttp";
import Visible from "../components/Common/Visibility";
import { isAddress } from "ethers";
import { Platform } from "react-native";

interface Params {
  data: MoralisToken;
}

const fetcher = (url: string) =>
  fetch(url).then(async (res) => {
    return await res.json();
  });

const SendToken = () => {
  const route = useRoute();
  const params = route.params as Params;
  const navigation = useNavigation() as any;
  const [estimatedGasFees, setEstimatedGasFees] = useState<number>(0);
  const [loadingGas, setLoadingGas] = useState(false);
  const [showTransactionDetailModal, setShowTransactionDetailModal] =
    useState(false);

  const {
    isLoading,
    data: ethereumNativeToken,
    isRefetching,
  } = useQuery<CoinGeckoTokenData>({
    queryKey: [],
    queryFn: () => fetcher(`${backendBaseuRL}tokens/get-native-token`),
  });

  const [RecipientAddress, setAddress] = useState({
    value: "",
    isValid: false,
  });

  const [amount, setAmount] = useState({
    value: "",
    isValid: true,
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "send " + params.data.token_name,
    });
  }, []);

  const onAddressChanges = (value: string) => {
    const prevValue = { ...RecipientAddress };
    prevValue.isValid = isAddress(value);
    prevValue.value = value;
    setAddress(prevValue);
  };

  const getTransactionGasFees = async () => {
    setLoadingGas(true);

    try {

      if (params.data.contract_address) {
        const response = await getErcTransferGasPriceEstimation({
          contractAddress: "0x0CE7f7E03fAA4E9b7905a15F42c1DFAe3FC8DB23",
          value: amount.value,
          recipient: "0x6B395b38facbfe9896a98a753FC6dB1967E4c067",
        });

        setEstimatedGasFees(response);
        setLoadingGas(false);

        setShowTransactionDetailModal(true);
      } else {
        const response = await getGasPriceEstimation({
          from: "0xcD0C94A89ee80B69365c955d6A2441B35D5c76bD",
          to: "0x6B395b38facbfe9896a98a753FC6dB1967E4c067",
          value: "0.001",
        });

        setEstimatedGasFees(response);
        setLoadingGas(false);

        setShowTransactionDetailModal(true);
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <StatusBar />
      <SafeAreaView className="flex-1 bg-white">
        <View className=" flex-1">
          <View className="px-4 relative">
            <Text
              style={{ fontFamily: "Nunito-Regular" }}
              className="my-2 text-slate-600"
            >
              Address Or Domain Name
            </Text>
            <Input
              onChangeText={(value) => onAddressChanges(value)}
              value={RecipientAddress.value}
              placeholder="Search Or Enter"
              prefix={
                <Pressable className="border-l pl-2 border-gray-200 h-full items-center justify-center">
                  <MaterialCommunityIcons
                    name="line-scan"
                    size={24}
                    color="#535353"
                  />
                </Pressable>
              }
            ></Input>

            <Text
              className={cn("opacity-0 relative top-2 text-right", {
                "text-red-500 opacity-100":
                  !RecipientAddress.isValid && RecipientAddress.value.length > 0,
              })}
            >
              Invalid address
            </Text>
          </View>

          <View className="px-4 mt-4 relative bottom-3">
            <Text
              style={{ fontFamily: "Nunito-Regular" }}
              className="my-2 text-slate-600"
            >
              Amount
            </Text>
            <Input
              onChangeText={(value) => {
                setAmount({
                  value: value,
                  isValid: Number(value) < params.data.balance!,
                });
              }}
              value={amount.value.toString()}
              keyboardType="numeric"
              InputType="number-pad"
              style={{ fontFamily: "Nunito-Regular" }}
              placeholder={params.data.token_name + " Amount"}
              prefix={
                <Text className="text-slate-600">{params.data.token_name}</Text>
              }
            ></Input>

            <View className="flex justify-between flex-row items-center">
              <Text className="mt-3 text-slate-600">
                ≈
                {(Number(params.data.price_usd) * Number(amount.value)).toFixed(
                  4
                )}
                $
              </Text>

              <Visible condition={!amount.isValid}>
                <Text className={"relative top-2 text-right text-red-500"}>
                  insufficient fund
                </Text>
              </Visible>

              <Visible condition={amount.isValid}>
                <Text className={"relative top-2 text-right text-slate-500"}>
                  {amount.value || 0}/{params.data.balance?.toFixed(5)}{" "}
                  {params.data.token_symbol}
                </Text>
              </Visible>
            </View>
          </View>

          <View className="px-4 flex-1 justify-end">
            <Button
              onPress={async () => {
                await getTransactionGasFees();
              }}
              loading={isLoading || loadingGas}
              disabled={
                !amount.isValid ||
                !RecipientAddress.isValid ||
                isLoading ||
                isRefetching ||
                Number(amount.value) <= 0
              }
              label="Continue"
            />
          </View>
        </View>

        <TransactionConfirmationModal
          contractAddress={params.data.contract_address}
          recipient={RecipientAddress.value}
          gasPriceInUsd={
            (ethereumNativeToken?.current_price || 0) * estimatedGasFees
          }
          gasFees={estimatedGasFees || 0}
          amount={amount.value}
          onclose={() => setShowTransactionDetailModal(false)}
          tokenLogoUrl={params.data.token_logo}
          tokenName={params.data.token_name}
          opened={showTransactionDetailModal}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SendToken;
