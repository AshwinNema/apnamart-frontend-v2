import {
  Link,
  Modal,
  ModalContent,
  Skeleton,
  useDisclosure,
} from "@nextui-org/react";
import { ReactNode, useEffect, useState } from "react";
import { CircularProgress } from "@nextui-org/progress";
import { usePathname } from "next/navigation";
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

export const SpinnerLink = ({
  children,
  color = "foreground",
  href,
}: {
  children: ReactNode;
  color?:
    | "foreground"
    | "danger"
    | "primary"
    | "secondary"
    | "warning"
    | "success";
  href: string;
}) => {
  const [showSpinner, setSpinner] = useState(false);
  const path = usePathname();

  useEffect(() => {
    setSpinner(false);
  }, [path]);
  return (
    <>
      {showSpinner && <Spinner />}
      <Link
        onClick={() => {
          console.log(path, href);
          path !== href && setSpinner(true);
        }}
        color={color}
        href={href}
      >
        {children}
      </Link>
    </>
  );
};
