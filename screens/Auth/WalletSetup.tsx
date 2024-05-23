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
      <View className="flex items-center mt-10">
        <Image
          className="scale-[0.7]"
          source={require("../../assets/images/3d-casual-life-cogwheels-and-gears-representing-settings.png")}
        ></Image>
      </View>

      <View className="w-full relative   px-6">
        <Text
          style={{ fontFamily: "Nunito-Bold" }}
          className="text-3xl mb-4 text-center text-slate-600"
        >
          Wallet Setup
        </Text>
        <Text
          style={{ fontFamily: "Nunito-Regular" }}
          className="mt-2 leading-6 text-base text-center text-slate-500"
        >
          Have an existing wallet? Import it using your private key or recovery
          phrase to access your funds securely. New to crypto? Create a new
          wallet in a few steps and secure it with a strong password and
          backed-up recovery phrase.
        </Text>
      </View>

      <View className="mt-10 flex-1 justify-end mb-10 w-full px-6">
        <Button
          label="Import Using Seed Phare"
          onPress={() => navigation.navigate(routes.securityConfig as never)}
        />

        <Button
          onPress={() =>
            navigation.navigate(routes.seedPhraseImportantion as never)
          }
          className="mt-4 bg-slate-300 active:bg-slate-200 font-bold"
        >
          <Text className="text-slate-600">Import Using Seed Phare</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default WalletSetup;
