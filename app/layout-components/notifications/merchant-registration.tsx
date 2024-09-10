import { useAppSelector } from "@/lib/main/hooks";
import {
  modalProps,
  notificationTypes,
  setNotificationType,
} from "@/lib/main/slices/notification/notification.slice";
import { Button, ModalBody, ModalFooter, ModalHeader } from "@nextui-org/react";
import { TiBusinessCard } from "react-icons/ti";
import { RiProfileLine } from "react-icons/ri";

export const handleAction = () =>
  setNotificationType({
    type: notificationTypes.merchantRegistration,
    details: null,
    modalProps: {
      ...modalProps,
    },
  });

const MerchantRegistration = () => {
  const user = useAppSelector((state) => state.user);

  return (
    <>
      <ModalHeader className="text-4l font-bold font-serif">
        <div className="flex justify-center gap-4 w-full items-center">
          <TiBusinessCard className="scale-[2]" />
          <div>Registration Pending</div>
        </div>
      </ModalHeader>

      <ModalBody>
        <p>🌟 Hi {user?.name}! 🌟</p>
        <p>
          Your registration is currently pending. Please complete the
          registration process to start creating your products. 🛍️✨
        </p>
        <p>Thank you! 😊</p>
      </ModalBody>

      <ModalFooter>
        <div className="flex justify-end">
          <Button color="primary" startContent={<RiProfileLine />}>
            Complete Registration
          </Button>
        </div>
      </ModalFooter>
    </>
  );
};

export default MerchantRegistration;
