import { createSlice } from "@reduxjs/toolkit";

export enum tabKeys {
  category = "Category",
  subCategory = "Sub Category",
  items = "Item",
}

interface componentDetails {
  tab: tabKeys;
  id: number | null;
  refreshData: boolean;
  closeModal: false;
}

const initialState: componentDetails = {
  tab: tabKeys.category,
  id: null,
  refreshData: false,
  closeModal: false,
};

export const componentDetailsSlice = createSlice({
  name: "componentDetails",
  initialState,
  reducers: {
    setTab(state, { payload }) {
      state.tab = payload;
    },
    setId(state, { payload }) {
      state.id = payload;
    },
    setDetails(state, { payload }) {
      Object.assign(state, payload);
    },
  },
});

export const { setTab, setId, setDetails } = componentDetailsSlice.actions;
