import {
  messageSenderType,
  MessagesState,
} from "@/app/_custom-components/chatbox/src/store/types";
import { messageBoxStatusTypes } from "@/app/_custom-components/chatbox/src/utils/interfaces & types & constants";
import { getLocalStorageKey, storageAttributes } from "@/app/_services";
import { UserInterface, UserRole } from "@/lib/main/slices/user/user.slice";

export interface chatMsg {
  id: number;
  message: string;
  messageTime: Date;
  senderId: number;
  receiverId: number | null;
  senderMsgStatus: messageBoxStatusTypes;
  receivedMsgStatus: messageBoxStatusTypes;
}

export const transformChatMsgs = (
  msgs: chatMsg[],
): MessagesState["messages"] => {
  return msgs.map((msg) => {
    const user = getLocalStorageKey(storageAttributes.user) as UserInterface;
    const role = user?.role;
    //   // A user is the sender of the message when
    //   // 1. User has sent the message
    //   // 2. Currently admin has logged in, so even if 1st point is not valid all the admins are consider as a responder to the message
    const isSender = msg.senderId === user?.id || role !== UserRole.merchant;
    return {
      senderType: isSender
        ? messageSenderType.client
        : messageSenderType.response,
      timestamp: new Date(msg.messageTime),
      status: isSender ? msg.senderMsgStatus : msg.receivedMsgStatus,
      id: msg.id,
      text: msg.message,
    };
  });
};
