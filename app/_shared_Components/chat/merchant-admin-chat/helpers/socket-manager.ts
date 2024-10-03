import {
  getLocalStorageKey,
  sendSocketData,
  storageAttributes,
} from "@/app/_services";
import {
  socketEvents,
  webSocketEndPoints,
  webSocketReadyState,
} from "@/app/_utils";
import { UserInterface, UserRole } from "@/lib/main/slices/user/user.slice";
import * as _ from "lodash";
import { MutableRefObject } from "react";
import { chatMsg } from "./transformer";

export interface chatSupportConfig {
  limit: number;
}

export interface socketChatHandlerData {
  data: chatMsg[];
  totalResults?: number;
  newMsg?: boolean;
}

export const establishSocketConnection = (
  config: chatSupportConfig,
  socketRef: MutableRefObject<WebSocket | null>,
  addMsgs: (
    data: socketChatHandlerData,
    messageType: "forward" | "backward",
  ) => void,
) => {
  const socketConnection = new WebSocket(webSocketEndPoints.CHAT, []);
  socketConnection.onopen = function () {
    const options: {
      limit: number;
      role?: UserRole;
    } = _.pick(config, ["limit"]);
    const user = getLocalStorageKey(storageAttributes.user) as UserInterface;
    options.role = user?.role;
    sendSocketData(
      socketConnection,
      socketEvents.initiateMerchantAdminChat,
      options,
      true,
    );
    socketConnection.onmessage = function (data) {
      const chatData = JSON.parse(data.data);

      switch (chatData?.event) {
        case socketEvents.initiateMerchantAdminChat:
          addMsgs(
            {
              data: chatData.results.reverse(),
              totalResults: chatData.totalResults,
            },
            "forward",
          );
          break;

        case socketEvents.sendMerchantAdminChatMsg:
          addMsgs(
            {
              data: [chatData.data],
              newMsg: true,
            },
            "forward",
          );
          break;
        default:
          break;
      }
    };
  };
  socketRef.current = socketConnection;
};

export const sendChatMsg = (socket: WebSocket | null, message: string) => {
  if (!socket) return;
  const isSocketOpen = socket.readyState === webSocketReadyState.OPEN_STATE;
  if (!isSocketOpen) return;
  return sendSocketData(socket, socketEvents.sendMerchantAdminChatMsg, message);
};
