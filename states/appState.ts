import { create } from "zustand";
import { AppStateStatus } from "react-native";
type ApplocationState = AppStateStatus;

export const useAppStateStore = create<{
  currentApplication: ApplocationState;
  updateCurrentApplicationState: (state: ApplocationState) => void;
  isApplicationLocked: boolean;
}>((set, get) => ({
  currentApplication: "active",
  isApplicationLocked: false,
  updateCurrentApplicationState: (incomingState: ApplocationState) => {
    if (
      incomingState === "background" ||
      incomingState === "inactive" ||
      incomingState === "extension"
    ) {
      set({ currentApplication: incomingState, isApplicationLocked: true });
    } else {
      set({ currentApplication: incomingState });
    }
  },
}));
