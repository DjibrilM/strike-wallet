import { create } from "zustand";

export const useAuthSetps = create<{
  currentStep: number;
  maxSteps: number;
  previousStep: number;

  updateSteps: (step: number) => void;
}>((set, get) => ({
  currentStep: 4,
  maxSteps: 4,
  previousStep: 0,
  updateSteps: (step: number) =>
    set({ currentStep: step, previousStep: get().currentStep }),
  updatePreviousStep: (step: number) => set({ previousStep: step }),
}));
