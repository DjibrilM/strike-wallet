import React, { useState } from "react";
import { StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { createMnemonic, createWalletKeyPair } from "../../utils/wallet";
import { useWallet } from "../../states/wallet";

import { View } from "../../components/Tailwind";
import { Image, Text, SafeAreaView } from "../../components/Tailwind";
import Button from "../../components/Widgets/Button";
import { routes } from "../../utils/shared/constant";

const WalletSetup = () => {
  const navigation = useNavigation();
  const { setWallet, mnemonicCompactedString } = useWallet();
  const [isGeneratingSeed, setIsGeneratingSeed] = useState(false);

  const createMnemonicFunc = async () => {
    //Skip this process if a mnemonic as already bee created
    if (mnemonicCompactedString) {
      navigation.navigate(routes.securityConfig as never);
      return;
    }

    setIsGeneratingSeed(true);

    setTimeout(async () => {
      try {
        const mnemonic = await createMnemonic();
        const wallet = await createWalletKeyPair(mnemonic.seed);

        setWallet({
          mnemonicArray: mnemonic.mnemonicArray,
          mnemonicCompactedString: mnemonic.mnemonicCompactedString,
          mnemonicSeparatedString: mnemonic.mnemonicSeparatedString,
          seed: mnemonic.seed,
          address: wallet.address,
          privateKey: wallet.privateKey,
          publicKey: wallet.publicKey,
        });

        setIsGeneratingSeed(false);
        navigation.navigate(routes.securityConfig as never);
      } catch (error) {
        console.log(error);
        setIsGeneratingSeed(false);
      }
    }, 1000);
  };

  return (
    <SafeAreaView className="flex items-center h-full bg-white">
      <StatusBar barStyle={"light-content"} />
      <View className="h-full  flex justify-between px-6 flex-col">
        <View className="flex justify-end items-center w-[60%] h-[40%] mx-auto">
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
              className="text-2xl mb-2 text-left text-slate-600"
            >
              Wallet Setup
            </Text>
            <Text
              style={{ fontFamily: "Nunito-Regular" }}
              className="leading-6 relative text-base text-left text-slate-500"
            >
              Have an existing wallet? Import it using your private key or
              recovery phrase to access your funds securely. New to crypto?
              Create a new wallet in a few steps and secure it with a strong
              password and backed-up recovery phrase.
            </Text>
          </View>

          <View className="mb-10">
            <Button
              loading={isGeneratingSeed}
              label="Create A New Wallet"
              onPress={async () => {
                await createMnemonicFunc();
              }}
            />

            <Button
              onPress={async () => {
                await createMnemonicFunc();
              }}
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
