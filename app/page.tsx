"use client";

import { useAppSelector } from "@/lib/main/hooks";
import { UserRole } from "@/lib/main/slices/user/user.slice";
import { AdminLandingPage } from "./main-page/admin";

export default function Home() {
  const user = useAppSelector((state) => state.user);
  const role = user?.role;
  return <div>{role === UserRole.admin && <AdminLandingPage />}</div>;
}
