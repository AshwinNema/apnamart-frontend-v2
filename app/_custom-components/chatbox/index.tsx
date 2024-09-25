import { ReactNode } from "react";
import Widget from "./src";
import { ChatIcon } from "./src/assets";
import { ChatboxStoreProvider } from "./src/store";
import { anyFunction } from "./src/utils/interfaces & types & constants";
import { Message } from "./src/store/types";

export type chatBoxProps = {
  handleToggle?: anyFunction;
  resizable?: boolean;
  title?: ReactNode;
  subtitle?: string;
  initalMessages?: Message[];
};

const Chatbox = ({
  title = "Welcome",
  subtitle = "This is your chat subtitle",
  ...props
}: chatBoxProps) => {
  return (
    <ChatboxStoreProvider>
      <Widget
        title={title}
        subtitle={subtitle}
        handleToggle={props.handleToggle}
        resizable={props.resizable}
        initalMessages={props.initalMessages}
      />
    </ChatboxStoreProvider>
  );
};

export { Chatbox, ChatIcon };
