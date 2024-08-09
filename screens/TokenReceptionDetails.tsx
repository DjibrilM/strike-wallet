import React from "react";
import { Share, Alert } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import QRCode from "react-native-qrcode-svg";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as Clipboard from "expo-clipboard";
import * as Sharing from "expo-sharing";

import useNavigationParam from "../util/hooks/useNavigationParam";
import { SafeAreaView, View, Text, Image } from "../components/Tailwind";
import Button from "../components/Widgets/Button";
import { TokenData } from "../util/shared/types";
import { shortAddress } from "../util/shortAddress";

interface Params {
  data: TokenData;
}

const TokenReceptionDetails = () => {
  const params = useNavigationParam<Params>();

  const onShare = async () => {
    try {
      Share.share({
        message: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      });
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <View className="items-center flex-col justify-center mb-3 gap-2">
        <View className="w-[40px] flex justify-center items-center h-[40px] bg-black/10  rounded-full">
          <Image
            className="rounded-full w-[30px] h-[30px]"
            source={{ uri: params.data.image }}
          />
        </View>
        <Text>{params.data.name}</Text>
      </View>

      <View className="bg-slate-700 max-w-[300px] w-full min-h-[300px] mx-8 rounded-[30px] m flex justify-center items-center">
        <QRCode
          color="white"
          backgroundColor="transparent"
          size={200}
          value="http://awesome.link.qr"
          logoBackgroundColor="#334155"
        />

        <Text className="px-4 text-white relative top-3 text-center">
          0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
        </Text>
      </View>

      <View className="flex gap-3 flex-row max-w-[300px] w-full mt-2">
        <Button
          onPress={() => {
            Clipboard.setString("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
          }}
          className="flex-1 px-2 bg-slate-300 active:bg-slate-200"
        >
          <Feather name="copy" size={24} color="#334155" />
          <Text className="scale-95">
            {shortAddress("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")}
          </Text>
        </Button>

        <Button
          onPress={onShare}
          className="flex-1 bg-slate-300 active:bg-slate-200"
        >
          <AntDesign name="sharealt" size={24} color="black" />
          <Text className="scale-95 mx-2">Share</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default TokenReceptionDetails;
