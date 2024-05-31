import React, { useLayoutEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { shortAddress } from "../util/shortAddress";


import ShareControls from "../components/common/ShareControls";
import { randomTransactions } from "../util/shared/constant";
import TransactioElement from "../components/common/TransactionElement";


import {
  SafeAreaView,
  Text,
  Pressable,
  View,
  Image,
  ScrollView,
} from "../components/Tailwind";
import { CurrencyData } from "../util/shared/types";
import { Transaction } from "bitcoinjs-lib";

interface Params {
  data: CurrencyData;
}

const CurrencyDetailPage = () => {
  const route = useRoute();
  const params = route.params as Params;
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: params.data.name,
      headerRight: () => (
        <Pressable className=" bg-blueDefault p-1 rounded-full">
          <Ionicons name="information" size={20} color="white" />
        </Pressable>
      ),
    });
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="">
        <View className="mx-auto mt-10 flex items-center justify-center">
          <Image source={{ uri: params.data.image, width: 60, height: 60 }} />
          <Text
            style={{ fontFamily: "Nunito-Black" }}
            className="text-[25px] text-slate-600 font-bold mt-4"
          >
            0.04399625
          </Text>
          <Text
            style={{ fontFamily: "Nunito-Regular" }}
            className="mt-3 text-slate-500"
          >
            ≈$255
          </Text>
        </View>

        <View className="mt-10 px-6 pb-5 border-[#00000016] border-b">
          <ShareControls />
        </View>

        <View className="px-4">
          {randomTransactions.map((tr, index) => (
            <TransactioElement
              current_price={params.data.current_price}
              key={"currency-detail-transaction-element-" + index}
              {...tr}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CurrencyDetailPage;
