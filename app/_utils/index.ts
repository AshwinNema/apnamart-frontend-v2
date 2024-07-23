import { Dispatch, SetStateAction } from "react";
import * as _ from "lodash";
import { SafeParseReturnType, ZodError } from "zod";

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

interface keyVals {
  key: string;
  val: any;
}

export const setMultiplePaths = (
  setDataFunc: Dispatch<SetStateAction<any>>,
  pathValList: keyVals[],
) => {
  setDataFunc((prevVal: Object) => {
    pathValList.forEach(({ key, val }) => {
      _.set(prevVal, key, val);
    });
    return { ...prevVal };
  });
};

export const getZodErrMsg = (error: ZodError<any>) => {
  return error.issues.map((issue) => issue.message).join(", ");
};
