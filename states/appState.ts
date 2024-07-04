import { create } from "zustand";
import { AppStateStatus } from "react-native";
type ApplocationState = AppStateStatus;

export const useAppStateStore = create<{
  unlockApplication: () => void;
  currentApplication: ApplocationState;
  updateCurrentApplicationState: (state: ApplocationState) => void;
  isApplicationLocked: boolean;
}>((set) => ({
  currentApplication: "active",
  isApplicationLocked: true,
  updateCurrentApplicationState: (incomingState: ApplocationState) => {
    if (incomingState === "background") {
      set({ currentApplication: incomingState, isApplicationLocked: true });
    } else {
      set({ currentApplication: incomingState });
    }
  },
  unlockApplication: () => set({ isApplicationLocked: false }),
}));
