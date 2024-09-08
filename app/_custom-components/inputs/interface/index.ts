import { setVal } from "@/app/_utils";
import { InputSlots, SlotsToClasses } from "@nextui-org/react";
import { ReactNode } from "react";
import { ZodSchema } from "zod";
export * from "./auto-complete.props";

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

export interface autoCompleteState {
  itemList: autoCompleteListItem[];
  inputValue: string;
  selectedKey: string | null;
}
