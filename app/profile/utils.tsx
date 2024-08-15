"use client";
import React, { ReactNode } from "react";
import { FcViewDetails } from "react-icons/fc";
import { FaMapLocationDot } from "react-icons/fa6";
import { RiListSettingsLine } from "react-icons/ri";
import BasicDetails from "./user-input-details";
import dynamic from "next/dynamic";
import { Spinner } from "../_custom-components";

const UserAddress = dynamic(() => import("@/app/profile/address/index"), {
  ssr: false,
  loading: () => <Spinner />,
});

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

export const tabOptions: tabOption[] = [
  {
    title: (
      <div className="flex items-center gap-4">
        <FcViewDetails className="scale-[2]" />
        Basic Details
      </div>
    ),
    Content: (props) => (
      <BasicDetails userInputPage={tabKeys.basicDetails} {...props} />
    ),
    key: tabKeys.basicDetails,
  },
  {
    title: (
      <div className="flex items-center gap-4">
        <FaMapLocationDot className="scale-[2]" />
        Address
      </div>
    ),
    Content: (props) => <UserAddress {...props} />,
    key: tabKeys.address,
  },
  {
    title: (
      <div className="flex items-center gap-4">
        <RiListSettingsLine className="scale-[2]" />
        Settings
      </div>
    ),
    Content: (props) => (
      <BasicDetails userInputPage={tabKeys.settings} {...props} />
    ),
    key: tabKeys.settings,
  },
];
