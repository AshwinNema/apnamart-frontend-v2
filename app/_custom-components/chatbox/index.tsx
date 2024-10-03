import { createContext, Dispatch, ReactNode, SetStateAction } from "react";
import Widget from "./src";
import { ChatIcon } from "./src/assets";
import { ChatboxStoreProvider } from "./src/store";
import { anyFunction } from "./src/utils/interfaces & types & constants";
export { assignDateKey } from "./src/utils/interfaces & types & constants";
import { Message, MessagesState } from "./src/store/types";
export {
  default as useChatDataManager,
  prevMsgsHandler,
  forwardMsgsHandler,
} from "./src/store/hooks/useChatDataManager";
export { type chatboxStoreApi } from "./src/store";

export type chatBoxProps = {
  handleToggle?: anyFunction;
  resizable?: boolean;
  title?: ReactNode;
  subtitle?: string;
  initialMessages?: Message[];
  customAddMsg?: (msg: string, clearInput: () => void) => void;
  stateConfig: [MessagesState, Dispatch<SetStateAction<MessagesState>>];
};

export const WidgetContext = createContext<null | {
  title: chatBoxProps["title"];
  subtitle: chatBoxProps["subtitle"];
  handleToggle: chatBoxProps["handleToggle"];
  resizable: chatBoxProps["resizable"];
  initialMessages: chatBoxProps["initialMessages"];
  customAddMsg: chatBoxProps["customAddMsg"];
  stateConfig: chatBoxProps["stateConfig"];
}>(null);

const Chatbox = ({
  title = "Welcome",
  subtitle = "This is your chat subtitle",
  ...props
}: chatBoxProps) => {
  return (
    <ChatboxStoreProvider>
      <WidgetContext.Provider
        value={{
          title: title,
          subtitle: subtitle,
          handleToggle: props.handleToggle,
          resizable: props.resizable,
          initialMessages: props.initialMessages,
          customAddMsg: props.customAddMsg,
          stateConfig: props.stateConfig,
        }}
      >
        <Widget />
      </WidgetContext.Provider>
    </ChatboxStoreProvider>
  );
};

export { Chatbox, ChatIcon };
