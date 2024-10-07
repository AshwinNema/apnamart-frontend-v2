import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { pickerStateChanger } from "./emoji-picker";
import { setKeyVal } from "@/app/_utils";
import { v4 } from "uuid";
import { assignDateKey, chatBoxProps } from "@/app/_custom-components/chatbox";
import { produce } from "immer";
import { messageSenderType } from "../../../../store/types";
import { messageBoxStatusTypes } from "../../../../utils/interfaces & types & constants";

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
  senderInputContainer: MutableRefObject<HTMLDivElement | null>,
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
  setConfig: chatBoxProps["stateConfig"][1],
) => {
  const value = inputVal.trim();
  if (!value) return;
  const id = v4();
  const timestamp = new Date();

  setConfig(
    produce((draft) => {
      assignDateKey(id, timestamp, draft.firstDayMap);
      draft.messages.push({
        senderType: messageSenderType.client,
        timestamp,
        status: messageBoxStatusTypes.sent,
        id,
        text: value,
      });
    }),
  );
  setData("inputVal")("");
};
