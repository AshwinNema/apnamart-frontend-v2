import {
  userRoleKeys,
  userRoles,
} from "@/app/layout-components/login-signup/constants";
import { tabKeys } from "@/app/profile/utils";
import { useAppSelector } from "@/lib/hooks";
import {
  modalProps,
  notificationTypes,
  setNotificationType,
} from "@/lib/slices/notification/notification.slice";
import { ModalBody, ModalFooter, ModalHeader } from "@nextui-org/react";
import { Link } from "@nextui-org/react";

interface details {
  name: string;
  role: userRoleKeys;
  noInitialPassword?: boolean;
}

export const handleAction = (details: details) =>
  setNotificationType({
    type: notificationTypes.newUser,
    details,
    modalProps: {
      ...modalProps,
      className: `${modalProps.className} p-11`,
      placement: "top",
    },
  });

export default function NewUserNotification({
  onClose,
}: {
  onClose: () => void;
}) {
  const notifications = useAppSelector((state) => state.notifications);
  const details = notifications.details as details;

  return (
    <>
      <ModalHeader className="flex justify-center text-4xl">
        Hi {details?.name} 👋
      </ModalHeader>
      <ModalBody>{userRoles?.[details?.role]?.userSignedUpText} </ModalBody>
      {details?.noInitialPassword && (
        <ModalFooter>
          <p className="italic">
            <span className="font-bold">Please note :</span> Your inital
            password is not set, hence you will not be able to sign in using
            password. You can set it by{" "}
            <Link onClick={onClose} href={`/profile?${tabKeys.settings}`}>
              clicking here
            </Link>
          </p>
        </ModalFooter>
      )}
    </>
  );
}
