import React, { useRef } from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { cn } from "../../util/cn";
import { View, Text, Pressable, Image } from "../Tailwind";
import { Platform } from "react-native";

import Visible from "./Visibility";

interface Props {
  onChange: (value: number) => void;
  onDelete: () => void;
  onpressBiomtricAuthorization: () => void;
}

type Button = {
  type: "number" | "biomtericAuthorization" | "delete";
  value?: number | null;
};

const NumPad: React.FC<Props> = ({
  onpressBiomtricAuthorization,
  onChange,
  onDelete,
}) => {
  const rows = useRef<Record<number, Button[]>>({
    1: [
      { value: 1, type: "number" },
      { value: 2, type: "number" },
      { value: 3, type: "number" },
    ],
    2: [
      { value: 4, type: "number" },
      { value: 5, type: "number" },
      { value: 6, type: "number" },
    ],
    3: [
      { value: 7, type: "number" },
      { value: 8, type: "number" },
      { value: 9, type: "number" },
    ],
    4: [
      { type: "biomtericAuthorization" },
      { value: 0, type: "number" },
      { type: "delete" },
    ],
  });
  return (
    <>
      <View className="flex max-w-[400px] pb-4 w-full mx-auto justify-center">
        {Object.keys(rows.current).map((key, index) => (
          <View
            key={"numpad-row-conatiner-" + index}
            className="flex-row justify-between items-center"
          >
            {rows.current[Number(key)].map((button, index) => (
              <View
                className="rounded-full overflow-hidden w-[80px] my-3 h-[80px]"
                key={"numpad-button-conatiner-" + index}
              >
                <Pressable
                  onPress={() => {
                    if (button.type === "number") {
                      onChange(button.value as never);
                    } else if (button.type === "biomtericAuthorization") {
                      onpressBiomtricAuthorization();
                    } else if (button.type === "delete") {
                      onDelete();
                    }
                  }}
                  android_ripple={{ color: "#cccccc76", radius: 1003 }}
                  className={cn(
                    "flex items-center w-[80px] h-[80px] flex-row overflow-hidden justify-center rounded-full",
                    {
                      " active:bg-gray-50": Platform.OS === "ios",
                    }
                  )}
                >
                  <Visible condition={button.type === "number"}>
                    <Text
                      style={{ fontFamily: "Nunito-Black" }}
                      className="text-2xl font-Black"
                    >
                      {button?.value}
                    </Text>
                  </Visible>

                  <Visible condition={button.type === "delete"}>
                    <FontAwesome6 name="delete-left" size={24} color="black" />
                  </Visible>

                  <Visible condition={button.type === "biomtericAuthorization"}>
                    <Image
                      className={cn("w-10 h-10 hidden", {
                        flex: Platform.OS === "ios",
                      })}
                      source={require("../../assets/images/face-id.png")}
                    />

                    <MaterialIcons
                      style={{
                        display: Platform.OS === "android" ? "flex" : "none",
                      }}
                      name="fingerprint"
                      size={45}
                      color="black"
                    />
                  </Visible>
                </Pressable>
              </View>
            ))}
          </View>
        ))}
      </View>
    </>
  );
};

export default NumPad;
