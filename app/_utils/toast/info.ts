"use client";
import { toast, ToastOptions } from "react-toastify";
import { getBrowserTheme } from "..";

export enum toastInfoIcons {
  default = "default",
}

export const infoToast = ({
  msg,
  iconType = toastInfoIcons.default,
}: {
  msg: string;
  iconType?: toastInfoIcons;
}) => {
  const toastProps: ToastOptions = { theme: getBrowserTheme() };

  switch (iconType) {
    default:
      break;
  }
  toast.info(msg, toastProps);
};

const infoToastEntities = {
  toastInfoIcons,
  infoToast,
};

export default infoToastEntities
