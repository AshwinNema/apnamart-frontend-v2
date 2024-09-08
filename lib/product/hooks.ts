import { useDispatch, useSelector, useStore } from "react-redux";
import { ProductDispatch, ProductStore, RootState } from "./store";

export const useProductDispatch = useDispatch.withTypes<ProductDispatch>();
export const useProductSelector = useSelector.withTypes<RootState>();
export const useProductStore = useStore.withTypes<ProductStore>();
