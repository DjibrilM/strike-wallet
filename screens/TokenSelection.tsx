import React, { useLayoutEffect } from "react";
import { ScrollView } from "../components/Tailwind";
import { useRoute } from "@react-navigation/native";
import { TokenSelectionParams } from "../util/shared/types";

import { SafeAreaView, Text } from "../components/Tailwind";
import AnimatedScrollView from "../components/Common/AnimatedScrollView";
import { useNavigation } from "@react-navigation/native";
import CurrencyHomeList from "../components/CurrencyHomeList";

const TokenSelection = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as TokenSelectionParams;

  useLayoutEffect(() => {
    navigation.setOptions({ title: params.title || "Tokens" });
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <AnimatedScrollView searchBar>
        <CurrencyHomeList />
      </AnimatedScrollView>
    </SafeAreaView>
  );
};

export default TokenSelection;
