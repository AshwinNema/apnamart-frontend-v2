import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useDisclosure } from "@nextui-org/react";
import { useEffect } from "react";
import { Modal, ModalContent } from "@nextui-org/react";
import NewUserNotification from "./new-user";
import {
  notificationTypes,
  resetNotifications,
} from "@/lib/slices/notification/notification.slice";
import Logout from "./logout";
import styles from "./styles.module.css";

export default function NotificationModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { type, modalProps } = useAppSelector((state) => state.notifications);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!type) return;
    onOpen();
  }, [type]);

  const resetReduxState = () => dispatch(resetNotifications());

  return (
    <Modal
      isOpen={isOpen}
      className={`${modalProps?.className}`}
      classNames={{
        wrapper: `${modalProps.backdrop === "blur" && styles.blurBackdrop}`,
      }}
      backdrop={`${modalProps?.backdrop}`}
      scrollBehavior={`${modalProps?.scrollBehavior}`}
      placement={`${modalProps?.placement}`}
      hideCloseButton={modalProps.hideCloseButton}
      isDismissable={modalProps.isDismissable}
      onOpenChange={(isOpen) => {
        if (!isOpen) resetReduxState();
        onOpenChange();
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            {type === notificationTypes.newUser && (
              <NewUserNotification onClose={onClose} />
            )}

            {type === notificationTypes.logout && <Logout onClose={onClose} />}
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
