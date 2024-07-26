import { getLocalStorageKey } from "@/app/_services/local-storage.service";
import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: getLocalStorageKey("user") || null,
  reducers: {
    setUser(_, action) {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
