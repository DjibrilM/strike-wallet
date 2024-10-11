import { Pressable } from "../Tailwind";
import { ActivityIndicator } from "react-native";
import React from "react";
import { cn } from "../../utils/cn";
import { Platform, PressableProps } from "react-native";
import { Text } from "../Tailwind";
import Visible from "../Common/Visibility";

interface PrimaryProps extends PressableProps {
  className?: string;
  children?: React.JSX.Element[] | React.JSX.Element;
  label?: string;
  loading?: boolean;
  labelClassName?: string
}

const Primary: React.FC<PrimaryProps> = ({
  className,
  children,
  label,
  loading,
  labelClassName,
  ...props
}) => {
  return (
    <Pressable
      {...props}
      disabled={props.disabled || loading}
      android_ripple={{ color: "#ffffff33" }}
      className={cn(
        " bg-blueDefault justify-center relative shadow-md  flex items-center flex-row rounded-[10px] min-h-[60px] active:bg-blueDark",
        {
          "bg-slate-400": props.disabled,
          "rounded-[15px]": Platform.OS === "ios",
        }
      )}
    >
      <Visible condition={loading || false}>
        <ActivityIndicator
          color={"white"}
          style={{ position: "absolute", left: 20 }}
        />
      </Visible>
      {label ? (
        <Text
          style={{ fontFamily: "Nunito-Bold" }}
          className={cn("opacity-50 text-white  opacity-1000", labelClassName, {
            "text-slate-500": props.disabled,
          })}
        >
          {label}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
};

const Button: React.FC<PrimaryProps> = ({ children, className, ...props }) => {
  return <Primary {...props} children={children} className={className} />;
};

export default Button;
