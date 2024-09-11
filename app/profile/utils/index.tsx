"use client";
import React, { ReactNode } from "react";
import { UserInterface, UserRole } from "@/lib/main/slices/user/user.slice";
import { AppDispatch } from "@/lib/main/store";
import {
  getSessionStorageKey,
  sessionStorageAttributes,
  setSessionStorageKey,
} from "../../_services";
import { handleAction } from "../../layout-components/notifications/merchant-registration";
export * from "./tabs";

export enum tabKeys {
  profile = "Profile",
  basicDetails = "Basic details",
  address = "address",
  settings = "settings",
}

export type userInputPage = Omit<tabKeys, tabKeys.profile | tabKeys.address>;

export interface tabOption {
  title: ReactNode;
  Content: (props: any) => React.JSX.Element;
  key: tabKeys;
  additionalTabClass?: string;
}

export const checkMerchantRegistration = (
  user: UserInterface,
  dispatch: AppDispatch,
) => {
  const role = user?.role;
  if (role !== UserRole.merchant) return;
  const isRegistreationCompleted =
    user?.merchantDetails?.isRegistreationCompleted;
  if (isRegistreationCompleted) return;
  const isRegistrationNotificationShown = getSessionStorageKey(
    sessionStorageAttributes.pendingMerchantRegistration,
  );
  if (isRegistrationNotificationShown) return;
  setSessionStorageKey(
    sessionStorageAttributes.pendingMerchantRegistration,
    true,
  );
  dispatch(handleAction());
};
