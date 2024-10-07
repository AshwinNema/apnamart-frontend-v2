import { createStore } from "zustand/vanilla";
import { behaviourState, createBehaviourSlice } from "./slice";

export type CounterState = {
  count: number;
};

export type chatBoxStore = behaviourState;

export const createChatboxStore = () => {
  return createStore<chatBoxStore>()((...args) => ({
    ...createBehaviourSlice(...args),
  }));
};
