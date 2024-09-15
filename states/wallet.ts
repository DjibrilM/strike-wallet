import { create } from "zustand";

export interface State {
  mnemonicArray?: string[];
  mnemonicCompactedString?: string;
  mnemonicSeparatedString?: string;
  seed?: Buffer | null;
  privateKey: string;
  address: string;
  publicKey: string;
  nativeUsdBalance: number;
  nativeEthereumBalance: number;
  showBalance: boolean;
}

export interface Actions {
  toggleBalanceVisibility: () => void;
  setWallet: (state: State) => void;
  updateNativeEthreumBalance: (amount: number) => void;
  updateUsdEthreumBalance: (amount: number) => void;
  updateNativeBalances: ({ eth, usd }: { eth: number, usd: number }) => void;
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

  //Actions
  setWallet: (state) => set({ ...state }),
  updateNativeEthreumBalance: (incomingBalance) => {
    set({ nativeEthereumBalance: incomingBalance });
  },

  updateUsdEthreumBalance: (incomingBalance) => {
    set({ nativeUsdBalance: incomingBalance });
  },

  updateNativeBalances:({eth,usd}:{eth:number,usd:number})=> set({nativeEthereumBalance:eth,nativeUsdBalance:usd}),
  toggleBalanceVisibility: () => set({ showBalance: !get().showBalance }),
}));
