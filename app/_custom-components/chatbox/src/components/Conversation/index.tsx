import { useRef, MouseEvent } from "react";
import Header from "./components/Header";
import Messages from "./components/Messages";
import Sender from "./components/Sender";
import { chatBoxProps } from "../../..";
import { browserTheme } from "@/app/layout-components/theme-switch";
import { useTheme } from "next-themes";

type Props = {
  title: chatBoxProps["title"];
  subtitle: string;
  resizable?: boolean;
};

function Conversation({ title, subtitle, resizable }: Props) {
  const containerDiv = useRef<HTMLDivElement | null>(null);
  const startX = useRef(0);
  const startWidth = useRef(0);

  const initResize = (e: MouseEvent<HTMLDivElement>) => {
    if (resizable) {
      startX.current = e.clientX;
      if (document.defaultView && containerDiv.current) {
        startWidth.current = parseInt(
          document.defaultView.getComputedStyle(containerDiv.current).width,
        );
        window.addEventListener("mousemove", resize);
        window.addEventListener("mouseup", stopResize);
      }
    }
  };

  const resize = (e: any) => {
    if (containerDiv.current) {
      containerDiv.current.style.width =
        startWidth.current - e.clientX + startX.current + "px";
    }
  };

  const stopResize = () => {
    window.removeEventListener("mousemove", resize, false);
    window.removeEventListener("mouseup", stopResize, false);
  };
  const { theme } = useTheme();

  return (
    <div
      ref={containerDiv}
      className={`shadow-chatConversationContainer min-w-[25svw] max-w-[90svw] rounded-[4rem] mb-16 relative ${theme === browserTheme.dark ? "bg-black" : "bg-[#E5E6E4]"}`}
      aria-live="polite"
    >
      {resizable && (
        <div
          onMouseDown={(e) => {
            initResize(e);
          }}
          className="cursor-col-resize h-full left-0 absolute top-0 w-[5px] z-20"
        />
      )}
      <Header title={title} subtitle={subtitle} />
      <Messages />
      <Sender />
    </div>
  );
}

export default Conversation;
