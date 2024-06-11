import { create } from "zustand";

type State = {
  updateBiometricConfigurationsAggreements: (value: boolean) => void;
  allowBiometricAthentication: boolean;
  triedSubmit: boolean;
  password: {
    value: string;
    valid: boolean;
    errorMessage?: string;
  };
  confirmPassword: {
    value: string;
    valid: boolean;
    errorMessage?: string;
  };
};

type Action = {
  updatePassword: (psssword: string) => void;
  updatePasswordConfirmation: (confirmation: string) => void;
  updateTrySubmit: () => void;
};

// Create your store, which includes both state and (optionally) actions
export const usePasswordForm = create<State & Action>((set, get) => ({
  allowBiometricAthentication: false,
  triedSubmit: false,
  password: {
    value: "",
    valid: false,
    errorMessage: "Minimum 6 characters, 1 number",
  },

  confirmPassword: {
    value: "",
    valid: false,
    errorMessage: "Not eqal",
  },

  updatePassword: (value: string) => {
    const pattern = /^(?=.*\d)[A-Za-z\d]{6,}$/; //validation pattern

    const newValue: State["password"] = {
      valid: pattern.test(value),
      value: value,
    };

    return set(({ password }) => ({ password: { ...password, ...newValue } }));
  },

  updatePasswordConfirmation: (value) => {
    const newValue: State["confirmPassword"] = {
      value: value,
      valid: value === get().password.value,
    };

    return set(({ confirmPassword }) => ({
      confirmPassword: { ...confirmPassword, ...newValue },
    }));
  },

  updateTrySubmit: () => set({ triedSubmit: true }),
  updateBiometricConfigurationsAggreements: (value: boolean) =>
    set({ allowBiometricAthentication: value }),
}));
