import { StatusBar as NativeStatusBar } from "react-native";
import { useColorScheme } from "nativewind";

export const StatusBar = () => {
  const { colorScheme } = useColorScheme();

  return (
    <NativeStatusBar
      animated={true}
      barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      backgroundColor={colorScheme === "dark" ? "black" : "white"}
    />
  );
};
