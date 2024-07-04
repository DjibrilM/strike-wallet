import React, { useCallback, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Checkbox from "expo-checkbox";
import { StatusBar } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as LocalAuthentication from "expo-local-authentication";

import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Switch,
  Pressable,
} from "../../components/Tailwind";
import Input from "../../components/Widgets/Input";
import { Platform } from "react-native";
import { cn } from "../../util/cn";

import Button from "../../components/Widgets/Button";
import { usePasswordForm } from "../../states/FormState/passwordConfig.state";
import { routes } from "../../util/shared/constant";
import { useAuthSetps } from "../../states/authSteps.state";
import Visible from "../../components/Common/Visibility";

const PaswordConfig = () => {
  const navigation = useNavigation();
  const [doesDiviceSupportsBiometricAuth, setDoesDiviceSupportsBiometricAuth] =
    useState(false);

  const [
    hasConfirmedBiometricAuthorization,
    setHasConfirmedBiometricAuthorization,
  ] = useState(false);

  const [acceptsTermsAndConditions, setAcceptsTermsAndConditions] =
    useState<boolean>(false);
  const { updateSteps } = useAuthSetps();

  const {
    allowBiometricAthentication,
    updateBiometricConfigurationsAggreements,
    triedSubmit,
    password,
    confirmPassword,
    updatePassword,
    updatePasswordConfirmation,
    updateTrySubmit,
  } = usePasswordForm();

  const onSubmit = () => {
    updateTrySubmit();
    if (password.valid && confirmPassword.valid) {
      navigation.navigate(routes.seedPhraseSetupReminder as never);
    }
  };

  useEffect(() => {
    updateSteps(1);
    navigation.addListener("focus", () => updateSteps(1));
  }, []);

  const confirmBiomtricCredientials = useCallback(async () => {
    if (hasConfirmedBiometricAuthorization) return;

    const authenticate = await LocalAuthentication.authenticateAsync();
    setHasConfirmedBiometricAuthorization(true);
    if (authenticate.success) {
      setHasConfirmedBiometricAuthorization(true);
    }
  }, [hasConfirmedBiometricAuthorization]);

  const verifyBiometricAuthorizationHardware = async () => {
    const verify = await LocalAuthentication.hasHardwareAsync();
    setDoesDiviceSupportsBiometricAuth(verify);
  };

  useEffect(() => {
    verifyBiometricAuthorizationHardware();
  }, []);

  return (
    <SafeAreaView className="px-5 flex-1 bg-white">
      <StatusBar barStyle={"default"} />
      <View
        className={cn("flex flex-col justify-between flex-1", {
          "px-5": Platform.OS === "ios",
        })}
      >
        <View>
          <Text
            className="text-[18px]  mt-10 text-slate-600"
            style={{ fontFamily: "Nunito-Bold" }}
          >
            Create Password
          </Text>

          <Text
            className="w-[80%] text-slate-700 mt-2"
            style={{ fontFamily: "Nunito-Regular" }}
          >
            This password will unlock your Cryptooly wallet only on this
            service.
          </Text>

          <KeyboardAvoidingView className="mt-5" behavior="padding">
            <View>
              <Input
                maxLength={5}
                keyboardType="numeric"
                onChange={(e) => console.log(e.nativeEvent.text)}
                InputType={"visible-password"}
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
              <Text
                className={cn("text-slate-400 relative left-1", {
                  "text-blueDefault": password.valid,
                })}
              >
                {password.value.length}/5
              </Text>
            </View>

            <View className="mt-8">
              <Input
                maxLength={5}
                prefix={
                  confirmPassword.valid ? (
                    <AntDesign name="check" size={24} color="#50a050" />
                  ) : (
                    <></>
                  )
                }
                keyboardType="numeric"
                hiddePasswordView={true}
                value={confirmPassword.value}
                InputType={"visible-password"}
                placeholder="Confirm Password"
                onChangeText={(value) => updatePasswordConfirmation(value)}
                errorMessage={
                  (!confirmPassword.valid &&
                    confirmPassword.value.length > 0) ||
                  (!confirmPassword.valid && triedSubmit)
                    ? confirmPassword.errorMessage
                    : ""
                }
              />
            </View>
          </KeyboardAvoidingView>

          <Visible condition={doesDiviceSupportsBiometricAuth}>
            <View className="justify-between items-center flex flex-row w-full mt-6">
              <Text
                style={{ fontFamily: "Nunito-Regular" }}
                className="text-regular text-slate-700"
              >
                Sign in with Face ID?
              </Text>
              <Switch
                trackColor={{ false: "#e2e2e2cc", true: "#8da9eeb6" }}
                thumbColor={
                  Platform.OS === "android"
                    ? allowBiometricAthentication
                      ? "#3a6be8"
                      : "#ccc"
                    : ""
                }
                value={allowBiometricAthentication}
                onValueChange={(value) => {
                  if (value) {
                    confirmBiomtricCredientials();
                  }

                  updateBiometricConfigurationsAggreements(
                    !allowBiometricAthentication
                  );
                }}
              />
            </View>
          </Visible>
        </View>

        <View className="w-full mb-5">
          <View className="flex flex-row gap-3 mb-6 w-full px-2 mt-5">
            <Checkbox
              style={{ borderColor: "#1354fe", top: 5 }}
              value={acceptsTermsAndConditions}
              onValueChange={() =>
                setAcceptsTermsAndConditions(!acceptsTermsAndConditions)
              }
              color={acceptsTermsAndConditions ? "#1354fe" : undefined}
            />
            <Text
              className="text-slate-700"
              style={{ fontFamily: "Nunito-Regular" }}
            >
              I under stand that Cryptooly cannot recover this password for me.
              Learn
              <Pressable className="pt-1  top-[0.8px]">
                <Text
                  style={{ fontFamily: "Nunito-Bold" }}
                  className="underline text-blueDefault relative top-[2px] left-2"
                >
                  more
                </Text>
              </Pressable>
            </Text>
          </View>

          <Button
            label=" Create Password"
            disabled={
              !(
                password.valid &&
                confirmPassword.valid &&
                acceptsTermsAndConditions
              )
            }
            onPress={onSubmit}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PaswordConfig;
