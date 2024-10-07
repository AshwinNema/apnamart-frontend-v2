import { MessageBoxType } from "../utils/interfaces & types & constants";

export enum componentType {
  textComponent = "Text Component",
  systemComponent = "System Component",
}
export enum messageSenderType {
  client = "client",
  response = "response",
}

export interface Message {
  senderType: messageSenderType;
  timestamp: Date;
  status: MessageBoxType["status"];
  id: string | number;
  text: string;
  hideStatusAndTime?: boolean;
}
// firstDayMap - This map store the first message for a particular day. Here
// 1.id = id of the message for that day
// 2.time = time stamp for that day

export interface MessagesState {
  messages: Message[];
  firstDayMap: {
    [date: string]: {
      id: string | number;
      time: Date;
    };
  };
  totalResults: number;
}
