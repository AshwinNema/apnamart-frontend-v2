import React from "react";
import { FcViewDetails } from "react-icons/fc";
import { FaMapLocationDot } from "react-icons/fa6";
import { RiListSettingsLine } from "react-icons/ri";
import BasicDetails from "../user-input-details";
import { tabOption } from ".";
import dynamic from "next/dynamic";
import { UserRole } from "@/lib/main/slices/user/user.slice";
import { ComponentSkeleton } from "@/app/_custom-components";
import { tabKeys } from "@/lib/profile/slices/component-state.slice";
import MerchantRegistration from "../merchant-registration";
import { FaWpforms } from "react-icons/fa";

export const getTabOptions = (role: UserRole): tabOption[] => {
  const config: tabOption[] = [
    {
      title: (
        <div className="flex items-center gap-4">
          <FcViewDetails className="scale-[2]" />
          Basic Details
        </div>
      ),
      Content: () => <BasicDetails />,
      key: tabKeys.basicDetails,
    },
  ];

  role === UserRole.customer &&
    config.push({
      title: (
        <div className="flex items-center gap-4">
          <FaMapLocationDot className="scale-[2]" />
          Address
        </div>
      ),
      Content: () => {
        const UserAddress = dynamic(
          () => import("@/app/profile/address/index"),
          {
            ssr: false,
            loading: () => <ComponentSkeleton />,
          },
        );
        return <UserAddress />;
      },
      key: tabKeys.address,
    });

  role === UserRole.merchant &&
    config.push({
      title: (
        <div className="flex items-center gap-4">
          <FaWpforms className="scale-[1.9]" />
          Registration
        </div>
      ),
      Content: () => <MerchantRegistration />,
      key: tabKeys.merchantRegistration,
    });

  config.push({
    title: (
      <div className="flex items-center gap-4">
        <RiListSettingsLine className="scale-[2]" />
        Settings
      </div>
    ),
    Content: () => <BasicDetails />,
    key: tabKeys.settings,
  });
  return config;
};
