import { create } from "zustand";
import { AppStateStatus } from "react-native";

export interface State {
  currentApplicationStatus: AppStateStatus;
  isApplicationLocked: boolean;
  hasApplicationUnlocked: boolean;
}

export interface Action {
  updateLockState: (state: boolean) => void;
  clearSuccessCallBackFunction: () => void;
  successCallBackFunction: Function | null;
  unlockApplication: () => void;
  updateCurrentApplicationState: (state: AppStateStatus) => void;
  authenticate: (successCallback: Function) => void;
}

// The above store consists of managing the application's state,
// things like is the application inactive or Whether  the application is in the backgorund or if we should display the lock screen for authorizaion
export const useAppStateStore = create<State & Action>((set, get) => ({
  hasApplicationUnlocked: false,
  successCallBackFunction: null, //The above function will be called if the user successfully authenticates himself
  currentApplicationStatus: "active",
  isApplicationLocked: true,
  updateCurrentApplicationState: (incomingState: AppStateStatus) => {
    if (incomingState === "background") {
      set({
        currentApplicationStatus: incomingState,
        isApplicationLocked: true,
      });
    } else {
      set({ currentApplicationStatus: incomingState });
    }
  },

  unlockApplication: () => {
    const hasApplicationUnlocked = get().hasApplicationUnlocked;

    if (hasApplicationUnlocked) {
      set({ isApplicationLocked: false });
    } else {
      set({ isApplicationLocked: false, hasApplicationUnlocked: true });
    }
  },

  clearSuccessCallBackFunction: () => set({ successCallBackFunction: null }),
  updateLockState: (state) => set({ isApplicationLocked: state }),

  authenticate: (authenticate) => {
    set({ successCallBackFunction: authenticate, isApplicationLocked: true });
  },
}));
