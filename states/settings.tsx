import { create } from "zustand";

interface Setting {
  password: string;
  AllowBiomtricCrediential: boolean;
  setSetting: (settings: Record<string, any>) => any;
  passwordIv?: string,
  passwordSalt?: string,
}

export const useSettings = create<Setting>((set) => ({
  password: "",
  AllowBiomtricCrediential: true,
  setSetting: (incomingSetting) => set({ ...incomingSetting }),
  passwordIv: "",
  passwordSalt: ""
}));
