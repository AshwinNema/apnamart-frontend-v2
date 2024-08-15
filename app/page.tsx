"use client";

import { useAppSelector } from "@/lib/hooks";
import { UserRole } from "@/lib/slices/user/user.slice";
import { AdminLandingPage } from "./main-page/admin";

export default function Home() {
  const user = useAppSelector((state) => state.user);
  const role = user?.role;
  return <div>{role === UserRole.admin && <AdminLandingPage />}</div>;
}
