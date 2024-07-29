"use client";

import { ProtectedRoute } from "../_custom-components";
import { Tabs, Tab, Badge, Avatar, Button } from "@nextui-org/react";
import { tabKeys, tabOption, tabOptions } from "./utils";
import { useState } from "react";
import { setNestedPath } from "../_utils";
import { BsPlusCircleFill } from "react-icons/bs";

function Page() {
  const [config, setConfig] = useState({
    selectedTab: tabKeys.basicDetails,
  });

  const setProperty = setNestedPath(setConfig);


  return (
    <div className="mt-11">
      <div className="flex justify-center mb-11">
        <Badge
          className="bg-[transparent] border-0 cursor-pointer"
          shape="circle"
          content={
            <>
              <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/png, image/jpeg"
            >
              
            </input>
            <BsPlusCircleFill className="scale-[2] relative left-[1rem] bottom-[-1.5rem]" />
            </>
          }
          placement="bottom-right"
        >
          <Avatar
            radius="full"
            size="lg"
            className="scale-[2]"
            src="https://i.pravatar.cc/300?u=a042581f4e290267072"
          />
        </Badge>
      </div>

      <div>
        <Tabs
          color="primary"
          variant="bordered"
          // className="opacity-100"
          aria-label="Options"
          placement="start"
          className=""
          size="lg"
          selectedKey={config.selectedTab}
          onSelectionChange={(key) => {
            if (key === tabKeys.profile) {
              return;
            }
            setProperty("selectedTab")(key);
          }}
        >
          {tabOptions.map((tabOption: tabOption) => {
            return (
              <Tab
                key={tabOption.key}
                className={`min-h-16 ${tabOption.additionalTabClass || ""}`}
                title={tabOption.title}
              >
                {tabOption.content}
              </Tab>
            );
          })}
        </Tabs>
      </div>
    </div>
  );
}

export default function UserProfile() {
  return (
    <ProtectedRoute>
      <Page />
    </ProtectedRoute>
  );
}
