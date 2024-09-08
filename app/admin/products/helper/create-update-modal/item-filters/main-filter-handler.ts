import {
  createUpdateFilterState,
  createUpdateItemState,
  ItemFilterConfig,
  MainModalState,
} from "../../interfaces & enums";
import { SetStateAction, Dispatch } from "react";
import * as _ from "lodash";
import { setMultiplePaths, successToast } from "@/app/_utils";
import { v4 as uuidv4 } from "uuid";
import { validateFilter } from "./validations";
// This function handles the creation and updation of the item
export const mainItemFilterHandler = (
  createUpdateFilter: ItemFilterConfig["createUpdateFilter"],
  config: createUpdateItemState,
  setMainConfig: Dispatch<SetStateAction<ItemFilterConfig>>,
  setMainModalConfig: Dispatch<SetStateAction<MainModalState>>,
  centralConfig: MainModalState,
) => {
  const { error, data } = validateFilter(config, centralConfig.filterItems);
  if (error || !data) {
    return;
  }
  const id = uuidv4();
  let successMsg = "";
  switch (createUpdateFilter) {
    case createUpdateFilterState.create:
      setMainModalConfig((prevConfig) => {
        const { filterItems } = prevConfig;
        const length = filterItems.length;
        if (length && filterItems[length - 1].id === id) return prevConfig;
        prevConfig.filterItems.push({
          name: data.name,
          id,
          options: data.options,
        });
        return prevConfig;
      });
      successMsg = "Filter added";
      break;
    case createUpdateFilterState.update:
      const newDeletedOptions = config.deletedOptions || [];
      const firstDeletedNewId = newDeletedOptions?.[0]?.id || null;
      setMainModalConfig((prevConfig) => {
        const { filterItems } = prevConfig;
        const updateIndex = filterItems.findIndex(
          (item) => item.id === config.filterId,
        );
        if (updateIndex != -1) {
          const deletedOptions = filterItems[updateIndex]?.deletedOptions || [];
          const deletedLength = deletedOptions.length;
          const lastDeleteId = deletedOptions[deletedLength - 1]?.id || null;

          if (firstDeletedNewId != lastDeleteId) {
            deletedOptions.push(...newDeletedOptions);
          }
          filterItems[updateIndex] = {
            ...filterItems[updateIndex],
            name: data.name,
            options: data.options,
            deletedOptions,
          };
        }
        return prevConfig;
      });
      successMsg = "Filter updated";
      break;
    default:
      return;
  }
  successMsg && successToast({ msg: successMsg });
  setMultiplePaths(setMainConfig)([
    ["createUpdateFilterOption", null],
    ["createUpdateFilter", null],
  ]);
};
