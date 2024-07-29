import { getLocalStorageKey } from "@/app/_services/local-storage.service";
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
  address: string;
  phoneNo: string;
  photo: string;
  cloudinary_public_id: string;
  createdAt: Date;
  updatedAt: Date;
  isBlackListed: boolean;
  archive: boolean;
}

export const userSlice = createSlice({
  name: "user",
  initialState: getLocalStorageKey<UserInterface>("user") || null,
  reducers: {
    setUser(_, action) {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
