import {
  bodyState,
  createUpdateFilterState,
  ItemFilterConfig,
  tableDataDataElement,
  MainModalState,
} from "../interfaces & enums";
import { MutableRefObject, Dispatch, SetStateAction } from "react";
import * as _ from "lodash";
import { tabKeys } from "@/lib/product/slices/component-details.slice";
export * from "./default-states";
export * from "./handlers";
export * from "./item-filters";
export const setMainState = (
  modalDetails: tableDataDataElement,
  setConfig: Dispatch<SetStateAction<MainModalState>>,
  mainContainerRef: MutableRefObject<HTMLDivElement | null>,
) => {
  const allDetails: Partial<MainModalState> = {};
  if (mainContainerRef.current) {
    allDetails.height = mainContainerRef.current.getBoundingClientRect().height;
  }
  if (modalDetails) {
    const details = _.pick(modalDetails, [
      "name",
      "id",
      "category",
      "subCategory",
    ]);
    Object.assign(allDetails, {
      ...details,
      categoryId: details?.category?.id || null,
      categoryVal: details?.category?.name || "",
      subCategoryId: details?.subCategory?.id || null,
      subCategoryVal: details?.subCategory?.name || "",
    });
  }
  setConfig((prevConfig) => {
    Object.assign(prevConfig, allDetails);
    return { ...prevConfig };
  });
};

export const getModalTitle = (
  tab: tabKeys,
  config: MainModalState,
  modalDetails?: tableDataDataElement,
) => {
  if (tab === tabKeys.items && config.bodyState === bodyState.itemFilters) {
    return "Create/Update Item Filters";
  }
  return `${modalDetails?.id ? "Update" : "Create"} ${
    tab === tabKeys.category
      ? "Category"
      : tab === tabKeys.subCategory
        ? "Sub Category"
        : "Item"
  }`;
};

export const getItemFilterHeader = (config: ItemFilterConfig) => {
  const { createUpdateFilter, createUpdateFilterOption } = config;

  if (!createUpdateFilter && !createUpdateFilterOption) return "All filters";
  if (createUpdateFilterOption)
    return `${createUpdateFilterOption === createUpdateFilterState.create ? "Create" : "Update"} Filter Option`;

  if (createUpdateFilter)
    return `${createUpdateFilter === createUpdateFilterState.create ? "Create" : "Update"} Filter`;

  return null;
};

export const getItemFilterMainBtnText = (
  createUpdateFilterOption: ItemFilterConfig["createUpdateFilterOption"],
  createUpdateFilter: ItemFilterConfig["createUpdateFilter"],
) => {
  switch (createUpdateFilterOption) {
    case createUpdateFilterState.create:
      return "Create Filter Option";

    case createUpdateFilterState.update:
      return "Update Filter Option";
    default:
      break;
  }

  switch (createUpdateFilter) {
    case createUpdateFilterState.create:
      return "Create Filter";

    case createUpdateFilterState.update:
      return "Update Filter";
    default:
      break;
  }
  return "";
};
