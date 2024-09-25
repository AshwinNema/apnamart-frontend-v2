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
  componentType: componentType;
  senderName: string;
  senderType: messageSenderType;
  timestamp: Date;
  status: MessageBoxType["status"];
  id: string | number;
  props?: any;
  text: string;
}

export interface MessagesState {
  messages: Message[];
  badgeCount: number;
  dateMap: {
    [date: string]: true;
  };
}
