export * from "./interfaces & enums";
export * from "./apis";
export * from "./constants";

import { tabKeys, tabOption } from "./interfaces & enums";
import TabComponent from "../_tab-content";
import { columns } from "@/app/_custom-components";

export const tabList: tabOption[] = [
  {
    title: "Category",
    Content: (props: any) => {
      const allProps = { ...props, tabType: tabKeys.category };
      return (
        <>
          <TabComponent {...allProps} />
        </>
      );
    },
    key: tabKeys.category,
  },
  {
    title: "Sub Category",
    Content: (props: any) => <></>,
    key: tabKeys.subCategory,
  },
  {
    title: "Items",
    Content: (props: any) => <></>,
    key: tabKeys.items,
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
