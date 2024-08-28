export * from "./interfaces & enums";
export * from "./apis";
export * from "./table";
import { tabOption } from "./interfaces & enums";
import TabComponent from "../_tab-content";
import { columns } from "@/app/_custom-components";
import { tabKeys } from "@/lib/product/slices/component-details.slice";

export const tabList: tabOption[] = [
  {
    title: "Category",
    Content: () => {
      return (
        <>
          <TabComponent />
        </>
      );
    },
    key: tabKeys.category,
  },
  {
    title: "Sub Category",
    Content: () => {
      return (
        <>
          <TabComponent />
        </>
      );
    },
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
