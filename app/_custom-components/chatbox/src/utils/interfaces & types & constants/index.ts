export type nullable<T> = T | null;
export type anyFunction = (...args: any[]) => any;
import { format } from "date-fns";
import { MessagesState } from "../../store/types";

export enum messageBoxStatusTypes {
  notReceived = "notReceived",
  sent = "sent",
  delivered = "delivered",
  read = "read",
}

export type MessageBoxType = {
  position: "left" | "right";
  text: string;
  date: Date;
  status: messageBoxStatusTypes;
  msgBoxClass?: string;
  hideSeenAndStatus?: boolean;
};

export const formatChatBoxDate = (date: Date) => {
  return format(new Date(date), "dd-MMMM-yyyy").split("-").join(" ");
};

export const assignDateKey = (
  id: string | number,
  date: Date,
  firstDayMap: MessagesState["firstDayMap"],
) => {
  const formattedDate = formatChatBoxDate(date);
  const curFirstDay = firstDayMap[formattedDate];
  const curTime = new Date(curFirstDay?.time || new Date());

  if (curTime.getTime() > new Date(date).getTime()) {
    firstDayMap[formattedDate] = {
      id,
      time: date,
    };
  }
};
