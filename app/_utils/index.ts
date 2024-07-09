import { Dispatch, SetStateAction } from "react";

export const setNestedPath =
  (setDataFunc: Dispatch<SetStateAction<any>>) =>
  (key: string) =>
  (value: any) => {
    setDataFunc((prevVal: Object) => ({ ...prevVal, [key]: value }));
  };
