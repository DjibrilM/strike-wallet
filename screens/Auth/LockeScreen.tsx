import React, { useEffect, useRef, useState } from "react";
import crypto from "crypto-es";
import * as LocalAuthentication from "expo-local-authentication";
import { FadeOutDown, FadeInDown } from "react-native-reanimated";
import { StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import NumPad from "../../components/Common/NumPad";
import { useAnimatedShake } from "../../utils/hooks/useShakeAnimation";
import { Modal, Text, View } from "../../components/Tailwind";
import Visible from "../../components/Common/Visibility";
import { cn } from "../../utils/cn";
import { useSettings } from "../../states/settings";
import { useAppStateStore } from "../../states/appStatus.state";
import { useWallet } from "../../states/wallet";
import Crypto from "../../utils/crypto";
import { useStore } from "zustand";

type InputField = {
  value: number | null;
  focused: boolean;
  filled: boolean;
  isInavlid: boolean;
  isValid: boolean;
};

const InputField: React.FC<InputField> = ({ value, isInavlid, isValid }) => {
  return (
    <View
      className={cn(
        "w-[50px] flex items-center justify-center h-[50px] mx-2 border border-slate-300 rounded-lg",
        {
          "border-red-500": isInavlid,
          "border-blueDefault": isValid,
        }
      )}
    >
      <Visible condition={value !== null}>
        <Animated.Text
          entering={FadeInDown.duration(100)}
          exiting={FadeOutDown.duration(100)}
          style={[style.textFieldValue, isInavlid && style.redText]}
        >
          *
        </Animated.Text>
      </Visible>
    </View>
  );
};

const passcodeAreaInitialValue: {
  value: number | null;
  focused: boolean;
  filled: boolean;
}[] = [
    { value: null, focused: false, filled: false },
    { value: null, focused: false, filled: false },
    { value: null, focused: false, filled: false },
    { value: null, focused: false, filled: false },
    { value: null, focused: false, filled: false },
  ];

const LockeScreen = ({ visible }: { visible: boolean }) => {
  const { privateKey } = useWallet();

  const { shake, rStyle } = useAnimatedShake();
  const [isInvalid, setIsInvalid] = useState(false);
  const [isvalid, setIsValid] = useState(false);
  const [passcodeArea, setPassCodeArea] = useState([
    ...passcodeAreaInitialValue,
  ]);

  const valueRef = useRef<number | null | string>(0);
  const { password, passwordIv, passwordSalt } = useSettings();
  const { unlockApplication } = useStore(useAppStateStore);

  const clearInputs = () => {
    setPassCodeArea([
      { value: null, focused: false, filled: false },
      { value: null, focused: false, filled: false },
      { value: null, focused: false, filled: false },
      { value: null, focused: false, filled: false },
      { value: null, focused: false, filled: false },
    ]);
    valueRef.current = null;
    setIsInvalid(false);
    setIsValid(false);
  };

  const handleInputChange = (value: number) => {
    if (valueRef.current && valueRef.current?.toString().length >= 5) return;
    setIsInvalid(false);

    const preValue = [...passcodeArea];
    const findEmptyField = preValue.findIndex((el) => el.value === null);

    if (findEmptyField !== -1) {
      preValue[findEmptyField].value = value;
      setPassCodeArea(preValue);
    }

    valueRef.current = preValue
      .map((el) => el.value?.toString())
      .join("")
      .toString();
  };

  const handleDelete = () => {
    if (
      valueRef.current &&
      isInvalid &&
      valueRef.current.toString().length >= 5
    ) {
      clearInputs();
      return;
    }

    let preValue = [...passcodeArea];
    const findEmptyField = preValue.findLastIndex((el) => el.value !== null);

    if (findEmptyField !== -1) {
      preValue[findEmptyField].value = null;
      setPassCodeArea(preValue);
    }
    valueRef.current = Number(preValue.map((el) => el.value).join(""));
  };

  useEffect(() => {
    if (
      valueRef.current &&
      valueRef.current &&
      valueRef.current?.toString().length >= 5
    ) {

      const passwordSaltBuffer = crypto.enc.Hex.parse(passwordSalt!)
      const passwordIvBuffer = crypto.enc.Hex.parse(passwordIv!)

      const compare = Crypto.compare({
        iv: passwordIvBuffer,
        salt: passwordSaltBuffer,
        message: valueRef.current!.toString(),
        encryptedMessage: password,
        key: valueRef.current!.toString(),
      });

      if (!compare) {
        setIsInvalid(true);
        shake();
      } else {

        setIsValid(true);
        setTimeout(() => {

          clearInputs();
          unlockApplication();
        }, 100);

      }
    }


  }, [valueRef.current]);

  const authorizeWithBiometricCredentials = async () => {
    const authorize = await LocalAuthentication.authenticateAsync();
    if (authorize.success) {
      clearInputs();
      unlockApplication();
    }
  };

  return (
    <Modal
      visible={visible}
      className="flex-1 flex flex-columns justify-between"
    >
      <View className="justify-center flex-col gap-6 flex-1 mt-7">
        <Text style={{ fontFamily: "Nunito-SemiBold" }} className="text-center">
          Enter passcode
        </Text>

        <Animated.View style={[style.textFieldContainer, rStyle]}>
          {passcodeArea.map((inpput, index) => (
            <InputField
              isValid={isvalid}
              isInavlid={isInvalid}
              {...inpput}
              key={"passcode-field-input" + index}
            />
          ))}
        </Animated.View>
      </View>

      <NumPad
        onDelete={handleDelete}
        onChange={handleInputChange}
        onpressBiomtricAuthorization={authorizeWithBiometricCredentials}
      />
    </Modal>
  );
};

const style = StyleSheet.create({
  textFieldContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  textFieldValue: {
    fontSize: 30,
    position: "relative",
    top: 5,
  },

  redText: {
    color: "#ee1717",
  },
});

export default LockeScreen;
