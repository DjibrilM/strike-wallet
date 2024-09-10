import React, { useLayoutEffect, useState } from "react";
import { ScrollView } from "../components/Tailwind";
import { useRoute } from "@react-navigation/native";

import {
  useQuery,
  useQueryClient
} from '@tanstack/react-query'
import { TokenSelectionParams } from "../utils/shared/types";

import { SafeAreaView } from "../components/Tailwind";
import { MoralisToken } from "../utils/shared/types";
import AnimatedScrollView from "../components/Common/AnimatedScrollView";
import { useNavigation } from "@react-navigation/native";
import TokensList from "../components/TokensList";
import { backendBaseuRL } from "../utils/shared/constant";
import useNavigationParam from "../utils/hooks/useNavigationParam";
import queryKeys from "../utils/queryKeys";

const fetcher = (url: string) => fetch(url).then(async (res) => {
  return await res.json()
});

const TokenSelection = () => {
  const [selectedTokens, setSelectedTokens] = useState<MoralisToken[]>([]);
  const queryClient = useQueryClient()
  const navigation = useNavigation();
  const params = useNavigationParam<TokenSelectionParams>();

  const { isLoading, data, isRefetching } = useQuery<MoralisToken[]>({
    queryKey: [queryKeys.erc20Refresher], queryFn: () => fetcher(`${backendBaseuRL}tokens/get-top`)
  })

  useLayoutEffect(() => {
    navigation.setOptions({ title: params.title || "Tokens" });
  }, []);

  const onRefresh = () => {
    queryClient.invalidateQueries({ queryKey: [queryKeys.erc20Refresher] })
  }

  const onSelectToken = (selectedToken: MoralisToken) => {
    const tokens = [...selectedTokens];
    const findAlreadySelectedToken = selectedTokens.findIndex((tk) => tk.contract_address === selectedToken.contract_address);

    if (Boolean(Boolean(findAlreadySelectedToken) && findAlreadySelectedToken !== - 1)) {
      tokens.splice(findAlreadySelectedToken, 1);
      setSelectedTokens(tokens);
    }

    else {
      tokens.push(selectedToken);
      setSelectedTokens(tokens)
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-[#0a0a0a]">
      <AnimatedScrollView onRefresh={onRefresh} searchBar>
        <TokensList selectedTokens={selectedTokens} onSelect={onSelectToken} selectable={params.tokenSelectionScreenAction === 'Create'} skeletonCounts={10} isLoading={isLoading || isRefetching} tokens={data || [] as MoralisToken[]} tokenClickAction={params.tokenSelectionScreenAction} />
      </AnimatedScrollView>
    </SafeAreaView>
  );
};

export default TokenSelection;
