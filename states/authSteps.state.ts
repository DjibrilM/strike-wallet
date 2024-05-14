import { create } from "zustand";

export const useAuthSetps = create<{ currentStep: number; maxSteps: number }>(
  (set) => ({
    currentStep: 1,
    maxSteps: 6,
    updateSteps: (step: number) => set({ currentStep: step }),
  })
);
