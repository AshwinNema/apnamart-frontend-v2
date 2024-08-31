import {
  getZodErrMsg,
  keyVals,
  multiplePathSetter,
  setKeyVal,
} from "@/app/_utils";
import {
  AutoCompleteProps,
  autoCompleteState,
  TextInputState,
} from "./interfaces";
import { ZodSchema } from "zod";
import React from "react";

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

export const onAutoCompleteSelectionChange = (
  key: React.Key | null,
  selectionKeyType: autoCompleteState["selectionKeyType"],
  list: autoCompleteState["itemList"],
  setMultipleData: multiplePathSetter,
  onSelectionChange: AutoCompleteProps["onSelectionChange"],
) => {
  const convertedKey =
    !key || selectionKeyType !== "number" ? key : Number(key);

  const label =
    list.find((item) => {
      return item.id === convertedKey;
    })?.label || "";
    const update:keyVals[] = [["inputValue", label], ["selectedKey", key]]
    setMultipleData(update)

  onSelectionChange(convertedKey as string | null );
};
