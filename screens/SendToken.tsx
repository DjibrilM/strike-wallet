import React, { useLayoutEffect, useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRoute, useNavigation } from "@react-navigation/native";
import { SafeAreaView, Text, View } from "../components/Tailwind";
import { StatusBar } from "../components/Common/StatusBar";
import { CurrencyData } from "../utils/shared/types";
import { Pressable } from "../components/Tailwind";
import Button from "../components/Widgets/Button";
import Input from "../components/Widgets/Input";
import { cn } from "../utils/cn";

interface Params {
  data: CurrencyData;
}

const SendToken = () => {
  const route = useRoute();
  const params = route.params as Params;
  const navigation = useNavigation() as any;
  const [address, setAddress] = useState({
    value: "",
    validation: /^0x[a-fA-F0-9]{40}$/g,
    isValid: false,
  });

  const [amount, setAmount] = useState({
    value: "",
    isValid: false,
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "send " + params.data.name,
    });
  }, []);

  const onPasswordChange = (value: string) => {
    const prevValue = { ...address };
    prevValue.isValid = prevValue.validation.test(value);
    prevValue.value = value;
    setAddress(prevValue);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar />
      <View className="px-4 relative mt-10">
        <Text
          style={{ fontFamily: "Nunito-Regular" }}
          className="my-2 text-slate-600"
        >
          Address Or Domain Name
        </Text>
        <Input
          onChangeText={(value) => onPasswordChange(value)}
          value={address.value}
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
              !address.isValid && address.value.length > 0,
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
          onChangeText={(e) => setAmount({ value: e, isValid: Number(e) > 0 })}
          value={amount.value.toString()}
          keyboardType="numeric"
          InputType="number-pad"
          style={{ fontFamily: "Nunito-Regular" }}
          placeholder={params.data.name + " Amount"}
          prefix={<Text className="text-slate-600">{params.data.name}</Text>}
        ></Input>
        <Text className="mt-3 text-slate-600">
          ≈{params.data.current_price * Number(amount.value)}
        </Text>
      </View>

      <View className="flex-1 justify-end pb-10 px-4">
        <Button
          disabled={!amount.isValid || !address.isValid}
          label="Continue"
        />
      </View>
    </SafeAreaView>
  );
};

export default SendToken;
