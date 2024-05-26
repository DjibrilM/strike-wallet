import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import { BlurView } from "expo-blur";
import { StyleSheet, StatusBar, Platform } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";

import { useAuthSetps } from "../../states/authSteps.state";
import {
  View,
  SafeAreaView,
  Text,
  Pressable,
  Image,
} from "../../components/Tailwind";
import Visible from "../../components/common/Visibility";
import Button from "../../components/Widgets/Button";
import { routes } from "../../util/shared/constant";
import AuthHeader from "../../components/AuthHeader";
import { seedPhrase as constantSeedPhrase } from "../../util/shared/constant";
import { cn } from "../../util/cn";

const SeedPhraseRevelation = () => {
  const [hidelPhrase, setHidelPhrase] = useState<boolean>(true);
  const { updateSteps } = useAuthSetps();
  const navigation = useNavigation();
  const seedPhrase = useRef(constantSeedPhrase);

  useEffect(() => {
    navigation.addListener("focus", () => updateSteps(2));
  }, []);

  return (
    <SafeAreaView className="bg-white flex-1 px-6">
      <View
        className={cn({
          "px-6": Platform.OS === "ios",
        })}
      >
        <AuthHeader />
      </View>

      <StatusBar barStyle={"default"} />
      <View
        className={cn(
          "items-center  justify-between h-full flex-1 flex w-full ",
          {
            "px-6": Platform.OS === "ios",
          }
        )}
      >
        <View>
          <Text
            className="text-[18px] w-full text-left  text-slate-600"
            style={{ fontFamily: "Nunito-Bold" }}
          >
            Write Down Your Seed Phrase
          </Text>

          <Text
            style={{ fontFamily: "Nunito-SemiBold" }}
            className="mt-3 leading-6 text-slate-600"
          >
            This is your seed phrase. Write it down on a paper and keep it in a
            safe place. You'll be asked to re-enter this phrase (in order) on
            the next step.
          </Text>

          <View className="flex-wrap rounded-[20px] left-2 overflow-hidden gap-5 relative   mt-4 items-center justify-center  flex-row">
            <Visible condition={hidelPhrase}>
              <Pressable
                onPress={() => setHidelPhrase(false)}
                className="absolute flex flex-col items-center z-50"
              >
                <Feather name="eye-off" size={50} color="white" />
                <Text
                  style={{ fontFamily: "Nunito-Bold" }}
                  className="text-white font-bold mt-4 text-[18px]"
                >
                  Tap to reveal your seed phrase
                </Text>
                <Text
                  style={{ fontFamily: "Nunito-Regular" }}
                  className="mt-3 text-white"
                >
                  Make sure no one is watching your screen.
                </Text>
              </Pressable>
            </Visible>

            <Visible condition={hidelPhrase}>
              <View className="absolute  z-40 w-full bg-slate-500  h-full"></View>
            </Visible>

            {seedPhrase.current.map((phrase, index) => (
              <View
                style={{borderStyle:'dashed'}}
                key={"seed-phrase-" + index}
                className="p-4 z-20 border border-slate-300 w-[44%] relative right-2 flex flex-row  justify-center items-center rounded-lg flex-2  bg-white"
              >
                <Text
                  style={{ fontFamily: "Nunito-Regular" }}
                  className="text-center"
                >
                  {index + 1}.{" "}
                </Text>
                <Text
                  style={{ fontFamily: "Nunito-Bold" }}
                  className="text-center text-slate-600"
                >
                  {phrase}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View className="w-full mb-5">
          <Button
            onPress={() =>
              navigation.navigate(routes.seedPhraseMatchTest as never)
            }
            className="w-full"
          >
            <Text
              style={{ fontFamily: "Nunito-Bold" }}
              className="text-white font-bold"
            >
              Continue
            </Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  blur: {
    position: "absolute",
    zIndex: 10,
    width: "100%",
    height: "100%",
    backgroundColor: "#00000056",
  },
});

export default SeedPhraseRevelation;
