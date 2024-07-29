import { Image } from "@nextui-org/react";
import NextImage from "next/image";
import { useAppSelector } from "@/lib/hooks";
import { ReactNode, useEffect } from "react";
import { CircularProgress } from "@nextui-org/progress";
import styles from "./style.module.css";
export * from "./inputs";
import { useRouter } from "next/navigation";

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
  return (
    <div
      className={`${styles["loading-indicator"]} fixed mx-auto my-0 left-0 right-0 top-0 h-screen z-3`}
    >
      <div className="spinner-container flex items-center justify-center h-screen">
        <CircularProgress />
      </div>
    </div>
  );
};

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const user = useAppSelector((state) => state.user);

  const router = useRouter();

  useEffect(() => {
    !user && router.push("/");
  }, [user]);

  return <> {user ? children : <Spinner />}</>;
};
