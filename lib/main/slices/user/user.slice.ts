import {
  getLocalStorageKey,
  storageAttributes,
} from "@/app/_services/web-storage.service";
import { addressType } from "@/app/profile/address/utils";
import { createSlice } from "@reduxjs/toolkit";

export enum UserRole {
  customer = "customer",
  admin = "admin",
  merchant = "merchant",
}

export interface UserInterface {
  id: number;
  name: string;
  email: string;
  password: string;
  userRoles: UserRole[];
  role: UserRole;
  address?: {
    addressLine1: string;
    addressLine2: string;
    addressType: addressType;
    latitude: number;
    longtitude: number;
    otherAddress?: string;
  };
  phoneNo: string;
  photo: string;
  cloudinary_public_id: string;
  createdAt: Date;
  updatedAt: Date;
  isBlackListed: boolean;
  archive: boolean;
  merchantDetails?: {
    id: number;
    isMerchantBlocked: boolean;
    isRegistreationCompleted: boolean;
    latitude: number;
    longtitude: number;
    addressLine1: string;
    addressLine2: string;
    bankAcNo: string;
    gstIn: string;
  } | null;
}

export const userSlice = createSlice({
  name: "user",
  initialState:
    getLocalStorageKey<UserInterface>(storageAttributes.user) || null,
  reducers: {
    setUser(_, action) {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
