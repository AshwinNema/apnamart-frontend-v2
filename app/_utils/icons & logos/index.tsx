"use client";
import React from "react";
import { MdCancel } from "react-icons/md";
import { useTheme } from "next-themes";
import { browserTheme } from "@/app/layout-components/theme-switch";
import { ImCross } from "react-icons/im";
import { ImYoutube } from "react-icons/im";
import { TbFileSettings } from "react-icons/tb";
import { GrDocumentUser } from "react-icons/gr";

export interface Props extends React.PropsWithChildren {
  className?: string;
  onClick?: (value: any) => void;
  height?: string;
  width?: string;
}

export const ClearIcon = (props: Props = {}) => {
  const { theme } = useTheme();
  const classes =
    theme === browserTheme.dark
      ? "fill-white  opacity-70	hover:opacity-100"
      : "fill-[#585D60] hover:fill-black";

  return (
    <MdCancel
      className={`cursor-pointer scale-[1.3] mb-1 ${classes}`}
      onClick={props.onClick}
    />
  );
};

export const ValidationErrIcon = () => {
  return <ImCross className="fill-[red]" />;
};

export const SuccessIcon = () => {
  return <> 🚀</>;
};

export const YouTubeIcon = () => {
  return <ImYoutube className="fill-[red]" />;
};

export const TechnicalDocumentationIcon = () => {
  return <TbFileSettings />;
};

export const UserGuideIcon = () => {
  return <GrDocumentUser />;
};
