import React, { useEffect } from "react";
import Octicons from "@expo/vector-icons/Octicons";
import { useNavigation } from "@react-navigation/native";
import { View, Text, SafeAreaView } from "../../components/Tailwind";
import AuthHeader from "../../components/AuthHeader";
import { Platform, StatusBar } from "react-native";

import { useAuthSetps } from "../../states/authSteps.state";
import Button from "../../components/Widgets/Button";
import { ScrollView } from "../../components/Tailwind";
import { routes } from "../../util/shared/constant";
import { cn } from "../../util/cn";

const SeedPhraseGeneration = () => {
  const navigation = useNavigation();
  const { updateSteps } = useAuthSetps();

  useEffect(() => {
    navigation.addListener("focus", () => updateSteps(1));
  }, []);
  return (
    <SafeAreaView className="bg-white flex-1">
      <StatusBar barStyle={"default"} />
      <View className="px-6">
        <AuthHeader />
      </View>

      <ScrollView className={cn("flex-1 px-6", {})}>
        <Text
          style={{ fontFamily: "Nunito-Bold" }}
          className="text-slate-600 text-[18px] mt-10 font-bold"
        >
          Secure your wallet
        </Text>

        <View className="flex flex-row items-center  gap-1 mt-5">
          <Octicons name="question" size={20} color="#3b82f6" />
          <Text className="text-blue-500">Why is it important?</Text>
        </View>

        <View className="bg-white border border-slate-200  mt-5 p-4 shadow-sm rounded-[10px] w-full">
          <Text
            style={{ fontFamily: "Nunito-SemiBold" }}
            className=" leading-5 text-slate-600"
          >
            Write down your seed phrase on a cryptooly of paper and store in a
            safe place.
          </Text>

          <Text className="mt-4 text-slate-600">
            Security lever: <Text className="text-blue-500"> Very strong</Text>
          </Text>
          <View className="gap-2 flex flex-row mt-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <View
                key={index}
                className="bg-blue-500 w-[30px] h-[10px] rounded-full"
              ></View>
            ))}
          </View>

          <View>
            <Text className="text-slate-500 mt-6">Risks are:</Text>
            <Text className="my-2 text-slate-500">• You lose it</Text>
            <Text className="my-2 text-slate-500">
              • You forget where you put it
            </Text>
            <Text className="my-2 text-slate-500">• Someone else finds it</Text>
          </View>

          <View className="my-3">
            <Text
              style={{ fontFamily: "Nunito-SemiBold" }}
              className="text-slate-500"
            >
              Other options: Doesn't have to be paper!
            </Text>
          </View>

          <View>
            <Text className="text-slate-500 ">Tips:</Text>
            <Text className="my-2 text-slate-500">• Store in bank vault</Text>
            <Text className="my-2 text-slate-500">• Store in a safe</Text>
            <Text className="my-2 text-slate-500">
              • Store in multiple secret places
            </Text>
          </View>

          <View className="mt-4">
            <Button
              label="Start"
              onPress={() =>
                navigation.navigate(routes.seedPhraseRevelation as never)
              }
              className="w-full"
            ></Button>
          </View>
        </View>

        <View className="h-6"></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SeedPhraseGeneration;
