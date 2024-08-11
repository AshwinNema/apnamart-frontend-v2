import { Image, Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import NextImage from "next/image";
import { useAppSelector } from "@/lib/hooks";
import { ReactNode, useEffect } from "react";
import { CircularProgress } from "@nextui-org/progress";
import { useRouter } from "next/navigation";

export * from "./inputs";
export * from "./leaflet";
export * from "./drawer";
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

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const user = useAppSelector((state) => state.user);

  const router = useRouter();

  useEffect(() => {
    !user && router.push("/");
  }, [user, router]);

  return <> {user ? children : <Spinner />}</>;
};
