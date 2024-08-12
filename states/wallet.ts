import { create } from "zustand";

export interface State {
  mnemonicArray?: string[];
  mnemonicCompactedString?: string;
  mnemonicSeparatedString?: string;
  seed: Buffer | null;
  privateKey: string;
  address: string;
  publicKey: string;
}

export const useWallet = create<State & { setWallet: (state: State) => void }>(
  (set) => ({
    mnemonicArray: [],
    seed: null,
    mnemonicCompactedString: "",
    mnemonicSeparatedString: "",
    privateKey: "",
    address: "",
    publicKey: "",
    setWallet: (state) => set({ ...state }),
  })
);
