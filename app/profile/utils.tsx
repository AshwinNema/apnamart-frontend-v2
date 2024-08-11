"use client";
import React, { ReactNode } from "react";
import { Card, CardBody } from "@nextui-org/react";
import { FcViewDetails } from "react-icons/fc";
import { FaMapLocationDot } from "react-icons/fa6";
import { RiListSettingsLine } from "react-icons/ri";
import BasicDetails from "./basic-details";
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
    Content: (props) => <BasicDetails {...props} />,
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
    Content: () => (
      <Card>
        <CardBody>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </CardBody>
      </Card>
    ),
    key: tabKeys.settings,
  },
];
