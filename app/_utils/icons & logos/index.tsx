import React from "react";
import styles from "./styles.module.css";
export interface Props extends React.PropsWithChildren {
  className?: string;
  onClick?: (value: any) => void;
}

export const MoonIcon = (props: Props) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99 10 10 0 002.89.55c.16.01.32.02.48.02a10.5 10.5 0 008.47-4.27c.67-.93.49-1.519.32-1.79z"
      fill="currentColor"
    />
  </svg>
);

export const SunIcon = (props: Props = {}) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <g fill="currentColor">
      <path d="M19 12a7 7 0 11-7-7 7 7 0 017 7z" />
      <path d="M12 22.96a.969.969 0 01-1-.96v-.08a1 1 0 012 0 1.038 1.038 0 01-1 1.04zm7.14-2.82a1.024 1.024 0 01-.71-.29l-.13-.13a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.984.984 0 01-.7.29zm-14.28 0a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a1 1 0 01-.7.29zM22 13h-.08a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zM2.08 13H2a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zm16.93-7.01a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a.984.984 0 01-.7.29zm-14.02 0a1.024 1.024 0 01-.71-.29l-.13-.14a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.97.97 0 01-.7.3zM12 3.04a.969.969 0 01-1-.96V2a1 1 0 012 0 1.038 1.038 0 01-1 1.04z" />
    </g>
  </svg>
);

export const ClearIcon = (props: Props = {}) => (
  <svg
    width="25px"
    height="25px"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    className={`${styles["password-icon"]}`}
  >
    <path d="M896 512c0-212.077-171.921-384-384-384-212.077 0-384 171.923-384 384 0 212.079 171.923 384 384 384 212.079 0 384-171.921 384-384zM579.883 398.863c12.497-12.497 32.759-12.497 45.257 0 12.493 12.497 12.493 32.757 0 45.254L557.257 512l67.878 67.883c12.497 12.497 12.497 32.759 0 45.257-12.493 12.493-32.755 12.493-45.252 0L512 557.257l-67.883 67.883c-12.497 12.493-32.757 12.493-45.254 0-12.497-12.497-12.497-32.759 0-45.257L466.744 512l-67.881-67.883c-12.497-12.497-12.497-32.758 0-45.254s32.757-12.497 45.254 0L512 466.744l67.883-67.881z" />
  </svg>
);

export const ValidationErrIcon = () => {
  return <>❌</>;
};

export const SuccessIcon = () => {
  return <> 🚀</>;
};

export * from "./input.icons";
export * from "./apnamart.logo";
