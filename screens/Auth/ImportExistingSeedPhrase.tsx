import React, { useCallback, useContext, useState } from "react";
import { KeyboardTypeOptions, Platform } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as LocalAuthentication from "expo-local-authentication";

import {
  View,
  Text,
  SafeAreaView,
  Switch,
  Pressable,
  TouchableOpacity,
} from "../../components/Tailwind";
import {
  checkMnemonicValidity,
  createWalletKeyPairFromMnemonic,
} from "../../utils/wallet";
import Crypto from "../../utils/crypto";
import Input from "../../components/Widgets/Input";
import Button from "../../components/Widgets/Button";
import { cn } from "../../utils/cn";
import Visible from "../../components/Common/Visibility";
import { DatabaseConnectionContext } from "../../data/connection";
import navigation from "../../navigation";
import useDBqueries from "../../utils/hooks/useDBqueries";
import { routes } from "../../utils/shared/constant";
import { useWallet } from "../../states/wallet";
import { useNavigation } from "@react-navigation/native";

const passwordConfirmation = (
  password: string,
  confirmationString: string
): boolean => {
  return confirmationString === password;
};

type Form = {
  seedPhrase: {
    keyboardType: KeyboardTypeOptions
    validate: Function;
    errorMessages: string;
    type: KeyboardTypeOptions;
    value: string;
    valid: boolean;
    placeHolder: string;
    validationPattern: RegExp | Function; //validation pattern
  };

  password: {
    keyboardType: KeyboardTypeOptions
    validate: Function;
    errorMessages: string;
    type: KeyboardTypeOptions;
    value: string;
    valid: boolean;
    placeHolder: string;
    validationPattern: RegExp | Function; //validation pattern
  };

  passwordConfirmation: {
    keyboardType: KeyboardTypeOptions
    validate: Function;
    errorMessages: string;
    type: KeyboardTypeOptions;
    value: string;
    valid: boolean;
    placeHolder: string;
    validationPattern: RegExp | Function; //validation pattern
  };
};

const formDefaultData: Form = {
  seedPhrase: {
    keyboardType: 'default',
    validate: function (input: string) {
      return checkMnemonicValidity(input);
    },
    errorMessages: "Invalid Phrase mnemonic",
    type: "default",
    value: "",
    valid: false,
    placeHolder: "Seed phrase",
    validationPattern: /^(?=.*\d)[A-Za-z\d]{6,}$/,
  },

  password: {
    keyboardType: "numeric",
    errorMessages: "Invalid password",
    type: "visible-password",
    value: "",
    validate: function (input: string) {
      const pattern = /^.{5}$/;
      return pattern.test(input);
    },
    valid: false,
    placeHolder: "Password",
    validationPattern: /^(?=.*\d)[A-Za-z\d]{6,}$/,
  },

  passwordConfirmation: {
    keyboardType: "numeric",
    validate: function (input: string, reference: string) {
      return input === reference && /^.{5}$/.test(input);
    },
    errorMessages: "Password don't match",
    type: "visible-password",
    value: "",
    valid: false,
    placeHolder: "Confirm password",
    validationPattern: passwordConfirmation,
  },
};

