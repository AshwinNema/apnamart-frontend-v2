import { createSlice } from "@reduxjs/toolkit";

export interface categoryTableDataElement {
  photo: string;
  id: number;
  name: string;
}

export interface subCatTableDataElement extends categoryTableDataElement {
  category: {
    id: number;
    name: string;
  };
}

export interface dataTable<tableElementData> {
  limit: number;
  page: number;
  totalResults: number;
  results: tableElementData[];
  totalPages: number;
}

const initialState: dataTable<
  categoryTableDataElement | subCatTableDataElement
> = {
  limit: 2,
  page: 1,
  totalResults: 0,
  results: [],
  totalPages: 0,
};

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    updateTableData(state, { payload }) {
      Object.assign(state, payload);
    },
    resetTable() {
      return initialState;
    },
  },
});

export const { updateTableData, resetTable } = tableSlice.actions;
