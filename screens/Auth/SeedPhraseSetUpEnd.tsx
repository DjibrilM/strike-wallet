import React, { useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { DatabaseConnectionContext } from "../../data/connection";
import { reloadAppAsync } from "expo";

import {
  View,
  SafeAreaView,
  Image,
  Text,
  Pressable,
} from "../../components/Tailwind";
import Button from "../../components/Widgets/Button";
import { useAuthSetps } from "../../states/authSteps.state";
import { cn } from "../../util/cn";
import { Platform } from "react-native";
import { routes } from "../../util/shared/constant";
import { usePasswordForm } from "../../states/FormState/passwordConfig.state";

const SeedPhraseSetUpEnd = () => {
  const navigation = useNavigation();
  const { updateSteps } = useAuthSetps();
  const { SettingsEntity } = useContext(DatabaseConnectionContext);
  const { password } = usePasswordForm();

  const createSettings = async () => {
    if (SettingsEntity) {
      try {
        const settings = new SettingsEntity();
        settings.password = password.value;
        settings.AllowBiomtricCrediential = false;
        settings.hasConfirguredWallet = true;
        await settings.save();
        await reloadAppAsync();
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    navigation.addListener("focus", () => updateSteps(4));
  }, []);
  return (
    <SafeAreaView className="flex-1 px-6 bg-white">
      <View
        className={cn("h-full flex-1", {
          "px-6": Platform.OS === "ios",
        })}
      >
        <Image
          className="mx-auto w-[150px] h-[150px] mt-20 mb-4"
          source={require("../../assets/images/3d-fluency-partying-face.png")}
        />

        <Text
          style={{ fontFamily: "Nunito-Bold" }}
          className="text-[18px] mb-3 text-slate-800"
        >
          Congratulations
        </Text>
        <Text
          style={{ fontFamily: "Nunito-Regular" }}
          className="w-10/12 leading-5 text-slate-700"
        >
          you've successfully protexted your wallet. Remember to keep your seed
          phrase safe, it's your responsibility!
        </Text>

        <Text
          style={{ fontFamily: "Nunito-Regular" }}
          className="text-blue-500 my-5 underline"
        >
          Leave yourself a hint?
        </Text>

        <Text
          style={{ fontFamily: "Nunito-Regular" }}
          className="text-slate-700 text-base"
        >
          Cryptooly cannot recover your wallet should you lose it. You can find
          your seedphrase in
        </Text>

        <Text
          style={{ fontFamily: "Nunito-Bold" }}
          className="mt-5 text-[16px] text-black"
        >
          Setting {">"} Security & Privacy
        </Text>

        <Text
          style={{ fontFamily: "Nunito-Bold" }}
          className="my-6 text-blue-500 text-[17px]"
        >
          Learn more
        </Text>

        <View className="flex-1 justify-end mb-4">
          <Button
            onPress={() => navigation.navigate(routes.home as never)}
            label="Continute"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SeedPhraseSetUpEnd;
