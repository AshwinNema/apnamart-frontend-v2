import { Dispatch, SetStateAction } from "react";
import * as _ from "lodash";
import { ZodError } from "zod";
import { getLocalStorageKey } from "../_services/local-storage.service";
import { browserTheme } from "../layout-components/theme-switch";

export const passwordRegex =
  /(?=.*[A-Z])(?=.*\d).{8,}|(?=.*\d)(?=.*[A-Z]).{8,}/;

export const passwordErrMsg =
  "Password must contain atleast 1 capital letter, 1 number and should have a min length of 8";

export const setNestedPath =
  (setDataFunc: Dispatch<SetStateAction<any>>) =>
  (key: string) =>
  (value: any) => {
    setDataFunc((prevVal: Object) => {
      _.set(prevVal, key, value);
      return { ...prevVal };
    });
  };

export type setKeyVal = (key: string) => (value: any) => void;

export type setVal = (value: any) => void;

export type keyVals = [string, any];

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
  return getLocalStorageKey("theme") || browserTheme.light;
};
