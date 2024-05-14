import React, { useRef, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Switch,
  Pressable,
} from "../../components/Tailwind";
import Input from "../../components/common/Input";
import { useForm, Controller } from "react-hook-form";
import { Platform } from "react-native";
import { cn } from "../../util/cn";
import Checkbox from "expo-checkbox";
import Button from "../../components/common/Button";
import { usePasswordForm } from "../../states/FormState/passwordConfig.state";

const PaswordConfig = () => {
  const [includeFaceRecognition, setIncludeFaceRecognition] =
    useState<boolean>(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const {
    triedSubmit,
    password,
    confirmPassword,
    updatePassword,
    updatePasswordConfirmation,
    updateTrySubmit,
  } = usePasswordForm();

  console.log(password, "password");
  const onSubmit = () => {
    updateTrySubmit();
    if (password.valid && confirmPassword.valid) {

    }
  };

  return (
    <SafeAreaView className="px-5">
      <View
        className={cn("flex flex-col h-full", {
          "px-5": Platform.OS === "ios",
        })}
      >
        <Text
          className="text-[18px] font-bold mt-10"
          style={{ fontFamily: "Nunito-Bold" }}
        >
          Create Password
        </Text>

        <Text
          className="w-[80%] text-slate-700 mt-5"
          style={{ fontFamily: "Nunito-Regular" }}
        >
          This password will unlock your Cryptooly wallet only on this service.
        </Text>

        <KeyboardAvoidingView className="mt-10" behavior="padding">
          <View>
            <Input
              type={"visible-password"}
              value={password.value}
              placeholder="Password"
              onChangeText={(value) => updatePassword(value)}
              defaultValue={password.value}
              errorMessage={
                (!password.valid && password.value.length > 0) ||
                (triedSubmit && !password.valid)
                  ? password.errorMessage
                  : ""
              }
            />
          </View>

          <View className="mt-8">
            <Input
              value={confirmPassword.value}
              type={"visible-password"}
              placeholder="Confirm Password"
              onChangeText={(value) => updatePasswordConfirmation(value)}
              errorMessage={
                (!confirmPassword.valid && confirmPassword.value.length > 0) ||
                (!confirmPassword.valid && triedSubmit)
                  ? confirmPassword.errorMessage
                  : ""
              }
            />
          </View>
        </KeyboardAvoidingView>

        <View className="justify-between flex flex-row w-full mt-10">
          <Text
            style={{ fontFamily: "Nunito-Regular" }}
            className="text-[17px] text-slate-700"
          >
            Sign in with Face ID?
          </Text>
          <Switch
            value={includeFaceRecognition}
            onChange={() => setIncludeFaceRecognition(!includeFaceRecognition)}
          />
        </View>

        <View className="flex flex-row gap-3 w-full px-2 mt-5">
          <Checkbox
            value={toggleCheckBox}
            onValueChange={() => setToggleCheckBox(!toggleCheckBox)}
            color={toggleCheckBox ? "#475569" : undefined}
          />
          <Text style={{ fontFamily: "Nunito-Regular" }}>
            I under stand that Cryptooly cannot recover this password for me.
            Learn{" "}
            <Pressable>
              <Text
                style={{ fontFamily: "Nunito-Regular" }}
                className="font-bold text-red-600 underline"
              >
                more
              </Text>
            </Pressable>
          </Text>
        </View>

        <View className="w-full h-10 self-end  pb-4 flex-1 justify-end">
          <Button onPress={onSubmit}>
            <Text
              className="text-white font-bold"
              style={{ fontFamily: "Nunito-Regular" }}
            >
              Create Password
            </Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PaswordConfig;
