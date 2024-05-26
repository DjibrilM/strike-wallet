import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "react-native";

import { View } from "../../components/Tailwind";
import { Image, Text, SafeAreaView } from "../../components/Tailwind";
import Button from "../../components/Widgets/Button";
import { routes } from "../../util/shared/constant";

const WalletSetup = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex items-center h-full bg-white">
      <StatusBar barStyle={"default"} />
      <View className="h-full  flex justify-between px-6 flex-col">
        <View className="flex items-center w-[50%] h-[40%] mx-auto">
          <Image
            style={{ aspectRatio: 4 / 4, objectFit: "contain" }}
            className="bottom-4 h-[90%] relative  top-4 left-9"
            source={require("../../assets/images/3d-casual-life-money-and-phone-1.png")}
          ></Image>
        </View>

        <View className="flex gap-3 flex-col justify-between">
          <View className="w-full bottom-3 relative">
            <Text
              style={{ fontFamily: "Nunito-Bold" }}
              className="text-2xl mb-2 text-center text-slate-600"
            >
              Wallet Setup
            </Text>
            <Text
              style={{ fontFamily: "Nunito-Regular" }}
              className="leading-6 relative text-base text-center text-slate-500"
            >
              Have an existing wallet? Import it using your private key or
              recovery phrase to access your funds securely. New to crypto?
              Create a new wallet in a few steps and secure it with a strong
              password and backed-up recovery phrase.
            </Text>
          </View>

          <View className="w-full mb-5">
            <Button
              label="Import Using Seed Phare"
              onPress={() =>
                navigation.navigate(routes.securityConfig as never)
              }
            />

            <Button
              onPress={() =>
                navigation.navigate(routes.seedPhraseImportantion as never)
              }
              className="mt-2 bg-slate-300 active:bg-slate-200 font-bold"
            >
              <Text className="text-slate-600">Import Using Seed Phare</Text>
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WalletSetup;
