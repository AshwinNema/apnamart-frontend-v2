import {
  Modal,
  ModalContent,
  Skeleton,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect } from "react";
import { CircularProgress } from "@nextui-org/progress";
export const Spinner = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={false}
      isKeyboardDismissDisabled={false}
    >
      <ModalContent className="bg-[transparent] shadow-none">
        <div className="spinner-container bg-[transparent] flex items-center justify-center h-screen">
          <CircularProgress />
        </div>
      </ModalContent>
    </Modal>
  );
};

export const ComponentSkeleton = ({
  height = "h-svh",
}: {
  height?: string;
}) => {
  return (
    <Skeleton>
      <div className={`${height}`}></div>
    </Skeleton>
  );
};
