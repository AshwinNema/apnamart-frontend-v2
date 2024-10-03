import {
  Chatbox,
  useChatDataManager,
  prevMsgsHandler,
  forwardMsgsHandler,
} from "@/app/_custom-components";
import { messageSenderType } from "@/app/_custom-components/chatbox/src/store/types";
import { v4 } from "uuid";
import { MdOutlineSupportAgent } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import * as _ from "lodash";
import { messageBoxStatusTypes } from "@/app/_custom-components/chatbox/src/utils/interfaces & types & constants";
import {transformChatMsgs} from "./helpers/transformer"
import {
  chatSupportConfig,
  establishSocketConnection,
  sendChatMsg,
} from "./helpers/socket-manager";

const MerchantAdminChatSupport = () => {
  const socketRef = useRef<WebSocket | null>(null);
  const [chatConfig, setChatConfig] = useChatDataManager();
  const [config] = useState<chatSupportConfig>({
    limit: 10,
  });

  useEffect(() => {
    establishSocketConnection(config, socketRef, (data, messageType) => {
      const chatMsgs = transformChatMsgs(data.data);
      switch (messageType) {
        case "forward":
          forwardMsgsHandler(chatMsgs, setChatConfig, data.newMsg);
          break;
        case "backward":
          prevMsgsHandler(chatMsgs, setChatConfig);
          break;
        default:
          break;
      }
    });

    return () => {
      socketRef.current && socketRef.current.close();
    };
  }, []);

  return (
    <Chatbox
      stateConfig={[chatConfig, setChatConfig]}
      title={
        <div className="flex items-center gap-4 justify-center">
          <div className="flex flex-col">
            <div className="flex justify-center">
              <MdOutlineSupportAgent />
            </div>

            <div>Technical Support</div>
          </div>
        </div>
      }
      subtitle=""
      resizable={true}
      initialMessages={[
        {
          senderType: messageSenderType.response,
          timestamp: new Date(),
          status: messageBoxStatusTypes.read,
          id: v4(),
          hideStatusAndTime: true,
          text: `👋 Hello! Welcome to Apnamart! We're here to help you with anything you need. If you have questions about our platform, your profile status, or anything else, just ask! 😊
How can we assist you today?`,
        },
      ]}
      customAddMsg={(msg, clearInput) => {
        sendChatMsg(socketRef.current, msg)?.then(() => {
          clearInput();
        });
      }}
    />
  );
};

export default MerchantAdminChatSupport;
