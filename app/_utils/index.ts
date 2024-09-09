import { Dispatch, SetStateAction } from "react";
import * as _ from "lodash";
import { ZodError } from "zod";
import { getLocalStorageKey, storageAttributes } from "../_services";

import { browserTheme } from "../layout-components/theme-switch";
export * from "./routes";
export * from "./icons & logos";
export * from "./toast";
export * from "./endpoints";

export const passwordRegex =
  /(?=.*[A-Z])(?=.*\d).{8,}|(?=.*\d)(?=.*[A-Z]).{8,}/;

export const passwordErrMsg =
  "Password must contain atleast 1 capital letter, 1 number and should have a min length of 8";

const getNestedPath = (obj: any, index: number, path: string | string[]) => {
  if (typeof path === "string")
    return getNestedPath(obj, index, path.split("."));
  if (!obj || typeof obj != "object" || Array.isArray(obj)) return;
  const curPath = path[index];
  const curVal = obj[curPath];
  if (index === path.length - 1) return curVal;
  return getNestedPath(curVal, index + 1, path);
};

export const setNestedPath =
  (setDataFunc: Dispatch<SetStateAction<any>>) =>
  (key: string, toggleVal?: boolean) =>
  (value?: any) => {
    setDataFunc((prevVal: Object) => {
      if (toggleVal) {
        const curVal = getNestedPath(prevVal, 0, key);
        _.set(prevVal, key, !curVal);
        return { ...prevVal };
      }
      _.set(prevVal, key, value);
      return { ...prevVal };
    });
  };

export type setKeyVal = (
  key: string,
  toggleVal?: boolean,
) => (value?: any) => void;

export type setVal = (value: any) => void;

export type keyVals = [string, any];

export type valueOf<T> = T[keyof T];

export const setMultiplePaths =
  (setDataFunc: Dispatch<SetStateAction<any>>) => (pathValList: keyVals[]) => {
    setDataFunc((prevVal: Object) => {
      pathValList.forEach(([key, val]) => {
        _.set(prevVal, key, val);
      });
      return { ...prevVal };
    });
  };

export type multiplePathSetter = (pathValList: keyVals[]) => void;

export const getZodErrMsg = (error: ZodError<any>) => {
  return error.issues.map((issue) => issue.message).join(", ");
};

export const getBrowserTheme = (): browserTheme => {
  return getLocalStorageKey(storageAttributes.theme) || browserTheme.light;
};

export enum variants {
  goBackBtn = "shadow",
}
