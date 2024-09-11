import { IconInput } from "../_custom-components";
import { Tabs, Tab, Badge, Avatar } from "@nextui-org/react";
import { tabKeys, tabOption } from "./utils";
import { BsPlusCircleFill } from "react-icons/bs";
import { uploadProfileImage } from "./api";
import { useAppDispatch, useAppSelector } from "@/lib/main/hooks";
import useMainState from "./useMainState";

function UserProfile() {
  const user = useAppSelector((state) => state.user);
  const [config, setProperty, tabOptions] = useMainState();
  const dispatch = useAppDispatch();

  return (
    <div className="mt-11">
      <div className="flex ml-11 mb-11">
        <Badge
          className="bg-[transparent] border-0 cursor-pointer"
          shape="circle"
          content={
            <>
              <IconInput
                Icon={BsPlusCircleFill}
                accept="image/png, image/jpeg"
                props={{
                  className:
                    "scale-[2] relative left-[1rem] bottom-[-1.5rem] cursor-pointer",
                }}
                callback={(file) => uploadProfileImage(file, dispatch)}
              />
            </>
          }
          placement="bottom-right"
        >
          <Avatar
            radius="full"
            size="lg"
            className="scale-[2]"
            src={`${user?.photo || ""}`}
          />
        </Badge>
      </div>

      <div>
        <Tabs
          color="primary"
          variant="bordered"
          aria-label="Options"
          placement="start"
          className=""
          size="lg"
          selectedKey={config.selectedTab}
          onSelectionChange={(key) => {
            if (key === tabKeys.profile) {
              return;
            }
            if (config.selectedTab !== key) {
              setProperty("selectedTab")(key);
            }
          }}
        >
          {tabOptions.map((tabOption: tabOption) => {
            const { Content } = tabOption;
            return (
              <Tab
                key={tabOption.key}
                className={`min-h-16 w-full ${tabOption.additionalTabClass || ""}`}
                title={tabOption.title}
              >
                <div className="-mt-[8rem]">
                  <Content
                    details={config.user}
                    setDetails={(key: string) => setProperty(`user.${key}`)}
                  />
                </div>
              </Tab>
            );
          })}
        </Tabs>
      </div>
    </div>
  );
}

export default UserProfile;
