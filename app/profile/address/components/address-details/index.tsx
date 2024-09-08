import { Button, CardFooter, useDisclosure } from "@nextui-org/react";

import { BiSolidEditLocation } from "react-icons/bi";
import { IoSaveSharp } from "react-icons/io5";
import AddressDetailsDrawer from "./drawer";
import { drawerValidation, mainConfig, updateUserAddress } from "../../utils";
import { getZodErrMsg, setVal } from "@/app/_utils";
import { errorToast, toastErrorIcons } from "@/app/_utils/toast";
import { useAppDispatch, useAppSelector } from "@/lib/main/hooks";
export default function AddressFooter({
  config,
  setData,
}: {
  config: mainConfig;
  setData: setVal;
}) {
  const addressDetails = config.addressDetails;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const user = useAppSelector((data) => data.user);
  const dispatch = useAppDispatch();
  return (
    <CardFooter>
      <div className="flex justify-between w-full">
        <Button
          variant="bordered"
          onClick={onOpen}
          endContent={<BiSolidEditLocation />}
          className="cursor-pointer p-3"
          color="primary"
          size="sm"
        >
          Enter complete location details
        </Button>

        <Button
          className="cursor-pointer p-3"
          color="primary"
          size="sm"
          variant="shadow"
          onPress={() => {
            const data = drawerValidation.safeParse(addressDetails);
            if (data.error) {
              const errMsg = getZodErrMsg(data.error);
              errorToast({ msg: errMsg, iconType: toastErrorIcons.validation });
              return;
            }
            const { latitude, longtitude } = config;
            const payload = { latitude, longtitude, ...addressDetails };
            updateUserAddress(payload, user, dispatch);
          }}
          endContent={<IoSaveSharp />}
        >
          Save{" "}
        </Button>
      </div>
      <AddressDetailsDrawer
        addressDetails={addressDetails}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        setMainData={setData}
      />
    </CardFooter>
  );
}
