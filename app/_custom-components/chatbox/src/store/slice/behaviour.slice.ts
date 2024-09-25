import { StateCreator } from "zustand";

export interface behaviourState {
  showChat: boolean;
  toggleChat: () => void;
}

const initialState = {
  showChat: false,
};

export const createBehaviourSlice: StateCreator<
  behaviourState,
  [],
  [],
  behaviourState
> = (set) => ({
  ...initialState,
  toggleChat: () =>
    set((state) => ({
      showChat: !state.showChat,
    })),
});
