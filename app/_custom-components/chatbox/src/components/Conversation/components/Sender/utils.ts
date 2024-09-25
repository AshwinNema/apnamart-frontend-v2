import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { pickerStateChanger } from "./emoji-picker";
import { setKeyVal } from "@/app/_utils";
import { messageState } from "../../../../store/slice";
import {format} from "date-fns"
import {v4 } from "uuid"
import { componentType, messageSenderType, } from "../../../../store/types";

export interface senderState {
  pickerOffset: number;
  height: number;
  showPicker: boolean;
  inputVal: string;
}

export const handleEmojiEvents = (
  behaviour: pickerStateChanger = "toggle",
  config: senderState,
  setConfig: Dispatch<SetStateAction<senderState>>,
  senderInputContainer: MutableRefObject<HTMLDivElement | null>
) => {
  const senderEl = senderInputContainer.current;
  let updates: Partial<senderState> = {};
  if (senderEl && config.height !== senderEl.clientHeight) {
    const { clientHeight } = senderEl;
    updates = {
      height: clientHeight,
      pickerOffset: clientHeight ? clientHeight - 1 : 0,
    };
  }

  setConfig((prevConfig) => {
    const { showPicker } = prevConfig;
    return {
      ...prevConfig,
      ...config,
      showPicker:
        behaviour === "open"
          ? true
          : behaviour === "close"
          ? false
          : behaviour === "toggle"
          ? !showPicker
          : showPicker,
    };
  });
};

export const addChatboxMsg = (
  inputVal: string,
  setData: setKeyVal,
  {
    dateMap,
    addMsgsAndKey
  }:{
    dateMap:messageState["dateMap"],
    addMsgsAndKey:messageState["addMsgsAndKey"]
  }
) => {
  const value = inputVal.trim();
  if (!value) return;
  const currentDate = new Date()
  const formattedDate = format(currentDate, "dd-MMMM-yyyy").split("-").join(" ")
  const messageBoxes:messageState["messages"] = []
  const isDateHeaderAdded = !!dateMap[formattedDate]

  if (!isDateHeaderAdded) {
    messageBoxes.push({
      componentType: componentType.systemComponent,
      senderName: "Sender",
      senderType: messageSenderType.client,
      timestamp: new Date(),
      status:"read",
      id: v4(),
      text: formattedDate ,
    })
  }
  messageBoxes.push({
    componentType: componentType.textComponent,
    senderName: "Sender",
    senderType: messageSenderType.client,
    timestamp: new Date(),
    status:"waiting",
    id: v4(),
    text: value,
  })
  addMsgsAndKey(messageBoxes, formattedDate)
  setData("inputVal")("");
};
