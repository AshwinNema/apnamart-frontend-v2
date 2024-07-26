import { toast, ToastOptions } from "react-toastify";
import { SuccessIcon } from "../icons & logos";
import { getBrowserTheme } from "..";

export enum toastSuccessIcons {
  rocket = "rocket",
  default = "default",
}

export const successToast = ({
  msg,
  iconType = toastSuccessIcons.default,
}: {
  msg: string;
  iconType?: toastSuccessIcons;
}) => {
  const toastProps: ToastOptions = { theme: getBrowserTheme() };

  switch (iconType) {
    case toastSuccessIcons.rocket:
      toastProps.icon = SuccessIcon;
      break;

    default:
      break;
  }

  toast.success(msg, toastProps);
};
