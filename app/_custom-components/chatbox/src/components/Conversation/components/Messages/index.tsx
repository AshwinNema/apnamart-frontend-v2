import { ScrollShadow } from "@nextui-org/react";
import { MainMsgComponent } from "./sub-components";
import { Fragment, useContext } from "react";
import { WidgetContext } from "@/app/_custom-components/chatbox";

function Messages({}) {
  const widgetProps = useContext(WidgetContext);
  if (!widgetProps) return null;
  const {
    stateConfig: [{ firstDayMap, messages }],
  } = widgetProps;

  return (
    <div className="h-[50svh] ">
      <ScrollShadow className="h-[50svh] ">
        <div className="mb-24 flex flex-col gap-5 mt-5">
          {widgetProps.initialMessages
            ? widgetProps.initialMessages.map((message) => {
                return (
                  <Fragment key={message.id}>
                    <MainMsgComponent
                      message={message}
                      firstDayMap={firstDayMap}
                    />
                  </Fragment>
                );
              })
            : null}
          {messages?.map?.((message) => {
            return (
              <Fragment key={message.id}>
                <MainMsgComponent message={message} firstDayMap={firstDayMap} />
              </Fragment>
            );
          })}
        </div>
      </ScrollShadow>
    </div>
  );
}

export default Messages;
