import { StatusBar as NativeStatusBar } from "react-native";

export const StatusBar = () => (
    <NativeStatusBar animated={true} barStyle={'dark-content'} backgroundColor={'white'} />
);
