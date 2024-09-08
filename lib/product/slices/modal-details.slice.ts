import { tableDataDataElement } from "@/app/admin/products/helper";
import { createSlice } from "@reduxjs/toolkit";
// When a user tries to edit an element in the main data table, we show the modal
// and in the modal we open the data, it is the modalDetails that contain the data to update
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
