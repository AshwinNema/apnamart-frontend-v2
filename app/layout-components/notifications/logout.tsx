import {
  HTTP_METHODS,
  makeDataRequest,
  token,
} from "@/app/_services/fetch-service";
import { GiShop } from "react-icons/gi";
import {
  clearUserStorage,
  getLocalStorageKey,
  storageAttributes,
} from "@/app/_services/local-storage.service";
import { appEndPoints } from "@/app/_utils/endpoints";
import { useAppDispatch } from "@/lib/hooks";
import {
  modalProps,
  notificationTypes,
  setNotificationType,
} from "@/lib/slices/notification/notification.slice";
import { setUser } from "@/lib/slices/user/user.slice";
import { Button, ModalBody, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { TbLogout } from "react-icons/tb";
export const handleAction = () =>
  setNotificationType({
    type: notificationTypes.logout,
    details: null,
    modalProps: {
      ...modalProps,
      backdrop: "blur",
      hideCloseButton: true,
      isDismissable: false,
      className: `${modalProps.className}`,
    },
  });

export default function Logout({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const logout = () => {
    const tokens: token = getLocalStorageKey<token>(storageAttributes.tokens);
    const access = tokens?.access?.token || "";
    const refresh = tokens?.refresh?.token || "";

    makeDataRequest(
      HTTP_METHODS.POST,
      appEndPoints.LOG_OUT,
      { access, refresh },
      undefined,
      {
        addToken: false,
        showToastAndRedirect: false,
        showToast: false,
      },
    ).finally(() => {
      clearUserStorage();
      dispatch(setUser(null));
      router.push("/");
      onClose();
    });
  };
  return (
    <>
      <ModalHeader className="text-4l font-bold font-serif flex flex-col">
        <div className="flex justify-center mb-3">
          <GiShop className="scale-[2]" />
        </div>
        <div className="flex justify-center">Logout of Apnamart?</div>
      </ModalHeader>
      <ModalBody>
        You can always log back in at any time. If you just want to switch
        accounts, you can do that by adding an existing account.
      </ModalBody>
      <ModalFooter>
        <div className="flex flex-col w-full">
          <Button
            startContent={<TbLogout className="scale-[1.5]" />}
            onPress={logout}
            className="mb-3"
            color="warning"
            fullWidth={true}
          >
            Log out
          </Button>
          <Button
            variant="flat"
            color="danger"
            fullWidth={true}
            onPress={onClose}
          >
            Cancel
          </Button>
        </div>
      </ModalFooter>
    </>
  );
}
