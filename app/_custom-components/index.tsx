import { Image } from "@nextui-org/react";
import NextImage from "next/image";

export * from "./inputs";

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
