import { create } from "zustand";
import { MoralisToken } from "../utils/shared/types";
interface State {
  tokens: MoralisToken[];
}
interface Actions {
  updateTokens: (tokens: MoralisToken[]) => void;
  addToken: (token: MoralisToken) => void;
}
export const useTokensStore = create<State & Actions>((set, get) => ({
  tokens: [],
  updateTokens: (tokens) => {
    set({ tokens });
  },

  addToken: (token) => {
    const prevValue = get().tokens;
    prevValue.push(token);
    set({ tokens: prevValue });
  },
}));
