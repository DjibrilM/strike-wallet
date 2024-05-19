import { Pressable } from "../Tailwind";
import React from "react";
import { cn } from "../../util/cn";
import { Platform, PressableProps } from "react-native";
import { Text } from "../Tailwind";

interface PrimaryProps extends PressableProps {
  className?: string;
  children?: React.JSX.Element[] | React.JSX.Element;
  label?: string;
}

const Primary: React.FC<PrimaryProps> = ({
  className,
  children,
  label,
  ...props
}) => {
  return (
    <Pressable
      {...props}
      android_ripple={{ color: "#ffffff33" }}
      className={cn(
        "bg-slate-600 justify-center shadow-md  flex items-center rounded-lg min-h-[65px] active:bg-slate-800",
        {
          "h-[60px]": Platform.OS === "android",
          "bg-slate-400": props.disabled,
        }
      )}
    >
      {label ? (
        <Text
          style={{ fontFamily: "Nunito-Bold" }}
          className={cn("opacity-50 text-white font-bold opacity-1000", {
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
