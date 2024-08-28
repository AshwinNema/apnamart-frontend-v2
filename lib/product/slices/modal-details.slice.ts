import { tableDataDataElement } from "@/app/admin/products/helper";
import { createSlice } from "@reduxjs/toolkit";

const initialState: tableDataDataElement | null = null;

export const modalDetailsSlice = createSlice({
  name: "modalDetails",
  initialState,
  reducers: {
    setModalDetails(state, { payload }) {
      if (!state) return payload;
      Object.assign(state, payload);
    },
    clearModalDetails() {
      return null;
    },
  },
});

export const { setModalDetails, clearModalDetails } = modalDetailsSlice.actions;
