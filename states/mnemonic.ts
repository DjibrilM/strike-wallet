import { create } from "zustand";

interface State {
  mnemonicArray: string[];
  mnemonicCompactedString: string;
  mnemonicSeparatedString: string;
  seed: Buffer | null;
}

export const useMnemonic = create<
  State & { addMnemonic: (state: State) => void }
>((set) => ({
  mnemonicArray: [],
  seed: null,
  mnemonicCompactedString: "",
  mnemonicSeparatedString: "",
  addMnemonic: (state) => set({ ...state }),
}));
