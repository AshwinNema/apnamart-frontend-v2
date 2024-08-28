"use client";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import { tabList, tabOption } from "./helper";
import { setTab } from "@/lib/product/slices/component-details.slice";
import { StoreProvider } from "./storeProvider";
import { useProductDispatch, useProductSelector } from "@/lib/product/hooks";

const MainComponent = () => {
  const dispatch = useProductDispatch();
  const tab = useProductSelector((state) => state.componentDetails.tab);
  return (
    <div className="flex w-full flex-col">
      <Tabs
        aria-label="Options"
        color="primary"
        variant="underlined"
        fullWidth
        selectedKey={tab}
        onSelectionChange={(key) => {
          dispatch(setTab(key));
        }}
      >
        {tabList.map((tab: tabOption) => {
          const { Content } = tab;
          return (
            <Tab key={tab.key} title={tab.title}>
              <Card>
                <CardBody>
                  <Content />
                </CardBody>
              </Card>
            </Tab>
          );
        })}
      </Tabs>
    </div>
  );
};

export default function Page() {
  return (
    <>
      <StoreProvider>
        <MainComponent />
      </StoreProvider>
    </>
  );
}
