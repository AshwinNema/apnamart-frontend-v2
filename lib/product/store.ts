import {
  Action,
  combineSlices,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import { componentDetailsSlice } from "./slices/component-details.slice";
import { tableSlice } from "./slices/table.slice";
import { modalDetailsSlice } from "./slices/modal-details.slice";

const rootReducer = combineSlices(
  componentDetailsSlice,
  tableSlice,
  modalDetailsSlice,
);

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type ProductStore = ReturnType<typeof makeStore>;

export type ProductDispatch = ProductStore["dispatch"];

export type ProductThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
