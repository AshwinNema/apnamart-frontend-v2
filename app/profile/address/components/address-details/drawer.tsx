import { TextInput } from "@/app/_custom-components";
import CustomDrawer from "@/app/_custom-components/drawer";
import { setMultiplePaths, setNestedPath, setVal } from "@/app/_utils";
import { Button, ModalBody } from "@nextui-org/react";
import { Fragment, useCallback, useEffect, useState } from "react";
import { z } from "zod";
import { addressTypeList, mainConfig, saveDrawerDetails } from "../../utils";
import { drawerInitialVal, addressType } from "../../utils";
import { IoSaveSharp } from "react-icons/io5";
export default function AddressDetailsDrawer({
  isOpen,
  onOpenChange,
  addressDetails,
  setMainData,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
  addressDetails: mainConfig["addressDetails"];
  setMainData: setVal;
}) {
  const [config, setConfig] = useState(structuredClone(drawerInitialVal));
  const setData = useCallback(setNestedPath(setConfig), [setConfig]);
  const setMultipleData = useCallback(setMultiplePaths(setConfig), [setConfig]);

  useEffect(() => {
    setConfig(structuredClone(addressDetails));
  }, [addressDetails, isOpen]);

  return (
    <CustomDrawer isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalBody>
        <div className="h-full relative flex items-center ">
          <div className="p-1 flex flex-col gap-6 w-full">
            <TextInput
              value={config.addressLine1}
              validationSchema={z.string()}
              className="w-full"
              setData={setData("addressLine1")}
              variant="flat"
              alternateText="Flat No./ House No./Floor/ Building"
            />
            <TextInput
              value={config.addressLine2}
              validationSchema={z.string()}
              setData={setData("addressLine2")}
              variant="flat"
              alternateText="Road Name/ Area/ Colony"
            />
            <div>
              Type of address :
              <div className="flex gap-3 mt-3">
                {addressTypeList.map((item) => {
                  if (
                    config.addressType === addressType.others &&
                    item.type !== addressType.others
                  ) {
                    return <Fragment key={item.type} />;
                  }
                  return (
                    <Button
                      color="primary"
                      variant={
                        item.type === config.addressType ? "flat" : "faded"
                      }
                      onPress={() => {
                        if (config.addressType === addressType.others) {
                          setMultipleData([
                            ["addressType", null],
                            ["otherAddress", ""],
                          ]);
                          return;
                        }
                        setData("addressType")(item.type);
                      }}
                      startContent={item.icon}
                      key={item.type}
                    >
                      {item.label}
                    </Button>
                  );
                })}
                {config.addressType === addressType.others ? (
                  <TextInput
                    value={config.otherAddress}
                    validationSchema={z.string()}
                    setData={setData("otherAddress")}
                    placeholder="Save as"
                    variant="underlined"
                  />
                ) : null}
              </div>
              <Button
                className="mt-3"
                startContent={<IoSaveSharp />}
                onPress={() =>
                  saveDrawerDetails(config, onOpenChange, setMainData)
                }
                color="primary"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </ModalBody>
    </CustomDrawer>
  );
}
