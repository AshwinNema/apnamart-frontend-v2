"use client";
import { toast, ToastOptions } from "react-toastify";
import {
  BrowserDeniedIcon,
  LocationDeniedIcon,
  ValidationErrIcon,
} from "../icons & logos";
import { getBrowserTheme } from "..";
import { ReactNode } from "react";

export enum toastErrorIcons {
  validation = "validation error",
  default = "default",
  locationDenied = "location denied",
  browserDenied = "browser denied",
}

export const errorToast = ({
  msg,
  iconType = toastErrorIcons.default,
}: {
  msg: ReactNode;
  iconType?: toastErrorIcons;
}) => {
  const toastProps: ToastOptions = { theme: getBrowserTheme() };

  switch (iconType) {
    case toastErrorIcons.validation:
      toastProps.icon = ValidationErrIcon;
      break;

    case toastErrorIcons.locationDenied:
      toastProps.icon = LocationDeniedIcon;
      break;
    case toastErrorIcons.browserDenied:
      toastProps.icon = BrowserDeniedIcon;
      break;
    default:
      break;
  }
  toast.error(msg, toastProps);
};

const errorToastEntities = { toastErrorIcons, errorToast };

export default errorToastEntities;
