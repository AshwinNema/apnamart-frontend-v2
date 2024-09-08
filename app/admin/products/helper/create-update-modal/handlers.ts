import { Dispatch, SetStateAction } from "react";
import {
  createUpdateFilterState,
  FilterItem,
  ItemFilterConfig,
  MainModalState,
  ModalDeletedFilterItem,
  ModalFilterItem,
} from "../interfaces & enums";
import { successToast } from "@/app/_utils/toast";

export const mainTableClick = (
  data: ModalFilterItem,
  setConfig: Dispatch<SetStateAction<ItemFilterConfig>>,
) => {
  const { id, name, options, deletedOptions } = data;
  setConfig((prevConfig) => {
    prevConfig.createUpdateFilter = createUpdateFilterState.update;
    prevConfig.updateFilterDetails = {
      name,
      optionCreateUpdateName: "",
      options: options.map((item) => {
        return {
          id: item.id as string,
          name: item.name,
        };
      }),
      optionId: null,
      filterId: id,
      deletedOptions: deletedOptions || [],
    };
    return { ...prevConfig };
  });
};

export const deleteMainTableItem = (
  closeModal: () => void,
  data: FilterItem,
  setAllData: Dispatch<SetStateAction<MainModalState>>,
) => {
  setAllData((prevConfig) => {
    return {
      ...prevConfig,
      filterItems: prevConfig.filterItems.filter((item) => {
        const itemId = item.id;
        const dataId = data.id;
        const isDatabaseId = typeof dataId === "number";
        const deleteLength = prevConfig.deletedOriginalItems.length;
        const isAdded = deleteLength
          ? prevConfig.deletedOriginalItems[deleteLength - 1].id === dataId
          : false;
        if (isDatabaseId && itemId === dataId && !isAdded) {
          prevConfig.deletedOriginalItems.push(item as ModalDeletedFilterItem);
        }
        return item.id !== data.id;
      }),
    };
  });

  successToast({ msg: "Filter removed" });
  closeModal();
};
