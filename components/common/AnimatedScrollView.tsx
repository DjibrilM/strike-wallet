import React, { ReactNode } from "react";
import Visible from "./Visibility";
import { View, Pressable, Text } from "../Tailwind";
import { useColorScheme } from "nativewind";
import EvilIcons from "@expo/vector-icons/EvilIcons";

import Animated, {
  useAnimatedScrollHandler,
  useAnimatedRef,
  useSharedValue,
  withTiming,
  SharedValue,
} from "react-native-reanimated";

type Props = {
  isSearchBarcClickable?: boolean;
  searchBarType?: "click" | "input";
  searchBar: boolean;
  searchBardPrefix?: React.JSX.Element[] | React.JSX.Element;
  children: ReactNode;
  onscroll?: (scrollY: number) => void;
};

const AnimatedScrollView: React.FC<Props> = ({
  searchBar,
  children,
  searchBardPrefix,
  onscroll,
}) => {
  const animatedRef = useAnimatedRef<Animated.ScrollView>();
  const top = useSharedValue(-100);
  const { colorScheme } = useColorScheme();

  const scrollHandler = useAnimatedScrollHandler((event) => {
    if (event.contentOffset.y > 227) {
      top.value = withTiming(0);
    } else {
      top.value = withTiming(-100);
    }
    onscroll?.(event.contentOffset.y);
  });

  return (
    <>
      <Visible condition={searchBar}>
        <Animated.View
          style={{
            paddingHorizontal: 15,
            backgroundColor: colorScheme === "dark" ? "#121212" : "white",
            borderBottomWidth: 0.5,
            borderColor: "#0000001a",
            width: "100%",
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            top: top,
            zIndex: 30,
            display: "flex",
            flexDirection: "row",
            gap: 10,
            borderBottomColor: colorScheme === "dark" ? "#ffffff1f" : "white",
            borderTopColor: colorScheme === "dark" ? "#3535351f" : "white",
            borderWidth: 1,
          }}
        >
          <View className="py-2 flex-1  bg-white dark:bg-[#0f0e0e00]">
            <Pressable
              onPress={() => {}}
              android_ripple={{ color: "#ffffff33" }}
              className="h-12 px-4 bg-slate-100 dark:bg-[#1f1f1f] flex-row flex w-full items-center rounded-lg"
            >
              <EvilIcons name="search" size={24} color="#64748b" />
              <Text
                style={{ fontFamily: "Nunito-Regular" }}
                className="text-slate-500 ml-2"
              >
                Search
              </Text>
            </Pressable>
          </View>

          {searchBardPrefix}
        </Animated.View>
      </Visible>

      <Animated.ScrollView onScroll={scrollHandler} ref={animatedRef}>
        <Visible condition={searchBar}>
          <View className="px-6">
            <Pressable
              onPress={() => {}}
              android_ripple={{ color: "#ffffff33" }}
              className="h-14 bg-slate-100 flex-row dark:bg-[#222] flex px-4 items-center my-6 rounded-lg"
            >
              <EvilIcons name="search" size={24} color="#64748b" />
              <Text
                style={{ fontFamily: "Nunito-Regular" }}
                className="text-slate-500 ml-2"
              >
                Search
              </Text>
            </Pressable>
          </View>
        </Visible>
        {children}
      </Animated.ScrollView>
    </>
  );
};

export default AnimatedScrollView;
