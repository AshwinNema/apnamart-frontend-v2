"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";
import { type chatBoxStore, createChatboxStore } from "./store";
export type chatboxStoreApi = ReturnType<typeof createChatboxStore>;
export const ChatboxStoreContext = createContext<chatboxStoreApi | undefined>(
  undefined,
);

export interface chatboxStoreProviderProps {
  children: ReactNode;
}

export const ChatboxStoreProvider = ({
  children,
}: chatboxStoreProviderProps) => {
  const storeRef = useRef<chatboxStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createChatboxStore();
  }

  return (
    <ChatboxStoreContext.Provider value={storeRef.current}>
      {children}
    </ChatboxStoreContext.Provider>
  );
};

export const useChatboxStore = <T,>(
  selector: (store: chatBoxStore) => T,
): T => {
  const chatboxStoreContext = useContext(ChatboxStoreContext);
  if (!chatboxStoreContext) {
    throw new Error("Chatbox context not found");
  }
  return useStore(chatboxStoreContext, selector);
};
