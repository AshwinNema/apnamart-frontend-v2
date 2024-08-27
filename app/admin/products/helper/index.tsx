export * from "./interfaces & enums";
export * from "./apis";
export * from "./constants";

import { tabKeys, tabOption } from "./interfaces & enums";
import Category from "../category";
import { columns } from "@/app/_custom-components";

export const tabList: tabOption[] = [
  {
    title: "Category",
    Content: (props: any) => <Category {...props} />,
    key: tabKeys.category,
  },
  {
    title: "Sub Category",
    Content: (props: any) => <></>,
    key: tabKeys.subCategory,
  },
];

export const categoryTableColumns: columns[] = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "actions",
    label: "Actions",
    align: "end",
  },
];
