import { browserTheme } from "@/app/layout-components/theme-switch";
import { useTheme } from "next-themes";
import React, { Fragment } from "react";
import { formatChatBoxDate } from "../../../../../utils/interfaces & types & constants";
import { Message, messageSenderType, MessagesState } from "../../../../../store/types";
import { SystemComponent, MessageBox } from "./msg-parts";

export const MainMsgComponent = ({
  message,
  firstDayMap,
}: {
  message: Message;
  firstDayMap: MessagesState["firstDayMap"];
}) => {
  const { theme } = useTheme();
  const isClientMessage = message.senderType === messageSenderType.client;
  const formattedDate = formatChatBoxDate(message.timestamp);
  const isFirstdayMessage = firstDayMap[formattedDate]?.id === message.id;
  return (
    <Fragment key={message.id}>
      {isFirstdayMessage ? (
        <>
          <SystemComponent text={formatChatBoxDate(message.timestamp)} />
        </>
      ) : (
        <></>
      )}
      <MessageBox
        position={isClientMessage ? "right" : "left"}
        hideSeenAndStatus={message.hideStatusAndTime}
        msgBoxClass={`${
          isClientMessage
            ? "bg-chatBoxMsgTheme"
            : theme !== browserTheme.dark
              ? "bg-white"
              : "bg-darkContainerTheme"
        } ${isClientMessage || theme === browserTheme.dark ? "text-white" : "text-black"}`}
        text={`${message.text}`}
        date={message.timestamp}
        status={message.status}
      />
    </Fragment>
  );
};
