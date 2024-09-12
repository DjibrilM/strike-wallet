import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";


import {
  useQuery,
  useQueryClient
} from '@tanstack/react-query'
import { TokenSelectionParams } from "../utils/shared/types";

import TokenListElement from "../components/TokenListElement";
import { SafeAreaView, View, Text } from "../components/Tailwind";
import { MoralisToken } from "../utils/shared/types";
import AnimatedScrollView from "../components/Common/AnimatedScrollView";
import { useNavigation } from "@react-navigation/native";
import TokensList from "../components/TokensList";
import { backendBaseuRL, routes } from "../utils/shared/constant";
import useNavigationParam from "../utils/hooks/useNavigationParam";
import queryKeys from "../utils/queryKeys";
import Button from "../components/Widgets/Button";
import Visible from "../components/Common/Visibility";
import useDBqueries from "../utils/hooks/useDBqueries";
import { useTokensStore } from "../states/token.state";

const fetcher = (url: string) => fetch(url).then(async (res) => {
  return await res.json()
});

const TokenSelection = () => {
  const { addToken: addTokenToStore } = useTokensStore();
  const [isAdding, setIsAdding] = useState(false);
  const { addToken } = useDBqueries();
  const [selectedCount, setSelectedCount] = useState<number>(0)
  const selectedTokens = useRef<MoralisToken[]>([]);
  const queryClient = useQueryClient();
  const searachWaitingInterval = useRef<NodeJS.Timeout>();
  const navigation = useNavigation();
  const params = useNavigationParam<TokenSelectionParams>();
  const [seachResults, setSearchResults] = useState<MoralisToken[]>([]);


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
    const tokens = [...selectedTokens.current];

    const findAlreadySelectedToken = tokens.findIndex((tk) => tk.contract_address === selectedToken.contract_address);

    if (findAlreadySelectedToken >= 0) {
      const removeExisting = tokens.filter((token) => token.contract_address !== selectedToken.contract_address);
      selectedTokens.current = [...removeExisting];
    }

    else {
      selectedTokens.current.push(selectedToken);
    }

    setSelectedCount(selectedTokens.current.length);
  }

  const addTokensToLocalDatabase = async () => {
    setIsAdding(true);

    try {
      for (let index = 0; index < selectedTokens.current.length; index++) {
        console.log(selectedTokens.current[index]);
        await addToken(selectedTokens.current[index])
        addTokenToStore(selectedTokens.current[index]);
        if (index === selectedTokens.current.length - 1) {
          setIsAdding(false);
          navigation.navigate(routes.home as never);
        }
      }
    } catch (error) {
      console.log(error);
    }

  }

  const searchTokens = useCallback((text: string) => {
    if (text.trim() === ' ') {
      setSearchResults([]);
      return
    };
    const findTokens = data?.filter((token) => token.token_name.toLowerCase().includes(text.toLowerCase())) || [];
    console.log(findTokens && findTokens)
    setSearchResults(findTokens as MoralisToken[]);
  }, [data]
  )


  const searchInputChange = async (text: string) => {
    if (searachWaitingInterval.current) {
      clearTimeout(searachWaitingInterval.current)
    }

    searachWaitingInterval.current = setTimeout(() => {
      searchTokens(text);
    }, 1000)

    searachWaitingInterval.current
  }

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-[#0a0a0a]">
      <AnimatedScrollView onSearchTextChange={searchInputChange} isEditableTextArea onRefresh={onRefresh} searchBar>
        <Visible condition={seachResults.length > 0}>
          <View className="min-h-[100px]">
            <Text style={{ fontFamily: "Nunito-Regular" }} className="text-slate-700 px-6 pb-4">Seach results</Text>
            {seachResults.map((token, index) => (
              <TokenListElement
                index={index}
                showBalance={false}
                tokenClickAction={params.tokenSelectionScreenAction}
                dta={token}
                key={"token-search-list-element" + index}
              />
            ))}
          </View>
        </Visible>

        <TokensList showBalance={false} onSelect={onSelectToken} selectable={params.tokenSelectionScreenAction === 'Create'} skeletonCounts={10} isLoading={isLoading || isRefetching} tokens={data || [] as MoralisToken[]} tokenClickAction={params.tokenSelectionScreenAction} />
      </AnimatedScrollView>

      <Visible condition={params.tokenSelectionScreenAction === 'Create'}>
        <View className="bg-white py-2 px-4 border-t border-black/5">
          <Button loading={isAdding} disabled={selectedTokens.current.length < 1 && isAdding} onPress={addTokensToLocalDatabase} className="flex-row">
            <Text className="text-white">Add tokens</Text>
            <View className="ml-4 bg-white h-8 w-8 rounded-full flex-row justify-center items-center">

              <Text style={{ fontFamily: "Nunito-Bold" }} className="font-bold text-blueDefault">
                {selectedCount}
              </Text>
            </View>
          </Button>
        </View>
      </Visible>

    </SafeAreaView>
  );
};

export default TokenSelection;
