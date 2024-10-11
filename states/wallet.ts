import { create } from "zustand";
import { EthereumToken, MoralisToken } from "../utils/shared/types";
import { number } from "bitcoinjs-lib/src/script";

export interface State {
  mnemonicArray?: string[];
  mnemonicCompactedString?: string;
  mnemonicSeparatedString?: string;
  seed?: Buffer | null;
  privateKey: string;
  address: string;
  publicKey: string;
  nativeUsdBalance?: number;
  nativeEthereumBalance?: number;
  showBalance?: boolean;
  ethereumTokens?: EthereumToken[];
}

export interface Actions {
  toggleBalanceVisibility: () => void;
  setWallet: (state: State) => void;
  updateNativeEthreumBalance: (amount: number) => void;
  updateUsdEthreumBalance: (amount: number) => void;
  updateNativeBalances: ({ eth, usd }: { eth: number; usd: number }) => void;
  appendToEthereumToken: (token: EthereumToken) => void;
  getThereumTokensTotalBalance: () => number;
}

export const useWallet = create<State & Actions>((set, get) => ({
  mnemonicArray: [],
  seed: null,
  mnemonicCompactedString: "",
  mnemonicSeparatedString: "",
  privateKey: "",
  address: "",
  publicKey: "",
  nativeUsdBalance: 0,
  nativeEthereumBalance: 0,
  showBalance: true,
  ethereumTokens: [],

  //Actions
  setWallet: (state) => set({ ...state }),

  updateNativeEthreumBalance: (incomingBalance) => {
    set({ nativeEthereumBalance: incomingBalance });
  },

  updateUsdEthreumBalance: (incomingBalance) => {
    set({ nativeUsdBalance: incomingBalance });
  },

  updateNativeBalances: ({ eth, usd }: { eth: number; usd: number }) =>
    set({ nativeEthereumBalance: eth, nativeUsdBalance: usd }),

  toggleBalanceVisibility: () => set({ showBalance: !get().showBalance }),

  appendToEthereumToken: (incomingToken: EthereumToken) => {
    const tokenList = get().ethereumTokens!;

    const findTokenIndex =
      tokenList?.findIndex(
        (token) => token.tokenAddress === incomingToken.tokenAddress
      ) || 0;

    if (findTokenIndex >= 0) {
      tokenList[findTokenIndex] = {
        ...incomingToken,
        tokenAddress: incomingToken.tokenAddress,
      };

      set({ ethereumTokens: tokenList });
    } else {
      tokenList.push({
        ...incomingToken,
        tokenAddress: incomingToken.tokenAddress,
      });
      set({ ethereumTokens: tokenList });
    }
  },

  getThereumTokensTotalBalance: () => {
    const totalBalance =
      get().ethereumTokens?.reduce(
        (acc, currentElement) => acc + currentElement.usdBalance,
        0
      ) || 0;

    return totalBalance;
  },
}));
