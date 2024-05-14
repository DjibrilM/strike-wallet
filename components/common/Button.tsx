import { Pressable } from "../Tailwind";
import React from "react";
import { cn } from "../../util/cn";
import { PressableProps } from "react-native";
import { StyledProps } from "nativewind";
import { View } from "react-native";

interface PrimaryProps extends PressableProps {
  className?: string;
  children: React.JSX.Element[] | React.JSX.Element;
}

const Primary: React.FC<PrimaryProps> = ({ className, children, ...props }) => {
  return (
    <Pressable
      {...props}
      android_ripple={{ color: "#ffffff33" }}
      className={cn(
        "bg-slate-700 justify-center flex items-center rounded-lg min-h-[55px] active:bg-slate-800"
      )}
    >
      {children}
    </Pressable>
  );
};

const Button: React.FC<PrimaryProps> = ({ children, className, ...props }) => {
  return <Primary {...props} children={children} className={className} />;
};

export default Button;
