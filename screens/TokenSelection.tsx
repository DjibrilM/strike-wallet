import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SearchBar } from "react-native-screens";
import { ActivityIndicator, FlatList } from "react-native";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";

import { TokenSelectionParams } from "../utils/shared/types";
import TokenListElement from "../components/EthereumTokenElement";
import { SafeAreaView, View, Text, TextInput } from "../components/Tailwind";
import { MoralisToken } from "../utils/shared/types";
import { backendBaseuRL } from "../utils/shared/constant";
import useNavigationParam from "../utils/hooks/useNavigationParam";
import queryKeys from "../utils/queryKeys";
import Button from "../components/Widgets/Button";
import Visible from "../components/Common/Visibility";
import useDBqueries from "../utils/hooks/useDBqueries";
import { useTokensStore } from "../states/token.state";

const fetcher = (url: string) =>
  fetch(url).then(async (res) => {
    if (!res.ok) {
      throw Error("");
    }
    return await res.json();
  });

const TokenSelection = () => {
  const { addToken: addTokenToStore } = useTokensStore();
  const [isAdding, setIsAdding] = useState(false);
  const { addToken } = useDBqueries();
  const [selectedCount, setSelectedCount] = useState<number>(0);
  const selectedTokens = useRef<MoralisToken[]>([]);
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const params = useNavigationParam<TokenSelectionParams>();
  const [searchText, setSearchText] = useState("");

  const { isLoading, data, error, refetch } = useQuery<
    MoralisToken[]
  >({
    queryKey: [queryKeys.erc20Refresher],
    queryFn: () => fetcher(`${backendBaseuRL}tokens/get-top`),
  });

  useLayoutEffect(() => {
    navigation.setOptions({ title: params.title || "Tokens" });
  }, []);

  const onRefresh = () => {
    queryClient.invalidateQueries({ queryKey: [queryKeys.erc20Refresher] });
  };

  const onSelectToken = (selectedToken: MoralisToken) => {
    const tokens = [...selectedTokens.current];

    const findAlreadySelectedToken = tokens.findIndex(
      (tk) => tk.contract_address === selectedToken.contract_address
    );

    if (findAlreadySelectedToken >= 0) {
      const removeExisting = tokens.filter(
        (token) => token.contract_address !== selectedToken.contract_address
      );
      selectedTokens.current = [...removeExisting];
    } else {
      selectedTokens.current.push(selectedToken);
    }

    setSelectedCount(selectedTokens.current.length);
  };

  const addTokensToLocalDatabase = async () => {
    setIsAdding(true);

    try {
      for (let index = 0; index < selectedTokens.current.length; index++) {
        const result = await addToken(selectedTokens.current[index]);


        if (result) {
          addTokenToStore(selectedTokens.current[index]);
        }

        if (index === selectedTokens.current.length - 1) {
          selectedTokens.current = []
          setIsAdding(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const searchInputChange = async (text: string) => {
    setSearchText(text);
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-[#0a0a0a]">
      <SearchBar />

      <View className="border-b pb-3 border-black/5">
        <View className="h-14  bg-slate-100 mx-3 flex-row dark:bg-[#222] flex px-4 items-center mt-6 rounded-lg">
          <TextInput
            onChangeText={(value) => searchInputChange(value)}
            placeholder="search"
            className="text-slate-800 h-full flex-grow pr-4 pl-2"
          />
        </View>
      </View>

      <Visible condition={!!error}>
        <View className="flex mb-4 h-4/6 w-full flex-col justify-center items-center">
          <MaterialIcons
            name="error-outline"
            size={32}
            color="black"
            style={{ marginBottom: 30 }}
          />
          <Text className="text-slate-700">Failed to load the tokens.</Text>
          <Button
            disabled={isLoading}
            onPress={() => refetch()}
            className="px-4 min-h-[40px] mt-4"
            label="Reload"
          />
        </View>
      </Visible>

      <Visible condition={isLoading}>
        <View className="h-10 flex items-center justify-end">
          <ActivityIndicator />
        </View>
      </Visible>


      <FlatList
        style={{ paddingTop: 10 }}
        data={
          data?.filter((token) =>
            token.token_name.toLowerCase().includes(searchText.toLowerCase())
          ) || ([] as MoralisToken[])
        }
        renderItem={({ item, index }) => (
          <TokenListElement
            selected={Boolean(
              selectedTokens.current.findIndex(
                (token) => token.contract_address === item.contract_address
              ) + 1
            )}
            selectable={params.tokenSelectionScreenAction === "Create"}
            onSelect={onSelectToken}
            enableFetch={false}
            index={index}
            showBalance={false}
            tokenClickAction={params.tokenSelectionScreenAction}
            dta={item}
            key={"token-search-list-element" + index}
          />
        )}
        keyExtractor={(item) => item.token_name}
      />

      <Visible condition={params.tokenSelectionScreenAction === "Create"}>
        <View className="bg-white py-2 px-4 border-t border-black/5">
          <Button
            loading={isAdding}
            disabled={selectedTokens.current.length < 1 && isAdding}
            onPress={addTokensToLocalDatabase}
            className="flex-row"
          >
            <Text className="text-white">Add tokens</Text>
            <View className="ml-4 bg-white h-8 w-8 rounded-full flex-row justify-center items-center">
              <Text
                style={{ fontFamily: "Nunito-Bold" }}
                className="font-bold text-blueDefault"
              >
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
