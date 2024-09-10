"use client";

import { ComponentSkeleton, ProtectedRoute } from "../_custom-components";
import dynamic from "next/dynamic";

export default function UserProfile() {
  const UserProfile = dynamic(() => import("./main"), {
    loading: () => <ComponentSkeleton />,
  });
  return (
    <ProtectedRoute>
      <UserProfile />
    </ProtectedRoute>
  );
}
