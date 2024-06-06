import React from "react";
import { PressableProps } from "react-native";
import { Button, View } from "../Tailwind";
import { cn } from "../../util/cn";
import { Pressable } from "../Tailwind";

interface Props extends PressableProps  {
  leading?: React.JSX.Element;
  title?: React.JSX.Element;
  subtitle?: React.JSX.Element;
  trailing?: React.JSX.Element;
  conatinerClassName?: string;
}

const ListTile: React.FC<Props> = ({
  leading,
  trailing,
  conatinerClassName,
  title,
  subtitle,
  ...props
}) => {
  return (
    <Pressable
      {...props}
      android_ripple={{color:'#0000003b'}}
      className={cn(
        "flex py-2 items-center flex-row  justify-between",
        conatinerClassName
      )}
    >
      <View className="flex flex-row gap-3">
        <View>{leading}</View>
        <View className="flex flex-col">
          {title}
          {subtitle}
        </View>
      </View>

      <View className="">{trailing}</View>
    </Pressable>
  );
};

export default ListTile;
