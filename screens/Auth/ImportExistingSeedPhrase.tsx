import React, { useState } from "react";
import { KeyboardTypeOptions, Platform } from "react-native";
import Button from "../../components/Widgets/Button";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  View,
  Text,
  SafeAreaView,
  Switch,
  Pressable,
} from "../../components/Tailwind";
import Input from "../../components/Widgets/Input";
import { cn } from "../../utils/cn";
import Visible from "../../components/Common/Visibility";
import Ionicons from "@expo/vector-icons/Ionicons";

const passwordConfirmation = (
  password: string,
  confirmationString: string
): boolean => {
  return confirmationString === password;
};

type Form = {
  seedPhrase: {
    type: KeyboardTypeOptions;
    value: string;
    valid: boolean;
    placeHolder: string;
    validationPattern: RegExp | Function; //validation pattern
  };

  password: {
    type: KeyboardTypeOptions;
    value: string;
    valid: boolean;
    placeHolder: string;
    validationPattern: RegExp | Function; //validation pattern
  };

  passwordConfirmation: {
    type: KeyboardTypeOptions;
    value: string;
    valid: boolean;
    placeHolder: string;
    validationPattern: RegExp | Function; //validation pattern
  };
};

const formDefaultData: Form = {
  seedPhrase: {
    type: "visible-password",
    value: "",
    valid: false,
    placeHolder: "Seed phrase",
    validationPattern: /^(?=.*\d)[A-Za-z\d]{6,}$/,
  },

  password: {
    type: "visible-password",
    value: "",
    valid: false,
    placeHolder: "Password",
    validationPattern: /^(?=.*\d)[A-Za-z\d]{6,}$/,
  },

  passwordConfirmation: {
    type: "visible-password",
    value: "",
    valid: false,
    placeHolder: "Confirm password",
    validationPattern: passwordConfirmation,
  },
};

const ImportExistingSeedPhrase = () => {
  const [form, setForm] = useState<Form>(formDefaultData);
  const [includeFaceRecognition, setIncludeFaceRecognition] =
    useState<boolean>(false);

  const onInputChange = (
    key: "password" | "seedPhrase" | "passwordConfirmation",
    value: string
  ) => {
    const prevFormVal = { ...form };
    prevFormVal[key].value = value;
    setForm(prevFormVal);
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
                onChangeText={(text) =>
                  onInputChange(
                    key as "password" | "seedPhrase" | "passwordConfirmation",
                    text
                  )
                }
                prefix={
                  key === "passwordConfirmation" &&
                  form[
                    key as "password" | "seedPhrase" | "passwordConfirmation"
                  ].valid ? (
                    <AntDesign name="check" size={24} color="#50a050" />
                  ) : (
                    <>
                      {key === "seedPhrase" && (
                        <Pressable className="mx-2">
                          <Ionicons name="scan" size={20} color="#353434" />
                        </Pressable>
                      )}
                    </>
                  )
                }
                hiddePasswordView={key === "passwordConfirmation"}
                InputType={
                  form[
                    key as "password" | "seedPhrase" | "passwordConfirmation"
                  ].type
                }
                value={
                  form[
                    key as "password" | "seedPhrase" | "passwordConfirmation"
                  ].value
                }
                placeholder={
                  form[
                    key as "password" | "seedPhrase" | "passwordConfirmation"
                  ].placeHolder
                }
                className="mt-10"
              />
            </View>
          ))}
        </View>

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

        <View className="flex-1 gap-6 flex justify-end  pb-20">
          <Text className="text-slate-600">
            Byproceeding, you agree to these{" "}
            <Pressable>
              <Text className=" text-blueDefault underline">
                Term and Conditions.
              </Text>
            </Pressable>
          </Text>
          <Button label="Import" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ImportExistingSeedPhrase;
