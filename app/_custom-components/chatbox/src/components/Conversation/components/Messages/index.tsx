import { Fragment } from "react";
import { componentType, messageSenderType } from "../../../../store/types";
import { ScrollShadow } from "@nextui-org/react";
import MessageBox from "../../../MessageBox";
import { useChatboxStore } from "../../../../store";
import { browserTheme } from "@/app/layout-components/theme-switch";
import { useTheme } from "next-themes";

function Messages({}) {
  const messages = useChatboxStore((state) => state.messages);
  const { theme } = useTheme();
  return (
    <div className="h-[50svh] ">
      <ScrollShadow className="h-[50svh] ">
        <div className="mb-24 flex flex-col gap-5 mt-5">
          {messages?.map?.((message) => {
            switch (message.componentType) {
              case componentType.systemComponent:
                return (
                  <Fragment key={message.id}>
                    <div className="flex items-center justify-center">
                      <div
                        className={`relative rounded-[10px] shadow-systemComponentShadow flex flex-col my-1.5 pt-1.5 pr-2.5 pb-2 pl-2.5 float-left max-w-[70%] items-center justify-center ${
                          theme === browserTheme.dark && "bg-darkContainerTheme"
                        }`}
                      >
                        <div className="text-center text-[15px] inline-block opacity-50 text-supSmall">
                          {message.text}
                        </div>
                      </div>
                    </div>
                  </Fragment>
                );
              case componentType.textComponent:
                return (
                  <Fragment key={message.id}>
                    <MessageBox
                      position={
                        message.senderType === messageSenderType.client
                          ? "right"
                          : "left"
                      }
                      msgBoxClass="bg-chatBoxMsgTheme text-white"
                      text={`${message.text}`}
                      date={new Date()}
                      status="received"
                    />
                  </Fragment>
                );

              default:
                return <Fragment key={message.id}></Fragment>;
            }
          })}
        </div>
      </ScrollShadow>
    </div>
  );
}

export default Messages;
