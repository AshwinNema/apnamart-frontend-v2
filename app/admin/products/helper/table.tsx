import { appEndPoints } from "@/app/_utils/endpoints";
import { tableDataDataElement } from "./interfaces & enums";
import { tabKeys } from "@/lib/product/slices/component-details.slice";
import {
  categoryTableDataElement,
  subCatTableDataElement,
} from "@/lib/product/slices/table.slice";

export const getDeleteActionTexts = (tabType: tabKeys, id?: number) => {
  let url = "",
    msg = "deleted successfully",
    button = "Delete";

  switch (tabType) {
    case tabKeys.category:
      url = `${appEndPoints.DELETE_CATEGORY}${id}`;
      msg = `Category ${msg}`;
      button = `${button} Category`;
      break;
    case appEndPoints.DELETE_SUB_CATEGORY:
      url = `${appEndPoints.DELETE_SUB_CATEGORY}${id}`;
      msg = `Sub Category ${msg}`;
      button = `${button} Sub Category`;
      break;
    default:
      break;
  }
  return {
    url,
    msg,
    button,
  };
};

export const getCellValue = (
  tabType: tabKeys,
  data: Partial<tableDataDataElement>,
  columnKey: React.Key,
) => {
  let cellValue = null;
  switch (tabType) {
    case tabKeys.category:
      cellValue = data[columnKey as keyof categoryTableDataElement];
      break;

    case tabKeys.subCategory:
      cellValue = data[columnKey as keyof subCatTableDataElement];
      break;
    default:
      break;
  }
  return cellValue;
};
