import React, { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Checkbox from "expo-checkbox";
import { Platform, StatusBar } from "react-native";

import { View, SafeAreaView, Image, Text } from "../../components/Tailwind";
import { useAuthSetps } from "../../states/authSteps.state";
import AuthHeader from "../../components/AuthHeader";
import Button from "../../components/Widgets/Button";
import CustomBottomSheet from "../../components/Widgets/BottomSheet";
import { CustomeBottomSheetRef } from "../../util/shared/types";
import { cn } from "../../util/cn";
import { routes } from "../../util/shared/constant";

const SeedPhraseSetupReminder = () => {
  const { updateSteps } = useAuthSetps();
  const navigation = useNavigation();
  const seedPharseExplanationBottomSheet = useRef<CustomeBottomSheetRef>();
  const securityReminderBottomSheet = useRef<CustomeBottomSheetRef>();
  const [constinueWithoutSecurity, setConstinueWithoutSecurity] =
    useState(false);

    useEffect(() => {
      navigation.addListener("focus", () => updateSteps(1));
    }, []);
    

  return (
    <SafeAreaView className="flex-1 px-6 bg-white">
      <StatusBar barStyle={"default"} />
      <AuthHeader />

      <View className={cn("flex flex-col flex-1 justify-between h-full", {
        'px-6':Platform.OS === 'ios'
      })}>
        <View className="">
          <Text
            className="mt-10 text-lg font-bold text-gray-700"
            style={{ fontFamily: "Nunito-Bold" }}
          >
            Secure Your Wallet
          </Text>
          <View className="w-full items-center mt-20">
            <Image source={require("../../assets/images/security.png")}></Image>
          </View>

          <Text
            style={{ lineHeight: 30 }}
            className="leading-8 mt-9 text-slate-600 text-base"
          >
            Don't risk losing your funds. protect your wallet by saving your
            <Text className="font-bold  text-[16px]"> seed phrase</Text> in a
            place you trust. It's the only way to recover your wallet if you get
            locked out of the app or get a new device.
          </Text>
        </View>

        <View className="flex pb-10 gap-4">
          <Button
            onPress={securityReminderBottomSheet.current?.open}
            className="bg-slate-400 font-bold active:bg-slate-300"
          >
            <Text
              style={{ fontFamily: "Nunito-Bold" }}
              className="text-slate-800"
            >
              Remind Me Later
            </Text>
          </Button>

          <Button
            onPress={() => seedPharseExplanationBottomSheet.current?.open()}
          >
            <Text
              style={{ fontFamily: "Nunito-Bold" }}
              className="text-white font-bold"
            >
              Start
            </Text>
          </Button>
        </View>
      </View>

      <CustomBottomSheet
        customSnapPoints={["65%"]}
        ref={seedPharseExplanationBottomSheet}
      >
        <View className="px-6 flex h-full flex-col">
          <Text className="my-5 font-bold text-[18px] text-slate-700">
            What is a 'Seed phrase'
          </Text>
          <Text
            style={{ fontFamily: "Nunito-Regular" }}
            className="leading-5 text-slate-600 text-base"
          >
            A seed phrase is a set of twelve words that contains all the
            information about your wallet, including your funds. It's like a
            secret code used to access your entire wallet.
          </Text>

          <Text
            style={{ fontFamily: "Nunito-Regular" }}
            className="leading-5 text-slate-600 mt-8 text-base"
          >
            You must keep your seed phrase secret and safe. If someone gets your
            seed phrase, they'll gain control over your accounts.
          </Text>

          <Text
            style={{ fontFamily: "Nunito-Regular" }}
            className="leading-7 text-slate-600 mt-8 text-base"
          >
            Save it in a place where only you can access it. If you lose it, not
            even Cryptooly can help you recover it.
          </Text>

          <View className="flex-1 self-end mb-7  justify-end  w-full">
            <Button
              onPress={() => {
                navigation.navigate(routes.seedPhraseGenerationPage as never);
                seedPharseExplanationBottomSheet.current?.close();
              }}
            >
              <Text
                className="text-white font-bold"
                style={{ fontFamily: "Nunito-Bold" }}
              >
                I Got It
              </Text>
            </Button>
          </View>
        </View>
      </CustomBottomSheet>

      <CustomBottomSheet
        customSnapPoints={["34%"]}
        ref={securityReminderBottomSheet}
      >
        <View className="px-6 h-full flex flex-col w-full">
          <Text className="my-5 font-bold text-[18px] text-slate-700">
            Skip Account Security?
          </Text>

          <View className="flex flex-row items-start gap-4">
            <Checkbox
              value={constinueWithoutSecurity}
              onValueChange={() =>
                setConstinueWithoutSecurity(!constinueWithoutSecurity)
              }
              color={constinueWithoutSecurity ? "#475569" : undefined}
            />
            <Text
              style={{ fontFamily: "Nunito-Regular" }}
              className="leading-5 text-slate-600 text-base pr-10 relative bottom-1"
            >
              I understand that if i lose mt seed phrase i will not be able to
              access my wallet
            </Text>
          </View>

          <View className="pb-10 flex-1  flex flex-row items-center justify-center gap-4">
            <Button
              label="Skip"
              disabled={!constinueWithoutSecurity}
              className={cn("basis-[50] self-end")}
            />

            <Button
              label="Secure Now"
              onPress={() => {
                securityReminderBottomSheet.current?.close();
                seedPharseExplanationBottomSheet.current?.open();
              }}
              className="basis-[46] self-end"
            />
          </View>
        </View>
      </CustomBottomSheet>
    </SafeAreaView>
  );
};

export default SeedPhraseSetupReminder;
