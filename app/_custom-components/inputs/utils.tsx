import {
  getZodErrMsg,
  keyVals,
  multiplePathSetter,
  setKeyVal,
} from "@/app/_utils";
import { MutableRefObject } from "react";
import { TextInputState } from "./interfaces";
import { ZodSchema } from "zod";

export const alternateTextCheck = (
  alternateText: string | undefined,
  value: string,
  config: TextInputState,
  setMultipleDataFunc: multiplePathSetter,
) => {
  if (alternateText) {
    const update: keyVals[] = [
      ["label", ""],
      ["placeholder", ""],
    ];

    if (value || config.isFocussed) {
      update[0][1] = alternateText;
    } else {
      update[1][1] = alternateText;
    }
    setMultipleDataFunc(update);
  }
};

export const invalidTextInputCheck = (
  value: string,
  validationSchema: ZodSchema | undefined,
  setDataFunc: setKeyVal,
) => {
  if (!value || !validationSchema) {
    return false;
  }
  const validation = validationSchema.safeParse(value);
  if (validation.error) {
    const errMsg = getZodErrMsg(validation.error);
    setDataFunc("errorMsg")(errMsg);
  }

  return !validation.success;
};
