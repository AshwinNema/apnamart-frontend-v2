import { StateCreator } from "zustand";
import { Message, MessagesState } from "../types";
import { produce } from "immer";

export interface messageState extends MessagesState {
  addMessage: (details: Message) => void;
  setBadgeCount: (count: number) => void;
  addMsgsAndKey: (details: Message[], key: string) => void;
  addMultipleMessages: (details: Message[]) => void;
}

const initialState = {
  messages: [],
  badgeCount: 0,
  dateMap: {},
};

export const createMessageSlice: StateCreator<
  messageState,
  [],
  [],
  messageState
> = (set) => ({
  ...initialState,
  addMessage: (details: Message) =>
    set(
      produce((state) => {
        state.messages.push(details);
      }),
    ),
  setBadgeCount: (badgeCount) => set(() => ({ badgeCount })),
  addMsgsAndKey: (details: Message[], key: string) =>
    set(
      produce((state) => {
        {
          (state.dateMap[key] = true), state.messages.push(...details);
        }
      }),
    ),
  addMultipleMessages: (details: Message[]) =>
    set(
      produce((state) => {
        state.messages.push(...details);
      }),
    ),
});