const ImportExistingSeedPhrase = () => {
  const navigation = useNavigation() as any;
  const { setWallet } = useWallet();
  const { createWallet, createSettings } = useDBqueries();
  const { SettingsEntity, WalletEntity } = useContext(
    DatabaseConnectionContext
  );
  const [allowBiometrics, setAllowBiometrics] = useState(false);
  const [form, setForm] = useState<Form>(formDefaultData);

  const [
    hasConfirmedBiometricAuthorization,
    setHasConfirmedBiometricAuthorization,
  ] = useState(false);

  const onInputChange = async (
    key: "password" | "seedPhrase" | "passwordConfirmation",
    value: string
  ) => {
    const prevFormVal = { ...form };

    const validation = prevFormVal[key].validate(value, form.password.value);
    prevFormVal[key].valid = validation;
    prevFormVal[key].value = value;
    setForm(prevFormVal);
  };

  const confirmBiomtricCredientials = useCallback(async () => {
    if (hasConfirmedBiometricAuthorization) return;

    const authenticate = await LocalAuthentication.authenticateAsync();
    setHasConfirmedBiometricAuthorization(true);
    if (authenticate.success) {
      setHasConfirmedBiometricAuthorization(true);
    }
  }, [hasConfirmedBiometricAuthorization]);

  const setupWallet = async () => {
    if (SettingsEntity && WalletEntity) {
      try {
        const { address, privateKey, publicKey } =
          await createWalletKeyPairFromMnemonic(form.seedPhrase.value);
        const {
          encryptedMessage: encryptedPassword,
          iv: passwordIv,
          salt: passwordSalt,
        } = Crypto.encrypt({
          message: form.password.value,
          key: form.password.value.toString(),
        }); //encrypt password

        await createSettings({
          passwordIv,
          passwordSalt,
          password: encryptedPassword!,
          hasConfirguredWallet: false,
          allowBiomtricCrediential: allowBiometrics,
        });

        await createWallet({
          mnemonic: form.seedPhrase.value || "",
          privateKey: privateKey,
          publicKey: publicKey,
          seedPhrase: "",
          address: address,
        });

        setWallet({
          address: address,
          publicKey: publicKey,
          privateKey: privateKey,
        });

        navigation.goBack();
        navigation.navigate(routes.home, { screen: 'Wallet' } as never);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Visible condition={Platform.OS === "ios"}>
        <View className="w-full flex items-center justify-center mt-5">
          <View className="w-[90px] h-[6px] bg-slate-300 rounded-lg" />
        </View>
      </Visible>

      <View className="h-full flex mt-10 px-6">
        <Text
          style={{ fontFamily: "Nunito-Bold" }}
          className={cn("text-[18px] font-bold text-slate-700")}
        >
          Import Form Seed
        </Text>

        <View className="flex flex-col">
          {Object.keys(form).map((key) => (
            <View key={key} className="mt-5">
              <Input
                multiline={key === "seedPhrase"}
                style={[
                  key === "seedPhrase" && [
                    { height: 300, backgroundColor: "red" },
                  ],
                ]}
                onChangeText={(text) =>
                  onInputChange(
                    key as keyof typeof form,
                    text
                  )
                }

                keyboardType={form[key as keyof typeof form].keyboardType}

                prefix={
                  key === "passwordConfirmation" &&
                  form[
                    key as keyof typeof form
                  ].valid ? (
                    <AntDesign name="check" size={24} color="#50a050" />
                  ) : (
                      <View className="h-full">
                        {key === "seedPhrase" && form[key].valid && (
                          <AntDesign name="check" size={24} color="#50a050" />
                        )}

                        {key === "seedPhrase" && !form[key].valid && (
                          <TouchableOpacity className="mx-2">
                          <Ionicons name="scan" size={20} color="#353434" />
                          </TouchableOpacity>
                      )}
                      </View>
                  )
                }
                hiddePasswordView={key === "passwordConfirmation"}

                InputType={
                  form[
                    key as keyof typeof form
                  ].type
                }
                value={
                  form[
                    key as keyof typeof form
                  ].value
                }
                placeholder={
                  form[
                    key as keyof typeof form
                  ].placeHolder
                }
                errorMessage={
                  !form[key as keyof typeof form].valid &&
                    form[key as keyof typeof form].value
                    ? form[key as keyof typeof form].errorMessages
                    : ""
                }
                maxLength={key !== 'seedPhrase' ? 5 : 100**3}
                containerClassName={cn({ "h-[150px]": key === "seedPhrase" })}
                className="h-full bg-red-500"
              />
            </View>
          ))}
        </View>

        <View className="justify-between flex flex-row w-full mt-10 relative z-50">
          <Text
            style={{ fontFamily: "Nunito-Regular" }}
            className="text-[17px] text-slate-700"
          >
            Sign in with Face ID?
          </Text>
          <Switch
            trackColor={{ false: "#e2e2e2cc", true: "#8da9eeb6" }}
            thumbColor={
              Platform.OS === "android"
                ? allowBiometrics
                  ? "#3a6be8"
                  : "#ccc"
                : ""
            }
            value={allowBiometrics}
            onValueChange={(value) => {
              if (value) {
                confirmBiomtricCredientials();
              }
              setAllowBiometrics(!allowBiometrics);
            }}
          />
        </View>

        <View className="flex-1 gap-6 flex justify-end  pb-20">
          <Text className="text-slate-600">
            Byproceeding, you agree to these{" "}
            <Pressable>
              <Text className=" text-blueDefault underline">
                Term and Conditions.
              </Text>
            </Pressable>
          </Text>
          <Button
            disabled={
              !form.password.valid ||
              !form.passwordConfirmation.valid ||
              !form.seedPhrase.valid
            }
            onPress={setupWallet}
            label="Import"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ImportExistingSeedPhrase;


// loud proud among airport rocket kingdom curtain spin before garbage matter chapter bus lion guitar copy memory address simple swift design fun fatigue guess