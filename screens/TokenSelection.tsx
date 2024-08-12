import React, { useLayoutEffect } from "react";
import { ScrollView } from "../components/Tailwind";
import { useRoute } from "@react-navigation/native";
import { TokenSelectionParams } from "../util/shared/types";

import { SafeAreaView, Text } from "../components/Tailwind";
import AnimatedScrollView from "../components/Common/AnimatedScrollView";
import { useNavigation } from "@react-navigation/native";
import TokensList from "../components/TokensList";
import useNavigationParam from "../util/hooks/useNavigationParam";

const TokenSelection = () => {
  const navigation = useNavigation();
  const params = useNavigationParam<TokenSelectionParams>();


  useLayoutEffect(() => {
    navigation.setOptions({ title: params.title || "Tokens" });
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-[#0a0a0a]">
      <AnimatedScrollView searchBar>
        <TokensList tokenClickAction={params.tokenSelectionScreenAction} />
      </AnimatedScrollView>
    </SafeAreaView>
  );
};

export default TokenSelection;
