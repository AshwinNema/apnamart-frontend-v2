"use client";
import NextUIProvider from "./providers";
import Header from "./header";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotificationModal from "./notifications";
import { usePromiseTracker } from "react-promise-tracker";
import { Spinner } from "../_custom-components";
import { useAppDispatch, useAppSelector } from "@/lib/main/hooks";
import { getUserProfile } from "../profile/api";
import { usePathname } from "next/navigation";
import {
  getSessionStorageKey,
  sessionStorageAttributes,
  setSessionStorageKey,
} from "../_services";
import { commonRoleRoutes } from "../_utils";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // For showing UI Loader
  const { promiseInProgress } = usePromiseTracker();
  // Prevents warning - Extra attributes from the server: class,style at html at RootLayout (Server) at RedirectErrorBoundary. Reference - https://github.com/pacocoursey/next-themes?tab=readme-ov-file#avoid-hydration-mismatch
  const [mounted, setMounted] = useState(false);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const path = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const isUserFetched = getSessionStorageKey(
      sessionStorageAttributes.userFetch,
    );
    if (!isUserFetched && user && !path.includes(commonRoleRoutes.profile)) {
      setSessionStorageKey(sessionStorageAttributes.userFetch, true);
      getUserProfile(dispatch);
    }
  }, [dispatch, user, path]);

  if (!mounted) {
    return null;
  }

  return (
    <>
      {promiseInProgress && <Spinner />}
      <NextUIProvider>
        <main className={`mainContainer`}>
          <NextThemesProvider attribute="class">
            <Header />
            {children}
            <NotificationModal />
            <ToastContainer autoClose={2000} />
          </NextThemesProvider>
        </main>
      </NextUIProvider>
    </>
  );
}
