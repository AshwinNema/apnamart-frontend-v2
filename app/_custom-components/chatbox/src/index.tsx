import { anyFunction } from "./utils/interfaces & types & constants";
import Conversation from "./components/Conversation";
import Launcher from "./components/Launcher";
import { useChatboxStore } from "./store";
import { chatBoxProps } from "..";
import { useEffect, useRef } from "react";

type Props = {
  title: chatBoxProps["title"];
  subtitle: string;
  handleToggle?: anyFunction;
  resizable?: boolean;
  initalMessages: chatBoxProps["initalMessages"];
};

function Widget({
  title,
  subtitle,
  handleToggle,
  resizable,
  initalMessages,
}: Props) {
  const toggleChat = useChatboxStore((state) => state.toggleChat);
  const isLoaded = useRef(false)
  const addMultipleMessages = useChatboxStore(
    (state) => state.addMultipleMessages,
  );
  const showChat = useChatboxStore((state) => state.showChat);
  const toggleConversation = () => {
    toggleChat();
    handleToggle ? handleToggle(showChat) : null;
  };

  useEffect(() => {
    if (!isLoaded.current) initalMessages && addMultipleMessages(initalMessages);
    isLoaded.current = true
  }, [initalMessages]);

  return (
    <>
      <div className={`flex flex-col bottom-0 right-0 fixed mr-5 mb-5 z-10`}>
        {showChat && (
          <Conversation
            title={title}
            subtitle={subtitle}
            resizable={resizable}
          />
        )}
        <Launcher toggle={toggleConversation} />
      </div>
    </>
  );
}

export default Widget;
