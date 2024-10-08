import { UserRole } from "@/lib/main/slices/user/user.slice";

export const routes = {
  [UserRole.merchant]: {},
  [UserRole.admin]: {
    product: "/admin/products",
    merchants: "/admin/merchants",
    deliveryArea: "/admin/delivery-area",
  },
  [UserRole.customer]: {},
};
