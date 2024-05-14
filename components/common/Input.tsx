import React, { useEffect, useState } from "react";
import {
  TextInputProps,
  KeyboardTypeOptions,
  StyleSheet,
  KeyboardType,
} from "react-native";
import { useSharedValue, withTiming } from "react-native-reanimated";
import Visible from "./Visibility";
import Animated from "react-native-reanimated";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";

import { View, Text, Pressable, TextInput } from "../Tailwind";
import { cn } from "../../util/cn";

interface Props extends TextInputProps {
  className?: string;
  type?: KeyboardTypeOptions;
  errorMessage?: string;
}

const Input: React.FC<Props> = ({
  className,
  type,
  errorMessage,
  ...props
}) => {
  const top = useSharedValue(23);
  const fontSize = useSharedValue(14);
  const [value, setValue] = useState(props.defaultValue || "");
  const [hide, setHide] = useState(true);

  const togleFocus = () => {
    top.value = withTiming(8, { duration: 200 });
    fontSize.value = withTiming(10, { duration: 200 });
  };

  const onBlur = () => {
    if (value.length < 1 && (props.value?.length || 0) < 1) {
      top.value = withTiming(20, { duration: 200 });
      fontSize.value = withTiming(14, { duration: 200 });
    }
  };


  useEffect(() => {
    if ((props.value?.length || 0) > 0) togleFocus();
  }, []);

  useEffect(() => {
    if ((props.defaultValue?.length || "".length) > 1) togleFocus();
  }, []); // focus the input if the default value is not null

  return (
    <View
      className={cn(
        "w-full border relative rounded-lg h-[65px] flex flex-row items-center border-gray-300 p-3 bg-white"
      )}
    >
      <TextInput
        {...props}
        secureTextEntry={type === "visible-password" ? hide : false}
        onChangeText={(text) => {
          setValue(text);
          props?.onChangeText && props.onChangeText(text);
        }}
        onBlur={onBlur}
        onPointerCancel={onBlur}
        onFocus={togleFocus}
        placeholder=""
        style={styles.input}
        value={props.value}
      />

      <Animated.Text
        style={[{ top: top, fontSize: fontSize }, styles.placeHolder]}
      >
        {props.placeholder || ""}
      </Animated.Text>
      <Text
        style={styles.Nunito_Regula}
        className="absolute bottom-[-17px] text-slate-500 text-[12px] text-right w-full ml-2"
      >
        {errorMessage}
      </Text>

      <Visible condition={type === "visible-password"}>
        <Pressable onPress={() => setHide(!hide)} className="">
          <Visible condition={hide}>
            <AntDesign name="eyeo" size={24} color="#64748b" />
          </Visible>

          <Visible condition={!hide}>
            <Feather name="eye-off" size={24} color="#64748b" />
          </Visible>
        </Pressable>
      </Visible>
    </View>
  );
};

const styles = StyleSheet.create({
  placeHolder: {
    position: "absolute",
    color: "#64748b",
    marginHorizontal: 15,
    zIndex: 1,
  },
  Nunito_Regula: {
    fontFamily: "Nunito-Regula",
  },
  input: {
    fontFamily: "Nunito-Regular",
    height: "100%",
    zIndex: 2,
    flex: 1,
    marginTop: 5,
  },
});

export default Input;
