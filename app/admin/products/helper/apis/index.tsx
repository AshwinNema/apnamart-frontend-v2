import { HTTP_METHODS, makeDataRequest } from "@/app/_services/fetch-service";
import { getDataQuery } from "../interfaces & enums";
import { appEndPoints } from "@/app/_utils/endpoints";
import { ProductDispatch } from "@/lib/product/store";
import { updateTableData } from "@/lib/product/slices/table.slice";
import { tabKeys } from "@/lib/product/slices/component-details.slice";

export * from "./modal-apis";

export const queryTableData = (
  tabKey: tabKeys,
  query: getDataQuery,
  dispatch: ProductDispatch,
) => {
  let url = "";
  switch (tabKey) {
    case tabKeys.category:
      url = appEndPoints.QUERY_CATEGORIES;
      break;

    case tabKeys.subCategory:
      url = appEndPoints.QUERY_SUB_CATEGORIES;
      break;

    default:
      break;
  }

  makeDataRequest(HTTP_METHODS.GET, url, undefined, {
    ...query,
  }).then((res) => {
    if (!res) return;
    dispatch(updateTableData(res));
  });
};
