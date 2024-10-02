import { useRef, useState, useCallback, useContext } from "react";
import { Input } from "@nextui-org/react";
import { FaRegSmile } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { useHover } from "react-aria";
import EmojiPicker, { pickerStateChanger } from "./emoji-picker";
import { setNestedPath } from "@/app/_utils";
import { addChatboxMsg, handleEmojiEvents, senderState } from "./utils";
import { WidgetContext } from "@/app/_custom-components/chatbox";

function Sender() {
  const senderInputContainer = useRef<HTMLDivElement | null>(null);
  const [config, setConfig] = useState<senderState>({
    pickerOffset: 0,
    height: 0,
    showPicker: false,
    inputVal: "",
  });
  const emojiEventHandler = (behaviour: pickerStateChanger = "toggle") => {
    handleEmojiEvents(behaviour, config, setConfig, senderInputContainer);
  };

  const setData = useCallback(setNestedPath(setConfig), [setConfig]);
  let { hoverProps } = useHover({
    onHoverStart: (e) => {
      emojiEventHandler("open");
    },
  });

  const widgetProps = useContext(WidgetContext);
  if (!widgetProps) return null;

  return (
    <>
      <EmojiPicker config={config} setConfig={setConfig} />
      <div ref={senderInputContainer}>
        <div className="w-full absolute bottom-0">
          <Input
            className="bg-[transparent] mb-5"
            value={config.inputVal}
            onValueChange={setData("inputVal")}
            classNames={{
              base: ["scale-y-[2]"],
              input: ["scale-y-[0.5]"],
            }}
            radius="none"
            startContent={
              <div {...hoverProps}>
                <FaRegSmile
                  className="scale-y-[0.5] cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    emojiEventHandler("toggle");
                  }}
                />
              </div>
            }
            fullWidth={true}
            endContent={
              <IoSend
                onClick={() => {
                  const value = config.inputVal.trim();
                  if (!value) return;
                  if (widgetProps.customAddMsg) {
                    widgetProps.customAddMsg(value, () =>
                      setData("inputVal")(""),
                    );
                    return;
                  }
                  addChatboxMsg(
                    config.inputVal,
                    setData,
                    widgetProps.stateConfig[1],
                  );
                }}
                className={`scale-y-[0.5] cursor-pointer ${
                  !config.inputVal.trim() && "opacity-50"
                }`}
              />
            }
          />
        </div>
      </div>
    </>
  );
}

export default Sender;
