import React, { useLayoutEffect } from "react";
import { View } from "../../components/Tailwind";
import { Image, Text, SafeAreaView } from "../../components/Tailwind";
import Button from "../../components/common/Button";
import { useNavigation } from "@react-navigation/native";
import { routes } from "../../util/shared/constant";

const WalletSetup = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex items-center h-full">
      <View className="flex items-center mt-40">
        <Image source={require("../../assets/images/illus.png")}></Image>
      </View>

      <View className="w-full  px-5">
        <Text
          style={{ fontFamily: "Nunito-Regular" }}
          className="text-3xl text-slate-800 font-semibold"
        >
          Wallet Setup
        </Text>
        <Text
          style={{ fontFamily: "Nunito-Regular" }}
          className="w-[200px] mt-2 text-slate-600"
        >
          Import an existing wallet or create a new one
        </Text>
      </View>

      <View className="mt-10 flex-1 justify-end mb-10 w-full px-5">
        <Button onPress={()=> navigation.navigate(routes.securityConfig as never)}>
          <Text style={{ fontFamily: "Nunito-Regular" }} className="text-white">
            Import Using Seed Phare
          </Text>
        </Button>

        <Button className="mt-4 bg-slate-300 active:bg-slate-200">
          <Text style={{ fontFamily: "Nunito-Regular" }} className="">
            Import Using Seed Phare
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default WalletSetup;
