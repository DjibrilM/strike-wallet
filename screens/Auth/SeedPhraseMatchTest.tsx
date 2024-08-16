import React, { useMemo, useState, useEffect } from "react";
import { Platform, StatusBar, Vibration } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button from "../../components/Widgets/Button";
import { useAuthSetps } from "../../states/authSteps.state";
import AuthHeader from "../../components/AuthHeader";

import { Text } from "../../components/Tailwind";
import { routes, seedPhrase } from "../../utils/shared/constant";

import {
  View,
  Pressable,
  SafeAreaView,
  ScrollView,
} from "../../components/Tailwind";
import { cn } from "../../utils/cn";

const SeedPhraseMatchTest = () => {
  const navigation = useNavigation();
  const [selectionAre, setSelectionArea] = useState([
    ...seedPhrase.map((el, index) => ({
      hasPriority: false,
      word: el,
      selected: index === 0 ? true : false,
      match: "",
    })),
  ]);
  const randomSeedPhrase = useMemo<{ word: string; index: number }[]>(() => {
    const pharsesPool: { word: string; index: number }[] = [];

    seedPhrase.forEach((word) => {
      pharsesPool.push({
        word: word,
        index: Math.floor(Math.random() * seedPhrase.length),
      });
    });

    return pharsesPool.sort((a, b) => a.index - b.index);
  }, []);

  const { updateSteps } = useAuthSetps();

  const toogleSelectArea = (word: string) => {
    const prevMatch = [...selectionAre];
    const checkIfWordIsAlreadySeelected = prevMatch.findIndex(
      (el) => el.match === word
    );

    if (checkIfWordIsAlreadySeelected > -1) {
      prevMatch[checkIfWordIsAlreadySeelected].match = "";
      prevMatch[checkIfWordIsAlreadySeelected].selected = false;
      setSelectionArea(prevMatch);

      return;
    }

    const findCurrenctActiveZoneIndex = prevMatch.findIndex(
      (el) => el.selected === true && el.match.length < 1
    );

    const findFirstActiveZoneIndex = prevMatch.findIndex(
      (el) => el.selected === false
    );

    if (
      findCurrenctActiveZoneIndex >= 0 &&
      prevMatch[findCurrenctActiveZoneIndex].match.length < 1
    ) {
      prevMatch[findCurrenctActiveZoneIndex].selected = true;
      prevMatch[findCurrenctActiveZoneIndex].match = word;
      setSelectionArea(prevMatch);
    } else if (findFirstActiveZoneIndex > -1) {
      prevMatch[findFirstActiveZoneIndex].selected = true;
      prevMatch[findFirstActiveZoneIndex].match = word;
      setSelectionArea(prevMatch);
    }
    Vibration.vibrate(100);
  };

  const updateActiveArea = (index: number) => {
    let prevMatch = [...selectionAre];
    prevMatch = prevMatch.map((el) => ({
      ...el,
      selected:
        el.match.length === 0 && el.selected === true ? false : el.selected,
    }));

    const math = prevMatch[index];
    math.match = "";
    math.selected = true;

    setSelectionArea([...prevMatch]);
  };

  useEffect(() => {
    navigation.addListener("focus", () => updateSteps(3));
  }, []);

  return (
    <SafeAreaView className="h-full px-6 flex-1 bg-white">
      <View
        className={cn({
          "px-6": Platform.OS === "ios",
        })}
      >
        <AuthHeader />
      </View>

      <StatusBar barStyle={"default"} />

      <ScrollView
        className={cn("pb-10", {
          "px-6": Platform.OS === "ios",
        })}
      >
        <Text
          style={{ fontFamily: "Nunito-Bold" }}
          className="text-slate-600 text-[18px] font-bold mt-10"
        >
          Confirm Secreet Recovery Phrase
        </Text>

        <Text
          style={{ fontFamily: "Nunito-Regular" }}
          className="text-slate-600"
        >
          Select each word in the order it was presented to you
        </Text>
        <View className="w-full mt-6 min-h-[400px] bg-white rounded-lg p-6 shadow-md border-slate-200 border">
          <View className="flex flex-wrap justify-between gap-4 flex-row mt-5">
            {selectionAre.map((seedPhrase, index) => (
              <Pressable
                key={seedPhrase + index.toString()}
                onPress={() => updateActiveArea(index)}
                className={cn(
                  "flex flex-row items-center relative left-1 basis-32 h-10 mb-2"
                )}
              >
                <Text className="absolute left-[-19px]">{index + 1}.</Text>
                <View
                  className={cn(
                    "w-full border h-full border-slate-400 flex items-center justify-center rounded-lg  border-dashed",
                    {
                      "border-blue-600":
                        seedPhrase.match || seedPhrase.selected,
                    }
                  )}
                  key={seedPhrase.word + index}
                >
                  <Text className="text-slate-500">{seedPhrase.match}</Text>
                </View>
              </Pressable>
            ))}
          </View>

          <Button
            onPress={() =>
              navigation.navigate(routes.SeedPhraseSetUpEnd as never)
            }
            label="Continue"
            disabled={
              !(
                seedPhrase.join("") ===
                selectionAre.map((obj) => obj.match).join("")
              )
            }
            className="mt-5"
          />
        </View>

        <View className="h-5"></View>
        <View className="w-full relative flex flex-wrap flex-row gap-3 mx-auto">
          {randomSeedPhrase.map((seedPhrase, index) => {
            const isSeelected = selectionAre.findIndex(
              (el) => el.match === seedPhrase.word
            );
            return (
              <Pressable
                key={"word-select-" + index}
                className="mt-6"
                onPress={() => toogleSelectArea(seedPhrase.word)}
              >
                <View
                  className={cn(
                    "basis-[30] border border-slate-200  relative p-2 flex flex-row items-center justify-center right-1 h-10 rounded-lg shadow-sm",
                    {
                      "bg-slate-300": isSeelected > -1,
                      "bg-white": isSeelected === -1,
                    }
                  )}
                  key={seedPhrase.word + index}
                >
                  <Text className="text-[12px]">{seedPhrase.word}</Text>
                </View>
              </Pressable>
            );
          })}
        </View>
        <View className="h-10"></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SeedPhraseMatchTest;
