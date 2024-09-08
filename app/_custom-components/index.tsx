import { Image, Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import NextImage from "next/image";
import { useAppSelector } from "@/lib/main/hooks";
import { ReactNode, useEffect } from "react";
import { CircularProgress } from "@nextui-org/progress";
import { useRouter } from "next/navigation";
import { UserRole } from "@/lib/main/slices/user/user.slice";
export * from "./inputs";
export * from "./leaflet";
export * from "./drawer";
export * from "./table";
export const ImageComponent = ({
  width,
  height,
  src,
  alt,
  className,
  isBlurred = false,
}: {
  width: number;
  height: number;
  src: string;
  alt: string;
  className?: string;
  isBlurred?: boolean;
}) => {
  return (
    <Image
      isBlurred={isBlurred}
      as={NextImage}
      width={width}
      height={height}
      src={src}
      alt={alt}
      className={`${className || ""}`}
    />
  );
};

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

export const ProtectedRoute = ({
  children,
  allowedRole,
}: {
  children: ReactNode;
  allowedRole?: UserRole;
}) => {
  const user = useAppSelector((state) => state.user);
  const role = user?.role;
  const router = useRouter();

  useEffect(() => {
    !user && router.push("/");
  }, [user, router]);

  // If allowedRole is given then we check that user is logging in with that allowed role
  useEffect(() => {
    !!allowedRole && role != allowedRole && router.push("/");
  }, [allowedRole, role, router]);

  return <> {user ? children : <Spinner />}</>;
};
