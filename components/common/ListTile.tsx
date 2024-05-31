import React from "react";
import { View } from "../Tailwind";
import { cn } from "../../util/cn";

interface Props {
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
}) => {
  return (
    <View
      className={cn(
        "flex items-center flex-row  justify-between",
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
    </View>
  );
};

export default ListTile;
