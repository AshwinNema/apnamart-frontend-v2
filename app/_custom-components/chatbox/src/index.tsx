import Conversation from "./components/Conversation";
import Launcher from "./components/Launcher";
import { useChatboxStore } from "./store";
import { WidgetContext } from "..";
import { useContext } from "react";

function Widget() {
  const widgetProps = useContext(WidgetContext);
  const toggleChat = useChatboxStore((state) => state.toggleChat);
  const showChat = useChatboxStore((state) => state.showChat);
  const toggleConversation = () => {
    const handleToggle = widgetProps?.handleToggle;
    toggleChat();
    handleToggle ? handleToggle(showChat) : null;
  };

  if (!widgetProps) return null;

  return (
    <>
      <div className={`flex flex-col bottom-0 right-0 fixed mr-5 mb-5 z-10`}>
        {showChat && <Conversation />}
        <Launcher toggle={toggleConversation} />
      </div>
    </>
  );
}

export default Widget;
