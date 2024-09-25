import { useRef, useState, useCallback } from "react";
import { Input } from "@nextui-org/react";
import { FaRegSmile } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { useHover } from "react-aria";
import EmojiPicker, { pickerStateChanger } from "./emoji-picker";
import { setNestedPath } from "@/app/_utils";
import { addChatboxMsg, handleEmojiEvents, senderState } from "./utils";
import { useChatboxStore } from "../../../../store";

function Sender() {
  const senderInputContainer = useRef<HTMLDivElement | null>(null);

  const [config, setConfig] = useState<senderState>({
    pickerOffset: 0,
    height: 0,
    showPicker: false,
    inputVal: "",
  });
  const emojiEventHandler = (behaviour: pickerStateChanger = "toggle") => {
    handleEmojiEvents("open", config, setConfig, senderInputContainer);
  };

  const setData = useCallback(setNestedPath(setConfig), [setConfig]);
  let { hoverProps } = useHover({
    onHoverStart: (e) => {
      emojiEventHandler("open");
    },
  });

  const dateMap = useChatboxStore((state) => state.dateMap);
  const addMsgsAndKey = useChatboxStore((state) => state.addMsgsAndKey)
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
                  addChatboxMsg(config.inputVal, setData, {
                    dateMap,
                    addMsgsAndKey
                  });
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
