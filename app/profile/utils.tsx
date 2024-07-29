"use client"
import React, { ReactNode } from "react";
import { Card, CardBody } from "@nextui-org/react";
import { FcViewDetails } from "react-icons/fc";
import { FaMapLocationDot } from "react-icons/fa6";
import { RiListSettingsLine } from "react-icons/ri";


export enum tabKeys {
  profile = "Profile",
  basicDetails = "Basic details",
  address = "address",
  settings = "settings",
}

export interface tabOption {
  title: ReactNode;
  content: ReactNode;
  key: tabKeys;
  additionalTabClass?: string;
}

export const tabOptions: tabOption[] = [
//   {
//     key: tabKeys.profile,
//     title: (
//       <Badge
//         className="bg-[transparent] border-0 cursor-pointer"
//         shape="circle"
//         content={
//           <BsPlusCircleFill className="scale-[2] relative left-[1rem]" />
//         }
//         placement="bottom-right"
//       >
//         <Avatar
//           radius="full"
//           size="lg"
//           className="scale-150 pointer-events-none"
//           src="https://i.pravatar.cc/300?u=a042581f4e290267072"
//         />
//       </Badge>
//     ),
//     content: (
//       <Card>
//         <CardBody>
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//           eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
//           minim veniam, quis nostrud exercitation ullamco laboris nisi ut
//           aliquip ex ea commodo consequat.
//         </CardBody>
//       </Card>
//     ),
//     additionalTabClass: "min-h-24 cursor-context-menu",
//   },
  {
    title: (
      <div className="flex items-center gap-4">
        <FcViewDetails className="scale-[2]" />
        Basic Details
      </div>
    ),
    content: (
      <Card>
        <CardBody>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </CardBody>
      </Card>
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
    content: (
      <Card>
        <CardBody>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </CardBody>
      </Card>
    ),
    key: tabKeys.address,
  },
  {
    title: (
      <div className="flex items-center gap-4">
        <RiListSettingsLine className="scale-[2]" />
        Settings
      </div>
    ),
    content: (
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
