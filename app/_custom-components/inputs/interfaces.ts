import { HTTP_METHODS } from "@/app/_services/fetch-service";
import { setVal } from "@/app/_utils";
import { InputSlots, SlotsToClasses } from "@nextui-org/react";
import { ReactNode } from "react";
import { ZodSchema } from "zod";

export interface TextInputProps {
  value: string;
  setData: setVal;
  validationSchema?: ZodSchema;
  Icon?: () => ReactNode;
  label?: string;
  placeholder?: string;
  className?: string;
  alternateText?: string;
  variant?: "bordered" | "flat" | "faded" | "underlined";
  autoFocus?: boolean;
  labelPlacement?: "outside" | "outside-left" | "inside";
  fullWidth?: boolean;
  classNames?: SlotsToClasses<InputSlots>;
}

export interface TextInputState {
  invalid: boolean;
  errorMsg: string;
  label: string;
  placeholder: string;
  isFocussed: boolean;
}

export interface autoCompleteListItem {
  id: string | number;
  label: string;
  photo?: string;
}

export interface AutoCompleteInputSearchProps {
  getListItems: (inputVal: string) => Promise<autoCompleteListItem[]>;
  label: string;
  size?: "sm" | "md" | "lg";
  variant?: "flat" | "bordered" | "faded" | "underlined";
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  onSelectionChange: (key: string | number) => any;
  onInputClear?: () => void;
}

export interface AutoCompleteProps {
  label: string;
  size?: "sm" | "md" | "lg";
  variant?: "flat" | "bordered" | "faded" | "underlined";
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  onSelectionChange: (key: string | number | null) => any;
  list?: autoCompleteListItem[];
  method?: HTTP_METHODS;
  url?: string;
  processLogic?: (res: any) => {
    data: autoCompleteListItem[];
    inputVal: string;
  };
  isClearable?: boolean;
  labelPlacement?: "inside" | "outside" | "outside-left";
  fullWidth?: boolean;
  allowsCustomValue?: boolean;
  selectedKey: string | number | null;
}

export interface autoCompleteState {
  itemList: autoCompleteListItem[];
  inputValue: string;
  selectionKeyType: "string" | "number" | null,
  selectedKey: string | null
}
