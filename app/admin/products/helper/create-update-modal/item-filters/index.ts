import { successToast } from "@/app/_utils";
import {
  createUpdateItemState,
  DatabaseFilterItemOption,
  itemFilterTabletem,
  MainModalState,
} from "../../interfaces & enums";
import { Dispatch, SetStateAction } from "react";

export * from "./main-filter-handler";
export * from "./main-option-handler";

export const handleDeleteFilterItemOption = (
  data: itemFilterTabletem,
  setConfig: Dispatch<SetStateAction<createUpdateItemState>>,
  closeModal: () => void,
) => {
  const dataId = data.id;
  setConfig((prevConfig) => {
    prevConfig.options = prevConfig.options.filter((item) => {
      prevConfig.deletedOptions = prevConfig.deletedOptions || [];
      typeof dataId === "number" &&
        item.id === dataId &&
        prevConfig.deletedOptions.push(item as DatabaseFilterItemOption);
      return item.id !== dataId;
    });

    return { ...prevConfig };
  });
  closeModal();
  successToast({ msg: "Option deleted successfully" });
};

export const restoreFilterItemOption = (
  option: createUpdateItemState["deletedOptions"][number],
  setConfig: Dispatch<SetStateAction<createUpdateItemState>>,
) => {
  const optionId = option.id;
  setConfig &&
    setConfig((prevConfig) => {
      const { deletedOptions, options } = prevConfig;
      const optionLength = options.length;
      const lastOptionId = options?.[optionLength - 1]?.id;
      if (lastOptionId !== optionId) {
        options.push(option);
      }
      return {
        ...prevConfig,
        deletedOptions: deletedOptions.filter((item) => item.id !== option.id),
        options,
      };
    });
};

export const restoreFilterItem = (
  option: MainModalState["deletedOriginalItems"][number],
  setMainConfig: Dispatch<SetStateAction<MainModalState>>,
) => {
  const optionId = option.id;
  setMainConfig((prevConfig) => {
    const { filterItems } = prevConfig;
    const itemLength = filterItems.length;
    if (!itemLength || filterItems[itemLength - 1].id !== optionId) {
      filterItems.push(option);
    }
    prevConfig.deletedOriginalItems = prevConfig.deletedOriginalItems.filter(
      (item) => item.id !== optionId,
    );
    return { ...prevConfig, filterItems };
  });
};
