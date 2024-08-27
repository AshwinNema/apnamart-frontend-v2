import { HTTP_METHODS, makeDataRequest } from "@/app/_services/fetch-service";
import { getDataQuery, tabKeys } from "../interfaces & enums";
import { appEndPoints } from "@/app/_utils/endpoints";

export * from "./modal-apis";

export const queryTableData = (
  type: tabKeys,
  query: {
    limit: number;
    page: number;
    id?: number;
  },
  setData: (...arg: any[]) => void,
) => {
  const url = type === tabKeys.category ? appEndPoints.QUERY_CATEGORIES : "";
  makeDataRequest(HTTP_METHODS.GET, url, undefined, {
    ...query,
  }).then((res) => {
    if (!res) return;
    setData(res);
  });
};

export const getQueryDataApi = (
  tabKey: tabKeys,
  query: getDataQuery,
  setData: (...arg: any[]) => void,
) => {
  const url = tabKey === tabKeys.category ? appEndPoints.QUERY_CATEGORIES : "";
  makeDataRequest(HTTP_METHODS.GET, url, undefined, {
    ...query,
  }).then((res) => {
    if (!res) return;

    setData(res);
  });
};