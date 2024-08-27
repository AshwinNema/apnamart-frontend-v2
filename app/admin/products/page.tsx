"use client";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import { tabKeys, tabList, tabOption } from "./helper";
import { useState } from "react";
import { setNestedPath } from "@/app/_utils";

export default function Page() {
  const [config, setConfig] = useState({
    selectedTab: tabKeys.category,
  });
  const setProperty = setNestedPath(setConfig);
  return (
    <div className="flex w-full flex-col">
      <Tabs
        aria-label="Options"
        color="primary"
        variant="underlined"
        fullWidth
        selectedKey={config.selectedTab}
        onSelectionChange={(key) => {
          setProperty("selectedTab")(key);
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
}
