import { toast, ToastOptions } from "react-toastify";
import { ValidationErrIcon } from "../icons & logos";
import { getBrowserTheme } from "..";

export enum toastErrorIcons {
  validation = "validation error",
  default = "default",
}

export const errorToast = ({
  msg,
  iconType = toastErrorIcons.default,
}: {
  msg: string;
  iconType?: toastErrorIcons;
}) => {
  const toastProps: ToastOptions = { theme: getBrowserTheme() };

  switch (iconType) {
    case toastErrorIcons.validation:
      toastProps.icon = ValidationErrIcon;
      break;
    default:
      break;
  }
  toast.error(msg, toastProps);
};

export default {
  toastErrorIcons,
  errorToast,
};
