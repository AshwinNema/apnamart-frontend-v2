import { useAppSelector } from "@/lib/hooks";
import { useDisclosure } from "@nextui-org/react";
import { useEffect } from "react";
import { Modal, ModalContent, ModalHeader } from "@nextui-org/react";
import NewUserNotification from "./new-user";
import { notificationTypes } from "@/lib/slices/notification/notification.slice";

export default function NotificationModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { type, modalProps } = useAppSelector((state) => state.notifications);

  useEffect(() => {
    if (!type) return;
    onOpen();
  }, [type]);

  return (
    <Modal
      isOpen={isOpen}
      className={`${modalProps?.className}`}
      backdrop={`${modalProps?.backdrop}`}
      scrollBehavior={`${modalProps?.scrollBehavior}`}
      placement={`${modalProps?.placement}`}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            {type === notificationTypes.newUser && (
              <NewUserNotification onClose={onClose} />
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
