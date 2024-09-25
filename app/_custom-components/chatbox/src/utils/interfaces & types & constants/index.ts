export type nullable<T> = T | null;
export type anyFunction = (...args: any[]) => any;

export type MessageBoxType = {
  position: "left" | "right";
  text: string;
  date: Date;
  status: "waiting" | "sent" | "received" | "read";
  msgBoxClass?: string;
  hideSeenAndStatus?: boolean;
};
