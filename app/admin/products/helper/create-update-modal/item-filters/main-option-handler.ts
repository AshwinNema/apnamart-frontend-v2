import { Dispatch, SetStateAction } from "react";
import {
  createUpdateFilterState,
  createUpdateItemState,
  ItemFilterConfig,
} from "../../interfaces & enums";
import { errorToast, successToast, toastErrorIcons } from "@/app/_utils/toast";
import { v4 as uuidv4 } from "uuid";
import { setNestedPath } from "@/app/_utils";

export const mainOptionHandler = (
  createUpdateFilterOption: ItemFilterConfig["createUpdateFilterOption"],
  config: createUpdateItemState,
  setConfig: Dispatch<SetStateAction<createUpdateItemState>>,
  setMainConfig: Dispatch<SetStateAction<ItemFilterConfig>>,
) => {
  const value = config.optionCreateUpdateName.trim();
  const id = uuidv4();

  if (!value) {
    errorToast({
      msg: "Please enter option value",
      iconType: toastErrorIcons.validation,
    });
    return;
  }

  switch (createUpdateFilterOption) {
    case createUpdateFilterState.create: {
      setConfig((prevConfig) => {
        const length = prevConfig.options.length;
        if (length && prevConfig.options[length - 1].id === id) {
          return prevConfig;
        }
        prevConfig.options.push({
          name: value,
          id,
        });
        prevConfig.optionCreateUpdateName = "";
        return { ...prevConfig };
      });

      successToast({ msg: "Option added to the filter" });
      break;
    }
    case createUpdateFilterState.update:
      setConfig((prevConfig) => {
        const index = prevConfig.options.findIndex(
          (item) => item.id === config.optionId,
        );
        if (index != -1) {
          prevConfig.options[index].name = value;
        }
        return structuredClone(prevConfig);
      });

      successToast({ msg: "Option updated" });
      break;
    default:
      break;
  }

  setNestedPath(setMainConfig)("createUpdateFilterOption")(null);
};
