import { createStore } from "zustand/vanilla";
import {
  behaviourState,
  createBehaviourSlice,
  createMessageSlice,
  messageState,
} from "./slice";

export type CounterState = {
  count: number;
};

export type chatBoxStore = behaviourState & messageState;

export const createChatboxStore = () => {
  return createStore<chatBoxStore>()((...args) => ({
    ...createBehaviourSlice(...args),
    ...createMessageSlice(...args),
  }));
};
