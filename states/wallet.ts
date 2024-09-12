import { create } from "zustand";

export interface State {
  mnemonicArray?: string[];
  mnemonicCompactedString?: string;
  mnemonicSeparatedString?: string;
  seed?: Buffer | null;
  privateKey: string;
  address: string;
  publicKey: string;
  balance: number;
  showBalance: boolean;
}


export interface Actions {
  toggleBalanceVisibility: () => void;
  setWallet: (state: State) => void;
}

export const useWallet = create<State & Actions>(
  (set, get) => ({
    mnemonicArray: [],
    seed: null,
    mnemonicCompactedString: "",
    mnemonicSeparatedString: "",
    privateKey: "",
    address: "",
    publicKey: "",
    balance: 0,
    showBalance: false,

    //Actions
    setWallet: (state) => set({ ...state }),
    toggleBalanceVisibility: () => set({ showBalance: !get().showBalance }),
  })
);
