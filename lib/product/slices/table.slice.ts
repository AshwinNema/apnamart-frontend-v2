import { createSlice } from "@reduxjs/toolkit";

export interface categoryTableDataElement {
  photo: string;
  id: number;
  name: string;
}

export interface subCatTableDataElement extends categoryTableDataElement {
  categoryId: number;
  categoryName: string;
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
  },
});

export const { updateTableData } = tableSlice.actions;
