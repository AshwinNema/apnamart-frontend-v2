import { SetStateAction, useState, Dispatch } from "react";
import { MessagesState } from "../types";
import { produce } from "immer";
import { assignDateKey } from "../../utils/interfaces & types & constants";

export const prevMsgsHandler = (
  messages: MessagesState["messages"],
  setConfig: Dispatch<SetStateAction<MessagesState>>,
) => {
  setConfig(
    produce((draft) => {
      messages.forEach(({ timestamp, id }) => {
        assignDateKey(id, timestamp, draft.firstDayMap);
      });
      draft.messages.unshift(...messages);
    }),
  );
};

export const forwardMsgsHandler = (
  messages: MessagesState["messages"],
  setConfig: Dispatch<SetStateAction<MessagesState>>,
  newMsg?: boolean,
) => {
  setConfig(
    produce((draft) => {
      messages.forEach(({ timestamp, id }) => {
        assignDateKey(id, timestamp, draft.firstDayMap);
      });
      if (newMsg) draft.totalResults += 1;
      draft.messages.push(...messages);
    }),
  );
};

const useDataManager = (): [
  MessagesState,
  Dispatch<SetStateAction<MessagesState>>,
] => {
  const [config, setConfig] = useState<MessagesState>({
    messages: [],
    firstDayMap: {},
    totalResults: 0,
  });
  return [config, setConfig];
};

export default useDataManager;
