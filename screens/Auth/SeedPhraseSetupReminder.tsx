import React, { useContext, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Checkbox from "expo-checkbox";
import { Platform, StatusBar } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { reloadAppAsync } from "expo";


import {
  View,
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity,
} from "../../components/Tailwind";

import Button from "../../components/Widgets/Button";
import CustomBottomSheet from "../../components/Widgets/BottomSheet";
import { CustomeBottomSheetRef } from "../../util/shared/types";
import { cn } from "../../util/cn";
import { routes } from "../../util/shared/constant";
import { DatabaseConnectionContext } from "../../data/connection";
import { usePasswordForm } from "../../states/FormState/passwordConfig.state";

const SeedPhraseSetupReminder = () => {
  const { password } = usePasswordForm();
  const navigation = useNavigation();
  const { SettingsEntity } = useContext(DatabaseConnectionContext);
  const seedPharseExplanationBottomSheet = useRef<CustomeBottomSheetRef>();
  const securityReminderBottomSheet = useRef<CustomeBottomSheetRef>();
  const [constinueWithoutSecurity, setConstinueWithoutSecurity] =
    useState(false);

  const createSettings = async () => {
    if (SettingsEntity) {
      try {
        const settings = new SettingsEntity();
        settings.password = password.value;
        settings.AllowBiomtricCrediential = false;
        settings.hasConfirguredWallet = false;
        await settings.save();
        securityReminderBottomSheet.current?.close();

        await reloadAppAsync();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 px-6 bg-white">
      <StatusBar barStyle={"default"} />
      <View
        className={cn("flex flex-col flex-1 justify-between h-full", {
          "px-6": Platform.OS === "ios",
        })}
      >
        <View className=" flex justify-around">
          <View className="flex  relative right-4 mt-4 items-center flex-row">
            <TouchableOpacity onPress={navigation.goBack}>
              <Ionicons name="chevron-back-outline" size={24} color="#1354fe" />
            </TouchableOpacity>
            <Text
              className="text-lg ml-3  text-gray-600"
              style={{ fontFamily: "Nunito-Bold" }}
            >
              Secure Your Wallet
            </Text>
          </View>

          <View className="w-[40%] pt-5 h-[43%] mx-auto items-center">
            <Image
              style={{ aspectRatio: 4 / 4.4 }}
              className="w-full h-full object-contain mt-3"
              source={require("../../assets/images/3d-casual-life-fingerprint-security.png")}
            ></Image>
          </View>

          <Text
            style={{ lineHeight: 30 }}
            className="leading-8 mt-9 text-center text-slate-600 text-base"
          >
            Don't risk losing your funds. protect your wallet by saving your
            <Text className="font-bold  text-[16px]"> seed phrase</Text> in a
            place you trust. It's the only way to recover your wallet if you get
            locked out of the app or get a new device.
          </Text>
        </View>

        <View className="flex pb-5 gap-4">
          <Button
            onPress={() => securityReminderBottomSheet.current?.open()}
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

      <CustomBottomSheet ref={seedPharseExplanationBottomSheet}>
        <View className="px-6 flex  flex-col">
          <Text
            style={{ fontFamily: "Nunito-Bold" }}
            className="my-5 text-[18px] text-slate-700"
          >
            What is a Seed phrase
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

          <View className="my-8 justify-end  w-full">
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

      <CustomBottomSheet ref={securityReminderBottomSheet}>
        <View className="px-6">
          <Text
            style={{ fontFamily: "Nunito-Bold" }}
            className="my-5  text-[18px] text-slate-700"
          >
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

          <View
            className={cn("flex gap-3 mt-4 flex-row pb-5 w-full", {
              "pb-10": Platform.OS === "ios",
            })}
          >
            <Button
              onPress={createSettings}
              label="Skip"
              disabled={!constinueWithoutSecurity}
              className={cn("w-[50%] self-end")}
            />

            <Button
              label="Secure Now"
              onPress={() => {
                securityReminderBottomSheet.current?.close();
                seedPharseExplanationBottomSheet.current?.open();
              }}
              className="w-[48%]"
            />
          </View>
        </View>
      </CustomBottomSheet>
    </SafeAreaView>
  );
};

export default SeedPhraseSetupReminder;
